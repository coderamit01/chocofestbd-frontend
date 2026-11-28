import { Icon } from "@/components/shared/icon";
import { TextLink } from "@/components/store/ui/text-link";
import { CartRow } from "@/components/store/cart/cart-row";
import type { CartLine } from "@/types/store-cart";

const COLUMNS = ["Product", "Price", "Quantity", "Total"];

type CartItemsBoxProps = {
  lines: CartLine[];
  removedName?: string;
  onQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
  onSave: (productId: number) => void;
  onUndo: () => void;
};

export function CartItemsBox({ lines, removedName, onQuantity, onRemove, onSave, onUndo }: CartItemsBoxProps) {
  return (
    <div className="overflow-hidden rounded-[20px] border border-[#f0ebe6] bg-white">
      <div className="grid grid-cols-[minmax(0,1fr)_110px_130px_120px] items-center gap-4 border-b border-[#f0ebe6] bg-[#faf7f5] px-5 py-3 text-xs tracking-[0.06em] text-[#8a7f79] uppercase max-[900px]:hidden">
        {COLUMNS.map((column) => (
          <span key={column} className="last:text-right">
            {column}
          </span>
        ))}
      </div>
      {lines.map((line) => (
        <CartRow
          key={line.product.id}
          line={line}
          onQuantity={(quantity) => onQuantity(line.product.id, quantity)}
          onRemove={() => onRemove(line.product.id)}
          onSave={() => onSave(line.product.id)}
        />
      ))}
      {removedName && (
        <div className="flex items-center gap-2 border-t border-dashed border-[#ffd0b5] bg-[#fffaf6] px-5 py-3 text-[13.5px] text-ink-2">
          <Icon name="info" size={16} strokeWidth={1.8} className="text-brand" />
          <span>
            Removed <b>{removedName}</b>
          </span>
          <TextLink onClick={onUndo} className="ml-auto">
            Undo
          </TextLink>
        </div>
      )}
    </div>
  );
}
