import type { IconName } from "@/components/shared/icon";
import type { UserRole } from "@/types/auth";
import type { SearchResultKind } from "@/types/search";

export const SEARCH_DEBOUNCE_MS = 250;
export const SEARCH_LIMIT_PER_KIND = 3;
export const SEARCH_SUGGESTION_LIMIT = 2;

export const SEARCH_SOURCES: Record<SearchResultKind, { icon: IconName; roles: UserRole[] }> = {
  Order: { icon: "orders", roles: ["SUPER_ADMIN", "ADMIN", "MANAGER", "ORDER_HANDLER"] },
  Product: { icon: "products", roles: ["SUPER_ADMIN", "ADMIN", "MANAGER"] },
  Customer: { icon: "customers", roles: ["SUPER_ADMIN", "ADMIN", "MANAGER", "ORDER_HANDLER"] },
};
