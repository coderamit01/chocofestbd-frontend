import type { IconName } from "@/components/shared/icon";

export type ContactWay = {
  icon: IconName;
  title: string;
  detail: string;
  note: string;
  href: string;
  background: string;
  color: string;
};

export type ContactStore = {
  mapLabel: string;
  title: string;
  address: string;
  hours: string;
  directionsHref: string;
};
