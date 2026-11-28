import { cn } from "cn";
import { ProductCard } from "@/components/store/product/product-card";
import type { StoreProduct } from "@/types/store-product";

const COLUMNS = {
  4: {
    grid: "grid-cols-4 max-[1180px]:grid-cols-3",
    sizes: "(max-width: 900px) 45vw, (max-width: 1180px) 30vw, 300px",
  },
  3: {
    grid: "grid-cols-3 max-[1180px]:grid-cols-2",
    sizes: "(max-width: 900px) 45vw, (max-width: 1180px) 40vw, 300px",
  },
};

type ProductGridProps = {
  products: StoreProduct[];
  columns?: keyof typeof COLUMNS;
  wishlisted?: boolean;
  className?: string;
};

export function ProductGrid({ products, columns = 4, wishlisted, className }: ProductGridProps) {
  return (
    <div
      className={cn("grid gap-[18px] max-[900px]:grid-cols-2 max-[900px]:gap-2.5", COLUMNS[columns].grid, className)}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} sizes={COLUMNS[columns].sizes} wishlisted={wishlisted} />
      ))}
    </div>
  );
}
