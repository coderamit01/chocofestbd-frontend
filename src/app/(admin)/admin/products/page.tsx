import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductsManager } from "@/components/admin/products/products-manager";
import { ProductsSkeleton } from "@/components/admin/products/products-skeleton";
import { AccessDenied } from "@/components/shared/access-denied";
import { Icon } from "@/components/shared/icon";
import { PRODUCT_ROLES, PRODUCT_TRASH_ROLES } from "@/config/products";
import { ApiError } from "@/lib/api-client";
import { getCurrentUser } from "@/lib/current-user";
import { parseProductsQuery } from "@/lib/product-query";
import { ProductService } from "@/services/product.service";
import type { ProductsQuery } from "@/types/product";

export const metadata: Metadata = {
  title: "Products | Chocofest BD",
};

type ProductsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

async function loadProducts(query: ProductsQuery) {
  try {
    const [list, summary] = await Promise.all([ProductService.getProducts(query), ProductService.getSummary()]);
    return { products: list.data ?? [], meta: list.meta, summary: summary.data, error: null };
  } catch (error) {
    return {
      products: [],
      meta: undefined,
      summary: undefined,
      error: error instanceof ApiError ? error.message : "Something went wrong while loading products. Please refresh the page.",
    };
  }
}

async function ProductsSection({ searchParams }: ProductsPageProps) {
  const [currentUser, params] = await Promise.all([getCurrentUser(), searchParams]);

  if (!currentUser?.role || !PRODUCT_ROLES.includes(currentUser.role)) {
    return <AccessDenied message="Products are only for the catalog team." />;
  }

  const canTrash = PRODUCT_TRASH_ROLES.includes(currentUser.role);
  const parsed = parseProductsQuery(params);
  const query = parsed.tab === "trash" && !canTrash ? { ...parsed, tab: "all" as const } : parsed;
  const { products, meta, summary, error } = await loadProducts(query);

  if (error || !summary) {
    return (
      <section className="flex flex-col items-center gap-3 rounded-xl bg-card px-6 py-16 text-center">
        <span className="flex size-12 items-center justify-center rounded-xl bg-danger-soft text-danger">
          <Icon name="ban" size={22} strokeWidth={1.8} />
        </span>
        <p className="font-medium text-ink">Couldn’t load products</p>
        <p className="max-w-sm text-caption text-ink-3">{error}</p>
      </section>
    );
  }

  return <ProductsManager products={products} meta={meta} summary={summary} query={query} canTrash={canTrash} />;
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
  return (
    <Suspense fallback={<ProductsSkeleton />}>
      <ProductsSection searchParams={searchParams} />
    </Suspense>
  );
}
