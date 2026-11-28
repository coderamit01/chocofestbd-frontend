import { STORE_PRODUCTS } from "@/config/store-products";
import { brandProducts, recommendedProducts, topRatedProducts } from "@/lib/store-rails";
import type { HomeRail, HomeReview } from "@/types/store-home-rail";

export const NEW_ARRIVALS_RAIL: HomeRail = {
  id: "new-arrivals",
  title: "New arrivals",
  prevLabel: "Scroll left",
  nextLabel: "Scroll right",
  products: STORE_PRODUCTS,
};

export const LINDT_RAIL: HomeRail = {
  id: "lindt-collections",
  title: "Lindt Collections",
  more: { href: "/brand/lindt", label: "View all Lindt" },
  prevLabel: "Previous Lindt products",
  nextLabel: "Next Lindt products",
  products: brandProducts(STORE_PRODUCTS, "Lindt"),
};

export const KITKAT_RAIL: HomeRail = {
  id: "kitkat-collections",
  title: "Kitkat Collections",
  more: { href: "/brand/kitkat", label: "View all" },
  prevLabel: "Previous trending products",
  nextLabel: "Next trending products",
  products: topRatedProducts(STORE_PRODUCTS, "Lindt"),
};

export const RECOMMENDED_RAIL: HomeRail = {
  id: "recommended",
  title: "Recommended for You",
  more: { href: "/shop", label: "View all" },
  prevLabel: "Previous recommended products",
  nextLabel: "Next recommended products",
  products: recommendedProducts(STORE_PRODUCTS),
};

export const REVIEWS_HEADING = {
  title: "Loved by 12,000+ customers",
  rating: "4.9 average",
  prevLabel: "Previous review",
  nextLabel: "Next review",
};

export const REVIEW_AUTOPLAY_MS = 6000;

export const HOME_REVIEWS: HomeReview[] = [
  {
    quote: "“Ordered Lindor for my mother’s birthday at 11 AM, it reached Dhanmondi by 6 PM, perfectly cold. Packing was beautiful.”",
    name: "Tasnim Rahman",
    location: "Dhanmondi, Dhaka",
    initials: "TR",
    color: "#ee5615",
  },
  {
    quote: "“Finally a shop where the chocolates aren’t melted or expired. Paid cash on delivery, no hassle at all.”",
    name: "Arif Hossain",
    location: "Agrabad, Chattogram",
    initials: "AH",
    color: "#3d1104",
  },
  {
    quote: "“Corporate Eid gifting for 60 people — they handled everything including the cards. Will order again.”",
    name: "Nusrat Jahan",
    location: "Gulshan 2, Dhaka",
    initials: "NJ",
    color: "#b7791f",
  },
  {
    quote: "“The Lindt dark bars were fresh with a 2027 expiry. Rider called before coming, very professional.”",
    name: "Mahmud Hasan",
    location: "Uttara, Dhaka",
    initials: "MH",
    color: "#1769aa",
  },
  {
    quote: "“Paid with bKash, got the order next day in Sylhet. Ice packs were still cold!”",
    name: "Sadia Islam",
    location: "Zindabazar, Sylhet",
    initials: "SI",
    color: "#c2185b",
  },
  {
    quote: "“Great prices on Ferrero boxes compared to supermarkets. The gift wrap and card looked premium.”",
    name: "Rakib Chowdhury",
    location: "Khulshi, Chattogram",
    initials: "RC",
    color: "#1f8a4c",
  },
];
