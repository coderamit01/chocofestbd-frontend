import type { IconName } from "@/components/shared/icon";
import type { UserRole } from "@/types/auth";

export type Profile = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  phoneVerified: boolean;
  emailVerified: boolean;
  image: string | null;
  role: UserRole;
  points: number;
  createdAt: string;
};

export type AuthSession = {
  id: string;
  token: string;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
  ipAddress?: string | null;
  userAgent?: string | null;
};

export type AuthAccount = {
  id: string;
  providerId: string;
  accountId: string;
  createdAt: string;
  updatedAt: string;
};

export type ProfileSession = {
  id: string;
  token: string;
  device: string;
  icon: IconName;
  ip: string | null;
  seen: string;
  current: boolean;
};

export type ProfileTab = "info" | "security";

export type ProfileInfoValues = {
  name: string;
  phone: string;
};

export type ProfileInfoErrors = Partial<Record<keyof ProfileInfoValues, boolean>>;

export type PasswordValues = {
  next: string;
  confirm: string;
};

export type PasswordErrors = Partial<Record<keyof PasswordValues, boolean>>;

export type ProfileAccess = {
  can: string[];
  cannot: string[];
};

export type ProfileData = {
  profile: Profile;
  sessions: ProfileSession[];
  passwordChangedAt: string | null;
  lastSignIn: string | null;
};
