import Link from "next/link";
import { cn } from "cn";
import type { StoreNavLink } from "@/types/store";
import { HotTag } from "./hot-tag";
import { isActivePath } from "./is-active-path";

type NavLinksProps = {
  links: StoreNavLink[];
  pathname: string | null;
};

export function NavLinks({ links, pathname }: NavLinksProps) {
  return (
    <div className="flex h-full min-w-0 flex-1 items-center gap-1 overflow-hidden">
      {links.map((link) => {
        const active = isActivePath(pathname, link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative inline-flex h-10 items-center gap-1.5 rounded-lg px-3 font-sans text-sm leading-none font-medium whitespace-nowrap hover:bg-brand-50 hover:text-brand",
              active
                ? "text-brand after:absolute after:right-3 after:-bottom-2 after:left-3 after:h-[3px] after:rounded-t-[3px] after:bg-brand"
                : "text-[#3f3531]",
            )}
          >
            {link.label}
            {link.tag && <HotTag label={link.tag} />}
          </Link>
        );
      })}
    </div>
  );
}
