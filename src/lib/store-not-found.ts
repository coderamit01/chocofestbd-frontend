import { NOT_FOUND_PICK_IDS } from "@/config/store-not-found";
import { STORE_PRODUCTS } from "@/config/store-products";

export const getNotFoundPicks = () => STORE_PRODUCTS.filter((product) => NOT_FOUND_PICK_IDS.includes(product.id));
