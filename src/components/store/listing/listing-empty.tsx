import { Icon } from "@/components/shared/icon";
import { StoreButton } from "@/components/store/ui/store-button";
import { LISTING_EMPTY } from "@/config/store-listing";

export function ListingEmpty({ clearHref }: { clearHref: string }) {
  return (
    <div className="flex flex-col items-center gap-2.5 rounded-[20px] border border-dashed border-[#e2dad4] bg-white px-5 py-[60px] text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-brand-50 text-brand">
        <Icon name="search" size={28} strokeWidth={1.8} />
      </span>
      <h3 className="m-0 font-heading text-[19px] leading-[1.2] font-bold tracking-normal text-ink">{LISTING_EMPTY.title}</h3>
      <p className="m-0 mb-1.5 font-sans text-[14px] text-ink-2">{LISTING_EMPTY.description}</p>
      <StoreButton href={clearHref} scroll={false}>
        {LISTING_EMPTY.action}
      </StoreButton>
    </div>
  );
}
