"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { markPaymentPaidAction, rejectPaymentAction } from "@/actions/order.actions";
import { PaymentMethodChip } from "@/components/admin/orders/payment-method-chip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { orderPath, PAYMENTS_PATH } from "@/config/orders";
import { formatPhone, formatTaka } from "@/lib/utils";
import type { DashboardOverview } from "@/types/dashboard";
import type { PaymentRow } from "@/types/payment";
import { CaughtUp, DashCard, OpenLink } from "./dashboard-cards";

export function AwaitingVerificationCard({ pending }: { pending: DashboardOverview["pendingPayments"] }) {
  const [busyId, setBusyId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const act = (payment: PaymentRow, approve: boolean) => {
    setBusyId(payment.id);
    startTransition(async () => {
      const result = approve ? await markPaymentPaidAction(payment.id) : await rejectPaymentAction(payment.id);
      setBusyId(null);
      if (!result.success) {
        toast.error(approve ? "Couldn’t verify payment" : "Couldn’t reject payment", { description: result.message });
        return;
      }
      if (approve) toast.success("Payment verified", { description: `${payment.orderNumber} marked as paid` });
      else toast.error("Payment rejected", { description: "Customer asked to resubmit" });
    });
  };

  return (
    <DashCard
      id="av"
      className="flex-[1_1_320px]"
      title={
        <>
          Awaiting verification
          <Badge variant="warning" size="sm">
            {pending.total}
          </Badge>
        </>
      }
      action={<OpenLink href={PAYMENTS_PATH} label="Open payments" />}
    >
      <div className="flex flex-col gap-3">
        {pending.items.length === 0 && <CaughtUp />}
        {pending.items.map((payment) => (
          <div key={payment.id} className="flex flex-col gap-3 rounded-[14px] bg-surface-2 p-3.5">
            <div className="flex items-center justify-between gap-2">
              <span className="flex min-w-0 items-center gap-2.5">
                <PaymentMethodChip method={payment.paymentMethod} />
                <Link href={orderPath(payment.id)} className="truncate text-sm font-semibold text-ink">
                  {payment.orderNumber}
                </Link>
              </span>
              <span className="font-heading text-base leading-none font-semibold tabular-nums">{formatTaka(payment.amount)}</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-ink-3">
              <span>
                Sender <b className="font-medium text-ink tabular-nums">{payment.sender ? formatPhone(payment.sender) : "—"}</b>
              </span>
              <span>
                TrxID <b className="font-medium text-ink">{payment.transactionId ?? "—"}</b>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" className="flex-1" disabled={busyId === payment.id} onClick={() => act(payment, true)}>
                Mark as paid
              </Button>
              <Button variant="outline" size="sm" className="flex-1" disabled={busyId === payment.id} onClick={() => act(payment, false)}>
                Reject
              </Button>
            </div>
          </div>
        ))}
      </div>
    </DashCard>
  );
}
