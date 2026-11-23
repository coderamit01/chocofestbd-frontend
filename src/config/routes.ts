import type { UserRole } from "@/types/auth";

export type ProtectedRoute = { prefix: string; roles?: UserRole[] };

export const STAFF_ROLES: UserRole[] = [
  "SUPER_ADMIN",
  "ADMIN",
  "MANAGER",
  "ORDER_HANDLER",
  "RIDER",
];

export const PROTECTED_ROUTES: ProtectedRoute[] = [
  { prefix: "/admin", roles: STAFF_ROLES },
];

export const AUTH_ROUTES = ["/login", "/signup"];

export const LOGIN_PATH = "/login";

export const ROLE_HOME: Record<UserRole, string> = {
  SUPER_ADMIN: "/admin",
  ADMIN: "/admin",
  MANAGER: "/admin",
  ORDER_HANDLER: "/admin",
  RIDER: "/admin",
  CUSTOMER: "/",
};
