"use client";

import { cn } from "cn";
import type { IconType } from "react-icons";
import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

type SocialProvider = "google" | "facebook";

const providers: { id: SocialProvider; label: string; icon: IconType; iconClassName?: string }[] = [
  { id: "google", label: "Google", icon: FcGoogle },
  { id: "facebook", label: "Facebook", icon: FaFacebook, iconClassName: "text-[#1877F2]" },
];

type SocialAuthButtonsProps = {
  callbackURL?: string;
  onError?: (message: string) => void;
};

export function SocialAuthButtons({ callbackURL = "/", onError }: SocialAuthButtonsProps) {
  async function handleSignIn(provider: SocialProvider) {
    const { error } = await authClient.signIn.social({
      provider,
      callbackURL: new URL(callbackURL, window.location.origin).toString(),
    });

    if (error) onError?.(error.message ?? "Something went wrong. Please try again.");
  }

  return (
    <div className="grid grid-cols-2 gap-4 px-2">
      {providers.map(({ id, label, icon: Icon, iconClassName }) => (
        <Button
          key={id}
          type="button"
          variant="outline"
          onClick={() => handleSignIn(id)}
          className="h-12 gap-2.5 rounded-xl bg-card text-[15px] font-medium text-foreground"
        >
          <Icon className={cn("size-5", iconClassName)} />
          {label}
        </Button>
      ))}
    </div>
  );
}
