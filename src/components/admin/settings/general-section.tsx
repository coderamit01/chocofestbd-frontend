/* eslint-disable @next/next/no-img-element */
import { formStyles } from "@/lib/form-styles";
import type { GeneralSettings, NumberingSettings, SettingImages } from "@/types/setting";
import { ImageDrop } from "./image-drop";
import { SettingsField, SettingsSectionHeader } from "./settings-field";
import type { ImageUploadHandler } from "./settings-types";

type GeneralSectionProps = {
  general: GeneralSettings;
  numbering: NumberingSettings;
  images: SettingImages["general"];
  uploadingField: string | null;
  dateCode: string;
  onGeneralChange: (patch: Partial<GeneralSettings>) => void;
  onNumberingChange: (patch: Partial<NumberingSettings>) => void;
  onUpload: ImageUploadHandler;
  errorFor: (path: string) => string | undefined;
};

const monoClass = `${formStyles.input} font-mono`;

function BrandMark({ size }: { size: "lg" | "sm" }) {
  return size === "lg" ? (
    <span className="flex size-13 items-center justify-center rounded-[15px] bg-brand font-heading text-[19px] leading-none font-bold text-white">CF</span>
  ) : (
    <span className="flex size-8 items-center justify-center rounded-[9px] bg-brand font-heading text-xs leading-none font-bold text-white">CF</span>
  );
}

export function GeneralSection({
  general,
  numbering,
  images,
  uploadingField,
  dateCode,
  onGeneralChange,
  onNumberingChange,
  onUpload,
  errorFor,
}: GeneralSectionProps) {
  const text = (key: keyof GeneralSettings, id: string, label: string, options: { required?: boolean; type?: string; placeholder?: string; numeric?: boolean } = {}) => (
    <SettingsField label={label} htmlFor={id} required={options.required} error={errorFor(`general.${key}`)}>
      <input
        id={id}
        type={options.type ?? "text"}
        inputMode={options.numeric ? "numeric" : undefined}
        placeholder={options.placeholder}
        value={general[key]}
        aria-invalid={!!errorFor(`general.${key}`) || undefined}
        onChange={(event) => onGeneralChange({ [key]: event.target.value })}
        className={options.numeric ? `${formStyles.input} tabular-nums` : formStyles.input}
      />
    </SettingsField>
  );

  const prefix = (key: keyof NumberingSettings, id: string, label: string, noun: string) => (
    <SettingsField
      label={label}
      htmlFor={id}
      error={errorFor(`numbering.${key}`)}
      hint={`Next ${noun}: ${numbering[key] || "—"}-${dateCode}-•••••`}
    >
      <input
        id={id}
        value={numbering[key]}
        aria-invalid={!!errorFor(`numbering.${key}`) || undefined}
        onChange={(event) => onNumberingChange({ [key]: event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10) })}
        className={monoClass}
      />
    </SettingsField>
  );

  return (
    <div className="flex flex-col gap-6">
      <SettingsSectionHeader title="General" description="Store identity used on the website, invoices and SMS." />

      <div className="flex flex-wrap items-start gap-5">
        <div className="flex flex-col gap-2">
          <span className={formStyles.label}>Logo</span>
          <ImageDrop
            ariaLabel="Replace logo"
            disabled={uploadingField === "logo"}
            onFile={(file) => onUpload("general", "logo", file)}
            className="size-30"
          >
            {images.logo ? <img src={images.logo} alt="" className="max-h-13 max-w-[88px] object-contain" /> : <BrandMark size="lg" />}
            <span className="text-xs text-ink-3">{uploadingField === "logo" ? "Uploading…" : "Replace"}</span>
          </ImageDrop>
        </div>
        <div className="flex flex-col gap-2">
          <span className={formStyles.label}>Favicon</span>
          <ImageDrop
            ariaLabel="Replace favicon"
            disabled={uploadingField === "favicon"}
            onFile={(file) => onUpload("general", "favicon", file)}
            className="size-18"
          >
            {images.favicon ? <img src={images.favicon} alt="" className="size-8 object-contain" /> : <BrandMark size="sm" />}
          </ImageDrop>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-5">
        {text("storeName", "g1", "Store name", { required: true })}
        {text("tagline", "g2", "Tagline")}
        {text("phone", "g3", "Phone", { numeric: true })}
        {text("whatsapp", "g4", "WhatsApp", { numeric: true })}
        {text("email", "g5", "Email", { type: "email" })}
        {text("address", "g6", "Address", { placeholder: "Store or warehouse address" })}
        {prefix("orderPrefix", "g7", "Order number prefix", "order")}
        {prefix("invoicePrefix", "g8", "Invoice prefix", "invoice")}
      </div>
    </div>
  );
}
