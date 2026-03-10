import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  staffLoginStep1,
  staffVerifyOtp,
  staffForgotPassword,
  staffResetPassword,
  staffLogout,
  type StaffUser,
} from "../api/authApi";
import {
  jobseekerLogin,
  jobseekerForgotPassword,
  jobseekerLogout,
  type JobseekerLoginResponse,
} from "../api/jobseekerAuthApi";
import { saveString, getString, deleteItem } from "../services/secureStorage";
import { mapStaffUserToAppRole, type AppRole } from "../services/roleMapping";

const AUTH_STATE_KEY = "AUTH_STATE_V1";

type AuthStatus = "idle" | "checking" | "authenticated" | "unauthenticated";

interface StaffAuthState {
  type: "STAFF";
  user: StaffUser;
}

interface JobseekerAuthState {
  type: "JOBSEEKER_PORTAL";
  jobseekerMeta: Pick<JobseekerLoginResponse, "must_reset_password">;
  email: string;
}

type AuthEntity = StaffAuthState | JobseekerAuthState | null;

interface AuthState {
  status: AuthStatus;
  token: string | null;
  role: AppRole | null;
  entity: AuthEntity;
}

interface AuthContextValue extends AuthState {
  loginStaff: (params: { email: string; password: string }) => Promise<{
    ok: boolean;
    requires2FA: boolean;
    error?: string;
  }>;
  verifyStaffOtp: (params: { email: string; otp: string }) => Promise<{
    ok: boolean;
    error?: string;
  }>;
  loginJobSeeker: (params: {
    email: string;
    password: string;
  }) => Promise<{ ok: boolean; mustResetPassword: boolean; error?: string }>;
  requestStaffPasswordReset: (email: string) => Promise<{ ok: boolean; error?: string }>;
  resetStaffPassword: (params: {
    email: string;
    otp: string;
    newPassword: string;
  }) => Promise<{ ok: boolean; error?: string }>;
  requestJobseekerPasswordReset: (email: string) => Promise<{
    ok: boolean;
    error?: string;
  }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

async function loadPersistedAuthState(): Promise<AuthState> {
  const raw = await getString(AUTH_STATE_KEY);

  if (!raw) {
    return {
      status: "unauthenticated",
      token: null,
      role: null,
      entity: null,
    };
  }

  try {
    const parsed = JSON.parse(raw) as AuthState;

    if (!parsed.token || !parsed.role || !parsed.entity) {
      return {
        status: "unauthenticated",
        token: null,
        role: null,
        entity: null,
      };
    }

    return {
      ...parsed,
      status: "authenticated",
    };
  } catch {
    return {
      status: "unauthenticated",
      token: null,
      role: null,
      entity: null,
    };
  }
}

async function persistAuthState(state: AuthState): Promise<void> {
  if (!state.token || !state.entity || !state.role) {
    await deleteItem(AUTH_STATE_KEY);
    return;
  }

  const toPersist: AuthState = {
    status: "authenticated",
    token: state.token,
    role: state.role,
    entity: state.entity,
  };

  await saveString(AUTH_STATE_KEY, JSON.stringify(toPersist));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    status: "checking",
    token: null,
    role: null,
    entity: null,
  });

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const loaded = await loadPersistedAuthState();
      if (!isMounted) return;
      setState(loaded);
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  const loginStaff = useCallback<AuthContextValue["loginStaff"]>(
    async ({ email, password }) => {
      const { data, error } = await staffLoginStep1({ email, password });

      if (error || !data) {
        return {
          ok: false,
          requires2FA: false,
          error: error?.message ?? "Unable to login",
        };
      }

      // If 2FA is required, we just signal the next step and
      // let the OTP screen handle completing authentication.
      if (data.requires2FA) {
        return {
          ok: true,
          requires2FA: true,
        };
      }

      // Some accounts (e.g. owner/test) bypass 2FA completely.
      // In that case the backend login endpoint returns a full
      // auth payload (token + user). We need to treat this as
      // a completed login and persist auth state here.
      if (data.token && data.user) {
        const role = mapStaffUserToAppRole(data.user);

        const nextState: AuthState = {
          status: "authenticated",
          token: data.token,
          role,
          entity: {
            type: "STAFF",
            user: data.user,
          },
        };

        setState(nextState);
        await persistAuthState(nextState);

        return {
          ok: true,
          requires2FA: false,
        };
      }

      // Fallback: login succeeded but neither requires2FA nor a token
      // was provided. Treat as failure so the UI can show an error
      // instead of navigating into an unauthenticated state.
      return {
        ok: false,
        requires2FA: false,
        error: "Unexpected login response from server",
      };
    },
    []
  );

  const verifyStaffOtp = useCallback<AuthContextValue["verifyStaffOtp"]>(
    async ({ email, otp }) => {
      const { data, error } = await staffVerifyOtp({ email, otp });

      if (error || !data) {
        return {
          ok: false,
          error: error?.message ?? "Unable to verify code",
        };
      }

      const role = mapStaffUserToAppRole(data.user);

      const nextState: AuthState = {
        status: "authenticated",
        token: data.token,
        role,
        entity: {
          type: "STAFF",
          user: data.user,
        },
      };

      setState(nextState);
      await persistAuthState(nextState);

      return { ok: true };
    },
    []
  );

  const loginJobSeeker = useCallback<AuthContextValue["loginJobSeeker"]>(
    async ({ email, password }) => {
      const { data, error } = await jobseekerLogin({ email, password });

      if (error || !data) {
        return {
          ok: false,
          mustResetPassword: false,
          error: error?.message ?? "Unable to login",
        };
      }

      const nextState: AuthState = {
        status: "authenticated",
        token: data.token,
        role: "JOB_SEEKER",
        entity: {
          type: "JOBSEEKER_PORTAL",
          jobseekerMeta: {
            must_reset_password: data.must_reset_password,
            success: data.success,
            message: data.message,
            token: data.token,
          } as any,
          email,
        },
      };

      setState(nextState);
      await persistAuthState(nextState);

      return {
        ok: true,
        mustResetPassword: data.must_reset_password,
      };
    },
    []
  );

  const requestStaffPasswordReset =
    useCallback<AuthContextValue["requestStaffPasswordReset"]>(async (email) => {
      const { error } = await staffForgotPassword({ email });

      if (error) {
        return {
          ok: false,
          error: error.message,
        };
      }

      return { ok: true };
    }, []);

  const resetStaffPassword =
    useCallback<AuthContextValue["resetStaffPassword"]>(async (params) => {
      const { error } = await staffResetPassword(params);

      if (error) {
        return {
          ok: false,
          error: error.message,
        };
      }

      return { ok: true };
    }, []);

  const requestJobseekerPasswordReset =
    useCallback<AuthContextValue["requestJobseekerPasswordReset"]>(async (email) => {
      const { error } = await jobseekerForgotPassword({ email });

      if (error) {
        return {
          ok: false,
          error: error.message,
        };
      }

      return { ok: true };
    }, []);

  const logout = useCallback<AuthContextValue["logout"]>(async () => {
    const currentToken = state.token;
    const entity = state.entity;

    if (currentToken && entity) {
      if (entity.type === "STAFF") {
        await staffLogout(currentToken);
      } else if (entity.type === "JOBSEEKER_PORTAL") {
        await jobseekerLogout(currentToken);
      }
    }

    const cleared: AuthState = {
      status: "unauthenticated",
      token: null,
      role: null,
      entity: null,
    };

    setState(cleared);
    await persistAuthState(cleared);
  }, [state.entity, state.token]);

  const value: AuthContextValue = useMemo(
    () => ({
      ...state,
      loginStaff,
      verifyStaffOtp,
      loginJobSeeker,
      requestStaffPasswordReset,
      resetStaffPassword,
      requestJobseekerPasswordReset,
      logout,
    }),
    [
      state,
      loginStaff,
      verifyStaffOtp,
      loginJobSeeker,
      requestStaffPasswordReset,
      resetStaffPassword,
      requestJobseekerPasswordReset,
      logout,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}

