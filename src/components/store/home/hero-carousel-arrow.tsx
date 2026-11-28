import { cn } from "cn";
import { Icon } from "@/components/shared/icon";

type HeroCarouselArrowProps = { direction: "prev" | "next"; onClick: () => void };

export function HeroCarouselArrow({ direction, onClick }: HeroCarouselArrowProps) {
  const isPrev = direction === "prev";

  return (
    <button
      type="button"
      aria-label={isPrev ? "Previous banner" : "Next banner"}
      onClick={onClick}
      className={cn(
        "absolute top-1/2 z-2 -mt-[22px] flex size-11 cursor-pointer items-center justify-center rounded-full border-0 bg-white/88 text-ink opacity-0 shadow-[0_6px_18px_rgba(0,0,0,.18)] transition-opacity duration-200 ease-[ease] group-hover/hero:opacity-100 focus-visible:opacity-100 max-[900px]:hidden",
        isPrev ? "left-4" : "right-4",
      )}
    >
      <Icon name={isPrev ? "chevronLeft" : "chevronRight"} size={20} strokeWidth={1.8} />
    </button>
  );
}
