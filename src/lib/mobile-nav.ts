import { ADMIN_NAV, type NavItem } from "@/config/admin-nav";
import {
  BOTTOM_NAV_LABELS,
  BOTTOM_NAV_PREFERRED,
  BOTTOM_NAV_SLOTS,
  QUICK_ACTIONS,
  QUICK_ACTION_LIMIT,
} from "@/config/mobile-nav";
import type { UserRole } from "@/types/auth";

const NAV_ITEMS = ADMIN_NAV.flatMap((section) => section.items);

export function getBottomNavItems(role: UserRole): NavItem[] {
  return BOTTOM_NAV_PREFERRED.map((url) => NAV_ITEMS.find((item) => item.url === url))
    .filter((item): item is NavItem => !!item && item.roles.includes(role))
    .slice(0, BOTTOM_NAV_SLOTS)
    .map((item) => ({ ...item, title: BOTTOM_NAV_LABELS[item.title] ?? item.title }));
}

export function getQuickActions(role: UserRole) {
  const allowed = new Set(NAV_ITEMS.filter((item) => item.roles.includes(role)).map((item) => item.url));
  return QUICK_ACTIONS.filter((action) => allowed.has(action.access)).slice(0, QUICK_ACTION_LIMIT);
}
