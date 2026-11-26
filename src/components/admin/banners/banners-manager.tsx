"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteBannerAction, reorderBannersAction, setBannerActiveAction } from "@/actions/banner.actions";
import { DangerDialog } from "@/components/shared/danger-dialog";
import { Icon } from "@/components/shared/icon";
import { Button } from "@/components/ui/button";
import { BANNER_CATEGORIES_TAB } from "@/config/banners";
import { bannerSlot } from "@/lib/banner";
import { filterStyles } from "@/lib/filter-styles";
import { cn } from "@/lib/utils";
import type { Banner, BannerCategory } from "@/types/banner";
import { BannerCard } from "./banner-card";
import { BannerCategories } from "./banner-categories";
import { BannerFormDialog, type BannerDialogState } from "./banner-form-dialog";

type BannersManagerProps = {
  banners: Banner[];
  categories: BannerCategory[];
  canDelete: boolean;
};

export function BannersManager({ banners, categories, canDelete }: BannersManagerProps) {
  const [selectedTab, setTab] = useState<string>(categories[0]?.id ?? BANNER_CATEGORIES_TAB);
  const [dialog, setDialog] = useState<BannerDialogState>(null);
  const [deleteTarget, setDeleteTarget] = useState<Banner | null>(null);
  const [isPending, startTransition] = useTransition();

  const tab = selectedTab === BANNER_CATEGORIES_TAB || categories.some((category) => category.id === selectedTab) ? selectedTab : (categories[0]?.id ?? BANNER_CATEGORIES_TAB);
  const category = categories.find((item) => item.id === tab) ?? null;
  const inCategory = banners
    .filter((banner) => banner.category.id === tab)
    .sort((a, b) => a.sortOrder - b.sortOrder || a.createdAt.localeCompare(b.createdAt));
  const slot = category ? bannerSlot(category.name) : null;

  const tabs = [
    ...categories.map((item) => ({ value: item.id, label: item.name, count: banners.filter((banner) => banner.category.id === item.id).length })),
    { value: BANNER_CATEGORIES_TAB, label: "Banner categories", count: categories.length },
  ];

  const openNew = () => category && setDialog({ mode: "new", categoryId: category.id, nextSort: inCategory.length + 1 });

  const move = (index: number, direction: -1 | 1) => {
    const ids = inCategory.map((banner) => banner.id);
    const target = index + direction;
    if (target < 0 || target >= ids.length) return;
    [ids[index], ids[target]] = [ids[target], ids[index]];
    startTransition(async () => {
      const result = await reorderBannersAction(ids);
      if (!result.success) toast.error("Couldn’t reorder banners", { description: result.message });
    });
  };

  const toggle = (banner: Banner, isActive: boolean) =>
    startTransition(async () => {
      const result = await setBannerActiveAction(banner.id, isActive);
      if (result.success) toast.success(isActive ? "Banner shown" : "Banner hidden", { description: banner.title });
      else toast.error("Couldn’t update banner", { description: result.message });
    });

  const confirmDelete = () => {
    if (!deleteTarget) return;
    const target = deleteTarget;
    startTransition(async () => {
      const result = await deleteBannerAction(target.id);
      if (!result.success) {
        toast.error("Couldn’t delete banner", { description: result.message });
        return;
      }
      setDeleteTarget(null);
      toast.error("Banner deleted", { description: target.title });
    });
  };

  return (
    <section className={filterStyles.card}>
      <div className="flex flex-wrap items-center gap-3">
        <div role="tablist" aria-label="Banner category" className="flex gap-1.5 overflow-x-auto [scrollbar-width:none]">
          {tabs.map((item) => {
            const on = item.value === tab;
            return (
              <button
                key={item.value}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setTab(item.value)}
                className={cn(
                  "inline-flex h-9.5 items-center gap-2 rounded-[10px] px-3.5 text-[13.5px] leading-none font-medium whitespace-nowrap",
                  on ? "bg-brand-50 text-brand-text" : "text-ink-2 hover:bg-surface-2 hover:text-ink"
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "inline-flex h-5 min-w-5.5 items-center justify-center rounded-md px-1.5 text-[11.5px]",
                    on ? "bg-brand text-white" : "bg-surface-3 text-ink-2"
                  )}
                >
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>
        <span className="flex-1" />
        {category && (
          <Button onClick={openNew}>
            <Icon name="plus" size={18} strokeWidth={1.8} className="size-[17px]" />
            Add banner
          </Button>
        )}
      </div>

      {category && slot ? (
        <>
          <p className="text-caption text-ink-3">
            {slot.hint ? `${slot.hint} ` : ""}Order on the site follows the numbers below — use the arrows to reorder.
          </p>
          <div className={cn("grid grid-cols-[repeat(auto-fill,minmax(min(380px,100%),1fr))] gap-5", isPending && "opacity-80")}>
            {inCategory.map((banner, index) => (
              <BannerCard
                key={banner.id}
                banner={banner}
                position={index + 1}
                height={slot.height}
                isFirst={index === 0}
                isLast={index === inCategory.length - 1}
                canDelete={canDelete}
                isPending={isPending}
                onMove={(direction) => move(index, direction)}
                onToggle={(isActive) => toggle(banner, isActive)}
                onEdit={() => setDialog({ mode: "edit", banner })}
                onDelete={() => setDeleteTarget(banner)}
              />
            ))}
            <button
              type="button"
              onClick={openNew}
              className="flex min-h-70 cursor-pointer flex-col items-center justify-center gap-2 rounded-[14px] border-[1.5px] border-dashed border-line-2 bg-surface-2 text-center text-[13.5px] leading-[1.3] font-medium text-ink-2 hover:border-brand hover:bg-brand-50"
            >
              <span className="flex size-14 items-center justify-center rounded-full bg-brand-50 text-brand">
                <Icon name="plus" size={24} strokeWidth={1.8} />
              </span>
              Add banner to {category.name}
            </button>
          </div>
        </>
      ) : (
        <BannerCategories categories={categories} canDelete={canDelete} />
      )}

      <BannerFormDialog state={dialog} categories={categories} onClose={() => setDialog(null)} />
      <DangerDialog
        open={!!deleteTarget}
        title={deleteTarget ? `Delete “${deleteTarget.title}”?` : ""}
        description="It disappears from the website right away."
        confirmLabel="Delete banner"
        pendingLabel="Deleting…"
        isPending={isPending}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
    </section>
  );
}
