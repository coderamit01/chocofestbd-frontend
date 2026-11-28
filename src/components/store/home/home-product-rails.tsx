import { ProductRail } from "@/components/store/home/product-rail";
import { KITKAT_RAIL, LINDT_RAIL, NEW_ARRIVALS_RAIL, RECOMMENDED_RAIL } from "@/config/store-home-rails";

export function NewArrivalsRail() {
  return <ProductRail rail={NEW_ARRIVALS_RAIL} />;
}

export function LindtRail() {
  return <ProductRail rail={LINDT_RAIL} />;
}

export function KitkatRail() {
  return <ProductRail rail={KITKAT_RAIL} />;
}

export function RecommendedRail() {
  return <ProductRail rail={RECOMMENDED_RAIL} />;
}
