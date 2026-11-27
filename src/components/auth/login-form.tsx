"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiError } from "@/lib/api-client";
import { authStyles } from "@/lib/auth-styles";
import { homeFor, isSafeRedirect } from "@/lib/route-guard";
import { signInSchema, type SignInInput, type SignInValues } from "@/lib/validations/auth";
import { AuthService } from "@/services/auth.service";
import { AuthField } from "./auth-field";
import { AuthFormError } from "./auth-form-error";
import { AuthSocialSection } from "./auth-social-section";
import { AuthSubmitButton } from "./auth-submit-button";
import { PasswordField } from "./password-field";

const isSignInField = (field: string): field is keyof SignInInput => field in signInSchema.shape;

export function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInInput, unknown, SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "", rememberMe: true },
  });

  const onSubmit = async (values: SignInValues) => {
    try {
      const { data: user } = await AuthService.signIn(values);
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
    <>
      <AuthFormError message={errors.root?.message ?? null} />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className={authStyles.stack}>
        <AuthField
          id="email"
          label="Email address"
          type="email"
          placeholder="Email address"
          autoComplete="username"
          error={errors.email?.message}
          {...register("email")}
        />
        <PasswordField
          id="password"
          label="Password"
          placeholder="Password"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password")}
        />

        <div className="-mt-0.5 flex items-center justify-between gap-3">
          <label className="inline-flex cursor-pointer items-center gap-[9px] text-[13.5px] text-ink-2">
            <input type="checkbox" className={authStyles.checkbox} {...register("rememberMe")} />
            Remember me
          </label>
          <Link href="/forgot-password" className="text-[13px] font-medium text-[#8a7f79] hover:text-brand">
            Forgot password?
          </Link>
        </div>

        <AuthSubmitButton isPending={isSubmitting} pendingLabel="Logging in…">
          Login
        </AuthSubmitButton>
      </form>

      <AuthSocialSection
        label="Or login with"
        buttonLabel="Login with Google"
        onError={(message) => setError("root", { message })}
      />
    </>
  );
}
