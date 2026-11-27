import type { IconName } from "@/components/shared/icon";
import type { MetricTone } from "@/types/metric";

export const NOT_FOUND_TITLES = [
  "Page not found",
  "Well, that’s one bite…",
  "Two bites in. Still no page.",
  "Okay, we ate the page.",
];

export const NOT_FOUND_HINTS = [
  "Psst — tap the chocolate",
  "Crunch. Keep going?",
  "One more…",
  "Tap again to bake a fresh one",
];

export const COOKIE_BITES = [
  { cx: 128, cy: 30, r: 22 },
  { cx: 136, cy: 78, r: 20 },
  { cx: 96, cy: 132, r: 24 },
];

export type PopularPlace = {
  label: string;
  href: string;
  icon: IconName;
  sub: string;
  tone: MetricTone;
};

export const POPULAR_PLACES: PopularPlace[] = [
  { label: "Dashboard", href: "/admin", icon: "dashboard", sub: "Today’s overview", tone: "brand" },
  { label: "My deliveries", href: "/admin/deliveries", icon: "deliveries", sub: "Today’s drop-offs", tone: "brand" },
  { label: "Orders", href: "/admin/orders", icon: "orders", sub: "Orders & status", tone: "brand" },
  { label: "Payments", href: "/admin/payments", icon: "payments", sub: "bKash, Nagad & Rocket", tone: "amber" },
  { label: "Products", href: "/admin/products", icon: "products", sub: "Catalog & stock", tone: "lav" },
  { label: "Customers", href: "/admin/customers", icon: "customers", sub: "Profiles & history", tone: "sky" },
  { label: "Notifications", href: "/admin/notifications", icon: "notifications", sub: "Alerts & updates", tone: "mint" },
  { label: "Settings", href: "/admin/settings", icon: "settings", sub: "Store setup", tone: "gray" },
];

export const POPULAR_PLACE_LIMIT = 6;
