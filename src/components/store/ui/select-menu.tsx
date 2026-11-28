"use client";

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "cn";
import { Icon } from "@/components/shared/icon";
import { useDismiss } from "@/hooks/use-dismiss";
import { useFieldControl } from "./form-field-context";

export type SelectMenuOption<T extends string = string> = {
  value: T;
  label: string;
};

const SIZES = {
  field: {
    root: "block",
    trigger:
      "h-[50px] w-full rounded-[12px] border-[1.5px] border-[#e7e0da] bg-white pl-3.5 text-sm leading-none data-invalid:border-[#d92d20] data-invalid:bg-[#fff8f7]",
  },
  compact: {
    root: "inline-block",
    trigger:
      "h-9 w-auto rounded-[10px] border border-transparent bg-surface-2 pl-3 text-[13px] leading-[1.4] focus:border-brand",
  },
};

const KEY_STEPS: Record<string, (index: number, last: number) => number> = {
  ArrowDown: (index, last) => (index >= last ? 0 : index + 1),
  ArrowUp: (index, last) => (index <= 0 ? last : index - 1),
  Home: () => 0,
  End: (_, last) => last,
};

type SelectMenuProps<T extends string> = {
  options: SelectMenuOption<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: keyof typeof SIZES;
  id?: string;
  name?: string;
  ariaLabel?: string;
  invalid?: boolean;
  disabled?: boolean;
  className?: string;
  triggerClassName?: string;
};

export function SelectMenu<T extends string>({
  options,
  value,
  onChange,
  size = "field",
  id,
  name,
  ariaLabel,
  invalid,
  disabled,
  className,
  triggerClassName,
}: SelectMenuProps<T>) {
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const [open, setOpen] = useState(false);
  const control = useFieldControl({ id, invalid });
  const close = useCallback(() => setOpen(false), []);
  useDismiss(rootRef, open, close);

  useEffect(() => {
    if (!open) return;
    const list = listRef.current;
    const selected = list?.querySelector<HTMLElement>('[aria-selected="true"]') ?? list?.querySelector<HTMLElement>('[role="option"]');
    selected?.focus();
  }, [open]);

  const current = options.find((option) => option.value === value) ?? options[0];

  const closeAndFocus = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    setOpen(true);
  };

  const onListKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeAndFocus();
      return;
    }
    if (event.key === "Tab") {
      close();
      return;
    }
    const step = KEY_STEPS[event.key];
    if (!step) return;
    event.preventDefault();
    const items = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('[role="option"]'));
    const index = items.indexOf(document.activeElement as HTMLElement);
    items[step(index, items.length - 1)]?.focus();
  };

  const pick = (next: T) => {
    closeAndFocus();
    if (next !== value) onChange(next);
  };

  return (
    <div ref={rootRef} className={cn("relative", SIZES[size].root, className)}>
      <button
        ref={triggerRef}
        id={control.id}
        type="button"
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        data-invalid={control["aria-invalid"]}
        aria-describedby={control["aria-describedby"]}
        disabled={disabled}
        onClick={() => setOpen((next) => !next)}
        onKeyDown={onTriggerKeyDown}
        className={cn(
          "select-chevron cursor-pointer overflow-hidden pr-[38px] text-left font-sans font-normal text-ellipsis whitespace-nowrap text-ink outline-none transition-[border-color,box-shadow,background-color] duration-150 focus:shadow-[0_0_0_3px_rgba(238,86,21,0.2)] disabled:cursor-not-allowed disabled:text-ink-4",
          SIZES[size].trigger,
          triggerClassName,
        )}
      >
        {current?.label}
      </button>
      {name && <input type="hidden" name={name} value={value} />}
      {open && (
        <div
          ref={listRef}
          id={listId}
          role="listbox"
          aria-label={ariaLabel}
          onKeyDown={onListKeyDown}
          className="absolute top-[calc(100%+6px)] left-0 z-46 max-h-[300px] w-max max-w-[340px] min-w-full animate-pop overflow-auto rounded-[14px] bg-surface p-1.5 shadow-pop"
        >
          {options.map((option) => {
            const selected = option.value === current?.value;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                tabIndex={-1}
                aria-selected={selected}
                onClick={() => pick(option.value)}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-[9px] px-3 py-2.5 text-left font-sans text-sm leading-[1.2] outline-none",
                  selected
                    ? "bg-brand-50 font-medium text-brand-text"
                    : "font-normal text-ink hover:bg-surface-2 focus-visible:bg-surface-2",
                )}
              >
                <span className="min-w-0 flex-1">{option.label}</span>
                {selected && <Icon name="check" size={17} strokeWidth={2} className="flex-none text-ink-3" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
