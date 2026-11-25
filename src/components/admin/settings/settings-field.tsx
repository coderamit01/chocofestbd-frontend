import type { ReactNode } from "react";
import { formStyles } from "@/lib/form-styles";
import { cn } from "@/lib/utils";

type SettingsFieldProps = {
  label: string;
  htmlFor?: string;
  required?: boolean;
  hint?: ReactNode;
  counter?: ReactNode;
  error?: string;
  className?: string;
  children: ReactNode;
};

export function SettingsField({ label, htmlFor, required, hint, counter, error, className, children }: SettingsFieldProps) {
  const labelNode = htmlFor ? (
    <label htmlFor={htmlFor} className={formStyles.label}>
      {label}
      {required && <span className={formStyles.required}>*</span>}
    </label>
  ) : (
    <span className={formStyles.label}>{label}</span>
  );

  return (
    <div className={cn(formStyles.field, className)}>
      {counter ? (
        <div className="flex items-center justify-between">
          {labelNode}
          <span className={cn(formStyles.hint, "tabular-nums")}>{counter}</span>
        </div>
      ) : (
        labelNode
      )}
      {children}
      {error ? <span className={formStyles.error}>{error}</span> : hint && <span className={formStyles.hint}>{hint}</span>}
    </div>
  );
}

export function SettingsSectionHeader({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="font-heading text-lg leading-[1.3] font-semibold text-ink">{title}</h3>
      <p className="text-[12.5px] text-ink-3">{description}</p>
    </div>
  );
}

export function SettingsPanel({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("flex flex-col gap-4 rounded-2xl bg-surface-2 p-5", className)}>{children}</div>;
}
