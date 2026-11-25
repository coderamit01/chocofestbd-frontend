export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  parent: { id: string; name: string; slug: string } | null;
  sortOrder: number;
  isActive: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  metaImage: string | null;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  _count: { children: number; products: number };
};

export type CategoryFormValues = {
  name: string;
  parentId: string;
  sortOrder: string;
  description: string;
  isActive: boolean;
  metaTitle: string;
  metaDescription: string;
  image: File | null;
  removeImage: boolean;
};
