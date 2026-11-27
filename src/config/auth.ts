export type AuthArtCopy = { lead: string; highlight: string; body: string };

export const AUTH_ART: Record<"login" | "signup", AuthArtCopy> = {
  login: {
    lead: "Simplify management with our",
    highlight: "dashboard.",
    body: "Simplify your chocolate store management with our easy admin dashboard.",
  },
  signup: {
    lead: "Grow your store with",
    highlight: "one team.",
    body: "Create your ChocoFest account and start handling orders, payments and deliveries today.",
  },
};

export const AUTH_LOGO_SRC = "/Chocofestbd Logo.webp";

export const PASSWORD_STRENGTH = [
  { label: "Too short", color: "#e9e2dc" },
  { label: "Weak", color: "#c43425" },
  { label: "Fair", color: "#e0840f" },
  { label: "Good", color: "#2e9e62" },
  { label: "Strong", color: "#1f8a4c" },
];

export const PASSWORD_RULES = [
  (value: string) => value.length >= 8,
  (value: string) => /\d/.test(value),
  (value: string) => /[A-Z]/.test(value) && /[a-z]/.test(value),
  (value: string) => /[^A-Za-z0-9]/.test(value),
];
