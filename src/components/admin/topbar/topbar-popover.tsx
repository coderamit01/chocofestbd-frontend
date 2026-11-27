"use client";

import { useRef, type ReactNode } from "react";
import { useDismiss } from "@/hooks/use-dismiss";
import { cn } from "@/lib/utils";

type TopbarPopoverProps = {
  open: boolean;
  onClose: () => void;
  trigger: ReactNode;
  className?: string;
  fullWidthOnMobile?: boolean;
  children: ReactNode;
};

export const topbarIconButtonClass =
  "relative flex size-12 max-[900px]:size-[42px] items-center justify-center rounded-[12px] bg-surface-2 text-ink outline-none transition-colors focus-visible:shadow-focus";

export function TopbarPopover({ open, onClose, trigger, className, fullWidthOnMobile = false, children }: TopbarPopoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  useDismiss(ref, open, onClose);

  return (
    <div ref={ref} className="relative">
      {trigger}
      {open && (
        <div
          className={cn(
            "absolute right-0 z-40 max-w-[calc(100vw-32px)] animate-pop rounded-[14px] bg-surface shadow-pop",
            className,
            fullWidthOnMobile &&
              "max-[900px]:fixed max-[900px]:top-[70px] max-[900px]:right-4 max-[900px]:left-4 max-[900px]:w-auto max-[900px]:max-w-none max-[900px]:max-h-[calc(100dvh-190px)] max-[900px]:overflow-y-auto"
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}
