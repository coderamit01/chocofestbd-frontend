import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ToggleSwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: ReactNode;
  ariaLabel?: string;
  disabled?: boolean;
  className?: string;
};

export function ToggleSwitch({ checked, onChange, label, ariaLabel, disabled, className }: ToggleSwitchProps) {
  return (
    <label className={cn("relative inline-flex cursor-pointer items-center gap-3 text-sm", disabled && "cursor-not-allowed opacity-60", className)}>
      {label}
      <input
        type="checkbox"
        aria-label={ariaLabel}
        checked={checked}
        disabled={disabled}
        onChange={(event) => onChange(event.target.checked)}
        className="peer absolute size-px opacity-0"
      />
      <span className="relative h-5.5 w-10 flex-none rounded-full bg-[#ddd5ce] transition-colors peer-checked:bg-brand peer-focus-visible:shadow-focus after:absolute after:top-[3px] after:left-[3px] after:size-4 after:rounded-full after:bg-white after:shadow-[0_1px_2px_rgb(0_0_0/18%)] after:transition-transform peer-checked:after:translate-x-[18px]" />
    </label>
  );
}
