"use client";

import { useState } from "react";
import { Icon } from "@/components/shared/icon";
import { useLogout } from "@/hooks/use-logout";
import { summarizeDeliveries } from "@/lib/rider";
import { cn, formatTaka, getInitials } from "@/lib/utils";
import type { DeliverySheetState, DeliveryStop, DeliveryTab } from "@/types/rider";
import { DeliveryCard } from "./delivery-card";
import { DeliverySheet } from "./delivery-sheet";

type DeliveriesBoardProps = {
  stops: DeliveryStop[];
  riderName: string;
  today: string;
};

export function DeliveriesBoard({ stops, riderName, today }: DeliveriesBoardProps) {
  const { logout, isPending: isLoggingOut } = useLogout();
  const [tab, setTab] = useState<DeliveryTab>("todo");
  const [sheet, setSheet] = useState<DeliverySheetState>(null);

  const { open, done, toCollect, collected, progress } = summarizeDeliveries(stops);
  const list = tab === "todo" ? open : done;
  const sequence = new Map(stops.map((stop, index) => [stop.id, index + 1]));

  const tabs: { value: DeliveryTab; label: string }[] = [
    { value: "todo", label: `To deliver (${open.length})` },
    { value: "done", label: `Completed (${done.length})` },
  ];

  const empty =
    tab === "todo"
      ? stops.length
        ? { title: "All stops done", body: `Hand over ${formatTaka(collected)} at the hub.` }
        : { title: "No deliveries yet", body: "Shipped orders show up here." }
      : { title: "Nothing completed yet", body: "Delivered and failed stops show here." };

  return (
    <div className="mx-auto flex w-full max-w-97.5 flex-col bg-background font-sans max-[900px]:-mx-4 max-[900px]:w-auto max-[900px]:max-w-none">
      <header className="flex flex-col gap-4 px-4.5 pt-5 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex size-11 flex-none items-center justify-center rounded-[12px] bg-choco font-heading text-[15px] leading-none font-semibold text-white">
              {getInitials(riderName)}
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="font-heading text-lg leading-[1.2] font-semibold text-ink">My deliveries</span>
              <span className="text-xs text-ink-3">
                {riderName} · {today}
              </span>
            </span>
          </div>
          <button
            type="button"
            aria-label="Log out"
            onClick={logout}
            disabled={isLoggingOut}
            className="flex size-11 items-center justify-center rounded-[12px] bg-surface text-ink transition-colors hover:bg-surface-2 disabled:opacity-45"
          >
            <Icon name="logout" size={17} strokeWidth={1.8} />
          </button>
        </div>

        <div className="grid grid-cols-[1.6fr_1fr] gap-2.5">
          <div className="flex flex-col gap-1.5 rounded-xl bg-brand p-4 text-white">
            <span className="text-[12.5px] opacity-90">Cash to collect</span>
            <span className="font-heading text-[26px] leading-none font-bold tabular-nums">{formatTaka(toCollect)}</span>
            <span className="text-[11.5px] opacity-90">Collected {formatTaka(collected)}</span>
          </div>
          <div className="flex flex-col gap-1.5 rounded-xl bg-surface p-4">
            <span className="text-xs text-ink-3">Completed</span>
            <span className="font-heading text-[26px] leading-none font-bold text-ink tabular-nums">
              {done.length}/{stops.length}
            </span>
            <div className="h-1.5 overflow-hidden rounded-full bg-surface-3">
              <div className="h-full rounded-full bg-brand transition-[width]" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        <div role="tablist" aria-label="Stops" className="flex gap-1 rounded-[12px] bg-surface p-1">
          {tabs.map((item) => (
            <button
              key={item.value}
              type="button"
              role="tab"
              aria-selected={tab === item.value}
              onClick={() => setTab(item.value)}
              className={cn(
                "h-10 flex-1 rounded-[9px] px-3.5 text-[13px] leading-none font-medium whitespace-nowrap",
                tab === item.value ? "bg-surface text-ink shadow-seg" : "text-ink-2 hover:text-ink"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>

      <div className="flex flex-col gap-3 px-4 pb-6">
        {list.map((stop) => (
          <DeliveryCard
            key={stop.id}
            stop={stop}
            sequence={sequence.get(stop.id) ?? 0}
            onDeliver={() => setSheet({ mode: "deliver", stop })}
            onFail={() => setSheet({ mode: "fail", stop })}
          />
        ))}

        {list.length === 0 && (
          <div className="flex flex-col items-center gap-2.5 px-3 py-14 text-center">
            <span className="flex size-15 items-center justify-center rounded-full bg-success-soft text-success">
              <Icon name="check" size={24} strokeWidth={1.8} />
            </span>
            <span className="font-heading text-[17px] leading-[1.3] font-semibold text-ink">{empty.title}</span>
            <span className="text-[12.5px] text-ink-3">{empty.body}</span>
          </div>
        )}
      </div>

      <DeliverySheet state={sheet} onClose={() => setSheet(null)} />
    </div>
  );
}
