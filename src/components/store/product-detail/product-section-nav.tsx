"use client";

import { useState } from "react";
import { cn } from "cn";

type ProductSectionNavProps = {
  reviewCount: number;
};

export function ProductSectionNav({ reviewCount }: ProductSectionNavProps) {
  const [active, setActive] = useState("details");
  const tabs = [
    { id: "details", label: "Details" },
    { id: "reviews", label: `Reviews (${reviewCount})` },
  ];

  return (
    <nav
      aria-label="Product sections"
      className="sticky top-0 z-5 mt-11 flex w-max max-w-full gap-1.5 overflow-x-auto rounded-[16px] border border-[#f0ebe6] bg-white/92 p-1.5 backdrop-blur-[8px] max-[900px]:mt-[26px] max-[900px]:w-auto max-[900px]:rounded-[14px]"
    >
      {tabs.map((tab) => {
        const on = tab.id === active;
        return (
          <a
            key={tab.id}
            href={`#${tab.id}`}
            aria-current={on}
            onClick={() => setActive(tab.id)}
            className={cn(
              "flex-none cursor-pointer rounded-[11px] px-[18px] py-[11px] font-sans text-sm leading-none font-medium text-ink-2 no-underline hover:text-brand-text focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-brand/35 max-[900px]:flex-1 max-[900px]:px-3 max-[900px]:text-[13.5px]",
              on && "bg-choco text-white hover:text-white",
            )}
          >
            {tab.label}
          </a>
        );
      })}
    </nav>
  );
}
