import type { IconName } from "@/components/shared/icon";

export type FaqTopic = "Delivery" | "Payment" | "Products" | "Returns" | "Gifting";

export type FaqFilter = FaqTopic | "All";

export type FaqCategory = {
  value: FaqFilter;
  icon: IconName;
};

export type FaqEntry = {
  id: number;
  topic: FaqTopic;
  question: string;
  answer: string;
};
