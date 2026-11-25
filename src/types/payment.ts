import type { PaymentMethod } from "@/types/order";
import type { OrderStatus, PaymentStatus, PaymentVerificationStatus } from "@/types/status";

export type PaymentSegment = PaymentVerificationStatus | "ALL";

export type AdvancePaymentMethod = Exclude<PaymentMethod, "COD">;

export type PaymentsQuery = {
  status: PaymentSegment;
  page: number;
  search?: string;
  method?: AdvancePaymentMethod;
};

export type PaymentRow = {
  id: string;
  orderNumber: string;
  orderStatus: OrderStatus;
  recipientName: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  sender: string | null;
  transactionId: string | null;
  amount: string;
  submittedAt: string;
  verification: PaymentVerificationStatus;
  verifiedAt: string | null;
  verifiedBy: string | null;
  rejectReason: string | null;
};

export type PaymentSummary = {
  awaiting: number;
  amountToVerify: string;
  verifiedToday: { value: number; change: number | null };
  rejectedToday: { value: number; change: number | null };
};
