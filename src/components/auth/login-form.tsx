"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { AuthFormError } from "./auth-form-error";
import { AuthInput, PasswordInput } from "./auth-input";
import { AuthSocialSection } from "./auth-social-section";
import { AuthSubmitButton } from "./auth-submit-button";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsPending(true);

    const formData = new FormData(event.currentTarget);
    const { error } = await authClient.signIn.email({
      email: String(formData.get("email")),
      password: String(formData.get("password")),
    });

    setIsPending(false);

    if (error) {
      setError(error.message ?? "Invalid email or password.");
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex flex-col gap-3.5">
          <AuthInput id="email" name="email" type="email" label="Email address" autoComplete="email" required />
          <PasswordInput id="password" name="password" label="Password" autoComplete="current-password" required />
        </div>

        <Link
          href="/forgot-password"
          className="mt-3 self-end text-[13px] text-muted-foreground transition-colors hover:text-foreground"
        >
          Forgot password?
        </Link>

        <AuthFormError message={error} />

        <AuthSubmitButton isPending={isPending} pendingLabel="Logging in..." className="mt-8">
          Login
        </AuthSubmitButton>
      </form>

      <AuthSocialSection label="Or Login with" onError={setError} />
    </div>
  );
}
