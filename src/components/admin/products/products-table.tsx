import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ToggleSwitch } from "@/components/shared/toggle-switch";
import { productEditPath } from "@/config/products";
import { productPrice, productRating, productStatus, productStock } from "@/lib/product-display";
import { tableStyles } from "@/lib/table-styles";
import { cn } from "@/lib/utils";
import type { AdminProduct } from "@/types/product";
import { CopySkuButton } from "./copy-sku-button";
import { ProductRowMenu, type ProductMenuAction } from "./product-row-menu";
import { ProductThumb } from "./product-thumb";

const headClass = tableStyles.head;

type ProductsTableProps = {
  products: AdminProduct[];
  selected: Set<string>;
  canTrash: boolean;
  isPending: boolean;
  onToggle: (id: string) => void;
  onToggleAll: () => void;
  onFeatured: (product: AdminProduct, featured: boolean) => void;
  onAction: (action: ProductMenuAction, product: AdminProduct) => void;
};

export function ProductsTable({ products, selected, canTrash, isPending, onToggle, onToggleAll, onFeatured, onAction }: ProductsTableProps) {
  const allOn = products.length > 0 && products.every((product) => selected.has(product.id));

  return (
    <div className={tableStyles.wrapper}>
      <table className={tableStyles.table}>
        <thead>
          <tr>
            <th className={cn(headClass, "w-11")}>
              <input type="checkbox" aria-label="Select all" checked={allOn} onChange={onToggleAll} />
            </th>
            <th className={headClass}>Product name</th>
            <th className={headClass}>Category</th>
            <th className={headClass}>Brand</th>
            <th className={cn(headClass, "text-right")}>Price</th>
            <th className={headClass}>Stock</th>
            <th className={headClass}>Status</th>
            <th className={cn(headClass, "text-right")}>Sold</th>
            <th className={headClass}>Rating</th>
            <th className={headClass}>Featured</th>
            <th className={cn(headClass, "text-right")}>
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className={tableStyles.body}>
          {products.map((product) => {
            const on = selected.has(product.id);
            const price = productPrice(product);
            const stock = productStock(product);
            const status = productStatus(product);
            const cell = cn(tableStyles.cell, on && "bg-brand-50");

            return (
              <tr key={product.id} className={tableStyles.row}>
                <td className={cn(tableStyles.bareCell, on && "bg-brand-50")}>
                  <input
                    type="checkbox"
                    aria-label={`Select ${product.name}`}
                    checked={on}
                    onChange={() => onToggle(product.id)}
                  />
                </td>
                <td className={cell} data-label="Product">
                  <span className="flex min-w-60 items-center gap-3">
                    <ProductThumb product={product} className="size-11 rounded-[10px] text-[13px] leading-none" />
                    <span className="flex flex-col text-left">
                      <Link href={productEditPath(product.id)} className="font-medium text-ink">
                        {product.name}
                      </Link>
                      <span className="flex items-center gap-1">
                        <span className="text-xs text-ink-3">{product.sku}</span>
                        <CopySkuButton sku={product.sku} />
                      </span>
                    </span>
                  </span>
                </td>
                <td className={cn(cell, "text-[13.5px] text-ink-2")} data-label="Category">
                  {product.category?.name ?? "—"}
                </td>
                <td className={cn(cell, "text-[13.5px]")} data-label="Brand">
                  {product.brand?.name ?? "—"}
                </td>
                <td className={cn(cell, "text-right whitespace-nowrap tabular-nums")} data-label="Price">
                  <span className="flex flex-col items-end">
                    <span className="font-semibold">{price.now}</span>
                    {price.was && <s className="text-xs text-ink-3">{price.was}</s>}
                  </span>
                </td>
                <td className={cell} data-label="Stock">
                  <Badge variant={stock.variant}>{stock.label}</Badge>
                </td>
                <td className={cell} data-label="Status">
                  <Badge variant={status.variant}>{status.label}</Badge>
                </td>
                <td className={cn(cell, "text-right tabular-nums")} data-label="Sold">
                  {(product.soldCount ?? 0).toLocaleString("en-IN")}
                </td>
                <td className={cn(cell, "text-[13.5px] whitespace-nowrap")} data-label="Rating">
                  <span className="text-[#f0a500]" aria-hidden="true">
                    ★
                  </span>{" "}
                  {productRating(product)} <span className="text-ink-3">({product.reviewCount})</span>
                </td>
                <td className={cell} data-label="Featured">
                  <ToggleSwitch
                    ariaLabel={`Featured: ${product.name}`}
                    checked={product.isFeatured}
                    disabled={isPending || !!product.deletedAt}
                    onChange={(featured) => onFeatured(product, featured)}
                  />
                </td>
                <td className={cn(tableStyles.bareCell, on && "bg-brand-50")}>
                  <div className="flex justify-end">
                    <ProductRowMenu product={product} canTrash={canTrash} disabled={isPending} onAction={onAction} />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
