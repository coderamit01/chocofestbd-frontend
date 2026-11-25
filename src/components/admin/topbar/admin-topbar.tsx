"use client";

import { usePathname } from "next/navigation";
import { getAdminPageTitle } from "@/lib/page-title";
import { TopbarActions } from "./topbar-actions";

export function AdminTopbar() {
  const pathname = usePathname();

  return (
    <header className="relative z-30 flex flex-wrap items-center gap-4 px-8 pt-6.5 pb-5.5 font-sans">
      <h1 className="min-w-45 flex-1 font-heading text-title text-ink max-[900px]:text-xl">{getAdminPageTitle(pathname)}</h1>
      <TopbarActions />
    </header>
  );
}
