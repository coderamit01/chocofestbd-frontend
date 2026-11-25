import type { UserRole } from "@/types/auth";

export const CATALOG_ROLES: UserRole[] = ["SUPER_ADMIN", "ADMIN", "MANAGER"];
export const CATALOG_DELETE_ROLES: UserRole[] = ["SUPER_ADMIN", "ADMIN"];
export const CATALOG_HARD_DELETE_ROLES: UserRole[] = ["SUPER_ADMIN"];

export const CATALOG_LIST_LIMIT = 100;
