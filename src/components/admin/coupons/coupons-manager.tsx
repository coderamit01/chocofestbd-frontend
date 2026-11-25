"use client";

import { useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteCouponAction } from "@/actions/coupon.actions";
import { DangerDialog } from "@/components/shared/danger-dialog";
import { DataPagination } from "@/components/shared/data-pagination";
import { EmptyState } from "@/components/shared/empty-state";
import { Icon } from "@/components/shared/icon";
import { SearchInput } from "@/components/shared/search-input";
import { SegmentedControl } from "@/components/shared/segmented-control";
import { Button } from "@/components/ui/button";
import { COUPON_STATUS_OPTIONS, DISCOUNT_TYPE_OPTIONS } from "@/config/coupons";
import { useUrlSearch } from "@/hooks/use-url-search";
import { copyText } from "@/lib/clipboard";
import { couponsQueryParams } from "@/lib/coupon-query";
import { filterStyles } from "@/lib/filter-styles";
import { cn } from "@/lib/utils";
import type { PaginationMeta } from "@/types/api";
import type { CouponDetail, CouponOptions, CouponsQuery, DiscountType } from "@/types/coupon";
import { CouponFormDrawer, type CouponDrawerState } from "./coupon-form-drawer";
import { CouponsTable } from "./coupons-table";

type CouponsManagerProps = {
  coupons: CouponDetail[];
  meta?: PaginationMeta;
  query: CouponsQuery;
  options: CouponOptions;
  now: number;
  today: string;
  canDelete: boolean;
};

export function CouponsManager({ coupons, meta, query, options, now, today, canDelete }: CouponsManagerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const search = useUrlSearch();
  const [isNavigating, startNavigating] = useTransition();
  const [isDeleting, startDeleting] = useTransition();
  const [drawer, setDrawer] = useState<CouponDrawerState>(null);
  const [deleteTarget, setDeleteTarget] = useState<CouponDetail | null>(null);

  const navigate = (next: Partial<CouponsQuery>) => {
    const params = new URLSearchParams(couponsQueryParams({ ...query, page: 1, ...next }));
    startNavigating(() => router.push(params.toString() ? `${pathname}?${params}` : pathname, { scroll: false }));
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    const target = deleteTarget;
    startDeleting(async () => {
      const result = await deleteCouponAction(target.id);
      if (!result.success) {
        toast.error("Couldn’t delete coupon", { description: result.message });
        return;
      }
      setDeleteTarget(null);
      toast.error("Coupon deleted", { description: target.code });
    });
  };

  return (
    <section className={filterStyles.card}>
      <div className="flex flex-wrap items-center gap-3">
        <SearchInput
          label="Search code"
          value={search.value}
          onChange={(event) => search.setValue(event.target.value)}
          wrapperClassName="flex-[0_1_240px]"
        />
        <SegmentedControl ariaLabel="Status" options={COUPON_STATUS_OPTIONS} value={query.status} onChange={(status) => navigate({ status })} />
        <select
          aria-label="Type"
          value={query.type ?? ""}
          onChange={(event) => navigate({ type: (event.target.value || undefined) as DiscountType | undefined })}
          className={filterStyles.select}
        >
          <option value="">All types</option>
          {DISCOUNT_TYPE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="flex-1" />
        <Button onClick={() => setDrawer({ mode: "new" })}>
          <Icon name="plus" size={18} strokeWidth={1.8} className="size-[17px]" />
          Create coupon
        </Button>
      </div>

      <div className={cn("transition-opacity", (isNavigating || search.isPending) && "opacity-60")}>
        {coupons.length === 0 ? (
          <EmptyState title="No coupons here" description="Try another status, or create a coupon." />
        ) : (
          <CouponsTable
            coupons={coupons}
            now={now}
            canDelete={canDelete}
            onCopy={(code) => copyText(code, "Copied")}
            onEdit={(coupon) => setDrawer({ mode: "edit", coupon })}
            onDelete={setDeleteTarget}
          />
        )}
      </div>

      {meta && meta.totalPages > 1 && <DataPagination meta={meta} pathname={pathname} query={couponsQueryParams(query)} />}

      <CouponFormDrawer state={drawer} options={options} today={today} onClose={() => setDrawer(null)} />
      <DangerDialog
        open={!!deleteTarget}
        title={deleteTarget ? `Delete ${deleteTarget.code}?` : ""}
        description="Past orders keep their discount. Customers can no longer use this code."
        confirmLabel="Delete coupon"
        pendingLabel="Deleting…"
        isPending={isDeleting}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
    </section>
  );
}
