"use client";

import { useRef, type ReactNode } from "react";
import { useDismiss } from "@/hooks/use-dismiss";
import { cn } from "@/lib/utils";

type TopbarPopoverProps = {
  open: boolean;
  onClose: () => void;
  trigger: ReactNode;
  className?: string;
  children: ReactNode;
};

export const topbarIconButtonClass =
  "relative flex size-12 items-center justify-center rounded-xl bg-surface text-ink outline-none transition-colors hover:bg-surface-2 focus-visible:shadow-focus";

export function TopbarPopover({ open, onClose, trigger, className, children }: TopbarPopoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  useDismiss(ref, open, onClose);

  return (
    <div ref={ref} className="relative">
      {trigger}
      {open && (
        <div
          className={cn(
            "absolute right-0 z-40 max-w-[calc(100vw-32px)] animate-pop rounded-[14px] bg-surface shadow-pop",
            className
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}
