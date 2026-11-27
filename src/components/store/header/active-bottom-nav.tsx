"use client";

import { usePathname } from "next/navigation";
import type { BottomNavItem } from "@/types/store";
import { BottomNav } from "./bottom-nav";

export function ActiveBottomNav({ items }: { items: BottomNavItem[] }) {
  return <BottomNav items={items} pathname={usePathname()} />;
}
