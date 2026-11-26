/* eslint-disable @next/next/no-img-element */
import { Icon } from "@/components/shared/icon";
import { SEO_DESCRIPTION_LIMIT, SEO_TITLE_LIMIT, STORE_HOST } from "@/config/settings";
import { formStyles } from "@/lib/form-styles";
import { gaIdInvalid, pixelIdInvalid } from "@/lib/settings";
import { cn } from "@/lib/utils";
import type { SeoSettings, SettingImages } from "@/types/setting";
import { ImageDrop } from "./image-drop";
import { SettingsEyebrow, SettingsField, SettingsSectionHeader } from "./settings-field";
import type { ImageUploadHandler, SectionProps } from "./settings-types";

type SeoSectionProps = SectionProps<"seo"> & {
  images: SettingImages["seo"];
  storeName: string;
  tagline: string;
  uploading: boolean;
  onUpload: ImageUploadHandler;
};

const clip = (text: string, limit: number) => (text.length > limit ? `${text.slice(0, limit - 3)}…` : text);

const monoInput = cn(formStyles.input, "font-mono");

export function SeoSection({ value, onChange, errorFor, images, storeName, tagline, uploading, onUpload }: SeoSectionProps) {
  const brand = storeName.replace(/\s*BD$/i, "");
  const gaError = gaIdInvalid(value.googleAnalyticsId) ? "Starts with G-, e.g. G-4KD92LQ1ZP" : errorFor("seo.googleAnalyticsId");
  const pixelError = pixelIdInvalid(value.facebookPixelId) ? "Numbers only, 15–16 digits." : errorFor("seo.facebookPixelId");

  const tracking = (key: keyof SeoSettings, id: string, label: string, placeholder: string, error?: string) => (
    <SettingsField label={label} htmlFor={id} error={error}>
      <input
        id={id}
        placeholder={placeholder}
        value={value[key]}
        aria-invalid={!!error || undefined}
        onChange={(event) => onChange({ [key]: event.target.value })}
        className={monoInput}
      />
    </SettingsField>
  );

  return (
    <div className="flex flex-col gap-6">
      <SettingsSectionHeader title="SEO" description="Defaults for pages without their own SEO fields, plus tracking." />

      <div aria-label="Google result preview" className="flex flex-col gap-1.5 rounded-xl bg-surface-2 p-5 font-[Arial,sans-serif]">
        <span className="eyebrow mb-1.5 font-sans">Google preview · home page</span>
        <span className="flex items-center gap-2 text-xs text-[#202124]">
          <span className="flex size-7 items-center justify-center rounded-full bg-brand font-heading text-[10px] leading-none font-bold text-white">CF</span>
          <span className="flex flex-col">
            <span>{storeName}</span>
            <span className="text-[#4d5156]">https://{STORE_HOST}</span>
          </span>
        </span>
        <span className="mt-1 text-xl leading-[1.3] text-[#1a0dab]">{clip(value.metaTitle, SEO_TITLE_LIMIT)}</span>
        <span className="text-sm leading-[1.55] text-[#4d5156]">{clip(value.metaDescription, SEO_DESCRIPTION_LIMIT)}</span>
      </div>

      <SettingsField
        label="Default meta title"
        htmlFor="s1"
        counter={`${value.metaTitle.length}/${SEO_TITLE_LIMIT}`}
        counterInvalid={value.metaTitle.length > SEO_TITLE_LIMIT}
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
        counterInvalid={value.metaDescription.length > SEO_DESCRIPTION_LIMIT}
        error={errorFor("seo.metaDescription")}
      >
        <textarea
          id="s2"
          value={value.metaDescription}
          aria-invalid={!!errorFor("seo.metaDescription") || undefined}
          onChange={(event) => onChange({ metaDescription: event.target.value })}
          className={cn(formStyles.textarea, "min-h-20")}
        />
      </SettingsField>

      <SettingsField label="Social share image (Open Graph)" hint="Shown when a link is shared on Facebook, WhatsApp or Messenger.">
        <ImageDrop
          ariaLabel="Replace share image"
          disabled={uploading}
          onFile={(file) => onUpload("seo", "ogImage", file)}
          className="relative h-50 flex-row flex-wrap items-center justify-between gap-4 rounded-xl border-0 bg-choco p-8 text-left text-white hover:border-0 hover:bg-choco-2"
        >
          {images.ogImage ? (
            <img src={images.ogImage} alt="" className="absolute inset-0 size-full object-cover" />
          ) : (
            <span className="flex flex-col gap-2">
              <span className="font-heading text-[30px] leading-[1.1] font-bold">
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

      <div className="flex flex-col gap-3">
        <SettingsEyebrow>Tracking &amp; verification</SettingsEyebrow>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-4">
          {tracking("googleAnalyticsId", "k1", "Google Analytics 4 ID", "G-XXXXXXXXXX", gaError)}
          {tracking("facebookPixelId", "k2", "Meta Pixel ID", "15–16 digits", pixelError)}
          {tracking("searchConsoleCode", "k3", "Search Console verification", "google-site-verification code", errorFor("seo.searchConsoleCode"))}
        </div>
      </div>

      <SettingsField label="robots.txt" htmlFor="rb" hint="Advanced." error={errorFor("seo.robotsTxt")}>
        <textarea
          id="rb"
          value={value.robotsTxt}
          aria-invalid={!!errorFor("seo.robotsTxt") || undefined}
          onChange={(event) => onChange({ robotsTxt: event.target.value })}
          className={cn(formStyles.textarea, "min-h-35 font-mono text-[13px] leading-[1.6]")}
        />
      </SettingsField>
    </div>
  );
}
