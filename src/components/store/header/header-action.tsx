import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "cn";
import { Icon, type IconName } from "@/components/shared/icon";
import { CountBadge } from "./count-badge";

const ACTION_CLASS =
  "group flex min-w-16 flex-col items-center gap-1 rounded-[14px] px-2 py-1.5 font-sans text-xs leading-none font-medium text-[#3f3531] transition-colors duration-150 hover:bg-brand-50 hover:text-brand-text focus-visible:shadow-[0_0_0_3px_rgba(238,86,21,0.28)] max-[900px]:hidden";

type ActionContentProps = {
  icon: IconName;
  label: string;
  badge?: number;
};

function ActionContent({ icon, label, badge }: ActionContentProps) {
  return (
    <>
      <span className="relative flex h-[26px] w-7 items-center justify-center group-hover:text-brand">
        <Icon name={icon} size={22} strokeWidth={1.8} />
        {badge !== undefined && <CountBadge count={badge} size="sm" className="-top-[9px] -right-4" />}
      </span>
      {label}
    </>
  );
}

type HeaderActionLinkProps = ActionContentProps & Omit<ComponentProps<typeof Link>, "children">;

export function HeaderActionLink({ icon, label, badge, className, ...props }: HeaderActionLinkProps) {
  return (
    <Link className={cn(ACTION_CLASS, className)} {...props}>
      <ActionContent icon={icon} label={label} badge={badge} />
    </Link>
  );
}

type HeaderActionButtonProps = ActionContentProps & Omit<ComponentProps<"button">, "children">;

export function HeaderActionButton({ icon, label, badge, className, ...props }: HeaderActionButtonProps) {
  return (
    <button type="button" className={cn(ACTION_CLASS, className)} {...props}>
      <ActionContent icon={icon} label={label} badge={badge} />
    </button>
  );
}
