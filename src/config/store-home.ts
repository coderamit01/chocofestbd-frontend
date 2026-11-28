export type HomeBanner = { image: string; alt: string; href: string };

export type HomeTile = HomeBanner & { wide?: boolean };

export type HomeCategory = { name: string; href: string; image: string };

export type HomeBrand = { name: string; href: string; color: string };

export const HERO_AUTOPLAY_MS = 5000;

export const HERO_SLIDES: HomeBanner[] = [
  { image: "/images/banners/hero-milk-chocolate.jpg", alt: "Imported milk chocolate — up to 20% off", href: "/shop" },
  { image: "/images/banners/hero-nut-bars.jpg", alt: "Nut & fruit bars — new arrivals", href: "/shop" },
  { image: "/images/banners/hero-hazelnut.jpg", alt: "Hazelnut chocolate — buy 3, save 5%", href: "/shop" },
];

export const HERO_TILES: HomeTile[] = [
  { image: "/images/banners/tile-cadbury-week.jpg", alt: "Cadbury week — extra 10% off", href: "/shop", wide: true },
  { image: "/images/banners/tile-skincare.jpg", alt: "Skincare picks", href: "/shop" },
  { image: "/images/banners/tile-snacks-coffee.jpg", alt: "Snacks & coffee", href: "/shop" },
];

export const HOME_CATEGORIES: HomeCategory[] = [
  { name: "Milk chocolate", href: "/category/milk-chocolate", image: "/images/products/cadbury-silk.png" },
  { name: "Dark chocolate", href: "/category/dark-chocolate", image: "/images/products/lindt-excellence-dark.png" },
  { name: "Gift boxes", href: "/category/gift-boxes", image: "/images/products/godiva-gold.png" },
  { name: "Truffles & pralines", href: "/category/truffles-pralines", image: "/images/products/lindt-lindor.png" },
  { name: "Wafers & biscuits", href: "/category/wafers-biscuits", image: "/images/products/galaxy-smooth.png" },
  { name: "Nut bars", href: "/category/nut-bars", image: "/images/products/lindt-lindor.png" },
  { name: "White chocolate", href: "/category/white-chocolate", image: "/images/products/toblerone.png" },
  { name: "Snack packs", href: "/category/snack-packs", image: "/images/products/kitkat.png" },
  { name: "Baking chocolate", href: "/category/baking-chocolate", image: "/images/products/toblerone.png" },
];

export const HOME_BRANDS: HomeBrand[] = [
  { name: "Lindt", href: "/category/lindt", color: "#c8102e" },
  { name: "Ferrero", href: "/category/ferrero", color: "#b38b2d" },
  { name: "Cadbury", href: "/category/cadbury", color: "#5b2d91" },
  { name: "Nestlé", href: "/category/nestle", color: "#e01a22" },
  { name: "Toblerone", href: "/category/toblerone", color: "#c48d00" },
  { name: "Kinder", href: "/category/kinder", color: "#e2231a" },
  { name: "Godiva", href: "/category/godiva", color: "#6e5216" },
  { name: "Milka", href: "/category/milka", color: "#7b68c4" },
];

export const BEST_SELLING = {
  title: "Best Selling Products",
  ribbon: "Best Selling",
  count: 6,
  ribbonCount: 3,
};

export const OFFER_FOR_YOU = {
  id: "ofy-h",
  title: "Offer For You",
  subtitle: "Hand-picked savings on our most-loved products.",
  hero: { image: "/images/banners/offer-special-prices.jpg", alt: "Special prices on juices, coffee and skincare", href: "/shop" },
};

export const PROMO_BANNERS: HomeBanner[] = [
  { image: "/images/banners/promo-juices.jpg", alt: "Juices and energy drinks", href: "/shop" },
  { image: "/images/banners/promo-coffee-snacks.jpg", alt: "Coffee and snacks", href: "/shop" },
  { image: "/images/banners/promo-skincare-spreads.jpg", alt: "Skincare and spreads", href: "/shop" },
];

export const CATEGORY_SECTION = { title: "Shop by category", moreLabel: "All categories", moreHref: "/shop" };

export const BRAND_SECTION = { title: "Shop by brand", moreLabel: "All brands", moreHref: "/shop" };
