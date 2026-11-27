import type { IconName } from "@/components/shared/icon";

export type TileTone = "brand" | "rose" | "amber" | "sky" | "lav" | "mint";

export type StoreLink = {
  label: string;
  href: string;
};

export type StoreNavLink = StoreLink & {
  tag?: string;
};

export type StoreIconLink = StoreNavLink & {
  icon: IconName;
};

export type MegaGroup = {
  heading: string;
  links: StoreLink[];
};

export type MegaPromo = {
  tag: string;
  title: string;
  subtitle: string;
  href: string;
};

export type StoreCategory = {
  name: string;
  href: string;
  icon: IconName;
  tone: TileTone;
  count: number;
  groups: MegaGroup[];
  promo: MegaPromo;
};

export type SearchScope = {
  value: string;
  label: string;
};

export type StoreProduct = {
  id: number;
  name: string;
  brand: string;
  price: number;
  oldPrice?: number;
  color: string;
  href: string;
};

export type CartLine = {
  product: StoreProduct;
  quantity: number;
};

export type DeliveryArea = {
  name: string;
  fee: number;
};

export type BottomNavItem = {
  label: string;
  icon: IconName;
  href?: string;
  action?: "menu" | "cart";
};
