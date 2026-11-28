import { isInStock } from "@/lib/store-product";
import type { StoreProduct } from "@/types/store-product";

export const brandProducts = (products: StoreProduct[], brand: string) =>
  products.filter((product) => product.brand === brand);

export const topRatedProducts = (products: StoreProduct[], excludedBrand: string) =>
  products
    .filter((product) => product.brand !== excludedBrand && isInStock(product))
    .sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);

export const recommendedProducts = (products: StoreProduct[]) => products.filter(isInStock).reverse();
