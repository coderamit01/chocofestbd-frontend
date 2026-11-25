import {
  BellIcon,
  BoxesIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  type LucideIcon,
  MegaphoneIcon,
  SettingsIcon,
  ShoppingBagIcon,
  StarIcon,
  StoreIcon,
  TruckIcon,
  UsersIcon,
} from "lucide-react";
import type { UserRole } from "@/types/auth";

export type NavLink = {
  title: string;
  url: string;
  roles?: UserRole[];
};

export type NavItem = NavLink & {
  icon: LucideIcon;
  items?: NavLink[];
};

export type NavSection = {
  label: string;
  items: NavItem[];
};

const ADMINS: UserRole[] = ["SUPER_ADMIN", "ADMIN"];
const MANAGERS: UserRole[] = [...ADMINS, "MANAGER"];
const ORDER_STAFF: UserRole[] = [...MANAGERS, "ORDER_HANDLER", "RIDER"];

export const ADMIN_NAV: NavSection[] = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", url: "/admin", icon: LayoutDashboardIcon },
      { title: "Orders", url: "/admin/orders", icon: ShoppingBagIcon, roles: ORDER_STAFF },
    ],
  },
  {
    label: "Store",
    items: [
      {
        title: "Products",
        url: "/admin/products",
        icon: BoxesIcon,
        roles: MANAGERS,
        items: [
          { title: "All Products", url: "/admin/products" },
          { title: "Categories", url: "/admin/categories" },
          { title: "Brands", url: "/admin/brands" },
          { title: "Tags", url: "/admin/tags" },
          { title: "Collections", url: "/admin/collections" },
        ],
      },
      {
        title: "Marketing",
        url: "/admin/coupons",
        icon: MegaphoneIcon,
        roles: MANAGERS,
        items: [
          { title: "Coupons", url: "/admin/coupons" },
          { title: "Banners", url: "/admin/banners" },
        ],
      },
      {
        title: "Delivery",
        url: "/admin/delivery-zones",
        icon: TruckIcon,
        roles: ADMINS,
        items: [
          { title: "Delivery Zones", url: "/admin/delivery-zones" },
          { title: "Locations", url: "/admin/locations" },
        ],
      },
      { title: "Reviews", url: "/admin/reviews", icon: StarIcon, roles: MANAGERS },
    ],
  },
  {
    label: "Management",
    items: [
      { title: "Users", url: "/admin/users", icon: UsersIcon, roles: ADMINS },
      { title: "FAQs", url: "/admin/faqs", icon: HelpCircleIcon, roles: MANAGERS },
      { title: "Notifications", url: "/admin/notifications", icon: BellIcon },
      { title: "Settings", url: "/admin/settings", icon: SettingsIcon, roles: ADMINS },
    ],
  },
];

export const ADMIN_NAV_SECONDARY: NavItem[] = [
  { title: "View Store", url: "/", icon: StoreIcon },
];
