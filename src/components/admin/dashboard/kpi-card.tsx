import Link from "next/link";
import { Icon, type IconName } from "@/components/shared/icon";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type TileTone = "solid" | "brand" | "mint" | "sky" | "lav" | "gray" | "amber" | "rose";

export const TILE_TONES: Record<TileTone, string> = {
  solid: "bg-brand text-white",
  brand: "bg-brand-50 text-brand",
  mint: "bg-success-soft text-success",
  sky: "bg-info-soft text-info",
  lav: "bg-lavender-soft text-lavender",
  gray: "bg-surface-3 text-ink-2",
  amber: "bg-warning-soft text-warning",
  rose: "bg-danger-soft text-danger",
};

export type Kpi = {
  label: string;
  value: string;
  icon: IconName;
  tone: TileTone;
  change?: number | null;
  note?: string;
  invert?: boolean;
  link?: { href: string; text: string };
};

export function Tile({ icon, tone, className }: { icon: IconName; tone: TileTone; className?: string }) {
  return (
    <span className={cn("flex size-14 flex-none items-center justify-center rounded-[36%]", TILE_TONES[tone], className)}>
      <Icon name={icon} size={24} strokeWidth={1.8} />
    </span>
  );
}

function Delta({ change, invert }: { change: number; invert?: boolean }) {
  const good = invert ? change < 0 : change > 0;
  const bad = invert ? change > 0 : change < 0;

  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1 rounded-[7px] px-2 text-xs leading-none font-medium",
        good && "bg-success-soft text-success",
        bad && "bg-danger-soft text-danger",
        !good && !bad && "bg-surface-3 text-ink-2"
      )}
    >
      <Icon name={change >= 0 ? "trendUp" : "trendDown"} size={13} strokeWidth={2.2} />
      {change > 0 ? "+" : ""}
      {change}%
    </span>
  );
}

export function KpiCard({ kpi }: { kpi: Kpi }) {
  const hasDelta = kpi.change !== undefined && kpi.change !== null;

  return (
    <article className="flex flex-col gap-4 rounded-xl bg-card px-6 py-5.5 max-[900px]:p-4.5">
      <div className="flex items-center gap-3">
        <Tile icon={kpi.icon} tone={kpi.tone} />
        <span className="text-[14.5px] text-ink-2">{kpi.label}</span>
      </div>
      <div className="flex items-end justify-between gap-2">
        <span className="font-heading text-[30px] leading-[1.1] font-semibold tracking-[-0.02em] tabular-nums">{kpi.value}</span>
        {hasDelta && (
          <span className="flex flex-col items-end gap-1">
            <Delta change={kpi.change!} invert={kpi.invert} />
            <span className="text-xs text-ink-3">{kpi.note ?? "from last week"}</span>
          </span>
        )}
        {kpi.link && (
          <Link href={kpi.link.href} className={buttonVariants({ variant: "tint", size: "sm" })}>
            {kpi.link.text}
            <Icon name="arrowRight" size={15} strokeWidth={1.8} className="size-[15px]" />
          </Link>
        )}
      </div>
    </article>
  );
}

export function KpiGrid({ kpis, min = 220 }: { kpis: Kpi[]; min?: 220 | 240 }) {
  return (
    <section
      aria-label="Key figures"
      className={cn(
        "grid gap-6 max-[900px]:gap-4",
        min === 240 ? "grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))]" : "grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))]"
      )}
    >
      {kpis.map((kpi) => (
        <KpiCard key={kpi.label} kpi={kpi} />
      ))}
    </section>
  );
}

export function KpiGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <section aria-busy="true" className="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-6 max-[900px]:gap-4">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="flex flex-col gap-4 rounded-xl bg-card px-6 py-5.5">
          <div className="flex items-center gap-3">
            <span className="size-14 rounded-[36%] skel" />
            <span className="h-4 w-28 rounded-[6px] skel" />
          </div>
          <span className="h-8 w-24 rounded-[6px] skel" />
        </div>
      ))}
    </section>
  );
}
