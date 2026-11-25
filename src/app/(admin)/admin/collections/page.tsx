import type { Metadata } from "next";
import { Suspense } from "react";
import { CollectionsManager } from "@/components/admin/collections/collections-manager";
import { AccessDenied } from "@/components/shared/access-denied";
import { ListSkeleton } from "@/components/shared/list-skeleton";
import { LoadError } from "@/components/shared/load-error";
import { CATALOG_DELETE_ROLES, CATALOG_ROLES } from "@/config/catalog";
import { ApiError } from "@/lib/api-client";
import { getCurrentUser } from "@/lib/current-user";
import { CollectionService } from "@/services/collection.service";

export const metadata: Metadata = {
  title: "Collections | Chocofest BD",
};

type CollectionsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

async function loadCollections(selectedId?: string) {
  try {
    const { data: collections = [] } = await CollectionService.getCollections();
    const currentId = collections.some((collection) => collection.id === selectedId) ? selectedId : collections[0]?.id;
    const current = currentId ? (await CollectionService.getCollection(currentId)).data ?? null : null;
    return { collections, current, now: Date.now(), error: null };
  } catch (error) {
    return {
      collections: [],
      current: null,
      now: Date.now(),
      error: error instanceof ApiError ? error.message : "Something went wrong while loading collections. Please refresh the page.",
    };
  }
}

async function CollectionsSection({ searchParams }: CollectionsPageProps) {
  const [currentUser, params] = await Promise.all([getCurrentUser(), searchParams]);

  if (!currentUser?.role || !CATALOG_ROLES.includes(currentUser.role)) {
    return <AccessDenied message="Collections are only for the catalog team." />;
  }

  const selected = Array.isArray(params.collection) ? params.collection[0] : params.collection;
  const { collections, current, now, error } = await loadCollections(selected);

  if (error) return <LoadError title="Couldn’t load collections" message={error} />;

  return (
    <CollectionsManager collections={collections} current={current} now={now} canDelete={CATALOG_DELETE_ROLES.includes(currentUser.role)} />
  );
}

export default function CollectionsPage({ searchParams }: CollectionsPageProps) {
  return (
    <Suspense fallback={<ListSkeleton />}>
      <CollectionsSection searchParams={searchParams} />
    </Suspense>
  );
}
