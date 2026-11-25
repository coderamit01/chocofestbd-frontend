"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/shared/icon";
import { buttonVariants } from "@/components/ui/button";
import { STATUS_COLORS } from "@/config/dashboard";
import { ORDER_STATUSES, ORDERS_PATH } from "@/config/orders";
import { STATUS_BADGES } from "@/config/status-badges";
import type { OrderStatus } from "@/types/status";

const RADIUS = 48;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function StatusDonut({ counts }: { counts: Record<OrderStatus, number> }) {
  const [active, setActive] = useState<number | null>(null);
  const total = ORDER_STATUSES.reduce((sum, status) => sum + (counts[status] ?? 0), 0);
  const lengths = ORDER_STATUSES.map((status) => (total ? ((counts[status] ?? 0) / total) * CIRCUMFERENCE : 0));

  const segments = ORDER_STATUSES.map((status, index) => {
    const count = counts[status] ?? 0;
    const length = lengths[index];
    const offset = lengths.slice(0, index).reduce((sum, value) => sum + value, 0);
    const visible = Math.max(0, length - 3);
    return {
      status,
      count,
      label: STATUS_BADGES.order[status].label,
      color: STATUS_COLORS[status],
      dash: `${visible.toFixed(2)} ${(CIRCUMFERENCE - visible).toFixed(2)}`,
      offset: (-offset - 1.5).toFixed(2),
      visible: count > 0,
    };
  });

  const focus = active !== null ? segments[active] : null;

  return (
    <section aria-labelledby="st" className="min-w-0 flex-[1_1_320px] rounded-xl bg-card px-6 py-5.5 max-[900px]:p-4.5">
      <div className="mb-4.5 flex items-center justify-between gap-3">
        <h2 id="st" className="font-heading text-lg leading-[1.3] font-semibold">
          Orders by status
        </h2>
        <Link href={ORDERS_PATH} aria-label="Open orders" className={buttonVariants({ variant: "square", size: "icon-md" })}>
          <Icon name="arrowRight" size={16} strokeWidth={1.8} />
        </Link>
      </div>
      <div className="flex flex-col items-center gap-5">
        <div className="relative size-49">
          <svg viewBox="0 0 120 120" role="img" aria-label="Orders by status" className="size-49 -rotate-90">
            <circle cx="60" cy="60" r={RADIUS} fill="none" stroke="#f2eeea" strokeWidth={13} />
            {segments.map((segment, index) =>
              segment.visible ? (
                <circle
                  key={segment.status}
                  cx="60"
                  cy="60"
                  r={RADIUS}
                  fill="none"
                  stroke={segment.color}
                  strokeWidth={active === index ? 17 : 13}
                  strokeDasharray={segment.dash}
                  strokeDashoffset={segment.offset}
                  strokeLinecap="round"
                  onMouseEnter={() => setActive(index)}
                  onMouseLeave={() => setActive(null)}
                  className="cursor-pointer transition-[stroke-width] duration-150"
                />
              ) : null
            )}
          </svg>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1">
            <span className="text-xs text-ink-3">{focus ? focus.label : "Total orders"}</span>
            <span className="font-heading text-[30px] leading-none font-semibold tabular-nums">{(focus ? focus.count : total).toLocaleString("en-IN")}</span>
          </div>
        </div>
        <ul className="m-0 grid w-full list-none grid-cols-2 gap-x-5 gap-y-3 p-0">
          {segments.map((segment) => (
            <li key={segment.status} className="flex items-center gap-2 text-[13.5px]">
              <span className="size-2.5 flex-none rounded-[3px]" style={{ background: segment.color }} />
              <span className="min-w-0 flex-1 text-ink-2">{segment.label}</span>
              <span className="font-semibold tabular-nums">{segment.count.toLocaleString("en-IN")}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
