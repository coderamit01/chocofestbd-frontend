"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/shared/icon";
import { StatusBadge } from "@/components/shared/status-badge";
import { buttonVariants } from "@/components/ui/button";
import { copyWithToast } from "@/lib/clipboard";
import { invoicePath, orderPath } from "@/config/orders";
import { dhakaClock, dhakaDate } from "@/lib/dhaka-time";
import { isBangla, methodShort, unitCount } from "@/lib/order-display";
import { tableStyles } from "@/lib/table-styles";
import { cn, formatPhone, formatTaka } from "@/lib/utils";
import type { OrderListItem, OrderSortKey, OrdersQuery } from "@/types/order";

type OrdersTableProps = {
  orders: OrderListItem[];
  query: OrdersQuery;
  selected: Set<string>;
  onToggle: (id: string) => void;
  onToggleAll: () => void;
  onSort: (sort: OrderSortKey) => void;
  onChangeStatus: (order: OrderListItem) => void;
};

function SortButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={active} className="inline-flex cursor-pointer items-center gap-1.5 hover:text-ink">
      {label}
      <Icon name="sort" size={12} strokeWidth={1.8} />
    </button>
  );
}

function CopyOrderNumber({ orderNumber }: { orderNumber: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <button
      type="button"
      aria-label={`Copy order number ${orderNumber}`}
      title={copied ? "Copied" : "Copy"}
      onClick={() => {
        copyWithToast(orderNumber, "Copied", `${orderNumber} copied to clipboard`);
        setCopied(true);
      }}
      className={cn(buttonVariants({ variant: "square", size: "icon-xs" }), "size-6.5 rounded-[7px]", copied ? "text-[#1f8a4c] hover:text-[#1f8a4c]" : "text-ink-3")}
    >
      {copied ? <Icon name="check" size={14} strokeWidth={2.6} /> : <Icon name="copy" size={14} strokeWidth={1.8} />}
    </button>
  );
}

export function OrdersTable({ orders, query, selected, onToggle, onToggleAll, onSort, onChangeStatus }: OrdersTableProps) {
  const allOn = orders.length > 0 && orders.every((order) => selected.has(order.id));
  const head = tableStyles.head;

  return (
    <div className={tableStyles.wrapper}>
      <table className={tableStyles.table}>
        <thead>
          <tr>
            <th className={cn(head, "w-11")}>
              <input type="checkbox" aria-label="Select all on page" checked={allOn} onChange={onToggleAll} />
            </th>
            <th className={head}>Order</th>
            <th className={head}>
              <SortButton label="Date" active={query.sort === "date"} onClick={() => onSort("date")} />
            </th>
            <th className={head}>Customer</th>
            <th className={cn(head, "text-right")}>Items</th>
            <th className={cn(head, "text-right")}>
              <SortButton label="Total" active={query.sort === "total"} onClick={() => onSort("total")} />
            </th>
            <th className={head}>Payment</th>
            <th className={head}>Status</th>
            <th className={head}>Zone</th>
            <th className={cn(head, "text-right")}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className={tableStyles.body}>
          {orders.map((order) => {
            const on = selected.has(order.id);
            const cell = cn(tableStyles.cell, on && "bg-brand-50");

            return (
              <tr key={order.id} className={tableStyles.row}>
                <td className={cn(tableStyles.bareCell, on && "bg-brand-50")}>
                  <input
                    type="checkbox"
                    aria-label={`Select ${order.orderNumber}`}
                    checked={on}
                    onChange={() => onToggle(order.id)}
                  />
                </td>
                <td className={cell} data-label="Order">
                  <span className="flex flex-col">
                    <span className="flex items-center gap-1 max-[900px]:justify-end">
                      <Link href={orderPath(order.id)} className="font-semibold text-ink">
                        {order.orderNumber}
                      </Link>
                      <CopyOrderNumber orderNumber={order.orderNumber} />
                    </span>
                    <span className="text-xs text-ink-3">{order.invoiceNumber}</span>
                  </span>
                </td>
                <td className={cn(cell, "whitespace-nowrap")} data-label="Date">
                  <span className="flex flex-col">
                    <span>{dhakaDate(order.createdAt)}</span>
                    <span className="text-xs text-ink-3">{dhakaClock(order.createdAt)}</span>
                  </span>
                </td>
                <td className={cell} data-label="Customer">
                  <span className="flex flex-col">
                    <span className={cn("font-medium", isBangla(order.recipientName) && "font-bengali")}>{order.recipientName}</span>
                    <a href={`tel:+88${order.recipientPhone}`} className="text-xs text-ink-3">
                      {formatPhone(order.recipientPhone)}
                    </a>
                  </span>
                </td>
                <td className={cn(cell, "text-right tabular-nums")} data-label="Items">
                  {unitCount(order.items)}
                </td>
                <td className={cn(cell, "text-right font-semibold tabular-nums")} data-label="Total">
                  {formatTaka(order.total)}
                </td>
                <td className={cell} data-label="Payment">
                  <span className="flex flex-col items-start gap-1 max-[900px]:items-end">
                    <span className="text-[13px]">{methodShort(order.paymentMethod)}</span>
                    <StatusBadge kind="payment" status={order.paymentStatus} size="sm" />
                  </span>
                </td>
                <td className={cell} data-label="Status">
                  <StatusBadge kind="order" status={order.status} />
                </td>
                <td className={cn(cell, "text-[13px] whitespace-nowrap text-ink-2")} data-label="Zone">
                  {order.deliveryZoneName}
                </td>
                <td className={cn(tableStyles.bareCell, on && "bg-brand-50")}>
                  <div className="flex justify-end gap-1.5">
                    <Link
                      href={orderPath(order.id)}
                      aria-label={`View ${order.orderNumber}`}
                      title="View"
                      className={buttonVariants({ variant: "square", size: "icon-md" })}
                    >
                      <Icon name="eye" size={16} strokeWidth={1.8} />
                    </Link>
                    <button
                      type="button"
                      aria-label={`Change status of ${order.orderNumber}`}
                      title="Change status"
                      onClick={() => onChangeStatus(order)}
                      className={buttonVariants({ variant: "square", size: "icon-md" })}
                    >
                      <Icon name="refresh" size={16} strokeWidth={1.8} />
                    </button>
                    <Link
                      href={invoicePath(order.id)}
                      aria-label={`Print invoice ${order.orderNumber}`}
                      title="Print invoice"
                      className={buttonVariants({ variant: "square", size: "icon-md" })}
                    >
                      <Icon name="print" size={16} strokeWidth={1.8} />
                    </Link>
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
