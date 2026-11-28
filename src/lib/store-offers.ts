import { DEAL_PRODUCT_IDS } from "@/config/store-offers";
import { STORE_PRODUCTS } from "@/config/store-products";

export const getDealProducts = () => STORE_PRODUCTS.filter((product) => DEAL_PRODUCT_IDS.includes(product.id));
