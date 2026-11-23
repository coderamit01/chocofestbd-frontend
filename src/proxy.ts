import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export type UserRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "MANAGER"
  | "ORDER_HANDLER"
  | "RIDER"
  | "CUSTOMER";

type SessionUser = {
  id: string;
  email: string;
  name: string;
  role?: UserRole | null;
  isBanned?: boolean | null;
};

type SessionResponse = {
  user: SessionUser;
  session: { id: string; expiresAt: string };
} | null;

const STAFF_ROLES: UserRole[] = [
  "SUPER_ADMIN",
  "ADMIN",
  "MANAGER",
  "ORDER_HANDLER",
  "RIDER"
];

const PROTECTED_ROUTES: { prefix: string; roles?: UserRole[] }[] = [
  { prefix: "/admin", roles: STAFF_ROLES },
];

const AUTH_ROUTES = ["/login", "/signup"];

const ROLE_HOME: Record<UserRole, string> = {
  SUPER_ADMIN: "/admin",
  ADMIN: "/admin",
  MANAGER: "/admin",
  ORDER_HANDLER: "/admin",
  RIDER: "/admin",
  CUSTOMER: "/",
};

const LOGIN_PATH = "/login";
const AUTH_API_URL =
  process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_URL;

const matchesPrefix = (pathname: string, prefix: string) =>
  pathname === prefix || pathname.startsWith(`${prefix}/`);

const findRule = (pathname: string) =>
  PROTECTED_ROUTES.filter((r) => matchesPrefix(pathname, r.prefix)).sort(
    (a, b) => b.prefix.length - a.prefix.length,
  )[0];

const homeFor = (role?: UserRole | null) => (role ? ROLE_HOME[role] : "/") ?? "/";

async function getSession(request: NextRequest): Promise<SessionResponse> {
  const cookie = request.headers.get("cookie");
  if (!cookie || !AUTH_API_URL) return null;

  try {
    const res = await fetch(`${AUTH_API_URL}/api/auth/get-session`, {
      headers: { cookie },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as SessionResponse;
  } catch {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const rule = findRule(pathname);
  const isAuthRoute = AUTH_ROUTES.some((p) => matchesPrefix(pathname, p));

  if (!rule && !isAuthRoute) return NextResponse.next();

  const data = await getSession(request);
  const user = data?.user && !data.user.isBanned ? data.user : null;

  if (isAuthRoute) {
    if (!user) return NextResponse.next();
    const callback = request.nextUrl.searchParams.get("callbackUrl");
    const target =
      callback && callback.startsWith("/") && !callback.startsWith("//")
        ? callback
        : homeFor(user.role);
    return NextResponse.redirect(new URL(target, request.url));
  }

  if (!user) {
    const loginUrl = new URL(LOGIN_PATH, request.url);
    loginUrl.searchParams.set("callbackUrl", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  if (rule?.roles && (!user.role || !rule.roles.includes(user.role))) {
    return NextResponse.redirect(new URL(homeFor(user.role), request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/signup"],
};
