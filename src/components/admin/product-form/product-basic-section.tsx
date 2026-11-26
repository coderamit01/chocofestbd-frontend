"use client";

import { buttonVariants } from "@/components/ui/button";
import { formStyles } from "@/lib/form-styles";
import { generateSlug } from "@/lib/slug";
import { cn } from "@/lib/utils";
import { FormCard, type SectionProps } from "./form-card";

const SHORT_LIMIT = 160;

const TOOLS = [
  { label: "Heading", glyph: "H2", snippet: "\n\n## Heading" },
  { label: "Bold", glyph: "B", snippet: " **bold**" },
  { label: "Italic", glyph: "I", snippet: " _italic_" },
  { label: "Bulleted list", glyph: "•", snippet: "\n- " },
  { label: "Numbered list", glyph: "1.", snippet: "\n1. " },
  { label: "Link", glyph: "Link", snippet: " [text](https://)" },
];

type BasicSectionProps = SectionProps & {
  isNew: boolean;
  customSlug: boolean;
  savedSlug: string | null;
  onToggleSlug: () => void;
};

export function ProductBasicSection({ values, set, errors, isNew, customSlug, savedSlug, onToggleSlug }: BasicSectionProps) {
  const autoSlug = isNew ? generateSlug(values.name) : (savedSlug ?? generateSlug(values.name));
  const slug = customSlug ? values.slug : autoSlug;

  return (
    <FormCard title="Basic information" description="Shown on the product page and in search.">
      <div className="flex flex-col gap-5">
        <div className={formStyles.field}>
          <label htmlFor="pn" className={formStyles.label}>
            Product name<span className={formStyles.required}>*</span>
          </label>
          <input
            id="pn"
            value={values.name}
            aria-invalid={!!errors.name || undefined}
            onChange={(event) => set({ name: event.target.value })}
            className={formStyles.input}
          />
          {errors.name && <span className={formStyles.error}>{errors.name}</span>}
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-5">
          <div className={formStyles.field}>
            <label htmlFor="sl" className={formStyles.label}>
              Slug
            </label>
            <div className={formStyles.inputGroup}>
              <span className={formStyles.groupAddon}>/product/</span>
              <input
                id="sl"
                value={slug}
                disabled={!customSlug}
                aria-invalid={!!errors.slug || undefined}
                onChange={(event) => set({ slug: event.target.value.toLowerCase().replace(/[^\p{L}\p{N}-]/gu, "-") })}
                className={cn(formStyles.groupInput, !customSlug && "text-ink-4")}
              />
              <button
                type="button"
                onClick={onToggleSlug}
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "m-1 h-auto")}
              >
                {customSlug ? "Auto" : "Edit"}
              </button>
            </div>
            {errors.slug ? (
              <span className={formStyles.error}>{errors.slug}</span>
            ) : (
              <span className={formStyles.hint}>
                {customSlug ? (isNew ? "Custom slug" : "Custom — old links will break") : isNew ? "Generated from the name" : "Kept when you rename"}
              </span>
            )}
          </div>
          <div className={formStyles.field}>
            <label htmlFor="sk" className={formStyles.label}>
              SKU{!isNew && <span className={formStyles.required}>*</span>}
            </label>
            <input
              id="sk"
              value={values.sku}
              placeholder={isNew ? "Auto-generated if empty" : undefined}
              aria-invalid={!!errors.sku || undefined}
              onChange={(event) => set({ sku: event.target.value.toUpperCase().replace(/[^A-Z0-9_-]/g, "") })}
              className={cn(formStyles.input, "font-mono uppercase placeholder:normal-case placeholder:font-sans")}
            />
            {errors.sku && <span className={formStyles.error}>{errors.sku}</span>}
          </div>
        </div>

        <div className={formStyles.field}>
          <div className="flex items-center justify-between">
            <label htmlFor="sd" className={formStyles.label}>
              Short description
            </label>
            <span className={cn(formStyles.hint, "tabular-nums")}>
              {values.shortDescription.length}/{SHORT_LIMIT}
            </span>
          </div>
          <textarea
            id="sd"
            maxLength={SHORT_LIMIT}
            value={values.shortDescription}
            onChange={(event) => set({ shortDescription: event.target.value })}
            className={cn(formStyles.textarea, "min-h-18")}
          />
          {errors.shortDescription && <span className={formStyles.error}>{errors.shortDescription}</span>}
        </div>

        <div className={formStyles.field}>
          <span id="dl" className={formStyles.label}>
            Description
          </span>
          <div className="overflow-hidden rounded-[12px] border border-input bg-surface-2">
            <div role="toolbar" aria-labelledby="dl" className="flex flex-wrap items-center gap-1 border-b border-input bg-surface p-2">
              {TOOLS.map((tool) => (
                <button
                  key={tool.label}
                  type="button"
                  aria-label={tool.label}
                  onClick={() => set({ description: values.description + tool.snippet })}
                  className="inline-flex h-8.5 min-w-8.5 items-center justify-center rounded-md px-2.25 text-[13px] font-semibold text-ink-2 outline-none hover:bg-surface-2 hover:text-ink focus-visible:shadow-focus"
                >
                  {tool.glyph}
                </button>
              ))}
            </div>
            <textarea
              aria-labelledby="dl"
              value={values.description}
              onChange={(event) => set({ description: event.target.value })}
              className={cn(formStyles.textarea, "min-h-40 rounded-none border-0 focus:shadow-none")}
            />
          </div>
          {errors.description && <span className={formStyles.error}>{errors.description}</span>}
        </div>
      </div>
    </FormCard>
  );
}
