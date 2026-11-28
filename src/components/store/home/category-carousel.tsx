import { CategoryRail } from "@/components/store/home/category-rail";
import { HomeSection } from "@/components/store/home/home-section";
import { SectionHeading } from "@/components/store/home/section-heading";
import { SectionMoreLink } from "@/components/store/home/section-more-link";
import { CATEGORY_SECTION, HOME_CATEGORIES } from "@/config/store-home";

export function CategoryCarousel() {
  return (
    <HomeSection>
      <SectionHeading
        title={CATEGORY_SECTION.title}
        actions={<SectionMoreLink href={CATEGORY_SECTION.moreHref} label={CATEGORY_SECTION.moreLabel} />}
      />
      <CategoryRail categories={HOME_CATEGORIES} />
    </HomeSection>
  );
}
