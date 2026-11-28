import type { ReactNode } from "react";
import { cn } from "cn";

type ChoiceOptionProps = {
  selected: boolean;
  title: string;
  description: string;
  leading: ReactNode;
  trailing?: ReactNode;
  className?: string;
  onSelect: () => void;
};

export function ChoiceOption({
  selected,
  title,
  description,
  leading,
  trailing,
  className,
  onSelect,
}: ChoiceOptionProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        "flex w-full cursor-pointer items-center gap-3.5 rounded-2xl border-[1.5px] bg-white px-4 py-3.5 text-ink transition-[border-color,background-color] duration-150 max-[900px]:gap-2.5 max-[900px]:p-3",
        selected ? "border-brand bg-[#fffaf6]" : "border-[#e7e0da] hover:border-[#c9bfb8]",
        className,
      )}
    >
      <span
        className={cn(
          "size-[22px] flex-none rounded-full transition-[border] duration-150",
          selected ? "border-[7px] border-brand" : "border-2 border-[#d6cdc6]",
        )}
      />
      {leading}
      <span className="flex flex-1 flex-col gap-[3px] text-left">
        <b className="font-sans text-[14.5px] leading-[1.2] font-semibold max-[900px]:text-[13.5px]">{title}</b>
        <small className="text-[12.5px] text-[#8a7f79] max-[900px]:text-[11.5px]">{description}</small>
      </span>
      {trailing}
    </button>
  );
}
