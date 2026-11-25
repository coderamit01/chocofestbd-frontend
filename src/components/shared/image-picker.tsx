"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";

type ImagePickerProps = {
  label: string;
  file: File | null;
  currentUrl: string | null;
  onChange: (file: File | null) => void;
  className?: string;
  imageClassName?: string;
};

export function ImagePicker({ label, file, currentUrl, onChange, className, imageClassName }: ImagePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const timer = setTimeout(() => setPreview(url), 0);
    return () => {
      clearTimeout(timer);
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const shown = file ? preview : currentUrl;

  return (
    <>
      <button
        type="button"
        aria-label={shown ? `Replace ${label.toLowerCase()}` : `Upload ${label.toLowerCase()}`}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "relative flex flex-none cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden border-[1.5px] border-dashed border-line-2 bg-surface-2 text-center text-[13.5px] leading-[1.3] font-medium text-ink-2 outline-none hover:border-brand hover:bg-brand-50 focus-visible:shadow-focus",
          className
        )}
      >
        {shown ? (
          <img src={shown} alt="" className={cn("absolute inset-0 size-full object-cover", imageClassName)} />
        ) : (
          <>
            <Icon name="upload" size={17} strokeWidth={1.8} />
            <span className="text-xs text-ink-3">{label}</span>
          </>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(event) => {
          onChange(event.target.files?.[0] ?? null);
          event.target.value = "";
        }}
      />
    </>
  );
}
