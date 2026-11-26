"use client";

import Image from "next/image";
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
        {expanded ? (
          <Image src="/Chocofestbd Logo.webp" alt="ChocoFest BD" width={137} height={80} priority className="h-11 w-auto" />
        ) : (
          <span className="flex size-11 flex-none items-center justify-center rounded-[13px] bg-brand font-heading text-base leading-none font-bold text-white shadow-[0_4px_12px_rgb(238_86_21/28%)]">
            CF
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
