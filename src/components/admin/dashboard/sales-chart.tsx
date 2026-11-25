"use client";

import { useState } from "react";
import { SegmentedControl } from "@/components/shared/segmented-control";
import { CHART_COLORS, DASHBOARD_GRAINS } from "@/config/dashboard";
import { bucketLabel, bucketTitle, compactTaka } from "@/lib/chart-format";
import { formatTaka } from "@/lib/utils";
import type { DashboardGrain, SalesChart as SalesChartData } from "@/types/dashboard";

type SalesChartProps = {
  chart: SalesChartData;
  grain: DashboardGrain;
  onGrainChange: (grain: DashboardGrain) => void;
};

const WIDTH = 640;
const HEIGHT = 220;
const BAR_HEIGHT = 60;

export function SalesChart({ chart, grain, onGrainChange }: SalesChartProps) {
  const [hover, setHover] = useState<number | null>(null);
  const points = chart.points;
  const n = Math.max(points.length, 1);
  const step = WIDTH / n;
  const revenues = points.map((point) => point.revenue);
  const orders = points.map((point) => point.orders);
  const max = Math.max(...revenues, 0) * 1.12 || 1;
  const maxOrders = Math.max(...orders, 0) || 1;
  const coords = revenues.map((value, index) => [step * index + step / 2, 218 - (value / max) * 206] as const);
  const line = coords.map(([x, y], index) => `${index ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const area = coords.length ? `${line} L${coords[coords.length - 1][0].toFixed(1)} 219 L${coords[0][0].toFixed(1)} 219 Z` : "";
  const barWidth = Math.max(3, Math.min(26, step * 0.5));
  const every = Math.ceil(n / 7);
  const active = hover !== null && hover < points.length ? hover : null;
  const salesTotal = revenues.reduce((sum, value) => sum + value, 0);
  const ordersTotal = orders.reduce((sum, value) => sum + value, 0);

  return (
    <section aria-labelledby="so" className="min-w-0 flex-[2_1_600px] rounded-xl bg-card px-6 py-5.5 max-[900px]:p-4.5">
      <div className="mb-4.5 flex items-center justify-between gap-3">
        <h2 id="so" className="font-heading text-lg leading-[1.3] font-semibold">
          Sales overview
        </h2>
        <SegmentedControl ariaLabel="Granularity" options={DASHBOARD_GRAINS} value={grain} onChange={onGrainChange} />
      </div>
      <div className="mb-5 flex flex-wrap items-center gap-6">
        <div className="flex flex-col gap-1.5">
          <span className="flex items-center gap-2 text-[12.5px] text-ink-3">
            <span className="size-2.5 rounded-[3px]" style={{ background: CHART_COLORS.revenue }} />
            Revenue
          </span>
          <span className="font-heading text-[26px] leading-none font-semibold tabular-nums">{formatTaka(salesTotal)}</span>
        </div>
        <span className="h-11 w-px bg-line" />
        <div className="flex flex-col gap-1.5">
          <span className="flex items-center gap-2 text-[12.5px] text-ink-3">
            <span className="size-2.5 rounded-[3px]" style={{ background: CHART_COLORS.orders }} />
            Orders
          </span>
          <span className="font-heading text-[26px] leading-none font-semibold tabular-nums">{ordersTotal.toLocaleString("en-IN")}</span>
        </div>
      </div>
      <div className="flex items-stretch gap-3">
        <div aria-hidden="true" className="flex h-55 w-12 flex-none flex-col justify-between text-right text-xs text-ink-3">
          <span>{compactTaka(max)}</span>
          <span>{compactTaka(max / 2)}</span>
          <span>৳0</span>
        </div>
        <div className="relative flex min-w-0 flex-1 flex-col gap-2.5" onMouseLeave={() => setHover(null)}>
          <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} preserveAspectRatio="none" role="img" aria-label="Revenue over time" className="block h-55 w-full">
            <path d="M0 1H640M0 110H640" stroke="#efe9e4" strokeDasharray="4 6" vectorEffect="non-scaling-stroke" />
            <path d="M0 219H640" stroke="#e4dcd5" vectorEffect="non-scaling-stroke" />
            {area && <path d={area} fill="rgba(238,86,21,.08)" />}
            {line && (
              <path d={line} fill="none" stroke={CHART_COLORS.revenue} strokeWidth={2.5} vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" />
            )}
            {active !== null && (
              <path d={`M${(step * active + step / 2).toFixed(1)} 0V220`} stroke="#221510" strokeOpacity=".25" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
            )}
            {points.map((point, index) => (
              <rect key={point.date} x={step * index} y={0} width={step} height={HEIGHT} fill="transparent" onMouseEnter={() => setHover(index)} />
            ))}
          </svg>
          <svg viewBox={`0 0 ${WIDTH} ${BAR_HEIGHT}`} preserveAspectRatio="none" role="img" aria-label="Orders per period" className="block h-15 w-full">
            {points.map((point, index) => {
              const barHeight = Math.max(3, (point.orders / maxOrders) * 56);
              return (
                <rect
                  key={point.date}
                  x={step * index + (step - barWidth) / 2}
                  y={BAR_HEIGHT - barHeight}
                  width={barWidth}
                  height={barHeight}
                  rx={3}
                  fill={active === index ? CHART_COLORS.revenue : CHART_COLORS.bar}
                  onMouseEnter={() => setHover(index)}
                />
              );
            })}
          </svg>
          <div aria-hidden="true" className="flex justify-between text-xs text-ink-3">
            {points
              .filter((_, index) => index % every === 0)
              .map((point) => (
                <span key={point.date}>{bucketLabel(point.date, chart.groupBy)}</span>
              ))}
          </div>
          {active !== null && (
            <div
              className="pointer-events-none absolute top-[70px] z-5 -translate-x-1/2 -translate-y-[110%] rounded-[10px] bg-surface px-3 py-2 text-xs whitespace-nowrap shadow-pop"
              style={{ left: `${(((active + 0.5) / n) * 100).toFixed(2)}%` }}
            >
              <div className="mb-1 text-xs text-ink-3">{bucketTitle(points[active].date, chart.groupBy)}</div>
              <div className="font-heading text-base leading-[1.2] font-semibold">{formatTaka(points[active].revenue)}</div>
              <div className="text-xs text-ink-3">{points[active].orders} orders</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
