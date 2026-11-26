"use client";

import { useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { setCollectionActiveAction } from "@/actions/collection.actions";
import { EmptyState } from "@/components/shared/empty-state";
import { Icon } from "@/components/shared/icon";
import { SegmentedControl } from "@/components/shared/segmented-control";
import { ToggleSwitch } from "@/components/shared/toggle-switch";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  COLLECTION_FILTERS,
  COLLECTION_STATE_BADGES,
  collectionState,
  collectionWindow,
  type CollectionFilter,
} from "@/lib/collection";
import { cn } from "@/lib/utils";
import type { Collection, CollectionDetail } from "@/types/collection";
import { CollectionFormDrawer, type CollectionDrawerState } from "./collection-form-drawer";
import { CollectionProducts } from "./collection-products";

type CollectionsManagerProps = {
  collections: Collection[];
  current: CollectionDetail | null;
  now: number;
  canDelete: boolean;
};

export function CollectionsManager({ collections, current, now, canDelete }: CollectionsManagerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [filter, setFilter] = useState<CollectionFilter>("All");
  const [drawer, setDrawer] = useState<CollectionDrawerState>(null);
  const [isPending, startTransition] = useTransition();

  const rows = collections.filter((collection) => filter === "All" || collectionState(collection, now) === filter);

  const select = (collectionId: string | null) =>
    startTransition(() => router.replace(collectionId ? `${pathname}?collection=${collectionId}` : pathname, { scroll: false }));

  const toggleActive = (collection: Collection, isActive: boolean) =>
    startTransition(async () => {
      const result = await setCollectionActiveAction(collection.id, isActive);
      if (result.success) toast.success(isActive ? "Collection activated" : "Collection disabled", { description: collection.title });
      else toast.error("Couldn’t update collection", { description: result.message });
    });

  return (
    <div className="flex flex-wrap items-start gap-6">
      <section className="flex min-w-0 flex-[1_1_560px] flex-col gap-5 rounded-xl bg-card px-6 py-5.5 max-[900px]:p-4.5">
        <div className="flex flex-wrap items-center gap-3">
          <SegmentedControl
            ariaLabel="Schedule"
            options={COLLECTION_FILTERS.map((value) => ({ value, label: value }))}
            value={filter}
            onChange={setFilter}
          />
          <span className="flex-1" />
          <Button onClick={() => setDrawer({ mode: "new", nextPosition: collections.length + 1 })}>
            <Icon name="plus" size={17} strokeWidth={1.8} />
            New collection
          </Button>
        </div>

        {rows.length === 0 ? (
          <EmptyState
            title={collections.length ? "No collections here" : "No collections yet"}
            description={collections.length ? "Try another filter." : "Create one to add a section to the home page."}
          />
        ) : (
          <div className={cn("flex flex-col gap-3", isPending && "opacity-80")}>
            {rows.map((collection) => {
              const state = collectionState(collection, now);
              const selected = collection.id === current?.id;

              return (
                <div
                  key={collection.id}
                  className={cn(
                    "flex items-center gap-3 rounded-[14px] p-4",
                    selected ? "bg-brand-50 shadow-[inset_0_0_0_1.5px_var(--brand)]" : "bg-surface-2"
                  )}
                >
                  <button
                    type="button"
                    onClick={() => select(collection.id)}
                    aria-label={`Manage products in ${collection.title}`}
                    aria-pressed={selected}
                    className="flex min-w-0 flex-1 cursor-pointer items-center gap-3.5 rounded-[10px] text-left outline-none focus-visible:shadow-focus"
                  >
                    <span
                      className={cn(
                        "flex size-14 flex-none items-center justify-center rounded-[36%]",
                        selected ? "bg-brand text-white" : "bg-brand-50 text-brand"
                      )}
                    >
                      <Icon name="collections" size={24} strokeWidth={1.8} />
                    </span>
                    <span className="flex min-w-0 flex-col gap-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="font-heading text-base leading-[1.3] font-semibold text-ink">{collection.title}</span>
                        <Badge size="sm" variant={COLLECTION_STATE_BADGES[state]}>
                          {state}
                        </Badge>
                        {collection.showOnHome && (
                          <Badge size="sm" variant="neutral">
                            On home · #{collection.position}
                          </Badge>
                        )}
                      </span>
                      <span className="text-xs text-ink-3">
                        {collection._count.products} products · {collectionWindow(collection)}
                      </span>
                    </span>
                  </button>
                  <ToggleSwitch
                    ariaLabel={`Active: ${collection.title}`}
                    checked={collection.isActive}
                    disabled={isPending}
                    onChange={(isActive) => toggleActive(collection, isActive)}
                    className="flex-none"
                  />
                  <button
                    type="button"
                    aria-label={`Edit ${collection.title}`}
                    onClick={() => setDrawer({ mode: "edit", collection })}
                    className={buttonVariants({ variant: "square", size: "icon-md" })}
                  >
                    <Icon name="edit" size={17} strokeWidth={1.8} className="size-[17px]" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {current ? (
        <CollectionProducts key={current.id} collection={current} />
      ) : (
        <section className="flex min-w-0 flex-[1_1_400px] flex-col rounded-xl bg-card px-6 py-5.5">
          <EmptyState title="Pick a collection" description="Select a collection on the left to manage its products." />
        </section>
      )}

      <CollectionFormDrawer
        state={drawer}
        canDelete={canDelete}
        onClose={() => setDrawer(null)}
        onSaved={(collectionId) => {
          if (collectionId && collectionId !== current?.id) select(collectionId);
          else if (!collectionId) select(null);
        }}
      />
    </div>
  );
}
