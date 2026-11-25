import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductEditorPage } from "@/components/admin/product-form/product-editor-page";
import { ProductEditorSkeleton } from "@/components/admin/product-form/product-editor-skeleton";

export const metadata: Metadata = {
  title: "Edit product | Chocofest BD",
};

type EditProductPageProps = {
  params: Promise<{ productId: string }>;
};

async function EditProductSection({ params }: EditProductPageProps) {
  const { productId } = await params;
  return <ProductEditorPage productId={productId} />;
}

export default function EditProductPage({ params }: EditProductPageProps) {
  return (
    <Suspense fallback={<ProductEditorSkeleton />}>
      <EditProductSection params={params} />
    </Suspense>
  );
}
