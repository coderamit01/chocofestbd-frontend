"use client";

/* eslint-disable @next/next/no-img-element */
import { useMemo, useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { setBrandActiveAction, trashBrandAction } from "@/actions/brand.actions";
import { DangerDialog } from "@/components/shared/danger-dialog";
import { DataPagination } from "@/components/shared/data-pagination";
import { EmptyState } from "@/components/shared/empty-state";
import { Icon } from "@/components/shared/icon";
import { SearchInput } from "@/components/shared/search-input";
import { SelectMenu } from "@/components/shared/select-menu";
import { ToggleSwitch } from "@/components/shared/toggle-switch";
import { Button, buttonVariants } from "@/components/ui/button";
import { useUrlSearch } from "@/hooks/use-url-search";
import { monogram, monogramTint } from "@/lib/monogram";
import { tableStyles } from "@/lib/table-styles";
import { cn } from "@/lib/utils";
import type { PaginationMeta } from "@/types/api";
import type { Brand } from "@/types/brand";
import { BrandFormDialog, type BrandDialogState } from "./brand-form-dialog";

const squareButton = buttonVariants({ variant: "square", size: "icon-md" });

type BrandsManagerProps = {
  brands: Brand[];
  meta?: PaginationMeta;
  search?: string;
  canDelete: boolean;
};

export function BrandsManager({ brands, meta, search, canDelete }: BrandsManagerProps) {
  const pathname = usePathname();
  const searchBox = useUrlSearch();
  const [country, setCountry] = useState("");
  const [dialog, setDialog] = useState<BrandDialogState>(null);
  const [toDelete, setToDelete] = useState<Brand | null>(null);
  const [isSaving, startSaving] = useTransition();

  const countries = useMemo(() => [...new Set(brands.map((brand) => brand.country).filter(Boolean) as string[])].sort(), [brands]);
  const rows = country ? brands.filter((brand) => brand.country === country) : brands;

  const toggleActive = (brand: Brand, isActive: boolean) =>
    startSaving(async () => {
      const result = await setBrandActiveAction(brand.id, isActive);
      if (result.success) toast.success(isActive ? "Brand activated" : "Brand hidden", { description: brand.name });
      else toast.error("Couldn’t update brand", { description: result.message });
    });

  const confirmDelete = () => {
    if (!toDelete) return;
    const brand = toDelete;
    startSaving(async () => {
      const result = await trashBrandAction(brand.id);
      if (result.success) {
        toast.success("Brand moved to trash", { description: brand.name });
        setToDelete(null);
      } else {
        toast.error("Couldn’t delete brand", { description: result.message });
      }
    });
  };

  return (
    <section className="flex flex-col gap-5 rounded-xl bg-card px-6 py-5.5 max-[900px]:p-4.5">
      <div className="flex flex-wrap items-center gap-3">
        <SearchInput
          label="Search brands"
          wrapperClassName="flex-[0_1_280px]"
          value={searchBox.value}
          onChange={(event) => searchBox.setValue(event.target.value)}
        />
        <SelectMenu
          ariaLabel="Country"
          size="sm"
          value={country}
          onChange={setCountry}
          options={[{ value: "", label: "All countries" }, ...countries.map((item) => ({ value: item, label: item }))]}
        />
        <span className="flex-1" />
        <Button onClick={() => setDialog({ mode: "new" })}>
          <Icon name="plus" size={17} strokeWidth={1.8} />
          Add brand
        </Button>
      </div>

      {rows.length === 0 ? (
        <EmptyState title="No brands found" description="Try another search or add a brand." />
      ) : (
        <div className={cn(tableStyles.wrapper, searchBox.isPending && "opacity-60")}>
          <table className={tableStyles.table}>
            <thead>
              <tr>
                <th className={tableStyles.head}>Brand</th>
                <th className={tableStyles.head}>Country</th>
                <th className={cn(tableStyles.head, "text-right")}>Products</th>
                <th className={tableStyles.head}>Active</th>
                <th className={cn(tableStyles.head, "text-right")}>
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className={tableStyles.body}>
              {rows.map((brand) => (
                <tr key={brand.id} className={tableStyles.row}>
                  <td className={tableStyles.cell} data-label="Brand">
                    <span className="flex items-center gap-3">
                      <span
                        className="flex size-11 flex-none items-center justify-center overflow-hidden rounded-full font-heading text-[13px] leading-none font-bold"
                        style={brand.logo ? undefined : monogramTint(brand.id)}
                      >
                        {brand.logo ? <img src={brand.logo} alt="" className="size-full bg-surface object-contain p-1" /> : monogram(brand.name)}
                      </span>
                      <span className="flex flex-col text-left">
                        <span className="font-medium text-ink">{brand.name}</span>
                        <span className="text-xs text-ink-3">/brand/{brand.slug}</span>
                      </span>
                    </span>
                  </td>
                  <td className={tableStyles.cell} data-label="Country">
                    {brand.country ?? "—"}
                  </td>
                  <td className={cn(tableStyles.cell, "text-right tabular-nums")} data-label="Products">
                    {brand._count.products}
                  </td>
                  <td className={tableStyles.cell} data-label="Active">
                    <ToggleSwitch
                      ariaLabel={`Active: ${brand.name}`}
                      checked={brand.isActive}
                      disabled={isSaving}
                      onChange={(isActive) => toggleActive(brand, isActive)}
                    />
                  </td>
                  <td className={tableStyles.bareCell}>
                    <div className="flex justify-end gap-1.5">
                      <button type="button" aria-label={`Edit ${brand.name}`} onClick={() => setDialog({ mode: "edit", brand })} className={squareButton}>
                        <Icon name="edit" size={17} strokeWidth={1.8} className="size-[17px]" />
                      </button>
                      {canDelete && (
                        <button type="button" aria-label={`Delete ${brand.name}`} onClick={() => setToDelete(brand)} className={squareButton}>
                          <Icon name="trash" size={17} strokeWidth={1.8} className="size-[17px]" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {meta && meta.totalPages > 1 && <DataPagination meta={meta} pathname={pathname} query={{ search }} />}

      <BrandFormDialog state={dialog} onClose={() => setDialog(null)} />

      <DangerDialog
        open={!!toDelete}
        title={`Delete ${toDelete?.name ?? ""}?`}
        description="It’s hidden from the store and shop filters. Its products keep their data, and you can restore the brand from trash."
        confirmLabel="Delete brand"
        pendingLabel="Deleting…"
        isPending={isSaving}
        onOpenChange={(open) => !open && setToDelete(null)}
        onConfirm={confirmDelete}
      />
    </section>
  );
}
