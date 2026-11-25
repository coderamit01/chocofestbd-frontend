import type { Metadata } from "next";
import { Suspense } from "react";
import { InvoicePage } from "@/components/admin/invoice/invoice-page";
import { InvoiceSkeleton } from "@/components/admin/invoice/invoice-skeleton";

export const metadata: Metadata = {
  title: "Invoice | Chocofest BD",
};

type OrderInvoicePageProps = {
  params: Promise<{ orderId: string }>;
};

async function InvoiceSection({ params }: OrderInvoicePageProps) {
  const { orderId } = await params;
  return <InvoicePage orderIds={[orderId]} />;
}

export default function OrderInvoicePage({ params }: OrderInvoicePageProps) {
  return (
    <Suspense fallback={<InvoiceSkeleton />}>
      <InvoiceSection params={params} />
    </Suspense>
  );
}
