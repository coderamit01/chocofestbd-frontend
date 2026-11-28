import { SectionMoreLink } from "@/components/store/home/section-more-link";
import { PageSection } from "@/components/store/ui/page-section";
import { ProductGrid } from "@/components/store/ui/product-grid";
import { getDealProducts } from "@/lib/store-offers";

export function DealProducts() {
  return (
    <PageSection title="On sale now" action={<SectionMoreLink href="/shop" label="Filter all deals" />}>
      <ProductGrid products={getDealProducts()} />
    </PageSection>
  );
}
