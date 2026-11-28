import Image from "next/image";
import { cn } from "cn";
import type { ProductGalleryView } from "@/types/store-product-detail";

type GalleryThumbProps = {
  view: ProductGalleryView;
  active: boolean;
  onSelect: () => void;
};

export function GalleryThumb({ view, active, onSelect }: GalleryThumbProps) {
  return (
    <button
      type="button"
      aria-label={view.label}
      aria-pressed={active}
      onClick={onSelect}
      className={cn(
        "relative flex size-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-[16px] border-2 border-transparent bg-transparent p-0 shadow-[inset_0_0_0_1px_#f0ebe6] focus-visible:shadow-focus",
        "max-[900px]:size-[50px] max-[900px]:flex-none max-[900px]:rounded-[14px] max-[900px]:bg-white/70 max-[900px]:shadow-[0_2px_8px_rgba(34,21,16,0.08)] max-[900px]:backdrop-blur-[4px]",
        active && "border-brand max-[900px]:bg-white",
      )}
    >
      <Image src={view.image} alt="" fill sizes="84px" className="rounded-[13px] object-contain p-[10%]" />
    </button>
  );
}
