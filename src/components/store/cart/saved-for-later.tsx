import { ProductThumb } from "@/components/store/ui/product-thumb";
import { StoreButton } from "@/components/store/ui/store-button";
import { formatTaka } from "@/lib/utils";
import type { StoreProduct } from "@/types/store-product";

type SavedForLaterProps = {
  products: StoreProduct[];
  onMove: (productId: number) => void;
};

export function SavedForLater({ products, onMove }: SavedForLaterProps) {
  return (
    <div className="rounded-[20px] border border-[#f0ebe6] bg-white px-5 py-[18px] max-[900px]:p-3.5">
      <h3 className="mb-2.5 font-heading text-[17px] leading-[1.2] font-bold">Saved for later ({products.length})</h3>
      <div className="flex flex-col gap-2">
        {products.map((product) => (
          <div key={product.id} className="flex items-center gap-3">
            <ProductThumb src={product.image} alt={product.name} />
            <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
              <b className="truncate text-sm font-medium">{product.name}</b>
              <span className="text-[13px] text-ink-2">{formatTaka(product.price)}</span>
            </span>
            <StoreButton variant="ghost" size="xs" onClick={() => onMove(product.id)}>
              Move to cart
            </StoreButton>
          </div>
        ))}
      </div>
    </div>
  );
}
