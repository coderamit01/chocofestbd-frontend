import { SettingsField, SettingsTile } from "@/components/admin/settings/settings-field";
import { Icon } from "@/components/shared/icon";
import { Button } from "@/components/ui/button";
import { PASSWORD_RULES } from "@/config/profile";
import { dhakaDate } from "@/lib/dhaka-time";
import { formStyles } from "@/lib/form-styles";
import { passwordChecks, passwordStrength } from "@/lib/profile";
import { cn } from "@/lib/utils";
import type { PasswordErrors, PasswordValues } from "@/types/profile";
import { ProfileCard, ProfileCardNote, ProfileCardTitle } from "./profile-card";

type ProfilePasswordCardProps = {
  changedAt: string | null;
  values: PasswordValues;
  errors: PasswordErrors;
  isVisible: boolean;
  isSaving: boolean;
  onChange: (patch: Partial<PasswordValues>) => void;
  onToggleVisible: () => void;
  onCancel: () => void;
  onSave: () => void;
};

const FIELDS: { key: keyof PasswordValues; label: string; autoComplete: string; error: string }[] = [
  { key: "current", label: "Current password", autoComplete: "current-password", error: "Enter your current password." },
  { key: "next", label: "New password", autoComplete: "new-password", error: "Meet all four rules below." },
  { key: "confirm", label: "Confirm new password", autoComplete: "new-password", error: "Passwords don’t match." },
];

export function ProfilePasswordCard({
  changedAt,
  values,
  errors,
  isVisible,
  isSaving,
  onChange,
  onToggleVisible,
  onCancel,
  onSave,
}: ProfilePasswordCardProps) {
  const strength = passwordStrength(values.next);
  const checks = passwordChecks(values.next);

  return (
    <ProfileCard className="gap-5">
      <div className="flex items-center gap-3">
        <SettingsTile icon="lock" tone="brand" />
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <ProfileCardTitle>Password</ProfileCardTitle>
          {changedAt && <ProfileCardNote>Last changed {dhakaDate(changedAt)}</ProfileCardNote>}
        </span>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-5">
        {FIELDS.map((field) => (
          <SettingsField
            key={field.key}
            label={field.label}
            htmlFor={`password-${field.key}`}
            required
            error={errors[field.key] ? field.error : undefined}
          >
            <div className={formStyles.inputGroup}>
              <input
                id={`password-${field.key}`}
                className={formStyles.groupInput}
                type={isVisible ? "text" : "password"}
                autoComplete={field.autoComplete}
                value={values[field.key]}
                aria-invalid={errors[field.key] || undefined}
                onChange={(event) => onChange({ [field.key]: event.target.value })}
              />
              <Button variant="ghost" size="sm" className="m-1 h-auto" onClick={onToggleVisible}>
                {isVisible ? "Hide" : "Show"}
              </Button>
            </div>
          </SettingsField>
        ))}
      </div>

      <div className="flex flex-col gap-2.5 rounded-[14px] bg-surface-2 px-4.5 py-4">
        <div className="flex items-center justify-between gap-3">
          <ProfileCardNote>Strength</ProfileCardNote>
          <span className={cn("text-[13px] font-semibold", strength.text)}>{strength.label}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-line-2">
          <div className={cn("h-full rounded-full transition-[width] duration-200", strength.bar)} style={{ width: `${strength.pct}%` }} />
        </div>
        <div className="mt-1 grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-2 text-[12.5px]">
          {PASSWORD_RULES.map((rule, index) => (
            <span key={rule} className={cn("flex items-center gap-1.5", checks[index] ? "text-success" : "text-ink-3")}>
              {checks[index] ? (
                <Icon name="check" size={15} strokeWidth={1.8} />
              ) : (
                <span className="inline-flex size-[15px] items-center justify-center">
                  <span className="size-[5px] rounded-full bg-current" />
                </span>
              )}
              {rule}
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2.5">
        <Button variant="soft" onClick={onCancel} disabled={isSaving}>
          Cancel
        </Button>
        <Button onClick={onSave} aria-busy={isSaving || undefined}>
          {isSaving ? "Updating…" : "Update password"}
        </Button>
      </div>
    </ProfileCard>
  );
}
