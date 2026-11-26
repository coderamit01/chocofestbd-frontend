"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/components/ui/sidebar";
import type { NavCounts } from "@/config/admin-nav";
import { BOTTOM_NAV_ICONS } from "@/config/mobile-nav";
import { authClient } from "@/lib/auth-client";
import { getBottomNavItems, getQuickActions } from "@/lib/mobile-nav";
import { isActivePath } from "@/lib/nav";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types/auth";
import { BottomNavLink, BottomNavMenuButton } from "./bottom-nav-item";
import { QuickActionsSheet } from "./quick-actions-sheet";

export function MobileBottomNav({ counts }: { counts?: NavCounts }) {
  const pathname = usePathname();
  const { data } = authClient.useSession();
  const { setOpenMobile } = useSidebar();
  const [quickPath, setQuickPath] = useState<string | null>(null);
  const quickOpen = quickPath === pathname;

  const role = data?.user.role as UserRole | undefined;
  const items = useMemo(() => (role ? getBottomNavItems(role) : []), [role]);
  const actions = useMemo(() => (role ? getQuickActions(role) : []), [role]);

  useEffect(() => {
    if (!quickOpen) return;
    const handleKey = (event: KeyboardEvent) => event.key === "Escape" && setQuickPath(null);
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [quickOpen]);

  if (!role) return null;

  const closeQuick = () => setQuickPath(null);
  const menuActive = !items.some((item) => isActivePath(pathname, item.url));
  const renderItem = (item: (typeof items)[number]) => (
    <BottomNavLink
      key={item.url}
      href={item.url}
      label={item.title}
      icon={BOTTOM_NAV_ICONS[item.url]}
      active={isActivePath(pathname, item.url)}
      count={item.countKey ? counts?.[item.countKey] : undefined}
    />
  );

  return (
    <div className="min-[901px]:hidden">
      {quickOpen && actions.length > 0 && <QuickActionsSheet actions={actions} onClose={closeQuick} />}

      <div className="fixed right-3 bottom-[calc(12px+env(safe-area-inset-bottom))] left-3 z-40 h-[68px] [filter:drop-shadow(0_8px_18px_rgb(61_17_4/13%))_drop-shadow(0_1px_2px_rgb(61_17_4/8%))]">
        <nav
          aria-label="Quick navigation"
          className="relative flex h-[68px] items-center justify-between gap-0.5 rounded-3xl bg-surface px-2 mask-notch"
        >
          {items.slice(0, 2).map(renderItem)}
          <span className="relative block flex-[0_0_120px] self-stretch">
            {actions.length > 0 && (
              <span className="pointer-events-none absolute right-0 bottom-[11px] left-0 text-center font-sans text-[11px] leading-none font-medium text-[#8a7f79]">
                {quickOpen ? "Close" : "Create"}
              </span>
            )}
          </span>
          {items.slice(2).map(renderItem)}
          <BottomNavMenuButton
            active={menuActive}
            onClick={() => {
              closeQuick();
              setOpenMobile(true);
            }}
          />
        </nav>

        {actions.length > 0 && (
          <button
            type="button"
            aria-label={quickOpen ? "Close quick actions" : "Quick actions"}
            aria-expanded={quickOpen}
            aria-controls="quick-actions"
            onClick={() => setQuickPath(quickOpen ? null : pathname)}
            className={cn(
              "absolute -top-9 left-1/2 z-1 flex size-15 -translate-x-1/2 cursor-pointer items-center justify-center rounded-full border-0 text-white outline-none transition-[transform,background-color] duration-250 focus-visible:shadow-[0_0_0_4px_rgb(238_86_21/35%)] active:scale-[0.94]",
              quickOpen
                ? "bg-choco shadow-[0_8px_20px_rgb(61_17_4/35%)]"
                : "bg-brand shadow-[0_8px_20px_rgb(238_86_21/38%)] hover:bg-brand-hover"
            )}
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              aria-hidden="true"
              className={cn("transition-transform duration-250", quickOpen && "rotate-45")}
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
