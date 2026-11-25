export type BannerCategory = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  _count: { banners: number };
};

export type Banner = {
  id: string;
  title: string;
  image: string;
  link: string | null;
  sortOrder: number;
  isActive: boolean;
  category: { id: string; name: string };
  createdAt: string;
  updatedAt: string;
};

export type BannerFormValues = {
  title: string;
  link: string;
  categoryId: string;
  sortOrder: string;
  isActive: boolean;
  image: File | null;
};
