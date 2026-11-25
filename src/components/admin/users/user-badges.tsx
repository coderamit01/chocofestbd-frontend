import { Badge } from "@/components/ui/badge";
import { ROLE_LABELS } from "@/config/users";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types/auth";
import type { User } from "@/types/user";

const ROLE_STYLES: Record<UserRole, string> = {
  SUPER_ADMIN: "bg-primary text-primary-foreground",
  ADMIN: "bg-secondary/15 text-secondary",
  MANAGER: "bg-accent text-accent-foreground",
  ORDER_HANDLER: "bg-accent text-accent-foreground",
  RIDER: "bg-accent text-accent-foreground",
  CUSTOMER: "bg-muted text-muted-foreground",
};

export function RoleBadge({ role }: { role: UserRole }) {
  return <Badge className={ROLE_STYLES[role]}>{ROLE_LABELS[role]}</Badge>;
}

export function UserStatusBadge({ user }: { user: Pick<User, "isBanned" | "deletedAt"> }) {
  const status = user.deletedAt ? "trashed" : user.isBanned ? "banned" : "active";

  return (
    <Badge
      className={cn(
        "gap-1.5",
        status === "active" && "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
        status === "banned" && "bg-destructive/10 text-destructive",
        status === "trashed" && "bg-muted text-muted-foreground"
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {status === "active" ? "Active" : status === "banned" ? "Banned" : "In trash"}
    </Badge>
  );
}
