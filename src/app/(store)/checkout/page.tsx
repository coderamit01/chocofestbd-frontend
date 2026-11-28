import type { Metadata } from "next";
import { CheckoutHeader } from "@/components/store/checkout/checkout-header";
import { CheckoutView } from "@/components/store/checkout/checkout-view";
import { PageContainer } from "@/components/store/ui/page-container";

export const metadata: Metadata = {
  title: "Checkout | Chocofest BD",
  description: "Add your delivery address, pick a delivery option and pay with cash on delivery, bKash, Nagad or card.",
};

export default function CheckoutPage() {
  return (
    <PageContainer page>
      <CheckoutHeader />
      <CheckoutView />
    </PageContainer>
  );
}
