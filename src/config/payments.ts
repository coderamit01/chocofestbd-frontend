import type { AdvancePaymentMethod, PaymentSegment } from "@/types/payment";

export const PAYMENT_SEGMENTS: { value: PaymentSegment; label: string }[] = [
  { value: "ALL", label: "All" },
  { value: "PENDING", label: "Pending" },
  { value: "VERIFIED", label: "Verified" },
  { value: "REJECTED", label: "Rejected" },
];

export const DEFAULT_PAYMENT_SEGMENT: PaymentSegment = "PENDING";

export const PAYMENT_PAGE_SIZE = 20;

export const ADVANCE_PAYMENT_METHODS: AdvancePaymentMethod[] = ["BKASH", "NAGAD", "ROCKET", "SSLCOMMERZ", "BANK_TRANSFER"];

export const REJECT_REASONS = [
  "TrxID not found",
  "Amount doesn’t match",
  "Sender number doesn’t match",
  "Duplicate TrxID",
];
