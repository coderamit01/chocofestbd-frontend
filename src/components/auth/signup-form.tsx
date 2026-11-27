"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiError } from "@/lib/api-client";
import { authStyles } from "@/lib/auth-styles";
import { homeFor } from "@/lib/route-guard";
import { signUpSchema, type SignUpInput, type SignUpValues } from "@/lib/validations/auth";
import { AuthService } from "@/services/auth.service";
import { AuthField } from "./auth-field";
import { AuthFieldError } from "./auth-field-error";
import { AuthFormError } from "./auth-form-error";
import { AuthSocialSection } from "./auth-social-section";
import { AuthSubmitButton } from "./auth-submit-button";
import { PasswordField } from "./password-field";
import { PasswordStrength } from "./password-strength";

const isSignUpField = (field: string): field is keyof SignUpInput => field in signUpSchema.shape;

export function SignupForm() {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput, unknown, SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", phone: "", password: "", terms: false },
  });

  const password = useWatch({ control, name: "password" });
  const phoneField = register("phone", {
    onChange: (event) => {
      event.target.value = event.target.value.replace(/\D/g, "").slice(0, 11);
    },
  });

  const onSubmit = async ({ name, email, phone, password }: SignUpValues) => {
    try {
      const { data: user } = await AuthService.signUp({ name, email, phone, password });
      router.replace(homeFor(user?.role));
      router.refresh();
    } catch (error) {
      if (error instanceof ApiError && error.fieldErrors.length > 0) {
        error.fieldErrors.forEach(({ field, message }) => {
          if (isSignUpField(field)) setError(field, { message });
        });
        return;
      }

      setError("root", {
        message: error instanceof Error ? error.message : "Could not create your account. Please try again.",
      });
    }
  };

  return (
    <>
      <AuthFormError message={errors.root?.message ?? null} />

      <form onSubmit={handleSubmit(onSubmit)} noValidate className={authStyles.stack}>
        <AuthField id="name" label="Full name" placeholder="Full name" autoComplete="name" error={errors.name?.message} {...register("name")} />

        <div className="grid grid-cols-2 gap-3.5 max-[860px]:grid-cols-1">
          <AuthField
            id="email"
            label="Email address"
            type="email"
            placeholder="Email address"
            autoComplete="email"
            error={errors.email?.message}
            {...register("email")}
          />
          <AuthField
            id="phone"
            label="Mobile number"
            type="tel"
            inputMode="numeric"
            placeholder="Mobile 01XXXXXXXXX"
            autoComplete="tel-national"
            error={errors.phone?.message}
            {...phoneField}
          />
        </div>

        <PasswordField
          id="password"
          label="Password"
          placeholder="Password"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password")}
        />
        <PasswordStrength value={password} />

        <label className="inline-flex cursor-pointer items-start gap-[9px] text-[13.5px] text-ink-2">
          <input
            type="checkbox"
            aria-invalid={errors.terms ? true : undefined}
            aria-describedby={errors.terms ? "terms-error" : undefined}
            className={authStyles.checkbox}
            {...register("terms")}
          />
          <span>
            I agree to the{" "}
            <Link href="/terms" className={authStyles.link}>
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy-policy" className={authStyles.link}>
              Privacy Policy
            </Link>
          </span>
        </label>
        {errors.terms && (
          <div className="-mt-1.5">
            <AuthFieldError id="terms-error" message={errors.terms.message} />
          </div>
        )}

        <AuthSubmitButton isPending={isSubmitting} pendingLabel="Creating account…">
          Sign up
        </AuthSubmitButton>
      </form>

      <AuthSocialSection
        label="Or sign up with"
        buttonLabel="Sign up with Google"
        onError={(message) => setError("root", { message })}
      />
    </>
  );
}
