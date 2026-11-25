/* eslint-disable @next/next/no-img-element */
import { Icon } from "@/components/shared/icon";
import { SEO_DESCRIPTION_LIMIT, SEO_TITLE_LIMIT } from "@/config/settings";
import { formStyles } from "@/lib/form-styles";
import type { SettingImages } from "@/types/setting";
import { ImageDrop } from "./image-drop";
import { SettingsField, SettingsSectionHeader } from "./settings-field";
import type { ImageUploadHandler, SectionProps } from "./settings-types";

type SeoSectionProps = SectionProps<"seo"> & {
  images: SettingImages["seo"];
  storeName: string;
  tagline: string;
  uploading: boolean;
  onUpload: ImageUploadHandler;
};

export function SeoSection({ value, onChange, errorFor, images, storeName, tagline, uploading, onUpload }: SeoSectionProps) {
  const brand = storeName.replace(/\s*BD$/i, "");

  return (
    <div className="flex flex-col gap-5">
      <SettingsSectionHeader title="SEO defaults" description="Used on pages without their own SEO fields." />

      <SettingsField
        label="Default meta title"
        htmlFor="s1"
        counter={`${value.metaTitle.length}/${SEO_TITLE_LIMIT}`}
        error={errorFor("seo.metaTitle")}
      >
        <input
          id="s1"
          value={value.metaTitle}
          aria-invalid={!!errorFor("seo.metaTitle") || undefined}
          onChange={(event) => onChange({ metaTitle: event.target.value })}
          className={formStyles.input}
        />
      </SettingsField>

      <SettingsField
        label="Default meta description"
        htmlFor="s2"
        counter={`${value.metaDescription.length}/${SEO_DESCRIPTION_LIMIT}`}
        error={errorFor("seo.metaDescription")}
      >
        <textarea
          id="s2"
          value={value.metaDescription}
          aria-invalid={!!errorFor("seo.metaDescription") || undefined}
          onChange={(event) => onChange({ metaDescription: event.target.value })}
          className={formStyles.textarea}
        />
      </SettingsField>

      <SettingsField label="Open Graph image">
        <ImageDrop
          ariaLabel="Replace OG image"
          disabled={uploading}
          onFile={(file) => onUpload("seo", "ogImage", file)}
          className="relative h-45 flex-row items-center justify-between border-0 bg-choco p-7 text-left text-white hover:border-0 hover:bg-choco-2"
        >
          {images.ogImage ? (
            <img src={images.ogImage} alt="" className="absolute inset-0 size-full object-cover" />
          ) : (
            <span className="flex flex-col gap-2">
              <span className="font-heading text-[28px] leading-[1.1] font-bold">
                {brand} <span className="text-[#ff9a66]">BD</span>
              </span>
              <span className="font-normal text-[#e8d6cc]">{tagline}</span>
            </span>
          )}
          <span className="relative ml-auto inline-flex h-6.5 items-center gap-1.5 self-center rounded-[7px] bg-white/15 px-2.5 text-[12.5px] leading-none font-medium text-white">
            <Icon name="upload" size={13} strokeWidth={1.8} />
            {uploading ? "Uploading…" : "Replace · 1200 × 630"}
          </span>
        </ImageDrop>
      </SettingsField>
    </div>
  );
}
