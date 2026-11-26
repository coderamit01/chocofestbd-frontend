import { cn } from "@/lib/utils";

type SegmentedControlProps<T extends string> = {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
  role?: "group" | "tablist";
  className?: string;
};

export function SegmentedControl<T extends string>({ options, value, onChange, ariaLabel, role = "group", className }: SegmentedControlProps<T>) {
  return (
    <div role={role} aria-label={ariaLabel} className={cn("inline-flex gap-1 self-start rounded-[12px] bg-surface-2 p-1", className)}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role={role === "tablist" ? "tab" : undefined}
          aria-selected={role === "tablist" ? option.value === value : undefined}
          aria-pressed={role === "group" ? option.value === value : undefined}
          onClick={() => onChange(option.value)}
          className={cn(
            "h-8 rounded-[9px] px-3.5 text-[13px] leading-none font-medium whitespace-nowrap",
            option.value === value ? "bg-surface text-ink shadow-seg" : "text-ink-2 hover:text-ink"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
