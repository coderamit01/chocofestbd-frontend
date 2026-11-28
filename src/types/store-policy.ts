import type { IconName } from "@/components/shared/icon";

export type PolicyHighlight = {
  icon: IconName;
  value: string;
  label: string;
};

export type PolicySection = {
  id: string;
  title: string;
  body: string;
};

export type StorePolicy = {
  title: string;
  description: string;
  kicker: string;
  lead: string;
  updated: string;
  highlights?: PolicyHighlight[];
  sections: PolicySection[];
  help: {
    title: string;
    text: string;
  };
};
