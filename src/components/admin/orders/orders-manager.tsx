"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { exportOrdersAction } from "@/actions/order.actions";
import { DataPagination } from "@/components/shared/data-pagination";
import { EmptyState } from "@/components/shared/empty-state";
import { Icon } from "@/components/shared/icon";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  bulkInvoicePath,
  ORDER_COUPON_FILTERS,
  ORDER_DATE_FILTERS,
  ORDER_PAGE_SIZES,
  ORDER_TABS,
  ORDERS_PATH,
  PAYMENT_METHOD_FILTERS,
  PAYMENT_METHODS,
  PAYMENT_STATUS_FILTERS,
} from "@/config/orders";
import { SEARCH_DEBOUNCE_MS } from "@/config/search";
import { STATUS_BADGES } from "@/config/status-badges";
import { dhakaDateTime } from "@/lib/dhaka-time";
import { downloadCsv, ORDER_CSV_HEADER, orderCsvRow, toCsv } from "@/lib/order-display";
import { formStyles } from "@/lib/form-styles";
import { ordersQueryParams } from "@/lib/order-query";
import { cn } from "@/lib/utils";
import type { PaginationMeta } from "@/types/api";
import type { OrderCounts, OrderFilterOptions, OrderListItem, OrderSortKey, OrdersQuery, PaymentMethod } from "@/types/order";
import type { PaymentStatus } from "@/types/status";
import { CreateOrderDrawer } from "./create-order-drawer";
import { OrderStatusDialog } from "./order-status-dialog";
import { OrdersTable } from "./orders-table";

const smallSelect =
  "select-chevron h-9 w-auto cursor-pointer rounded-[10px] border border-transparent bg-surface-2 pr-[38px] pl-3 text-[13px] text-ink outline-none transition-[border-color,box-shadow,background-color] focus:border-brand focus:bg-surface focus:shadow-focus";
const panelSelect = cn(formStyles.input, "select-chevron cursor-pointer bg-surface pr-[38px]");
const darkButton = "inline-flex h-[34px] items-center gap-1.5 rounded-md bg-white/12 px-3 text-[13px] font-medium text-white hover:bg-white/20";

type OrdersManagerProps = {
  orders: OrderListItem[];
  meta?: PaginationMeta;
  counts: OrderCounts;
  filterOptions: OrderFilterOptions;
  query: OrdersQuery;
};

type Chip = { key: keyof OrdersQuery; label: string; value: string };

