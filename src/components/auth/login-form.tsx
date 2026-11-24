"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ApiError } from "@/lib/api-client";
import { homeFor, isSafeRedirect } from "@/lib/route-guard";
import { signInSchema, type SignInInput, type SignInValues } from "@/lib/validations/auth";
import { AuthService } from "@/services/auth.service";
import { AuthFieldError } from "./auth-field-error";
import { AuthFormError } from "./auth-form-error";
import { AuthSocialSection } from "./auth-social-section";
import { AuthSubmitButton } from "./auth-submit-button";

const inputClassName =
  "h-13 rounded-xl border-input bg-off-white px-5 text-[15px] text-foreground md:text-[15px] placeholder:text-muted-foreground/80 focus-visible:border-secondary focus-visible:ring-secondary/20";

const isSignInField = (field: string): field is keyof SignInInput => field in signInSchema.shape;

export function LoginForm() {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const PasswordIcon = isPasswordVisible ? Eye : EyeOff;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInInput, unknown, SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async ({ email, password }: SignInValues) => {
    try {
      const { data: user } = await AuthService.signIn({ email, password });
      const callbackUrl = new URLSearchParams(window.location.search).get("callbackUrl");
      router.replace(isSafeRedirect(callbackUrl) ? callbackUrl : homeFor(user?.role));
      router.refresh();
    } catch (error) {
      if (error instanceof ApiError && error.fieldErrors.length > 0) {
        error.fieldErrors.forEach(({ field, message }) => {
          if (isSignInField(field)) setError(field, { message });
        });
        return;
      }

      setError("root", {
        message: error instanceof Error ? error.message : "Could not log you in. Please try again.",
      });
    }
  };

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col">
        <div className="flex flex-col gap-3.5">
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Email address"
              autoComplete="email"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={inputClassName}
              {...register("email")}
            />
            <AuthFieldError id="email-error" message={errors.email?.message} />
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Password"
                autoComplete="current-password"
                aria-invalid={errors.password ? true : undefined}
                aria-describedby={errors.password ? "password-error" : undefined}
                className={`${inputClassName} pr-14`}
                {...register("password")}
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
            <AuthFieldError id="password-error" message={errors.password?.message} />
          </div>
        </div>

        <Link
          href="/forgot-password"
          className="mt-3 self-end text-[13px] text-muted-foreground transition-colors hover:text-foreground"
        >
          Forgot password?
        </Link>

        <AuthFormError message={errors.root?.message ?? null} />

        <AuthSubmitButton isPending={isSubmitting} pendingLabel="Logging in..." className="mt-8">
          Login
        </AuthSubmitButton>
      </form>

      <AuthSocialSection label="Or Login with" onError={(message) => setError("root", { message })} />
    </div>
  );
}
