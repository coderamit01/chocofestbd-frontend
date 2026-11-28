import type { StoreProduct } from "@/types/store-product";

export const productHref = (product: StoreProduct) => `/product/${product.slug}`;

export const discountPercent = ({ price, oldPrice }: StoreProduct) =>
  oldPrice ? Math.round((1 - price / oldPrice) * 100) : 0;

export const isInStock = (product: StoreProduct) => product.stock > 0;

export const isLowStock = (product: StoreProduct) => product.stock > 0 && product.stock < 10;
