import { apiRequest } from "@/lib/api-client";
import type { Brand, BrandFormValues } from "@/types/brand";

export const BrandClient = {
  saveBrand: (brandId: string | null, values: BrandFormValues) => {
    const body = new FormData();
    body.append("name", values.name.trim());
    body.append("country", values.country);
    body.append("description", values.description);
    body.append("isActive", String(values.isActive));
    body.append("metaTitle", values.metaTitle);
    body.append("metaDescription", values.metaDescription);
    if (values.logo) body.append("logo", values.logo);
    if (brandId && values.removeLogo && !values.logo) body.append("removeLogo", "true");

    return apiRequest<Brand>(brandId ? `/brands/${brandId}` : "/brands", { method: brandId ? "PUT" : "POST", body });
  },
};
