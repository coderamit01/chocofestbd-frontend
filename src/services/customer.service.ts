import { CUSTOMER_ORDERS_PAGE_SIZE } from "@/config/customers";
import { customersApiParams } from "@/lib/customer-query";
import { serverApiRequest } from "@/lib/server-api";
import type { CustomerOrder, CustomerProfile, CustomerRow, CustomersQuery, CustomerSummary } from "@/types/customer";

export const CustomerService = {
  getCustomers: (query: CustomersQuery) => serverApiRequest<CustomerRow[]>(`/users/customers?${customersApiParams(query)}`),

  getSummary: () => serverApiRequest<CustomerSummary>("/users/customers/summary"),

  getProfile: (customerId: string) => serverApiRequest<CustomerProfile>(`/users/customers/${encodeURIComponent(customerId)}`),

  getOrders: (customerId: string, page: number) =>
    serverApiRequest<CustomerOrder[]>(
      `/users/customers/${encodeURIComponent(customerId)}/orders?${new URLSearchParams({ page: String(page), limit: String(CUSTOMER_ORDERS_PAGE_SIZE) })}`
    ),

  setBanned: (customerId: string, isBanned: boolean) =>
    serverApiRequest(`/users/${encodeURIComponent(customerId)}`, { method: "PUT", body: JSON.stringify({ isBanned: String(isBanned) }) }),

  adjustPoints: (customerId: string, delta: number, reason: string) =>
    serverApiRequest<{ id: string; points: number }>(`/users/customers/${encodeURIComponent(customerId)}/points`, {
      method: "PATCH",
      body: JSON.stringify({ delta, reason }),
    }),
};
