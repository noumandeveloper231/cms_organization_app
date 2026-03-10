import type { AppRole } from "@/src/services/roleMapping";

export type RoleRootHref =
  | "/(jobseeker)"
  | "/(hiring)"
  | "/(internal)"
  | "/auth/login";

export function getRoleRootHref(role: AppRole | null, status: "idle" | "checking" | "authenticated" | "unauthenticated"): RoleRootHref {
  if (status !== "authenticated" || !role) return "/auth/login";
  if (role === "JOB_SEEKER") return "/(jobseeker)";
  if (role === "HIRING_MANAGER") return "/(hiring)";
  return "/(internal)";
}

