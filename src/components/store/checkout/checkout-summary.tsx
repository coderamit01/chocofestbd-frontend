import { Icon } from "@/components/shared/icon";
import { CouponField } from "@/components/store/cart/coupon-field";
import { SummaryCard, SummaryRow, SummaryTitle, SummaryTotal } from "@/components/store/cart/summary-parts";
import { OrderLineItem } from "@/components/store/checkout/order-line-item";
import { TextLink } from "@/components/store/ui/text-link";
import { COUPON, GIFT_FEE } from "@/config/store-cart";
import type { CheckoutTotals } from "@/lib/store-cart";
import { formatTaka } from "@/lib/utils";
import type { CartLine } from "@/types/store-cart";

export type CheckoutSummaryProps = {
  lines: CartLine[];
  totals: CheckoutTotals;
  deliveryName: string;
  couponCode: string;
  couponInput: string;
  couponInvalid: boolean;
  gift: boolean;
  giftNote: string;
  showGiftNote?: boolean;
  className?: string;
  onCouponInput: (value: string) => void;
  onApplyCoupon: () => void;
  onRemoveCoupon: () => void;
};

export function CheckoutSummary({
  lines,
  totals,
  deliveryName,
  couponCode,
  couponInput,
  couponInvalid,
  gift,
  giftNote,
  showGiftNote,
  className,
  onCouponInput,
  onApplyCoupon,
  onRemoveCoupon,
}: CheckoutSummaryProps) {
  return (
    <SummaryCard className={className}>
      <SummaryTitle className="max-[900px]:hidden">Order summary</SummaryTitle>
      <div className="flex flex-col gap-3 border-b border-[#f0ebe6] pb-3.5">
        {lines.map((line) => (
          <OrderLineItem key={line.product.id} line={line} />
        ))}
      </div>
      {showGiftNote && gift && (
        <div className="flex items-center gap-2 rounded-[12px] bg-[#fdeaf0] px-3 py-2.5 text-[12.5px] text-[#c2185b]">
          <Icon name="gift" size={16} strokeWidth={1.8} />
          <span className="flex-1 truncate text-[#7a1a3d]">
            <b>Gift wrapped</b> · “{giftNote}”
          </span>
          <TextLink href="/cart">Edit</TextLink>
        </div>
      )}
      <div className="flex flex-col gap-2 border-t border-dashed border-[#ebe3dd] pt-3">
        {couponCode ? (
          <div className="flex items-center gap-2 rounded-[12px] bg-[#e6f6ec] px-3 py-2.5 text-[13px] text-[#1f8a4c]">
            <Icon name="check" size={15} strokeWidth={1.8} />
            <span className="flex-1 text-[#2f5e41]">
              <b>{COUPON.code}</b> applied · you save {formatTaka(totals.coupon)}
            </span>
            <TextLink onClick={onRemoveCoupon}>Remove</TextLink>
          </div>
        ) : (
          <CouponField
            value={couponInput}
            error={couponInvalid ? "That code isn’t valid" : undefined}
            onChange={onCouponInput}
            onApply={onApplyCoupon}
          />
        )}
      </div>
      <div className="flex flex-col gap-2.5">
        <SummaryRow label="Subtotal" value={formatTaka(totals.subtotal)} />
        <SummaryRow saving label="Discounts" value={`−${formatTaka(totals.discountAll)}`} />
        {gift && <SummaryRow label="Gift wrap & card" value={formatTaka(GIFT_FEE)} />}
        <SummaryRow
          label={`Delivery · ${deliveryName}`}
          value={totals.shipping ? formatTaka(totals.shipping) : "FREE"}
          free={!totals.shipping}
        />
        {totals.paymentFee > 0 && <SummaryRow label="Card gateway fee (1.5%)" value={formatTaka(totals.paymentFee)} />}
      </div>
      <SummaryTotal total={formatTaka(totals.total)} />
    </SummaryCard>
  );
}
