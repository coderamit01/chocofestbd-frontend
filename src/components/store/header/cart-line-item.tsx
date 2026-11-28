import { Icon } from "@/components/shared/icon";
import { formatTaka } from "@/lib/utils";
import type { CartLine } from "@/types/store";
import { ProductThumb } from "./product-thumb";
import { QuantityStepper } from "@/components/store/ui/quantity-stepper";

type CartLineItemProps = {
  line: CartLine;
  onQuantityChange: (delta: number) => void;
  onRemove: () => void;
};

export function CartLineItem({ line, onQuantityChange, onRemove }: CartLineItemProps) {
  const { product, quantity } = line;
  return (
    <div className="flex items-start gap-3 border-b border-dashed border-[#ebe3dd] py-3.5">
      <ProductThumb color={product.color} className="size-16" />
      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="truncate text-sm font-medium text-ink">{product.name}</span>
        <span className="text-xs text-ink-3">
          {product.brand} · {formatTaka(product.price)}
        </span>
        <span className="flex items-center justify-between gap-2">
          <QuantityStepper
            size="xs"
            min={0}
            value={quantity}
            onChange={(next) => onQuantityChange(next - quantity)}
          />
          <b className="font-heading text-[15px] leading-none font-bold text-ink">
            {formatTaka(quantity * product.price)}
          </b>
        </span>
      </span>
      <button
        type="button"
        aria-label={`Remove ${product.name}`}
        onClick={onRemove}
        className="flex size-8 flex-none items-center justify-center rounded-sm text-[#b0a59f] hover:bg-[#fdeeec] hover:text-danger"
      >
        <Icon name="trash" size={16} strokeWidth={1.8} />
      </button>
    </div>
  );
}
