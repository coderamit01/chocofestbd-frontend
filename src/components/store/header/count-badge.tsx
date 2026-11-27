import { cn } from "cn";

type CountBadgeProps = {
  count: number;
  size?: "md" | "sm";
  className?: string;
};

const SIZES = {
  md: "h-[18px] min-w-[18px] px-[5px] text-[10.5px] leading-[18px]",
  sm: "h-4 min-w-4 px-1 text-[10px] leading-4",
};

export function CountBadge({ count, size = "md", className }: CountBadgeProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute box-content rounded-full border-2 border-white bg-brand text-center font-sans font-semibold text-white",
        SIZES[size],
        className,
      )}
    >
      {count}
    </span>
  );
}
