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
    <div className="flex flex-col gap-3">
      {providers.map(({ id, label, icon: Icon }) => (
        <Button
          key={id}
          type="button"
          variant="outline"
          onClick={() => handleSignIn(id)}
          className="h-12 w-full gap-2.5 rounded-[12px] text-[15px]"
        >
          <Icon className="size-5" />
          {label}
        </Button>
      ))}
    </div>
  );
}
