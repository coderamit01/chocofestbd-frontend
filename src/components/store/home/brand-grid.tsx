import { BrandTile } from "@/components/store/home/brand-tile";
import { HomeSection } from "@/components/store/home/home-section";
import { SectionHeading } from "@/components/store/home/section-heading";
import { SectionMoreLink } from "@/components/store/home/section-more-link";
import { BRAND_SECTION, HOME_BRANDS } from "@/config/store-home";

export function BrandGrid() {
  return (
    <HomeSection>
      <SectionHeading
        title={BRAND_SECTION.title}
        actions={<SectionMoreLink href={BRAND_SECTION.moreHref} label={BRAND_SECTION.moreLabel} />}
      />
      <div className="grid grid-cols-8 gap-[18px] max-[1180px]:grid-cols-4 max-[900px]:gap-2">
        {HOME_BRANDS.map((brand) => (
          <BrandTile key={brand.name} brand={brand} />
        ))}
      </div>
    </HomeSection>
  );
}
