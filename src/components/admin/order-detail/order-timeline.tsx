import { Icon, type IconName } from "@/components/shared/icon";
import { ORDER_TIMELINE_STEPS } from "@/config/orders";
import { STATUS_BADGES } from "@/config/status-badges";
import { dhakaClock, dhakaDayMonth } from "@/lib/dhaka-time";
import { cn } from "@/lib/utils";
import type { OrderDetail, OrderHistoryEntry } from "@/types/order";
import { DetailCard } from "./detail-card";

type Step = {
  key: string;
  label: string;
  note: string;
  by: string;
  date: string;
  time: string;
  icon: IconName;
  state: "current" | "done" | "todo" | "halted";
  line: "brand" | "plain" | "none";
};

const byLine = (entry: OrderHistoryEntry) =>
  `by ${!entry.changedBy || entry.changedBy.role === "CUSTOMER" ? "Customer" : entry.changedBy.name}`;

const DOT: Record<Step["state"], string> = {
  current: "bg-brand text-white shadow-[0_0_0_5px_var(--brand-100)]",
  done: "border-2 border-brand bg-surface text-brand",
  todo: "bg-surface-2 text-ink-4",
  halted: "bg-danger text-white",
};

export function OrderTimeline({ order }: { order: OrderDetail }) {
  const halted = order.status === "CANCELLED" || order.status === "RETURNED";
  const firstEntry = (status: OrderDetail["status"]) => order.statusHistory.find((entry) => entry.status === status);

  const steps: Step[] = ORDER_TIMELINE_STEPS.map((step, index) => {
    const entry = firstEntry(step.status);
    const current = step.status === order.status && !halted;
    const last = index === ORDER_TIMELINE_STEPS.length - 1;
    return {
      key: step.status,
      label: STATUS_BADGES.order[step.status].label,
      note: entry?.note || step.description,
      by: entry ? byLine(entry) : "Not reached yet",
      date: entry ? dhakaDayMonth(entry.createdAt) : "—",
      time: entry ? dhakaClock(entry.createdAt) : "",
      icon: step.icon,
      state: current ? "current" : entry ? "done" : "todo",
      line: last ? (halted ? "plain" : "none") : entry && !current ? "brand" : "plain",
    };
  });

  const haltEntry = halted ? firstEntry(order.status) : undefined;
  if (halted) {
    steps.push({
      key: order.status,
      label: STATUS_BADGES.order[order.status].label,
      note: haltEntry?.note || order.cancelReason || STATUS_BADGES.order[order.status].label,
      by: haltEntry ? byLine(haltEntry) : "",
      date: haltEntry ? dhakaDayMonth(haltEntry.createdAt) : "—",
      time: haltEntry ? dhakaClock(haltEntry.createdAt) : "",
      icon: "xcircle",
      state: "halted",
      line: "none",
    });
  }

  const position = ORDER_TIMELINE_STEPS.findIndex((step) => step.status === order.status);

  return (
    <DetailCard
      title="Status timeline"
      action={<span className="text-[12.5px] text-ink-3">{halted ? "Stopped" : `Step ${position + 1} of ${ORDER_TIMELINE_STEPS.length}`}</span>}
      className="min-w-0 flex-[1_1_320px]"
    >
      <ol className="m-0 list-none p-0">
        {steps.map((step) => (
          <li key={step.key} className="flex items-stretch gap-4">
            <span className="flex w-23 flex-none flex-col pt-1.5 text-right">
              <span className="text-[13px] font-medium">{step.date}</span>
              <span className="text-xs text-ink-3">{step.time}</span>
            </span>
            <span className="flex flex-none flex-col items-center">
              <span className={cn("flex size-[38px] flex-none items-center justify-center rounded-full", DOT[step.state])}>
                <Icon name={step.icon} size={17} strokeWidth={2} />
              </span>
              {step.line !== "none" && <span className={cn("min-h-5.5 w-0.5 flex-1", step.line === "brand" ? "bg-brand" : "bg-line")} />}
            </span>
            <span className="flex min-w-0 flex-col gap-1 pt-1.5 pb-5.5">
              <span
                className={cn(
                  "font-heading text-[15px] leading-[1.3] font-semibold",
                  step.state === "halted" ? "text-danger" : step.state === "todo" ? "text-ink-4" : "text-ink"
                )}
              >
                {step.label}
              </span>
              <span className="text-[12.5px] text-ink-3">{step.note}</span>
              {step.by && <span className="text-xs text-ink-3">{step.by}</span>}
            </span>
          </li>
        ))}
      </ol>
    </DetailCard>
  );
}
