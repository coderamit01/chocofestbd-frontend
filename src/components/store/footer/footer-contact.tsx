import { cn } from "cn";
import { Icon } from "@/components/shared/icon";
import type { FooterContactItem } from "@/types/store-footer";
import { footerColumnClass, footerHeadingClass, footerItemClass } from "./footer-styles";

type FooterContactProps = { heading: string; items: FooterContactItem[] };

export function FooterContact({ heading, items }: FooterContactProps) {
  return (
    <div className={cn(footerColumnClass, "max-[900px]:gap-3 max-[900px]:pb-[18px]")}>
      <span className={footerHeadingClass}>{heading}</span>
      {items.map((item) => (
        <ContactItem key={item.label} {...item} />
      ))}
    </div>
  );
}

function ContactItem({ label, icon, href, external }: FooterContactItem) {
  const content = (
    <>
      <Icon name={icon} size={16} strokeWidth={1.8} className="flex-none text-brand" />
      {label}
    </>
  );

  if (!href) return <span className={footerItemClass}>{content}</span>;

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(footerItemClass, "hover:text-brand")}
    >
      {content}
    </a>
  );
}
