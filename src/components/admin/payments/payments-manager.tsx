"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { markPaymentPaidAction } from "@/actions/order.actions";
import { DataPagination } from "@/components/shared/data-pagination";
import { EmptyState } from "@/components/shared/empty-state";
import { Icon } from "@/components/shared/icon";
import { SegmentedControl } from "@/components/shared/segmented-control";
import { PAYMENT_METHODS } from "@/config/orders";
import { ADVANCE_PAYMENT_METHODS, PAYMENT_SEGMENTS } from "@/config/payments";
import { SEARCH_DEBOUNCE_MS } from "@/config/search";
import { paymentsQueryParams } from "@/lib/payment-query";
import { cn, formatTaka } from "@/lib/utils";
import type { PaginationMeta } from "@/types/api";
import type { AdvancePaymentMethod, PaymentRow, PaymentsQuery } from "@/types/payment";
import { PaymentsTable } from "./payments-table";
import { RejectPaymentDialog } from "./reject-payment-dialog";

const smallSelect =
  "select-chevron h-9 w-auto cursor-pointer rounded-[10px] border border-transparent bg-surface-2 pr-[38px] pl-3 text-[13px] text-ink outline-none transition-[border-color,box-shadow,background-color] focus:border-brand focus:bg-surface focus:shadow-focus";

type PaymentsManagerProps = {
  payments: PaymentRow[];
  meta?: PaginationMeta;
  query: PaymentsQuery;
  now: number;
};

export function PaymentsManager({ payments, meta, query, now }: PaymentsManagerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isNavigating, startNavigating] = useTransition();
  const [isSaving, startSaving] = useTransition();
  const [search, setSearch] = useState(query.search ?? "");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [rejecting, setRejecting] = useState<PaymentRow | null>(null);

  const navigate = (next: Partial<PaymentsQuery>) => {
    const params = new URLSearchParams(paymentsQueryParams({ ...query, page: 1, ...next }));
    startNavigating(() => router.push(params.toString() ? `${pathname}?${params}` : pathname, { scroll: false }));
  };

  useEffect(() => {
    const term = search.trim() || undefined;
    if (term === query.search) return;
    const timer = setTimeout(() => {
      const params = new URLSearchParams(paymentsQueryParams({ ...query, page: 1, search: term }));
      router.push(params.toString() ? `${pathname}?${params}` : pathname, { scroll: false });
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [search, query, pathname, router]);

  const verify = (payment: PaymentRow) => {
    setBusyId(payment.id);
    startSaving(async () => {
      const result = await markPaymentPaidAction(payment.id);
      setBusyId(null);
      if (!result.success) {
        toast.error("Couldn’t verify payment", { description: result.message });
        return;
      }
      toast.success("Payment verified", { description: `${payment.orderNumber} · ${formatTaka(payment.amount)}` });
    });
  };

  return (
    <section className="flex flex-col gap-5 rounded-xl bg-card px-6 py-5.5 max-[900px]:p-4.5">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex flex-[0_1_300px] items-center">
          <Icon name="search" size={18} strokeWidth={1.8} className="pointer-events-none absolute left-3.5 text-ink-3" />
          <input
            type="search"
            aria-label="Order #, sender or TrxID"
            placeholder="Order #, sender or TrxID"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="h-10.5 w-full rounded-[10px] border border-transparent bg-surface-2 pr-3.5 pl-10.5 text-sm text-ink outline-none transition-[border-color,box-shadow,background-color] placeholder:text-ink-4 focus:border-brand focus:bg-surface focus:shadow-focus"
          />
        </div>
        <select
          aria-label="Method"
          value={query.method ?? ""}
          onChange={(event) => navigate({ method: (event.target.value || undefined) as AdvancePaymentMethod | undefined })}
          className={smallSelect}
        >
          <option value="">All methods</option>
          {ADVANCE_PAYMENT_METHODS.map((method) => (
            <option key={method} value={method}>
              {PAYMENT_METHODS[method].short}
            </option>
          ))}
        </select>
        <SegmentedControl ariaLabel="Status" options={PAYMENT_SEGMENTS} value={query.status} onChange={(status) => navigate({ status })} className="self-center" />
      </div>

      <div className={cn("transition-opacity", (isNavigating || isSaving) && "opacity-60")}>
        {payments.length === 0 ? (
          <EmptyState title="Nothing here" description="No payments match this filter." />
        ) : (
          <PaymentsTable payments={payments} now={now} busyId={busyId} onVerify={verify} onReject={setRejecting} />
        )}
      </div>

      {meta && meta.totalPages > 1 && <DataPagination meta={meta} pathname={pathname} query={paymentsQueryParams(query)} />}

      {rejecting && <RejectPaymentDialog payment={rejecting} onClose={() => setRejecting(null)} />}
    </section>
  );
}
