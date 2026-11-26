"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { bulkOrderStatusAction, changeOrderStatusAction } from "@/actions/order.actions";
import { FormDialog } from "@/components/shared/form-dialog";
import { Icon } from "@/components/shared/icon";
import { StatusBadge } from "@/components/shared/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ORDER_FLOW, ORDER_STATUSES } from "@/config/orders";
import { STATUS_BADGES } from "@/config/status-badges";
import { formStyles } from "@/lib/form-styles";
import { cn, formatTaka } from "@/lib/utils";
import type { OrderListItem } from "@/types/order";
import type { OrderStatus } from "@/types/status";

type OrderStatusDialogProps = {
  targets: OrderListItem[];
  onClose: () => void;
  onDone: () => void;
};

const selectClass = cn(formStyles.input, "select-chevron cursor-pointer pr-[38px]");

export function OrderStatusDialog({ targets, onClose, onDone }: OrderStatusDialogProps) {
  const [next, setNext] = useState<OrderStatus | "">("");
  const [note, setNote] = useState("");
  const [error, setError] = useState(false);
  const [isSaving, startSaving] = useTransition();

  const single = targets.length === 1 ? targets[0] : null;
  const options = single ? ORDER_FLOW[single.status] : ORDER_STATUSES;
  const label = (status: OrderStatus) => STATUS_BADGES.order[status].label;

  const save = () => {
    if (!next) {
      setError(true);
      return;
    }

    const change = { status: next, ...(note.trim() && { note: note.trim() }) };

    startSaving(async () => {
      if (single) {
        const result = await changeOrderStatusAction(single.id, change);
        if (!result.success) {
          toast.error("Couldn’t update status", { description: result.message });
          return;
        }
        toast.success("Status updated", { description: `${single.orderNumber} → ${label(next)}` });
      } else {
        const result = await bulkOrderStatusAction(
          targets.map((order) => order.id),
          change
        );
        if (!result.success || !result.data) {
          toast.error("Couldn’t update status", { description: result.message });
          return;
        }
        const { updated, failed } = result.data;
        if (updated) toast.success("Status updated", { description: `${updated} orders → ${label(next)}` });
        if (failed.length) {
          toast.error(`${failed.length} not updated`, {
            description: failed
              .slice(0, 3)
              .map((item) => `${item.orderNumber}: ${item.message}`)
              .join(" · "),
          });
        }
      }
      onDone();
    });
  };

  return (
    <FormDialog
      open
      onOpenChange={(open) => !open && !isSaving && onClose()}
      title="Change order status"
      description={single ? `${single.orderNumber} · ${single.recipientName} · ${formatTaka(single.total)}` : `${targets.length} orders selected`}
      footer={
        <>
          <Button variant="soft" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={save} aria-busy={isSaving || undefined}>
            {isSaving ? "Updating…" : "Update status"}
          </Button>
        </>
      }
    >
      <div className="flex flex-wrap items-center gap-2.5 rounded-[12px] bg-surface-2 p-3.5">
        <span className="text-[12.5px] text-ink-3">Current</span>
        {single ? <StatusBadge kind="order" status={single.status} /> : <Badge variant="neutral">Mixed</Badge>}
        <Icon name="arrowRight" size={16} strokeWidth={1.8} />
        {next && <StatusBadge kind="order" status={next} />}
      </div>
      <div className={formStyles.field}>
        <label className={formStyles.label} htmlFor="ns">
          New status<span className={formStyles.required}>*</span>
        </label>
        <select
          id="ns"
          value={next}
          aria-invalid={error || undefined}
          onChange={(event) => {
            setNext(event.target.value as OrderStatus | "");
            setError(false);
          }}
          className={selectClass}
        >
          <option value="">Select status</option>
          {options.length ? (
            options.map((status) => (
              <option key={status} value={status}>
                {label(status)}
              </option>
            ))
          ) : (
            <option value="" disabled>
              No further steps
            </option>
          )}
        </select>
        {error && <span className={formStyles.error}>Choose the status this order moves to.</span>}
        <span className={formStyles.hint}>Only valid next steps are listed.</span>
      </div>
      <div className={formStyles.field}>
        <label className={formStyles.label} htmlFor="nn">
          Note
        </label>
        <textarea
          id="nn"
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="e.g. Handed to Pathao, consignment PTH-88213"
          maxLength={300}
          className={formStyles.textarea}
        />
      </div>
    </FormDialog>
  );
}
