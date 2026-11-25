import type { ProductStatus } from "@/types/status";

export type ProductRef = { id: string; name: string; slug: string };

export type AdminProduct = {
  id: string;
  name: string;
  slug: string;
  sku: string;
  thumbnail: string | null;
  price: string;
  discountPrice: string | null;
  stock: number;
  manageStock: boolean;
  stockStatus: "IN_STOCK" | "OUT_OF_STOCK";
  lowStockThreshold?: number;
  status: ProductStatus;
  isFeatured: boolean;
  soldCount?: number;
  averageRating: string | number;
  reviewCount: number;
  category: ProductRef | null;
  brand: ProductRef | null;
  deletedAt?: string | null;
};

export type ProductTab = "all" | "active" | "draft" | "archived" | "low" | "out" | "trash";

export type ProductSort = "newest" | "popular" | "price_low" | "price_high" | "stock_low";

export type ProductStockFilter = "in" | "low" | "out";

export type ProductView = "table" | "grid";

export type ProductsQuery = {
  tab: ProductTab;
  page: number;
  limit: number;
  sort: ProductSort;
  view: ProductView;
  search?: string;
  category?: string;
  brand?: string;
  tag?: string;
  stock?: ProductStockFilter;
  maxPrice?: number;
  featured?: boolean;
};

export type ProductCounts = {
  all: number;
  active: number;
  draft: number;
  archived: number;
  lowStock: number;
  outOfStock: number;
  trash?: number;
};

export type ProductSummary = {
  counts: ProductCounts;
  categories: ProductRef[];
  brands: ProductRef[];
  tags: ProductRef[];
};

export type BulkProductChange = {
  status?: ProductStatus;
  isFeatured?: boolean;
  categoryId?: string;
};

export type ProductGalleryImage = { id: string; url: string; alt: string | null; sortOrder: number };

export type ProductDetail = {
  id: string;
  name: string;
  slug: string;
  sku: string;
  shortDescription: string | null;
  description: string | null;
  image: string | null;
  price: string;
  discountPrice: string | null;
  costPrice?: string | null;
  stock: number;
  lowStockThreshold: number;
  manageStock: boolean;
  stockStatus: "IN_STOCK" | "OUT_OF_STOCK";
  status: ProductStatus;
  isFeatured: boolean;
  category: ProductRef;
  brand: ProductRef | null;
  tags: ProductRef[];
  imageGallery: ProductGalleryImage[];
  collections: { collectionId: string }[];
  metaTitle: string | null;
  metaDescription: string | null;
  metaImage: string | null;
  updatedAt: string;
};

export type ProductFormValues = {
  name: string;
  slug: string;
  sku: string;
  shortDescription: string;
  description: string;
  price: string;
  discountPrice: string;
  costPrice: string;
  manageStock: boolean;
  stock: string;
  lowStockThreshold: string;
  stockStatus: "IN_STOCK" | "OUT_OF_STOCK";
  status: ProductStatus;
  isFeatured: boolean;
  categoryId: string;
  brandId: string;
  tagIds: string[];
  collectionIds: string[];
  metaTitle: string;
  metaDescription: string;
  galleryOrder: string[];
  galleryAlts: Record<string, string>;
  removedGalleryIds: string[];
};

export type ProductFormFiles = {
  image: File | null;
  gallery: File[];
  metaImage: File | null;
};
