import type { Metadata } from "next";
import { Suspense } from "react";
import { CategoriesManager } from "@/components/admin/categories/categories-manager";
import { AccessDenied } from "@/components/shared/access-denied";
import { ListSkeleton } from "@/components/shared/list-skeleton";
import { LoadError } from "@/components/shared/load-error";
import { CATALOG_DELETE_ROLES, CATALOG_ROLES } from "@/config/catalog";
import { ApiError } from "@/lib/api-client";
import { getCurrentUser } from "@/lib/current-user";
import { CategoryService } from "@/services/category.service";

export const metadata: Metadata = {
  title: "Categories | Chocofest BD",
};

async function loadCategories() {
  try {
    return { categories: await CategoryService.getAllCategories(), error: null };
  } catch (error) {
    return {
      categories: [],
      error: error instanceof ApiError ? error.message : "Something went wrong while loading categories. Please refresh the page.",
    };
  }
}

async function CategoriesSection() {
  const currentUser = await getCurrentUser();

  if (!currentUser?.role || !CATALOG_ROLES.includes(currentUser.role)) {
    return <AccessDenied message="Categories are only for the catalog team." />;
  }

  const { categories, error } = await loadCategories();

  if (error) return <LoadError title="Couldn’t load categories" message={error} />;

  return <CategoriesManager categories={categories} canDelete={CATALOG_DELETE_ROLES.includes(currentUser.role)} />;
}

export default function CategoriesPage() {
  return (
    <Suspense fallback={<ListSkeleton />}>
      <CategoriesSection />
    </Suspense>
  );
}
