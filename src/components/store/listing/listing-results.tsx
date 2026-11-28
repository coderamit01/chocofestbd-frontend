import { ProductGrid } from "@/components/store/ui/product-grid";
import type { ListingResult } from "@/types/store-listing";
import { ListingEmpty } from "./listing-empty";
import { ListingRowCard } from "./listing-row-card";
import { LoadMore } from "./load-more";

type ListingResultsProps = Pick<ListingResult, "products" | "total" | "shown" | "moreHref" | "view"> & {
  clearHref: string;
};

export function ListingResults({ products, total, shown, moreHref, view, clearHref }: ListingResultsProps) {
  if (!total) return <ListingEmpty clearHref={clearHref} />;

  return (
    <>
      {view === "list" ? (
        <div className="grid grid-cols-2 gap-4 max-[700px]:grid-cols-1 max-[700px]:gap-2.5">
          {products.map((product) => (
            <ListingRowCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <ProductGrid products={products} columns={3} />
      )}
      <LoadMore shown={shown} total={total} href={moreHref} />
    </>
  );
}
