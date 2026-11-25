"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/components/ui/sidebar";
import type { NavCounts, NavSection } from "@/config/admin-nav";
import { isActivePath } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { NavIcon } from "./nav-icon";

type SidebarNavProps = {
  sections: NavSection[];
  counts?: NavCounts;
  expanded: boolean;
};

export function SidebarNav({ sections, counts, expanded }: SidebarNavProps) {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <nav aria-label="Main" className="flex flex-1 flex-col gap-[18px]">
      {sections.map((section) => (
        <div key={section.label} className="flex flex-col gap-[3px]">
          {expanded && section.showLabel && (
            <span className="px-3.5 pb-2 text-[11px] leading-none font-medium tracking-[0.08em] text-ink-4 uppercase">
              {section.label}
            </span>
          )}
          {section.items.map(({ title, url, icon, countKey }) => {
            const isActive = isActivePath(pathname, url);
            const count = countKey ? counts?.[countKey] : undefined;

            return (
              <Link
                key={url}
                href={url}
                title={title}
                aria-current={isActive ? "page" : undefined}
                onClick={() => isMobile && setOpenMobile(false)}
                className={cn(
                  "flex h-[46px] items-center gap-3.5 rounded-xl px-3.5 text-[15px] outline-none focus-visible:shadow-[0_0_0_3px_rgb(238_86_21/20%)]",
                  expanded ? "justify-start" : "justify-center",
                  isActive ? "bg-brand font-medium text-white" : "text-ink-2"
                )}
              >
                <NavIcon name={icon} className="flex-none" />
                {expanded && (
                  <>
                    <span className="flex-1 whitespace-nowrap">{title}</span>
                    {!!count && (
                      <span
                        className={cn(
                          "h-[22px] min-w-[22px] rounded-full px-1.5 text-center text-[11.5px] leading-[22px] font-semibold",
                          isActive ? "bg-white text-brand-press" : "bg-brand text-white"
                        )}
                      >
                        {count}
                      </span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
