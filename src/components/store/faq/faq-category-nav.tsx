import { countFaqs } from "@/lib/store-faq";
import type { FaqCategory, FaqEntry, FaqFilter } from "@/types/store-faq";
import { FaqCategoryButton } from "./faq-category-button";

type FaqCategoryNavProps = {
  categories: FaqCategory[];
  entries: FaqEntry[];
  active: FaqFilter;
  onSelect: (filter: FaqFilter) => void;
};

export function FaqCategoryNav({ categories, entries, active, onSelect }: FaqCategoryNavProps) {
  return (
    <nav
      aria-label="FAQ topics"
      className="sticky top-4 flex flex-col gap-1 rounded-[20px] border border-[#f0ebe6] bg-white p-2 max-[900px]:static max-[900px]:-mx-3.5 max-[900px]:flex-row max-[900px]:overflow-x-auto max-[900px]:rounded-none max-[900px]:border-0 max-[900px]:bg-transparent max-[900px]:px-3.5 max-[900px]:py-1.5"
    >
      {categories.map((category) => (
        <FaqCategoryButton
          key={category.value}
          category={category}
          count={countFaqs(entries, category.value)}
          active={active === category.value}
          onSelect={() => onSelect(category.value)}
        />
      ))}
    </nav>
  );
}
