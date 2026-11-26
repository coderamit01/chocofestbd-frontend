import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { productEditPath } from "@/config/products";
import { productPrice, productRating, productStatus, productStock } from "@/lib/product-display";
import { cn } from "@/lib/utils";
import type { AdminProduct } from "@/types/product";
import { ProductThumb } from "./product-thumb";

type ProductsGridProps = {
  products: AdminProduct[];
  selected: Set<string>;
  onToggle: (id: string) => void;
};

export function ProductsGrid({ products, selected, onToggle }: ProductsGridProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(min(230px,100%),1fr))] gap-4.5">
      {products.map((product) => {
        const on = selected.has(product.id);
        const price = productPrice(product);
        const stock = productStock(product);
        const status = productStatus(product);

        return (
          <article key={product.id} className={cn("rounded-xl border bg-surface p-2.5", on ? "border-brand" : "border-line")}>
            <ProductThumb product={product} className="h-42 w-full rounded-[12px] text-[34px] leading-none">
              <label className="absolute top-2.5 left-2.5 flex rounded-[7px] bg-surface p-[5px]">
                <input
                  type="checkbox"
                  aria-label={`Select ${product.name}`}
                  checked={on}
                  onChange={() => onToggle(product.id)}
                />
              </label>
              {product.isFeatured && (
                <Badge size="sm" className="absolute top-2.5 right-2.5">
                  Featured
                </Badge>
              )}
            </ProductThumb>
            <div className="flex flex-col gap-2 px-1 pt-3.5 pb-1">
              <Link href={productEditPath(product.id)} className="font-medium text-ink">
                {product.name}
              </Link>
              <div className="flex items-center gap-2">
                <span className="font-heading text-[17px] leading-none font-semibold tabular-nums">{price.now}</span>
                {price.was && <s className="text-xs text-ink-3">{price.was}</s>}
                <span className="flex-1" />
                <span className="text-[12.5px] text-ink-3">
                  <span className="text-[#f0a500]">★</span> {productRating(product)}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <Badge variant={status.variant}>{status.label}</Badge>
                <Badge variant={stock.variant}>{stock.label}</Badge>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
