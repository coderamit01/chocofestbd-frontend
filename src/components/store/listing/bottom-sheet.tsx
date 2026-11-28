"use client";

import { useId, type ReactNode } from "react";
import { Icon } from "@/components/shared/icon";
import { useOverlay } from "@/components/store/header/use-overlay";

type BottomSheetProps = {
  title: string;
  onClose: () => void;
  footer?: ReactNode;
  children: ReactNode;
};

export function BottomSheet({ title, onClose, footer, children }: BottomSheetProps) {
  const titleId = useId();
  const closeRef = useOverlay<HTMLButtonElement>(true, onClose);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-80 flex items-end bg-[rgba(34,21,16,0.45)] transition-opacity duration-200 starting:opacity-0"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
        className="flex max-h-[88vh] w-full flex-col rounded-t-[24px] bg-white shadow-[0_-20px_40px_rgba(0,0,0,0.2)] transition-[translate,opacity] duration-280 ease-[cubic-bezier(.2,.8,.2,1)] starting:translate-y-[40%] starting:opacity-40"
      >
        <span className="mx-auto mt-2.5 h-[5px] w-11 flex-none rounded-[9px] bg-[#e2dad4]" />
        <div className="flex items-center justify-between border-b border-[#f0ebe6] px-[18px] pt-3 pb-2.5">
          <h2 id={titleId} className="m-0 font-heading text-[19px] leading-[1.2] font-bold tracking-normal text-ink">
            {title}
          </h2>
          <button
            ref={closeRef}
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex size-[38px] cursor-pointer items-center justify-center rounded-full border-0 bg-[#f6f3f0] text-[#3f3531]"
          >
            <Icon name="close" size={20} strokeWidth={1.8} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-[18px] pt-1.5 pb-3.5">{children}</div>
        {footer && (
          <div className="grid grid-cols-[1fr_2fr] gap-2.5 border-t border-[#f0ebe6] px-[18px] pt-3 pb-[calc(12px+env(safe-area-inset-bottom))]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
