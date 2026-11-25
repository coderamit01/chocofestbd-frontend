"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { adjustCustomerPointsAction } from "@/actions/customer.actions";
import { FormDialog } from "@/components/shared/form-dialog";
import { SegmentedControl } from "@/components/shared/segmented-control";
import { Button } from "@/components/ui/button";
import { POINTS_REASON_MAX } from "@/config/customers";
import { formStyles } from "@/lib/form-styles";

type PointsDialogProps = {
  open: boolean;
  customerId: string;
  points: number;
  onClose: () => void;
};

type Direction = "add" | "remove";

const DIRECTIONS: { value: Direction; label: string }[] = [
  { value: "add", label: "Add points" },
  { value: "remove", label: "Remove points" },
];

export function PointsDialog({ open, customerId, points, onClose }: PointsDialogProps) {
  return open ? <PointsForm customerId={customerId} points={points} onClose={onClose} /> : null;
}

function PointsForm({ customerId, points, onClose }: Omit<PointsDialogProps, "open">) {
  const [direction, setDirection] = useState<Direction>("add");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [errors, setErrors] = useState<{ amount?: string; reason?: string }>({});
  const [isSaving, startSaving] = useTransition();

  const value = Number(amount) || 0;
  const adding = direction === "add";
  const nextBalance = Math.max(0, points + (adding ? value : -value));

  const save = () => {
    const nextErrors = {
      amount: !value ? "Enter a number of points." : !adding && value > points ? "Can’t remove more than the balance." : undefined,
      reason: reason.trim() ? undefined : "Add a reason.",
    };
    if (nextErrors.amount || nextErrors.reason) {
      setErrors(nextErrors);
      return;
    }

    startSaving(async () => {
      const result = await adjustCustomerPointsAction(customerId, adding ? value : -value, reason.trim());
      if (!result.success) {
        toast.error("Couldn’t update points", { description: result.message });
        return;
      }
      toast.success("Points updated", { description: `${adding ? "+" : "−"}${value.toLocaleString("en-IN")} pts · ${reason.trim()}` });
      onClose();
    });
  };

  return (
    <FormDialog
      open
      onOpenChange={(next) => !next && !isSaving && onClose()}
      title="Adjust points"
      description={`Current balance: ${points.toLocaleString("en-IN")} pts.`}
      className="sm:max-w-115"
      footer={
        <>
          <Button variant="soft" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={save} aria-busy={isSaving || undefined}>
            {isSaving ? "Saving…" : "Save"}
          </Button>
        </>
      }
    >
      <SegmentedControl
        ariaLabel="Direction"
        options={DIRECTIONS}
        value={direction}
        onChange={(next) => {
          setDirection(next);
          setErrors((current) => ({ ...current, amount: undefined }));
        }}
      />
      <div className={formStyles.field}>
        <label htmlFor="pa" className={formStyles.label}>
          Points<span className={formStyles.required}>*</span>
        </label>
        <input
          id="pa"
          inputMode="numeric"
          value={amount}
          aria-invalid={!!errors.amount || undefined}
          onChange={(event) => {
            setAmount(event.target.value.replace(/\D/g, "").slice(0, 7));
            setErrors((current) => ({ ...current, amount: undefined }));
          }}
          className={formStyles.input}
        />
        {errors.amount && <span className={formStyles.error}>{errors.amount}</span>}
      </div>
      <div className={formStyles.field}>
        <label htmlFor="pr" className={formStyles.label}>
          Reason<span className={formStyles.required}>*</span>
        </label>
        <input
          id="pr"
          value={reason}
          maxLength={POINTS_REASON_MAX}
          placeholder="e.g. Compensation for late delivery"
          aria-invalid={!!errors.reason || undefined}
          onChange={(event) => {
            setReason(event.target.value);
            setErrors((current) => ({ ...current, reason: undefined }));
          }}
          className={formStyles.input}
        />
        {errors.reason && <span className={formStyles.error}>{errors.reason}</span>}
      </div>
      <p className="text-caption text-ink-3">
        New balance: <b className="font-semibold text-ink tabular-nums">{nextBalance.toLocaleString("en-IN")} pts</b>
      </p>
    </FormDialog>
  );
}
