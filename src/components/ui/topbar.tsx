"use client";

import Link from "next/link";
import { Icon } from "@/components/shared/icon";
import { useSidebar } from "./sidebar";

export default function Topbar() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="flex h-16 items-center justify-between border-b border-line bg-surface px-4 md:hidden">
      <Link href="/admin" className="flex items-center gap-2.5 text-ink">
        <span className="flex size-9 items-center justify-center rounded-[11px] bg-brand font-heading text-sm leading-none font-bold text-white">
          CF
        </span>
        <span className="font-heading text-lg leading-none font-semibold">
          ChocoFest <span className="text-brand">BD</span>
        </span>
      </Link>
      <button
        type="button"
        aria-label="Open menu"
        onClick={toggleSidebar}
        className="flex size-11 items-center justify-center rounded-[9px] border border-line-2 bg-surface text-ink-2"
      >
        <Icon name="menu" strokeWidth={1.8} />
      </button>
    </header>
  );
}
