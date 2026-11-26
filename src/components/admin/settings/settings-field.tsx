import type { ReactNode } from "react";
import { Icon, type IconName } from "@/components/shared/icon";
import { formStyles } from "@/lib/form-styles";
import { cn } from "@/lib/utils";

type SettingsFieldProps = {
  label: string;
  htmlFor?: string;
  required?: boolean;
  hint?: ReactNode;
  counter?: ReactNode;
  counterInvalid?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
};

export function SettingsField({ label, htmlFor, required, hint, counter, counterInvalid, error, className, children }: SettingsFieldProps) {
  const labelNode = htmlFor ? (
    <label htmlFor={htmlFor} className={formStyles.label}>
      {label}
      {required && <span className={formStyles.required}>*</span>}
    </label>
  ) : (
    <span className={formStyles.label}>
      {label}
      {required && <span className={formStyles.required}>*</span>}
    </span>
  );

  return (
    <div className={cn(formStyles.field, className)}>
      {counter ? (
        <div className="flex items-center justify-between">
          {labelNode}
          <span className={counterInvalid ? formStyles.error : cn(formStyles.hint, "tabular-nums")}>{counter}</span>
        </div>
      ) : (
        labelNode
      )}
      {children}
      {error ? <span className={formStyles.error}>{error}</span> : hint && <span className={formStyles.hint}>{hint}</span>}
    </div>
  );
}

export function SettingsSectionHeader({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-col gap-1">
        <h3 className="font-heading text-xl leading-[1.3] font-semibold text-ink">{title}</h3>
        <p className="text-[12.5px] text-ink-3">{description}</p>
      </div>
      {action}
    </div>
  );
}

export function SettingsPanel({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("flex flex-col gap-4 rounded-xl bg-surface-2 p-[22px]", className)}>{children}</div>;
}

export function SettingsEyebrow({ children }: { children: ReactNode }) {
  return <span className="eyebrow">{children}</span>;
}

export type SettingsTileTone = "brand" | "sky" | "gray" | "mint" | "lav" | "amber" | "rose";

const TILE_TONES: Record<SettingsTileTone, string> = {
  brand: "bg-brand-50 text-brand",
  sky: "bg-info-soft text-info",
  gray: "bg-surface-3 text-ink-2",
  mint: "bg-success-soft text-success",
  lav: "bg-lavender-soft text-lavender",
  amber: "bg-warning-soft text-warning",
  rose: "bg-danger-soft text-danger",
};

export function SettingsTile({ icon, tone, small }: { icon: IconName; tone: SettingsTileTone; small?: boolean }) {
  return (
    <span
      className={cn("flex flex-none items-center justify-center rounded-[36%]", small ? "size-[34px]" : "size-14", TILE_TONES[tone])}
    >
      <Icon name={icon} size={24} strokeWidth={1.8} />
    </span>
  );
}

export function SettingsMonogram({ label, color, size = "md" }: { label: string; color: string; size?: "sm" | "md" }) {
  return (
    <span
      className={cn(
        "flex flex-none items-center justify-center font-heading leading-none font-bold text-white",
        size === "md" ? "size-11 rounded-[12px] text-sm" : "size-[34px] rounded-[9px] text-xs"
      )}
      style={{ background: color }}
    >
      {label}
    </span>
  );
}

type SettingsMethodHeaderProps = {
  badge: ReactNode;
  title: string;
  subtitle: string;
  children?: ReactNode;
};

export function SettingsMethodHeader({ badge, title, subtitle, children }: SettingsMethodHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      {badge}
      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="font-heading text-base leading-[1.3] font-semibold text-ink">{title}</span>
        <span className="text-xs text-ink-3">{subtitle}</span>
      </span>
      {children}
    </div>
  );
}

const CALLOUT_TONES = {
  warning: "bg-warning-soft text-[#7a4a05]",
  danger: "bg-danger-soft text-[#8f2318]",
};

export function SettingsCallout({ tone, className, children }: { tone: keyof typeof CALLOUT_TONES; className?: string; children: ReactNode }) {
  return (
    <div className={cn("flex items-center gap-2.5 rounded-[12px] px-3.5 py-3 text-[13px]", CALLOUT_TONES[tone], className)}>
      <Icon name="alert" size={17} strokeWidth={1.8} className="flex-none" />
      <span>{children}</span>
    </div>
  );
}
