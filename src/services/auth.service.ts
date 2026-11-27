import { apiRequest } from "@/lib/api-client";
import type { SessionUser } from "@/types/auth";

export type SignUpPayload = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

export type SignInPayload = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export const AuthService = {
  signUp: (payload: SignUpPayload) =>
    apiRequest<SessionUser>("/auth/sign-up", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  signIn: (payload: SignInPayload) =>
    apiRequest<SessionUser>("/auth/sign-in", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
