export type StoreProduct = {
  id: number;
  slug: string;
  name: string;
  brand: string;
  size: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  category: string;
  type: string;
  tag?: string;
  origin: string;
  stock: number;
  image: string;
};
