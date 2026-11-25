"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { saveCouponAction } from "@/actions/coupon.actions";
import { FormDrawer } from "@/components/shared/form-drawer";
import { SegmentedControl } from "@/components/shared/segmented-control";
import { ToggleSwitch } from "@/components/shared/toggle-switch";
import { Button } from "@/components/ui/button";
import { COUPON_CODE_PATTERN, COUPON_SCOPE_OPTIONS, DISCOUNT_TYPE_OPTIONS } from "@/config/coupons";
import { couponPayload, couponPreview, couponToValues, emptyCouponValues, generateCouponCode } from "@/lib/coupon";
import { formStyles } from "@/lib/form-styles";
import { cn } from "@/lib/utils";
import type { CouponDetail, CouponFormValues, CouponOption, CouponOptions } from "@/types/coupon";

export type CouponDrawerState = { mode: "new" } | { mode: "edit"; coupon: CouponDetail } | null;

type CouponFormDrawerProps = {
  state: CouponDrawerState;
  options: CouponOptions;
  today: string;
  onClose: () => void;
};

type FieldErrors = Partial<Record<"code" | "value" | "expiresOn" | "picks", string>>;

const digits = (value: string) => value.replace(/\D/g, "").slice(0, 8);

const chipClass = "inline-flex h-[34px] items-center rounded-md border px-3 text-[13px] font-medium transition-colors";

export function CouponFormDrawer({ state, options, today, onClose }: CouponFormDrawerProps) {
  return state ? (
    <CouponForm
      key={state.mode === "edit" ? state.coupon.id : "new"}
      coupon={state.mode === "edit" ? state.coupon : null}
      options={options}
      today={today}
      onClose={onClose}
    />
  ) : null;
}

