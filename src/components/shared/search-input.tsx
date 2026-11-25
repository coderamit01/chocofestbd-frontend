import type { InputHTMLAttributes } from "react";
import { Icon } from "@/components/shared/icon";
import { cn } from "@/lib/utils";

type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  wrapperClassName?: string;
};

export function SearchInput({ label, wrapperClassName, className, ...props }: SearchInputProps) {
  return (
    <div className={cn("relative flex items-center", wrapperClassName)}>
      <Icon name="search" size={18} strokeWidth={1.8} className="pointer-events-none absolute left-3.5 text-ink-3" />
      <input
        type="search"
        aria-label={label}
        placeholder={label}
        className={cn(
          "h-10.5 w-full rounded-[10px] border border-transparent bg-surface-2 pr-3.5 pl-10.5 text-sm text-ink outline-none transition-[border-color,box-shadow,background-color] placeholder:text-ink-4 focus:border-brand focus:bg-surface focus:shadow-focus",
          className
        )}
        {...props}
      />
    </div>
  );
}
