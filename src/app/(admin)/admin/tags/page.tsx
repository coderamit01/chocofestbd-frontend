import type { Metadata } from "next";
import { Suspense } from "react";
import { TagsManager } from "@/components/admin/tags/tags-manager";
import { TagsSkeleton } from "@/components/admin/tags/tags-skeleton";
import { AccessDenied } from "@/components/shared/access-denied";
import { LoadError } from "@/components/shared/load-error";
import { CATALOG_DELETE_ROLES, CATALOG_ROLES } from "@/config/catalog";
import { ApiError } from "@/lib/api-client";
import { getCurrentUser } from "@/lib/current-user";
import { TagService } from "@/services/tag.service";

export const metadata: Metadata = {
  title: "Tags | Chocofest BD",
};

type TagsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value)?.trim() || undefined;

async function loadTags(page: number, search?: string) {
  try {
    const { data, meta } = await TagService.getTags({ page, search });
    return { tags: data ?? [], meta, error: null };
  } catch (error) {
    return {
      tags: [],
      meta: undefined,
      error: error instanceof ApiError ? error.message : "Something went wrong while loading tags. Please refresh the page.",
    };
  }
}

async function TagsSection({ searchParams }: TagsPageProps) {
  const [currentUser, params] = await Promise.all([getCurrentUser(), searchParams]);

  if (!currentUser?.role || !CATALOG_ROLES.includes(currentUser.role)) {
    return <AccessDenied message="Tags are only for the catalog team." />;
  }

  const search = first(params.search);
  const page = Math.max(1, Number(first(params.page)) || 1);

  const { tags, meta, error } = await loadTags(page, search);

  if (error) return <LoadError title="Couldn’t load tags" message={error} />;

  return <TagsManager tags={tags} meta={meta} search={search} canDelete={CATALOG_DELETE_ROLES.includes(currentUser.role)} />;
}

export default function TagsPage({ searchParams }: TagsPageProps) {
  return (
    <Suspense fallback={<TagsSkeleton />}>
      <TagsSection searchParams={searchParams} />
    </Suspense>
  );
}
