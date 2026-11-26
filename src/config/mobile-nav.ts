import type { IconName } from "@/components/shared/icon";
import type { MetricTone } from "@/types/metric";

export type BottomNavIcon = { fill: string; stroke: string };

export const BOTTOM_NAV_PREFERRED = [
  "/admin",
  "/admin/deliveries",
  "/admin/orders",
  "/admin/products",
  "/admin/payments",
  "/admin/customers",
  "/admin/notifications",
];

export const BOTTOM_NAV_SLOTS = 3;

export const BOTTOM_NAV_LABELS: Record<string, string> = {
  "Staff & roles": "Staff",
};

export const BOTTOM_NAV_ICONS: Record<string, BottomNavIcon> = {
  "/admin": {
    fill: "M4 6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z",
    stroke:
      "M4 6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM13 6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2zM4 17a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM13 14a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2z",
  },
  "/admin/orders": {
    fill: "M5.6 8h12.8l-.9 11.1a2 2 0 0 1-2 1.9H8.5a2 2 0 0 1-2-1.9z",
    stroke: "M5.6 8h12.8l-.9 11.1a2 2 0 0 1-2 1.9H8.5a2 2 0 0 1-2-1.9zM9 8V6.5a3 3 0 0 1 6 0V8M9.5 12.5a2.5 2.5 0 0 0 5 0",
  },
  "/admin/products": {
    fill: "M12 3l8 4.5v9L12 21l-8-4.5v-9z",
    stroke: "M12 3l8 4.5v9L12 21l-8-4.5v-9zM4 7.5l8 4.5 8-4.5M12 12v9M8 5.3l8 4.5",
  },
  "/admin/payments": {
    fill: "M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
    stroke: "M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zM3 10h18M7 15h3",
  },
  "/admin/customers": {
    fill: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
    stroke: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4.5 20a7.5 7.5 0 0 1 15 0",
  },
  "/admin/deliveries": {
    fill: "M3 6h11v10H3z",
    stroke: "M3 6h11v10H3zM14 9h4l3 3.5V16h-7M7.5 18.5a1.5 1.5 0 1 0 0-.01M17.5 18.5a1.5 1.5 0 1 0 0-.01",
  },
  "/admin/notifications": {
    fill: "M6 10a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6z",
    stroke: "M6 10a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6zM10 19.5a2 2 0 0 0 4 0",
  },
};

export type QuickAction = {
  label: string;
  href: string;
  access: string;
  icon: IconName;
  tone: MetricTone;
};

export const QUICK_ACTIONS: QuickAction[] = [
  { label: "New order", href: "/admin/orders", access: "/admin/orders", icon: "orders", tone: "brand" },
  { label: "Add product", href: "/admin/products/new", access: "/admin/products", icon: "products", tone: "lav" },
  { label: "New coupon", href: "/admin/coupons", access: "/admin/coupons", icon: "coupons", tone: "mint" },
  { label: "Add banner", href: "/admin/banners", access: "/admin/banners", icon: "banners", tone: "sky" },
  { label: "Find customer", href: "/admin/customers", access: "/admin/customers", icon: "customers", tone: "amber" },
  { label: "My deliveries", href: "/admin/deliveries", access: "/admin/deliveries", icon: "zones", tone: "brand" },
];

export const QUICK_ACTION_LIMIT = 4;
