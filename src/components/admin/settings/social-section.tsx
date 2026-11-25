import { SOCIAL_LINKS } from "@/config/settings";
import { formStyles } from "@/lib/form-styles";
import { socialHandle, socialUrl } from "@/lib/settings";
import { SettingsField, SettingsSectionHeader } from "./settings-field";
import type { SectionProps } from "./settings-types";

export function SocialSection({ value, onChange, errorFor }: SectionProps<"social">) {
  return (
    <div className="flex flex-col gap-5">
      <SettingsSectionHeader title="Social links" description="Shown in the website footer." />

      {SOCIAL_LINKS.map(({ key, label, prefix }) => {
        const handle = socialHandle(value[key], prefix);
        const error = /\s/.test(handle) ? "Use only the handle, without spaces." : errorFor(`social.${key}`);

        return (
          <SettingsField key={key} label={label} htmlFor={key} error={error}>
            <div className={formStyles.inputGroup}>
              <span className={formStyles.groupAddon}>{prefix}</span>
              <input
                id={key}
                placeholder="your-handle"
                value={handle}
                aria-invalid={!!error || undefined}
                onChange={(event) => onChange({ [key]: socialUrl(event.target.value, prefix) })}
                className={formStyles.groupInput}
              />
            </div>
          </SettingsField>
        );
      })}
    </div>
  );
}
