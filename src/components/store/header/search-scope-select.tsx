"use client";

import { useCallback, useRef, useState } from "react";
import { Icon } from "@/components/shared/icon";
import { useDismiss } from "@/hooks/use-dismiss";
import { cn } from "cn";
import type { SearchScope } from "@/types/store";

type SearchScopeSelectProps = {
  scopes: SearchScope[];
  value: string;
  onChange: (value: string) => void;
  onOpen?: () => void;
};

export function SearchScopeSelect({ scopes, value, onChange, onOpen }: SearchScopeSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setOpen(false), []);
  useDismiss(ref, open, close);

  const current = scopes.find((scope) => scope.value === value) ?? scopes[0];

  return (
    <div ref={ref} className="relative h-full flex-none border-r border-[#ece5df]">
      <button
        type="button"
        aria-label="Search in"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => {
          if (!open) onOpen?.();
          setOpen(!open);
        }}
        className="select-chevron h-full w-full min-w-[150px] truncate rounded-l-[12px] bg-transparent pr-[34px] pl-4 text-left font-sans text-[13.5px] leading-none font-medium text-ink-2"
      >
        {current.label}
      </button>
      {open && (
        <div
          role="listbox"
          aria-label="Search in"
          className="absolute top-[calc(100%+6px)] left-0 z-[46] max-h-[300px] w-max max-w-[340px] min-w-full animate-pop overflow-auto rounded-[14px] bg-surface p-1.5 shadow-pop"
        >
          {scopes.map((scope) => {
            const selected = scope.value === current.value;
            return (
              <button
                key={scope.value}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => {
                  onChange(scope.value);
                  close();
                }}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-left font-sans text-sm leading-[1.2]",
                  selected ? "bg-brand-50 font-medium text-brand-text" : "text-ink hover:bg-surface-2",
                )}
              >
                <span className="min-w-0 flex-1">{scope.label}</span>
                {selected && <Icon name="check" size={17} strokeWidth={2} className="text-ink-3" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
