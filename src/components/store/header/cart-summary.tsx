import Link from "next/link";
import { Icon } from "@/components/shared/icon";
import { DEFAULT_DELIVERY_AREA, STORE_ROUTES } from "@/config/store-header";
import { formatTaka } from "@/lib/utils";
import { storeButtonClass } from "./store-button";

type CartSummaryProps = {
  subtotal: number;
  onNavigate: () => void;
};

export function CartSummary({ subtotal, onNavigate }: CartSummaryProps) {
  return (
    <div className="flex flex-col gap-2.5 border-t border-[#f0ebe6] bg-white px-5 py-[18px]">
      <div className="flex items-center justify-between">
        <span className="text-[12.5px] text-ink-3">Subtotal</span>
        <b className="font-heading text-xl leading-none font-bold">{formatTaka(subtotal)}</b>
      </div>
      <span className="text-xs text-ink-3">
        Delivery {formatTaka(DEFAULT_DELIVERY_AREA.fee)} to {DEFAULT_DELIVERY_AREA.name} · calculated at checkout. Cash
        on delivery available.
      </span>
      <div className="mt-1 grid grid-cols-[1fr_1.3fr] gap-2.5">
        <Link href={STORE_ROUTES.cart} onClick={onNavigate} className={storeButtonClass("ghost")}>
          View cart
        </Link>
        <Link href={STORE_ROUTES.checkout} onClick={onNavigate} className={storeButtonClass("primary")}>
          Checkout
          <Icon name="arrowRight" size={16} strokeWidth={1.8} />
        </Link>
      </div>
    </div>
  );
}
