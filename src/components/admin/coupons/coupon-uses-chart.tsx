"use client";

import { useState } from "react";
import { COUPON_CHART_DAYS } from "@/config/coupons";

const WIDTH = 560;
const HEIGHT = 180;
const BASELINE = 179;
const MAX_BAR = 170;

const dayLabel = new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", day: "numeric", month: "short" });
const formatDay = (date: string) => dayLabel.format(new Date(`${date}T00:00:00Z`));

export function CouponUsesChart({ days }: { days: { date: string; count: number }[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(1, ...days.map((day) => day.count));
  const slot = WIDTH / Math.max(days.length, 1);
  const ticks = days.length ? [days[0], days[Math.floor((days.length - 1) / 2)], days[days.length - 1]] : [];
  const active = hover !== null ? days[hover] : null;

  return (
    <div className="relative" onMouseLeave={() => setHover(null)}>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="none"
        className="block h-45 w-full"
        role="img"
        aria-label={`Coupon uses per day, last ${COUPON_CHART_DAYS} days`}
      >
        <path d={`M0 1H${WIDTH}M0 90H${WIDTH}`} stroke="#efe9e4" strokeDasharray="4 6" vectorEffect="non-scaling-stroke" />
        <path d={`M0 ${BASELINE}H${WIDTH}`} stroke="#e4dcd5" vectorEffect="non-scaling-stroke" />
        {days.map((day, index) => {
          const height = (day.count / max) * MAX_BAR;
          return (
            <rect
              key={day.date}
              x={(index * slot + slot * 0.2).toFixed(1)}
              y={(BASELINE - height).toFixed(1)}
              width={(slot * 0.6).toFixed(1)}
              height={height.toFixed(1)}
              rx={4}
              fill={hover === index ? "#ee5615" : "#ffd0b5"}
            />
          );
        })}
        {days.map((day, index) => (
          <rect
            key={`hit-${day.date}`}
            x={(index * slot).toFixed(1)}
            y={0}
            width={slot.toFixed(1)}
            height={HEIGHT}
            fill="transparent"
            onMouseEnter={() => setHover(index)}
          />
        ))}
      </svg>
      <div className="mt-2 flex justify-between text-xs text-ink-3" aria-hidden="true">
        {ticks.map((tick, index) => (
          <span key={`${tick.date}-${index}`}>{formatDay(tick.date)}</span>
        ))}
      </div>
      {active && hover !== null && (
        <div
          className="pointer-events-none absolute top-10 z-5 -translate-x-1/2 -translate-y-[110%] rounded-[10px] bg-surface px-3 py-2 text-xs whitespace-nowrap shadow-pop"
          style={{ left: `${(((hover + 0.5) / days.length) * 100).toFixed(1)}%` }}
        >
          <div className="text-xs text-ink-3">{formatDay(active.date)}</div>
          <b className="font-heading text-[15px] leading-[1.3] font-semibold">
            {active.count} {active.count === 1 ? "use" : "uses"}
          </b>
        </div>
      )}
    </div>
  );
}
