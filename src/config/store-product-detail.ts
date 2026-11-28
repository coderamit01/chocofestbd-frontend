import type {
  ProductDetailCopy,
  ProductReview,
  ProductTrustItem,
  RatingBar,
} from "@/types/store-product-detail";

export const PRODUCT_SITE_URL = "https://chocofestbd.com/products";

export const PRODUCT_WHATSAPP_NUMBER = "8801711223344";

export const PRODUCT_MAX_QUANTITY = 20;

export const GALLERY_LABELS = ["Truffles", "Gift serving", "Close-up", "With nuts"];

export const GALLERY_EXTRA_IMAGES = [
  "/images/products/ferrero-rocher.png",
  "/images/products/kinder-bueno.png",
  "/images/products/ritter-sport.png",
];

export const BRAND_COMPANIES: Record<string, string> = {
  Lindt: "Lindt & Sprüngli",
};

export const PRODUCT_COPY: Record<string, ProductDetailCopy> = {
  "lindt-lindor-milk-truffles": {
    title: "Lindt Lindor Milk Chocolate Truffles",
    description:
      "Lindor’s signature: a delicate milk chocolate shell with an irresistibly smooth, melting filling, crafted by the Lindt Master Chocolatiers in Switzerland since 1949. Each truffle is individually wrapped — perfect for sharing, gifting, or keeping a secret stash.",
    highlights: [
      "Individually wrapped — 16 truffles in 200g",
      "Imported directly from Switzerland, batch-tracked",
      "Stored at 16–18 °C in our Dhaka warehouse",
      "Halal-friendly ingredients · contains milk, soy",
    ],
    pieces: 16,
    pieceUnit: "truffle",
    sku: "LND-LOR-201",
  },
};

export const PRODUCT_SPEC_DEFAULTS = {
  shelfLife: "Best before 08/2027",
  storage: "Cool, dry place, 16–18 °C",
  importer: "ChocoFest BD (licence no. on pack)",
};

export const PRODUCT_TRUST_ITEMS: ProductTrustItem[] = [
  { icon: "shield", title: "100% authentic", note: "Official importer" },
  { icon: "cash", title: "Cash on delivery", note: "Pay at your door" },
  { icon: "lock", title: "Secure payment", note: "SSL encrypted" },
];

export const RATING_DISTRIBUTION: RatingBar[] = [
  { stars: 5, count: 281 },
  { stars: 4, count: 22 },
  { stars: 3, count: 6 },
  { stars: 2, count: 2 },
  { stars: 1, count: 1 },
];

export const REVIEW_TAGS = ["Arrived cold · 86", "Great for gifting · 64", "Authentic · 58", "Fast delivery · 41"];

export const PRODUCT_REVIEWS: ProductReview[] = [
  {
    rating: 5,
    name: "Tasnim Rahman",
    location: "Dhanmondi, Dhaka",
    date: "2 days ago",
    variant: "200g · Milk",
    quote:
      "Arrived in a little ice box, every truffle perfectly round — no melting at all in this heat. Exactly like the ones from Dubai duty free.",
    initials: "TR",
    color: "#ee5615",
    helpful: 24,
  },
  {
    rating: 5,
    name: "Arif Hossain",
    location: "Agrabad, Chattogram",
    date: "1 week ago",
    variant: "337g · Assorted",
    quote:
      "Ordered for my wife’s birthday and added a note — they handwrote it on a nice card. Delivery in 2 days to Ctg.",
    initials: "AH",
    color: "#3d1104",
    helpful: 17,
  },
  {
    rating: 4,
    name: "Nusrat Jahan",
    location: "Gulshan 2, Dhaka",
    date: "3 weeks ago",
    variant: "200g · Dark 60%",
    quote:
      "Fresh batch with a 2027 expiry. Took one star off because the rider called twice, but chocolate is 10/10.",
    initials: "NJ",
    color: "#b7791f",
    helpful: 9,
  },
  {
    rating: 5,
    name: "Rafiul Islam",
    location: "Sylhet Sadar",
    date: "1 month ago",
    variant: "100g · Milk",
    quote: "Paid cash on delivery, original Lindt with importer sticker. Will order the bigger pack next.",
    initials: "RI",
    color: "#1769aa",
    helpful: 6,
  },
];

export const RELATED_PRODUCT_IDS = [14, 7, 2, 9, 15];

export const RECENT_PRODUCT_IDS = [3, 6, 13, 11, 4];

export const PRODUCT_RAIL_SIZE = 5;
