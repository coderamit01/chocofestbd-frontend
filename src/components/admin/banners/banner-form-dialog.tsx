"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FormDialog } from "@/components/shared/form-dialog";
import { Icon } from "@/components/shared/icon";
import { SelectMenu } from "@/components/shared/select-menu";
import { ToggleSwitch } from "@/components/shared/toggle-switch";
import { Button } from "@/components/ui/button";
import { BANNER_ART, BANNER_LINK_HOST, BANNER_TITLE_MAX, BANNER_TITLE_MIN } from "@/config/banners";
import { useObjectUrl } from "@/hooks/use-object-url";
import { ApiError } from "@/lib/api-client";
import { formStyles } from "@/lib/form-styles";
import { cn } from "@/lib/utils";
import { BannerClient } from "@/services/banner.client";
import type { Banner, BannerCategory, BannerFormValues } from "@/types/banner";

export type BannerDialogState = { mode: "new"; categoryId: string; nextSort: number } | { mode: "edit"; banner: Banner } | null;

type BannerFormDialogProps = {
  state: BannerDialogState;
  categories: BannerCategory[];
  onClose: () => void;
};

type FieldErrors = Partial<Record<"title" | "link" | "image", string>>;

export function BannerFormDialog({ state, categories, onClose }: BannerFormDialogProps) {
  if (!state) return null;
  const banner = state.mode === "edit" ? state.banner : null;
  const initial: BannerFormValues = banner
    ? {
        title: banner.title,
        link: banner.link ?? "",
        categoryId: banner.category.id,
        sortOrder: String(banner.sortOrder),
        isActive: banner.isActive,
        image: null,
      }
    : {
        title: "",
        link: "/",
        categoryId: state.mode === "new" ? state.categoryId : "",
        sortOrder: String(state.mode === "new" ? state.nextSort : 1),
        isActive: true,
        image: null,
      };

  return <BannerForm key={banner?.id ?? "new"} banner={banner} initial={initial} categories={categories} onClose={onClose} />;
}

function BannerForm({
  banner,
  initial,
  categories,
  onClose,
}: {
  banner: Banner | null;
  initial: BannerFormValues;
  categories: BannerCategory[];
  onClose: () => void;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState<BannerFormValues>(initial);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSaving, startSaving] = useTransition();
  const preview = useObjectUrl(values.image) ?? banner?.image ?? null;
  const [background, color] = BANNER_ART[0];

  const set = (patch: Partial<BannerFormValues>) => {
    setValues((current) => ({ ...current, ...patch }));
    setErrors((current) => {
      const next = { ...current };
      Object.keys(patch).forEach((key) => delete next[key as keyof FieldErrors]);
      return next;
    });
  };

  const save = () => {
    const title = values.title.trim();
    const link = values.link.trim();
    const next: FieldErrors = {
      title: title.length < BANNER_TITLE_MIN ? "Title is required (also used as alt text)." : undefined,
      link: link && !link.startsWith("/") ? "Start with “/”." : undefined,
      image: !banner && !values.image ? "Upload an image." : undefined,
    };
    if (Object.values(next).some(Boolean)) {
      setErrors(next);
      return;
    }

    startSaving(async () => {
      try {
        await BannerClient.saveBanner(banner?.id ?? null, { ...values, link: link === "/" ? "" : link });
        toast.success("Banner saved", { description: title });
        router.refresh();
        onClose();
      } catch (error) {
        const fieldErrors = error instanceof ApiError ? error.fieldErrors : [];
        if (fieldErrors.length) setErrors(Object.fromEntries(fieldErrors.map((item) => [item.field, item.message])));
        else toast.error("Couldn’t save banner", { description: error instanceof Error ? error.message : "Please try again." });
      }
    });
  };

  return (
    <FormDialog
      open
      onOpenChange={(open) => !open && !isSaving && onClose()}
      title={banner ? "Edit banner" : "New banner"}
      description="Recommended 1600 × 600 px for hero slides, 1600 × 200 px for strips."
      className="sm:max-w-140"
      footer={
        <>
          <Button variant="soft" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={save} aria-busy={isSaving || undefined}>
            {isSaving ? "Saving…" : "Save banner"}
          </Button>
        </>
      }
    >
      <div className={formStyles.field}>
        <button
          type="button"
          aria-label="Upload banner image"
          onClick={() => inputRef.current?.click()}
          className={cn(
            "relative flex h-42.5 w-full cursor-pointer items-center overflow-hidden rounded-[14px] bg-cover bg-center p-6 text-left outline-none focus-visible:shadow-focus",
            errors.image && "ring-2 ring-danger"
          )}
          style={preview ? { backgroundImage: `url("${preview}")` } : { background, color }}
        >
          {!preview && (
            <span className="flex max-w-[70%] flex-col gap-1.5">
              <span className="text-[11px] leading-none font-semibold tracking-[.1em] uppercase opacity-80">Preview</span>
              <span className="font-heading text-[22px] leading-[1.15] font-bold">{values.title.trim() || "Banner title"}</span>
            </span>
          )}
          <span className="absolute right-3 bottom-3 inline-flex h-5.5 items-center gap-1 rounded-md bg-white/90 px-2 text-[11.5px] leading-none font-medium text-ink">
            <Icon name="upload" size={13} strokeWidth={1.8} />
            {preview ? "Replace image" : "Upload image"}
          </span>
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(event) => {
            const file = event.target.files?.[0] ?? null;
            if (file) set({ image: file });
            event.target.value = "";
          }}
        />
        {errors.image && <span className={formStyles.error}>{errors.image}</span>}
      </div>

      <div className={formStyles.field}>
        <label htmlFor="bt" className={formStyles.label}>
          Title<span className={formStyles.required}>*</span>
        </label>
        <input
          id="bt"
          value={values.title}
          maxLength={BANNER_TITLE_MAX}
          aria-invalid={!!errors.title || undefined}
          onChange={(event) => set({ title: event.target.value })}
          className={formStyles.input}
        />
        {errors.title && <span className={formStyles.error}>{errors.title}</span>}
      </div>

      <div className={formStyles.field}>
        <label htmlFor="bl" className={formStyles.label}>
          Link
        </label>
        <div className={formStyles.inputGroup}>
          <span className={formStyles.groupAddon}>{BANNER_LINK_HOST}</span>
          <input
            id="bl"
            value={values.link}
            maxLength={500}
            placeholder="/collection/eid-special"
            aria-invalid={!!errors.link || undefined}
            onChange={(event) => set({ link: event.target.value })}
            className={formStyles.groupInput}
          />
        </div>
        {errors.link && <span className={formStyles.error}>{errors.link}</span>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className={formStyles.field}>
          <label htmlFor="bc" className={formStyles.label}>
            Category
          </label>
          <SelectMenu
            id="bc"
            value={values.categoryId}
            onChange={(categoryId) => set({ categoryId })}
            options={categories.map((category) => ({ value: category.id, label: category.name }))}
          />
        </div>
        <div className={formStyles.field}>
          <label htmlFor="bs" className={formStyles.label}>
            Sort order
          </label>
          <input
            id="bs"
            type="number"
            min={1}
            value={values.sortOrder}
            onChange={(event) => set({ sortOrder: event.target.value.replace(/\D/g, "").slice(0, 4) })}
            className={cn(formStyles.input, "tabular-nums")}
          />
        </div>
      </div>

      <ToggleSwitch checked={values.isActive} onChange={(isActive) => set({ isActive })} label={<span className="order-last">Active</span>} />
    </FormDialog>
  );
}
