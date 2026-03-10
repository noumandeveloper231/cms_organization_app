import { apiFetch, ApiResponse } from "./httpClient";

export type StaffUserRole =
  | "candidate"
  | "recruiter"
  | "developer"
  | "admin"
  | "owner"
  | "administrator"
  | "payroll-admin"
  | "onboarding-admin"
  | "account-manager-temp"
  | "account-manager-perm"
  | "sales-rep";

export interface StaffUser {
  id: number;
  name: string;
  email: string;
  userType: StaffUserRole;
  role: StaffUserRole;
  token: string;
}

export interface LoginStep1Response {
  success: boolean;
  message: string;
  requires2FA?: boolean;
  // When 2FA is bypassed (e.g. owner/test accounts), the backend
  // returns a full login payload with token and user.
  token?: string;
  user?: StaffUser;
}

export interface VerifyOtpResponse {
  success: boolean;
  message: string;
  token: string;
  user: StaffUser;
}

export interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

export async function staffLoginStep1(params: {
  email: string;
  password: string;
}): Promise<ApiResponse<LoginStep1Response>> {
  return apiFetch<LoginStep1Response>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

export async function staffVerifyOtp(params: {
  email: string;
  otp: string;
}): Promise<ApiResponse<VerifyOtpResponse>> {
  return apiFetch<VerifyOtpResponse>("/api/auth/verify-otp", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

export async function staffForgotPassword(params: {
  email: string;
}): Promise<ApiResponse<ForgotPasswordResponse>> {
  return apiFetch<ForgotPasswordResponse>("/api/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

export async function staffResetPassword(params: {
  email: string;
  otp: string;
  newPassword: string;
}): Promise<ApiResponse<ResetPasswordResponse>> {
  return apiFetch<ResetPasswordResponse>("/api/auth/reset-password", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

export async function staffLogout(authToken: string): Promise<ApiResponse<{
  success: boolean;
  message: string;
}>> {
  return apiFetch<{ success: boolean; message: string }>("/api/auth/logout", {
    method: "POST",
    authToken,
  });
}

