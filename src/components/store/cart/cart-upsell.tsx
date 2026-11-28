import { Icon } from "@/components/shared/icon";
import { ProductThumb } from "@/components/store/ui/product-thumb";
import { SectionHeader } from "@/components/store/ui/section-header";
import { formatTaka } from "@/lib/utils";
import type { StoreProduct } from "@/types/store-product";

type CartUpsellProps = {
  products: StoreProduct[];
  onAdd: (product: StoreProduct) => void;
};

export function CartUpsell({ products, onAdd }: CartUpsellProps) {
  return (
    <div className="rounded-[20px] border border-[#f0ebe6] bg-white px-5 py-[18px] max-[900px]:p-3.5">
      <SectionHeader
        title="Add a little extra · under ৳500"
        className="mb-3"
        titleClassName="text-[19px] max-[900px]:text-[19px]"
      />
      <div className="grid grid-cols-2 gap-2.5 max-[900px]:grid-cols-1">
        {products.map((product) => (
          <div key={product.id} className="flex min-w-0 items-center gap-3 rounded-[14px] border border-[#f0ebe6] p-2">
            <ProductThumb src={product.image} alt={product.name} />
            <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
              <span className="truncate text-[13px] text-[#3f3531]">{product.name}</span>
              <b className="font-heading text-sm leading-none font-bold">{formatTaka(product.price)}</b>
            </span>
            <button
              type="button"
              aria-label={`Add ${product.name}`}
              onClick={() => onAdd(product)}
              className="flex size-9 flex-none cursor-pointer items-center justify-center rounded-[10px] border-[1.5px] border-brand bg-white text-brand hover:bg-brand hover:text-white"
            >
              <Icon name="plus" size={16} strokeWidth={1.8} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
