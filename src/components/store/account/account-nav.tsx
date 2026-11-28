"use client";

import { usePathname } from "next/navigation";
import type { AccountTab } from "@/types/store-account";
import { AccountNavItem } from "./account-nav-item";

export function AccountNav({ tabs }: { tabs: AccountTab[] }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="My account"
      className="flex flex-col rounded-[20px] border border-[#f0ebe6] bg-white p-2 max-[900px]:flex-row max-[900px]:overflow-x-auto max-[900px]:p-1.5"
    >
      {tabs.map((tab) => (
        <AccountNavItem key={tab.href} {...tab} active={pathname === tab.href} />
      ))}
      <AccountNavItem href="/" label="Sign out" icon="logout" />
    </nav>
  );
}
