import { generateSlug } from "@/lib/slug";
import type {
  BottomNavItem,
  CartLine,
  DeliveryArea,
  MegaGroup,
  SearchScope,
  StoreCategory,
  StoreIconLink,
  StoreNavLink,
  StoreProduct,
} from "@/types/store";

const group = (category: string, heading: string, items: string[]): MegaGroup => ({
  heading,
  links: items.map((label) => ({ label, href: `/category/${generateSlug(category)}?filter=${generateSlug(label)}` })),
});

export const STORE_HOTLINE = {
  display: "01711-223344",
  href: "tel:01711223344",
  hours: "10 AM – 10 PM",
};

export const ANNOUNCEMENT_MESSAGES = [
  "Free delivery inside Dhaka on orders over ৳1,500",
  "Cash on delivery all over Bangladesh — pay when it arrives",
  "Use code CHOCO10 for 10% off your first order",
];

export const ANNOUNCEMENT_TRUST = "100% authentic · Cash on delivery";

export const STORE_ROUTES = {
  home: "/",
  shop: "/shop",
  search: "/shop",
  cart: "/cart",
  checkout: "/checkout",
  login: "/login",
  wishlist: "/wishlist",
  trackOrder: "/track-order",
  bestSellers: "/shop?sort=best-sellers",
};

export const SEARCH_SCOPES: SearchScope[] = [
  { value: "all", label: "All categories" },
  { value: "chocolates", label: "Chocolates" },
  { value: "gift-boxes", label: "Gift boxes" },
  { value: "biscuits-wafers", label: "Biscuits & wafers" },
  { value: "coffee-drinks", label: "Coffee & drinks" },
];

export const SEARCH_PLACEHOLDER = "Search Lindt, KitKat, gift boxes…";
export const SEARCH_LISTENING_PLACEHOLDER = "Listening… say a product or brand";
export const POPULAR_SEARCHES = ["Lindt", "Ferrero Rocher", "KitKat", "Gift box", "Dark chocolate"];
export const SEARCH_SUGGESTION_LIMIT = 4;

const product = (id: number, name: string, brand: string, price: number, color: string, oldPrice?: number): StoreProduct => ({
  id,
  name,
  brand,
  price,
  oldPrice,
  color,
  href: `/product/${generateSlug(name)}`,
});

export const SAMPLE_PRODUCTS: StoreProduct[] = [
  product(1, "Lindt Lindor Milk Truffles 200g", "Lindt", 1450, "#c8102e", 1650),
  product(2, "Ferrero Rocher T16 Gift Box", "Ferrero", 1850, "#b38b2d"),
  product(3, "KitKat 4 Finger Pack of 6", "Nestlé", 480, "#d71920", 540),
  product(4, "Cadbury Dairy Milk Silk 150g", "Cadbury", 520, "#4b2a84"),
  product(5, "Toblerone Milk 100g", "Toblerone", 390, "#e8b400", 450),
  product(6, "Kinder Bueno Pack of 3", "Kinder", 420, "#e2231a"),
  product(7, "Lindt Excellence 70% Dark", "Lindt", 690, "#1b1b1b", 790),
  product(8, "Galaxy Smooth Milk 110g", "Galaxy", 330, "#6b2d1f"),
];

export const SAMPLE_CART: CartLine[] = [
  { product: SAMPLE_PRODUCTS[0], quantity: 2 },
  { product: SAMPLE_PRODUCTS[3], quantity: 1 },
  { product: SAMPLE_PRODUCTS[5], quantity: 1 },
];

export const CART_MAX_QUANTITY = 20;
export const FREE_DELIVERY_THRESHOLD = 1500;
export const DEFAULT_DELIVERY_AREA: DeliveryArea = { name: "Inside Dhaka", fee: 60 };
export const WISHLIST_COUNT = 3;

