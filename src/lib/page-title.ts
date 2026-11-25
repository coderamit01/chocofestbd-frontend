import { ADMIN_NAV } from "@/config/admin-nav";
import { NOT_FOUND_TITLE, ROUTE_TITLES } from "@/config/page-titles";

const NAV_TITLES = new Map(ADMIN_NAV.flatMap((section) => section.items.map((item) => [item.url, item.title] as const)));

export function getAdminPageTitle(pathname: string) {
  const path = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;

  return NAV_TITLES.get(path) ?? ROUTE_TITLES.find(({ pattern }) => pattern.test(path))?.title ?? NOT_FOUND_TITLE;
}
