import { Badge } from "@/components/ui/badge";
import { formStyles } from "@/lib/form-styles";
import { cn, formatTaka } from "@/lib/utils";
import { FormCard, type SectionProps } from "./form-card";

const moneyInput = (value: string) => value.replace(/[^\d.]/g, "").replace(/(\..*)\./g, "$1").replace(/^(\d+\.\d{0,2}).*$/, "$1");

function StatCard({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 rounded-[14px] bg-surface-2 p-4">
      <span className="text-xs text-ink-3">{label}</span>
      {children}
    </div>
  );
}

export function ProductPricingSection({ values, set, errors, canSetCost }: SectionProps & { canSetCost: boolean }) {
  const price = Number(values.price) || 0;
  const sale = Number(values.discountPrice) || 0;
  const cost = Number(values.costPrice) || 0;
  const sell = sale && sale < price ? sale : price;
  const profit = sell - cost;
  const margin = sell ? (profit / sell) * 100 : 0;
  const off = sale && sale < price ? Math.round((1 - sale / price) * 100) : 0;
  const marginColor = margin < 10 ? "bg-[#e5533f]" : margin < 20 ? "bg-[#f0a500]" : "bg-[#22a55a]";
  const bigNumber = cn("font-heading text-[22px] leading-none font-semibold tabular-nums", profit < 0 ? "text-danger" : "text-ink");

  const money = (key: "price" | "discountPrice" | "costPrice", id: string, label: string, options: { required?: boolean; placeholder?: string; hint?: string } = {}) => (
    <div className={formStyles.field}>
      <label htmlFor={id} className={formStyles.label}>
        {label}
        {options.required && <span className={formStyles.required}>*</span>}
      </label>
      <div className={formStyles.inputGroup}>
        <span className={formStyles.groupAddon}>৳</span>
        <input
          id={id}
          inputMode="decimal"
          placeholder={options.placeholder}
          value={values[key]}
          aria-invalid={!!errors[key] || undefined}
          onChange={(event) => set({ [key]: moneyInput(event.target.value) })}
          className={cn(formStyles.groupInput, "tabular-nums")}
        />
      </div>
      {errors[key] ? <span className={formStyles.error}>{errors[key]}</span> : options.hint && <span className={formStyles.hint}>{options.hint}</span>}
    </div>
  );

  return (
    <FormCard title="Pricing" aside={off > 0 && <Badge variant="brand">{off}% off</Badge>}>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(190px,100%),1fr))] gap-5">
        {money("price", "pr", "Price", { required: true })}
        {money("discountPrice", "dp", "Discount price", { placeholder: "Optional" })}
        {canSetCost && money("costPrice", "cp", "Cost price", { hint: "Never shown to customers." })}
      </div>
      <div className="mt-5 grid grid-cols-[repeat(auto-fit,minmax(min(160px,100%),1fr))] gap-3">
        <StatCard label="Selling at">
          <span className="font-heading text-[22px] leading-none font-semibold tabular-nums">{formatTaka(sell)}</span>
        </StatCard>
        {canSetCost && (
          <>
            <StatCard label="Profit per unit">
              <span className={bigNumber}>
                {profit < 0 ? "−" : ""}
                {formatTaka(Math.abs(profit))}
              </span>
            </StatCard>
            <StatCard label="Margin">
              <span className={bigNumber}>{margin.toFixed(1)}%</span>
              <div className="mt-0.5 h-1.5 overflow-hidden rounded-full bg-surface">
                <div className={cn("h-full rounded-full", marginColor)} style={{ width: `${Math.max(0, Math.min(100, margin * 2))}%` }} />
              </div>
            </StatCard>
          </>
        )}
      </div>
    </FormCard>
  );
}
