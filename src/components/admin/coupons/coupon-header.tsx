"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { setCouponActiveAction } from "@/actions/coupon.actions";
import { Icon } from "@/components/shared/icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { COUPON_STATE_BADGES, COUPONS_PATH } from "@/config/coupons";
import { copyText } from "@/lib/clipboard";
import { couponState, couponSummary } from "@/lib/coupon";
import type { CouponDetail, CouponOptions } from "@/types/coupon";
import { CouponFormDrawer, type CouponDrawerState } from "./coupon-form-drawer";

type CouponHeaderProps = {
  coupon: CouponDetail;
  options: CouponOptions;
  now: number;
  today: string;
};

export function CouponHeader({ coupon, options, now, today }: CouponHeaderProps) {
  const [drawer, setDrawer] = useState<CouponDrawerState>(null);
  const [isSaving, startSaving] = useTransition();
  const state = couponState(coupon, now);

  const toggle = () =>
    startSaving(async () => {
      const result = await setCouponActiveAction(coupon.id, !coupon.isActive);
      if (!result.success) {
        toast.error("Couldn’t update coupon", { description: result.message });
        return;
      }
      if (coupon.isActive) toast.error("Coupon disabled", { description: coupon.code });
      else toast.success("Coupon enabled", { description: coupon.code });
    });

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-col gap-2">
        <Link href={COUPONS_PATH} className="flex items-center gap-1.5 self-start text-caption text-ink-3 hover:text-choco">
          <Icon name="arrowLeft" size={16} strokeWidth={1.8} />
          Back to coupons
        </Link>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-[12px] bg-brand-50 px-3.5 py-2.5 font-mono text-[26px] leading-none font-bold tracking-[.04em] text-brand-text">
            {coupon.code}
          </span>
          <Badge variant={COUPON_STATE_BADGES[state]}>{state}</Badge>
        </div>
        <p className="text-caption text-ink-3">{couponSummary(coupon)}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2.5">
        <Button variant="outline" onClick={() => copyText(coupon.code, "Copied")}>
          <Icon name="copy" size={18} strokeWidth={1.8} className="size-[17px]" />
          Copy code
        </Button>
        <Button variant={coupon.isActive ? "destructive-soft" : "tint"} onClick={toggle} aria-busy={isSaving || undefined}>
          {coupon.isActive ? "Disable" : "Enable"}
        </Button>
        <Button onClick={() => setDrawer({ mode: "edit", coupon })}>
          <Icon name="edit" size={18} strokeWidth={1.8} className="size-[17px]" />
          Edit coupon
        </Button>
      </div>
      <CouponFormDrawer state={drawer} options={options} today={today} onClose={() => setDrawer(null)} />
    </div>
  );
}
