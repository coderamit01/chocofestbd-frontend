import { ProductCard } from "@/components/store/product/product-card";
import type { StoreProduct } from "@/types/store-product";

export function ProductRailRow({ products }: { products: StoreProduct[] }) {
  return (
    <div className="-mt-0.5 -mb-7 grid snap-x snap-mandatory auto-cols-[calc((100%-72px)/5)] grid-flow-col gap-4.5 overflow-x-auto pt-0.5 pb-7 min-[901px]:scrollbar-none max-[1180px]:auto-cols-[calc((100%-36px)/3)] max-[900px]:-mb-5.5 max-[900px]:auto-cols-[calc((100%-10px)/2.15)] max-[900px]:gap-2.5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} className="snap-start" />
      ))}
    </div>
  );
}
