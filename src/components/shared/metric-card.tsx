import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";
import type { Metric, MetricTone } from "@/types/metric";

const TONES: Record<MetricTone, string> = {
  solid: "bg-brand text-white",
  brand: "bg-brand-50 text-brand",
  mint: "bg-success-soft text-success",
  lav: "bg-lavender-soft text-lavender",
  sky: "bg-info-soft text-info",
  amber: "bg-warning-soft text-warning",
  rose: "bg-danger-soft text-danger",
  gray: "bg-surface-3 text-ink-2",
};

export function MetricCard({ label, value, icon, tone, change, note = "from last week" }: Metric) {
  const hasChange = change !== undefined && change !== null;
  const direction = !hasChange || change === 0 ? "flat" : change > 0 ? "up" : "down";

  return (
    <article className="flex flex-col gap-4 rounded-xl bg-card px-6 py-5.5 max-[900px]:p-4.5">
      <div className="flex items-center gap-3">
        <span className={cn("flex size-14 flex-none items-center justify-center rounded-[36%]", TONES[tone])}>
          <Icon name={icon} size={24} strokeWidth={1.8} />
        </span>
        <span className="text-[14.5px] text-ink-2">{label}</span>
      </div>
      <div className="flex items-end justify-between gap-2">
        <span className="font-heading text-stat tabular-nums">{value}</span>
        {hasChange && (
          <span className="flex flex-col items-end gap-1">
            <span
              className={cn(
                "inline-flex h-6 items-center gap-1 rounded-[7px] px-2 text-xs leading-none font-medium",
                direction === "up" && "bg-success-soft text-success",
                direction === "down" && "bg-danger-soft text-danger",
                direction === "flat" && "bg-surface-3 text-ink-2"
              )}
            >
              <Icon name={change >= 0 ? "trendUp" : "trendDown"} size={13} strokeWidth={2.2} />
              {change > 0 ? "+" : ""}
              {change}%
            </span>
            <span className="text-xs text-ink-3">{note}</span>
          </span>
        )}
      </div>
    </article>
  );
}

export function MetricGrid({ metrics, min = 220, label = "Key figures" }: { metrics: Metric[]; min?: number; label?: string }) {
  return (
    <section
      aria-label={label}
      className="grid gap-6 max-[900px]:gap-4"
      style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(${min}px, 100%), 1fr))` }}
    >
      {metrics.map((metric) => (
        <MetricCard key={metric.label} {...metric} />
      ))}
    </section>
  );
}

export function MetricGridSkeleton({ count = 4, min = 220 }: { count?: number; min?: number }) {
  return (
    <section className="grid gap-6 max-[900px]:gap-4" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(${min}px, 100%), 1fr))` }} aria-busy="true">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="flex flex-col gap-4 rounded-xl bg-card px-6 py-5.5">
          <div className="flex items-center gap-3">
            <span className="skel size-14 rounded-[36%]" />
            <span className="skel h-3.5 w-28 rounded-[6px]" />
          </div>
          <span className="skel h-8 w-24 rounded-[6px]" />
        </div>
      ))}
    </section>
  );
}
