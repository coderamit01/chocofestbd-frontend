import type { MetricTone } from "@/types/metric";

export const TILE_TONES: Record<MetricTone, string> = {
  solid: "bg-brand text-white",
  brand: "bg-brand-50 text-brand",
  mint: "bg-success-soft text-success",
  lav: "bg-lavender-soft text-lavender",
  sky: "bg-info-soft text-info",
  amber: "bg-warning-soft text-warning",
  rose: "bg-danger-soft text-danger",
  gray: "bg-surface-3 text-ink-2",
};
