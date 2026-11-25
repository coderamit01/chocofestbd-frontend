"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/shared/icon";
import { StatusBadge } from "@/components/shared/status-badge";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { CANCELLABLE_STATUSES, invoicePath, ORDER_SOURCE_LABELS, ORDERS_PATH } from "@/config/orders";
import { dhakaDateTime } from "@/lib/dhaka-time";
import { paymentDisplay } from "@/lib/order-display";
import type { OrderDetail } from "@/types/order";
import { CancelOrderDialog, ChangeStatusDialog, RefundDialog, VerifyPaymentDialog, type OrderDialog } from "./order-dialogs";
import { OrderInfoCards } from "./order-info-cards";
import { OrderItemsCard } from "./order-items-card";
import { OrderNotesCard } from "./order-notes-card";
import { OrderTimeline } from "./order-timeline";

export function OrderDetailView({ order }: { order: OrderDetail }) {
  const [dialog, setDialog] = useState<OrderDialog | null>(null);
  const close = () => setDialog(null);

  const display = paymentDisplay(order);
  const cancelled = order.status === "CANCELLED";
  const closed = cancelled || order.status === "RETURNED";
  const canAdvance = order.nextStatuses.some((status) => status !== "CANCELLED");
  const canCancel = CANCELLABLE_STATUSES.includes(order.status);
  const verification = order.paymentVerification.status;
  const canVerify = !closed && (verification === "PENDING" || verification === "REJECTED");
  const canRefund = order.paymentStatus === "PAID" || order.paymentStatus === "PARTIALLY_REFUNDED";
  const cancelEntry = order.statusHistory.find((entry) => entry.status === "CANCELLED");
  const cancelDetails = cancelEntry?.note && cancelEntry.note !== order.cancelReason ? cancelEntry.note : "No details added.";

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <Link href={ORDERS_PATH} className="flex w-fit items-center gap-1.5 text-[12.5px] text-ink-3 hover:text-ink">
            <Icon name="arrowLeft" size={16} strokeWidth={1.8} />
            Back to orders
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-heading text-[26px] leading-[1.2] font-semibold">
              Order ID: <span className="text-brand">#{order.orderNumber}</span>
            </h2>
            <Badge variant={display.variant}>{display.label}</Badge>
            <StatusBadge kind="order" status={order.status} />
          </div>
          <p className="text-[12.5px] text-ink-3">
            {dhakaDateTime(order.createdAt)} · Invoice {order.invoiceNumber} · {ORDER_SOURCE_LABELS[order.source]}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <Link href={invoicePath(order.id)} className={buttonVariants({ variant: "outline" })}>
            <Icon name="print" size={18} strokeWidth={1.8} />
            Print invoice
          </Link>
          {canCancel && (
            <Button variant="destructive-soft" onClick={() => setDialog("cancel")}>
              Cancel order
            </Button>
          )}
          {canAdvance && (
            <Button onClick={() => setDialog("change")}>
              <Icon name="refresh" size={18} strokeWidth={1.8} />
              Change status
            </Button>
          )}
        </div>
      </div>

      {cancelled && (
        <div role="alert" className="flex items-center gap-3 rounded-[14px] bg-danger-soft px-4.5 py-4 text-[#8f2318]">
          <Icon name="xcircle" size={20} strokeWidth={1.8} className="flex-none" />
          <span className="min-w-0 flex-1">
            <b className="font-semibold">Cancelled — {order.cancelReason ?? "No reason given"}.</b> {cancelDetails}
          </span>
          {canRefund && (
            <Button variant="outline" size="sm" onClick={() => setDialog("refund")}>
              Issue refund
            </Button>
          )}
        </div>
      )}

      <OrderInfoCards order={order} canVerify={canVerify} canRefund={canRefund} onVerify={() => setDialog("verify")} onRefund={() => setDialog("refund")} />

      <div className="flex flex-wrap items-start gap-6 max-[900px]:gap-4">
        <OrderItemsCard order={order} />
        <OrderTimeline order={order} />
      </div>

      <OrderNotesCard order={order} />

      {dialog === "change" && <ChangeStatusDialog order={order} onClose={close} />}
      {dialog === "cancel" && <CancelOrderDialog order={order} onClose={close} />}
      {dialog === "verify" && <VerifyPaymentDialog order={order} onClose={close} />}
      {dialog === "refund" && <RefundDialog order={order} onClose={close} />}
    </>
  );
}
