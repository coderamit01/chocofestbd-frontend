import { apiRequest } from "@/lib/api-client";
import { authClient } from "@/lib/auth-client";
import type { Profile } from "@/types/profile";

type AuthResult = { error: { message?: string; code?: string } | null };

const unwrap = async (request: Promise<AuthResult>, fallback: string) => {
  const { error } = await request;
  if (error) throw new Error(error.message || fallback);
};

export const ProfileClient = {
  uploadPhoto: (userId: string, file: File) => {
    const body = new FormData();
    body.append("image", file);
    return apiRequest<Profile>(`/users/${userId}`, { method: "PUT", body });
  },

  changePassword: (currentPassword: string, newPassword: string) =>
    unwrap(
      authClient.changePassword({ currentPassword, newPassword, revokeOtherSessions: true }),
      "Your password wasn’t changed. Please try again."
    ),

  revokeSession: (token: string) =>
    unwrap(authClient.revokeSession({ token }), "That device couldn’t be signed out. Please try again."),

  revokeOtherSessions: () =>
    unwrap(authClient.revokeOtherSessions(), "Other devices couldn’t be signed out. Please try again."),

  syncSession: () => authClient.$store.notify("$sessionSignal"),
};
