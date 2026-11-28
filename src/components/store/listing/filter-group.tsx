"use client";

import { useId, useState, type ReactNode } from "react";
import { cn } from "cn";
import { Icon } from "@/components/shared/icon";
import type { ListingFilterVariant } from "@/types/store-listing";

type FilterGroupProps = {
  title: string;
  note?: string;
  defaultOpen?: boolean;
  variant: ListingFilterVariant;
  bodyClassName?: string;
  children: ReactNode;
};

export function FilterGroup({ title, note, defaultOpen = true, variant, bodyClassName, children }: FilterGroupProps) {
  const [open, setOpen] = useState(defaultOpen);
  const bodyId = useId();

  return (
    <div className="border-b border-[#f0ebe6] last:border-b-0">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={open ? bodyId : undefined}
        onClick={() => setOpen((value) => !value)}
        className={cn(
          "flex w-full cursor-pointer items-center gap-2 border-0 bg-transparent text-left text-ink",
          variant === "sheet" ? "px-1 py-4" : "px-[18px] py-[15px]",
        )}
      >
        <b className="flex-1 font-sans text-[14px] leading-none font-semibold">{title}</b>
        {note && <span className="font-sans text-[11.5px] font-medium text-brand-text">{note}</span>}
        <span className={cn("flex text-[#8a7f79] transition-transform duration-200", open && "rotate-180")}>
          <Icon name="chevronDown" size={16} strokeWidth={1.8} />
        </span>
      </button>
      {open && (
        <div id={bodyId} className={bodyClassName}>
          {children}
        </div>
      )}
    </div>
  );
}
