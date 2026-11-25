import { CUSTOMER_EXPORT_PAGE_SIZE } from "@/config/customers";
import { apiRequest } from "@/lib/api-client";
import { customersApiParams } from "@/lib/customer-query";
import type { CustomerRow, CustomersQuery } from "@/types/customer";

export const CustomerClient = {
  getAllCustomers: async (query: CustomersQuery) => {
    const fetchPage = (page: number) =>
      apiRequest<CustomerRow[]>(`/users/customers?${customersApiParams(query, { page, limit: CUSTOMER_EXPORT_PAGE_SIZE })}`);
    const firstPage = await fetchPage(1);
    const totalPages = firstPage.meta?.totalPages ?? 1;
    const rest = await Promise.all(Array.from({ length: Math.max(totalPages - 1, 0) }, (_, index) => fetchPage(index + 2)));
    return [firstPage, ...rest].flatMap((response) => response.data ?? []);
  },
};
