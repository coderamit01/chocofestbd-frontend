import type { IconName } from "@/components/shared/icon";

export type MetricTone = "solid" | "brand" | "mint" | "lav" | "sky" | "amber" | "rose" | "gray";

export type MetricValue = { value: number; change: number | null };

export type Metric = {
  label: string;
  value: string;
  icon: IconName;
  tone: MetricTone;
  change?: number | null;
  note?: string;
};
