import type { StaffUser, StaffUserRole } from "../api/authApi";

export type AppRole = "INTERNAL" | "HIRING_MANAGER" | "JOB_SEEKER";

const INTERNAL_ROLES: StaffUserRole[] = [
  "developer",
  "admin",
  "owner",
  "administrator",
  "payroll-admin",
  "onboarding-admin",
  "account-manager-temp",
  "account-manager-perm",
  "sales-rep",
];

const HIRING_MANAGER_ROLES: StaffUserRole[] = ["recruiter"];

const JOB_SEEKER_ROLES: StaffUserRole[] = ["candidate"];

export function mapStaffUserToAppRole(user: StaffUser): AppRole {
  const role = user.role ?? user.userType;

  if (INTERNAL_ROLES.includes(role)) {
    return "INTERNAL";
  }

  if (HIRING_MANAGER_ROLES.includes(role)) {
    return "HIRING_MANAGER";
  }

  if (JOB_SEEKER_ROLES.includes(role)) {
    return "JOB_SEEKER";
  }

  // Default to INTERNAL so internal tools remain accessible if new roles are added.
  return "INTERNAL";
}

