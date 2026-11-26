"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, buttonVariants } from "@/components/ui/button";
import { formStyles } from "@/lib/form-styles";
import { cn } from "@/lib/utils";
import { ApiError } from "@/lib/api-client";
import { homeFor, isSafeRedirect } from "@/lib/route-guard";
import { signInSchema, type SignInInput, type SignInValues } from "@/lib/validations/auth";
import { AuthService } from "@/services/auth.service";
import { AuthFieldError } from "./auth-field-error";
import { AuthFormError } from "./auth-form-error";
import { AuthSocialSection } from "./auth-social-section";
import { AuthSubmitButton } from "./auth-submit-button";

const isSignInField = (field: string): field is keyof SignInInput => field in signInSchema.shape;

export function LoginForm() {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
    <div className="flex flex-col gap-6">
      <AuthFormError message={errors.root?.message ?? null} />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
        <div className={formStyles.field}>
          <label htmlFor="email" className={formStyles.label}>
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@chocofestbd.com"
            autoComplete="username"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(formStyles.input, "h-12.5 bg-surface")}
            {...register("email")}
          />
          <AuthFieldError id="email-error" message={errors.email?.message} />
        </div>

        <div className={formStyles.field}>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className={formStyles.label}>
              Password
            </label>
            <Link href="/forgot-password" className={buttonVariants({ variant: "link", className: "text-[13px]" })}>
              Forgot password?
            </Link>
          </div>
          <div className={cn(formStyles.inputGroup, "h-12.5 bg-surface")}>
            <input
              id="password"
              type={isPasswordVisible ? "text" : "password"}
              placeholder="At least 8 characters"
              autoComplete="current-password"
              aria-invalid={errors.password ? true : undefined}
              aria-describedby={errors.password ? "password-error" : undefined}
              className={formStyles.groupInput}
              {...register("password")}
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsPasswordVisible((visible) => !visible)}
              aria-label={isPasswordVisible ? "Hide password" : "Show password"}
              className="m-1.5 h-auto"
            >
              {isPasswordVisible ? "Hide" : "Show"}
            </Button>
          </div>
          <AuthFieldError id="password-error" message={errors.password?.message} />
        </div>

        <AuthSubmitButton isPending={isSubmitting} pendingLabel="Signing in…">
          Sign in
        </AuthSubmitButton>
      </form>

      <AuthSocialSection label="Or sign in with" onError={(message) => setError("root", { message })} />
    </div>
  );
}
