export const NOT_FOUND_TITLE = "Page not found";

export const ROUTE_TITLES: { pattern: RegExp; title: string }[] = [
  { pattern: /^\/admin\/orders\/[^/]+\/invoice$/, title: "Invoice" },
  { pattern: /^\/admin\/orders\/invoices$/, title: "Invoices" },
  { pattern: /^\/admin\/orders\/[^/]+$/, title: "Order details" },
  { pattern: /^\/admin\/products\/new$/, title: "Add product" },
  { pattern: /^\/admin\/products\/[^/]+$/, title: "Edit product" },
  { pattern: /^\/admin\/customers\/[^/]+$/, title: "Customer profile" },
  { pattern: /^\/admin\/coupons\/[^/]+$/, title: "Coupon details" },
  { pattern: /^\/admin\/profile$/, title: "My profile" },
];
