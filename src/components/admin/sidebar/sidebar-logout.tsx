"use client";

import { Icon } from "@/components/shared/icon";
import { useLogout } from "@/hooks/use-logout";
import { cn } from "@/lib/utils";

export function SidebarLogout({ expanded }: { expanded: boolean }) {
  const { logout, isPending } = useLogout();

  return (
    <button
      type="button"
      title="Logout"
      disabled={isPending}
      onClick={logout}
      className={cn(
        "mt-3.5 flex h-12.5 w-full flex-none items-center gap-3.5 rounded-[12px] bg-surface-2 px-4 text-[15px] text-ink-2 outline-none transition-colors hover:bg-danger-soft hover:text-danger focus-visible:shadow-[0_0_0_3px_rgb(238_86_21/28%)] disabled:opacity-60",
        expanded ? "justify-start" : "justify-center"
      )}
    >
      <Icon name="logout" strokeWidth={1.8} />
      {expanded && <span>{isPending ? "Logging out…" : "Logout"}</span>}
    </button>
  );
}
