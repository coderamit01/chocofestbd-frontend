import type { IconName } from "@/components/shared/icon";

export type AccountTab = {
  label: string;
  href: string;
  icon: IconName;
  count?: number;
};

export type AccountCustomer = {
  name: string;
  initials: string;
  phone: string;
  mobile: string;
  email: string;
  birthday: string;
  tier: string;
};

export type AccountStat = {
  label: string;
  value: string;
};

export type SavedAddress = {
  id: string;
  icon: string;
  label: string;
  name: string;
  phone: string;
  line: string;
};
