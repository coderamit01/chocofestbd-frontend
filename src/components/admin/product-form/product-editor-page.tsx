import { notFound } from "next/navigation";
import { AccessDenied } from "@/components/shared/access-denied";
import { LoadError } from "@/components/shared/load-error";
import { PRODUCT_ROLES } from "@/config/products";
import { getCurrentUser } from "@/lib/current-user";
import { loadProductEditorData } from "@/lib/product-editor-data";
import { ProductEditor } from "./product-editor";

const COST_ROLES = ["SUPER_ADMIN", "ADMIN"];

export async function ProductEditorPage({ productId }: { productId: string | null }) {
  const currentUser = await getCurrentUser();

  if (!currentUser?.role || !PRODUCT_ROLES.includes(currentUser.role)) {
    return <AccessDenied message="Products are only for the catalog team." />;
  }

  const data = await loadProductEditorData(productId);

  if (data.notFound) notFound();
  if (data.error !== null || !("categories" in data)) {
    return <LoadError title="Couldn’t load the product" message={data.error ?? "Please refresh the page."} />;
  }

  return (
    <ProductEditor
      key={data.product?.updatedAt ?? "new"}
      product={data.product}
      categories={data.categories}
      brands={data.brands}
      tags={data.tags}
      collections={data.collections}
      now={data.now}
      canSetCost={COST_ROLES.includes(currentUser.role)}
      savedLabel={data.savedLabel}
    />
  );
}
