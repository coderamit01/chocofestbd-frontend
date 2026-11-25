"use server";

import { BrandService } from "@/services/brand.service";
import { runCatalogAction } from "./catalog-action";

export async function setBrandActiveAction(brandId: string, isActive: boolean) {
  return runCatalogAction(() => BrandService.setActive(brandId, isActive));
}

export async function trashBrandAction(brandId: string) {
  return runCatalogAction(() => BrandService.moveToTrash(brandId));
}
