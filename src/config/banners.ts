import type { UserRole } from "@/types/auth";

export const BANNER_ROLES: UserRole[] = ["SUPER_ADMIN", "ADMIN", "MANAGER"];
export const BANNER_DELETE_ROLES: UserRole[] = ["SUPER_ADMIN", "ADMIN"];

export const BANNER_CATEGORIES_TAB = "categories";
export const BANNER_LIST_LIMIT = 100;
export const BANNER_TITLE_MIN = 2;
export const BANNER_TITLE_MAX = 150;
export const BANNER_CATEGORY_NAME_MIN = 2;
export const BANNER_CATEGORY_NAME_MAX = 50;
export const BANNER_LINK_HOST = "chocofestbd.com";

export const BANNER_SLOTS: Record<string, { hint: string; height: number }> = {
  hero_slider: { hint: "Large slides at the top of the home page.", height: 190 },
  promo_strip: { hint: "Thin strip above the header — one at a time.", height: 120 },
  category_tiles: { hint: "Square tiles in the “Shop by category” row.", height: 190 },
};

export const DEFAULT_BANNER_HEIGHT = 190;

export const BANNER_ART: [string, string][] = [
  ["#3d1104", "#fff"],
  ["#ee5615", "#fff"],
  ["#fbe9d0", "#3d1104"],
  ["#efebfc", "#3d1104"],
  ["#5a2410", "#ffd9c2"],
];
