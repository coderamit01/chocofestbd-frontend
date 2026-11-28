import type { Metadata } from "next";
import { OrderSuccessView } from "@/components/store/checkout/order-success-view";
import { PageContainer } from "@/components/store/ui/page-container";

export const metadata: Metadata = {
  title: "Order placed | Chocofest BD",
  description: "Thank you for your order. Here is what happens next.",
};

export default function CheckoutSuccessPage() {
  return (
    <PageContainer page>
      <OrderSuccessView />
    </PageContainer>
  );
}
