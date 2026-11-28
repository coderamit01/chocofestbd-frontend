import Link from "next/link";
import { Icon } from "@/components/shared/icon";
import type { NotFoundLink } from "@/types/store-not-found";

export function NotFoundLinks({ links }: { links: NotFoundLink[] }) {
  return (
    <nav aria-label="Popular pages" className="flex flex-wrap justify-center gap-2.5">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="inline-flex h-[42px] items-center gap-2 rounded-full border border-[#e7e0da] bg-white px-4 text-[13.5px] leading-[normal] text-[#3f3531] no-underline hover:border-brand hover:text-brand-text"
        >
          <Icon name={link.icon} size={16} strokeWidth={1.8} className="text-brand" />
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
