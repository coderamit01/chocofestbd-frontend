"use client";

/* eslint-disable @next/next/no-img-element */
import { useRef, type ReactNode } from "react";
import { Icon } from "@/components/shared/icon";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { useObjectUrl } from "@/hooks/use-object-url";
import { formStyles } from "@/lib/form-styles";
import { cn } from "@/lib/utils";
import type { ProductGalleryImage } from "@/types/product";
import { FormCard } from "./form-card";

export const MAX_GALLERY_IMAGES = 8;
const MAX_FILE_BYTES = 2 * 1024 * 1024;

const tileButton = cn(buttonVariants({ variant: "square" }), "size-7.5 rounded-[9px] p-0");
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

type MediaSectionProps = {
  mainUrl: string | null;
  mainFile: File | null;
  gallery: ProductGalleryImage[];
  newFiles: File[];
  alts: Record<string, string>;
  error?: string;
  onAddFiles: (files: File[]) => void;
  onReplaceMain: (file: File) => void;
  onMove: (id: string, direction: -1 | 1) => void;
  onRemoveSaved: (id: string) => void;
  onRemoveNew: (index: number) => void;
  onAltChange: (id: string, alt: string) => void;
  onRejected: (message: string) => void;
};

function Tile({ src, main, children }: { src: string | null; main?: boolean; children: ReactNode }) {
  return (
    <div className={cn("relative flex h-37.5 items-center justify-center overflow-hidden rounded-[14px] bg-surface-2", main && "shadow-[inset_0_0_0_2px_var(--brand)]")}>
      {src ? <img src={src} alt="" className="size-full object-cover" /> : <Icon name="image" size={28} className="text-ink-4" />}
      {main && (
        <Badge size="sm" className="absolute top-2 left-2">
          Main
        </Badge>
      )}
      <div className="absolute right-2 bottom-2 flex gap-1">{children}</div>
    </div>
  );
}

function NewFileTile({ file, onRemove }: { file: File; onRemove: () => void }) {
  const url = useObjectUrl(file);
  return (
    <div className="flex flex-col gap-2">
      <Tile src={url}>
        <button type="button" aria-label="Remove image" onClick={onRemove} className={cn(tileButton, "text-danger")}>
          <Icon name="trash" size={17} strokeWidth={1.8} className="size-[17px]" />
        </button>
      </Tile>
      <span className="truncate px-1 text-xs text-ink-3">New · uploads on save</span>
    </div>
  );
}

export function ProductMediaSection({
  mainUrl,
  mainFile,
  gallery,
  newFiles,
  alts,
  error,
  onAddFiles,
  onReplaceMain,
  onMove,
  onRemoveSaved,
  onRemoveNew,
  onAltChange,
  onRejected,
}: MediaSectionProps) {
  const addRef = useRef<HTMLInputElement>(null);
  const mainRef = useRef<HTMLInputElement>(null);
  const mainPreview = useObjectUrl(mainFile);
  const mainSrc = mainPreview ?? mainUrl;
  const hasMain = !!(mainFile || mainUrl);
  const galleryFull = gallery.length + newFiles.length >= MAX_GALLERY_IMAGES;

  const accept = (files: File[]) => {
    const tooBig = files.filter((file) => file.size > MAX_FILE_BYTES);
    if (tooBig.length) onRejected(`${tooBig.length} file${tooBig.length > 1 ? "s are" : " is"} over 2 MB.`);
    return files.filter((file) => file.size <= MAX_FILE_BYTES);
  };

  return (
    <FormCard title="Media" description="JPG, PNG or WebP · square · max 2 MB. The first image is the main image.">
      {error && <span className={cn(formStyles.error, "mb-3 block")}>{error}</span>}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(160px,100%),1fr))] gap-3.5">
        {hasMain && (
          <div className="flex flex-col gap-2">
            <Tile src={mainSrc} main>
              <button type="button" aria-label="Replace main image" onClick={() => mainRef.current?.click()} className={tileButton}>
                <Icon name="upload" size={17} strokeWidth={1.8} className="size-[17px]" />
              </button>
            </Tile>
            <span className="truncate px-1 text-xs text-ink-3">{mainFile ? "New main · uploads on save" : "Main image"}</span>
          </div>
        )}

        {gallery.map((image, index) => (
          <div key={image.id} className="flex flex-col gap-2">
            <Tile src={image.url}>
              <button type="button" aria-label="Move earlier" disabled={index === 0} onClick={() => onMove(image.id, -1)} className={tileButton}>
                <Icon name="chevronLeft" size={17} strokeWidth={1.8} className="size-[17px]" />
              </button>
              <button
                type="button"
                aria-label="Move later"
                disabled={index === gallery.length - 1}
                onClick={() => onMove(image.id, 1)}
                className={tileButton}
              >
                <Icon name="chevronRight" size={17} strokeWidth={1.8} className="size-[17px]" />
              </button>
              <button type="button" aria-label="Remove image" onClick={() => onRemoveSaved(image.id)} className={cn(tileButton, "text-danger")}>
                <Icon name="trash" size={17} strokeWidth={1.8} className="size-[17px]" />
              </button>
            </Tile>
            <input
              placeholder="Alt text"
              aria-label={`Alt text for image ${index + 2}`}
              value={alts[image.id] ?? image.alt ?? ""}
              onChange={(event) => onAltChange(image.id, event.target.value)}
              className={cn(formStyles.input, "h-9 text-[13px]")}
            />
          </div>
        ))}

        {newFiles.map((file, index) => (
          <NewFileTile key={`${file.name}-${file.lastModified}-${index}`} file={file} onRemove={() => onRemoveNew(index)} />
        ))}

        {!(hasMain && galleryFull) && (
          <button
            type="button"
            onClick={() => addRef.current?.click()}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              const dropped = Array.from(event.dataTransfer.files);
              const images = dropped.filter((file) => ACCEPTED_TYPES.includes(file.type));
              if (images.length < dropped.length) onRejected("Only JPG, PNG or WebP images can be added.");
              if (images.length) onAddFiles(accept(images));
            }}
            className="flex min-h-37.5 cursor-pointer flex-col items-center justify-center gap-2 rounded-[14px] border-[1.5px] border-dashed border-line-2 bg-surface-2 text-center text-[13.5px] leading-[1.3] font-medium text-ink-2 outline-none hover:border-brand hover:bg-brand-50 focus-visible:shadow-focus"
          >
            <span className="flex size-14 items-center justify-center rounded-full bg-brand-50 text-brand">
              <Icon name="upload" size={24} strokeWidth={1.8} />
            </span>
            Upload image
            <span className="text-xs font-normal text-ink-3">or drop files here</span>
          </button>
        )}
      </div>

      <input
        ref={addRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        multiple
        hidden
        onChange={(event) => {
          onAddFiles(accept(Array.from(event.target.files ?? [])));
          event.target.value = "";
        }}
      />
      <input
        ref={mainRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        hidden
        onChange={(event) => {
          const [file] = accept(Array.from(event.target.files ?? []));
          if (file) onReplaceMain(file);
          event.target.value = "";
        }}
      />
    </FormCard>
  );
}
