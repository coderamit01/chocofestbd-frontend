export type DeliveryResult = "DELIVERED" | "FAILED";

export type DeliveryStop = {
  id: string;
  orderNumber: string;
  recipientName: string;
  recipientPhone: string;
  address: string;
  note: string | null;
  paymentMethod: string;
  amountToCollect: string;
  result: DeliveryResult | null;
  failReason: string | null;
  completedAt: string | null;
  createdAt: string;
};

export type DeliveryTab = "todo" | "done";

export type DeliverySheetState = { mode: "deliver" | "fail"; stop: DeliveryStop } | null;
