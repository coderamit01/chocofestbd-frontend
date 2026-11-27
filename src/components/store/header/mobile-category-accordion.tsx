"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "cn";
import { Icon } from "@/components/shared/icon";
import type { StoreCategory } from "@/types/store";
import { CategoryTile } from "./category-tile";

type MobileCategoryAccordionProps = {
  categories: StoreCategory[];
  onNavigate: () => void;
};

export function MobileCategoryAccordion({ categories, onNavigate }: MobileCategoryAccordionProps) {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <div className="flex flex-col">
      {categories.map((category, index) => {
        const open = index === openIndex;
        const panelId = `mobile-category-${index}`;
        return (
          <div key={category.name}>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpenIndex(open ? -1 : index)}
              className="flex w-full items-center gap-3 px-1 py-2 text-left font-sans text-[14.5px] leading-[1.2] font-medium text-ink"
            >
              <CategoryTile icon={category.icon} tone={category.tone} size={36} />
              <span className="min-w-0 flex-1">{category.name}</span>
              <span
                className={cn(
                  "inline-flex transition-transform duration-200",
                  open ? "rotate-180 text-brand" : "text-[#9b908a]",
                )}
              >
                <Icon name="chevronDown" size={16} strokeWidth={1.8} />
              </span>
            </button>
            {open && (
              <div id={panelId} className="flex flex-col pt-0.5 pb-2 pl-[52px]">
                {category.groups[0].links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={onNavigate}
                    className="py-2 text-sm text-[#6b605a] hover:text-[#6b605a]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
