"use client";

import type { ReactNode } from "react";
import { Icon } from "@/components/shared/icon";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { buttonVariants } from "@/components/ui/button";

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
        className={className}
      >
        <DialogHeader>
          <div>
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription className="mt-1.5">{description}</DialogDescription>}
          </div>
          <DialogClose aria-label="Close" className={buttonVariants({ variant: "ghost", size: "icon-sm" })}>
            <Icon name="close" size={17} strokeWidth={1.8} className="size-[17px]" />
          </DialogClose>
        </DialogHeader>
        <div className="flex flex-col gap-4.5 px-6 py-5">{children}</div>
        <DialogFooter>{footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
