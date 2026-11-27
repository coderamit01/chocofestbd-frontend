"use client";

import Link from "next/link";
import { cn } from "cn";
import { Icon } from "@/components/shared/icon";
import type { BottomNavItem } from "@/types/store";
import { CountBadge } from "./count-badge";
import { useHeader } from "./header-provider";
import { isActivePath } from "./is-active-path";

type BottomNavProps = {
  items: BottomNavItem[];
  pathname: string | null;
};

const ITEM_CLASS =
  "flex flex-col items-center gap-1 rounded-[12px] px-3.5 py-1.5 font-sans text-[11px] leading-none font-medium";

export function BottomNav({ items, pathname }: BottomNavProps) {
  const { count, panel, openPanel } = useHeader();

  return (
    <nav
      aria-label="Quick links"
      className="fixed right-0 bottom-0 left-0 z-[45] hidden h-16 items-center justify-around border-t border-[#f0ebe6] bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-6px_20px_-12px_rgba(61,17,4,0.25)] max-[900px]:flex"
    >
      {items.map((item) => {
        const content = (
          <span className="relative">
            <Icon name={item.icon} size={22} strokeWidth={1.8} />
            {item.action === "cart" && count > 0 && <CountBadge count={count} className="-top-1.5 -right-2.5" />}
          </span>
        );

        if (item.href) {
          const active = isActivePath(pathname, item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(ITEM_CLASS, active ? "text-brand hover:text-brand" : "text-[#8a7f79] hover:text-[#8a7f79]")}
            >
              {content}
              {item.label}
            </Link>
          );
        }

        const action = item.action ?? "menu";
        return (
          <button
            key={item.label}
            type="button"
            aria-label={item.action === "cart" ? `${item.label}, ${count} items` : item.label}
            aria-expanded={panel === action}
            onClick={() => openPanel(action)}
            className={cn(ITEM_CLASS, "text-[#8a7f79]")}
          >
            {content}
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}
