import type { UserRole } from "@/types/auth";
import type { ReviewStatus } from "@/types/status";

export const REVIEW_ROLES: UserRole[] = ["SUPER_ADMIN", "ADMIN", "MANAGER"];
export const REVIEW_DELETE_ROLES: UserRole[] = ["SUPER_ADMIN", "ADMIN"];

export const REVIEW_PAGE_SIZE = 20;

export const REVIEW_TABS: { value: ReviewStatus; label: string }[] = [
  { value: "PENDING", label: "Pending" },
  { value: "APPROVED", label: "Approved" },
  { value: "REJECTED", label: "Rejected" },
];

export const REVIEW_RATING_OPTIONS: { value: string; label: string }[] = [
  { value: "", label: "All ratings" },
  { value: "5", label: "5 stars" },
  { value: "4", label: "4 stars" },
  { value: "3", label: "3 stars" },
  { value: "2", label: "2 stars" },
  { value: "1", label: "1 star" },
];

export const RATING_BAR_COLORS = { high: "#ee5615", mid: "#ffb38a", low: "#ffd0b5" };

export const STAR_COLOR = "#e08a00";
