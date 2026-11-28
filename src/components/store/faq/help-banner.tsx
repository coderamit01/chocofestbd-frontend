import { cn } from "cn";
import { Icon, type IconName } from "@/components/shared/icon";
import { StoreButton } from "@/components/store/ui/store-button";

type HelpBannerProps = {
  title: string;
  text: string;
  icon?: IconName;
  href?: string;
  label?: string;
  className?: string;
};

export function HelpBanner({ title, text, icon, href = "/contact", label = "Contact us", className }: HelpBannerProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3 rounded-[18px] bg-brand-50 px-5 py-[18px] leading-[normal]", className)}>
      <b className="text-[15px] text-ink">{title}</b>
      <span className="min-w-[180px] flex-1 text-[13.5px] text-[#5f5450]">{text}</span>
      <StoreButton href={href} size="md">
        {icon && <Icon name={icon} size={16} strokeWidth={1.8} />}
        {label}
      </StoreButton>
    </div>
  );
}
