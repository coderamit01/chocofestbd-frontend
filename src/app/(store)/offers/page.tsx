import type { Metadata } from "next";
import { CouponGrid } from "@/components/store/offers/coupon-grid";
import { DealProducts } from "@/components/store/offers/deal-products";
import { Breadcrumbs } from "@/components/store/ui/breadcrumbs";
import { PageContainer } from "@/components/store/ui/page-container";
import { PageHero } from "@/components/store/ui/page-hero";
import { STORE_COUPONS } from "@/config/store-offers";

export const metadata: Metadata = {
  title: "Today’s offers & coupons | Chocofest BD",
  description: "Every active deal in one place. Coupons apply at checkout — tap to copy.",
};

export default function OffersPage() {
  return (
    <PageContainer page>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Offers" }]} />
      <PageHero
        kicker="Updated daily"
        title="Today’s offers & coupons"
        description="Every active deal in one place. Coupons apply at checkout — tap to copy."
      />
      <CouponGrid coupons={STORE_COUPONS} />
      <DealProducts />
    </PageContainer>
  );
}
