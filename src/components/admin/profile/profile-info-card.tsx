import { SettingsField } from "@/components/admin/settings/settings-field";
import { Icon } from "@/components/shared/icon";
import { Button } from "@/components/ui/button";
import { PROFILE_TIME_ZONE_LABEL } from "@/config/profile";
import { cleanPhoneInput } from "@/lib/profile";
import { formStyles } from "@/lib/form-styles";
import type { ProfileInfoErrors, ProfileInfoValues } from "@/types/profile";
import { ProfileCard, ProfileCardNote, ProfileCardTitle } from "./profile-card";

type ProfileInfoCardProps = {
  email: string;
  values: ProfileInfoValues;
  errors: ProfileInfoErrors;
  isDirty: boolean;
  isSaving: boolean;
  onChange: (patch: Partial<ProfileInfoValues>) => void;
  onDiscard: () => void;
  onSave: () => void;
};

export function ProfileInfoCard({ email, values, errors, isDirty, isSaving, onChange, onDiscard, onSave }: ProfileInfoCardProps) {
  return (
    <ProfileCard className="gap-6">
      <div className="flex flex-col gap-1">
        <ProfileCardTitle>Personal information</ProfileCardTitle>
        <p className="text-[12.5px] text-ink-3">Shown to other staff on orders, notes and the activity log.</p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-5">
        <SettingsField label="Full name" htmlFor="profile-name" required error={errors.name ? "Enter your name." : undefined}>
          <input
            id="profile-name"
            className={formStyles.input}
            autoComplete="name"
            value={values.name}
            aria-invalid={errors.name || undefined}
            onChange={(event) => onChange({ name: event.target.value })}
          />
        </SettingsField>

        <SettingsField label="Email" htmlFor="profile-email" required hint="Used to sign in and for password resets.">
          <input id="profile-email" className={formStyles.input} type="email" value={email} disabled readOnly />
        </SettingsField>

        <SettingsField
          label="Mobile number"
          htmlFor="profile-phone"
          required
          error={errors.phone ? "11 digits starting 013–019." : undefined}
        >
          <input
            id="profile-phone"
            className={formStyles.input}
            inputMode="numeric"
            autoComplete="tel"
            placeholder="01XXXXXXXXX"
            value={values.phone}
            aria-invalid={errors.phone || undefined}
            onChange={(event) => onChange({ phone: cleanPhoneInput(event.target.value) })}
          />
        </SettingsField>

        <SettingsField label="Time zone" hint="Set for the whole store in Settings.">
          <div className="flex h-10.5 items-center gap-2 rounded-[10px] border border-input bg-surface-3 px-3.5 text-sm text-ink-2">
            <Icon name="globe" size={16} strokeWidth={1.8} />
            {PROFILE_TIME_ZONE_LABEL}
          </div>
        </SettingsField>
      </div>

      <div className="flex flex-wrap items-center gap-2.5 border-t border-dashed border-line-dash pt-4.5">
        <ProfileCardNote className="flex-1">{isDirty ? "You have unsaved changes" : "All changes saved"}</ProfileCardNote>
        <Button variant="soft" onClick={onDiscard} disabled={!isDirty || isSaving}>
          Discard
        </Button>
        <Button onClick={onSave} disabled={!isDirty} aria-busy={isSaving || undefined}>
          <Icon name="check" size={17} strokeWidth={1.8} />
          {isSaving ? "Saving…" : "Save changes"}
        </Button>
      </div>
    </ProfileCard>
  );
}
