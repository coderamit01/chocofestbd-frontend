import { cn } from "cn";
import { Icon } from "@/components/shared/icon";
import type { StoreCategory } from "@/types/store";
import { CategoryTile } from "./category-tile";

type MegaCategoryListProps = {
  categories: StoreCategory[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function MegaCategoryList({ categories, activeIndex, onSelect }: MegaCategoryListProps) {
  return (
    <div className="flex flex-col gap-0.5 border-r border-[#f0ebe6] bg-[#fcfaf8] p-2.5">
      {categories.map((category, index) => {
        const active = index === activeIndex;
        return (
          <button
            key={category.name}
            type="button"
            aria-current={active}
            onMouseEnter={() => onSelect(index)}
            onFocus={() => onSelect(index)}
            onClick={() => onSelect(index)}
            className={cn(
              "flex items-center gap-3 rounded-[12px] px-2.5 py-2 text-left font-sans text-sm leading-[1.2] font-medium",
              active
                ? "bg-white text-ink shadow-[0_1px_3px_rgba(34,21,16,0.06)]"
                : "text-[#3f3531] hover:bg-white hover:text-ink hover:shadow-[0_1px_3px_rgba(34,21,16,0.06)]",
            )}
          >
            <CategoryTile
              icon={category.icon}
              tone={category.tone}
              size={36}
              iconClassName={active ? "text-brand" : "text-[#c9bdb5]"}
            />
            <span className="min-w-0 flex-1">{category.name}</span>
            <span className="text-xs text-ink-3">{category.count}</span>
            <Icon
              name="chevronRight"
              size={15}
              strokeWidth={1.8}
              className={active ? "text-brand" : "text-[#c9bdb5]"}
            />
          </button>
        );
      })}
    </div>
  );
}
