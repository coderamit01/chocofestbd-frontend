"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LOGIN_PATH } from "@/config/routes";
import { authClient } from "@/lib/auth-client";

export function useLogout() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const logout = () =>
    startTransition(async () => {
      const { error } = await authClient.signOut();
      if (error) {
        toast.error("Couldn’t log out", { description: error.message ?? "Please try again." });
        return;
      }
      router.replace(LOGIN_PATH);
      router.refresh();
    });

  return { logout, isPending };
}
