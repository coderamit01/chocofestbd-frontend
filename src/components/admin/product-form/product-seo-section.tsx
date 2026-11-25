"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useObjectUrl } from "@/hooks/use-object-url";
import { formStyles } from "@/lib/form-styles";
import { cn } from "@/lib/utils";
import { FormCard, type SectionProps } from "./form-card";

const TITLE_LIMIT = 60;
const DESCRIPTION_LIMIT = 160;

const clip = (value: string, limit: number) => (value.length > limit ? `${value.slice(0, limit - 3)}…` : value);

type SeoSectionProps = SectionProps & {
  slug: string;
  metaImageUrl: string | null;
  metaImageFile: File | null;
  onMetaImage: (file: File) => void;
};

export function ProductSeoSection({ values, set, errors, slug, metaImageUrl, metaImageFile, onMetaImage }: SeoSectionProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const preview = useObjectUrl(metaImageFile);
  const image = preview ?? metaImageUrl;
  const title = values.metaTitle || `${values.name || "Product name"} | ChocoFest BD`;
  const description = values.metaDescription || values.shortDescription;

  const counter = (length: number, limit: number) => (
    <span className={cn("tabular-nums", length > limit ? formStyles.error : formStyles.hint)}>
      {length}/{limit}
    </span>
  );

  return (
    <FormCard title="Search engine listing">
      <div className="flex flex-col gap-5">
        <div aria-label="Google preview" className="flex flex-col gap-1 rounded-[14px] bg-surface-2 p-4.5 font-[Arial,sans-serif]">
          <span className="flex items-center gap-2 text-xs text-[#202124]">
            <span className="flex size-6.5 items-center justify-center rounded-full bg-brand font-heading text-[10px] leading-none font-bold text-white">CF</span>
            <span className="flex flex-col">
              <span>ChocoFest BD</span>
              <span className="text-[#4d5156]">chocofestbd.com › product › {slug || "…"}</span>
            </span>
          </span>
          <span className="mt-1.5 text-[19px] text-[#1a0dab]">{clip(title, TITLE_LIMIT)}</span>
          <span className="text-[13.5px] leading-normal text-[#4d5156]">{clip(description, DESCRIPTION_LIMIT)}</span>
        </div>

        <div className={formStyles.field}>
          <div className="flex items-center justify-between">
            <label htmlFor="mt" className={formStyles.label}>
              Meta title
            </label>
            {counter(title.length, TITLE_LIMIT)}
          </div>
          <input
            id="mt"
            placeholder={`${values.name || "Product name"} | ChocoFest BD`}
            value={values.metaTitle}
            aria-invalid={!!errors.metaTitle || undefined}
            onChange={(event) => set({ metaTitle: event.target.value })}
            className={formStyles.input}
          />
          {errors.metaTitle && <span className={formStyles.error}>{errors.metaTitle}</span>}
        </div>

        <div className={formStyles.field}>
          <div className="flex items-center justify-between">
            <label htmlFor="md" className={formStyles.label}>
              Meta description
            </label>
            {counter(description.length, DESCRIPTION_LIMIT)}
          </div>
          <textarea
            id="md"
            placeholder="Falls back to the short description"
            value={values.metaDescription}
            aria-invalid={!!errors.metaDescription || undefined}
            onChange={(event) => set({ metaDescription: event.target.value })}
            className={cn(formStyles.textarea, "min-h-18")}
          />
          {errors.metaDescription && <span className={formStyles.error}>{errors.metaDescription}</span>}
        </div>

        <div className="flex items-center gap-3">
          <span className="flex h-11 w-18 flex-none items-center justify-center overflow-hidden rounded-[10px] bg-choco font-heading text-[13px] leading-none font-bold text-[#ffd9c2]">
            {image ? <img src={image} alt="" className="size-full object-cover" /> : "OG"}
          </span>
          <span className="min-w-0 flex-1 text-[12.5px] text-ink-3">
            {metaImageFile ? "New meta image · uploads on save" : "Meta image uses the main image unless you upload one."}
          </span>
          <Button variant="soft" size="sm" onClick={() => inputRef.current?.click()}>
            Replace
          </Button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) onMetaImage(file);
              event.target.value = "";
            }}
          />
        </div>
      </div>
    </FormCard>
  );
}
