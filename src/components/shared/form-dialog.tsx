"use client";

import type { ReactNode } from "react";
import { Icon } from "@/components/shared/icon";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  footer: ReactNode;
  className?: string;
  children: ReactNode;
};

export function FormDialog({ open, onOpenChange, title, description, footer, className, children }: FormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn("max-h-[calc(100vh-32px)] gap-0 overflow-auto rounded-[20px] p-0 shadow-modal sm:max-w-130", className)}
      >
        <div className="flex items-start justify-between gap-4 px-6 pt-6">
          <div>
            <DialogTitle className="font-heading text-lg leading-[1.3] font-semibold text-ink">{title}</DialogTitle>
            {description && <DialogDescription className="mt-1.5 text-[12.5px] text-ink-3">{description}</DialogDescription>}
          </div>
          <DialogClose aria-label="Close" className={buttonVariants({ variant: "ghost", size: "icon-sm" })}>
            <Icon name="close" size={17} strokeWidth={1.8} className="size-[17px]" />
          </DialogClose>
        </div>
        <div className="flex flex-col gap-4.5 px-6 py-5">{children}</div>
        <div className="flex flex-wrap justify-end gap-2.5 px-6 pb-6">{footer}</div>
      </DialogContent>
    </Dialog>
  );
}
