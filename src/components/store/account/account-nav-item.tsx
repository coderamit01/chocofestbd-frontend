import Link from "next/link";
import { cn } from "cn";
import { Icon, type IconName } from "@/components/shared/icon";

type AccountNavItemProps = {
  href: string;
  label: string;
  icon: IconName;
  count?: number;
  active?: boolean;
};

export function AccountNavItem({ href, label, icon, count, active }: AccountNavItemProps) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex h-[46px] items-center gap-3 rounded-[12px] px-3 text-left font-sans text-sm leading-none font-medium text-[#3f3531] no-underline hover:bg-[#faf6f3] hover:text-[#3f3531] max-[900px]:h-10 max-[900px]:flex-none max-[900px]:text-[13px]",
        active && "bg-brand-50 font-semibold text-brand-text hover:bg-brand-50 hover:text-brand-text",
      )}
    >
      <Icon name={icon} size={18} strokeWidth={1.8} />
      {label}
      {Boolean(count) && (
        <b className="ml-auto flex h-[22px] min-w-[22px] items-center justify-center rounded-full bg-brand px-1.5 text-[11.5px] text-white">
          {count}
        </b>
      )}
    </Link>
  );
}
