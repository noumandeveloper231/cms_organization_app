import { apiFetch, ApiResponse } from "./httpClient";

export interface JobseekerLoginResponse {
  success: boolean;
  message: string;
  token: string;
  must_reset_password: boolean;
}

export interface JobseekerForgotPasswordResponse {
  success: boolean;
  message: string;
}

export interface JobseekerMeResponse {
  success: boolean;
  job_seeker: {
    id: number;
    email: string;
    first_name?: string;
    last_name?: string;
  } | null;
}

export async function jobseekerLogin(params: {
  email: string;
  password: string;
}): Promise<ApiResponse<JobseekerLoginResponse>> {
  return apiFetch<JobseekerLoginResponse>("/api/jobseeker-portal/auth/login", {
    method: "POST",
    body: JSON.stringify(params),
  });
}

export async function jobseekerForgotPassword(params: {
  email: string;
}): Promise<ApiResponse<JobseekerForgotPasswordResponse>> {
  return apiFetch<JobseekerForgotPasswordResponse>(
    "/api/jobseeker-portal/auth/forgot-password",
    {
      method: "POST",
      body: JSON.stringify(params),
    }
  );
}

export async function jobseekerMe(
  authToken: string
): Promise<ApiResponse<JobseekerMeResponse>> {
  return apiFetch<JobseekerMeResponse>("/api/jobseeker-portal/auth/me", {
    method: "GET",
    authToken,
  });
}

export async function jobseekerLogout(
  authToken: string
): Promise<ApiResponse<{ success: boolean; message: string }>> {
  return apiFetch<{ success: boolean; message: string }>(
    "/api/jobseeker-portal/auth/logout",
    {
      method: "POST",
      authToken,
    }
  );
}

