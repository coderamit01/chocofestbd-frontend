"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FormDrawer } from "@/components/shared/form-drawer";
import { ImagePicker } from "@/components/shared/image-picker";
import { SelectMenu } from "@/components/shared/select-menu";
import { ToggleSwitch } from "@/components/shared/toggle-switch";
import { Button } from "@/components/ui/button";
import { ApiError } from "@/lib/api-client";
import { categoryChildrenMap, descendantIds } from "@/lib/category-tree";
import { formStyles } from "@/lib/form-styles";
import { generateSlug } from "@/lib/slug";
import { cn } from "@/lib/utils";
import { CategoryClient } from "@/services/category.client";
import type { Category, CategoryFormValues } from "@/types/category";

export type CategoryDrawerState = { mode: "new"; nextSortOrder: number } | { mode: "edit"; category: Category } | null;

const NAME_MIN = 2;
const NAME_MAX = 100;

type CategoryFormDrawerProps = {
  state: CategoryDrawerState;
  categories: Category[];
  onClose: () => void;
};

export function CategoryFormDrawer({ state, categories, onClose }: CategoryFormDrawerProps) {
  const [isSaving, setIsSaving] = useState(false);
  const key = state?.mode === "edit" ? state.category.id : "new";

  return (
    <FormDrawer
      open={!!state}
      onOpenChange={(open) => !open && !isSaving && onClose()}
      title={state?.mode === "edit" ? "Edit category" : "New category"}
      description="Categories organise the shop menu and filters."
      footer={
        <>
          <Button variant="soft" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button type="submit" form="category-form" aria-busy={isSaving || undefined}>
            {isSaving ? "Saving…" : "Save category"}
          </Button>
        </>
      }
    >
      {state && <CategoryForm key={key} state={state} categories={categories} onSavingChange={setIsSaving} onClose={onClose} />}
    </FormDrawer>
  );
}

type CategoryFormProps = {
  state: NonNullable<CategoryDrawerState>;
  categories: Category[];
  onSavingChange: (saving: boolean) => void;
  onClose: () => void;
};

