export type UserRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "MANAGER"
  | "ORDER_HANDLER"
  | "RIDER"
  | "CUSTOMER";

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role?: UserRole | null;
  isBanned?: boolean | null;
};

export type SessionResponse = {
  user: SessionUser;
  session: { id: string; expiresAt: string };
} | null;
