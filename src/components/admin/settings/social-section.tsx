import { Icon } from "@/components/shared/icon";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { SOCIAL_LINKS } from "@/config/settings";
import { formStyles } from "@/lib/form-styles";
import { socialHandle, socialUrl } from "@/lib/settings";
import { cn } from "@/lib/utils";
import {
  SettingsEyebrow,
  SettingsField,
  SettingsMethodHeader,
  SettingsMonogram,
  SettingsPanel,
  SettingsSectionHeader,
  SettingsTile,
} from "./settings-field";
import type { SectionProps } from "./settings-types";

type SocialSectionProps = SectionProps<"social"> & { tagline: string; storeName: string };

const invalidHandle = (handle: string) => /\s|\//.test(handle);

export function SocialSection({ value, onChange, errorFor, tagline, storeName }: SocialSectionProps) {
  const brand = storeName.replace(/\s*BD$/i, "");
  const profiles = SOCIAL_LINKS.map((link) => {
    const handle = socialHandle(value[link.key], link.prefix);
    return { ...link, handle, bad: invalidHandle(handle) };
  });
  const shown = profiles.filter((profile) => profile.handle && !profile.bad);

  return (
    <div className="flex flex-col gap-6">
      <SettingsSectionHeader title="Social" description="Profile links in the footer and the chat buttons on the store." />

      <div className="flex flex-col gap-3">
        <SettingsEyebrow>Profiles</SettingsEyebrow>
        {profiles.map(({ key, label, prefix, mono, color, handle, bad }) => {
          const error = bad ? "Only the handle — no spaces or full links." : errorFor(`social.${key}`);
          const isShown = !!handle && !bad;

          return (
            <div key={key} className="flex flex-wrap items-center gap-3 rounded-[14px] bg-surface-2 px-4 py-3.5">
              <SettingsMonogram label={mono} color={color} />
              <SettingsField label={label} htmlFor={key} error={error} className="min-w-55 flex-1">
                <div className={cn(formStyles.inputGroup, "bg-surface")}>
                  <span className={formStyles.groupAddon}>{prefix}</span>
                  <input
                    id={key}
                    placeholder="your-handle"
                    value={handle}
                    aria-invalid={!!error || undefined}
                    onChange={(event) => onChange({ [key]: socialUrl(event.target.value.trim(), prefix) })}
                    className={formStyles.groupInput}
                  />
                </div>
              </SettingsField>
              <Badge size="sm" variant={isShown ? "success" : "neutral"}>
                {isShown ? "Shown in footer" : "Not added"}
              </Badge>
              <a
                href={isShown ? value[key] : "#"}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${label} profile`}
                aria-disabled={!isShown || undefined}
                className={cn(buttonVariants({ variant: "square", size: "icon-md" }), !isShown && "pointer-events-none opacity-45")}
              >
                <Icon name="external" size={16} strokeWidth={1.8} />
              </a>
            </div>
          );
        })}
      </div>

      <SettingsPanel>
        <SettingsMethodHeader
          badge={<SettingsTile icon="chat" tone="lav" />}
          title="Messenger"
          subtitle="Lets customers message the Facebook page from the store"
        />
        <SettingsField label="Messenger link" htmlFor="m1" error={errorFor("social.messenger")} className="max-w-90">
          <input
            id="m1"
            placeholder="https://m.me/your-page"
            value={value.messenger}
            aria-invalid={!!errorFor("social.messenger") || undefined}
            onChange={(event) => onChange({ messenger: event.target.value.trim() })}
            className={cn(formStyles.input, "bg-surface")}
          />
        </SettingsField>
      </SettingsPanel>

      <div className="flex flex-col gap-3">
        <SettingsEyebrow>Store preview</SettingsEyebrow>
        <div className="relative overflow-hidden rounded-xl bg-choco px-7 pt-6.5 pb-7.5 text-white">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col gap-1.5">
              <span className="font-heading text-xl leading-none font-semibold">
                {brand} <span className="text-[#ff9a66]">BD</span>
              </span>
              <span className="text-[13px] text-[#e8d6cc]">{tagline}</span>
            </div>
            <div className="flex items-center gap-2">
              {shown.map((profile) => (
                <span
                  key={profile.key}
                  title={profile.label}
                  className="flex size-9.5 items-center justify-center rounded-[10px] bg-white/12 font-heading text-xs leading-none font-bold"
                >
                  {profile.mono}
                </span>
              ))}
              {!profiles.some((profile) => profile.handle) && <span className="text-xs text-[#e8d6cc]">No profiles added</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
