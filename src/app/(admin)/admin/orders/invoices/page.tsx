import type { Metadata } from "next";
import { Suspense } from "react";
import { InvoicePage } from "@/components/admin/invoice/invoice-page";
import { InvoiceSkeleton } from "@/components/admin/invoice/invoice-skeleton";
import { firstParam } from "@/lib/order-query";

export const metadata: Metadata = {
  title: "Invoices | Chocofest BD",
};

type InvoicesPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

async function InvoicesSection({ searchParams }: InvoicesPageProps) {
  const ids = firstParam((await searchParams).ids);
  const orderIds = [...new Set((ids ?? "").split(",").map((id) => id.trim()).filter(Boolean))].slice(0, 100);
  return <InvoicePage orderIds={orderIds} />;
}

export default function InvoicesPage({ searchParams }: InvoicesPageProps) {
  return (
    <Suspense fallback={<InvoiceSkeleton />}>
      <InvoicesSection searchParams={searchParams} />
    </Suspense>
  );
}
