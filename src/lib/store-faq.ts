import type { FaqEntry, FaqFilter } from "@/types/store-faq";

export const countFaqs = (entries: FaqEntry[], filter: FaqFilter) =>
  filter === "All" ? entries.length : entries.filter((entry) => entry.topic === filter).length;

export const filterFaqs = (entries: FaqEntry[], filter: FaqFilter, query: string) => {
  const needle = query.toLowerCase();
  return entries.filter(
    (entry) =>
      (filter === "All" || entry.topic === filter) &&
      (!needle || `${entry.question} ${entry.answer}`.toLowerCase().includes(needle)),
  );
};
