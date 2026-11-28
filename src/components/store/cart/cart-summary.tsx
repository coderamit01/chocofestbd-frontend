import { Icon } from "@/components/shared/icon";
import { AcceptedPayments } from "@/components/store/cart/accepted-payments";
import { CouponField } from "@/components/store/cart/coupon-field";
import { DeliveryAreaPicker } from "@/components/store/cart/delivery-area-picker";
import { SummaryCard, SummaryRow, SummaryTitle, SummaryTotal } from "@/components/store/cart/summary-parts";
import { StoreButton } from "@/components/store/ui/store-button";
import { TextLink } from "@/components/store/ui/text-link";
import { CART_ZONES, COUPON, GIFT_FEE } from "@/config/store-cart";
import { cartZoneFee, pluralItems, type CartSummaryTotals } from "@/lib/store-cart";
import { formatTaka } from "@/lib/utils";
import type { CartZone } from "@/types/store-cart";

type CartSummaryProps = {
  summary: CartSummaryTotals;
  zone: CartZone;
  couponCode: string;
  gift: boolean;
  couponInput: string;
  couponError?: string;
  onZone: (zone: CartZone) => void;
  onCouponInput: (value: string) => void;
  onApplyCoupon: (code: string) => void;
  onRemoveCoupon: () => void;
};

const freeOr = (amount: number) => (amount ? formatTaka(amount) : "FREE");

export function CartSummary({
  summary,
  zone,
  couponCode,
  gift,
  couponInput,
  couponError,
  onZone,
  onCouponInput,
  onApplyCoupon,
  onRemoveCoupon,
}: CartSummaryProps) {
  const fees = Object.fromEntries(
    CART_ZONES.map(({ id }) => [id, freeOr(cartZoneFee(id, summary.afterBundle))]),
  ) as Record<CartZone, string>;
  const zoneName = CART_ZONES.find(({ id }) => id === zone)?.label;

  return (
    <SummaryCard>
      <SummaryTitle>Order summary</SummaryTitle>
      <DeliveryAreaPicker value={zone} fees={fees} onChange={onZone} />
      <div className="flex flex-col gap-2.5 border-t border-dashed border-[#ece4de] pt-3.5">
        <SummaryRow label={`Subtotal (${pluralItems(summary.count)})`} value={formatTaka(summary.subtotal)} />
        {summary.discount > 0 && (
          <SummaryRow saving label="Product discounts" value={`−${formatTaka(summary.discount)}`} />
        )}
        {summary.bundle > 0 && (
          <SummaryRow saving label="Bundle: 3+ items (5%)" value={`−${formatTaka(summary.bundle)}`} />
        )}
        {couponCode && (
          <SummaryRow
            saving
            label={
              <>
                Coupon {couponCode}{" "}
                <TextLink onClick={onRemoveCoupon} className="text-xs">
                  Remove
                </TextLink>
              </>
            }
            value={`−${formatTaka(summary.coupon)}`}
          />
        )}
        {gift && <SummaryRow label="Gift wrap & card" value={formatTaka(GIFT_FEE)} />}
        <SummaryRow label={`Delivery · ${zoneName}`} value={freeOr(summary.shipping)} free={!summary.shipping} />
      </div>
      {!couponCode && (
        <div className="flex flex-col gap-2 border-t border-dashed border-[#ebe3dd] pt-3">
          <CouponField
            value={couponInput}
            error={couponError}
            onChange={onCouponInput}
            onApply={() => onApplyCoupon(couponInput)}
          />
          <button
            type="button"
            onClick={() => onApplyCoupon(COUPON.code)}
            className="flex cursor-pointer items-center gap-1.5 rounded-[10px] border border-dashed border-[#ffc7a6] bg-[#fffaf6] px-2.5 py-2 text-left font-sans text-[12.5px] leading-[1.3] font-normal text-[#9a3412]"
          >
            <Icon name="percent" size={14} strokeWidth={1.8} />
            Tap to use <b>{COUPON.code}</b> — 10% off over ৳1,500
          </button>
        </div>
      )}
      <SummaryTotal total={formatTaka(summary.total)} />
      {summary.savings > 0 && (
        <span className="rounded-[10px] bg-[#e6f6ec] px-3 py-[9px] text-center text-[13px] font-medium text-[#1f8a4c]">
          🎉 You’re saving {formatTaka(summary.savingsShown)} on this order
        </span>
      )}
      <StoreButton href="/checkout" className="h-14 text-[15.5px]">
        <Icon name="lock" size={17} strokeWidth={1.8} />
        Proceed to checkout
      </StoreButton>
      <AcceptedPayments />
    </SummaryCard>
  );
}
