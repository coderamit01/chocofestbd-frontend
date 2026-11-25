import type { AccountStatus } from "@/types/status";
import type { InvitableRole } from "@/config/staff";
import type { User } from "@/types/user";

export type StaffMember = User & { lastActiveAt: string | null };

export type StaffRow = StaffMember & {
  status: Extract<AccountStatus, "ACTIVE" | "INVITED" | "DEACTIVATED">;
  lastActiveLabel: string;
};

export type InviteStaffPayload = {
  name: string;
  email: string;
  phone: string;
  role: InvitableRole;
  password: string;
};
