import type { UserRole } from "@/types/auth";
import type { ProductCounts, ProductSort, ProductStockFilter, ProductTab } from "@/types/product";

export const PRODUCT_TABS: { value: ProductTab; label: string; countKey: keyof ProductCounts }[] = [
  { value: "all", label: "All", countKey: "all" },
  { value: "active", label: "Active", countKey: "active" },
  { value: "draft", label: "Draft", countKey: "draft" },
  { value: "archived", label: "Archived", countKey: "archived" },
  { value: "low", label: "Low stock", countKey: "lowStock" },
  { value: "out", label: "Out of stock", countKey: "outOfStock" },
  { value: "trash", label: "Trash", countKey: "trash" },
];

export const PRODUCT_SORTS: { value: ProductSort; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "popular", label: "Best selling" },
  { value: "price_low", label: "Price: low to high" },
  { value: "price_high", label: "Price: high to low" },
  { value: "stock_low", label: "Stock: lowest" },
];

export const PRODUCT_STOCK_FILTERS: { value: ProductStockFilter; label: string }[] = [
  { value: "in", label: "In stock" },
  { value: "low", label: "Low stock" },
  { value: "out", label: "Out of stock" },
];

export const PRODUCT_PAGE_SIZES = [5, 10, 20];
export const DEFAULT_PRODUCT_PAGE_SIZE = 10;

export const PRODUCT_TRASH_ROLES: UserRole[] = ["SUPER_ADMIN", "ADMIN"];
export const PRODUCT_ROLES: UserRole[] = ["SUPER_ADMIN", "ADMIN", "MANAGER"];

export const PRODUCT_FORM_PATH = "/admin/products/new";
export const productEditPath = (id: string) => `/admin/products/${id}`;
