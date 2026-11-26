"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Icon, type IconName } from "@/components/shared/icon";
import { PROFILE_PATH, SETTINGS_PATH, SETTINGS_ROLES } from "@/config/topbar";
import { ROLE_LABELS } from "@/config/users";
import { useLogout } from "@/hooks/use-logout";
import { getInitials } from "@/lib/utils";
import type { UserRole } from "@/types/auth";
import { TopbarPopover } from "./topbar-popover";

type TopbarAccountProps = {
  user?: { name: string; email: string; role?: UserRole };
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
};

const menuItemClass =
  "flex w-full cursor-pointer items-center gap-2.5 rounded-[9px] px-3 py-2.5 text-left text-sm leading-[1.2] text-ink outline-none hover:bg-surface-2 hover:text-ink focus-visible:bg-surface-2 disabled:opacity-60";

function MenuLink({ href, icon, label, onClick }: { href: string; icon: IconName; label: string; onClick: () => void }) {
  return (
    <Link href={href} onClick={onClick} className={menuItemClass}>
      <Icon name={icon} size={17} strokeWidth={1.8} className="text-ink-3" />
      {label}
    </Link>
  );
}

export function TopbarAccount({ user, open, onToggle, onClose }: TopbarAccountProps) {
  const { logout, isPending } = useLogout();

  if (!user) {
    return (
      <div className="flex h-13 items-center gap-3 pr-1.5 pl-0.5">
        <span className="skel size-12 rounded-[12px]" />
        <span className="flex flex-col gap-1.5 max-[900px]:hidden">
          <span className="skel h-3.5 w-24 rounded-[6px]" />
          <span className="skel h-3 w-16 rounded-[6px]" />
        </span>
      </div>
    );
  }

  const roleLabel = user.role ? ROLE_LABELS[user.role] : "";

  return (
    <TopbarPopover
      open={open}
      onClose={onClose}
      className="top-15 w-[250px] p-1.5"
      trigger={
        <button
          type="button"
          onClick={onToggle}
          aria-label="Account menu"
          aria-expanded={open}
          className="flex h-13 cursor-pointer items-center gap-3 rounded-[12px] border-0 bg-transparent pr-1.5 pl-0.5 text-left outline-none focus-visible:shadow-focus"
        >
          <span className="flex size-12 flex-none items-center justify-center rounded-[12px] bg-choco font-heading text-base leading-none font-semibold text-white">
            {getInitials(user.name)}
          </span>
          <span className="flex flex-col gap-[3px] max-[900px]:hidden">
            <span className="font-heading text-[15.5px] leading-[1.1] font-semibold text-ink">{user.name}</span>
            <span className="text-xs text-ink-3">{roleLabel}</span>
          </span>
          <span className="ml-2 flex size-8 items-center justify-center rounded-[9px] border border-line-2 bg-surface text-ink-2 max-[900px]:hidden">
            <Icon name="chevronDown" size={16} strokeWidth={1.8} />
          </span>
        </button>
      }
    >
      <div className="mb-1.5 flex flex-col gap-1 border-b border-line px-3 pt-2.5 pb-3">
        <span className="font-semibold text-ink">{user.name}</span>
        <span className="truncate text-xs text-ink-3">{user.email}</span>
        {user.role && (
          <Badge variant="dark" size="sm" className="mt-1 self-start">
            {user.role}
          </Badge>
        )}
      </div>
      <MenuLink href={PROFILE_PATH} icon="user" label="My profile" onClick={onClose} />
      {user.role && SETTINGS_ROLES.includes(user.role) && (
        <MenuLink href={SETTINGS_PATH} icon="settings" label="Store settings" onClick={onClose} />
      )}
      <button type="button" onClick={logout} disabled={isPending} className={`${menuItemClass} text-danger hover:text-danger`}>
        <Icon name="logout" size={17} strokeWidth={1.8} className="text-danger" />
        {isPending ? "Logging out…" : "Log out"}
      </button>
    </TopbarPopover>
  );
}
