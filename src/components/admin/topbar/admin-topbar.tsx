"use client";

import { usePathname } from "next/navigation";
import { getAdminPageTitle } from "@/lib/page-title";
import { TopbarActions } from "./topbar-actions";

export function AdminTopbar() {
  const pathname = usePathname();

  return (
    <header className="relative z-30 flex flex-wrap items-center gap-4 border-b border-line bg-surface px-8 py-[18px] font-sans shadow-[0_1px_2px_rgb(34_21_16/4%)]">
      <h1 className="min-w-40 flex-1 font-heading text-title text-ink max-[900px]:text-2xl">{getAdminPageTitle(pathname)}</h1>
      <TopbarActions />
    </header>
  );
}
