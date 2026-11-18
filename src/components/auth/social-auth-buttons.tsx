"use client";

import type { IconType } from "react-icons";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

type SocialProvider = "google";

const providers: { id: SocialProvider; label: string; icon: IconType }[] = [
  { id: "google", label: "Google", icon: FcGoogle },
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
    <div className="flex flex-wrap justify-center gap-4">
      {providers.map(({ id, label, icon: Icon }) => (
        <Button
          key={id}
          type="button"
          variant="outline"
          onClick={() => handleSignIn(id)}
          className="h-12 min-w-44 gap-2.5 rounded-xl bg-card px-8 text-[15px] font-medium text-foreground"
        >
          <Icon className="size-5" />
          {label}
        </Button>
      ))}
    </div>
  );
}
