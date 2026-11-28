import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailView } from "@/components/store/product-detail/product-detail-view";
import { STORE_PRODUCTS } from "@/config/store-products";
import { buildProductDetail, findStoreProduct } from "@/lib/store-product-detail";

export function generateStaticParams() {
  return STORE_PRODUCTS.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = findStoreProduct(slug);
  if (!product) return { title: "Product not found | Chocofest BD" };

  const detail = buildProductDetail(product);
  return {
    title: `${product.name} | Chocofest BD`,
    description: detail.description,
  };
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = findStoreProduct(slug);
  if (!product) notFound();

  return <ProductDetailView detail={buildProductDetail(product)} />;
}
