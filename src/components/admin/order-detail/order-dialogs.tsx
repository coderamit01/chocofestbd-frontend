"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { cancelOrderAction, changeOrderStatusAction, markPaymentPaidAction, recordRefundAction, rejectPaymentAction } from "@/actions/order.actions";
import { FormDialog } from "@/components/shared/form-dialog";
import { SegmentedControl } from "@/components/shared/segmented-control";
import { Button } from "@/components/ui/button";
import { CANCEL_REASONS } from "@/config/orders";
import { STATUS_BADGES } from "@/config/status-badges";
import { formStyles } from "@/lib/form-styles";
import { methodLabel, money } from "@/lib/order-display";
import { cn, formatPhone, formatTaka } from "@/lib/utils";
import type { OrderDetail } from "@/types/order";
import type { OrderStatus } from "@/types/status";

export type OrderDialog = "change" | "cancel" | "verify" | "refund";

type DialogProps = {
  order: OrderDetail;
  onClose: () => void;
};

const selectClass = cn(formStyles.input, "select-chevron cursor-pointer pr-[38px]");
const statusLabel = (status: OrderStatus) => STATUS_BADGES.order[status].label;

function useSubmit(onClose: () => void) {
  const [isPending, startTransition] = useTransition();
  const run = (request: () => Promise<{ success: boolean; message: string }>, onSuccess: () => void, errorTitle: string) =>
    startTransition(async () => {
      const result = await request();
      if (!result.success) {
        toast.error(errorTitle, { description: result.message });
        return;
      }
      onSuccess();
      onClose();
    });
  return { isPending, run };
}

export function ChangeStatusDialog({ order, onClose }: DialogProps) {
  const options = order.nextStatuses.filter((status) => status !== "CANCELLED");
  const [next, setNext] = useState<OrderStatus | null>(options[0] ?? null);
  const [note, setNote] = useState("");
  const [error, setError] = useState(false);
  const { isPending, run } = useSubmit(onClose);

  const save = () => {
    if (!next) {
      setError(true);
      return;
    }
    run(
      () => changeOrderStatusAction(order.id, { status: next, ...(note.trim() && { note: note.trim() }) }),
      () => toast.success("Status updated", { description: `${order.orderNumber} → ${statusLabel(next)}` }),
      "Couldn’t update status"
    );
  };

  return (
    <FormDialog
      open
      onOpenChange={(open) => !open && !isPending && onClose()}
      title="Change order status"
      description={`${order.orderNumber} · currently ${statusLabel(order.status)}`}
      footer={
        <>
          <Button variant="soft" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button onClick={save} aria-busy={isPending || undefined}>
            {isPending ? "Updating…" : "Update status"}
          </Button>
        </>
      }
    >
      <div className={formStyles.field}>
        <span className={formStyles.label}>
          Move to<span className={formStyles.required}>*</span>
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {options.map((status) => (
            <Button
              key={status}
              size="sm"
              variant={next === status ? "dark" : "soft"}
              aria-pressed={next === status}
              onClick={() => {
                setNext(status);
                setError(false);
              }}
            >
              {statusLabel(status)}
            </Button>
          ))}
        </div>
        {error && <span className={formStyles.error}>Choose the next status.</span>}
      </div>
      <div className={formStyles.field}>
        <label className={formStyles.label} htmlFor="cn2">
          Note
        </label>
        <textarea
          id="cn2"
          value={note}
          maxLength={300}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Saved to the timeline"
          className={formStyles.textarea}
        />
      </div>
    </FormDialog>
  );
}

