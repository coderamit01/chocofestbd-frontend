import type { Metadata } from "next";
import { CartEmpty } from "@/components/store/cart/cart-empty";
import { CartView } from "@/components/store/cart/cart-view";
import { PageContainer } from "@/components/store/ui/page-container";

export const metadata: Metadata = {
  title: "Your cart | Chocofest BD",
  description: "Review your chocolates, apply a coupon and check your delivery charge before checkout.",
};

export default function CartPage() {
  return (
    <PageContainer page>
      <CartView empty={<CartEmpty />} />
    </PageContainer>
  );
}
