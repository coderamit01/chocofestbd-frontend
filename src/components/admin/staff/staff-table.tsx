"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { setUserBanAction } from "@/actions/user.actions";
import { Icon } from "@/components/shared/icon";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { AVATAR_TONES } from "@/config/staff";
import { tableStyles } from "@/lib/table-styles";
import { cn, formatPhone, getInitials, pickByHash } from "@/lib/utils";
import type { User } from "@/types/user";

type StaffTableProps = {
  staff: User[];
  onEdit: (user: User) => void;
};

const COLUMNS = ["Name", "Phone", "Role", "Status", "Last active"];

export function StaffTable({ staff, onEdit }: StaffTableProps) {
  return (
    <div className={tableStyles.wrapper}>
      <table className={tableStyles.table}>
        <thead>
          <tr>
            {COLUMNS.map((column) => (
              <th key={column} className={tableStyles.head}>
                {column}
              </th>
            ))}
            <th className={cn(tableStyles.head, "text-right")}>
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className={tableStyles.body}>
          {staff.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-4 py-12 text-center text-caption text-ink-3">
                No staff match your search.
              </td>
            </tr>
          ) : (
            staff.map((user) => <StaffRow key={user.id} user={user} onEdit={onEdit} />)
          )}
        </tbody>
      </table>
    </div>
  );
}

function StaffRow({ user, onEdit }: { user: User; onEdit: (user: User) => void }) {
  const [isPending, startTransition] = useTransition();
  const isLocked = user.role === "SUPER_ADMIN";
  const toggleLabel = user.isBanned ? "Reactivate" : "Deactivate";

  const toggleActive = () =>
    startTransition(async () => {
      const result = await setUserBanAction(user.id, !user.isBanned);
      if (!result.success) {
        toast.error(`Couldn’t ${toggleLabel.toLowerCase()}`, { description: result.message });
        return;
      }
      if (user.isBanned) {
        toast.success("Reactivated", { description: `${user.name} can sign in again` });
      } else {
        toast.error("Deactivated", { description: `${user.name} is signed out everywhere` });
      }
    });

  return (
    <tr className={tableStyles.row}>
      <td data-label="Name" className={tableStyles.cell}>
        <span className="flex items-center gap-3">
          <span
            className={cn(
              "flex size-9 flex-none items-center justify-center rounded-full font-heading text-[13px] leading-none font-semibold",
              pickByHash(user.id, AVATAR_TONES)
            )}
          >
            {getInitials(user.name)}
          </span>
          <span className="flex flex-col text-left">
            <span className="font-medium text-ink">{user.name}</span>
            <span className="text-xs text-ink-3">{user.email}</span>
          </span>
        </span>
      </td>
      <td data-label="Phone" className={cn(tableStyles.cell, "tabular-nums")}>
        {user.phone ? formatPhone(user.phone) : "—"}
      </td>
      <td data-label="Role" className={tableStyles.cell}>
        <StatusBadge kind="role" status={user.role} />
      </td>
      <td data-label="Status" className={tableStyles.cell}>
        <StatusBadge kind="account" status={user.isBanned ? "DEACTIVATED" : "ACTIVE"} />
      </td>
      <td data-label="Last active" className={cn(tableStyles.cell, "text-caption text-ink-3")}>
        —
      </td>
      <td className={tableStyles.bareCell}>
        <div className="flex justify-end gap-1.5">
          <Button
            variant="square"
            size="icon-md"
            aria-label={`Edit ${user.name}`}
            disabled={isLocked}
            onClick={() => onEdit(user)}
          >
            <Icon name="edit" size={16} strokeWidth={1.8} />
          </Button>
          <Button
            variant="square"
            size="icon-md"
            aria-label={`${toggleLabel} ${user.name}`}
            title={toggleLabel}
            disabled={isLocked || isPending}
            aria-busy={isPending}
            onClick={toggleActive}
          >
            <Icon name="ban" size={16} strokeWidth={1.8} />
          </Button>
        </div>
      </td>
    </tr>
  );
}
