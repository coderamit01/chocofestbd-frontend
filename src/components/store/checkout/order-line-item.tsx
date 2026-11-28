import { ProductThumb } from "@/components/store/ui/product-thumb";
import { lineTotal } from "@/lib/store-cart";
import { formatTaka } from "@/lib/utils";
import type { CartLine } from "@/types/store-cart";

type OrderLineItemProps = {
  line: CartLine;
  showSize?: boolean;
};

export function OrderLineItem({ line, showSize = true }: OrderLineItemProps) {
  const { product, quantity } = line;
  return (
    <div className="flex items-center gap-3">
      <span className="relative">
        <ProductThumb src={product.image} alt={product.name} />
        <b className="absolute -top-1.5 -right-1.5 box-border h-5 min-w-5 rounded-full bg-choco px-[5px] text-center font-sans text-[11px] leading-5 font-semibold text-white">
          {quantity}
        </b>
      </span>
      {showSize ? (
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-[13.5px] leading-[1.3] font-medium">{product.name}</span>
          <small className="text-xs text-[#8a7f79]">{product.size}</small>
        </span>
      ) : (
        <span className="flex-1 text-[13.5px] leading-[1.3] font-medium">{product.name}</span>
      )}
      <b className="font-sans text-sm leading-none font-semibold whitespace-nowrap">{formatTaka(lineTotal(line))}</b>
    </div>
  );
}
