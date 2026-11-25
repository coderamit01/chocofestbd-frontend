"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { NavIcon } from "./nav-icon";

export function SidebarBrand({ expanded }: { expanded: boolean }) {
  const { isMobile, toggleSidebar, setOpenMobile } = useSidebar();

  return (
    <>
      <div className="flex items-center justify-between px-2 pt-1.5 pb-[22px]">
        <Link
          href="/admin"
          aria-label="ChocoFest BD dashboard"
          onClick={() => isMobile && setOpenMobile(false)}
          className="flex min-w-0 items-center gap-3 text-ink"
        >
          <span className="flex size-10 flex-none items-center justify-center rounded-[12px] bg-brand font-heading text-[15px] leading-none font-bold text-white">
            CF
          </span>
          {expanded && (
            <span className="font-heading text-[21px] leading-none font-semibold tracking-[-0.01em] whitespace-nowrap">
              ChocoFest <span className="text-brand">BD</span>
            </span>
          )}
        </Link>

        {isMobile ? (
          <Button variant="ghost" size="icon-sm" aria-label="Close menu" onClick={() => setOpenMobile(false)}>
            <NavIcon name="close" size={18} strokeWidth={1.8} />
          </Button>
        ) : (
          expanded && (
            <Button variant="ghost" size="icon-sm" aria-label="Collapse sidebar" onClick={toggleSidebar}>
              <NavIcon name="collapse" size={18} strokeWidth={1.8} />
            </Button>
          )
        )}
      </div>

      {!expanded && (
        <Button
          variant="soft"
          size="sm"
          aria-label="Expand sidebar"
          onClick={toggleSidebar}
          className="mx-auto -mt-2.5 mb-3.5 w-11 px-0"
        >
          <NavIcon name="expand" size={18} strokeWidth={1.8} />
        </Button>
      )}
    </>
  );
}
