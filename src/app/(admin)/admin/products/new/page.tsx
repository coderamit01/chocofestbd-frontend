import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductEditorPage } from "@/components/admin/product-form/product-editor-page";
import { ProductEditorSkeleton } from "@/components/admin/product-form/product-editor-skeleton";

export const metadata: Metadata = {
  title: "Add product | Chocofest BD",
};

export default function NewProductPage() {
  return (
    <Suspense fallback={<ProductEditorSkeleton />}>
      <ProductEditorPage productId={null} />
    </Suspense>
  );
}
