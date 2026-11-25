"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type ImageDropProps = {
  ariaLabel: string;
  accept?: string;
  disabled?: boolean;
  onFile: (file: File) => void;
  className?: string;
  children: ReactNode;
};

export function ImageDrop({ ariaLabel, accept = "image/*", disabled, onFile, className, children }: ImageDropProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <button
        type="button"
        aria-label={ariaLabel}
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-[14px] border-[1.5px] border-dashed border-line-2 bg-surface-2 text-center text-[13.5px] leading-[1.3] font-medium text-ink-2 outline-none hover:border-brand hover:bg-brand-50 focus-visible:shadow-focus disabled:cursor-wait disabled:opacity-60",
          className
        )}
      >
        {children}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        hidden
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) onFile(file);
          event.target.value = "";
        }}
      />
    </>
  );
}
