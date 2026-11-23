import type { NextRequest } from "next/server";
import type { SessionResponse } from "@/types/auth";

const AUTH_API_URL =
  process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? process.env.NEXT_PUBLIC_URL;

export async function getSession(request: NextRequest): Promise<SessionResponse> {
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
