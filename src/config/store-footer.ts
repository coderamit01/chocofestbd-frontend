import type {
  FooterContactItem,
  FooterLink,
  FooterLinkGroup,
  FooterPaymentMethod,
  FooterSocial,
  FooterTrustItem,
} from "@/types/store-footer";

export const STORE_WHATSAPP_URL = "https://wa.me/8801711223344";

export const FOOTER_TAGLINE = "Authentic imported chocolates and gifts, delivered fresh across Bangladesh.";

export const FOOTER_COPYRIGHT = "© 2026 ChocoFest BD";

export const FOOTER_DEVELOPER = "Amit";

export const FOOTER_TRUST_ITEMS: FooterTrustItem[] = [
  { icon: "shield", title: "100% authentic", description: "Sourced from official importers" },
  { icon: "truck", title: "Delivery in 64 districts", description: "Same day in Dhaka before 12 PM" },
  { icon: "cash", title: "Cash on delivery", description: "Pay when it reaches you" },
  { icon: "box", title: "Cool-packed", description: "Insulated so nothing melts" },
  { icon: "refresh", title: "Easy returns", description: "Damaged? Replaced in 3 days" },
];

export const FOOTER_SOCIALS: FooterSocial[] = [
  { label: "Facebook", href: "https://facebook.com/chocofestbd", icon: "facebook" },
  { label: "Instagram", href: "https://instagram.com/chocofestbd", icon: "instagram" },
  { label: "YouTube", href: "https://youtube.com/@chocofestbd", icon: "youtube" },
  { label: "TikTok", href: "https://tiktok.com/@chocofestbd", icon: "tiktok" },
];

export const FOOTER_PAYMENT_METHODS: FooterPaymentMethod[] = [
  { label: "bKash", color: "#e2136e" },
  { label: "Nagad", color: "#f6921e" },
  { label: "Rocket", color: "#8c3494" },
  { label: "VISA", color: "#1a1f71", italic: true },
  { label: "COD", icon: "cash" },
];

export const FOOTER_LINK_GROUPS: FooterLinkGroup[] = [
  {
    heading: "Shop",
    links: [
      { label: "Chocolates", href: "/category/chocolates" },
      { label: "Gift boxes", href: "/category/gift-boxes" },
      { label: "Offers", href: "/offers" },
      { label: "New arrivals", href: "/new-arrivals" },
      { label: "All brands", href: "/brands" },
    ],
  },
  {
    heading: "Help",
    links: [
      { label: "Track order", href: "/track-order" },
      { label: "Delivery info", href: "/delivery" },
      { label: "Returns & refunds", href: "/returns" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Corporate gifting", href: "/corporate-gifting" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
    ],
  },
];

export const FOOTER_CONTACT_ITEMS: FooterContactItem[] = [
  { label: "01711-223344", icon: "phone", href: "tel:01711223344" },
  { label: "WhatsApp us", icon: "whatsapp", href: STORE_WHATSAPP_URL, external: true },
  { label: "hello@chocofestbd.com", icon: "send", href: "mailto:hello@chocofestbd.com" },
  { label: "10 AM – 10 PM, every day", icon: "clock" },
];

export const FOOTER_LEGAL_LINKS: FooterLink[] = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Returns", href: "/returns" },
];
