"use client";

import { useState, type ReactNode } from "react";
import { filterOrders } from "@/lib/store-account";
import type { CustomerOrder, OrderFilter } from "@/types/store-order";
import { AccountEmpty } from "./account-empty";
import { AccountHeading } from "./account-heading";
import { OrderCard } from "./order-card";
import { OrderFilterTabs } from "./order-filter-tabs";

type OrdersViewProps = {
  orders: CustomerOrder[];
  filters: OrderFilter[];
  stats: ReactNode;
};

export function OrdersView({ orders, filters, stats }: OrdersViewProps) {
  const [active, setActive] = useState(0);
  const visible = filterOrders(orders, filters[active]?.tone);

  return (
    <>
      <AccountHeading title="My orders">
        <OrderFilterTabs filters={filters} active={active} onChange={setActive} />
      </AccountHeading>
      {stats}
      {visible.length ? (
        <div className="flex flex-col gap-3">
          {visible.map((order) => (
            <OrderCard key={order.number} order={order} />
          ))}
        </div>
      ) : (
        <AccountEmpty
          icon="orders"
          title="No orders here yet"
          description="Orders matching this filter will show up here."
          actionLabel="Start shopping"
          actionHref="/shop"
        />
      )}
    </>
  );
}
