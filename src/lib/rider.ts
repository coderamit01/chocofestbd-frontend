import type { DeliveryStop } from "@/types/rider";

const dayFormatter = new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "Asia/Dhaka" });

export const formatDeliveryDay = (date: Date) => {
  const parts = Object.fromEntries(dayFormatter.formatToParts(date).map((part) => [part.type, part.value]));
  return `${parts.weekday}, ${parts.day} ${parts.month}`;
};

export const cashAmount = (stop: DeliveryStop) => Number(stop.amountToCollect) || 0;

export function summarizeDeliveries(stops: DeliveryStop[]) {
  const open = stops.filter((stop) => !stop.result);
  const done = stops.filter((stop) => stop.result);

  return {
    open,
    done,
    toCollect: open.reduce((sum, stop) => sum + cashAmount(stop), 0),
    collected: done.filter((stop) => stop.result === "DELIVERED").reduce((sum, stop) => sum + cashAmount(stop), 0),
    progress: stops.length ? (done.length / stops.length) * 100 : 0,
  };
}
