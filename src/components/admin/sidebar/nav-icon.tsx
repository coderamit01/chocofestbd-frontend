import type { SVGProps } from "react";

export const NAV_ICON_PATHS = {
  dashboard: "M4 4h6v7H4zM14 4h6v4h-6zM14 12h6v8h-6zM4 15h6v5H4z",
  deliveries: "M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  orders: "M5 8h14l-1.2 11.2a1 1 0 0 1-1 .8H7.2a1 1 0 0 1-1-.8L5 8zM9 8V6a3 3 0 0 1 6 0v2",
  payments: "M3 6h18v12H3zM3 10h18M7 15h4",
  customers:
    "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 6.8M18 14.2a6.5 6.5 0 0 1 3.5 5.8",
  products: "M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zM4 7.5l8 4.5 8-4.5M12 12v9",
  categories: "M4 6h6l2 2h8v11H4z",
  brands: "M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 15.6l-4.9 2.6.9-5.5-4-3.9 5.5-.8z",
  tags: "M3 12V4h8l10 10-8 8-10-10zM7.5 7.5h.01",
  collections: "M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5",
  coupons: "M4 6h16v4a2 2 0 0 0 0 4v4H4v-4a2 2 0 0 0 0-4zM14 6v12",
  banners: "M3 5h18v14H3zM3 16l5-5 4 4 3-3 6 6M15.5 9h.01",
  reviews: "M4 5h16v11H9l-5 4zM12 8l1 2 2 .3-1.5 1.4.4 2.1-1.9-1-1.9 1 .4-2.1L9 10.3l2-.3z",
  faqs: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9.5 9.5a2.5 2.5 0 0 1 4.9.7c0 1.7-2.4 2.3-2.4 3.8M12 17h.01",
  zones: "M2 6h11v10H2zM13 9h4l4 4v3h-8M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  staff: "M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6zM12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM8.5 15.5a4 4 0 0 1 7 0",
  notifications: "M6 16v-5a6 6 0 0 1 12 0v5l2 2H4zM10 21h4",
  settings:
    "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z",
  logout: "M15 4h4v16h-4M10 8l-4 4 4 4M6 12h10",
  collapse: "M15 6l-6 6 6 6",
  expand: "M9 6l6 6-6 6",
  close: "M6 6l12 12M18 6L6 18",
} as const;

export type NavIconName = keyof typeof NAV_ICON_PATHS;

type NavIconProps = SVGProps<SVGSVGElement> & {
  name: NavIconName;
  size?: number;
};

export function NavIcon({ name, size = 20, strokeWidth = 1.75, ...props }: NavIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={NAV_ICON_PATHS[name]} />
    </svg>
  );
}
