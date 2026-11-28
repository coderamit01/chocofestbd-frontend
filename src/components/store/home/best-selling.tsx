import { BestSellingCard } from "@/components/store/home/best-selling-card";
import { HomeSection } from "@/components/store/home/home-section";
import { SectionTitle } from "@/components/store/home/section-heading";
import { BEST_SELLING } from "@/config/store-home";
import { bestSellingProducts } from "@/lib/store-home-products";

export function BestSelling() {
  const products = bestSellingProducts(BEST_SELLING.count);

  return (
    <HomeSection>
      <SectionTitle className="mb-[22px] flex text-[30px] leading-[1.2] font-semibold tracking-normal max-[900px]:text-[30px] max-[700px]:mb-3.5 max-[700px]:text-[22px]">
        {BEST_SELLING.title}
      </SectionTitle>
      <div className="grid grid-cols-3 gap-5 max-[1180px]:grid-cols-2 max-[700px]:grid-cols-1 max-[700px]:gap-3">
        {products.map((product, index) => (
          <BestSellingCard
            key={product.id}
            product={product}
            ribbon={index < BEST_SELLING.ribbonCount ? BEST_SELLING.ribbon : undefined}
          />
        ))}
      </div>
    </HomeSection>
  );
}
