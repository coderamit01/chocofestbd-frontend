import { ApiError } from "@/lib/api-client";
import { CategoryService } from "@/services/category.service";
import { CollectionService } from "@/services/collection.service";
import { ProductService } from "@/services/product.service";

const savedFormat = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Dhaka",
  day: "numeric",
  month: "short",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

export async function loadProductEditorData(productId: string | null) {
  try {
    const [product, categories, summary, collections] = await Promise.all([
      productId ? ProductService.getProduct(productId) : Promise.resolve(null),
      CategoryService.getAllCategories(),
      ProductService.getSummary(),
      CollectionService.getCollections(),
    ]);

    const detail = product?.data ?? null;

    return {
      product: detail,
      categories,
      brands: summary.data?.brands ?? [],
      tags: summary.data?.tags ?? [],
      collections: collections.data ?? [],
      now: Date.now(),
      savedLabel: detail ? `Last saved ${savedFormat.format(new Date(detail.updatedAt))}` : null,
      error: null,
      notFound: false,
    };
  } catch (error) {
    return {
      error: error instanceof ApiError ? error.message : "Something went wrong while loading the product. Please refresh the page.",
      notFound: error instanceof ApiError && error.status === 404,
    };
  }
}
