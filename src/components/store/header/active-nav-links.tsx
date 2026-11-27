"use client";

import { usePathname } from "next/navigation";
import type { StoreNavLink } from "@/types/store";
import { NavLinks } from "./nav-links";

export function ActiveNavLinks({ links }: { links: StoreNavLink[] }) {
  return <NavLinks links={links} pathname={usePathname()} />;
}
