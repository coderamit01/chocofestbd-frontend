import Link from "next/link";
import { Icon, type IconName } from "@/components/shared/icon";

type SectionMoreLinkProps = { href: string; label: string; icon?: IconName };

export function SectionMoreLink({ href, label, icon = "chevronRight" }: SectionMoreLinkProps) {
  return (
    <Link href={href} className="inline-flex items-center gap-1 text-sm font-semibold text-brand-text no-underline hover:text-brand">
      {label}
      <Icon name={icon} size={16} strokeWidth={1.8} />
    </Link>
  );
}
