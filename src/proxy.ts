import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOGIN_PATH } from "@/config/routes";
import { findProtectedRoute, homeFor, isAuthRoute, isSafeRedirect } from "@/lib/route-guard";
import { getSession } from "@/lib/session";

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const rule = findProtectedRoute(pathname);
  const authRoute = isAuthRoute(pathname);

  if (!rule && !authRoute) return NextResponse.next();

  const data = await getSession(request);
  const user = data?.user && !data.user.isBanned ? data.user : null;

  if (authRoute) {
    if (!user) return NextResponse.next();
    const callback = request.nextUrl.searchParams.get("callbackUrl");
    const target = isSafeRedirect(callback) ? callback : homeFor(user.role);
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
