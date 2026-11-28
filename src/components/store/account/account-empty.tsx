import { Icon, type IconName } from "@/components/shared/icon";
import { StoreButton } from "@/components/store/ui/store-button";
import { StoreCard } from "@/components/store/ui/store-card";

type AccountEmptyProps = {
  icon: IconName;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
};

export function AccountEmpty({ icon, title, description, actionLabel, actionHref }: AccountEmptyProps) {
  return (
    <StoreCard className="flex flex-col items-center gap-2.5 py-10 text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-brand-50 text-brand">
        <Icon name={icon} size={26} strokeWidth={1.8} />
      </span>
      <h2 className="m-0 font-heading text-xl leading-[1.2] font-bold text-ink">{title}</h2>
      <p className="m-0 max-w-[420px] text-[13.5px] leading-[1.6] text-ink-2">{description}</p>
      {actionLabel && actionHref && (
        <StoreButton href={actionHref} size="sm" className="mt-1.5">
          {actionLabel}
        </StoreButton>
      )}
    </StoreCard>
  );
}
