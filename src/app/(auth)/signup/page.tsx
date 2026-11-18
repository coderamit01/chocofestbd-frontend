import type { Metadata } from "next";
import { AuthHeader } from "@/components/auth/auth-header";
import { AuthSwitchLink } from "@/components/auth/auth-switch-link";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Sign Up | Chocofest BD",
};

export default function SignupPage() {
  return (
    <div className="flex flex-col gap-8">
      <AuthHeader title="Create Account" description="Sign up to start your sweet journey" />
      <SignupForm />
      <AuthSwitchLink question="Already have an account?" label="Login" href="/login" />
    </div>
  );
}
