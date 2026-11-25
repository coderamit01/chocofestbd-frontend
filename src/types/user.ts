import type { UserRole } from "@/types/auth";

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  phoneVerified: boolean;
  emailVerified: boolean;
  image: string | null;
  role: UserRole;
  isBanned: boolean;
  points: number;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type UserView = "all" | "customers" | "trash";

export type UsersQuery = {
  view: UserView;
  page: number;
  search?: string;
};
