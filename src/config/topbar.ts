import type { UserRole } from "@/types/auth";

export const PROFILE_PATH = "/admin/profile";
export const SETTINGS_PATH = "/admin/settings";
export const NOTIFICATIONS_PATH = "/admin/notifications";

export const SETTINGS_ROLES: UserRole[] = ["SUPER_ADMIN", "ADMIN"];
export const NOTIFICATION_PAGE_ROLES: UserRole[] = ["SUPER_ADMIN", "ADMIN", "MANAGER", "ORDER_HANDLER"];

export const UNREAD_POLL_MS = 60_000;

export type TopbarPanel = "search" | "notifications" | "account";
