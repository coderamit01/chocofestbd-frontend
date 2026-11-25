"use client";

/* eslint-disable @next/next/no-img-element */
import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import { reorderCategoriesAction, setCategoryActiveAction, trashCategoryAction } from "@/actions/category.actions";
import { DangerDialog } from "@/components/shared/danger-dialog";
import { EmptyState } from "@/components/shared/empty-state";
import { Icon } from "@/components/shared/icon";
import { SearchInput } from "@/components/shared/search-input";
import { ToggleSwitch } from "@/components/shared/toggle-switch";
import { Button, buttonVariants } from "@/components/ui/button";
import { categoryChildrenMap, flattenCategories, reorderSiblings, type CategoryRow } from "@/lib/category-tree";
import { monogram, monogramTint } from "@/lib/monogram";
import { tableStyles } from "@/lib/table-styles";
import { cn } from "@/lib/utils";
import type { Category } from "@/types/category";
import { CategoryFormDrawer, type CategoryDrawerState } from "./category-form-drawer";

const smallSelect =
  "select-chevron h-9 w-auto cursor-pointer rounded-[10px] border border-transparent bg-surface-2 pr-9.5 pl-3 text-[13px] text-ink outline-none transition-[border-color,box-shadow,background-color] focus:border-brand focus:bg-surface focus:shadow-focus";
const squareButton = buttonVariants({ variant: "square", size: "icon-md" });
const ghostIcon = buttonVariants({ variant: "ghost", size: "icon-sm" });

type StatusFilter = "" | "on" | "off";

type CategoriesManagerProps = {
  categories: Category[];
  canDelete: boolean;
};

const subtitle = ({ childCount, depth }: CategoryRow) =>
  childCount ? `${childCount} sub-categor${childCount === 1 ? "y" : "ies"}` : depth ? "Sub-category" : "No sub-categories";