export function CancelOrderDialog({ order, onClose }: DialogProps) {
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [error, setError] = useState(false);
  const { isPending, run } = useSubmit(onClose);

  const confirm = () => {
    if (!reason) {
      setError(true);
      return;
    }
    run(
      () => cancelOrderAction(order.id, reason, details.trim() || undefined),
      () => toast.error("Order cancelled", { description: "Stock released" }),
      "Couldn’t cancel order"
    );
  };

  return (
    <FormDialog
      open
      onOpenChange={(open) => !open && !isPending && onClose()}
      title={`Cancel order ${order.orderNumber}?`}
      description="Reserved stock is released and the order stops here. This can’t be undone."
      className="sm:max-w-120"
      footer={
        <>
          <Button variant="soft" onClick={onClose} disabled={isPending}>
            Keep order
          </Button>
          <Button variant="destructive" onClick={confirm} aria-busy={isPending || undefined}>
            {isPending ? "Cancelling…" : "Cancel order"}
          </Button>
        </>
      }
    >
      <div className={formStyles.field}>
        <label className={formStyles.label} htmlFor="cr">
          Reason<span className={formStyles.required}>*</span>
        </label>
        <select
          id="cr"
          value={reason}
          aria-invalid={error || undefined}
          onChange={(event) => {
            setReason(event.target.value);
            setError(false);
          }}
          className={selectClass}
        >
          <option value="">Select a reason</option>
          {CANCEL_REASONS.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        {error && <span className={formStyles.error}>A reason is required.</span>}
      </div>
      <div className={formStyles.field}>
        <label className={formStyles.label} htmlFor="cd">
          Details
        </label>
        <textarea id="cd" value={details} maxLength={300} onChange={(event) => setDetails(event.target.value)} className={cn(formStyles.textarea, "min-h-18")} />
      </div>
    </FormDialog>
  );
}

function InfoTile({ label, value, highlight, valueClassName }: { label: string; value: string; highlight?: boolean; valueClassName: string }) {
  return (
    <div className={cn("flex min-w-0 flex-col gap-1 rounded-xl p-3.5", highlight ? "bg-brand-50" : "bg-surface-2")}>
      <span className="text-xs text-ink-3">{label}</span>
      <b className={cn("break-all", valueClassName)}>{value}</b>
    </div>
  );
}

export function VerifyPaymentDialog({ order, onClose }: DialogProps) {
  const [reason, setReason] = useState("");
  const { isPending, run } = useSubmit(onClose);
  const method = methodLabel(order.paymentMethod);
  const rejected = order.paymentVerification.status === "REJECTED";

  const markPaid = () =>
    run(
      () => markPaymentPaidAction(order.id),
      () => toast.success("Payment verified", { description: `${formatTaka(order.total)} ${method} marked as paid` }),
      "Couldn’t verify payment"
    );

  const reject = () =>
    run(
      () => rejectPaymentAction(order.id, reason.trim() || undefined),
      () => toast.error("Payment rejected", { description: "Customer asked to resubmit" }),
      "Couldn’t reject payment"
    );

  return (
    <FormDialog
      open
      onOpenChange={(open) => !open && !isPending && onClose()}
      title={`Verify ${method} payment`}
      description={`Match these with your ${method} statement.`}
      className="sm:max-w-120"
      footer={
        <>
          {!rejected && (
            <Button variant="destructive-soft" onClick={reject} disabled={isPending}>
              Reject
            </Button>
          )}
          <Button onClick={markPaid} aria-busy={isPending || undefined}>
            Mark as paid
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-3 gap-2.5 max-[480px]:grid-cols-1">
        <InfoTile label="Sender" value={order.paymentSender ? formatPhone(order.paymentSender) : "—"} valueClassName="text-[13.5px] font-semibold tabular-nums" />
        <InfoTile label="TrxID" value={order.paymentTransactionId ?? "—"} valueClassName="font-mono text-[13.5px] leading-[1.3] font-semibold" />
        <InfoTile label="Amount" value={formatTaka(order.total)} highlight valueClassName="font-heading text-lg leading-[1.2] font-semibold tabular-nums" />
      </div>
      {!rejected && (
        <div className={formStyles.field}>
          <label className={formStyles.label} htmlFor="rj">
            Rejection reason <span className="font-normal text-ink-3">(if rejecting)</span>
          </label>
          <input id="rj" value={reason} maxLength={300} onChange={(event) => setReason(event.target.value)} placeholder="e.g. TrxID not found" className={formStyles.input} />
        </div>
      )}
    </FormDialog>
  );
}

export function RefundDialog({ order, onClose }: DialogProps) {
  const max = Math.max(0, money(order.total) - money(order.refundedAmount));
  const [full, setFull] = useState(true);
  const [amount, setAmount] = useState(String(Math.round(max * 100) / 100));
  const [reference, setReference] = useState("");
  const [error, setError] = useState(false);
  const { isPending, run } = useSubmit(onClose);
  const cod = order.paymentMethod === "COD";
  const method = methodLabel(order.paymentMethod);

  const save = () => {
    const value = Number(amount);
    if (!value || value < 1 || value > max) {
      setError(true);
      return;
    }
    run(
      () => recordRefundAction(order.id, value, reference.trim() || undefined),
      () => toast.success("Refund recorded", { description: `${formatTaka(value)} to ${formatPhone(order.paymentSender ?? order.recipientPhone)}` }),
      "Couldn’t record refund"
    );
  };

  return (
    <FormDialog
      open
      onOpenChange={(open) => !open && !isPending && onClose()}
      title="Issue refund"
      description={
        cod
          ? `Paid ${formatTaka(order.total)} in cash. Send the refund to the customer, then record it here.`
          : `Paid ${formatTaka(order.total)} via ${method}. Send it from the ${method} app, then record it here.`
      }
      className="sm:max-w-120"
      footer={
        <>
          <Button variant="soft" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button onClick={save} aria-busy={isPending || undefined}>
            {isPending ? "Recording…" : "Record refund"}
          </Button>
        </>
      }
    >
      <SegmentedControl
        ariaLabel="Refund type"
        value={full ? "full" : "partial"}
        options={[
          { value: "full", label: "Full refund" },
          { value: "partial", label: "Partial" },
        ]}
        onChange={(value) => {
          setFull(value === "full");
          setAmount(value === "full" ? String(Math.round(max * 100) / 100) : "");
          setError(false);
        }}
      />
      <div className={formStyles.field}>
        <label className={formStyles.label} htmlFor="ra">
          Amount<span className={formStyles.required}>*</span>
        </label>
        <div className={formStyles.inputGroup}>
          <span className={formStyles.groupAddon}>৳</span>
          <input
            id="ra"
            inputMode="numeric"
            value={amount}
            disabled={full}
            aria-invalid={error || undefined}
            onChange={(event) => {
              setAmount(event.target.value.replace(/[^\d.]/g, ""));
              setError(false);
            }}
            className={cn(formStyles.groupInput, "tabular-nums disabled:cursor-not-allowed disabled:text-ink-4")}
          />
        </div>
        {error && <span className={formStyles.error}>Between ৳1 and {formatTaka(max)}.</span>}
      </div>
      <div className={formStyles.field}>
        <label className={formStyles.label} htmlFor="rr">
          Refund reference
        </label>
        <input
          id="rr"
          value={reference}
          maxLength={100}
          onChange={(event) => setReference(event.target.value)}
          placeholder={cod ? "Receipt or note" : `${method} TrxID of the refund`}
          className={formStyles.input}
        />
      </div>
    </FormDialog>
  );
}
