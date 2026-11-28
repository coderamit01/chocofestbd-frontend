import { Icon } from "@/components/shared/icon";

type GalleryBadgesProps = {
  discount: number;
  tag?: string;
};

export function GalleryBadges({ discount, tag }: GalleryBadgesProps) {
  if (!discount && !tag) return null;

  return (
    <span className="absolute top-[18px] left-[18px] z-2 flex gap-2 max-[900px]:top-auto max-[900px]:bottom-3.5 max-[900px]:left-3.5">
      {discount > 0 && (
        <span className="rounded-[10px] bg-brand px-2.5 py-[7px] font-sans text-[13px] leading-none font-bold text-white">
          -{discount}%
        </span>
      )}
      {tag && (
        <span className="inline-flex items-center gap-1 rounded-[10px] bg-choco px-2.5 py-[7px] font-sans text-xs leading-none font-semibold text-white">
          <Icon name="star" size={13} strokeWidth={1.8} />
          {tag}
        </span>
      )}
    </span>
  );
}
