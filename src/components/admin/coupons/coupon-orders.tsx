"use client";

import { useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { DataPagination } from "@/components/shared/data-pagination";
import { EmptyState } from "@/components/shared/empty-state";
import { SearchInput } from "@/components/shared/search-input";
import { SelectMenu } from "@/components/shared/select-menu";
import { StatusBadge } from "@/components/shared/status-badge";
import { COUPON_ORDER_PAGE_SIZES } from "@/config/coupons";
import { orderPath } from "@/config/customers";
import { useUrlSearch } from "@/hooks/use-url-search";
import { formatDhakaDate } from "@/lib/customer-display";
import { couponOrdersQueryParams, type CouponOrdersQuery } from "@/lib/coupon-query";
import { isBengali } from "@/lib/customer-query";
import { filterStyles } from "@/lib/filter-styles";
import { tableStyles } from "@/lib/table-styles";
import { cn, formatTaka } from "@/lib/utils";
import type { PaginationMeta } from "@/types/api";
import type { CouponOrder } from "@/types/coupon";

type CouponOrdersProps = {
  code: string;
  orders: CouponOrder[];
  meta?: PaginationMeta;
  query: CouponOrdersQuery;
};

export function CouponOrders({ code, orders, meta, query }: CouponOrdersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const search = useUrlSearch();
  const [isNavigating, startNavigating] = useTransition();

  const setLimit = (limit: number) => {
    const params = new URLSearchParams(couponOrdersQueryParams({ ...query, page: 1, limit }));
    startNavigating(() => router.push(params.toString() ? `${pathname}?${params}` : pathname, { scroll: false }));
  };

  return (
    <section className="flex flex-col gap-4 rounded-xl bg-card px-6 py-5.5 max-[900px]:p-4.5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-heading text-heading text-ink">Orders using {code}</h3>
        <SearchInput
          label="Order # or customer"
          value={search.value}
          onChange={(event) => search.setValue(event.target.value)}
          wrapperClassName="flex-[0_1_240px]"
        />
      </div>

      <div className={cn("transition-opacity", (isNavigating || search.isPending) && "opacity-60")}>
        {orders.length === 0 ? (
          <EmptyState
            title={query.search ? "No matching orders" : "No orders yet"}
            description={query.search ? "Try another order number or name." : "Orders that use this code will appear here."}
          />
        ) : (
          <div className={tableStyles.wrapper}>
            <table className={tableStyles.table}>
              <thead>
                <tr>
                  <th className={tableStyles.head}>Order</th>
                  <th className={tableStyles.head}>Customer</th>
                  <th className={tableStyles.head}>Date</th>
                  <th className={cn(tableStyles.head, "text-right")}>Subtotal</th>
                  <th className={cn(tableStyles.head, "text-right")}>Discount</th>
                  <th className={cn(tableStyles.head, "text-right")}>Total</th>
                  <th className={tableStyles.head}>Status</th>
                </tr>
              </thead>
              <tbody className={tableStyles.body}>
                {orders.map((order) => {
                  const name = order.user?.name ?? order.recipientName;
                  return (
                    <tr key={order.id} className={tableStyles.row}>
                      <td className={tableStyles.cell} data-label="Order">
                        <Link href={orderPath(order.id)} className="font-semibold text-ink hover:text-brand-text">
                          {order.orderNumber}
                        </Link>
                      </td>
                      <td className={cn(tableStyles.cell, isBengali(name) && "font-bengali")} data-label="Customer">
                        {name}
                      </td>
                      <td className={cn(tableStyles.cell, "text-caption whitespace-nowrap text-ink-3")} data-label="Date">
                        {formatDhakaDate(order.createdAt)}
                      </td>
                      <td className={cn(tableStyles.cell, "text-right tabular-nums")} data-label="Subtotal">
                        {formatTaka(order.subtotal)}
                      </td>
                      <td className={cn(tableStyles.cell, "text-right text-success tabular-nums")} data-label="Discount">
                        −{formatTaka(order.discountAmount)}
                      </td>
                      <td className={cn(tableStyles.cell, "text-right font-semibold tabular-nums")} data-label="Total">
                        {formatTaka(order.total)}
                      </td>
                      <td className={tableStyles.cell} data-label="Status">
                        <StatusBadge kind="order" status={order.status} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {meta && meta.total > 0 && (
        <DataPagination
          meta={meta}
          pathname={pathname}
          query={couponOrdersQueryParams(query)}
          pageSizeControl={
            <SelectMenu
              ariaLabel="Rows per page"
              size="sm"
              className={filterStyles.pageSize}
              value={String(query.limit)}
              onChange={(limit) => setLimit(Number(limit))}
              options={COUPON_ORDER_PAGE_SIZES.map((size) => ({ value: String(size), label: String(size) }))}
            />
          }
        />
      )}
    </section>
  );
}
