import type { NextRequest } from "next/server";
import type { SessionResponse } from "@/types/auth";

export const AUTH_API_URL =
  process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_URL;

export async function fetchSession(cookie: string | null): Promise<SessionResponse> {
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

export const getSession = (request: NextRequest) => fetchSession(request.headers.get("cookie"));
