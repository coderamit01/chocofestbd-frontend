import type { Metadata } from "next";
import { AuthHeader } from "@/components/auth/auth-header";
import { AuthSwitchLink } from "@/components/auth/auth-switch-link";
import { LoginForm } from "@/components/auth/login-form";
import { authStyles } from "@/lib/auth-styles";

export const metadata: Metadata = {
  title: "Login | Chocofest BD",
};

export default function LoginPage() {
  return (
    <div className={authStyles.form}>
      <AuthHeader title="Welcome Back" description="Please login to your account" />
      <LoginForm />
      <AuthSwitchLink question="Don’t have an account?" label="Signup" href="/signup" />
    </div>
  );
}
