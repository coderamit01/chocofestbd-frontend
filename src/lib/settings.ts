import { SETTINGS_TAB_VALUES, SETTINGS_TIME_ZONE } from "@/config/settings";
import { htmlToMarkdown } from "@/lib/markdown";
import type { ImageSettingGroup, SettingGroupView, SettingImages, SettingsTab, SettingValues } from "@/types/setting";

export const parseSettingsTab = (value: string | string[] | undefined): SettingsTab => {
  const tab = Array.isArray(value) ? value[0] : value;
  return SETTINGS_TAB_VALUES.includes(tab as SettingsTab) ? (tab as SettingsTab) : "general";
};

export function toSettingsState(groups: SettingGroupView[]) {
  const byGroup = Object.fromEntries(groups.map((group) => [group.group, group]));
  const values = Object.fromEntries(
    (["general", "numbering", "payment", "notifications", "seo", "social", "legal"] as const).map((key) => [key, byGroup[key]?.value])
  ) as SettingValues;

  values.legal = Object.fromEntries(
    Object.entries(values.legal).map(([key, html]) => [key, htmlToMarkdown(String(html ?? ""))])
  ) as SettingValues["legal"];

  const images = Object.fromEntries(
    (["general", "seo"] as ImageSettingGroup[]).map((key) => [key, byGroup[key]?.images ?? {}])
  ) as SettingImages;

  return { values, images };
}

export const socialHandle = (url: string, prefix: string) =>
  url.replace(/^https?:\/\/(www\.)?/i, "").replace(new RegExp(`^${prefix.replace(/[.*+?^${}()|[\]\/]/g, "\$&")}`, "i"), "").replace(/\/$/, "");

export const socialUrl = (handle: string, prefix: string) => (handle.trim() ? `https://${prefix}${handle.trim()}` : "");

const dateCode = new Intl.DateTimeFormat("en-GB", { timeZone: SETTINGS_TIME_ZONE, year: "2-digit", month: "2-digit", day: "2-digit" });

export const orderDateCode = (now: number) => {
  const parts = Object.fromEntries(dateCode.formatToParts(new Date(now)).map((part) => [part.type, part.value]));
  return `${parts.year}${parts.month}${parts.day}`;
};
