"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LOGIN_PATH } from "@/config/routes";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/shared/icon";

export function SidebarLogout({ expanded }: { expanded: boolean }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () =>
    startTransition(async () => {
      const { error } = await authClient.signOut();
      if (error) {
        toast.error("Couldn’t log out", { description: error.message ?? "Please try again." });
        return;
      }
      router.replace(LOGIN_PATH);
      router.refresh();
    });

  return (
    <button
      type="button"
      title="Logout"
      disabled={isPending}
      onClick={handleLogout}
      className={cn(
        "mt-5 flex h-[50px] w-full flex-none items-center gap-3.5 rounded-xl bg-surface-2 px-4 text-[15px] text-ink-2 outline-none focus-visible:shadow-[0_0_0_3px_rgb(238_86_21/20%)] disabled:opacity-60",
        expanded ? "justify-start" : "justify-center"
      )}
    >
      <Icon name="logout" strokeWidth={1.8} />
      {expanded && <span>{isPending ? "Logging out…" : "Logout"}</span>}
    </button>
  );
}