export function CategoriesManager({ categories, canDelete }: CategoriesManagerProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("");
  const [closed, setClosed] = useState<Set<string>>(new Set());
  const [drawer, setDrawer] = useState<CategoryDrawerState>(null);
  const [toDelete, setToDelete] = useState<CategoryRow | null>(null);
  const [isSaving, startSaving] = useTransition();

  const map = useMemo(() => categoryChildrenMap(categories), [categories]);
  const term = search.trim().toLowerCase();
  const rows = flattenCategories(
    map,
    (id) => !closed.has(id),
    (category) => (!term || category.name.toLowerCase().includes(term)) && (!status || (status === "on") === category.isActive)
  );

  const parentIds = categories.filter((category) => map.get(category.id)?.length).map((category) => category.id);
  const allOpen = parentIds.every((id) => !closed.has(id));

  const toggleOpen = (id: string) =>
    setClosed((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const move = (row: CategoryRow, direction: -1 | 1) => {
    const changes = reorderSiblings(row.siblings, row.index, direction);
    if (!changes.length) return;
    startSaving(async () => {
      const result = await reorderCategoriesAction(changes);
      if (!result.success) toast.error("Couldn’t reorder categories", { description: result.message });
    });
  };

  const toggleActive = (category: Category, isActive: boolean) =>
    startSaving(async () => {
      const result = await setCategoryActiveAction(category.id, isActive);
      if (result.success) toast.success(isActive ? "Shown in menu" : "Hidden from menu", { description: category.name });
      else toast.error("Couldn’t update category", { description: result.message });
    });

  const confirmDelete = () => {
    if (!toDelete) return;
    const { category } = toDelete;
    startSaving(async () => {
      const result = await trashCategoryAction(category.id);
      if (result.success) {
        toast.success("Category moved to trash", { description: category.name });
        setToDelete(null);
      } else {
        toast.error("Couldn’t delete category", { description: result.message });
      }
    });
  };

  const deleteDescription = (row: CategoryRow | null) => {
    if (!row) return "";
    if (row.childCount) return `Move or delete its ${row.childCount} sub-categories first. A category with sub-categories can’t be deleted.`;
    const products = row.category._count.products;
    return products
      ? `It leaves the shop menu. Its ${products} products keep this category and come back if you restore it from trash.`
      : "This category is empty. You can restore it from trash.";
  };

  return (
    <section className="flex flex-col gap-5 rounded-xl bg-card px-6 py-5.5 max-[900px]:p-4.5">
      <div className="flex flex-wrap items-center gap-3">
        <SearchInput label="Search categories" wrapperClassName="flex-[0_1_280px]" value={search} onChange={(event) => setSearch(event.target.value)} />
        <select aria-label="Status" value={status} onChange={(event) => setStatus(event.target.value as StatusFilter)} className={smallSelect}>
          <option value="">All status</option>
          <option value="on">Active</option>
          <option value="off">Hidden</option>
        </select>
        <span className="flex-1" />
        {parentIds.length > 0 && (
          <Button variant="soft" onClick={() => setClosed(allOpen ? new Set(parentIds) : new Set())}>
            {allOpen ? "Collapse all" : "Expand all"}
          </Button>
        )}
        <Button onClick={() => setDrawer({ mode: "new", nextSortOrder: (map.get(null)?.length ?? 0) + 1 })}>
          <Icon name="plus" size={17} strokeWidth={1.8} />
          Add category
        </Button>
      </div>

      {rows.length === 0 ? (
        <EmptyState title="No categories found" description={term || status ? "Try another search or status." : "Add your first category."} />
      ) : (
        <div className={cn(tableStyles.wrapper, isSaving && "opacity-80")}>
          <table className={tableStyles.table}>
            <thead>
              <tr>
                <th className={cn(tableStyles.head, "w-22.5")}>Order</th>
                <th className={tableStyles.head}>Category</th>
                <th className={tableStyles.head}>Slug</th>
                <th className={cn(tableStyles.head, "text-right")}>Products</th>
                <th className={tableStyles.head}>Active</th>
                <th className={cn(tableStyles.head, "text-right")}>Actions</th>
              </tr>
            </thead>
            <tbody className={tableStyles.body}>
              {rows.map((row) => {
                const { category, depth, childCount } = row;
                const open = !closed.has(category.id);

                return (
                  <tr key={category.id} className={tableStyles.row}>
                    <td className={tableStyles.bareCell}>
                      <div className="flex items-center gap-1">
                        <button type="button" aria-label={`Move ${category.name} up`} disabled={row.index === 0 || isSaving} onClick={() => move(row, -1)} className={ghostIcon}>
                          <Icon name="arrowUp" size={16} strokeWidth={1.8} className="size-4" />
                        </button>
                        <button
                          type="button"
                          aria-label={`Move ${category.name} down`}
                          disabled={row.index === row.siblings.length - 1 || isSaving}
                          onClick={() => move(row, 1)}
                          className={ghostIcon}
                        >
                          <Icon name="arrowDown" size={16} strokeWidth={1.8} className="size-4" />
                        </button>
                      </div>
                    </td>
                    <td className={tableStyles.cell} data-label="Category">
                      <span className="flex items-center gap-3" style={{ paddingLeft: depth * 36 }}>
                        {childCount ? (
                          <button
                            type="button"
                            aria-label={`Toggle ${category.name}`}
                            aria-expanded={open}
                            onClick={() => toggleOpen(category.id)}
                            className={cn(ghostIcon, "size-7")}
                          >
                            <Icon name="chevronRight" size={16} strokeWidth={1.8} className={cn("size-4 transition-transform", open && "rotate-90")} />
                          </button>
                        ) : (
                          <span className="w-7 flex-none" />
                        )}
                        <span
                          className="flex size-11 flex-none items-center justify-center overflow-hidden rounded-[10px] font-heading text-[13px] leading-none font-bold"
                          style={category.image ? undefined : monogramTint(category.id)}
                        >
                          {category.image ? <img src={category.image} alt="" className="size-full object-cover" /> : monogram(category.name)}
                        </span>
                        <span className="flex flex-col text-left">
                          <span className="font-medium text-ink">{category.name}</span>
                          <span className="text-xs text-ink-3">{subtitle(row)}</span>
                        </span>
                      </span>
                    </td>
                    <td className={cn(tableStyles.cell, "font-mono text-[13px] text-ink-2")} data-label="Slug">
                      /{category.slug}
                    </td>
                    <td className={cn(tableStyles.cell, "text-right tabular-nums")} data-label="Products">
                      {row.totalProducts}
                    </td>
                    <td className={tableStyles.cell} data-label="Active">
                      <ToggleSwitch
                        ariaLabel={`Active: ${category.name}`}
                        checked={category.isActive}
                        disabled={isSaving}
                        onChange={(isActive) => toggleActive(category, isActive)}
                      />
                    </td>
                    <td className={tableStyles.bareCell}>
                      <div className="flex justify-end gap-1.5">
                        <button type="button" aria-label={`Edit ${category.name}`} onClick={() => setDrawer({ mode: "edit", category })} className={squareButton}>
                          <Icon name="edit" size={17} strokeWidth={1.8} className="size-[17px]" />
                        </button>
                        {canDelete && (
                          <button type="button" aria-label={`Delete ${category.name}`} onClick={() => setToDelete(row)} className={squareButton}>
                            <Icon name="trash" size={17} strokeWidth={1.8} className="size-[17px]" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <CategoryFormDrawer state={drawer} categories={categories} onClose={() => setDrawer(null)} />

      <DangerDialog
        open={!!toDelete}
        title={`Delete “${toDelete?.category.name ?? ""}”?`}
        description={deleteDescription(toDelete)}
        confirmLabel={toDelete?.childCount ? "OK" : "Delete category"}
        pendingLabel="Deleting…"
        isPending={isSaving}
        onOpenChange={(open) => !open && setToDelete(null)}
        onConfirm={toDelete?.childCount ? () => setToDelete(null) : confirmDelete}
      />
    </section>
  );
}
