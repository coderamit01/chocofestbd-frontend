import { StatusBadge } from "@/components/shared/status-badge";
import type { UserRole } from "@/types/auth";
import type { User } from "@/types/user";

export function RoleBadge({ role }: { role: UserRole }) {
  return <StatusBadge kind="role" status={role} />;
}

export function UserStatusBadge({ user }: { user: Pick<User, "isBanned" | "deletedAt"> }) {
  const status = user.deletedAt ? "TRASHED" : user.isBanned ? "BANNED" : "ACTIVE";

  return <StatusBadge kind="account" status={status} />;
}