export function OrdersManager({ orders, meta, counts, filterOptions, query }: OrdersManagerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isNavigating, startNavigating] = useTransition();
  const [isExporting, startExporting] = useTransition();
  const [search, setSearch] = useState(query.search ?? "");
  const [filtersOpen, setFiltersOpen] = useState(!!(query.date || query.zone || query.district || query.coupon));
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [statusTargets, setStatusTargets] = useState<OrderListItem[] | null>(null);
  const [creating, setCreating] = useState(false);

  const hrefFor = (next: Partial<OrdersQuery>) => {
    const params = new URLSearchParams(ordersQueryParams({ ...query, page: 1, ...next }));
    return params.toString() ? `${pathname}?${params}` : pathname;
  };

  const navigate = (next: Partial<OrdersQuery>) => {
    setSelected(new Set());
    startNavigating(() => router.push(hrefFor(next), { scroll: false }));
  };

  useEffect(() => {
    const term = search.trim() || undefined;
    if (term === query.search) return;
    const timer = setTimeout(() => {
      const params = new URLSearchParams(ordersQueryParams({ ...query, page: 1, search: term }));
      router.push(params.toString() ? `${pathname}?${params}` : pathname, { scroll: false });
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [search, query, pathname, router]);

  const toggle = (id: string) =>
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const toggleAll = () =>
    setSelected((current) => (orders.every((order) => current.has(order.id)) ? new Set() : new Set(orders.map((order) => order.id))));

  const sortBy = (sort: OrderSortKey) => navigate({ sort, dir: query.sort === sort && query.dir === "desc" ? "asc" : "desc" });

  const selectedOrders = orders.filter((order) => selected.has(order.id));

  const exportRows = (rows: OrderListItem[]) => {
    downloadCsv("orders.csv", toCsv([ORDER_CSV_HEADER, ...rows.map((order) => orderCsvRow(order, dhakaDateTime(order.createdAt)))]));
    toast.success("Export started", { description: `${rows.length} orders · orders.csv` });
  };

  const exportAll = () =>
    startExporting(async () => {
      const result = await exportOrdersAction(query);
      if (!result.success || !result.data) {
        toast.error("Export failed", { description: result.message });
        return;
      }
      exportRows(result.data);
    });

  const chips: Chip[] = [
    query.date && { key: "date", label: "Date", value: ORDER_DATE_FILTERS.find((option) => option.value === query.date)?.label ?? "" },
    query.method && { key: "method", label: "Method", value: PAYMENT_METHODS[query.method].short },
    query.pay && { key: "pay", label: "Payment", value: STATUS_BADGES.payment[query.pay].label },
    query.zone && { key: "zone", label: "Zone", value: query.zone },
    query.district && { key: "district", label: "District", value: query.district },
    query.coupon && { key: "coupon", label: "Coupon", value: ORDER_COUPON_FILTERS.find((option) => option.value === query.coupon)?.chip ?? "" },
  ].filter((chip): chip is Chip => !!chip);

  const clearFilters = () => {
    setSearch("");
    navigate({ search: undefined, method: undefined, pay: undefined, date: undefined, zone: undefined, district: undefined, coupon: undefined });
  };

  const resetAll = () => {
    setSearch("");
    setSelected(new Set());
    startNavigating(() => router.push(pathname, { scroll: false }));
  };

  return (
    <section className="flex flex-col gap-5 rounded-xl bg-card px-6 py-5.5 max-[900px]:p-4.5">
      <div role="tablist" aria-label="Order status" className="flex gap-1.5 overflow-x-auto [scrollbar-width:none]">
        {ORDER_TABS.map((tab) => {
          const on = query.tab === tab;
          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => navigate({ tab })}
              className={cn(
                "inline-flex h-9.5 items-center gap-2 rounded-[10px] px-3.5 text-[13.5px] leading-none font-medium whitespace-nowrap",
                on ? "bg-brand-50 text-brand-text" : "text-ink-2 hover:bg-surface-2 hover:text-ink"
              )}
            >
              {tab === "ALL" ? "All" : STATUS_BADGES.order[tab].label}
              <span
                className={cn(
                  "inline-flex h-5 min-w-5.5 items-center justify-center rounded-md px-1.5 text-[11.5px]",
                  on ? "bg-brand text-white" : "bg-surface-3 text-ink-2"
                )}
              >
                {counts[tab] ?? 0}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex flex-[0_1_300px] items-center">
          <Icon name="search" size={18} strokeWidth={1.8} className="pointer-events-none absolute left-3.5 text-ink-3" />
          <input
            type="search"
            aria-label="Search order #, phone or name"
            placeholder="Search order #, phone or name"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="h-10.5 w-full rounded-[10px] border border-transparent bg-surface-2 pr-3.5 pl-10.5 text-sm text-ink outline-none transition-[border-color,box-shadow,background-color] placeholder:text-ink-4 focus:border-brand focus:bg-surface focus:shadow-focus"
          />
        </div>
        <select
          aria-label="Payment method"
          value={query.method ?? ""}
          onChange={(event) => navigate({ method: (event.target.value || undefined) as PaymentMethod | undefined })}
          className={smallSelect}
        >
          <option value="">All methods</option>
          {PAYMENT_METHOD_FILTERS.map((method) => (
            <option key={method} value={method}>
              {PAYMENT_METHODS[method].short}
            </option>
          ))}
        </select>
        <select
          aria-label="Payment status"
          value={query.pay ?? ""}
          onChange={(event) => navigate({ pay: (event.target.value || undefined) as PaymentStatus | undefined })}
          className={smallSelect}
        >
          <option value="">Any payment</option>
          {PAYMENT_STATUS_FILTERS.map((status) => (
            <option key={status} value={status}>
              {STATUS_BADGES.payment[status].label}
            </option>
          ))}
        </select>
        <button
          type="button"
          aria-expanded={filtersOpen}
          onClick={() => setFiltersOpen((open) => !open)}
          className={buttonVariants({ variant: filtersOpen ? "tint" : "soft" })}
        >
          <Icon name="filter" size={18} strokeWidth={1.8} />
          Filters
        </button>
        <span className="flex-1" />
        <Button variant="outline" onClick={exportAll} aria-busy={isExporting || undefined}>
          <Icon name="download" size={18} strokeWidth={1.8} />
          {isExporting ? "Exporting…" : "Export"}
        </Button>
        <Button onClick={() => setCreating(true)}>
          <Icon name="plus" size={18} strokeWidth={1.8} />
          Create order
        </Button>
      </div>

      {filtersOpen && (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-3.5 rounded-[14px] bg-surface-2 p-4">
          <div className={formStyles.field}>
            <label className={formStyles.label} htmlFor="f1">
              Date
            </label>
            <select id="f1" value={query.date ?? ""} onChange={(event) => navigate({ date: (event.target.value || undefined) as OrdersQuery["date"] })} className={panelSelect}>
              <option value="">Any date</option>
              {ORDER_DATE_FILTERS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className={formStyles.field}>
            <label className={formStyles.label} htmlFor="f2">
              Delivery zone
            </label>
            <select id="f2" value={query.zone ?? ""} onChange={(event) => navigate({ zone: event.target.value || undefined })} className={panelSelect}>
              <option value="">All zones</option>
              {filterOptions.zones.map((zone) => (
                <option key={zone} value={zone}>
                  {zone}
                </option>
              ))}
            </select>
          </div>
          <div className={formStyles.field}>
            <label className={formStyles.label} htmlFor="f3">
              District
            </label>
            <select id="f3" value={query.district ?? ""} onChange={(event) => navigate({ district: event.target.value || undefined })} className={panelSelect}>
              <option value="">All districts</option>
              {filterOptions.districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
          <div className={formStyles.field}>
            <label className={formStyles.label} htmlFor="f4">
              Coupon
            </label>
            <select id="f4" value={query.coupon ?? ""} onChange={(event) => navigate({ coupon: (event.target.value || undefined) as OrdersQuery["coupon"] })} className={panelSelect}>
              <option value="">Any</option>
              {ORDER_COUPON_FILTERS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {chips.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {chips.map((chip) => (
            <span key={chip.key} className="inline-flex h-[30px] items-center gap-1.5 rounded-lg bg-surface-2 pr-1.5 pl-3 text-[13px] text-ink">
              <span className="text-ink-3">{chip.label}</span>
              {chip.value}
              <button
                type="button"
                aria-label={`Remove ${chip.label} filter`}
                onClick={() => navigate({ [chip.key]: undefined })}
                className="inline-flex size-[22px] items-center justify-center rounded-[6px] text-ink-3 hover:bg-surface-3 hover:text-ink"
              >
                <Icon name="close" size={13} strokeWidth={2.2} />
              </button>
            </span>
          ))}
          <Button variant="link" size="sm" onClick={clearFilters}>
            Clear all
          </Button>
        </div>
      )}

      {selected.size > 0 && (
        <div className="flex flex-wrap items-center gap-2.5 rounded-[14px] bg-choco py-2.5 pr-2.5 pl-4.5 text-white">
          <span className="font-medium">{selected.size} selected</span>
          <span className="flex-1" />
          <Button size="sm" onClick={() => setStatusTargets(selectedOrders)}>
            Change status
          </Button>
          <Link href={bulkInvoicePath([...selected])} className={darkButton}>
            <Icon name="print" size={15} strokeWidth={1.8} />
            Print invoices
          </Link>
          <button type="button" className={darkButton} onClick={() => exportRows(selectedOrders)}>
            Export
          </button>
          <button
            type="button"
            className="inline-flex h-[34px] items-center rounded-md px-3 text-[13px] font-medium text-[#e8d6cc] hover:text-white"
            onClick={() => setSelected(new Set())}
          >
            Clear
          </button>
        </div>
      )}

      <div className={cn("transition-opacity", isNavigating && "opacity-60")}>
        {orders.length === 0 ? (
          <EmptyState
            title="No orders match"
            description="Try another tab, clear a filter, or search the full 11-digit phone number."
            action={
              <Button variant="soft" size="sm" onClick={resetAll}>
                Reset filters
              </Button>
            }
          />
        ) : (
          <OrdersTable
            orders={orders}
            query={query}
            selected={selected}
            onToggle={toggle}
            onToggleAll={toggleAll}
            onSort={sortBy}
            onChangeStatus={(order) => setStatusTargets([order])}
          />
        )}
      </div>

      {meta && meta.total > 0 && (
        <DataPagination
          meta={meta}
          pathname={pathname}
          query={ordersQueryParams(query)}
          pageSizeControl={
            <select aria-label="Rows per page" value={query.limit} onChange={(event) => navigate({ limit: Number(event.target.value) })} className={cn(smallSelect, "w-19")}>
              {ORDER_PAGE_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          }
        />
      )}

      {statusTargets && (
        <OrderStatusDialog
          targets={statusTargets}
          onClose={() => setStatusTargets(null)}
          onDone={() => {
            setStatusTargets(null);
            setSelected(new Set());
          }}
        />
      )}

      <CreateOrderDrawer
        open={creating}
        onOpenChange={setCreating}
        onCreated={() => {
          setCreating(false);
          startNavigating(() => router.push(ORDERS_PATH, { scroll: false }));
        }}
      />
    </section>
  );
}
