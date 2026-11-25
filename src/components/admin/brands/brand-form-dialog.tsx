"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FormDialog } from "@/components/shared/form-dialog";
import { ImagePicker } from "@/components/shared/image-picker";
import { ToggleSwitch } from "@/components/shared/toggle-switch";
import { Button } from "@/components/ui/button";
import { BRAND_COUNTRIES, BRAND_NAME_MAX, BRAND_NAME_MIN } from "@/config/brands";
import { ApiError } from "@/lib/api-client";
import { formStyles } from "@/lib/form-styles";
import { generateSlug } from "@/lib/slug";
import { cn } from "@/lib/utils";
import { BrandClient } from "@/services/brand.client";
import type { Brand, BrandFormValues } from "@/types/brand";

export type BrandDialogState = { mode: "new" } | { mode: "edit"; brand: Brand } | null;

const toValues = (brand: Brand | null): BrandFormValues => ({
  name: brand?.name ?? "",
  country: brand?.country ?? BRAND_COUNTRIES[0],
  description: brand?.description ?? "",
  isActive: brand?.isActive ?? true,
  metaTitle: brand?.metaTitle ?? "",
  metaDescription: brand?.metaDescription ?? "",
  logo: null,
  removeLogo: false,
});

const whiteInput = cn(formStyles.input, "bg-surface");
const whiteTextarea = cn(formStyles.textarea, "min-h-17.5 bg-surface");

export function BrandFormDialog({ state, onClose }: { state: BrandDialogState; onClose: () => void }) {
  return state ? <BrandForm key={state.mode === "edit" ? state.brand.id : "new"} brand={state.mode === "edit" ? state.brand : null} onClose={onClose} /> : null;
}

function BrandForm({ brand, onClose }: { brand: Brand | null; onClose: () => void }) {
  const router = useRouter();
  const [values, setValues] = useState<BrandFormValues>(() => toValues(brand));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, startSaving] = useTransition();

  const set = (patch: Partial<BrandFormValues>) => {
    setValues((current) => ({ ...current, ...patch }));
    setErrors((current) => {
      const next = { ...current };
      Object.keys(patch).forEach((key) => delete next[key]);
      return next;
    });
  };

  const countries = values.country && !BRAND_COUNTRIES.includes(values.country) ? [values.country, ...BRAND_COUNTRIES] : BRAND_COUNTRIES;

  const save = () => {
    const name = values.name.trim();
    if (name.length < BRAND_NAME_MIN || name.length > BRAND_NAME_MAX) {
      setErrors({ name: name ? `Name must be ${BRAND_NAME_MIN}–${BRAND_NAME_MAX} characters.` : "Name is required." });
      return;
    }

    startSaving(async () => {
      try {
        await BrandClient.saveBrand(brand?.id ?? null, values);
        toast.success("Brand saved", { description: name });
        router.refresh();
        onClose();
      } catch (error) {
        const fieldErrors = error instanceof ApiError ? error.fieldErrors : [];
        if (fieldErrors.length) setErrors(Object.fromEntries(fieldErrors.map((item) => [item.field, item.message])));
        else if (error instanceof ApiError && error.status === 409) setErrors({ name: error.message });
        else toast.error("Couldn’t save brand", { description: error instanceof Error ? error.message : "Please try again." });
      }
    });
  };

  return (
    <FormDialog
      open
      onOpenChange={(open) => !open && !isSaving && onClose()}
      title={brand ? "Edit brand" : "New brand"}
      description="Brands appear on product pages and in shop filters."
      className="sm:max-w-135"
      footer={
        <>
          <Button variant="soft" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={save} aria-busy={isSaving || undefined}>
            {isSaving ? "Saving…" : "Save brand"}
          </Button>
        </>
      }
    >
      <div className="flex items-center gap-4">
        <ImagePicker
          label="Logo"
          file={values.logo}
          currentUrl={values.removeLogo ? null : brand?.logo ?? null}
          onChange={(logo) => set({ logo, removeLogo: false })}
          className="size-24 rounded-full"
          imageClassName="object-contain p-2 bg-surface"
        />
        <div className={cn(formStyles.field, "flex-1")}>
          <label htmlFor="bn" className={formStyles.label}>
            Name<span className={formStyles.required}>*</span>
          </label>
          <input
            id="bn"
            value={values.name}
            aria-invalid={!!errors.name || undefined}
            onChange={(event) => set({ name: event.target.value })}
            className={formStyles.input}
          />
          {errors.name ? (
            <span className={formStyles.error}>{errors.name}</span>
          ) : (
            <span className={formStyles.hint}>Slug: /brand/{generateSlug(values.name) || "…"}</span>
          )}
          {(brand?.logo || values.logo) && !values.removeLogo && (
            <button
              type="button"
              onClick={() => set({ logo: null, removeLogo: true })}
              className="self-start text-[12.5px] font-medium text-danger hover:underline"
            >
              Remove logo
            </button>
          )}
        </div>
      </div>

      <div className={formStyles.field}>
        <label htmlFor="bc" className={formStyles.label}>
          Country
        </label>
        <select id="bc" value={values.country} onChange={(event) => set({ country: event.target.value })} className={cn(formStyles.input, "select-chevron cursor-pointer pr-9.5")}>
          {countries.map((country) => (
            <option key={country}>{country}</option>
          ))}
        </select>
      </div>

      <div className={formStyles.field}>
        <label htmlFor="bd" className={formStyles.label}>
          Description
        </label>
        <textarea
          id="bd"
          value={values.description}
          aria-invalid={!!errors.description || undefined}
          onChange={(event) => set({ description: event.target.value })}
          className={formStyles.textarea}
        />
        {errors.description && <span className={formStyles.error}>{errors.description}</span>}
      </div>

      <ToggleSwitch checked={values.isActive} onChange={(isActive) => set({ isActive })} label={<span className="order-last">Active</span>} />

      <details className="rounded-xl bg-surface-2 px-4 py-3.5" open={!!(errors.metaTitle || errors.metaDescription) || undefined}>
        <summary className="cursor-pointer font-medium">SEO fields</summary>
        <div className="mt-3.5 flex flex-col gap-4">
          <div className={formStyles.field}>
            <label htmlFor="bmt" className={formStyles.label}>
              Meta title
            </label>
            <input id="bmt" value={values.metaTitle} onChange={(event) => set({ metaTitle: event.target.value })} className={whiteInput} />
            {errors.metaTitle && <span className={formStyles.error}>{errors.metaTitle}</span>}
          </div>
          <div className={formStyles.field}>
            <label htmlFor="bmd" className={formStyles.label}>
              Meta description
            </label>
            <textarea id="bmd" value={values.metaDescription} onChange={(event) => set({ metaDescription: event.target.value })} className={whiteTextarea} />
            {errors.metaDescription && <span className={formStyles.error}>{errors.metaDescription}</span>}
          </div>
        </div>
      </details>
    </FormDialog>
  );
}
