"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ApiError } from "@/lib/api-client";
import { homeFor } from "@/lib/route-guard";
import { signUpSchema, type SignUpInput, type SignUpValues } from "@/lib/validations/auth";
import { AuthService } from "@/services/auth.service";
import { AuthFormError } from "./auth-form-error";
import { AuthSocialSection } from "./auth-social-section";
import { AuthSubmitButton } from "./auth-submit-button";

const inputClassName =
  "h-13 rounded-xl border-input bg-off-white px-5 text-[15px] text-foreground md:text-[15px] placeholder:text-muted-foreground/80 focus-visible:border-secondary focus-visible:ring-secondary/20";

const isSignUpField = (field: string): field is keyof SignUpInput => field in signUpSchema.shape;

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;

  return (
    <p id={id} role="alert" className="mt-1.5 px-1 text-xs text-destructive">
      {message}
    </p>
  );
}

export function SignupForm() {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const PasswordIcon = isPasswordVisible ? Eye : EyeOff;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput, unknown, SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "", address: "" },
  });

  async function onSubmit({ name, email, password }: SignUpValues) {
    try {
      const { data: user } = await AuthService.signUp({ name, email, password });
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
  }

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col">
        <div className="flex flex-col gap-3.5">
          <div>
            <label htmlFor="name" className="sr-only">
              Full name
            </label>
            <Input
              id="name"
              placeholder="Full name"
              autoComplete="name"
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={inputClassName}
              {...register("name")}
            />
            <FieldError id="name-error" message={errors.name?.message} />
          </div>

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
            <FieldError id="email-error" message={errors.email?.message} />
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
                autoComplete="new-password"
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
            <FieldError id="password-error" message={errors.password?.message} />
          </div>
        </div>

        <AuthFormError message={errors.root?.message ?? null} />

        <AuthSubmitButton isPending={isSubmitting} pendingLabel="Creating account..." className="mt-8">
          Sign Up
        </AuthSubmitButton>
      </form>

      <AuthSocialSection label="Or Sign up with" onError={(message) => setError("root", { message })} />
    </div>
  );
}
