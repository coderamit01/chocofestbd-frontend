import type { SelectMenuOption } from "@/components/store/ui/select-menu";
import type { ContactStore, ContactWay } from "@/types/store-contact";

export const CONTACT_WAYS: ContactWay[] = [
  { icon: "phone", title: "Call us", detail: "09678-000000", note: "10 AM – 10 PM", href: "tel:09678000000", background: "#fff5ef", color: "#ee5615" },
  { icon: "chat", title: "WhatsApp", detail: "01700-000000", note: "Fastest reply · ~5 min", href: "https://wa.me/8801700000000", background: "#e6f6ec", color: "#1f8a4c" },
  { icon: "send", title: "Messenger", detail: "m.me/chocofestbd", note: "Reply within 15 min", href: "https://m.me/chocofestbd", background: "#e6f4ff", color: "#1769aa" },
  { icon: "gift", title: "Corporate gifting", detail: "corporate@chocofest.com.bd", note: "Quotes within 24 h", href: "mailto:corporate@chocofest.com.bd", background: "#fdeaf0", color: "#c2185b" },
];

export const CONTACT_TOPICS = [
  "An existing order",
  "Corporate / bulk gifting",
  "Product question",
  "Return or refund",
  "Something else",
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number];

export const CONTACT_TOPIC_OPTIONS: SelectMenuOption<ContactTopic>[] = CONTACT_TOPICS.map((topic) => ({
  value: topic,
  label: topic,
}));

export const CONTACT_STORE: ContactStore = {
  mapLabel: "ChocoFest Banani",
  title: "Store & pickup point",
  address: "House 12, Road 11, Banani, Dhaka 1213",
  hours: "Open daily 10 AM – 10 PM",
  directionsHref: "https://www.google.com/maps/search/?api=1&query=House+12+Road+11+Banani+Dhaka+1213",
};
