"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { saveSettingsAction } from "@/actions/setting.actions";
import { Icon } from "@/components/shared/icon";
import { SETTINGS_TABS, SETTINGS_TAB_GROUPS } from "@/config/settings";
import { cn } from "@/lib/utils";
import { SettingClient } from "@/services/setting.client";
import type { EditableSettingGroup, SettingImages, SettingsTab, SettingValues, TelegramStatus } from "@/types/setting";
import { GeneralSection } from "./general-section";
import { PagesSection } from "./pages-section";
import { PaymentSection } from "./payment-section";
import { SeoSection } from "./seo-section";
import { SocialSection } from "./social-section";
import { TelegramSection } from "./telegram-section";
import type { ImageUploadHandler } from "./settings-types";
import { UnsavedChangesBar } from "./unsaved-changes-bar";

type SettingsManagerProps = {
  initialValues: SettingValues;
  images: SettingImages;
  telegramStatus: TelegramStatus | null;
  initialTab: SettingsTab;
  dateCode: string;
};

const GROUPS = Object.values(SETTINGS_TAB_GROUPS).flat();

const tabHasError = (tab: SettingsTab, fields: string[]) =>
  fields.some((field) => SETTINGS_TAB_GROUPS[tab].some((group) => field === group || field.startsWith(`${group}.`)));

export function SettingsManager({ initialValues, images, telegramStatus, initialTab, dateCode }: SettingsManagerProps) {
  const router = useRouter();
  const [tab, setTab] = useState<SettingsTab>(initialTab);
  const [baseline, setBaseline] = useState(initialValues);
  const [draft, setDraft] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [isSaving, startSaving] = useTransition();

  const dirtyGroups = useMemo(
    () => GROUPS.filter((group) => JSON.stringify(draft[group]) !== JSON.stringify(baseline[group])),
    [draft, baseline]
  );

  const update =
    <G extends EditableSettingGroup>(group: G) =>
    (patch: Partial<SettingValues[G]>) => {
      setDraft((current) => ({ ...current, [group]: { ...current[group], ...patch } }));
      setErrors((current) => {
        const next = { ...current };
        Object.keys(patch).forEach((key) => {
          Object.keys(next).forEach((field) => field.startsWith(`${group}.${key}`) && delete next[field]);
        });
        delete next[group];
        return next;
      });
    };

  const errorFor = (path: string) => errors[path];

  const selectTab = (next: SettingsTab) => {
    setTab(next);
    const url = new URL(window.location.href);
    if (next === "general") url.searchParams.delete("tab");
    else url.searchParams.set("tab", next);
    window.history.replaceState(null, "", url);
  };

  const discard = () => {
    setDraft(baseline);
    setErrors({});
  };

  const save = () =>
    startSaving(async () => {
      const changes = Object.fromEntries(dirtyGroups.map((group) => [group, draft[group]])) as Partial<SettingValues>;
      const result = await saveSettingsAction(changes);

      if (result.savedGroups.length) {
        setBaseline((current) => ({
          ...current,
          ...Object.fromEntries(result.savedGroups.map((group) => [group, draft[group]])),
        }));
      }

      setErrors(Object.fromEntries(result.fieldErrors.map((item) => [item.field, item.message])));

      if (result.success) {
        toast.success("Settings saved", { description: result.message });
        return;
      }

      const failedTab = SETTINGS_TABS.find(({ value }) => tabHasError(value, result.fieldErrors.map(({ field }) => field)));
      if (failedTab) selectTab(failedTab.value);
      toast.error("Some settings weren’t saved", { description: result.message });
    });

  const upload: ImageUploadHandler = async (group, field, file) => {
    setUploadingField(field);
    try {
      await SettingClient.uploadImage(group, field, file);
      toast.success("Image updated", { description: "The new image is live." });
      router.refresh();
    } catch (error) {
      toast.error("Couldn’t upload image", { description: error instanceof Error ? error.message : "Please try again." });
    } finally {
      setUploadingField(null);
    }
  };

  return (
    <>
      <div className="flex flex-wrap items-start gap-6">
        <nav aria-label="Settings sections" className="flex flex-[0_1_260px] flex-col gap-1 rounded-xl bg-card p-3 max-[900px]:flex-[1_1_100%]">
          {SETTINGS_TABS.map((item) => {
            const active = tab === item.value;
            const hasError = tabHasError(item.value, Object.keys(errors));

            return (
              <button
                key={item.value}
                type="button"
                aria-current={active ? "page" : undefined}
                onClick={() => selectTab(item.value)}
                className={cn(
                  "flex h-11.5 items-center gap-3 rounded-xl px-3.5 text-left text-[14.5px] leading-none outline-none focus-visible:shadow-focus",
                  active ? "bg-brand font-medium text-white" : "font-normal text-ink-2 hover:bg-surface-2 hover:text-ink"
                )}
              >
                <Icon name={item.icon} />
                <span className="flex-1">{item.label}</span>
                {hasError && <span aria-label="Has errors" className={cn("size-2 rounded-full", active ? "bg-white" : "bg-danger")} />}
              </button>
            );
          })}
        </nav>

        <section className="flex-[1_1_600px] rounded-xl bg-card p-7 max-[900px]:p-4.5">
          {tab === "general" && (
            <GeneralSection
              general={draft.general}
              numbering={draft.numbering}
              images={images.general}
              uploadingField={uploadingField}
              dateCode={dateCode}
              onGeneralChange={update("general")}
              onNumberingChange={update("numbering")}
              onUpload={upload}
              errorFor={errorFor}
            />
          )}
          {tab === "payment" && <PaymentSection value={draft.payment} onChange={update("payment")} errorFor={errorFor} />}
          {tab === "notifications" && (
            <TelegramSection
              value={draft.notifications}
              onChange={update("notifications")}
              errorFor={errorFor}
              status={telegramStatus}
            />
          )}
          {tab === "seo" && (
            <SeoSection
              value={draft.seo}
              onChange={update("seo")}
              errorFor={errorFor}
              images={images.seo}
              storeName={draft.general.storeName}
              tagline={draft.general.tagline}
              uploading={uploadingField === "ogImage"}
              onUpload={upload}
            />
          )}
          {tab === "social" && <SocialSection value={draft.social} onChange={update("social")} errorFor={errorFor} />}
          {tab === "pages" && <PagesSection value={draft.legal} onChange={update("legal")} errorFor={errorFor} />}
        </section>
      </div>

      {dirtyGroups.length > 0 && (
        <UnsavedChangesBar isSaving={isSaving} onDiscard={discard} onSave={save} />
      )}
    </>
  );
}

