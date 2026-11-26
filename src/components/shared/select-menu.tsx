"use client";

import { useId, useRef, useState } from "react";
import { Icon } from "@/components/shared/icon";
import { useDismiss } from "@/hooks/use-dismiss";
import { cn } from "@/lib/utils";

export type SelectMenuOption<T extends string> = {
  value: T;
  label: string;
};

type SelectMenuProps<T extends string> = {
  options: SelectMenuOption<T>[];
  value: T;
  onChange: (value: T) => void;
  id?: string;
  ariaLabel?: string;
  size?: "default" | "sm";
  invalid?: boolean;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
};

const TRIGGER = {
  default:
    "h-10.5 w-full rounded-[10px] border border-input bg-surface-2 pl-3.5 text-sm focus-visible:border-brand focus-visible:bg-surface aria-expanded:border-brand aria-expanded:bg-surface",
  sm: "h-9 w-full rounded-[10px] border border-transparent bg-surface-2 pl-3 text-[13px] focus-visible:border-brand",
};

export function SelectMenu<T extends string>({
  options,
  value,
  onChange,
  id,
  ariaLabel,
  size = "default",
  invalid,
  disabled,
  className,
  triggerClassName,
}: SelectMenuProps<T>) {
  const ref = useRef<HTMLDivElement>(null);
  const listId = useId();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  useDismiss(ref, open, close);

  const current = options.find((option) => option.value === value) ?? options[0];

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        id={id}
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        data-invalid={invalid || undefined}
        disabled={disabled}
        onClick={() => setOpen((next) => !next)}
        className={cn(
          "select-chevron block cursor-pointer overflow-hidden pr-[38px] text-left text-ink text-ellipsis whitespace-nowrap outline-none transition-[border-color,box-shadow,background-color] focus-visible:shadow-focus disabled:cursor-not-allowed disabled:text-ink-4 data-invalid:border-danger data-invalid:bg-[#fffafa]",
          TRIGGER[size],
          triggerClassName
        )}
      >
        {current?.label}
      </button>
      {open && (
        <div
          id={listId}
          role="listbox"
          aria-label={ariaLabel}
          className="absolute top-[calc(100%+6px)] left-0 z-46 max-h-[300px] w-max max-w-[340px] min-w-full animate-pop overflow-auto rounded-[14px] bg-surface p-1.5 shadow-pop"
        >
          {options.map((option) => {
            const selected = option.value === current?.value;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => {
                  close();
                  if (!selected) onChange(option.value);
                }}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-[9px] px-3 py-2.5 text-left text-sm leading-[1.2] outline-none hover:bg-surface-2 focus-visible:bg-surface-2",
                  selected ? "bg-brand-50 font-medium text-brand-text hover:bg-brand-50" : "text-ink hover:text-ink"
                )}
              >
                <span className="min-w-0 flex-1">{option.label}</span>
                {selected && <Icon name="check" size={17} strokeWidth={2} className="text-ink-3" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
