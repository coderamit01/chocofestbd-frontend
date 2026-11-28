import type { NotFoundLink } from "@/types/store-not-found";

export const NOT_FOUND_LINKS: NotFoundLink[] = [
  { label: "Home", href: "/", icon: "home" },
  { label: "All chocolates", href: "/shop", icon: "grid" },
  { label: "Today’s offers", href: "/offers", icon: "percent" },
  { label: "Track order", href: "/track-order", icon: "truck" },
];

export const NOT_FOUND_PICK_IDS = [1, 2, 6, 9];
