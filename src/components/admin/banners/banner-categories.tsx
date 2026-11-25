"use client";

import { useState, useTransition, type FormEvent } from "react";
import { toast } from "sonner";
import { createBannerCategoryAction, deleteBannerCategoryAction } from "@/actions/banner.actions";
import { Icon } from "@/components/shared/icon";
import { Button, buttonVariants } from "@/components/ui/button";
import { BANNER_CATEGORY_NAME_MAX, BANNER_CATEGORY_NAME_MIN } from "@/config/banners";
import { bannerSlotKey } from "@/lib/banner";
import { formStyles } from "@/lib/form-styles";
import { tableStyles } from "@/lib/table-styles";
import { cn } from "@/lib/utils";
import type { BannerCategory } from "@/types/banner";

type BannerCategoriesProps = {
  categories: BannerCategory[];
  canDelete: boolean;
};

export function BannerCategories({ categories, canDelete }: BannerCategoriesProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSaving, startSaving] = useTransition();

  const addCategory = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = name.trim();
    const taken = categories.some((category) => category.name.toLowerCase() === value.toLowerCase());
    if (value.length < BANNER_CATEGORY_NAME_MIN || taken) {
      setError("Enter a unique name.");
      return;
    }

    startSaving(async () => {
      const result = await createBannerCategoryAction(value);
      if (result.success) {
        setName("");
        toast.success("Category added", { description: value });
      } else if (result.status === 409) {
        setError("Enter a unique name.");
      } else {
        toast.error("Couldn’t add category", { description: result.message });
      }
    });
  };

  const remove = (category: BannerCategory) =>
    startSaving(async () => {
      const result = await deleteBannerCategoryAction(category.id);
      if (result.success) toast.error("Category deleted", { description: category.name });
      else toast.error("Couldn’t delete category", { description: result.message });
    });

  return (
    <div className="flex flex-wrap items-start gap-6">
      <form noValidate onSubmit={addCategory} className="flex max-w-90 min-w-0 flex-[1_1_280px] flex-col gap-4 rounded-xl bg-surface-2 p-5">
        <h3 className="font-heading text-base leading-[1.3] font-semibold text-ink">New banner category</h3>
        <div className={formStyles.field}>
          <label htmlFor="bcn" className={formStyles.label}>
            Name<span className={formStyles.required}>*</span>
          </label>
          <input
            id="bcn"
            value={name}
            maxLength={BANNER_CATEGORY_NAME_MAX}
            placeholder="e.g. Popup offer"
            aria-invalid={!!error || undefined}
            onChange={(event) => {
              setName(event.target.value);
              setError(null);
            }}
            className={cn(formStyles.input, "bg-surface")}
          />
          {error && <span className={formStyles.error}>{error}</span>}
        </div>
        <Button type="submit" aria-busy={isSaving || undefined}>
          {isSaving ? "Adding…" : "Add category"}
        </Button>
      </form>

      <div className="min-w-0 flex-[2_1_600px]">
        <div className={tableStyles.wrapper}>
          <table className={tableStyles.table}>
            <thead>
              <tr>
                <th className={tableStyles.head}>Name</th>
                <th className={tableStyles.head}>Slot key</th>
                <th className={cn(tableStyles.head, "text-right")}>Banners</th>
                <th className={cn(tableStyles.head, "text-right")}>Actions</th>
              </tr>
            </thead>
            <tbody className={tableStyles.body}>
              {categories.map((category) => {
                const locked = category._count.banners > 0;
                return (
                  <tr key={category.id} className={tableStyles.row}>
                    <td className={cn(tableStyles.cell, "font-medium")} data-label="Name">
                      {category.name}
                    </td>
                    <td className={cn(tableStyles.cell, "font-mono text-[13px] text-ink-2")} data-label="Slot key">
                      {bannerSlotKey(category.name)}
                    </td>
                    <td className={cn(tableStyles.cell, "text-right tabular-nums")} data-label="Banners">
                      {category._count.banners}
                    </td>
                    <td className={tableStyles.bareCell}>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          aria-label={`Delete ${category.name}`}
                          disabled={locked || !canDelete || isSaving}
                          onClick={() => remove(category)}
                          className={buttonVariants({ variant: "square", size: "icon-md" })}
                        >
                          <Icon name="trash" size={16} strokeWidth={1.8} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="mt-2.5 text-xs text-ink-3">Categories that still hold banners can’t be deleted.</p>
      </div>
    </div>
  );
}
