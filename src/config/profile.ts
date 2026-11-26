import type { IconName } from "@/components/shared/icon";
import type { UserRole } from "@/types/auth";
import type { ProfileTab } from "@/types/profile";

export const PROFILE_TABS: { value: ProfileTab; label: string; icon: IconName }[] = [
  { value: "info", label: "Personal info", icon: "user" },
  { value: "security", label: "Security", icon: "lock" },
];

export const PROFILE_ROLES: Record<UserRole, { name: string; sub: string; avatar: string }> = {
  SUPER_ADMIN: { name: "Super Admin", sub: "Full access to every module, staff and store settings", avatar: "bg-choco text-white" },
  ADMIN: { name: "Admin", sub: "Everything except staff accounts and roles", avatar: "bg-brand text-white" },
  MANAGER: { name: "Manager", sub: "Catalog, marketing, customers and orders", avatar: "bg-lavender-soft text-lavender" },
  ORDER_HANDLER: { name: "Order handler", sub: "Orders, payment checks and customer details", avatar: "bg-info-soft text-info" },
  RIDER: { name: "Rider", sub: "Your assigned deliveries", avatar: "bg-success-soft text-success" },
  CUSTOMER: { name: "Customer", sub: "Store account", avatar: "bg-surface-3 text-ink-2" },
};

export const PROFILE_PHONE_PATTERN = /^01[3-9]\d{8}$/;

export const PROFILE_TIME_ZONE_LABEL = "Asia/Dhaka (UTC+6)";

export const PROFILE_PHOTO_TYPES = "image/jpeg,image/png,image/webp,image/avif";

export const PASSWORD_RULES = ["At least 8 characters", "A number", "Upper and lower case", "A symbol like ! or #"];

export const PASSWORD_STRENGTH = [
  { label: "Too short", text: "text-danger", bar: "bg-danger", pct: 8 },
  { label: "Weak", text: "text-danger", bar: "bg-danger", pct: 25 },
  { label: "Fair", text: "text-warning", bar: "bg-warning", pct: 50 },
  { label: "Good", text: "text-success/85", bar: "bg-success/85", pct: 75 },
  { label: "Strong", text: "text-success", bar: "bg-success", pct: 100 },
];

export const PASSWORD_STRENGTH_EMPTY = { label: "—", text: "text-ink-4", bar: "bg-ink-4", pct: 0 };
