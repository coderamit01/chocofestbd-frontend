import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ListingPage } from "@/components/store/listing/listing-page";
import { ListingSkeleton } from "@/components/store/listing/listing-skeleton";
import { buildListing, getListingScope, listingParam, listingScopeSlugs } from "@/lib/store-listing";
import type { ListingSearchParams } from "@/types/store-listing";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<ListingSearchParams>;
};

export function generateStaticParams() {
  return listingScopeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const scope = getListingScope((await params).slug);
  return { title: `${scope?.title ?? "Category not found"} | Chocofest BD` };
}

async function CategoryListing({ params, searchParams }: CategoryPageProps) {
  const [{ slug }, query] = await Promise.all([params, searchParams]);
  const scope = getListingScope(slug);
  if (!scope) notFound();

  const path = `/category/${slug}`;
  const subScope = getListingScope(listingParam(query.filter));
  const sub = subScope && subScope.slug !== slug ? subScope : undefined;
  const result = buildListing({ path, params: query, scope });
  const breadcrumbs = sub
    ? [{ label: "Home", href: "/" }, { label: scope.title, href: path }, { label: sub.title }]
    : [{ label: "Home", href: "/" }, { label: scope.title }];

  return <ListingPage title={sub?.title ?? scope.title} breadcrumbs={breadcrumbs} result={result} />;
}

export default function CategoryPage(props: CategoryPageProps) {
  return (
    <Suspense fallback={<ListingSkeleton />}>
      <CategoryListing {...props} />
    </Suspense>
  );
}
