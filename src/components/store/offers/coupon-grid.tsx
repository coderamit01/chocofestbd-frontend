"use client";

import { useState } from "react";
import { AUTO_COUPON_LABEL } from "@/config/store-offers";
import { copyWithToast } from "@/lib/clipboard";
import type { StoreCoupon } from "@/types/store-offers";
import { CouponCard } from "./coupon-card";
import { CouponAutoBadge, CouponCodeButton } from "./coupon-code-button";

type CouponGridProps = {
  coupons: StoreCoupon[];
};

export function CouponGrid({ coupons }: CouponGridProps) {
  const [copied, setCopied] = useState("");

  const copy = (code: string) => {
    setCopied(code);
    void copyWithToast(code, "Code copied", code);
  };

  return (
    <div className="grid grid-cols-4 gap-3.5 max-[1180px]:grid-cols-2 max-[900px]:grid-cols-1">
      {coupons.map((coupon) => (
        <CouponCard
          key={coupon.title}
          coupon={coupon}
          action={
            coupon.code ? (
              <CouponCodeButton code={coupon.code} copied={copied === coupon.code} onCopy={copy} />
            ) : (
              <CouponAutoBadge label={AUTO_COUPON_LABEL} />
            )
          }
        />
      ))}
    </div>
  );
}
