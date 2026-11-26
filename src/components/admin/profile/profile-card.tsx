import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ProfileCard({ className, children }: { className?: string; children: ReactNode }) {
  return <section className={cn("flex flex-col rounded-xl bg-card px-6 py-5.5 max-[900px]:p-4.5", className)}>{children}</section>;
}

export function ProfileCardTitle({ size = "md", className, children }: { size?: "md" | "sm"; className?: string; children: ReactNode }) {
  return (
    <h3 className={cn("font-heading leading-[1.3] font-semibold text-ink", size === "md" ? "text-xl" : "text-lg", className)}>
      {children}
    </h3>
  );
}

export function ProfileCardNote({ className, children }: { className?: string; children: ReactNode }) {
  return <span className={cn("text-[12.5px] text-ink-3", className)}>{children}</span>;
}
