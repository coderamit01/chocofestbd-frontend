import type { Metadata } from "next";
import { Suspense } from "react";
import { OrderDetailPage } from "@/components/admin/order-detail/order-detail-page";
import { OrderDetailSkeleton } from "@/components/admin/order-detail/order-detail-skeleton";

export const metadata: Metadata = {
  title: "Order details | Chocofest BD",
};

type OrderPageProps = {
  params: Promise<{ orderId: string }>;
};

async function OrderSection({ params }: OrderPageProps) {
  const { orderId } = await params;
  return <OrderDetailPage orderId={orderId} />;
}

export default function OrderPage({ params }: OrderPageProps) {
  return (
    <Suspense fallback={<OrderDetailSkeleton />}>
      <OrderSection params={params} />
    </Suspense>
  );
}
