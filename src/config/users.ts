import type { UserRole } from "@/types/auth";
import type { UserView } from "@/types/user";

export const USERS_PAGE_SIZE = 10;

export const USER_VIEWS: { value: UserView; label: string }[] = [
  { value: "all", label: "All users" },
  { value: "customers", label: "Customers" },
  { value: "trash", label: "Trash" },
];

export const ROLE_LABELS: Record<UserRole, string> = {
  SUPER_ADMIN: "Super Admin",
  ADMIN: "Admin",
  MANAGER: "Manager",
  ORDER_HANDLER: "Order Handler",
  RIDER: "Rider",
  CUSTOMER: "Customer",
};

export const USER_ROLES = Object.keys(ROLE_LABELS) as UserRole[];
