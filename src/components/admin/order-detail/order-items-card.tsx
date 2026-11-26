/* eslint-disable @next/next/no-img-element */
import { monogram, monogramTint } from "@/lib/monogram";
import { methodLabel, money, plural, unitCount } from "@/lib/order-display";
import { formatTaka } from "@/lib/utils";
import type { OrderDetail } from "@/types/order";
import { DetailCard } from "./detail-card";

function Stat({ label, value, className, valueClassName }: { label: string; value: string | number; className?: string; valueClassName?: string }) {
  return (
    <span className={`flex flex-col ${className ?? ""}`}>
      <span className="text-xs text-ink-3">{label}</span>
      <span className={valueClassName ?? "font-semibold tabular-nums"}>{value}</span>
    </span>
  );
}

export function OrderItemsCard({ order }: { order: OrderDetail }) {
  const units = unitCount(order.items);
  const discount = money(order.discountAmount);
  const refunded = money(order.refundedAmount);
  const summaryRow = "grid grid-cols-subgrid col-span-3";

  return (
    <DetailCard
      title="Order items"
      action={<span className="text-[12.5px] text-ink-3">{`${plural(order.items.length, "product")} · ${plural(units, "unit")}`}</span>}
      className="min-w-0 flex-[2_1_600px]"
    >
      <div className="flex flex-col gap-3">
        {order.items.map((item) => {
          const itemDiscount = money(item.discountAmount);
          return (
            <div key={item.id} className="flex flex-wrap items-center gap-4 rounded-[14px] bg-surface-2 p-4">
              <span
                className="flex size-16 flex-none items-center justify-center overflow-hidden rounded-[12px] font-heading text-base leading-none font-bold"
                style={item.productImage ? undefined : monogramTint(item.productId ?? item.productName)}
              >
                {item.productImage ? <img src={item.productImage} alt="" className="size-full object-cover" /> : monogram(item.productName)}
              </span>
              <span className="flex min-w-45 flex-1 flex-col gap-0.5">
                <span className="text-xs text-ink-3">{item.categoryName ?? "Product"}</span>
                <span className="font-heading text-base leading-[1.3] font-semibold">{item.productName}</span>
                <span className="text-xs text-ink-3">SKU {item.productSku}</span>
              </span>
              <Stat label="Price" value={formatTaka(item.unitPrice)} className="min-w-20" />
              <Stat label="Qty" value={item.quantity} className="min-w-12.5" />
              <Stat label="Discount" value={itemDiscount ? `−${formatTaka(itemDiscount)}` : "—"} className="min-w-17.5" valueClassName="tabular-nums" />
              <Stat
                label="Total"
                value={formatTaka(item.lineTotal)}
                className="min-w-20 items-end"
                valueClassName="font-heading text-base leading-[1.3] font-semibold tabular-nums"
              />
            </div>
          );
        })}
      </div>

      <h4 className="mt-6 mb-3.5 font-heading text-base leading-[1.3] font-semibold">Order summary</h4>
      <dl className="m-0 grid grid-cols-[1fr_auto_auto] gap-x-6 gap-y-3 text-sm">
        <div className={summaryRow}>
          <dt className="text-ink-2">Subtotal</dt>
          <dd className="m-0 text-ink-3">{plural(units, "item")}</dd>
          <dd className="m-0 text-right tabular-nums">{formatTaka(order.subtotal)}</dd>
        </div>
        {(discount > 0 || order.couponCode) && (
          <div className={summaryRow}>
            <dt className="text-ink-2">Discount</dt>
            <dd className="m-0 text-ink-3">{order.couponCode ? `Coupon ${order.couponCode}` : "Promotion"}</dd>
            <dd className="m-0 text-right tabular-nums">{discount ? `−${formatTaka(discount)}` : "৳0"}</dd>
          </div>
        )}
        <div className={summaryRow}>
          <dt className="text-ink-2">Delivery fee</dt>
          <dd className="m-0 text-ink-3">{order.deliveryZoneName}</dd>
          <dd className="m-0 text-right tabular-nums">{money(order.deliveryCharge) ? formatTaka(order.deliveryCharge) : "Free"}</dd>
        </div>
        {refunded > 0 && (
          <div className={summaryRow}>
            <dt className="text-ink-2">Refunded</dt>
            <dd className="m-0 text-ink-3">to {order.paymentMethod === "COD" ? "customer" : methodLabel(order.paymentMethod)}</dd>
            <dd className="m-0 text-right text-danger tabular-nums">−{formatTaka(refunded)}</dd>
          </div>
        )}
        <div className={summaryRow}>
          <dt className="border-t border-line pt-3.5 text-base font-semibold">Total</dt>
          <dd className="m-0 border-t border-line" />
          <dd className="m-0 border-t border-line pt-3 text-right font-heading text-2xl leading-none font-semibold tabular-nums">{formatTaka(order.total)}</dd>
        </div>
      </dl>
    </DetailCard>
  );
}
