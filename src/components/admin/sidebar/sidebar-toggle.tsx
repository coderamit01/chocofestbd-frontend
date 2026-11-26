"use client";

import { Icon } from "@/components/shared/icon";
import { useSidebar } from "@/components/ui/sidebar";

export function SidebarToggle({ collapsed }: { collapsed: boolean }) {
  const { toggleSidebar } = useSidebar();
  const label = collapsed ? "Expand sidebar" : "Collapse sidebar";

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={toggleSidebar}
      className="absolute top-[34px] -right-3.5 z-2 flex size-7 items-center justify-center rounded-full border border-line bg-surface p-0 text-ink-2 shadow-[0_2px_6px_rgb(34_21_16/10%)] outline-none transition-colors hover:border-brand hover:bg-brand hover:text-white focus-visible:shadow-[0_0_0_3px_rgb(238_86_21/28%)]"
    >
      <Icon name={collapsed ? "chevronRight" : "chevronLeft"} size={16} strokeWidth={2.2} />
    </button>
  );
}
