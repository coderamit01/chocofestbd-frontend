import { cookies } from "next/headers";
import { ApiError } from "@/lib/api-client";
import { serverApiRequest } from "@/lib/server-api";
import { AUTH_API_URL, fetchSession } from "@/lib/session";
import type { AuthAccount, AuthSession, Profile } from "@/types/profile";

async function authGet<T>(path: string): Promise<T> {
  const cookieStore = await cookies();

  let response: Response;
  try {
    response = await fetch(`${AUTH_API_URL}/api/auth${path}`, {
      headers: { cookie: cookieStore.toString() },
      cache: "no-store",
    });
  } catch {
    throw new ApiError("Unable to reach the server. Please check your connection and try again.", 0);
  }

  const body = (await response.json().catch(() => null)) as (T & { message?: string }) | null;

  if (!response.ok || body === null) {
    throw new ApiError(body?.message ?? "Something went wrong. Please try again.", response.status);
  }

  return body;
}

export const ProfileService = {
  getProfile: () => serverApiRequest<Profile>("/auth/me"),

  getCurrentSession: async () => {
    const cookieStore = await cookies();
    return fetchSession(cookieStore.toString());
  },

  listSessions: () => authGet<AuthSession[]>("/list-sessions"),

  listAccounts: () => authGet<AuthAccount[]>("/list-accounts"),
};
