/* eslint-disable @next/next/no-img-element */
import { productMonogram, productTint } from "@/lib/product-display";
import { cn } from "@/lib/utils";
import type { AdminProduct } from "@/types/product";

type ProductThumbProps = {
  product: Pick<AdminProduct, "id" | "name" | "thumbnail">;
  className?: string;
  children?: React.ReactNode;
};

export function ProductThumb({ product, className, children }: ProductThumbProps) {
  return (
    <span
      className={cn("relative flex flex-none items-center justify-center overflow-hidden font-heading font-bold", className)}
      style={product.thumbnail ? undefined : productTint(product.id)}
    >
      {product.thumbnail ? (
        <img src={product.thumbnail} alt="" className="size-full object-cover" />
      ) : (
        productMonogram(product.name)
      )}
      {children}
    </span>
  );
}
