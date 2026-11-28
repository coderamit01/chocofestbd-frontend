import { HomeSection } from "@/components/store/home/home-section";
import { RailScrollButtons } from "@/components/store/home/rail-scroll-buttons";
import { SectionHeading } from "@/components/store/home/section-heading";
import { SectionMoreLink } from "@/components/store/home/section-more-link";
import { ProductCard } from "@/components/store/product/product-card";
import type { HomeRail } from "@/types/store-home-rail";

export function ProductRail({ rail }: { rail: HomeRail }) {
  const titleId = `${rail.id}-title`;
  const rowId = `${rail.id}-row`;
  const buttons = <RailScrollButtons targetId={rowId} prevLabel={rail.prevLabel} nextLabel={rail.nextLabel} />;

  return (
    <HomeSection aria-labelledby={titleId} className="flow-root">
      <SectionHeading
        id={titleId}
        title={rail.title}
        actions={
          rail.more ? (
            <div className="flex items-center gap-4">
              <SectionMoreLink href={rail.more.href} label={rail.more.label} icon="arrowRight" />
              {buttons}
            </div>
          ) : (
            buttons
          )
        }
      />
      <div
        id={rowId}
        className="-mt-0.5 -mb-7 grid snap-x snap-mandatory auto-cols-[calc((100%-72px)/5)] grid-flow-col gap-4.5 overflow-x-auto pt-0.5 pb-7 min-[901px]:scrollbar-none max-[1180px]:auto-cols-[calc((100%-36px)/3)] max-[900px]:-mb-5.5 max-[900px]:auto-cols-[calc((100%-10px)/2.15)] max-[900px]:gap-2.5"
      >
        {rail.products.map((product) => (
          <ProductCard key={product.id} product={product} className="snap-start" />
        ))}
      </div>
    </HomeSection>
  );
}
