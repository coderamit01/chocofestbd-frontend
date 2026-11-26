import type { IconName } from "@/components/shared/icon";
import type { NotificationType } from "@/types/notification";
import type { NotificationSeverity } from "@/types/status";
import type { EditableSettingGroup, LegalSettings, PaymentSettings, SettingsTab, SocialSettings } from "@/types/setting";

export const SETTINGS_TABS: { value: SettingsTab; label: string; icon: IconName }[] = [
  { value: "general", label: "General", icon: "home" },
  { value: "payment", label: "Payment", icon: "payments" },
  { value: "notifications", label: "Notifications", icon: "notifications" },
  { value: "seo", label: "SEO", icon: "globe" },
  { value: "social", label: "Social", icon: "link" },
  { value: "pages", label: "Pages & policies", icon: "faqs" },
];

export const SETTINGS_TAB_VALUES = SETTINGS_TABS.map((tab) => tab.value);

export const SETTINGS_TAB_GROUPS: Record<SettingsTab, EditableSettingGroup[]> = {
  general: ["general", "numbering"],
  payment: ["payment"],
  notifications: ["notifications"],
  seo: ["seo"],
  social: ["social"],
  pages: ["legal"],
};

export type WalletKey = keyof Pick<PaymentSettings, "bkash" | "nagad" | "rocket">;

export const WALLETS: { key: WalletKey; name: string; short: string; color: string }[] = [
  { key: "bkash", name: "bKash", short: "bK", color: "#e2136e" },
  { key: "nagad", name: "Nagad", short: "N", color: "#ec1c24" },
  { key: "rocket", name: "Rocket", short: "R", color: "#8c3494" },
];

export const TELEGRAM_EVENTS: { type: NotificationType; label: string; description: string; priority: NotificationSeverity }[] = [
  { type: "order.created", label: "New order", description: "Website or phone order", priority: "INFO" },
  { type: "order.paymentPending", label: "Payment pending", description: "Wallet or bank payment submitted", priority: "WARNING" },
  { type: "order.cancelledByCustomer", label: "Cancelled by customer", description: "Customer cancels from their account", priority: "WARNING" },
  { type: "stock.low", label: "Low stock", description: "Stock reaches its threshold", priority: "WARNING" },
  { type: "stock.out", label: "Out of stock", description: "Stock reaches zero", priority: "CRITICAL" },
  { type: "review.pending", label: "Review pending", description: "A new review needs approval", priority: "INFO" },
  { type: "system.error", label: "System error", description: "SMS, payment gateway or server errors", priority: "CRITICAL" },
];

export type SocialKey = keyof Omit<SocialSettings, "messenger">;

export const SOCIAL_LINKS: { key: SocialKey; label: string; prefix: string; mono: string; color: string }[] = [
  { key: "facebook", label: "Facebook", prefix: "facebook.com/", mono: "f", color: "#1877f2" },
  { key: "instagram", label: "Instagram", prefix: "instagram.com/", mono: "IG", color: "#d62976" },
  { key: "youtube", label: "YouTube", prefix: "youtube.com/@", mono: "YT", color: "#e62117" },
  { key: "tiktok", label: "TikTok", prefix: "tiktok.com/@", mono: "TT", color: "#221510" },
];

export const LEGAL_PAGES: { key: keyof LegalSettings; label: string }[] = [
  { key: "terms", label: "Terms" },
  { key: "privacyPolicy", label: "Privacy" },
  { key: "returnPolicy", label: "Return policy" },
  { key: "deliveryPolicy", label: "Delivery policy" },
];

export const SEO_TITLE_LIMIT = 60;
export const SEO_DESCRIPTION_LIMIT = 160;
export const SETTINGS_TIME_ZONE = "Asia/Dhaka";

export const STORE_HOST = "chocofestbd.com";

export const STORE_FACTS = [
  { label: "Currency", value: "BDT · ৳ · 1,00,000 format" },
  { label: "Time zone", value: "Asia/Dhaka (UTC+6)" },
  { label: "Phone format", value: "01XXXXXXXXX" },
];

export const CHECKOUT_METHOD_STYLES = {
  cod: { name: "Cash on delivery", short: "৳", color: "#12733f" },
  bankTransfer: { name: "Bank transfer", short: "B", color: "#3d1104" },
};

export const WALLET_TYPE_HINTS = {
  MERCHANT: "Customers use “Payment” in the app.",
  PERSONAL: "Customers use “Send Money”.",
};
