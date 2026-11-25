import { cookies } from "next/headers";
import { fetchSession } from "@/lib/session";
import type { SessionUser } from "@/types/auth";

export async function getCurrentUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const session = await fetchSession(cookieStore.toString());

  return session?.user ?? null;
}
