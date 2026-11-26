"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";

export function SidebarBrand({ expanded }: { expanded: boolean }) {
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <div
      className={cn(
        "flex flex-none items-center gap-3 px-1.5 pb-[22px]",
        isMobile ? "justify-between" : expanded ? "justify-start" : "justify-center"
      )}
    >
      <Link
        href="/admin"
        aria-label="ChocoFest BD — Dashboard"
        onClick={() => isMobile && setOpenMobile(false)}
        className="flex min-w-0 items-center gap-3 text-ink hover:text-ink"
      >
        <span className="flex size-11 flex-none items-center justify-center rounded-[13px] bg-brand font-heading text-base leading-none font-bold text-white shadow-[0_4px_12px_rgb(238_86_21/28%)]">
          CF
        </span>
        {expanded && (
          <span className="flex min-w-0 flex-col gap-1">
            <span className="font-heading text-xl leading-none font-semibold tracking-[-0.01em] whitespace-nowrap">
              ChocoFest <span className="text-brand">BD</span>
            </span>
            <span className="text-[11.5px] leading-none whitespace-nowrap text-ink-3">Admin dashboard</span>
          </span>
        )}
      </Link>

      {isMobile && (
        <Button variant="ghost" size="icon-sm" aria-label="Close menu" onClick={() => setOpenMobile(false)}>
          <Icon name="close" size={17} strokeWidth={1.8} />
        </Button>
      )}
    </div>
  );
}
