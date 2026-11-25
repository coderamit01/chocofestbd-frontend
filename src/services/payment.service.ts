import { paymentApiParams } from "@/lib/payment-query";
import { serverApiRequest } from "@/lib/server-api";
import type { PaymentRow, PaymentsQuery, PaymentSummary } from "@/types/payment";

export const PaymentService = {
  getPayments: (query: PaymentsQuery) => serverApiRequest<PaymentRow[]>(`/orders/admin/payments?${paymentApiParams(query)}`),

  getSummary: () => serverApiRequest<PaymentSummary>("/orders/admin/payments/summary"),
};
