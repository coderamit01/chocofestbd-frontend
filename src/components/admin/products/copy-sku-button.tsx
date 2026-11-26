"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/shared/icon";
import { buttonVariants } from "@/components/ui/button";
import { copyWithToast } from "@/lib/clipboard";
import { cn } from "@/lib/utils";

const COPIED_MS = 1600;

export function CopySkuButton({ sku }: { sku: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), COPIED_MS);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    await copyWithToast(sku, "Copied", `${sku} copied to clipboard`);
    setCopied(true);
  };

  return (
    <button
      type="button"
      aria-label={`Copy SKU ${sku}`}
      title={copied ? "Copied" : "Copy"}
      onClick={copy}
      className={cn(buttonVariants({ variant: "square" }), "size-6.5 rounded-[7px] p-0", copied ? "text-[#1f8a4c] hover:text-[#1f8a4c]" : "text-ink-3")}
    >
      <Icon name={copied ? "check" : "copy"} size={17} strokeWidth={copied ? 2.6 : 1.8} className="size-[17px]" />
    </button>
  );
}
