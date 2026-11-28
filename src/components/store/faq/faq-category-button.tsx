import { cn } from "cn";
import { Icon } from "@/components/shared/icon";
import type { FaqCategory } from "@/types/store-faq";

type FaqCategoryButtonProps = {
  category: FaqCategory;
  count: number;
  active: boolean;
  onSelect: () => void;
};

export function FaqCategoryButton({ category, count, active, onSelect }: FaqCategoryButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onSelect}
      className={cn(
        "flex h-11 cursor-pointer items-center gap-2.5 rounded-[12px] border-0 px-3 text-left font-sans text-[14px] leading-none hover:bg-[#faf6f3] max-[900px]:h-10 max-[900px]:flex-none max-[900px]:rounded-full max-[900px]:border max-[900px]:border-solid",
        active
          ? "bg-brand-50 font-semibold text-brand-text hover:bg-brand-50 max-[900px]:border-brand"
          : "bg-transparent font-medium text-[#3f3531] max-[900px]:border-[#e7e0da] max-[900px]:bg-white max-[900px]:hover:bg-[#faf6f3]",
      )}
    >
      <Icon name={category.icon} size={18} strokeWidth={1.8} className="flex-none" />
      {category.value}
      <small className="ml-auto text-[12px] text-[#a69b95]">{count}</small>
    </button>
  );
}
