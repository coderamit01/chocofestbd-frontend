"use client";

import { useEffect } from "react";
import { Icon } from "@/components/shared/icon";
import { OrderAccountCta } from "@/components/store/checkout/order-account-cta";
import { OrderDeliveryDetails } from "@/components/store/checkout/order-delivery-details";
import { OrderSuccessHero } from "@/components/store/checkout/order-success-hero";
import { OrderTimeline } from "@/components/store/checkout/order-timeline";
import { StoreButton } from "@/components/store/ui/store-button";
import { StoreCard } from "@/components/store/ui/store-card";
import { StoreCardTitle } from "@/components/store/ui/store-card-title";
import { DELIVERY_ZONES, SAMPLE_ORDER } from "@/config/store-checkout";
import { cartActions, useStoreCart } from "@/hooks/use-store-cart";
import { copyWithToast } from "@/lib/clipboard";
import { deliveryEta, findPaymentMethod, firstName, formatPhone, toCartLines } from "@/lib/store-cart";
import { formatTaka } from "@/lib/utils";
import type { OrderTimelineStep } from "@/types/store-cart";

const capitalize = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

export function OrderSuccessView() {
  const { order: placed } = useStoreCart();
  const order = placed ?? SAMPLE_ORDER;
  const { address } = order;
  const zone = DELIVERY_ZONES.find((item) => item.id === order.delivery) ?? DELIVERY_ZONES[0];
  const payment = findPaymentMethod(order.payment);
  const eta = deliveryEta(zone);
  const phone = formatPhone(address.phone);

  useEffect(() => {
    cartActions.settleOrder();
  }, []);

  const timeline: OrderTimelineStep[] = [
    { title: "Order placed", description: "Just now", state: "done" },
    {
      title: "Confirmation call",
      description: "Within 30 minutes",
      state: "now",
    },
    {
      title: "Cool-packed & dispatched",
      description: "We’ll SMS the rider’s number",
      state: "todo",
    },
    { title: "Delivered", description: capitalize(eta), state: "todo" },
  ];

  const details = [
    {
      label: "Deliver to",
      value: (
        <>
          {address.name} · {phone}
          <br />
          {address.addr}, {address.area}, {address.district}
        </>
      ),
    },
    { label: "Delivery", value: `${zone.name} · ${eta}` },
    {
      label: "Payment",
      value: (
        <>
          {payment.title} · <b>{formatTaka(order.total)}</b> {order.payment === "cod" ? "due on delivery" : "paid"}
        </>
      ),
    },
  ];

  return (
    <div className="mx-auto flex max-w-[1040px] flex-col gap-[18px] pt-7 max-[900px]:pt-3.5">
      <OrderSuccessHero
        firstName={firstName(address.name)}
        phone={phone}
        orderNumber={order.number}
        onCopy={() => copyWithToast(order.number, "Copied", `Order ${order.number}`)}
      />
      <div className="grid grid-cols-2 gap-[18px] max-[900px]:grid-cols-1">
        <StoreCard as="section">
          <StoreCardTitle>What happens next</StoreCardTitle>
          <OrderTimeline steps={timeline} />
          <div className="flex flex-wrap gap-2.5">
            <StoreButton href="/track-order" className="flex-1">
              <Icon name="truck" size={17} strokeWidth={1.8} />
              Track order
            </StoreButton>
            <StoreButton href="/" variant="ghost" className="flex-1">
              Continue shopping
            </StoreButton>
          </div>
        </StoreCard>
        <OrderDeliveryDetails details={details} lines={toCartLines(order.lines)} />
      </div>
      <OrderAccountCta phone={phone} />
    </div>
  );
}
