import type { ReactNode } from "react";
import { cn } from "cn";

const TONES = {
  neutral: "bg-[#f6f3f0] text-ink-2",
  on: "bg-[#fff1e8] text-brand-text",
  ok: "bg-[#e6f6ec] text-[#1f8a4c]",
  no: "bg-[#fef3f2] text-[#b42318]",
};

export type StatusPillTone = keyof typeof TONES;

type StatusPillProps = {
  tone?: StatusPillTone;
  children: ReactNode;
  className?: string;
};

export function StatusPill({ tone = "neutral", children, className }: StatusPillProps) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center rounded-full px-3 font-sans text-xs leading-none font-semibold whitespace-nowrap",
        TONES[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
