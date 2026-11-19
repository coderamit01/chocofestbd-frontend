import type { Metadata } from "next";
import { AuthHeader } from "@/components/auth/auth-header";
import { AuthSwitchLink } from "@/components/auth/auth-switch-link";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Login | Chocofest BD",
};

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-8">
      <AuthHeader title="Welcome Back" description="Please login to your account" />
      <LoginForm />
      <AuthSwitchLink question="Don't have an account?" label="Create an account" href="/signup" />
    </div>
  );
}
