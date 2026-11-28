import { Breadcrumbs } from "@/components/store/ui/breadcrumbs";
import { PageContainer } from "@/components/store/ui/page-container";
import type { ProductDetail } from "@/types/store-product-detail";
import { ProductDetailProvider } from "./product-detail-provider";
import { ProductDetailsSection } from "./product-details-section";
import { ProductGallery } from "./product-gallery";
import { ProductInfo } from "./product-info";
import { ProductReviewsSection } from "./product-reviews-section";
import { ProductSectionNav } from "./product-section-nav";
import { ProductStickyBar } from "./product-sticky-bar";
import { RecentlyViewed } from "./recently-viewed";
import { RelatedProducts } from "./related-products";

export function ProductDetailView({ detail }: { detail: ProductDetail }) {
  const { product } = detail;

  return (
    <ProductDetailProvider productName={product.name}>
      <PageContainer page>
        <Breadcrumbs
          className="max-[900px]:hidden"
          items={[
            { label: "Home", href: "/" },
            { label: product.category, href: detail.categoryHref },
            { label: product.brand, href: detail.brandHref },
            { label: product.name },
          ]}
        />
        <div className="grid grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] items-start gap-7 pt-2 max-[900px]:grid-cols-1 max-[900px]:gap-0 max-[900px]:pt-0">
          <ProductGallery
            views={detail.gallery}
            discount={detail.discount}
            tag={product.tag}
            backHref={detail.categoryHref}
          />
          <ProductInfo detail={detail} />
        </div>
        <ProductSectionNav reviewCount={product.reviewCount} />
        <div className="mt-[18px] grid grid-cols-1 gap-[18px] max-[900px]:gap-3">
          <ProductDetailsSection detail={detail} />
          <ProductReviewsSection rating={product.rating} reviewCount={product.reviewCount} bars={detail.ratingBars} />
        </div>
        <RelatedProducts products={detail.related} moreHref={detail.categoryHref} />
        <RecentlyViewed products={detail.recent} />
        <ProductStickyBar />
      </PageContainer>
    </ProductDetailProvider>
  );
}
