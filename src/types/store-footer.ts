import type { IconName } from "@/components/shared/icon";

export type FooterLink = { label: string; href: string };

export type FooterTrustItem = { icon: IconName; title: string; description: string };

export type FooterLinkGroup = { heading: string; links: FooterLink[] };

export type FooterSocial = { label: string; href: string; icon: IconName };

export type FooterPaymentMethod = {
  label: string;
  color?: string;
  italic?: boolean;
  icon?: IconName;
};

export type FooterContactItem = { label: string; icon: IconName; href?: string; external?: boolean };
