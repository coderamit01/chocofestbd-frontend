"use client";

import Link from "next/link";
import { PaymentMethodChip } from "@/components/admin/orders/payment-method-chip";
import { Icon } from "@/components/shared/icon";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { orderPath } from "@/config/orders";
import { copyWithToast } from "@/lib/clipboard";
import { dhakaClock, relativeDhakaTime } from "@/lib/dhaka-time";
import { tableStyles } from "@/lib/table-styles";
import { cn, formatPhone, formatTaka } from "@/lib/utils";
import type { PaymentRow } from "@/types/payment";

type PaymentsTableProps = {
  payments: PaymentRow[];
  now: number;
  busyId: string | null;
  onVerify: (payment: PaymentRow) => void;
  onReject: (payment: PaymentRow) => void;
};

const closedNote = (payment: PaymentRow) => {
  if (payment.verification === "REJECTED") return payment.rejectReason ?? "Rejected";
  const who = payment.verifiedBy?.split(" ")[0];
  if (!payment.verifiedAt) return who ? `by ${who}` : "Verified";
  return `${who ? `by ${who} · ` : ""}${dhakaClock(payment.verifiedAt)}`;
};

export function PaymentsTable({ payments, now, busyId, onVerify, onReject }: PaymentsTableProps) {
  const head = tableStyles.head;

  return (
    <div className={tableStyles.wrapper}>
      <table className={tableStyles.table}>
        <thead>
          <tr>
            <th className={head}>Order</th>
            <th className={head}>Method</th>
            <th className={head}>Sender</th>
            <th className={head}>Transaction ID</th>
            <th className={cn(head, "text-right")}>Amount</th>
            <th className={head}>Submitted</th>
            <th className={head}>Status</th>
            <th className={cn(head, "text-right")}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className={tableStyles.body}>
          {payments.map((payment) => (
            <tr key={payment.id} className={tableStyles.row}>
              <td className={tableStyles.cell} data-label="Order">
                <Link href={orderPath(payment.id)} className="font-semibold text-ink">
                  {payment.orderNumber}
                </Link>
              </td>
              <td className={tableStyles.cell} data-label="Method">
                <PaymentMethodChip method={payment.paymentMethod} size="md" />
              </td>
              <td className={cn(tableStyles.cell, "tabular-nums")} data-label="Sender">
                {payment.sender ? formatPhone(payment.sender) : "—"}
              </td>
              <td className={tableStyles.cell} data-label="Transaction ID">
                {payment.transactionId ? (
                  <span className="inline-flex items-center gap-1.5">
                    <span className="font-mono text-[13.5px]">{payment.transactionId}</span>
                    <Button variant="ghost" size="icon-xs" className="rounded-md" aria-label={`Copy ${payment.transactionId}`} onClick={() => copyWithToast(payment.transactionId!, "Copied")}>
                      <Icon name="copy" size={14} strokeWidth={1.8} />
                    </Button>
                  </span>
                ) : (
                  "—"
                )}
              </td>
              <td className={cn(tableStyles.cell, "text-right font-semibold tabular-nums")} data-label="Amount">
                {formatTaka(payment.amount)}
              </td>
              <td className={cn(tableStyles.cell, "text-[12.5px] whitespace-nowrap text-ink-3")} data-label="Submitted">
                {relativeDhakaTime(payment.submittedAt, now)}
              </td>
              <td className={tableStyles.cell} data-label="Status">
                <StatusBadge kind="verification" status={payment.verification} />
              </td>
              <td className={tableStyles.bareCell}>
                {payment.verification === "PENDING" ? (
                  <div className="flex justify-end gap-1.5">
                    <Button size="sm" onClick={() => onVerify(payment)} disabled={busyId === payment.id}>
                      Verify
                    </Button>
                    <Button variant="soft" size="sm" onClick={() => onReject(payment)} disabled={busyId === payment.id}>
                      Reject
                    </Button>
                  </div>
                ) : (
                  <span className="block text-right text-xs text-ink-3">{closedNote(payment)}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
