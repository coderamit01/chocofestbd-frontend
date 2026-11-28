import { STORE_PRODUCTS } from "@/config/store-products";
import { isInStock } from "@/lib/store-product";
import type { StoreProduct } from "@/types/store-product";

const savingRatio = ({ price, oldPrice = 0 }: StoreProduct) => (oldPrice - price) / oldPrice;

export const bestSellingProducts = (count: number) =>
  STORE_PRODUCTS.filter(isInStock)
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, count);

export const offerProducts = () =>
  STORE_PRODUCTS.filter((product) => product.oldPrice && isInStock(product))
    .sort((a, b) => savingRatio(b) - savingRatio(a))
    .slice(1, 5);
