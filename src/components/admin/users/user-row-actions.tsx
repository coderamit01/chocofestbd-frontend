"use client";

import { useState, useTransition } from "react";
import {
  BanIcon,
  Loader2Icon,
  MoreHorizontalIcon,
  RotateCcwIcon,
  ShieldCheckIcon,
  Trash2Icon,
  UserCogIcon,
} from "lucide-react";
import { toast } from "sonner";
import {
  changeUserRoleAction,
  deleteUserPermanentlyAction,
  moveUserToTrashAction,
  restoreUserAction,
  setUserBanAction,
} from "@/actions/user.actions";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROLE_LABELS, USER_ROLES } from "@/config/users";
import type { ActionResult } from "@/types/api";
import type { UserRole } from "@/types/auth";
import type { User, UserView } from "@/types/user";

type ConfirmKind = "ban" | "trash" | "delete";

type UserRowActionsProps = {
  user: User;
  view: UserView;
  actorRole: UserRole;
};

const CONFIRM_COPY: Record<ConfirmKind, { title: string; confirmLabel: string; description: (name: string) => string }> = {
  ban: {
    title: "Ban this user?",
    confirmLabel: "Ban user",
    description: (name) => `${name} will be signed out of every device and won't be able to log in until unbanned.`,
  },
  trash: {
    title: "Move to trash?",
    confirmLabel: "Move to trash",
    description: (name) => `${name} will be signed out and hidden from the user list. You can restore them from Trash.`,
  },
  delete: {
    title: "Delete permanently?",
    confirmLabel: "Delete permanently",
    description: (name) => `${name} and all of their data will be deleted forever. This cannot be undone.`,
  },
};

export function UserRowActions({ user, view, actorRole }: UserRowActionsProps) {
  const [isPending, startTransition] = useTransition();
  const [confirmKind, setConfirmKind] = useState<ConfirmKind | null>(null);

  const isSuperAdmin = actorRole === "SUPER_ADMIN";
  const assignableRoles = USER_ROLES.filter((role) => isSuperAdmin || role !== "SUPER_ADMIN");

  const confirmActions: Record<ConfirmKind, () => Promise<ActionResult>> = {
    ban: () => setUserBanAction(user.id, true),
    trash: () => moveUserToTrashAction(user.id),
    delete: () => deleteUserPermanentlyAction(user.id),
  };

  function run(action: () => Promise<ActionResult>) {
    startTransition(async () => {
      const result = await action();
      if (result.success) toast.success(result.message);
      else toast.error(result.message);
      setConfirmKind(null);
    });
  }

  function handleRoleChange(role: UserRole) {
    if (role !== user.role) run(() => changeUserRoleAction(user.id, role));
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={<Button variant="ghost" size="icon-sm" aria-label={`Actions for ${user.name}`} disabled={isPending} />}
        >
          {isPending ? <Loader2Icon className="animate-spin" /> : <MoreHorizontalIcon />}
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-52">
          {view === "trash" ? (
            <>
              <DropdownMenuItem onClick={() => run(() => restoreUserAction(user.id))}>
                <RotateCcwIcon />
                Restore
              </DropdownMenuItem>
              {isSuperAdmin && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive" onClick={() => setConfirmKind("delete")}>
                    <Trash2Icon />
                    Delete permanently
                  </DropdownMenuItem>
                </>
              )}
            </>
          ) : (
            <>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <UserCogIcon />
                  Change role
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="w-44">
                  <DropdownMenuRadioGroup value={user.role} onValueChange={(role) => handleRoleChange(role as UserRole)}>
                    {assignableRoles.map((role) => (
                      <DropdownMenuRadioItem key={role} value={role}>
                        {ROLE_LABELS[role]}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              {user.isBanned ? (
                <DropdownMenuItem onClick={() => run(() => setUserBanAction(user.id, false))}>
                  <ShieldCheckIcon />
                  Unban user
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={() => setConfirmKind("ban")}>
                  <BanIcon />
                  Ban user
                </DropdownMenuItem>
              )}

              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={() => setConfirmKind("trash")}>
                <Trash2Icon />
                Move to trash
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {confirmKind && (
        <ConfirmDialog
          open
          onOpenChange={(open) => !open && setConfirmKind(null)}
          title={CONFIRM_COPY[confirmKind].title}
          description={CONFIRM_COPY[confirmKind].description(user.name)}
          confirmLabel={CONFIRM_COPY[confirmKind].confirmLabel}
          variant="destructive"
          isPending={isPending}
          onConfirm={() => run(confirmActions[confirmKind])}
        />
      )}
    </>
  );
}
