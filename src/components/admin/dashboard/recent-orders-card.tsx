import Link from "next/link";
import { StatusBadge } from "@/components/shared/status-badge";
import { buttonVariants } from "@/components/ui/button";
import { ORDERS_PATH, orderPath } from "@/config/orders";
import { timeAgoFrom } from "@/lib/dhaka-time";
import { isBangla, methodShort } from "@/lib/order-display";
import { tableStyles } from "@/lib/table-styles";
import { cn, formatPhone, formatTaka } from "@/lib/utils";
import type { DashboardOverview } from "@/types/dashboard";
import { DashCard } from "./dashboard-cards";

export function RecentOrdersCard({ orders, now }: { orders: DashboardOverview["recentOrders"]; now: number }) {
  const head = tableStyles.head;

  return (
    <DashCard
      id="ro"
      title="Recent orders"
      className="flex-[2_1_600px]"
      action={
        <Link href={ORDERS_PATH} className={buttonVariants({ variant: "soft", size: "sm" })}>
          View all
        </Link>
      }
    >
      {orders.length === 0 ? (
        <p className="py-10 text-center text-[12.5px] text-ink-3">No orders yet.</p>
      ) : (
        <div className={tableStyles.wrapper}>
          <table className={tableStyles.table}>
            <thead>
              <tr>
                <th className={head}>Order</th>
                <th className={head}>Customer</th>
                <th className={cn(head, "text-right")}>Total</th>
                <th className={head}>Status</th>
                <th className={head}>Payment</th>
                <th className={cn(head, "text-right")}>Placed</th>
              </tr>
            </thead>
            <tbody className={tableStyles.body}>
              {orders.map((order) => (
                <tr key={order.id} className={tableStyles.row}>
                  <td className={tableStyles.cell} data-label="Order">
                    <Link href={orderPath(order.id)} className="font-semibold whitespace-nowrap text-ink">
                      {order.orderNumber}
                    </Link>
                  </td>
                  <td className={tableStyles.cell} data-label="Customer">
                    <span className="flex flex-col">
                      <span className={cn("font-medium", isBangla(order.recipientName) && "font-bengali")}>{order.recipientName}</span>
                      <span className="text-xs text-ink-3">{formatPhone(order.recipientPhone)}</span>
                    </span>
                  </td>
                  <td className={cn(tableStyles.cell, "text-right font-semibold tabular-nums")} data-label="Total">
                    {formatTaka(order.total)}
                  </td>
                  <td className={tableStyles.cell} data-label="Status">
                    <StatusBadge kind="order" status={order.status} />
                  </td>
                  <td className={tableStyles.cell} data-label="Payment">
                    <span className="flex items-center gap-2 max-[900px]:justify-end">
                      <span className="text-[13px] text-ink-2">{methodShort(order.paymentMethod)}</span>
                      <StatusBadge kind="payment" status={order.paymentStatus} size="sm" />
                    </span>
                  </td>
                  <td className={cn(tableStyles.cell, "text-right text-[12.5px] whitespace-nowrap text-ink-3")} data-label="Placed">
                    {timeAgoFrom(order.createdAt, now)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashCard>
  );
}
