import type { ComponentProps } from "react";
import { cn } from "cn";

export const iconButtonClass =
  "relative inline-flex size-11 flex-none items-center justify-center rounded-[12px] text-[#3f3531] transition-colors hover:bg-background hover:text-ink";

export function IconButton({ className, type = "button", ...props }: ComponentProps<"button">) {
  return <button type={type} className={cn(iconButtonClass, className)} {...props} />;
}
