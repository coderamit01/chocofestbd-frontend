import { BestSelling } from "@/components/store/home/best-selling";
import { BrandGrid } from "@/components/store/home/brand-grid";
import { CategoryCarousel } from "@/components/store/home/category-carousel";
import { HeroBanner } from "@/components/store/home/hero-banner";
import { KitkatRail, LindtRail, NewArrivalsRail, RecommendedRail } from "@/components/store/home/home-product-rails";
import { OfferForYou } from "@/components/store/home/offer-for-you";
import { PromoBanners } from "@/components/store/home/promo-banners";
import { ReviewsCarousel } from "@/components/store/home/reviews-carousel";
import { TrustBand } from "@/components/store/footer/trust-band";
import { FOOTER_TRUST_ITEMS } from "@/config/store-footer";

export default function HomePage() {
  return (
    <>
      <div className="pb-10">
        <HeroBanner />
        <CategoryCarousel />
        <BestSelling />
        <OfferForYou />
        <NewArrivalsRail />
        <LindtRail />
        <BrandGrid />
        <KitkatRail />
        <PromoBanners />
        <RecommendedRail />
        <ReviewsCarousel />
      </div>
      <TrustBand items={FOOTER_TRUST_ITEMS} />
    </>
  );
}
