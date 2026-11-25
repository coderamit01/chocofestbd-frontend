import type { BadgeVariant } from "@/components/ui/badge";
import type { Collection, CollectionState } from "@/types/collection";

const TIME_ZONE = "Asia/Dhaka";
const DHAKA_OFFSET = "+06:00";

export const COLLECTION_FILTERS = ["All", "Live", "Scheduled", "Expired"] as const;
export type CollectionFilter = (typeof COLLECTION_FILTERS)[number];

export const COLLECTION_STATE_BADGES: Record<CollectionState, BadgeVariant> = {
  Live: "success",
  Scheduled: "info",
  Expired: "neutral",
  Disabled: "danger",
};

export function collectionState(collection: Collection, now: number): CollectionState {
  if (!collection.isActive) return "Disabled";
  if (collection.startsAt && now < new Date(collection.startsAt).getTime()) return "Scheduled";
  if (collection.endsAt && now > new Date(collection.endsAt).getTime()) return "Expired";
  return "Live";
}

const dayMonth = new Intl.DateTimeFormat("en-GB", { timeZone: TIME_ZONE, day: "numeric", month: "short" });

export function collectionWindow(collection: Collection) {
  const start = collection.startsAt ? dayMonth.format(new Date(collection.startsAt)) : "Always";
  return collection.endsAt ? `${start} – ${dayMonth.format(new Date(collection.endsAt))}` : `${start} onward`;
}

const localParts = new Intl.DateTimeFormat("en-CA", {
  timeZone: TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

export function toDhakaInput(value: string | null) {
  if (!value) return "";
  const parts = Object.fromEntries(localParts.formatToParts(new Date(value)).map((part) => [part.type, part.value]));
  return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
}

export const fromDhakaInput = (value: string) => (value ? `${value}:00${DHAKA_OFFSET}` : null);
