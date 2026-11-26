"use client";

import Link from "next/link";
import { SettingsTile } from "@/components/admin/settings/settings-field";
import { Icon } from "@/components/shared/icon";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { PROFILE_ROLES } from "@/config/profile";
import { useLogout } from "@/hooks/use-logout";
import { profileAccess } from "@/lib/profile";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types/auth";
import { ProfileCard, ProfileCardNote, ProfileCardTitle } from "./profile-card";

type ChecklistItem = { label: string; done: boolean; onSelect: () => void };

export function ProfileStrengthCard({ items }: { items: ChecklistItem[] }) {
  const pct = Math.round((items.filter((item) => item.done).length / items.length) * 100);

  return (
    <ProfileCard className="gap-4">
      <div className="flex items-center justify-between gap-3">
        <ProfileCardTitle size="sm">Profile strength</ProfileCardTitle>
        <span className="font-heading text-lg leading-none font-semibold text-brand tabular-nums">{pct}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-surface-3">
        <div className="h-full rounded-full bg-brand" style={{ width: `${pct}%` }} />
      </div>
      <div className="flex flex-col gap-2.5">
        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={item.onSelect}
            className={cn("flex items-center gap-2.5 text-left outline-none focus-visible:shadow-focus", item.done ? "text-ink-3" : "font-medium text-ink")}
          >
            <span
              className={cn(
                "flex size-5 flex-none items-center justify-center rounded-[6px]",
                item.done ? "bg-brand text-white" : "bg-surface-3"
              )}
            >
              {item.done && <Icon name="check" size={13} strokeWidth={1.8} />}
            </span>
            <span className="text-[12.5px]">{item.label}</span>
          </button>
        ))}
      </div>
    </ProfileCard>
  );
}

export function ProfileRoleCard({ role }: { role: UserRole }) {
  const meta = PROFILE_ROLES[role];
  const { can, cannot } = profileAccess(role);

  return (
    <ProfileCard className="gap-4">
      <div className="flex items-center gap-3">
        <SettingsTile icon="shield" tone="brand" />
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="font-heading text-lg leading-[1.2] font-semibold text-ink">{meta.name}</span>
          <span className="text-xs text-ink-3">{meta.sub}</span>
        </span>
      </div>
      <span className="eyebrow">You can open</span>
      <div className="flex flex-wrap gap-1.5">
        {can.map((item) => (
          <Badge key={item} variant="brand" size="sm">
            {item}
          </Badge>
        ))}
      </div>
      {cannot.length > 0 && (
        <>
          <span className="eyebrow">No access</span>
          <div className="flex flex-wrap gap-1.5">
            {cannot.map((item) => (
              <Badge key={item} variant="neutral" size="sm">
                <Icon name="lock" size={12} strokeWidth={1.8} />
                {item}
              </Badge>
            ))}
          </div>
          <p className="rounded-[12px] bg-surface-2 px-3.5 py-3 text-xs text-ink-3">
            Need more access? Ask a Super Admin to change your role in Staff &amp; roles.
          </p>
        </>
      )}
      {role === "SUPER_ADMIN" && (
        <Link href="/admin/staff" className={buttonVariants({ variant: "soft" })}>
          <Icon name="staff" size={17} strokeWidth={1.8} />
          Manage staff &amp; roles
        </Link>
      )}
    </ProfileCard>
  );
}

export function ProfileAccountCard({ lastSignIn }: { lastSignIn: string | null }) {
  const { logout, isPending } = useLogout();

  return (
    <ProfileCard className="gap-3">
      <ProfileCardTitle size="sm">Account</ProfileCardTitle>
      {lastSignIn && (
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between gap-3">
            <ProfileCardNote>Last sign-in</ProfileCardNote>
            <span className="text-[12.5px] text-ink tabular-nums">{lastSignIn}</span>
          </div>
        </div>
      )}
      <Button variant="outline" className="mt-1.5" onClick={logout} aria-busy={isPending || undefined}>
        <Icon name="logout" size={17} strokeWidth={1.8} />
        {isPending ? "Logging out…" : "Log out"}
      </Button>
    </ProfileCard>
  );
}
