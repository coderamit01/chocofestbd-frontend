import { ADMIN_NAV, type NavSection } from "@/config/admin-nav";
import type { UserRole } from "@/types/auth";

export function filterNavByRole(sections: NavSection[], role: UserRole): NavSection[] {
  return sections
    .map((section) => ({ ...section, items: section.items.filter((item) => item.roles.includes(role)) }))
    .filter((section) => section.items.length > 0);
}

export const isActivePath = (pathname: string, url: string) =>
  url === "/admin" ? pathname === url : pathname === url || pathname.startsWith(`${url}/`);

export const canAccessPath = (role: UserRole, url: string) =>
  ADMIN_NAV.some((section) => section.items.some((item) => item.url === url && item.roles.includes(role)));
