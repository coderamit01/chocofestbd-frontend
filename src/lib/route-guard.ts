import { AUTH_ROUTES, PROTECTED_ROUTES, ROLE_HOME } from "@/config/routes";
import type { UserRole } from "@/types/auth";

export const matchesPrefix = (pathname: string, prefix: string) =>
  pathname === prefix || pathname.startsWith(`${prefix}/`);

export const findProtectedRoute = (pathname: string) =>
  PROTECTED_ROUTES.filter((r) => matchesPrefix(pathname, r.prefix)).sort(
    (a, b) => b.prefix.length - a.prefix.length,
  )[0];

export const isAuthRoute = (pathname: string) =>
  AUTH_ROUTES.some((p) => matchesPrefix(pathname, p));

export const homeFor = (role?: UserRole | null) =>
  (role ? ROLE_HOME[role] : "/") ?? "/";

export const isSafeRedirect = (url: string | null): url is string =>
  !!url && url.startsWith("/") && !url.startsWith("//");
