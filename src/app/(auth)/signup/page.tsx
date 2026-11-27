import type { Metadata } from "next";
import { AuthHeader } from "@/components/auth/auth-header";
import { AuthSwitchLink } from "@/components/auth/auth-switch-link";
import { SignupForm } from "@/components/auth/signup-form";
import { authStyles } from "@/lib/auth-styles";

export const metadata: Metadata = {
  title: "Sign Up | Chocofest BD",
};

export default function SignupPage() {
  return (
    <div className={authStyles.form}>
      <AuthHeader title="Create Account" description="Join the team in under a minute" />
      <SignupForm />
      <AuthSwitchLink question="Already have an account?" label="Login" href="/login" />
    </div>
  );
}
