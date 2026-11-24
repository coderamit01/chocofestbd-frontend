"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { AuthFormError } from "./auth-form-error";
import { AuthSocialSection } from "./auth-social-section";
import { AuthSubmitButton } from "./auth-submit-button";

const inputClassName =
  "h-13 rounded-xl border-input bg-off-white px-5 text-[15px] text-foreground md:text-[15px] placeholder:text-muted-foreground/80 focus-visible:border-secondary focus-visible:ring-secondary/20";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const PasswordIcon = isPasswordVisible ? Eye : EyeOff;

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
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email address"
              autoComplete="email"
              required
              className={inputClassName}
            />
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Password"
                autoComplete="current-password"
                required
                className={`${inputClassName} pr-14`}
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible((visible) => !visible)}
                aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                className="absolute top-1/2 right-4 flex -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-secondary/40 focus-visible:outline-none"
              >
                <PasswordIcon className="size-5" />
              </button>
            </div>
          </div>
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
