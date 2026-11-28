import Image from "next/image";
import Link from "next/link";
import { cn } from "cn";
import { Icon, type IconName } from "@/components/shared/icon";
import { QuantityStepper } from "@/components/store/ui/quantity-stepper";
import { CART_MAX_QUANTITY } from "@/config/store-cart";
import { lineSaving, lineTotal } from "@/lib/store-cart";
import { isLowStock, productHref } from "@/lib/store-product";
import { formatTaka } from "@/lib/utils";
import type { CartLine } from "@/types/store-cart";

type CartRowProps = {
  line: CartLine;
  onQuantity: (quantity: number) => void;
  onRemove: () => void;
  onSave: () => void;
};

type RowActionProps = {
  icon: IconName;
  label: string;
  danger?: boolean;
  onClick: () => void;
};

function RowAction({ icon, label, danger, onClick }: RowActionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex cursor-pointer items-center gap-[5px] border-0 bg-transparent p-0 font-sans text-[12.5px] leading-none font-medium text-[#8a7f79]",
        danger ? "hover:text-[#d92d20]" : "hover:text-brand-text",
      )}
    >
      <Icon name={icon} size={14} strokeWidth={1.8} />
      {label}
    </button>
  );
}

export function CartRow({ line, onQuantity, onRemove, onSave }: CartRowProps) {
  const { product, quantity } = line;
  const href = productHref(product);
  const saving = lineSaving(line);

  return (
    <div className="grid grid-cols-[96px_minmax(0,1fr)_110px_130px_120px] items-center gap-4 px-5 py-4 [&+&]:border-t [&+&]:border-[#f4efeb] max-[900px]:grid-cols-[76px_1fr_auto] max-[900px]:gap-x-3 max-[900px]:gap-y-1 max-[900px]:p-3.5 max-[900px]:[grid-template-areas:'img_info_info'_'img_up_qty']">
      <Link
        href={href}
        className="relative flex size-24 items-center justify-center overflow-hidden rounded-2xl max-[900px]:size-[76px] max-[900px]:self-start max-[900px]:[grid-area:img]"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="96px"
          loading="lazy"
          className="rounded-[inherit] object-contain p-[8%]"
        />
      </Link>
      <div className="flex min-w-0 flex-col gap-[3px] max-[900px]:[grid-area:info]">
        <span className="text-[11.5px] font-semibold tracking-[0.05em] text-brand-text uppercase">{product.brand}</span>
        <Link
          href={href}
          className="font-sans text-[15px] leading-[1.35] font-medium text-ink no-underline hover:text-brand max-[900px]:text-sm"
        >
          {product.name}
        </Link>
        <span className="text-[12.5px] text-[#8a7f79]">
          {product.size}
          {isLowStock(product) && <b className="font-medium text-brand-text"> · Only {product.stock} left</b>}
        </span>
        <span className="mt-1.5 flex gap-3.5 max-[900px]:gap-3">
          <RowAction icon="heart" label="Save for later" onClick={onSave} />
          <RowAction icon="trash" label="Remove" danger onClick={onRemove} />
        </span>
      </div>
      <div className="flex flex-col gap-0.5 max-[900px]:self-center max-[900px]:[grid-area:up]">
        <b className="font-sans text-[15px] leading-none font-semibold">{formatTaka(product.price)}</b>
        {product.oldPrice ? <s className="text-xs text-[#a69b95]">{formatTaka(product.oldPrice)}</s> : null}
      </div>
      <QuantityStepper
        size="sm"
        value={quantity}
        min={0}
        max={CART_MAX_QUANTITY}
        label={`Quantity of ${product.name}`}
        onChange={onQuantity}
        className="max-[900px]:[grid-area:qty]"
      />
      <div className="flex flex-col gap-[3px] text-right max-[900px]:hidden">
        <b className="font-heading text-[17px] leading-none font-bold">{formatTaka(lineTotal(line))}</b>
        {saving > 0 && <small className="text-[11.5px] text-[#1f8a4c]">You save {formatTaka(saving)}</small>}
      </div>
    </div>
  );
}
