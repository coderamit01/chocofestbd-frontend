"use client";

import Link from "next/link";
import { PaymentMethodChip } from "@/components/admin/orders/payment-method-chip";
import { Icon } from "@/components/shared/icon";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { customerPath } from "@/config/orders";
import { copyWithToast } from "@/lib/clipboard";
import { dhakaClock, dhakaDayMonth } from "@/lib/dhaka-time";
import { isBangla, methodLabel, money, paymentDisplay } from "@/lib/order-display";
import { cn, formatPhone, formatTaka } from "@/lib/utils";
import type { OrderDetail } from "@/types/order";
import { DetailCard, KeyValues } from "./detail-card";

const bnClass = (text: string | null | undefined) => (isBangla(text) ? "font-bengali" : undefined);

function CustomerCard({ order }: { order: OrderDetail }) {
  const phone = order.recipientPhone;
  const email = order.recipientEmail ?? order.user?.email ?? null;
  const previous = Math.max(0, order.customerOrderCount - 1);

  return (
    <DetailCard
      title="Customer info"
      action={
        order.user && (
          <Link href={customerPath(order.user.id)} className={buttonVariants({ variant: "ghost", size: "sm" })}>
            Profile
          </Link>
        )
      }
    >
      <KeyValues
        rows={[
          { label: "Name", value: order.recipientName, className: cn("font-medium", bnClass(order.recipientName)) },
          { label: "Email", value: email ?? "—", className: "break-all" },
          { label: "Phone", value: formatPhone(phone), className: "tabular-nums" },
          { label: "Orders", value: previous ? `${previous} previous order${previous === 1 ? "" : "s"}` : "First order" },
        ]}
      />
      <div className="mt-5 grid grid-cols-2 gap-2.5">
        <a href={`tel:+88${phone}`} className={buttonVariants({ variant: "soft" })}>
          <Icon name="phone" size={16} strokeWidth={1.8} className="size-4" />
          Call
        </a>
        <a href={`https://wa.me/88${phone}`} target="_blank" rel="noreferrer" className={buttonVariants({ variant: "soft" })}>
          <Icon name="chat" size={16} strokeWidth={1.8} className="size-4" />
          WhatsApp
        </a>
      </div>
    </DetailCard>
  );
}

type PaymentCardProps = {
  order: OrderDetail;
  canVerify: boolean;
  canRefund: boolean;
  onVerify: () => void;
  onRefund: () => void;
};

function PaymentCard({ order, canVerify, canRefund, onVerify, onRefund }: PaymentCardProps) {
  const display = paymentDisplay(order);
  const { verifiedAt, verifiedBy, rejectReason, status } = order.paymentVerification;
  const cod = order.paymentMethod === "COD";
  const delivered = order.statusHistory.find((entry) => entry.status === "DELIVERED");

  const verified =
    status === "REJECTED"
      ? `Rejected${rejectReason ? ` — ${rejectReason}` : ""}`
      : verifiedAt
        ? `${verifiedBy ?? "Staff"} · ${dhakaDayMonth(verifiedAt)}, ${dhakaClock(verifiedAt)}`
        : "Not yet";

  const rows = cod
    ? [
        {
          label: "Method",
          value: (
            <span className="flex items-center gap-2">
              <PaymentMethodChip method="COD" />
              {methodLabel("COD")}
            </span>
          ),
        },
        { label: "Amount", value: formatTaka(order.total), className: "tabular-nums" },
        {
          label: "Collected",
          value: order.paymentStatus === "UNPAID" ? "Not yet" : delivered ? `On delivery · ${dhakaDayMonth(delivered.createdAt)}` : "Yes",
        },
      ]
    : [
        { label: "Method", value: <PaymentMethodChip method={order.paymentMethod} /> },
        { label: "Sender", value: order.paymentSender ? formatPhone(order.paymentSender) : "—", className: "tabular-nums" },
        {
          label: "TrxID",
          value: order.paymentTransactionId ? (
            <span className="flex items-center gap-1.5">
              <span className="font-mono">{order.paymentTransactionId}</span>
              <Button
                variant="ghost"
                size="icon-xs"
                aria-label="Copy transaction ID"
                onClick={() => copyWithToast(order.paymentTransactionId!, "Copied", `TrxID ${order.paymentTransactionId}`)}
              >
                <Icon name="copy" size={14} strokeWidth={1.8} />
              </Button>
            </span>
          ) : (
            "—"
          ),
        },
        { label: "Verified", value: verified },
      ];

  return (
    <DetailCard title="Payment details" action={<Badge variant={display.variant}>{display.short}</Badge>}>
      <KeyValues rows={rows} />
      {canVerify && (
        <Button variant="dark" className="mt-5 w-full" onClick={onVerify}>
          Verify payment
        </Button>
      )}
      {canRefund && (
        <Button variant="outline" className="mt-5 w-full" onClick={onRefund}>
          Issue refund
        </Button>
      )}
    </DetailCard>
  );
}

function DeliveryCard({ order }: { order: OrderDetail }) {
  const fullAddress = [order.address, order.area, order.district].filter(Boolean).join(", ");
  const zone = [order.deliveryZoneName, money(order.deliveryCharge) ? formatTaka(order.deliveryCharge) : "Free", order.deliveryZone.estimatedDays]
    .filter(Boolean)
    .join(" · ");

  return (
    <DetailCard
      title="Delivery info"
      action={
        <Button variant="ghost" size="sm" onClick={() => copyWithToast(fullAddress, "Address copied")}>
          Copy
        </Button>
      }
    >
      <KeyValues
        rows={[
          { label: "Address", value: order.address, className: cn("leading-[1.6]", bnClass(order.address)) },
          { label: "Area", value: order.area },
          { label: "District", value: order.district },
          {
            label: "Zone",
            value: (
              <Badge variant="neutral" size="sm">
                {zone}
              </Badge>
            ),
          },
        ]}
      />
    </DetailCard>
  );
}

export function OrderInfoCards(props: PaymentCardProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-6 max-[900px]:gap-4">
      <CustomerCard order={props.order} />
      <PaymentCard {...props} />
      <DeliveryCard order={props.order} />
    </div>
  );
}