function CategoryForm({ state, categories, onSavingChange, onClose }: CategoryFormProps) {
  const router = useRouter();
  const category = state.mode === "edit" ? state.category : null;
  const [values, setValues] = useState<CategoryFormValues>(() => ({
    name: category?.name ?? "",
    parentId: category?.parent?.id ?? "",
    sortOrder: String(category?.sortOrder ?? (state.mode === "new" ? state.nextSortOrder : 0)),
    description: category?.description ?? "",
    isActive: category?.isActive ?? true,
    metaTitle: category?.metaTitle ?? "",
    metaDescription: category?.metaDescription ?? "",
    image: null,
    removeImage: false,
  }));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [, startSaving] = useTransition();

  const parentOptions = useMemo(() => {
    const map = categoryChildrenMap(categories);
    const blocked = new Set(category ? [category.id, ...descendantIds(map, category.id)] : []);
    const walk = (parentId: string | null, depth: number): { id: string; label: string }[] =>
      (map.get(parentId) ?? [])
        .filter((item) => !blocked.has(item.id))
        .flatMap((item) => [{ id: item.id, label: `${"— ".repeat(depth)}${item.name}` }, ...walk(item.id, depth + 1)]);
    return walk(null, 0);
  }, [categories, category]);

  const set = (patch: Partial<CategoryFormValues>) => {
    setValues((current) => ({ ...current, ...patch }));
    setErrors((current) => {
      const next = { ...current };
      Object.keys(patch).forEach((key) => delete next[key]);
      return next;
    });
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const name = values.name.trim();
    if (name.length < NAME_MIN || name.length > NAME_MAX) {
      setErrors({ name: name ? `Name must be ${NAME_MIN}–${NAME_MAX} characters.` : "Name is required." });
      return;
    }

    onSavingChange(true);
    startSaving(async () => {
      try {
        await CategoryClient.saveCategory(category?.id ?? null, values);
        toast.success("Category saved", { description: name });
        router.refresh();
        onClose();
      } catch (error) {
        const fieldErrors = error instanceof ApiError ? error.fieldErrors : [];
        if (fieldErrors.length) setErrors(Object.fromEntries(fieldErrors.map((item) => [item.field, item.message])));
        else if (error instanceof ApiError && error.status === 409) setErrors({ name: error.message });
        else toast.error("Couldn’t save category", { description: error instanceof Error ? error.message : "Please try again." });
      } finally {
        onSavingChange(false);
      }
    });
  };

  const hasImage = !values.removeImage && (values.image || category?.image);

  return (
    <form id="category-form" noValidate onSubmit={submit} className="flex flex-col gap-5">
      <div className={formStyles.field}>
        <label htmlFor="cn" className={formStyles.label}>
          Name<span className={formStyles.required}>*</span>
        </label>
        <input
          id="cn"
          placeholder="e.g. Dark chocolate"
          value={values.name}
          aria-invalid={!!errors.name || undefined}
          onChange={(event) => set({ name: event.target.value })}
          className={formStyles.input}
        />
        {errors.name && <span className={formStyles.error}>{errors.name}</span>}
      </div>

      <div className={formStyles.field}>
        <label htmlFor="cs" className={formStyles.label}>
          Slug
        </label>
        <div className={formStyles.inputGroup}>
          <span className={formStyles.groupAddon}>/category/</span>
          <input id="cs" value={generateSlug(values.name)} disabled className={cn(formStyles.groupInput, "text-ink-4")} />
        </div>
        <span className={formStyles.hint}>Generated from the name.</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className={formStyles.field}>
          <label htmlFor="cp" className={formStyles.label}>
            Parent
          </label>
          <SelectMenu
            id="cp"
            value={values.parentId}
            invalid={!!errors.parentId}
            onChange={(parentId) => set({ parentId })}
            options={[{ value: "", label: "None (top level)" }, ...parentOptions.map((option) => ({ value: option.id, label: option.label }))]}
          />
          {errors.parentId && <span className={formStyles.error}>{errors.parentId}</span>}
        </div>
        <div className={formStyles.field}>
          <label htmlFor="so" className={formStyles.label}>
            Sort order
          </label>
          <input
            id="so"
            type="number"
            min={0}
            value={values.sortOrder}
            aria-invalid={!!errors.sortOrder || undefined}
            onChange={(event) => set({ sortOrder: event.target.value })}
            className={cn(formStyles.input, "tabular-nums")}
          />
          {errors.sortOrder && <span className={formStyles.error}>{errors.sortOrder}</span>}
        </div>
      </div>

      <div className={formStyles.field}>
        <label htmlFor="cd" className={formStyles.label}>
          Description
        </label>
        <textarea id="cd" value={values.description} onChange={(event) => set({ description: event.target.value })} className={formStyles.textarea} />
        {errors.description && <span className={formStyles.error}>{errors.description}</span>}
      </div>

      <div className={formStyles.field}>
        <span className={formStyles.label}>Image</span>
        <ImagePicker
          label="Upload image (square, 600 px)"
          variant="zone"
          file={values.image}
          currentUrl={values.removeImage ? null : category?.image ?? null}
          onChange={(image) => set({ image, removeImage: false })}
          className="h-30 w-full rounded-[14px]"
          imageClassName="object-contain bg-surface"
        />
        {hasImage && (
          <button type="button" onClick={() => set({ image: null, removeImage: true })} className="self-start text-[12.5px] font-medium text-danger hover:underline">
            Remove image
          </button>
        )}
      </div>

      <ToggleSwitch checked={values.isActive} onChange={(isActive) => set({ isActive })} label={<span className="order-last">Show in shop menu</span>} />

      <hr className="h-px border-0 bg-line" />
      <span className="eyebrow">SEO</span>

      <div className={formStyles.field}>
        <label htmlFor="mt" className={formStyles.label}>
          Meta title
        </label>
        <input id="mt" value={values.metaTitle} onChange={(event) => set({ metaTitle: event.target.value })} className={formStyles.input} />
        {errors.metaTitle && <span className={formStyles.error}>{errors.metaTitle}</span>}
      </div>
      <div className={formStyles.field}>
        <label htmlFor="md" className={formStyles.label}>
          Meta description
        </label>
        <textarea
          id="md"
          value={values.metaDescription}
          onChange={(event) => set({ metaDescription: event.target.value })}
          className={cn(formStyles.textarea, "min-h-18")}
        />
        {errors.metaDescription && <span className={formStyles.error}>{errors.metaDescription}</span>}
      </div>
    </form>
  );
}
