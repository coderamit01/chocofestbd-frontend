"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { rejectPaymentAction } from "@/actions/order.actions";
import { FormDialog } from "@/components/shared/form-dialog";
import { SelectMenu } from "@/components/shared/select-menu";
import { Button } from "@/components/ui/button";
import { REJECT_REASONS } from "@/config/payments";
import { formStyles } from "@/lib/form-styles";
import type { PaymentRow } from "@/types/payment";

type RejectPaymentDialogProps = {
  payment: PaymentRow;
  onClose: () => void;
};

export function RejectPaymentDialog({ payment, onClose }: RejectPaymentDialogProps) {
  const [reason, setReason] = useState("");
  const [error, setError] = useState(false);
  const [isPending, startTransition] = useTransition();

  const reject = () => {
    if (!reason) {
      setError(true);
      return;
    }
    startTransition(async () => {
      const result = await rejectPaymentAction(payment.id, reason);
      if (!result.success) {
        toast.error("Couldn’t reject payment", { description: result.message });
        return;
      }
      toast.error("Payment rejected", { description: reason });
      onClose();
    });
  };

  return (
    <FormDialog
      open
      onOpenChange={(open) => !open && !isPending && onClose()}
      title="Reject payment?"
      description={`${payment.orderNumber} · the customer is asked to resubmit.`}
      className="sm:max-w-115"
      footer={
        <>
          <Button variant="soft" onClick={onClose} disabled={isPending}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={reject} aria-busy={isPending || undefined}>
            {isPending ? "Rejecting…" : "Reject payment"}
          </Button>
        </>
      }
    >
      <div className={formStyles.field}>
        <label className={formStyles.label} htmlFor="rr">
          Reason<span className={formStyles.required}>*</span>
        </label>
        <SelectMenu
          id="rr"
          value={reason}
          invalid={error}
          onChange={(next) => {
            setReason(next);
            setError(false);
          }}
          options={[{ value: "", label: "Select a reason" }, ...REJECT_REASONS.map((item) => ({ value: item, label: item }))]}
        />
        {error && <span className={formStyles.error}>Choose a reason — it’s saved on the order timeline.</span>}
      </div>
    </FormDialog>
  );
}
