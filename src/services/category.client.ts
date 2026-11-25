import { apiRequest } from "@/lib/api-client";
import type { Category, CategoryFormValues } from "@/types/category";

export const CategoryClient = {
  saveCategory: (categoryId: string | null, values: CategoryFormValues) => {
    const body = new FormData();
    body.append("name", values.name.trim());
    body.append("parentId", values.parentId);
    if (values.sortOrder.trim()) body.append("sortOrder", values.sortOrder.trim());
    body.append("description", values.description);
    body.append("isActive", String(values.isActive));
    body.append("metaTitle", values.metaTitle);
    body.append("metaDescription", values.metaDescription);
    if (values.image) body.append("image", values.image);
    if (categoryId && values.removeImage && !values.image) body.append("removeImage", "true");

    return apiRequest<Category>(categoryId ? `/categories/${categoryId}` : "/categories", {
      method: categoryId ? "PUT" : "POST",
      body,
    });
  },
};
