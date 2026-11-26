import { SelectMenu } from "@/components/shared/select-menu";
import { ToggleSwitch } from "@/components/shared/toggle-switch";
import { Badge, type BadgeVariant } from "@/components/ui/badge";
import { formStyles } from "@/lib/form-styles";
import { cn } from "@/lib/utils";
import { FormCard, type SectionProps } from "./form-card";

const wholeNumber = (value: string) => value.replace(/\D/g, "").slice(0, 7);

const stockState = (values: SectionProps["values"]): { label: string; variant: BadgeVariant } => {
  if (!values.manageStock) {
    return values.stockStatus === "IN_STOCK" ? { label: "In stock", variant: "success" } : { label: "Out of stock", variant: "danger" };
  }
  const stock = Number(values.stock) || 0;
  if (stock === 0) return { label: "Out of stock", variant: "danger" };
  if (stock <= (Number(values.lowStockThreshold) || 0)) return { label: "Low stock", variant: "warning" };
  return { label: "In stock", variant: "success" };
};

export function ProductInventorySection({ values, set, errors }: SectionProps) {
  const state = stockState(values);

  return (
    <FormCard title="Inventory" aside={<Badge variant={state.variant}>{state.label}</Badge>}>
      <div className="flex flex-col gap-5">
        <ToggleSwitch
          checked={values.manageStock}
          onChange={(manageStock) => set({ manageStock })}
          label={
            <span className="order-last flex flex-col">
              <span className="font-medium text-ink">Track stock quantity</span>
              <span className="text-xs text-ink-3">Status updates automatically from the quantity</span>
            </span>
          }
        />

        {values.manageStock ? (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-5">
            <div className={formStyles.field}>
              <label htmlFor="sq" className={formStyles.label}>
                Stock quantity
              </label>
              <input
                id="sq"
                inputMode="numeric"
                value={values.stock}
                aria-invalid={!!errors.stock || undefined}
                onChange={(event) => set({ stock: wholeNumber(event.target.value) })}
                className={cn(formStyles.input, "tabular-nums")}
              />
              {errors.stock && <span className={formStyles.error}>{errors.stock}</span>}
            </div>
            <div className={formStyles.field}>
              <label htmlFor="th" className={formStyles.label}>
                Low-stock threshold
              </label>
              <input
                id="th"
                inputMode="numeric"
                value={values.lowStockThreshold}
                aria-invalid={!!errors.lowStockThreshold || undefined}
                onChange={(event) => set({ lowStockThreshold: wholeNumber(event.target.value) })}
                className={cn(formStyles.input, "tabular-nums")}
              />
              {errors.lowStockThreshold ? (
                <span className={formStyles.error}>{errors.lowStockThreshold}</span>
              ) : (
                <span className={formStyles.hint}>Dashboard alerts at or below this.</span>
              )}
            </div>
          </div>
        ) : (
          <div className={cn(formStyles.field, "max-w-70")}>
            <label htmlFor="ms" className={formStyles.label}>
              Stock status
            </label>
            <SelectMenu<typeof values.stockStatus>
              id="ms"
              value={values.stockStatus}
              onChange={(stockStatus) => set({ stockStatus })}
              options={[
                { value: "IN_STOCK", label: "In stock" },
                { value: "OUT_OF_STOCK", label: "Out of stock" },
              ]}
            />
          </div>
        )}
      </div>
    </FormCard>
  );
}
