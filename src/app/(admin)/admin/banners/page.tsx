import type { Metadata } from "next";
import { Suspense } from "react";
import { BannersManager } from "@/components/admin/banners/banners-manager";
import { BannersSkeleton } from "@/components/admin/banners/banners-skeleton";
import { AccessDenied } from "@/components/shared/access-denied";
import { LoadError } from "@/components/shared/load-error";
import { BANNER_DELETE_ROLES, BANNER_ROLES } from "@/config/banners";
import { ApiError } from "@/lib/api-client";
import { getCurrentUser } from "@/lib/current-user";
import { BannerService } from "@/services/banner.service";

export const metadata: Metadata = {
  title: "Banners | Chocofest BD",
};

async function loadBanners() {
  try {
    const [banners, categories] = await Promise.all([BannerService.getBanners(), BannerService.getCategories()]);
    return { banners, categories: categories.data ?? [], error: null };
  } catch (error) {
    return {
      banners: [],
      categories: [],
      error: error instanceof ApiError ? error.message : "Something went wrong while loading banners. Please refresh the page.",
    };
  }
}

async function BannersSection() {
  const currentUser = await getCurrentUser();

  if (!currentUser?.role || !BANNER_ROLES.includes(currentUser.role)) {
    return <AccessDenied message="Banners are only for the marketing team." />;
  }

  const { banners, categories, error } = await loadBanners();

  if (error) return <LoadError title="Couldn’t load banners" message={error} />;

  return <BannersManager banners={banners} categories={categories} canDelete={BANNER_DELETE_ROLES.includes(currentUser.role)} />;
}

export default function BannersPage() {
  return (
    <Suspense fallback={<BannersSkeleton />}>
      <BannersSection />
    </Suspense>
  );
}
