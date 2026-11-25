export type Collection = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  position: number;
  isActive: boolean;
  showOnHome: boolean;
  startsAt: string | null;
  endsAt: string | null;
  createdAt: string;
  updatedAt: string;
  _count: { products: number };
};

export type CollectionProduct = {
  id: string;
  name: string;
  thumbnail: string | null;
  position: number;
};

export type CollectionDetail = Collection & { products: CollectionProduct[] };

export type CollectionState = "Live" | "Scheduled" | "Expired" | "Disabled";

export type CollectionPayload = {
  title: string;
  description: string | null;
  position: number;
  isActive: boolean;
  showOnHome: boolean;
  startsAt: string | null;
  endsAt: string | null;
};
