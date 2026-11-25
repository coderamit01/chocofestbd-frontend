import type { Metadata } from "next";
import { Suspense } from "react";
import { BrandsManager } from "@/components/admin/brands/brands-manager";
import { AccessDenied } from "@/components/shared/access-denied";
import { ListSkeleton } from "@/components/shared/list-skeleton";
import { LoadError } from "@/components/shared/load-error";
import { CATALOG_DELETE_ROLES, CATALOG_ROLES } from "@/config/catalog";
import { ApiError } from "@/lib/api-client";
import { getCurrentUser } from "@/lib/current-user";
import { BrandService } from "@/services/brand.service";

export const metadata: Metadata = {
  title: "Brands | Chocofest BD",
};

type BrandsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value)?.trim() || undefined;

async function loadBrands(page: number, search?: string) {
  try {
    const { data, meta } = await BrandService.getBrands({ page, search });
    return { brands: data ?? [], meta, error: null };
  } catch (error) {
    return {
      brands: [],
      meta: undefined,
      error: error instanceof ApiError ? error.message : "Something went wrong while loading brands. Please refresh the page.",
    };
  }
}

async function BrandsSection({ searchParams }: BrandsPageProps) {
  const [currentUser, params] = await Promise.all([getCurrentUser(), searchParams]);

  if (!currentUser?.role || !CATALOG_ROLES.includes(currentUser.role)) {
    return <AccessDenied message="Brands are only for the catalog team." />;
  }

  const search = first(params.search);
  const page = Math.max(1, Number(first(params.page)) || 1);
  const { brands, meta, error } = await loadBrands(page, search);

  if (error) return <LoadError title="Couldn’t load brands" message={error} />;

  return <BrandsManager brands={brands} meta={meta} search={search} canDelete={CATALOG_DELETE_ROLES.includes(currentUser.role)} />;
}

export default function BrandsPage({ searchParams }: BrandsPageProps) {
  return (
    <Suspense fallback={<ListSkeleton />}>
      <BrandsSection searchParams={searchParams} />
    </Suspense>
  );
}
