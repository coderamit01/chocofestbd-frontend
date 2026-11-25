import type { BadgeVariant } from "@/components/ui/badge";
import { STATUS_BADGES } from "@/config/status-badges";
import { formatTaka } from "@/lib/utils";
import type { AdminProduct } from "@/types/product";

export { monogram as productMonogram, monogramTint as productTint } from "@/lib/monogram";

export const productPrice = (product: AdminProduct) => {
  const sale = product.discountPrice !== null && Number(product.discountPrice) > 0;
  return {
    now: formatTaka(sale ? product.discountPrice! : product.price),
    was: sale ? formatTaka(product.price) : null,
  };
};

export const isLowStock = (product: AdminProduct) =>
  product.manageStock && product.stock > 0 && product.stock <= (product.lowStockThreshold ?? 0);

export const productStock = (product: AdminProduct): { label: string; variant: BadgeVariant } => {
  const out = product.manageStock ? product.stock <= 0 : product.stockStatus === "OUT_OF_STOCK";

  if (out) return { label: "Out of stock", variant: "danger" };
  if (!product.manageStock) return { label: "In stock", variant: "neutral" };
  if (isLowStock(product)) return { label: `${product.stock} · Low`, variant: "warning" };
  return { label: `${product.stock} in stock`, variant: "neutral" };
};

export const productStatus = (product: AdminProduct): { label: string; variant: BadgeVariant } =>
  product.deletedAt ? { label: "In trash", variant: "danger" } : STATUS_BADGES.product[product.status];

export const productRating = (product: AdminProduct) => {
  const rating = Number(product.averageRating);
  return rating > 0 ? rating.toFixed(1) : "—";
};
