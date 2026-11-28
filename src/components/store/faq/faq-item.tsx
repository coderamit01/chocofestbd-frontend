import { useId } from "react";
import { cn } from "cn";
import type { FaqEntry } from "@/types/store-faq";
import { FaqToggleIcon } from "./faq-toggle-icon";

type FaqItemProps = {
  entry: FaqEntry;
  open: boolean;
  onToggle: () => void;
};

export function FaqItem({ entry, open, onToggle }: FaqItemProps) {
  const answerId = useId();

  return (
    <div
      className={cn(
        "rounded-[18px] border bg-white transition-[border-color] duration-200 ease-[ease]",
        open ? "border-[#ffd0b5] shadow-[0_12px_26px_-22px_rgba(238,86,21,0.6)]" : "border-[#f0ebe6]",
      )}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={open ? answerId : undefined}
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between gap-3.5 border-0 bg-transparent px-5 py-[18px] text-left text-ink max-[900px]:px-4 max-[900px]:py-[15px]"
      >
        <b className="font-sans text-[15px] leading-[1.4] font-semibold max-[900px]:text-[14px]">{entry.question}</b>
        <FaqToggleIcon open={open} />
      </button>
      {open && (
        <p
          id={answerId}
          className="m-0 animate-fade px-5 pb-[18px] text-[14px] leading-[1.7] text-[#5f5450] max-[900px]:px-4 max-[900px]:pb-4 max-[900px]:text-[13.5px]"
        >
          {entry.answer}
        </p>
      )}
    </div>
  );
}
