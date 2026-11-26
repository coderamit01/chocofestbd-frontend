"use client";

import { useMemo, useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { saveTagAction } from "@/actions/tag.actions";
import { Icon } from "@/components/shared/icon";
import { SelectMenu } from "@/components/shared/select-menu";
import { ToggleSwitch } from "@/components/shared/toggle-switch";
import { Badge } from "@/components/ui/badge";
import { useDismiss } from "@/hooks/use-dismiss";
import { categoryChildrenMap } from "@/lib/category-tree";
import { COLLECTION_STATE_BADGES, collectionState } from "@/lib/collection";
import { formStyles } from "@/lib/form-styles";
import { cn } from "@/lib/utils";
import type { Category } from "@/types/category";
import type { Collection } from "@/types/collection";
import type { ProductRef } from "@/types/product";
import type { ProductStatus } from "@/types/status";
import { FormCard, type SectionProps } from "./form-card";

const STATUS_OPTIONS: { value: ProductStatus; label: string; hint: string }[] = [
  { value: "DRAFT", label: "Draft", hint: "Hidden from the store" },
  { value: "ACTIVE", label: "Active", hint: "Visible and purchasable" },
  { value: "ARCHIVED", label: "Archived", hint: "Hidden, kept for records" },
];

export function ProductStatusCard({ values, set }: SectionProps) {
  return (
    <FormCard title="Status" titleId="stl">
      <div role="radiogroup" aria-labelledby="stl" className="flex flex-col gap-2.5">
        {STATUS_OPTIONS.map((option) => {
          const on = values.status === option.value;
          return (
            <label
              key={option.value}
              className={cn(
                "flex cursor-pointer items-start gap-3 rounded-[12px] p-3.5",
                on ? "bg-brand-50 shadow-[inset_0_0_0_1.5px_var(--brand)]" : "bg-surface-2"
              )}
            >
              <input
                type="radio"
                name="product-status"
                checked={on}
                onChange={() => set({ status: option.value })}
                className="mt-0.75 size-4.5"
              />
              <span className="flex flex-col gap-1">
                <span className="font-medium text-ink">{option.label}</span>
                <span className="text-xs text-ink-3">{option.hint}</span>
              </span>
            </label>
          );
        })}
      </div>
    </FormCard>
  );
}

type OrganisationCardProps = SectionProps & {
  categories: Category[];
  brands: ProductRef[];
  tags: ProductRef[];
  onTagCreated: (tag: ProductRef) => void;
};

export function ProductOrganisationCard({ values, set, errors, categories, brands, tags, onTagCreated }: OrganisationCardProps) {
  const [open, setOpen] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [isCreating, startCreating] = useTransition();
  const pickerRef = useRef<HTMLDivElement>(null);
  useDismiss(pickerRef, open, () => setOpen(false));

  const tree = useMemo(() => {
    const map = categoryChildrenMap(categories);
    const walk = (parentId: string | null, depth: number): { category: Category; depth: number }[] =>
      (map.get(parentId) ?? []).flatMap((category) => [{ category, depth }, ...walk(category.id, depth + 1)]);
    return walk(null, 0);
  }, [categories]);

  const selected = categories.find((category) => category.id === values.categoryId);
  const categoryPath = selected ? (selected.parent ? `${selected.parent.name} › ${selected.name}` : selected.name) : "Choose a category";

  const selectedTags = values.tagIds.map((id) => tags.find((tag) => tag.id === id)).filter(Boolean) as ProductRef[];
  const term = tagInput.trim().toLowerCase();
  const suggestions = tags.filter((tag) => !values.tagIds.includes(tag.id) && (!term || tag.name.toLowerCase().includes(term))).slice(0, 4);

  const addTag = (tag: ProductRef) => {
    if (!values.tagIds.includes(tag.id)) set({ tagIds: [...values.tagIds, tag.id] });
    setTagInput("");
  };

  const submitTag = () => {
    const name = tagInput.trim();
    if (!name) return;
    const existing = tags.find((tag) => tag.name.toLowerCase() === name.toLowerCase());
    if (existing) return addTag(existing);

    startCreating(async () => {
      const result = await saveTagAction(null, name);
      const created = result.data as ProductRef | undefined;
      if (!result.success || !created) {
        toast.error("Couldn’t create tag", { description: result.fieldErrors?.[0]?.message ?? result.message });
        return;
      }
      onTagCreated(created);
      addTag(created);
      toast.success("Tag created", { description: created.name });
    });
  };

  return (
    <FormCard title="Organisation" className="overflow-visible">
      <div className="flex flex-col gap-5">
        <div ref={pickerRef} className={cn(formStyles.field, "relative")}>
          <span id="cl" className={formStyles.label}>
            Category<span className={formStyles.required}>*</span>
          </span>
          <button
            type="button"
            aria-labelledby="cl"
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
            aria-describedby={errors.categoryId ? "cl-error" : undefined}
            className={cn(
              formStyles.input,
              "select-chevron cursor-pointer pr-9.5 text-left",
              !selected && "text-ink-4",
              errors.categoryId && "border-danger bg-[#fffafa]"
            )}
          >
            {categoryPath}
          </button>
          {errors.categoryId && (
            <span id="cl-error" className={formStyles.error}>
              {errors.categoryId}
            </span>
          )}
          {open && (
            <div role="tree" className="absolute top-19 right-0 left-0 z-40 max-h-75 animate-pop overflow-auto rounded-[14px] bg-surface p-1.5 shadow-pop">
              {tree.map(({ category, depth }) => {
                const on = category.id === values.categoryId;
                return (
                  <button
                    key={category.id}
                    type="button"
                    role="treeitem"
                    aria-selected={on}
                    onClick={() => {
                      set({ categoryId: category.id });
                      setOpen(false);
                    }}
                    style={{ paddingLeft: 12 + depth * 24 }}
                    className={cn(
                      "flex w-full items-center gap-2.5 rounded-[9px] py-2.5 pr-3 text-left text-sm leading-[1.2] outline-none hover:bg-surface-2 focus-visible:bg-surface-2",
                      !depth && "font-medium",
                      on ? "bg-brand-50 text-brand-text" : "text-ink"
                    )}
                  >
                    <span className="flex-1">{category.name}</span>
                    {on && <Icon name="check" size={17} strokeWidth={1.8} />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className={formStyles.field}>
          <label htmlFor="br" className={formStyles.label}>
            Brand
          </label>
          <SelectMenu
            id="br"
            value={values.brandId}
            onChange={(brandId) => set({ brandId })}
            options={[{ value: "", label: "No brand" }, ...brands.map((brand) => ({ value: brand.id, label: brand.name }))]}
          />
        </div>

        <div className={formStyles.field}>
          <label htmlFor="tg" className={formStyles.label}>
            Tags
          </label>
          <div className="flex min-h-10.5 flex-wrap items-center gap-1.5 rounded-[10px] border border-input bg-surface-2 p-1.5 focus-within:border-brand focus-within:bg-surface focus-within:shadow-focus">
            {selectedTags.map((tag) => (
              <span key={tag.id} className="inline-flex h-7.5 items-center gap-1.5 rounded-sm bg-surface py-0 pr-1.5 pl-3 text-[13px] text-ink">
                {tag.name}
                <button
                  type="button"
                  aria-label={`Remove ${tag.name}`}
                  onClick={() => set({ tagIds: values.tagIds.filter((id) => id !== tag.id) })}
                  className="inline-flex size-5.5 items-center justify-center rounded-md text-ink-3 hover:bg-surface-3 hover:text-ink"
                >
                  <Icon name="close" size={13} strokeWidth={2} />
                </button>
              </span>
            ))}
            <input
              id="tg"
              placeholder="Add tag…"
              value={tagInput}
              disabled={isCreating}
              onChange={(event) => setTagInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  submitTag();
                }
              }}
              className="h-7 min-w-22.5 flex-1 border-0 bg-transparent text-sm text-ink outline-none placeholder:text-ink-4"
            />
          </div>
          {suggestions.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {suggestions.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => addTag(tag)}
                  className="inline-flex h-7 items-center rounded-md bg-surface-2 px-3 text-[13px] font-medium text-ink hover:bg-surface-3"
                >
                  + {tag.name}
                </button>
              ))}
            </div>
          )}
          <span className={formStyles.hint}>{isCreating ? "Creating tag…" : "Press Enter to create a new tag."}</span>
        </div>

        <ToggleSwitch
          className="justify-between"
          checked={values.isFeatured}
          onChange={(isFeatured) => set({ isFeatured })}
          label={
            <span className="flex flex-col">
              <span className="font-medium text-ink">Featured product</span>
              <span className="text-xs text-ink-3">Shown in “Featured” on the home page</span>
            </span>
          }
        />
      </div>
    </FormCard>
  );
}

type CollectionsCardProps = SectionProps & { collections: Collection[]; now: number };

export function ProductCollectionsCard({ values, set, collections, now }: CollectionsCardProps) {
  return (
    <FormCard title="Collections" aside={<span className="text-[12.5px] text-ink-3">{values.collectionIds.length} selected</span>}>
      {collections.length === 0 ? (
        <p className="text-[12.5px] text-ink-3">No collections yet. Create one on the Collections page.</p>
      ) : (
        <div className="flex flex-col gap-3.5">
          {collections.map((collection) => {
            const state = collectionState(collection, now);
            const on = values.collectionIds.includes(collection.id);
            return (
              <label key={collection.id} className="flex cursor-pointer items-center justify-between gap-2.5 text-sm">
                <span className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={() =>
                      set({ collectionIds: on ? values.collectionIds.filter((id) => id !== collection.id) : [...values.collectionIds, collection.id] })
                    }
                  />
                  {collection.title}
                </span>
                <Badge size="sm" variant={COLLECTION_STATE_BADGES[state]}>
                  {state}
                </Badge>
              </label>
            );
          })}
        </div>
      )}
    </FormCard>
  );
}
