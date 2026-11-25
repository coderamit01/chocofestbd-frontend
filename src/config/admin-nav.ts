import type { NavIconName } from "@/components/admin/sidebar/nav-icon";
import type { UserRole } from "@/types/auth";

export type NavCountKey = "orders" | "payments" | "reviews" | "notifications";

export type NavCounts = Partial<Record<NavCountKey, number>>;

export type NavItem = {
  title: string;
  url: string;
  icon: NavIconName;
  roles: UserRole[];
  countKey?: NavCountKey;
};

export type NavSection = {
  label: string;
  showLabel: boolean;
  items: NavItem[];
};

const SUPER_ADMIN: UserRole[] = ["SUPER_ADMIN"];
const ADMINS: UserRole[] = [...SUPER_ADMIN, "ADMIN"];
const MANAGERS: UserRole[] = [...ADMINS, "MANAGER"];
const ORDER_TEAM: UserRole[] = [...MANAGERS, "ORDER_HANDLER"];
const RIDERS: UserRole[] = ["RIDER"];

export const ADMIN_NAV: NavSection[] = [
  {
    label: "Overview",
    showLabel: false,
    items: [{ title: "Dashboard", url: "/admin", icon: "dashboard", roles: MANAGERS }],
  },
  {
    label: "Deliveries",
    showLabel: false,
    items: [{ title: "My deliveries", url: "/admin/deliveries", icon: "deliveries", roles: RIDERS }],
  },
  {
    label: "Sales",
    showLabel: true,
    items: [
      { title: "Orders", url: "/admin/orders", icon: "orders", roles: ORDER_TEAM, countKey: "orders" },
      { title: "Payments", url: "/admin/payments", icon: "payments", roles: ORDER_TEAM, countKey: "payments" },
      { title: "Customers", url: "/admin/customers", icon: "customers", roles: ORDER_TEAM },
    ],
  },
  {
    label: "Catalog",
    showLabel: true,
    items: [
      { title: "Products", url: "/admin/products", icon: "products", roles: MANAGERS },
      { title: "Categories", url: "/admin/categories", icon: "categories", roles: MANAGERS },
      { title: "Brands", url: "/admin/brands", icon: "brands", roles: MANAGERS },
      { title: "Tags", url: "/admin/tags", icon: "tags", roles: MANAGERS },
      { title: "Collections", url: "/admin/collections", icon: "collections", roles: MANAGERS },
    ],
  },
  {
    label: "Marketing",
    showLabel: true,
    items: [
      { title: "Coupons", url: "/admin/coupons", icon: "coupons", roles: MANAGERS },
      { title: "Banners", url: "/admin/banners", icon: "banners", roles: MANAGERS },
    ],
  },
  {
    label: "Content",
    showLabel: true,
    items: [
      { title: "Reviews", url: "/admin/reviews", icon: "reviews", roles: MANAGERS, countKey: "reviews" },
      { title: "FAQs", url: "/admin/faqs", icon: "faqs", roles: MANAGERS },
    ],
  },
  {
    label: "Logistics",
    showLabel: true,
    items: [{ title: "Delivery zones", url: "/admin/delivery-zones", icon: "zones", roles: ADMINS }],
  },
  {
    label: "System",
    showLabel: true,
    items: [
      { title: "Staff & roles", url: "/admin/users", icon: "staff", roles: SUPER_ADMIN },
      { title: "Notifications", url: "/admin/notifications", icon: "notifications", roles: ORDER_TEAM, countKey: "notifications" },
      { title: "Settings", url: "/admin/settings", icon: "settings", roles: ADMINS },
    ],
  },
];
