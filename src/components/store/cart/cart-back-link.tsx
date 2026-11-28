import Link from "next/link";
import { Icon } from "@/components/shared/icon";

type CartBackLinkProps = {
  href: string;
  label: string;
};

export function CartBackLink({ href, label }: CartBackLinkProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 font-sans text-[13.5px] text-ink-2 no-underline hover:text-brand"
    >
      <Icon name="arrowLeft" size={16} strokeWidth={1.8} />
      {label}
    </Link>
  );
}
