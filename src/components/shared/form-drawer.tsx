"use client";

import type { ReactNode } from "react";
import { Icon } from "@/components/shared/icon";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";

type FormDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  footer: ReactNode;
  children: ReactNode;
};

export function FormDrawer({ open, onOpenChange, title, description, footer, children }: FormDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        showCloseButton={false}
        overlayClassName="bg-[rgb(34_21_16/38%)] supports-backdrop-filter:backdrop-blur-none"
        className="w-full gap-0 border-l-0 bg-surface p-0 shadow-modal data-[side=right]:w-full data-[side=right]:sm:max-w-140"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-start justify-between gap-3 px-7 pt-6.5 pb-4.5">
            <div>
              <SheetTitle className="font-heading text-xl leading-[1.3] font-semibold text-ink">{title}</SheetTitle>
              {description && <SheetDescription className="mt-1.5 text-caption text-ink-3">{description}</SheetDescription>}
            </div>
            <SheetClose render={<Button variant="ghost" size="icon-sm" aria-label="Close" />}>
              <Icon name="close" size={18} strokeWidth={1.8} />
            </SheetClose>
          </div>
          <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-7 pt-1 pb-6">{children}</div>
          <div className="flex justify-end gap-2.5 border-t border-line px-7 py-4.5">{footer}</div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
