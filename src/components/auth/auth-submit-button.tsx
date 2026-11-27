import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type AuthSubmitButtonProps = {
  isPending: boolean;
  pendingLabel: string;
  children: ReactNode;
  className?: string;
};

export function AuthSubmitButton({ isPending, pendingLabel, children, className }: AuthSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isPending}
      aria-busy={isPending || undefined}
      className={cn(
        "mt-1.5 inline-flex h-13.5 w-full cursor-pointer items-center justify-center gap-2.5 rounded-[14px] border-0 bg-[linear-gradient(180deg,#ff7a2f,#ee5615)] font-sans text-[15.5px] leading-none font-semibold text-white shadow-[0_12px_24px_-8px_rgb(238_86_21/60%)] outline-none transition-[transform,box-shadow,filter] duration-150 hover:-translate-y-px hover:shadow-[0_16px_28px_-8px_rgb(238_86_21/65%)] focus-visible:shadow-[0_0_0_4px_rgb(238_86_21/30%)] active:translate-y-0 disabled:pointer-events-none disabled:saturate-[.85]",
        className
      )}
    >
      {isPending && (
        <span aria-hidden="true" className="size-[18px] animate-spin rounded-full border-[2.5px] border-white/40 border-t-white [animation-duration:0.7s]" />
      )}
      {isPending ? pendingLabel : children}
    </button>
  );
}
