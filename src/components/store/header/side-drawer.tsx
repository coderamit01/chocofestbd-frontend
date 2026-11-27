import type { ComponentProps } from "react";
import { cn } from "cn";

type SideDrawerProps = ComponentProps<"aside"> & {
  side: "left" | "right";
};

export function SideDrawer({ side, className, ...props }: SideDrawerProps) {
  return (
    <aside
      role="dialog"
      aria-modal="true"
      className={cn(
        "fixed top-0 bottom-0 z-[70] flex max-w-[92vw] flex-col bg-white shadow-[0_0_60px_rgba(34,21,16,0.25)]",
        side === "right" ? "right-0 w-[420px] animate-slide-in-right" : "left-0 w-[330px] animate-slide-in-left",
        className,
      )}
      {...props}
    />
  );
}
