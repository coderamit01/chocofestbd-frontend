import { SEARCH_SOURCES } from "@/config/search";
import { apiRequest } from "@/lib/api-client";
import { formatPhone, formatTaka } from "@/lib/utils";
import type { UserRole } from "@/types/auth";
import type { SearchResult, SearchResultKind } from "@/types/search";

type OrderHit = { id: string; orderNumber: string; recipientName: string; recipientPhone: string; total: string | number };
type ProductHit = { id: string; name: string; sku: string | null; price: string | number; stock: number; manageStock: boolean };
type CustomerHit = { id: string; name: string; email: string; phone: string | null };

const listParams = (searchTerm: string, limit: number) => {
  const params = new URLSearchParams({ page: "1", limit: String(limit) });
  if (searchTerm) params.set("searchTerm", searchTerm);
  return params;
};

const fetchers: Record<SearchResultKind, (searchTerm: string, limit: number) => Promise<SearchResult[]>> = {
  Order: async (searchTerm, limit) => {
    const { data = [] } = await apiRequest<OrderHit[]>(`/orders/admin?${listParams(searchTerm, limit)}`);
    return data.map((order) => ({
      id: order.id,
      kind: "Order",
      title: order.orderNumber,
      subtitle: `${order.recipientName} · ${formatPhone(order.recipientPhone)} · ${formatTaka(order.total)}`,
      href: `/admin/orders/${order.id}`,
    }));
  },
  Product: async (searchTerm, limit) => {
    const { data = [] } = await apiRequest<ProductHit[]>(`/products/admin?${listParams(searchTerm, limit)}`);
    return data.map((product) => ({
      id: product.id,
      kind: "Product",
      title: product.name,
      subtitle: [product.sku && `SKU ${product.sku}`, product.manageStock ? `${product.stock} in stock` : formatTaka(product.price)]
        .filter(Boolean)
        .join(" · "),
      href: `/admin/products/${product.id}`,
    }));
  },
  Customer: async (searchTerm, limit) => {
    const { data = [] } = await apiRequest<CustomerHit[]>(`/users/customers?${listParams(searchTerm, limit)}`);
    return data.map((customer) => ({
      id: customer.id,
      kind: "Customer",
      title: customer.name,
      subtitle: customer.phone ? formatPhone(customer.phone) : customer.email,
      href: `/admin/customers/${customer.id}`,
    }));
  },
};

export const SearchService = {
  search: async (role: UserRole, searchTerm: string, limit: number) => {
    const kinds = (Object.keys(SEARCH_SOURCES) as SearchResultKind[]).filter((kind) =>
      SEARCH_SOURCES[kind].roles.includes(role)
    );
    const settled = await Promise.allSettled(kinds.map((kind) => fetchers[kind](searchTerm, limit)));
    return settled.flatMap((result) => (result.status === "fulfilled" ? result.value : []));
  },
};
