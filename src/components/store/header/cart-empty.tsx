import Link from "next/link";
import { STORE_ROUTES } from "@/config/store-header";
import { CategoryTile } from "./category-tile";
import { storeButtonClass } from "@/components/store/ui/store-button";

export function CartEmpty({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="flex flex-col items-center gap-2.5 px-2.5 py-12 text-center">
      <CategoryTile icon="cart" tone="brand" size={64} />
      <b className="font-semibold">Your cart is empty</b>
      <span className="text-[12.5px] text-ink-3">Treat yourself — best sellers start at ৳120.</span>
      <Link href={STORE_ROUTES.bestSellers} onClick={onNavigate} className={storeButtonClass()}>
        Browse best sellers
      </Link>
    </div>
  );
}
