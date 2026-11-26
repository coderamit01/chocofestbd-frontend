"use client";

import { useState } from "react";
import { Icon } from "@/components/shared/icon";
import { SegmentedControl } from "@/components/shared/segmented-control";
import { buttonVariants } from "@/components/ui/button";
import { LEGAL_PAGES, STORE_HOST } from "@/config/settings";
import { formStyles } from "@/lib/form-styles";
import { cn } from "@/lib/utils";
import type { LegalSettings } from "@/types/setting";
import { SettingsCallout, SettingsSectionHeader } from "./settings-field";
import type { SectionProps } from "./settings-types";

const TOOLS = [
  { label: "Heading", glyph: "H2", snippet: "\n\n## Heading\n" },
  { label: "Bold", glyph: "B", snippet: " **bold**" },
  { label: "Italic", glyph: "I", snippet: " _italic_" },
  { label: "List", glyph: "•", snippet: "\n- " },
  { label: "Link", glyph: "Link", snippet: " [text](https://)" },
];

export function PagesSection({ value, onChange, errorFor }: SectionProps<"legal">) {
  const [page, setPage] = useState<keyof LegalSettings>("returnPolicy");
  const text = value[page] ?? "";
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const pageLabel = LEGAL_PAGES.find((item) => item.key === page)?.label ?? "";
  const error = errorFor(`legal.${page}`);

  return (
    <div className="flex flex-col gap-5">
      <SettingsSectionHeader
        title="Pages & policies"
        description="Linked from the footer and from checkout."
        action={
          <a href={`https://${STORE_HOST}`} target="_blank" rel="noreferrer" className={buttonVariants({ variant: "outline", size: "sm" })}>
            <Icon name="eye" size={17} strokeWidth={1.8} />
            View on site
          </a>
        }
      />

      <SegmentedControl
        role="tablist"
        ariaLabel="Page"
        options={LEGAL_PAGES.map((item) => ({ value: item.key, label: value[item.key]?.trim() ? item.label : `${item.label} · empty` }))}
        value={page}
        onChange={setPage}
      />

      <div className={cn("overflow-hidden rounded-[12px] border bg-surface-2", error ? "border-danger" : "border-input")}>
        <div role="toolbar" aria-label="Formatting" className="flex items-center gap-1 border-b border-input bg-surface p-1.5">
          {TOOLS.map((tool) => (
            <button
              key={tool.label}
              type="button"
              aria-label={tool.label}
              onClick={() => onChange({ [page]: text + tool.snippet })}
              className="inline-flex h-8.5 items-center justify-center rounded-md px-3 text-[13px] font-semibold text-ink-2 outline-none hover:bg-surface-2 hover:text-ink focus-visible:shadow-focus"
            >
              {tool.glyph}
            </button>
          ))}
          <span className="flex-1" />
          <span className="pr-2 text-xs text-ink-3">{words} words</span>
        </div>
        <textarea
          aria-label={`${pageLabel} content`}
          value={text}
          onChange={(event) => onChange({ [page]: event.target.value })}
          className={cn(formStyles.textarea, "min-h-75 rounded-none border-0 leading-[1.7] focus:shadow-none")}
        />
      </div>
      {error && <p className={formStyles.error}>{error}</p>}
      {!text.trim() && <SettingsCallout tone="warning">This page is empty — the footer link is hidden until you add text.</SettingsCallout>}
    </div>
  );
}
