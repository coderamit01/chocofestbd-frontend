"use client";

import { Icon } from "@/components/shared/icon";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

type DangerDialogProps = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  pendingLabel?: string;
  isPending: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export function DangerDialog({
  open,
  title,
  description,
  confirmLabel,
  pendingLabel = "Working…",
  isPending,
  onOpenChange,
  onConfirm,
}: DangerDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(next) => !isPending && onOpenChange(next)}>
      <DialogContent role="alertdialog" showCloseButton={false} className="gap-0 rounded-[20px] p-0 sm:max-w-110">
        <div className="flex flex-col gap-3.5 px-6 pt-7 pb-2">
          <span className="flex size-12 items-center justify-center rounded-[14px] bg-danger-soft text-danger">
            <Icon name="trash" />
          </span>
          <DialogTitle className="font-heading text-lg leading-[1.3] font-semibold text-ink">{title}</DialogTitle>
          <DialogDescription className="text-sm text-ink-2">{description}</DialogDescription>
        </div>
        <div className="flex flex-wrap justify-end gap-2.5 px-6 pt-4 pb-6">
          <DialogClose render={<Button variant="soft" />} disabled={isPending}>
            Cancel
          </DialogClose>
          <Button variant="destructive" onClick={onConfirm} aria-busy={isPending || undefined}>
            {isPending ? pendingLabel : confirmLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
