import Link from "next/link";
import { cn } from "cn";
import { Icon } from "@/components/shared/icon";
import type { FooterLinkGroup } from "@/types/store-footer";
import { footerColumnClass, footerHeadingClass, footerItemClass } from "./footer-styles";

type FooterLinkColumnProps = FooterLinkGroup & {
  id: string;
  open: boolean;
  onToggle: () => void;
};

export function FooterLinkColumn({ id, heading, links, open, onToggle }: FooterLinkColumnProps) {
  return (
    <div className={footerColumnClass}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
        className={cn(footerHeadingClass, "max-[900px]:cursor-pointer")}
      >
        {heading}
        <span
          className={cn(
            "hidden text-[#9b908a] transition-transform duration-200 ease-[ease] max-[900px]:inline-flex",
            open && "rotate-180 text-brand",
          )}
        >
          <Icon name="chevronDown" size={16} strokeWidth={1.8} />
        </span>
      </button>
      <div id={id} className={cn("flex flex-col gap-3 max-[900px]:pb-4", !open && "max-[900px]:hidden")}>
        {links.map((link) => (
          <Link key={link.href} href={link.href} className={cn(footerItemClass, "hover:text-brand")}>
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
