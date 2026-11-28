import type { Metadata } from "next";
import { Suspense } from "react";
import { ListingPage } from "@/components/store/listing/listing-page";
import { ListingSkeleton } from "@/components/store/listing/listing-skeleton";
import { LISTING_ALL_TITLE, LISTING_SEARCH_TITLE } from "@/config/store-listing";
import { buildListing, getListingScope, listingParam } from "@/lib/store-listing";
import type { ListingSearchParams } from "@/types/store-listing";

type ShopPageProps = {
  searchParams: Promise<ListingSearchParams>;
};

export async function generateMetadata({ searchParams }: ShopPageProps): Promise<Metadata> {
  const query = listingParam((await searchParams).q);
  return { title: query ? `Search results for “${query}” | Chocofest BD` : "Shop all products | Chocofest BD" };
}

async function ShopListing({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const result = buildListing({ path: "/shop", params });
  const title = result.query
    ? LISTING_SEARCH_TITLE
    : (getListingScope(listingParam(params.category))?.title ?? LISTING_ALL_TITLE);

  return <ListingPage title={title} breadcrumbs={[{ label: "Home", href: "/" }, { label: title }]} result={result} />;
}

export default function ShopPage({ searchParams }: ShopPageProps) {
  return (
    <Suspense fallback={<ListingSkeleton />}>
      <ShopListing searchParams={searchParams} />
    </Suspense>
  );
}
