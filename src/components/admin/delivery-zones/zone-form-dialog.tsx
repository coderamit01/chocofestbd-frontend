"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { saveDeliveryZoneAction } from "@/actions/delivery-zone.actions";
import { FormDialog } from "@/components/shared/form-dialog";
import { ToggleSwitch } from "@/components/shared/toggle-switch";
import { Button } from "@/components/ui/button";
import { DEFAULT_ESTIMATED_DAYS } from "@/config/delivery-zones";
import { formStyles } from "@/lib/form-styles";
import { cn, formatTaka } from "@/lib/utils";
import type { DeliveryZone, DeliveryZoneFormValues } from "@/types/delivery-zone";

export type ZoneDialogState = { mode: "new"; nextSortOrder: number } | { mode: "edit"; zone: DeliveryZone } | null;

const toValues = (state: NonNullable<ZoneDialogState>): DeliveryZoneFormValues =>
  state.mode === "edit"
    ? {
        name: state.zone.name,
        areas: state.zone.areas ?? "",
        charge: String(Math.round(Number(state.zone.charge))),
        estimatedDays: state.zone.estimatedDays ?? "",
        sortOrder: String(state.zone.sortOrder),
        isActive: state.zone.isActive,
      }
    : { name: "", areas: "", charge: "", estimatedDays: DEFAULT_ESTIMATED_DAYS, sortOrder: String(state.nextSortOrder), isActive: true };

export function ZoneFormDialog({ state, onClose }: { state: ZoneDialogState; onClose: () => void }) {
  return state ? <ZoneForm key={state.mode === "edit" ? state.zone.id : "new"} state={state} onClose={onClose} /> : null;
}

function ZoneForm({ state, onClose }: { state: NonNullable<ZoneDialogState>; onClose: () => void }) {
  const zoneId = state.mode === "edit" ? state.zone.id : null;
  const [values, setValues] = useState<DeliveryZoneFormValues>(() => toValues(state));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, startSaving] = useTransition();

  const set = (patch: Partial<DeliveryZoneFormValues>) => {
    setValues((current) => ({ ...current, ...patch }));
    setErrors((current) => {
      const next = { ...current };
      Object.keys(patch).forEach((key) => delete next[key]);
      return next;
    });
  };

  const save = () => {
    const name = values.name.trim();
    const problems: Record<string, string> = {};
    if (!name) problems.name = "Name is required.";
    if (values.charge === "") problems.charge = "Enter a charge (0 for free delivery).";
    if (Object.keys(problems).length) {
      setErrors(problems);
      return;
    }

    startSaving(async () => {
      const result = await saveDeliveryZoneAction(zoneId, {
        name,
        areas: values.areas.trim(),
        charge: values.charge,
        estimatedDays: values.estimatedDays.trim(),
        sortOrder: Math.max(0, Number.parseInt(values.sortOrder, 10) || 0),
        isActive: values.isActive,
      });

      if (result.success) {
        toast.success("Zone saved", { description: `${name} · ${formatTaka(values.charge)}` });
        onClose();
        return;
      }

      const fieldErrors = result.fieldErrors ?? [];
      if (fieldErrors.length) {
        setErrors(Object.fromEntries(fieldErrors.map((item) => [item.field, item.message])));
      } else if (result.message.toLowerCase().includes("name")) {
        setErrors({ name: result.message });
      } else {
        toast.error("Couldn’t save zone", { description: result.message });
      }
    });
  };

  const fieldError = errors.estimatedDays ?? errors.sortOrder ?? errors.areas;

  return (
    <FormDialog
      open
      onOpenChange={(open) => !open && !isSaving && onClose()}
      title={zoneId ? "Edit delivery zone" : "New delivery zone"}
      footer={
        <>
          <Button variant="soft" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={save} aria-busy={isSaving || undefined}>
            {isSaving ? "Saving…" : "Save zone"}
          </Button>
        </>
      }
    >
      <div className={formStyles.field}>
        <label htmlFor="zn" className={formStyles.label}>
          Zone name<span className={formStyles.required}>*</span>
        </label>
        <input
          id="zn"
          placeholder="e.g. Chattogram city"
          value={values.name}
          aria-invalid={!!errors.name || undefined}
          onChange={(event) => set({ name: event.target.value })}
          className={formStyles.input}
        />
        {errors.name && <span className={formStyles.error}>{errors.name}</span>}
      </div>

      <div className={formStyles.field}>
        <label htmlFor="za" className={formStyles.label}>
          Areas covered
        </label>
        <input
          id="za"
          placeholder="Districts or thanas, comma separated"
          value={values.areas}
          onChange={(event) => set({ areas: event.target.value })}
          className={formStyles.input}
        />
      </div>

      <div className="grid grid-cols-3 gap-3.5">
        <div className={formStyles.field}>
          <label htmlFor="zc" className={formStyles.label}>
            Charge<span className={formStyles.required}>*</span>
          </label>
          <div className={formStyles.inputGroup}>
            <span className={formStyles.groupAddon}>৳</span>
            <input
              id="zc"
              inputMode="numeric"
              value={values.charge}
              aria-invalid={!!errors.charge || undefined}
              onChange={(event) => set({ charge: event.target.value.replace(/\D/g, "") })}
              className={cn(formStyles.groupInput, "tabular-nums")}
            />
          </div>
        </div>
        <div className={formStyles.field}>
          <label htmlFor="zd" className={formStyles.label}>
            Est. days
          </label>
          <input
            id="zd"
            placeholder="1–2"
            value={values.estimatedDays}
            aria-invalid={!!errors.estimatedDays || undefined}
            onChange={(event) => set({ estimatedDays: event.target.value })}
            className={formStyles.input}
          />
        </div>
        <div className={formStyles.field}>
          <label htmlFor="zs" className={formStyles.label}>
            Sort order
          </label>
          <input
            id="zs"
            type="number"
            min={0}
            value={values.sortOrder}
            aria-invalid={!!errors.sortOrder || undefined}
            onChange={(event) => set({ sortOrder: event.target.value })}
            className={cn(formStyles.input, "tabular-nums")}
          />
        </div>
      </div>

      {errors.charge && <span className={formStyles.error}>{errors.charge}</span>}
      {fieldError && <span className={formStyles.error}>{fieldError}</span>}

      <ToggleSwitch checked={values.isActive} onChange={(isActive) => set({ isActive })} label={<span className="order-last">Active</span>} />
    </FormDialog>
  );
}
