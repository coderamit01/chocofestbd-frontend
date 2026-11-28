import { STORE_PRODUCTS } from "@/config/store-products";
import type { CustomerOrder, OrderTone } from "@/types/store-order";
import type { StoreProduct } from "@/types/store-product";

export const productsByIds = (ids: number[]) =>
  ids.map((id) => STORE_PRODUCTS.find((product) => product.id === id)).filter((product): product is StoreProduct => Boolean(product));

export const filterOrders = (orders: CustomerOrder[], tone?: OrderTone) =>
  tone ? orders.filter((order) => order.tone === tone) : orders;

export const orderItemsLabel = ({ productIds }: CustomerOrder) =>
  `${productIds.length} ${productIds.length > 1 ? "items" : "item"}`;

export const orderTrackHref = ({ number }: CustomerOrder) => `/track-order?order=${number}`;
