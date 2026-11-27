import { cn } from "cn";
import { Icon, type IconName } from "@/components/shared/icon";
import type { TileTone } from "@/types/store";

const TONES: Record<TileTone, string> = {
  brand: "bg-brand-50 text-brand",
  rose: "bg-danger-soft text-danger",
  amber: "bg-warning-soft text-warning",
  sky: "bg-info-soft text-info",
  lav: "bg-lavender-soft text-lavender",
  mint: "bg-success-soft text-success",
};

type CategoryTileProps = {
  icon: IconName;
  tone: TileTone;
  size: number;
  className?: string;
  iconClassName?: string;
};

export function CategoryTile({ icon, tone, size, className, iconClassName }: CategoryTileProps) {
  return (
    <span
      style={{ width: size, height: size }}
      className={cn("flex flex-none items-center justify-center rounded-[36%]", TONES[tone], className)}
    >
      <Icon name={icon} size={24} strokeWidth={1.8} className={iconClassName} />
    </span>
  );
}
