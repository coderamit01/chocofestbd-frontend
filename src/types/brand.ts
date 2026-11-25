export type Brand = {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  description: string | null;
  country: string | null;
  isActive: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  metaImage: string | null;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  _count: { products: number };
};

export type BrandFormValues = {
  name: string;
  country: string;
  description: string;
  isActive: boolean;
  metaTitle: string;
  metaDescription: string;
  logo: File | null;
  removeLogo: boolean;
};
