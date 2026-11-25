"use client";

import { Toaster } from "sonner";
import { Icon } from "@/components/shared/icon";

function ToastIcon({ tone }: { tone: "success" | "error" }) {
  return (
    <span
      className={
        tone === "success"
          ? "flex size-6 items-center justify-center rounded-full bg-success text-white"
          : "flex size-6 items-center justify-center rounded-full bg-danger text-white"
      }
    >
      <Icon name={tone === "success" ? "check" : "close"} size={14} strokeWidth={2.6} />
    </span>
  );
}

export function AppToaster() {
  return (
    <Toaster
      position="bottom-right"
      offset={24}
      mobileOffset={16}
      duration={4200}
      icons={{ success: <ToastIcon tone="success" />, error: <ToastIcon tone="error" /> }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            "flex w-[360px] max-w-[calc(100vw-48px)] items-start gap-3 rounded-[14px] bg-surface px-4 py-3.5 font-sans text-[13.5px] text-ink shadow-pop",
          icon: "mt-0 flex-none",
          content: "flex flex-1 flex-col gap-0.5",
          title: "font-semibold text-ink",
          description: "text-caption text-ink-3",
          actionButton: "text-[13px] font-medium text-brand-text",
        },
      }}
    />
  );
}
