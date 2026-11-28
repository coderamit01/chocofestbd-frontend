import { cn } from "cn";
import { Icon } from "@/components/shared/icon";

type GalleryArrowProps = {
  direction: "prev" | "next";
  onClick: () => void;
};

export function GalleryArrow({ direction, onClick }: GalleryArrowProps) {
  const prev = direction === "prev";

  return (
    <button
      type="button"
      aria-label={prev ? "Previous image" : "Next image"}
      onClick={onClick}
      className={cn(
        "absolute top-1/2 -mt-[22px] flex size-11 cursor-pointer items-center justify-center rounded-full border-0 bg-white text-[#3f3531] opacity-0 shadow-[0_4px_14px_rgba(34,21,16,0.15)] transition-opacity duration-200 group-hover/main:opacity-100 focus-visible:opacity-100 max-[900px]:hidden",
        prev ? "left-4" : "right-4",
      )}
    >
      <Icon name={prev ? "chevronLeft" : "chevronRight"} size={20} strokeWidth={1.8} />
    </button>
  );
}
