import { SectionMoreLink } from "@/components/store/home/section-more-link";
import { PageSection } from "@/components/store/ui/page-section";
import type { StoreProduct } from "@/types/store-product";
import { ProductRailRow } from "./product-rail-row";

type RelatedProductsProps = {
  products: StoreProduct[];
  moreHref: string;
};

export function RelatedProducts({ products, moreHref }: RelatedProductsProps) {
  return (
    <PageSection title="You may also like" action={<SectionMoreLink href={moreHref} label="See all" />}>
      <ProductRailRow products={products} />
    </PageSection>
  );
}
