import { cn } from "cn";

type ProductBadgesProps = { discount: number; tag?: string; className?: string };

const badgeStyles = "px-2.5 py-1.5 font-sans text-[11.5px] leading-none font-semibold whitespace-nowrap text-white";

export function ProductBadges({ discount, tag, className }: ProductBadgesProps) {
  if (!discount && !tag) return null;

  return (
    <span className={cn("flex min-w-0 items-center overflow-hidden rounded-[16px_0_10px_0] bg-[#e8322b]", className)}>
      {discount > 0 && (
        <span className={cn(badgeStyles, "@max-[200px]:px-2 @max-[200px]:py-1.25 @max-[200px]:text-[10.5px]")}>
          -{discount}%
        </span>
      )}
      {tag && (
        <span className={cn(badgeStyles, "overflow-hidden text-ellipsis", discount > 0 && "border-l border-white/35")}>
          {tag}
        </span>
      )}
    </span>
  );
}
