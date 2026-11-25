"use client";

import Link from "next/link";
import { Icon } from "@/components/shared/icon";
import { Button } from "@/components/ui/button";

type InvoiceToolbarProps = {
  backHref: string;
  backLabel: string;
  count: number;
};

export function InvoiceToolbar({ backHref, backLabel, count }: InvoiceToolbarProps) {
  return (
    <div className="mx-auto flex w-full max-w-198.5 flex-wrap items-center justify-between gap-3 print:hidden">
      <Link href={backHref} className="flex items-center gap-1.5 text-[12.5px] text-ink-3 hover:text-ink">
        <Icon name="arrowLeft" size={16} strokeWidth={1.8} />
        {backLabel}
      </Link>
      <Button onClick={() => window.print()}>
        <Icon name="print" size={18} strokeWidth={1.8} />
        {count > 1 ? `Print ${count} invoices` : "Print invoice"}
      </Button>
    </div>
  );
}
