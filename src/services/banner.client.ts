import { apiRequest } from "@/lib/api-client";
import type { Banner, BannerFormValues } from "@/types/banner";

export const BannerClient = {
  saveBanner: (bannerId: string | null, values: BannerFormValues) => {
    const body = new FormData();
    body.append("title", values.title.trim());
    body.append("link", values.link.trim());
    body.append("categoryId", values.categoryId);
    body.append("sortOrder", String(Math.max(0, Number(values.sortOrder) || 0)));
    body.append("isActive", String(values.isActive));
    if (values.image) body.append("image", values.image);

    return apiRequest<Banner>(bannerId ? `/banners/${encodeURIComponent(bannerId)}` : "/banners", {
      method: bannerId ? "PUT" : "POST",
      body,
    });
  },
};
