"use client";

import { useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { setCustomerBanAction } from "@/actions/customer.actions";
import { DangerDialog } from "@/components/shared/danger-dialog";
import { DataPagination } from "@/components/shared/data-pagination";
import { EmptyState } from "@/components/shared/empty-state";
import { Icon } from "@/components/shared/icon";
import { SearchInput } from "@/components/shared/search-input";
import { SegmentedControl } from "@/components/shared/segmented-control";
import { Button } from "@/components/ui/button";
import {
  CUSTOMER_JOINED_OPTIONS,
  CUSTOMER_ORDER_OPTIONS,
  CUSTOMER_PAGE_SIZES,
  CUSTOMER_STATUS_OPTIONS,
} from "@/config/customers";
import { useUrlSearch } from "@/hooks/use-url-search";
import { downloadCsv, toCsv } from "@/lib/csv";
import { customersQueryParams } from "@/lib/customer-query";
import { filterStyles } from "@/lib/filter-styles";
import { cn } from "@/lib/utils";
import { CustomerClient } from "@/services/customer.client";
import type { PaginationMeta } from "@/types/api";
import type { CustomerOrdersFilter, CustomerRow, CustomerSort, CustomersQuery } from "@/types/customer";
import { CustomersTable } from "./customers-table";

type CustomersManagerProps = {
  customers: CustomerRow[];
  meta?: PaginationMeta;
  query: CustomersQuery;
  canBan: boolean;
};

export function CustomersManager({ customers, meta, query, canBan }: CustomersManagerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const search = useUrlSearch();
  const [isNavigating, startNavigating] = useTransition();
  const [isSaving, startSaving] = useTransition();
  const [isExporting, startExporting] = useTransition();
  const [banTarget, setBanTarget] = useState<CustomerRow | null>(null);

  const navigate = (next: Partial<CustomersQuery>) => {
    const params = new URLSearchParams(customersQueryParams({ ...query, page: 1, ...next }));
    const target = params.toString() ? `${pathname}?${params}` : pathname;
    startNavigating(() => router.push(target, { scroll: false }));
  };

  const sortBy = (sort: Exclude<CustomerSort, "newest">) =>
    navigate({ sort, dir: query.sort === sort && query.dir === "desc" ? "asc" : "desc" });

  const exportCustomers = () =>
    startExporting(async () => {
      try {
        const rows = await CustomerClient.getAllCustomers(query);
        downloadCsv(
          "customers.csv",
          toCsv(
            ["Name", "Email", "Phone", "Phone verified", "Orders", "Total spent", "Points", "Joined", "Status"],
            rows.map((row) => [
              row.name,
              row.email,
              row.phone,
              row.phoneVerified ? "Yes" : "No",
              row.orderCount,
              Math.round(row.totalSpent),
              row.points,
              row.createdAt.slice(0, 10),
              row.isBanned ? "Banned" : "Active",
            ])
          )
        );
        toast.success("Export started", { description: `${rows.length} customers · customers.csv` });
      } catch (error) {
        toast.error("Couldn’t export customers", { description: error instanceof Error ? error.message : "Please try again." });
      }
    });

  const confirmBan = () => {
    if (!banTarget) return;
    const target = banTarget;
    const isBanned = !target.isBanned;
    startSaving(async () => {
      const result = await setCustomerBanAction(target.id, isBanned);
      if (!result.success) {
        toast.error("Something went wrong", { description: result.message });
        return;
      }
      setBanTarget(null);
      if (isBanned) toast.error("Customer banned", { description: target.name });
      else toast.success("Customer unbanned", { description: target.name });
    });
  };

  return (
    <section className={filterStyles.card}>
      <div className="flex flex-wrap items-center gap-3">
        <SearchInput
          label="Name, email or phone"
          value={search.value}
          onChange={(event) => search.setValue(event.target.value)}
          wrapperClassName="flex-[0_1_280px]"
        />
        <select
          aria-label="Joined"
          value={query.joined ? String(query.joined) : ""}
          onChange={(event) => navigate({ joined: Number(event.target.value) || undefined })}
          className={filterStyles.select}
        >
          {CUSTOMER_JOINED_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select
          aria-label="Orders"
          value={query.orders}
          onChange={(event) => navigate({ orders: event.target.value as CustomerOrdersFilter })}
          className={filterStyles.select}
        >
          {CUSTOMER_ORDER_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <SegmentedControl ariaLabel="Status" options={CUSTOMER_STATUS_OPTIONS} value={query.status} onChange={(status) => navigate({ status })} />
        <span className="flex-1" />
        <Button variant="outline" onClick={exportCustomers} aria-busy={isExporting || undefined}>
          <Icon name="download" size={18} strokeWidth={1.8} className="size-[17px]" />
          {isExporting ? "Exporting…" : "Export"}
        </Button>
      </div>

      <div className={cn("transition-opacity", (isNavigating || search.isPending) && "opacity-60")}>
        {customers.length === 0 ? (
          <EmptyState title="No customers found" description="Try a different search or filter." />
        ) : (
          <CustomersTable customers={customers} canBan={canBan} isPending={isSaving} onSort={sortBy} onBan={setBanTarget} />
        )}
      </div>

      {meta && meta.total > 0 && (
        <DataPagination
          meta={meta}
          pathname={pathname}
          query={customersQueryParams(query)}
          pageSizeControl={
            <select
              aria-label="Rows per page"
              value={query.limit}
              onChange={(event) => navigate({ limit: Number(event.target.value) })}
              className={cn(filterStyles.select, filterStyles.pageSize)}
            >
              {CUSTOMER_PAGE_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          }
        />
      )}

      <DangerDialog
        open={!!banTarget}
        title={banTarget ? `${banTarget.isBanned ? "Unban" : "Ban"} ${banTarget.name}?` : ""}
        description={
          banTarget?.isBanned
            ? "They can sign in and place orders again."
            : "They can’t sign in or place orders. Open orders are not cancelled."
        }
        confirmLabel={banTarget?.isBanned ? "Unban" : "Ban customer"}
        pendingLabel={banTarget?.isBanned ? "Unbanning…" : "Banning…"}
        isPending={isSaving}
        onOpenChange={(open) => !open && setBanTarget(null)}
        onConfirm={confirmBan}
      />
    </section>
  );
}
