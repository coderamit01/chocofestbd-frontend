import Link from "next/link";
import { Icon } from "@/components/shared/icon";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { COUPON_STATE_BADGES, DISCOUNT_TYPE_LABELS, couponPath } from "@/config/coupons";
import { couponScopeLabel, couponState, couponValue, couponWindow } from "@/lib/coupon";
import { tableStyles } from "@/lib/table-styles";
import { cn, formatTaka } from "@/lib/utils";
import type { CouponDetail } from "@/types/coupon";

type CouponsTableProps = {
  coupons: CouponDetail[];
  now: number;
  canDelete: boolean;
  onCopy: (code: string) => void;
  onEdit: (coupon: CouponDetail) => void;
  onDelete: (coupon: CouponDetail) => void;
};

export const couponCodeClass =
  "inline-flex h-[26px] items-center rounded-[7px] bg-brand-50 px-2.5 font-mono text-[12.5px] leading-none font-semibold tracking-[.03em] whitespace-nowrap text-brand-text";

export function CouponsTable({ coupons, now, canDelete, onCopy, onEdit, onDelete }: CouponsTableProps) {
  return (
    <div className={tableStyles.wrapper}>
      <table className={tableStyles.table}>
        <thead>
          <tr>
            <th className={tableStyles.head}>Code</th>
            <th className={tableStyles.head}>Type</th>
            <th className={cn(tableStyles.head, "text-right")}>Value</th>
            <th className={tableStyles.head}>Scope</th>
            <th className={cn(tableStyles.head, "text-right")}>Min. order</th>
            <th className={cn(tableStyles.head, "min-w-40")}>Usage</th>
            <th className={tableStyles.head}>Valid</th>
            <th className={tableStyles.head}>Status</th>
            <th className={cn(tableStyles.head, "text-right")}>Actions</th>
          </tr>
        </thead>
        <tbody className={tableStyles.body}>
          {coupons.map((coupon) => {
            const state = couponState(coupon, now);
            const percent = coupon.usageLimit ? Math.min(100, (coupon.usedCount / coupon.usageLimit) * 100) : 8;

            return (
              <tr key={coupon.id} className={tableStyles.row}>
                <td className={tableStyles.cell} data-label="Code">
                  <span className="flex items-center gap-1.5">
                    <Link href={couponPath(coupon.id)} className={cn(couponCodeClass, "hover:text-choco")}>
                      {coupon.code}
                    </Link>
                    <button
                      type="button"
                      aria-label={`Copy ${coupon.code}`}
                      onClick={() => onCopy(coupon.code)}
                      className={buttonVariants({ variant: "ghost", size: "icon-xs" })}
                    >
                      <Icon name="copy" size={14} strokeWidth={1.8} />
                    </button>
                  </span>
                </td>
                <td className={cn(tableStyles.cell, "text-[13.5px] text-ink-2")} data-label="Type">
                  {DISCOUNT_TYPE_LABELS[coupon.discountType]}
                </td>
                <td className={cn(tableStyles.cell, "text-right font-semibold tabular-nums")} data-label="Value">
                  {couponValue(coupon)}
                </td>
                <td className={cn(tableStyles.cell, "text-[13.5px]")} data-label="Scope">
                  {couponScopeLabel(coupon)}
                </td>
                <td className={cn(tableStyles.cell, "text-right tabular-nums")} data-label="Min. order">
                  {coupon.minOrderAmount && Number(coupon.minOrderAmount) > 0 ? formatTaka(coupon.minOrderAmount) : "—"}
                </td>
                <td className={tableStyles.cell} data-label="Usage">
                  <span className="flex min-w-35 flex-col gap-1.5">
                    <span className="flex justify-between text-xs text-ink-3">
                      <span className="font-medium text-ink tabular-nums">{coupon.usedCount.toLocaleString("en-IN")}</span>
                      <span>of {coupon.usageLimit ? coupon.usageLimit.toLocaleString("en-IN") : "∞"}</span>
                    </span>
                    <span className="h-1.5 overflow-hidden rounded-full bg-surface-3">
                      <span className="block h-full rounded-full bg-brand" style={{ width: `${percent.toFixed(0)}%` }} />
                    </span>
                  </span>
                </td>
                <td className={cn(tableStyles.cell, "text-caption whitespace-nowrap text-ink-3")} data-label="Valid">
                  {couponWindow(coupon)}
                </td>
                <td className={tableStyles.cell} data-label="Status">
                  <Badge variant={COUPON_STATE_BADGES[state]}>{state}</Badge>
                </td>
                <td className={tableStyles.bareCell}>
                  <div className="flex justify-end gap-1.5">
                    <Link href={couponPath(coupon.id)} aria-label={`View ${coupon.code}`} className={buttonVariants({ variant: "square", size: "icon-md" })}>
                      <Icon name="eye" size={16} strokeWidth={1.8} />
                    </Link>
                    <button
                      type="button"
                      aria-label={`Edit ${coupon.code}`}
                      onClick={() => onEdit(coupon)}
                      className={buttonVariants({ variant: "square", size: "icon-md" })}
                    >
                      <Icon name="edit" size={16} strokeWidth={1.8} />
                    </button>
                    {canDelete && (
                      <button
                        type="button"
                        aria-label={`Delete ${coupon.code}`}
                        onClick={() => onDelete(coupon)}
                        className={buttonVariants({ variant: "square", size: "icon-md" })}
                      >
                        <Icon name="trash" size={16} strokeWidth={1.8} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
