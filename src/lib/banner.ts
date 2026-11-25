import { BANNER_SLOTS, DEFAULT_BANNER_HEIGHT } from "@/config/banners";

export const bannerSlotKey = (name: string) =>
  name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");

export const bannerSlot = (name: string) => BANNER_SLOTS[bannerSlotKey(name)] ?? { hint: "", height: DEFAULT_BANNER_HEIGHT };
