import { cookies } from "next/headers";
import { apiRequest } from "@/lib/api-client";

export async function serverApiRequest<T>(path: string, init: RequestInit = {}) {
  const cookieStore = await cookies();

  return apiRequest<T>(path, {
    ...init,
    cache: "no-store",
    headers: { ...init.headers, cookie: cookieStore.toString() },
  });
}