export const STORE_CATEGORIES: StoreCategory[] = [
  {
    name: "Chocolates",
    href: "/category/chocolates",
    icon: "products",
    tone: "brand",
    count: 214,
    groups: [
      group("Chocolates", "By type", ["Milk chocolate", "Dark chocolate", "White chocolate", "Truffles & pralines"]),
      group("Chocolates", "By format", ["Bars", "Bites & minis", "Boxes", "Spreads"]),
      group("Chocolates", "Top brands", ["Lindt", "Ferrero", "Cadbury", "Toblerone"]),
    ],
    promo: { tag: "New", title: "Lindt Excellence range", subtitle: "Up to 20% off this week", href: "/brands/lindt" },
  },
  {
    name: "Gift boxes",
    href: "/category/gift-boxes",
    icon: "gift",
    tone: "rose",
    count: 64,
    groups: [
      group("Gift boxes", "Occasion", ["Birthday", "Anniversary", "Eid gifts", "Thank you"]),
      group("Gift boxes", "Budget", ["Under ৳1,000", "৳1,000–2,500", "Premium ৳2,500+"]),
      group("Gift boxes", "Extras", ["Gift wrapping", "Greeting card", "Same-day Dhaka"]),
    ],
    promo: { tag: "Gift ready", title: "Build a gift box", subtitle: "Wrapped with a note, free", href: "/category/gift-boxes" },
  },
  {
    name: "Biscuits & wafers",
    href: "/category/biscuits-wafers",
    icon: "box",
    tone: "amber",
    count: 88,
    groups: [
      group("Biscuits & wafers", "Type", ["Wafers", "Cookies", "Filled biscuits", "Crackers"]),
      group("Biscuits & wafers", "Brands", ["Loacker", "Oreo", "Pepperidge Farm", "McVitie’s"]),
    ],
    promo: { tag: "Bestseller", title: "Loacker wafers", subtitle: "Buy 2, get 1 free", href: "/brands/loacker" },
  },
  {
    name: "Coffee & drinks",
    href: "/category/coffee-drinks",
    icon: "cash",
    tone: "sky",
    count: 52,
    groups: [
      group("Coffee & drinks", "Coffee", ["Instant", "Ground", "Cappuccino mixes", "Capsules"]),
      group("Coffee & drinks", "Drinks", ["Hot chocolate", "Milk drinks", "Juices"]),
    ],
    promo: { tag: "New", title: "Starbucks at home", subtitle: "Fresh stock just landed", href: "/brands/starbucks" },
  },
  {
    name: "Snacks & candy",
    href: "/category/snacks-candy",
    icon: "star",
    tone: "lav",
    count: 96,
    groups: [
      group("Snacks & candy", "Candy", ["Gummies", "Lollipops", "Mints", "Chewing gum"]),
      group("Snacks & candy", "Snacks", ["Chips", "Nuts", "Popcorn"]),
    ],
    promo: { tag: "Kids love", title: "Haribo gummies", subtitle: "From ৳150", href: "/brands/haribo" },
  },
  {
    name: "Imported deals",
    href: "/category/imported-deals",
    icon: "percent",
    tone: "mint",
    count: 40,
    groups: [group("Imported deals", "Deals", ["Flash sale", "Combo packs", "Near-expiry deals", "Clearance"])],
    promo: { tag: "Ends tonight", title: "Flash sale", subtitle: "Up to 35% off", href: "/offers" },
  },
];

export const MAIN_NAV_LINKS: StoreNavLink[] = [
  { label: "Home", href: "/" },
  { label: "Chocolates", href: "/category/chocolates" },
  { label: "Gift boxes", href: "/category/gift-boxes" },
  { label: "Offers", href: "/offers", tag: "Hot" },
  { label: "Brands", href: "/brands" },
  { label: "New arrivals", href: "/new-arrivals" },
  { label: "Blog", href: "/blog" },
];

export const MOBILE_MENU_LINKS: StoreIconLink[] = [
  { label: "Offers", href: "/offers", icon: "percent", tag: "Hot" },
  { label: "Gift boxes", href: "/category/gift-boxes", icon: "gift" },
  { label: "Track order", href: STORE_ROUTES.trackOrder, icon: "truck" },
  { label: "Wishlist", href: STORE_ROUTES.wishlist, icon: "heart" },
];

export const BOTTOM_NAV_ITEMS: BottomNavItem[] = [
  { label: "Home", icon: "home", href: "/" },
  { label: "Categories", icon: "grid", action: "menu" },
  { label: "Cart", icon: "cart", action: "cart" },
  { label: "Account", icon: "user", href: STORE_ROUTES.login },
];
