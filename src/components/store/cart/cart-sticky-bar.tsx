import { Icon } from "@/components/shared/icon";
import { MobileStickyBar } from "@/components/store/ui/mobile-sticky-bar";
import { StoreButton } from "@/components/store/ui/store-button";
import { pluralItems } from "@/lib/store-cart";
import { formatTaka } from "@/lib/utils";

type CartStickyBarProps = {
  count: number;
  total: number;
};

export function CartStickyBar({ count, total }: CartStickyBarProps) {
  return (
    <MobileStickyBar offset="nav" className="mx-0">
      <span className="flex flex-1 flex-col gap-px">
        <small className="text-[11.5px] text-[#8a7f79]">Total · {pluralItems(count)}</small>
        <b>{formatTaka(total)}</b>
      </span>
      <StoreButton href="/checkout" className="h-12 px-[22px]">
        Checkout
        <Icon name="arrowRight" size={16} strokeWidth={1.8} />
      </StoreButton>
    </MobileStickyBar>
  );
}
