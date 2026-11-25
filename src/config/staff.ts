import type { UserRole } from "@/types/auth";

export type StaffRole = Exclude<UserRole, "CUSTOMER">;

export type InvitableRole = Exclude<StaffRole, "SUPER_ADMIN">;

export type Permission = "view" | "create" | "edit" | "delete";

export const STAFF_ROLE_ORDER: StaffRole[] = ["SUPER_ADMIN", "ADMIN", "MANAGER", "ORDER_HANDLER", "RIDER"];

export const STAFF_TABS = [
  { value: "staff", label: "Staff" },
  { value: "roles", label: "Roles & permissions" },
] as const;

export type StaffTab = (typeof STAFF_TABS)[number]["value"];

export const INVITE_ROLE_OPTIONS: { value: InvitableRole; label: string; description: string }[] = [
  { value: "ADMIN", label: "Admin", description: "Everything except staff & roles" },
  { value: "MANAGER", label: "Manager", description: "Sales, catalog, marketing and content" },
  { value: "ORDER_HANDLER", label: "Order Handler", description: "Orders, payments and customers only" },
  { value: "RIDER", label: "Rider", description: "“My deliveries” in the mobile view" },
];

export const PERMISSION_COLUMNS: { value: Permission; label: string }[] = [
  { value: "view", label: "View" },
  { value: "create", label: "Create" },
  { value: "edit", label: "Edit" },
  { value: "delete", label: "Delete" },
];

const ALL: Permission[] = ["view", "create", "edit", "delete"];
const VIEW_CREATE_EDIT: Permission[] = ["view", "create", "edit"];
const VIEW_EDIT: Permission[] = ["view", "edit"];
const VIEW: Permission[] = ["view"];
const NONE: Permission[] = [];

export const PERMISSION_MODULES = [
  "Dashboard",
  "Orders",
  "Payments",
  "Customers",
  "Products",
  "Categories & brands",
  "Collections",
  "Coupons & banners",
  "Reviews & FAQs",
  "Delivery zones",
  "Staff & roles",
  "Settings",
] as const;

type PermissionModule = (typeof PERMISSION_MODULES)[number];

const permissionsFor = (resolve: (module: PermissionModule) => Permission[]) =>
  Object.fromEntries(PERMISSION_MODULES.map((module) => [module, resolve(module)])) as Record<
    PermissionModule,
    Permission[]
  >;

export const ROLE_PERMISSIONS: Record<StaffRole, Record<PermissionModule, Permission[]>> = {
  SUPER_ADMIN: permissionsFor(() => ALL),
  ADMIN: permissionsFor((module) => (module === "Staff & roles" ? NONE : ALL)),
  MANAGER: permissionsFor((module) => {
    if (module === "Staff & roles" || module === "Settings" || module === "Delivery zones") return NONE;
    if (module === "Payments") return VIEW_EDIT;
    if (module === "Dashboard") return VIEW;
    return VIEW_CREATE_EDIT;
  }),
  ORDER_HANDLER: permissionsFor((module) => {
    if (module === "Orders") return VIEW_CREATE_EDIT;
    if (module === "Payments") return VIEW_EDIT;
    if (module === "Customers") return VIEW;
    return NONE;
  }),
  RIDER: permissionsFor((module) => (module === "Orders" ? VIEW : NONE)),
};

export const AVATAR_TONES = [
  "bg-brand-50 text-brand-text",
  "bg-lavender-soft text-lavender",
  "bg-info-soft text-info",
  "bg-success-soft text-success",
  "bg-choco-50 text-choco",
];