function CouponForm({ coupon, options, today, onClose }: { coupon: CouponDetail | null; options: CouponOptions; today: string; onClose: () => void }) {
  const [values, setValues] = useState<CouponFormValues>(() => (coupon ? couponToValues(coupon) : emptyCouponValues(today)));
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSaving, startSaving] = useTransition();

  const set = (patch: Partial<CouponFormValues>) => {
    setValues((current) => ({ ...current, ...patch }));
    setErrors((current) => {
      const next = { ...current };
      Object.keys(patch).forEach((key) => delete next[key as keyof FieldErrors]);
      if ("scope" in patch) delete next.picks;
      return next;
    });
  };

  const pool: CouponOption[] = (() => {
    if (values.scope === "ALL") return [];
    const base = values.scope === "PRODUCTS" ? options.products : options.categories;
    const linked = coupon ? (values.scope === "PRODUCTS" ? coupon.products : coupon.categories) : [];
    const known = new Set(base.map((item) => item.id));
    return [...linked.filter((item) => !known.has(item.id)).map(({ id, name }) => ({ id, name })), ...base];
  })();

  const togglePick = (id: string) =>
    set({ picks: values.picks.includes(id) ? values.picks.filter((pick) => pick !== id) : [...values.picks, id] });

  const save = () => {
    const value = Number(values.value) || 0;
    const next: FieldErrors = {
      code: !values.code
        ? "Code is required."
        : !COUPON_CODE_PATTERN.test(values.code)
          ? "Use 3–30 letters, numbers, - or _."
          : undefined,
      value:
        values.discountType === "FREE_DELIVERY"
          ? undefined
          : values.discountType === "PERCENTAGE"
            ? value < 1 || value > 100
              ? "Enter 1–100."
              : undefined
            : value <= 0
              ? "Enter an amount."
              : undefined,
      expiresOn: values.expiresOn && values.startsOn && values.expiresOn < values.startsOn ? "Must be after the start date." : undefined,
      picks: values.scope !== "ALL" && values.picks.length === 0 ? "Pick at least one." : undefined,
    };

    if (Object.values(next).some(Boolean)) {
      setErrors(next);
      return;
    }

    startSaving(async () => {
      const result = await saveCouponAction(coupon?.id ?? null, couponPayload(values));
      if (result.success) {
        toast.success("Coupon saved", { description: values.code });
        onClose();
        return;
      }
      if (result.status === 409) {
        setErrors({ code: "This code already exists." });
        return;
      }
      const fieldErrors = result.fieldErrors ?? [];
      const codeError = fieldErrors.find((item) => item.field === "code");
      if (codeError) {
        setErrors({ code: codeError.message });
        return;
      }
      toast.error("Couldn’t save coupon", { description: result.message });
    });
  };

  return (
    <FormDrawer
      open
      onOpenChange={(open) => !open && !isSaving && onClose()}
      title={coupon ? "Edit coupon" : "Create coupon"}
      description="Discounts are checked at checkout against every rule below."
      footer={
        <>
          <Button variant="soft" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={save} aria-busy={isSaving || undefined}>
            {isSaving ? "Saving…" : "Save coupon"}
          </Button>
        </>
      }
    >
      <div className={formStyles.field}>
        <label htmlFor="cc" className={formStyles.label}>
          Code<span className={formStyles.required}>*</span>
        </label>
        <div className="flex items-center gap-2">
          <input
            id="cc"
            value={values.code}
            maxLength={30}
            aria-invalid={!!errors.code || undefined}
            onChange={(event) => set({ code: event.target.value.toUpperCase().replace(/\s/g, "") })}
            className={cn(formStyles.input, "font-mono tracking-[.04em] uppercase")}
          />
          <Button variant="soft" onClick={() => set({ code: generateCouponCode() })}>
            Generate
          </Button>
        </div>
        {errors.code && <span className={formStyles.error}>{errors.code}</span>}
      </div>

      <div className={formStyles.field}>
        <span className={formStyles.label}>Discount type</span>
        <SegmentedControl
          ariaLabel="Discount type"
          options={DISCOUNT_TYPE_OPTIONS}
          value={values.discountType}
          onChange={(discountType) => set({ discountType, ...(discountType !== "PERCENTAGE" && { max: "" }) })}
        />
      </div>

      {values.discountType !== "FREE_DELIVERY" && (
        <div className="grid grid-cols-2 gap-4">
          <div className={formStyles.field}>
            <label htmlFor="cv" className={formStyles.label}>
              Value<span className={formStyles.required}>*</span>
            </label>
            <div className={formStyles.inputGroup}>
              <span className={formStyles.groupAddon}>{values.discountType === "PERCENTAGE" ? "%" : "৳"}</span>
              <input
                id="cv"
                inputMode="numeric"
                value={values.value}
                aria-invalid={!!errors.value || undefined}
                onChange={(event) => set({ value: digits(event.target.value) })}
                className={cn(formStyles.groupInput, "tabular-nums")}
              />
            </div>
            {errors.value && <span className={formStyles.error}>{errors.value}</span>}
          </div>
          {values.discountType === "PERCENTAGE" && (
            <div className={formStyles.field}>
              <label htmlFor="cm" className={formStyles.label}>
                Max discount
              </label>
              <div className={formStyles.inputGroup}>
                <span className={formStyles.groupAddon}>৳</span>
                <input
                  id="cm"
                  inputMode="numeric"
                  placeholder="No cap"
                  value={values.max}
                  onChange={(event) => set({ max: digits(event.target.value) })}
                  className={cn(formStyles.groupInput, "tabular-nums")}
                />
              </div>
            </div>
          )}
        </div>
      )}

      <div className={formStyles.field}>
        <span className={formStyles.label}>Applies to</span>
        <SegmentedControl ariaLabel="Scope" options={COUPON_SCOPE_OPTIONS} value={values.scope} onChange={(scope) => set({ scope, picks: [] })} />
        {values.scope !== "ALL" && (
          <>
            <div className="flex max-h-56 flex-wrap gap-1.5 overflow-y-auto rounded-[12px] bg-surface-2 p-3">
              {pool.length === 0 ? (
                <span className="text-caption text-ink-3">Nothing to pick yet.</span>
              ) : (
                pool.map((item) => {
                  const on = values.picks.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => togglePick(item.id)}
                      className={cn(
                        chipClass,
                        on ? "border-transparent bg-choco text-white hover:bg-choco-2" : "border-line-2 bg-surface text-ink hover:bg-surface-2"
                      )}
                    >
                      {item.name}
                    </button>
                  );
                })
              )}
            </div>
            {errors.picks && <span className={formStyles.error}>{errors.picks}</span>}
          </>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3.5">
        <div className={formStyles.field}>
          <label htmlFor="mo" className={formStyles.label}>
            Min. order
          </label>
          <div className={formStyles.inputGroup}>
            <span className={formStyles.groupAddon}>৳</span>
            <input
              id="mo"
              inputMode="numeric"
              value={values.min}
              onChange={(event) => set({ min: digits(event.target.value) })}
              className={cn(formStyles.groupInput, "tabular-nums")}
            />
          </div>
        </div>
        <div className={formStyles.field}>
          <label htmlFor="ul" className={formStyles.label}>
            Total limit
          </label>
          <input
            id="ul"
            inputMode="numeric"
            placeholder="∞"
            value={values.limit}
            onChange={(event) => set({ limit: digits(event.target.value) })}
            className={cn(formStyles.input, "tabular-nums")}
          />
        </div>
        <div className={formStyles.field}>
          <label htmlFor="pu" className={formStyles.label}>
            Per customer
          </label>
          <input
            id="pu"
            inputMode="numeric"
            value={values.perCustomer}
            onChange={(event) => set({ perCustomer: digits(event.target.value) })}
            className={cn(formStyles.input, "tabular-nums")}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className={formStyles.field}>
          <label htmlFor="sd" className={formStyles.label}>
            Starts
          </label>
          <input id="sd" type="date" value={values.startsOn} onChange={(event) => set({ startsOn: event.target.value })} className={formStyles.input} />
        </div>
        <div className={formStyles.field}>
          <label htmlFor="ed" className={formStyles.label}>
            Expires
          </label>
          <input
            id="ed"
            type="date"
            value={values.expiresOn}
            aria-invalid={!!errors.expiresOn || undefined}
            onChange={(event) => set({ expiresOn: event.target.value })}
            className={formStyles.input}
          />
          {errors.expiresOn && <span className={formStyles.error}>{errors.expiresOn}</span>}
        </div>
      </div>

      <ToggleSwitch
        checked={values.excludeSaleItems}
        onChange={(excludeSaleItems) => set({ excludeSaleItems })}
        label={
          <span className="order-last flex flex-col">
            <span className="font-medium">Exclude sale items</span>
            <span className="text-xs text-ink-3">Products with a discount price don’t count</span>
          </span>
        }
      />
      <ToggleSwitch checked={values.isActive} onChange={(isActive) => set({ isActive })} label={<span className="order-last">Active</span>} />

      <div className="flex flex-col gap-1 rounded-[12px] bg-brand-50 px-4 py-3.5">
        <span className="text-[11.5px] leading-[1.3] font-medium tracking-[.06em] text-brand-text uppercase">Preview</span>
        <span className="text-sm">{couponPreview(values)}</span>
      </div>
    </FormDrawer>
  );
}
