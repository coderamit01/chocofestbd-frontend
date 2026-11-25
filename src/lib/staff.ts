import { formatDate } from "@/lib/utils";
import type { StaffMember, StaffRow } from "@/types/staff";

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const ONLINE_WINDOW = 5 * MINUTE;

const lastActiveLabel = (value: string | null, now: number) => {
  if (!value) return "Never";
  const elapsed = now - new Date(value).getTime();
  if (elapsed < ONLINE_WINDOW) return "Now";
  if (elapsed < HOUR) return `${Math.floor(elapsed / MINUTE)} min ago`;
  if (elapsed < DAY) return `${Math.floor(elapsed / HOUR)} hr ago`;
  if (elapsed < 2 * DAY) return "Yesterday";
  return formatDate(value);
};

export const toStaffRow = (member: StaffMember, now: number): StaffRow => ({
  ...member,
  status: member.isBanned ? "DEACTIVATED" : member.lastActiveAt ? "ACTIVE" : "INVITED",
  lastActiveLabel: lastActiveLabel(member.lastActiveAt, now),
});
