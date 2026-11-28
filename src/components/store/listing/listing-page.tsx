import { Breadcrumbs, type BreadcrumbItem } from "@/components/store/ui/breadcrumbs";
import { PageContainer } from "@/components/store/ui/page-container";
import type { ListingResult } from "@/types/store-listing";
import { ActiveFilterChips } from "./active-filter-chips";
import { FilterSidebar } from "./filter-sidebar";
import { ListingResults } from "./listing-results";
import { ListingToolbar } from "./listing-toolbar";
import { MobileListingBar } from "./mobile-listing-bar";

type ListingPageProps = {
  title: string;
  breadcrumbs: BreadcrumbItem[];
  result: ListingResult;
};

export function ListingPage({ title, breadcrumbs, result }: ListingPageProps) {
  const { filters, sorts, total } = result;

  return (
    <PageContainer page>
      <Breadcrumbs items={breadcrumbs} />
      <header className="flex flex-col gap-4 pt-2 pb-[22px] max-[900px]:gap-3 max-[900px]:pt-1 max-[900px]:pb-3.5">
        <div>
          <h1 className="m-0 font-heading text-[36px] leading-[1.1] font-bold tracking-[-0.02em] text-ink max-[900px]:text-[26px]">
            {title}
          </h1>
        </div>
        <MobileListingBar filters={filters} sorts={sorts} sortLabel={result.sortLabel} total={total} />
      </header>
      <div className="grid grid-cols-[272px_1fr] items-start gap-6 max-[900px]:grid-cols-1 max-[900px]:gap-0">
        <FilterSidebar filters={filters} />
        <section className="flex min-w-0 flex-col gap-3.5">
          <ListingToolbar total={total} query={result.query} sorts={sorts} view={result.view} views={result.views} />
          <ActiveFilterChips chips={filters.chips} clearHref={filters.clearHref} />
          <ListingResults
            products={result.products}
            total={total}
            shown={result.shown}
            moreHref={result.moreHref}
            view={result.view}
            clearHref={filters.clearHref}
          />
        </section>
      </div>
    </PageContainer>
  );
}
