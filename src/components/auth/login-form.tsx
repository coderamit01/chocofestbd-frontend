"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { AuthDivider } from "./auth-divider";
import { AuthInput, PasswordInput } from "./auth-input";
import { SocialAuthButtons } from "./social-auth-buttons";

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

        {error && (
          <p role="alert" className="mt-4 text-sm text-destructive">
            {error}
          </p>
        )}

        <Button
          type="submit"
          variant="secondary"
          disabled={isPending}
          className="mt-8 h-13 w-full rounded-xl text-[15px] font-semibold text-white"
        >
          {isPending ? "Logging in..." : "Login"}
        </Button>
      </form>

      <div className="mt-6 flex flex-col gap-6">
        <AuthDivider label="Or Login with" />
        <SocialAuthButtons onError={setError} />
      </div>
    </div>
  );
}
