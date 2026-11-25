"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { setCustomerBanAction } from "@/actions/customer.actions";
import { DangerDialog } from "@/components/shared/danger-dialog";
import { Icon } from "@/components/shared/icon";
import { StatusBadge } from "@/components/shared/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { AVATAR_TONES } from "@/config/staff";
import { customerInitials, dayWithTime, internationalPhone, memberSince } from "@/lib/customer-display";
import { isBengali } from "@/lib/customer-query";
import { cn, formatPhone, pickByHash } from "@/lib/utils";
import type { CustomerProfile } from "@/types/customer";
import { PointsDialog } from "./points-dialog";

type CustomerProfileCardProps = {
  customer: CustomerProfile;
  now: number;
  canEdit: boolean;
  canBan: boolean;
};

const banBody = (openOrders: string[]) => {
  if (openOrders.length === 0) return "They can’t sign in or place new orders.";
  if (openOrders.length === 1) return `They can’t sign in or place new orders. Their open order ${openOrders[0]} stays as it is.`;
  return `They can’t sign in or place new orders. Their open orders ${openOrders.join(", ")} stay as they are.`;
};

export function CustomerProfileCard({ customer, now, canEdit, canBan }: CustomerProfileCardProps) {
  const [dialog, setDialog] = useState<"points" | "ban" | null>(null);
  const [isSaving, startSaving] = useTransition();
  const bengali = isBengali(customer.name);
  const banned = customer.isBanned;
  const phoneLink = customer.phone ? internationalPhone(customer.phone) : null;
  const contactClass = buttonVariants({ variant: "soft" });

  const toggleBan = () =>
    startSaving(async () => {
      const result = await setCustomerBanAction(customer.id, !banned);
      if (!result.success) {
        toast.error("Something went wrong", { description: result.message });
        return;
      }
      setDialog(null);
      if (banned) toast.success("Customer unbanned", { description: customer.name });
      else toast.error("Customer banned", { description: customer.name });
    });

  return (
    <section className="flex max-w-100 min-w-0 flex-[1_1_320px] flex-col gap-5 rounded-xl bg-card px-6 py-5.5 max-[900px]:max-w-none max-[900px]:p-4.5">
      <div className="flex flex-col items-center gap-3 pt-2 text-center">
        <span
          className={cn(
            "flex size-22 items-center justify-center rounded-full font-heading text-[32px] leading-none font-semibold",
            pickByHash(customer.id, AVATAR_TONES),
            bengali && "font-bengali"
          )}
        >
          {customerInitials(customer.name)}
        </span>
        <div className="flex flex-col gap-1">
          <h2 className={cn("text-[22px] leading-[1.3] font-semibold text-ink", bengali ? "font-bengali" : "font-heading")}>{customer.name}</h2>
          <span className="text-caption text-ink-3">{memberSince(customer.createdAt)}</span>
        </div>
        <StatusBadge kind="account" status={banned ? "BANNED" : "ACTIVE"} />
      </div>

      <dl className="grid grid-cols-[90px_1fr] gap-x-4 gap-y-3 text-sm">
        <dt className="text-ink-3">Phone</dt>
        <dd className="flex flex-wrap items-center gap-1.5 text-ink">
          {customer.phone ? (
            <>
              <span className="tabular-nums">{formatPhone(customer.phone)}</span>
              {customer.phoneVerified && (
                <Badge variant="success" size="sm">
                  Verified
                </Badge>
              )}
            </>
          ) : (
            "—"
          )}
        </dd>
        <dt className="text-ink-3">Email</dt>
        <dd className="break-all text-ink">{customer.email || "No email"}</dd>
        <dt className="text-ink-3">Points</dt>
        <dd className="font-semibold text-ink tabular-nums">{customer.points.toLocaleString("en-IN")} pts</dd>
        <dt className="text-ink-3">Last seen</dt>
        <dd className="text-ink">{customer.lastSeenAt ? dayWithTime(customer.lastSeenAt, now) : "—"}</dd>
      </dl>

      <div className="grid grid-cols-2 gap-2.5">
        {phoneLink ? (
          <>
            <a href={`tel:+${phoneLink}`} className={contactClass}>
              <Icon name="phone" size={16} strokeWidth={1.8} className="size-4" />
              Call
            </a>
            <a href={`https://wa.me/${phoneLink}`} target="_blank" rel="noreferrer" className={contactClass}>
              <Icon name="chat" size={16} strokeWidth={1.8} className="size-4" />
              WhatsApp
            </a>
          </>
        ) : (
          <>
            <Button variant="soft" disabled>
              <Icon name="phone" size={16} strokeWidth={1.8} className="size-4" />
              Call
            </Button>
            <Button variant="soft" disabled>
              <Icon name="chat" size={16} strokeWidth={1.8} className="size-4" />
              WhatsApp
            </Button>
          </>
        )}
      </div>

      {(canEdit || canBan) && (
        <>
          <hr className="h-px border-0 bg-line" />
          <div className="flex flex-col gap-2.5">
            {canEdit && (
              <Button variant="outline" onClick={() => setDialog("points")}>
                <Icon name="brands" size={16} strokeWidth={1.8} className="size-4" />
                Adjust points
              </Button>
            )}
            {canBan && (
              <Button variant={banned ? "tint" : "destructive-soft"} onClick={() => setDialog("ban")}>
                <Icon name="ban" size={16} strokeWidth={1.8} className="size-4" />
                {banned ? "Unban customer" : "Ban customer"}
              </Button>
            )}
          </div>
        </>
      )}

      <PointsDialog open={dialog === "points"} customerId={customer.id} points={customer.points} onClose={() => setDialog(null)} />
      <DangerDialog
        open={dialog === "ban"}
        title={banned ? "Unban this customer?" : "Ban this customer?"}
        description={banned ? "They can sign in and order again." : banBody(customer.openOrders)}
        confirmLabel={banned ? "Unban" : "Ban customer"}
        pendingLabel={banned ? "Unbanning…" : "Banning…"}
        isPending={isSaving}
        onOpenChange={(open) => !open && setDialog(null)}
        onConfirm={toggleBan}
      />
    </section>
  );
}
