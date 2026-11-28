"use client";

import { useMemo } from "react";
import { cn } from "cn";
import type { PolicySection } from "@/types/store-policy";
import { useActiveSection } from "./use-active-section";

type PolicyTocProps = {
  sections: PolicySection[];
  updated: string;
};

export function PolicyToc({ sections, updated }: PolicyTocProps) {
  const ids = useMemo(() => sections.map((section) => section.id), [sections]);
  const [active, setActive] = useActiveSection(ids);

  return (
    <nav
      aria-label="On this page"
      className="sticky top-4 flex flex-col gap-0.5 rounded-[18px] border border-[#f0ebe6] bg-white p-3.5 leading-[normal] max-[900px]:hidden"
    >
      <b className="px-2.5 pt-1 pb-2 text-[12px] tracking-[0.08em] text-[#8a7f79] uppercase">On this page</b>
      {sections.map((section) => {
        const on = section.id === active;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            aria-current={on ? "location" : undefined}
            onClick={() => setActive(section.id)}
            className={cn(
              "rounded-[9px] border-l-2 px-2.5 py-[9px] text-[13.5px] no-underline",
              on
                ? "border-brand bg-brand-50 font-medium text-[#9a3412] hover:text-[#9a3412]"
                : "border-transparent text-[#5f5450] hover:text-brand-text",
            )}
          >
            {section.title}
          </a>
        );
      })}
      <span className="mt-2.5 border-t border-[#f0ebe6] px-2.5 pt-2.5 text-[12px] text-[#a69b95]">{updated}</span>
    </nav>
  );
}
