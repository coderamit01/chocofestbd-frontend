import type { NotificationType } from "@/types/notification";

export type WalletAccountType = "MERCHANT" | "PERSONAL";

export type MobileWallet = {
  enabled: boolean;
  accountType: WalletAccountType;
  accountNumber: string;
  instructions: string;
};

export type GeneralSettings = {
  storeName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  mapUrl: string;
  businessHours: string;
  copyright: string;
};

export type NumberingSettings = {
  orderPrefix: string;
  invoicePrefix: string;
  skuPrefix: string;
};

export type PaymentSettings = {
  cod: { enabled: boolean; instructions: string };
  bkash: MobileWallet;
  nagad: MobileWallet;
  rocket: MobileWallet;
  bankTransfer: {
    enabled: boolean;
    bankName: string;
    accountName: string;
    accountNumber: string;
    branch: string;
    routingNumber: string;
    instructions: string;
  };
};

export type NotificationSettings = {
  telegramEnabled: boolean;
  events: Record<NotificationType, { telegram: boolean }>;
};

export type SeoSettings = {
  metaTitle: string;
  metaDescription: string;
  googleAnalyticsId: string;
  gtmId: string;
  facebookPixelId: string;
  searchConsoleCode: string;
  robotsTxt: string;
};

export type SocialSettings = {
  facebook: string;
  instagram: string;
  youtube: string;
  tiktok: string;
  messenger: string;
};

export type LegalSettings = {
  terms: string;
  privacyPolicy: string;
  returnPolicy: string;
  deliveryPolicy: string;
};

export type SettingValues = {
  general: GeneralSettings;
  numbering: NumberingSettings;
  payment: PaymentSettings;
  notifications: NotificationSettings;
  seo: SeoSettings;
  social: SocialSettings;
  legal: LegalSettings;
};

export type EditableSettingGroup = keyof SettingValues;

export type SettingImages = {
  general: { logo: string | null; darkLogo: string | null; favicon: string | null };
  seo: { ogImage: string | null };
};

export type ImageSettingGroup = keyof SettingImages;

export type SettingGroupView = {
  group: string;
  value: unknown;
  images: Record<string, string | null>;
};

export type TelegramStatus = {
  configured: boolean;
  botUsername: string | null;
  chatTitle: string | null;
};

export type SettingsTab = "general" | "payment" | "notifications" | "seo" | "social" | "pages";
