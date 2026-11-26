"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getAdminPageTitle } from "@/lib/page-title";
import { TopbarActions } from "./topbar-actions";

export function AdminTopbar() {
  const pathname = usePathname();

  return (
    <header className="relative z-30 flex flex-wrap items-center gap-4 border-b border-line bg-surface px-8 py-[18px] font-sans shadow-[0_1px_2px_rgb(34_21_16/4%)] max-[900px]:sticky max-[900px]:top-0 max-[900px]:flex-nowrap max-[900px]:gap-2.5 max-[900px]:px-4 max-[900px]:py-3">
      <Link
        href="/admin"
        aria-label="ChocoFest BD — Dashboard"
        className="flex min-w-0 flex-1 items-center gap-2.5 text-ink hover:text-ink min-[901px]:hidden"
      >
        <span className="flex size-[38px] flex-none items-center justify-center rounded-[11px] bg-brand font-heading text-sm leading-none font-bold text-white shadow-[0_4px_10px_rgb(238_86_21/28%)]">
          CF
        </span>
        <span className="truncate font-heading text-lg leading-none font-semibold tracking-[-0.01em] max-[360px]:hidden">
          ChocoFest <span className="text-brand">BD</span>
        </span>
      </Link>
      <h1 className="min-w-40 flex-1 font-heading text-title text-ink max-[900px]:hidden">{getAdminPageTitle(pathname)}</h1>
      <TopbarActions />
    </header>
  );
}
