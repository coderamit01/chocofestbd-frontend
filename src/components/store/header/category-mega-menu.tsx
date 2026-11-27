"use client";

import { useCallback, useRef, useState } from "react";
import { cn } from "cn";
import { Icon } from "@/components/shared/icon";
import { useDismiss } from "@/hooks/use-dismiss";
import type { StoreCategory } from "@/types/store";
import { MegaCategoryList } from "./mega-category-list";
import { MegaCategoryPanel } from "./mega-category-panel";

type CategoryMegaMenuProps = {
  categories: StoreCategory[];
};

export function CategoryMegaMenu({ categories }: CategoryMegaMenuProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(ref, open, close);

  return (
    <div ref={ref} onMouseLeave={close} className="relative flex h-full items-center">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="store-mega-menu"
        onClick={() => setOpen((isOpen) => !isOpen)}
        className={cn(
          "inline-flex h-[42px] items-center gap-2.5 rounded-[12px] px-4 font-sans text-sm leading-none font-medium text-white transition-colors duration-150 hover:bg-brand",
          open ? "bg-brand" : "bg-choco",
        )}
      >
        <Icon name="grid" size={18} strokeWidth={1.8} />
        Shop by category
        <Icon
          name="chevronDown"
          size={16}
          strokeWidth={1.8}
          className={cn("transition-transform duration-200", open && "rotate-180")}
        />
      </button>
      {open && (
        <div
          id="store-mega-menu"
          className="absolute top-full left-0 z-[60] grid w-[880px] animate-drop grid-cols-[280px_1fr] overflow-hidden rounded-b-2xl bg-white shadow-[0_30px_60px_-20px_rgba(61,17,4,0.35),0_0_0_1px_#f0ebe6]"
        >
          <MegaCategoryList categories={categories} activeIndex={activeIndex} onSelect={setActiveIndex} />
          <MegaCategoryPanel category={categories[activeIndex]} onNavigate={close} />
        </div>
      )}
    </div>
  );
}
