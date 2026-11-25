"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DataPagination } from "@/components/shared/data-pagination";
import { EmptyState } from "@/components/shared/empty-state";
import { MonoThumb } from "@/components/shared/mono-thumb";
import { StatusBadge } from "@/components/shared/status-badge";
import { Badge } from "@/components/ui/badge";
import { CUSTOMER_TABS, PAYMENT_METHOD_LABELS, orderPath } from "@/config/customers";
import { dayWithTime, effectivePrice, formatDhakaDate, relativeDay, stars } from "@/lib/customer-display";
import { isBengali } from "@/lib/customer-query";
import { tableStyles } from "@/lib/table-styles";
import { cn, formatPhone, formatTaka } from "@/lib/utils";
import type { PaginationMeta } from "@/types/api";
import type { CustomerOrder, CustomerProfile, CustomerTab } from "@/types/customer";

type CustomerActivityProps = {
  customer: CustomerProfile;
  orders: CustomerOrder[];
  ordersMeta?: PaginationMeta;
  now: number;
};

const panel = "rounded-[14px] bg-surface-2";

export function CustomerActivity({ customer, orders, ordersMeta, now }: CustomerActivityProps) {
  const pathname = usePathname();
  const [tab, setTab] = useState<CustomerTab>("orders");

  const counts: Record<CustomerTab, number> = {
    orders: customer.stats.orderCount,
    addresses: customer.addresses.length,
    wishlist: customer.wishlist.length,
    reviews: customer.reviews.length,
    cart: customer.cart.items.length,
  };

  return (
    <section className="flex flex-col gap-5 rounded-xl bg-card px-6 py-5.5 max-[900px]:p-4.5">
      <div role="tablist" aria-label="Customer details" className="flex gap-1.5 overflow-x-auto [scrollbar-width:none]">
        {CUSTOMER_TABS.map((item) => {
          const on = item.value === tab;
          return (
            <button
              key={item.value}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setTab(item.value)}
              className={cn(
                "inline-flex h-9.5 items-center gap-2 rounded-[10px] px-3.5 text-[13.5px] leading-none font-medium whitespace-nowrap",
                on ? "bg-brand-50 text-brand-text" : "text-ink-2 hover:bg-surface-2 hover:text-ink"
              )}
            >
              {item.label}
              <span
                className={cn(
                  "inline-flex h-5 min-w-5.5 items-center justify-center rounded-md px-1.5 text-[11.5px]",
                  on ? "bg-brand text-white" : "bg-surface-3 text-ink-2"
                )}
              >
                {counts[item.value]}
              </span>
            </button>
          );
        })}
      </div>

      {tab === "orders" &&
        (orders.length === 0 ? (
          <EmptyState title="No orders yet" description="Orders this customer places will appear here." />
        ) : (
          <>
            <div className={tableStyles.wrapper}>
              <table className={tableStyles.table}>
                <thead>
                  <tr>
                    <th className={tableStyles.head}>Order</th>
                    <th className={tableStyles.head}>Date</th>
                    <th className={cn(tableStyles.head, "text-right")}>Items</th>
                    <th className={cn(tableStyles.head, "text-right")}>Total</th>
                    <th className={tableStyles.head}>Payment</th>
                    <th className={tableStyles.head}>Status</th>
                  </tr>
                </thead>
                <tbody className={tableStyles.body}>
                  {orders.map((order) => (
                    <tr key={order.id} className={tableStyles.row}>
                      <td className={tableStyles.cell} data-label="Order">
                        <Link href={orderPath(order.id)} className="font-semibold text-ink hover:text-brand-text">
                          {order.orderNumber}
                        </Link>
                      </td>
                      <td className={cn(tableStyles.cell, "text-caption whitespace-nowrap text-ink-3")} data-label="Date">
                        {formatDhakaDate(order.createdAt)}
                      </td>
                      <td className={cn(tableStyles.cell, "text-right tabular-nums")} data-label="Items">
                        {order.itemCount}
                      </td>
                      <td className={cn(tableStyles.cell, "text-right font-semibold tabular-nums")} data-label="Total">
                        {formatTaka(order.total)}
                      </td>
                      <td className={cn(tableStyles.cell, "text-[13.5px]")} data-label="Payment">
                        {PAYMENT_METHOD_LABELS[order.paymentMethod] ?? order.paymentMethod}
                      </td>
                      <td className={tableStyles.cell} data-label="Status">
                        <StatusBadge kind="order" status={order.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {ordersMeta && ordersMeta.totalPages > 1 && <DataPagination meta={ordersMeta} pathname={pathname} />}
          </>
        ))}

      {tab === "addresses" &&
        (customer.addresses.length === 0 ? (
          <EmptyState title="No saved addresses" description="Addresses saved at checkout will appear here." />
        ) : (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-3.5">
            {customer.addresses.map((address) => {
              const text = [address.address, address.area, address.district].filter(Boolean).join(", ");
              return (
                <div key={address.id} className={cn(panel, "flex flex-col gap-2 p-4.5")}>
                  <span className="flex items-center gap-2">
                    <span className="font-semibold">{address.label || address.recipientName}</span>
                    {address.isDefault && (
                      <Badge variant="brand" size="sm">
                        Default
                      </Badge>
                    )}
                  </span>
                  <span className={cn("leading-[1.6]", isBengali(text) && "font-bengali")}>{text}</span>
                  <span className="text-xs text-ink-3">
                    {address.deliveryZone.name} · {formatPhone(address.recipientPhone)}
                  </span>
                </div>
              );
            })}
          </div>
        ))}

      {tab === "wishlist" &&
        (customer.wishlist.length === 0 ? (
          <EmptyState title="Wishlist is empty" description="Products this customer saves will appear here." />
        ) : (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(min(200px,100%),1fr))] gap-3.5">
            {customer.wishlist.map((item) => (
              <div key={item.id} className={cn(panel, "flex flex-col gap-2.5 p-3")}>
                <MonoThumb item={item.product} className="h-27.5 w-full text-[22px] leading-none" />
                <span className="text-sm font-medium">{item.product.name}</span>
                <span className="flex items-center justify-between">
                  <span className="font-semibold tabular-nums">{formatTaka(effectivePrice(item.product))}</span>
                  <span className="text-xs text-ink-3">added {relativeDay(item.createdAt, now).toLowerCase()}</span>
                </span>
              </div>
            ))}
          </div>
        ))}

      {tab === "reviews" &&
        (customer.reviews.length === 0 ? (
          <EmptyState title="No reviews yet" description="Reviews this customer writes will appear here." />
        ) : (
          <div className="flex flex-col gap-3">
            {customer.reviews.map((review) => (
              <div key={review.id} className={cn(panel, "flex flex-col gap-1.5 p-4")}>
                <span className="flex items-center justify-between gap-3">
                  <span className="font-medium">{review.product.name}</span>
                  <StatusBadge kind="review" status={review.status} size="sm" />
                </span>
                <span className="tracking-[1px] text-[#e08a00]" aria-label={`${review.rating} of 5`}>
                  {stars(review.rating)}
                </span>
                {review.comment && <span className={cn(isBengali(review.comment) && "font-bengali")}>{review.comment}</span>}
                <span className="text-xs text-ink-3">{formatDhakaDate(review.createdAt)}</span>
              </div>
            ))}
          </div>
        ))}

      {tab === "cart" &&
        (customer.cart.items.length === 0 ? (
          <EmptyState title="Cart is empty" description="Items this customer adds to the cart will appear here." />
        ) : (
          <div className="flex flex-col gap-3">
            {customer.cart.updatedAt && (
              <p className="text-caption text-ink-3">
                Items currently in the cart — last updated {dayWithTime(customer.cart.updatedAt, now).replace(/^(Today|Yesterday)/, (word) => word.toLowerCase())}.
              </p>
            )}
            {customer.cart.items.map((item) => (
              <div key={item.id} className={cn(panel, "flex items-center gap-3 p-3")}>
                <MonoThumb item={item.product} className="size-11 text-[13px] leading-none" />
                <span className="min-w-0 flex-1 font-medium">{item.product.name}</span>
                <span className="text-caption text-ink-3">× {item.quantity}</span>
                <span className="w-20 text-right font-semibold tabular-nums">{formatTaka(effectivePrice(item.product) * item.quantity)}</span>
              </div>
            ))}
          </div>
        ))}
    </section>
  );
}
