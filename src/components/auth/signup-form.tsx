"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { AuthFormError } from "./auth-form-error";
import { AuthInput, PasswordInput } from "./auth-input";
import { AuthSocialSection } from "./auth-social-section";
import { AuthSubmitButton } from "./auth-submit-button";

const MIN_PASSWORD_LENGTH = 8;

export function SignupForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const password = String(formData.get("password"));

    if (password.length < MIN_PASSWORD_LENGTH) {
      setPasswordError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`);
      return;
    }

    setIsPending(true);

    const { error } = await authClient.signUp.email({
      name: String(formData.get("name")).trim(),
      email: String(formData.get("email")),
      password,
    });

    setIsPending(false);

    if (error) {
      setError(error.message ?? "Could not create your account. Please try again.");
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="flex flex-col gap-3.5">
          <AuthInput id="name" name="name" label="Full name" autoComplete="name" required />
          <AuthInput id="email" name="email" type="email" label="Email address" autoComplete="email" required />
          <PasswordInput
            id="password"
            name="password"
            label="Password"
            error={passwordError}
            onChange={() => setPasswordError(null)}
            autoComplete="new-password"
            required
          />
          <AuthInput id="address" name="address" label="Address (optional)" autoComplete="street-address" />
        </div>

        <AuthFormError message={error} />

        <AuthSubmitButton isPending={isPending} pendingLabel="Creating account..." className="mt-8">
          Sign Up
        </AuthSubmitButton>
      </form>

      <AuthSocialSection label="Or Sign up with" onError={setError} />
    </div>
  );
}
