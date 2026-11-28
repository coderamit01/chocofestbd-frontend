import { PageContainer } from "@/components/store/ui/page-container";
import { PageSection } from "@/components/store/ui/page-section";
import { ProductGrid } from "@/components/store/ui/product-grid";
import { NOT_FOUND_LINKS } from "@/config/store-not-found";
import { getNotFoundPicks } from "@/lib/store-not-found";
import { NotFoundDigits } from "./not-found-digits";
import { NotFoundLinks } from "./not-found-links";
import { NotFoundSearch } from "./not-found-search";

export function StoreNotFound() {
  return (
    <PageContainer page>
      <section className="flex flex-col items-center gap-3.5 pt-10 pb-2.5 text-center leading-[normal]">
        <NotFoundDigits />
        <h1 className="mt-5 mb-0 font-heading text-[32px] leading-[1.2] font-bold tracking-normal text-ink max-[900px]:text-[24px]">
          This page melted away.
        </h1>
        <p className="m-0 max-w-[480px] text-base leading-[1.6] text-[#5f5450]">
          The link may be old, or the product sold out and moved. Try searching, or pick up where most people go next.
        </p>
        <NotFoundSearch />
        <NotFoundLinks links={NOT_FOUND_LINKS} />
      </section>
      <PageSection title="Popular right now">
        <ProductGrid products={getNotFoundPicks()} />
      </PageSection>
    </PageContainer>
  );
}
