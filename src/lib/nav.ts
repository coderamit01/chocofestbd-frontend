import type { NavLink, NavSection } from "@/config/admin-nav";
import type { UserRole } from "@/types/auth";

const canSee = (link: NavLink, role: UserRole) => !link.roles || link.roles.includes(role);

export function filterNavByRole(sections: NavSection[], role: UserRole): NavSection[] {
  return sections
    .map((section) => ({
      ...section,
      items: section.items
        .filter((item) => canSee(item, role))
        .map((item) => ({ ...item, items: item.items?.filter((sub) => canSee(sub, role)) })),
    }))
    .filter((section) => section.items.length > 0);
}

export const isActivePath = (pathname: string, url: string) =>
  url === "/admin" ? pathname === url : pathname === url || pathname.startsWith(`${url}/`);
