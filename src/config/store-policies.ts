import type { StorePolicy } from "@/types/store-policy";

const POLICY_UPDATED = "Last updated 1 Nov 2026";

export const RETURNS_POLICY: StorePolicy = {
  title: "Return & refund policy",
  description: "How returns, replacements, refunds and cancellations work at ChocoFest BD.",
  kicker: "Policy",
  lead: "We want every box to arrive perfect. If it doesn’t, we make it right — quickly.",
  updated: POLICY_UPDATED,
  highlights: [
    { icon: "clock", value: "3 days", label: "to report a problem" },
    { icon: "refresh", value: "Free", label: "replacement or refund" },
    { icon: "cash", value: "3–5 days", label: "refund to bKash / card" },
  ],
  sections: [
    { id: "p1", title: "What you can return", body: "Items that arrive damaged, melted, expired, or different from what you ordered. Tell us within 3 days of delivery with a photo of the product and the packaging." },
    { id: "p2", title: "What we can’t take back", body: "Opened or partly eaten food items, products returned for change of mind after opening, and gift boxes customised with names or logos." },
    { id: "p3", title: "How to request a return", body: "Message us on WhatsApp or use the contact form with your order number and photos. We confirm within 2 hours and arrange a free pickup in Dhaka, or a courier label outside Dhaka." },
    { id: "p4", title: "Refunds", body: "Cash-on-delivery orders are refunded by bKash or Nagad. Card and mobile-wallet payments go back to the original method within 3–5 working days of approval." },
    { id: "p5", title: "Cancellations", body: "You can cancel free of charge until your order is dispatched. After dispatch, the delivery charge is non-refundable." },
  ],
  help: { title: "Questions about a return?", text: "We’re here 10 AM – 10 PM." },
};

export const PRIVACY_POLICY: StorePolicy = {
  title: "Privacy policy",
  description: "What personal information ChocoFest BD collects, why, and how we keep it safe.",
  kicker: "Policy",
  lead: "We only collect what we need to deliver your chocolates, and we never sell your data.",
  updated: POLICY_UPDATED,
  sections: [
    { id: "p1", title: "What we collect", body: "Your name, mobile number, delivery address and order history. If you create an account we also store your email address and saved addresses." },
    { id: "p2", title: "How we use it", body: "To process and deliver orders, send order updates by SMS, answer your messages, and — only if you opt in — tell you about offers." },
    { id: "p3", title: "Who we share it with", body: "Only with the courier delivering your order and the payment provider processing your payment. We never sell or rent your information." },
    { id: "p4", title: "Payments & security", body: "Card and mobile-wallet payments are handled by our payment partners. We never see or store your full card number or PIN." },
    { id: "p5", title: "Your choices", body: "You can update your details from your account, unsubscribe from offers at any time, or ask us to delete your account by contacting us." },
  ],
  help: { title: "Questions about your data?", text: "We’re here 10 AM – 10 PM." },
};

export const TERMS_POLICY: StorePolicy = {
  title: "Terms & conditions",
  description: "The terms that apply when you browse and order from ChocoFest BD.",
  kicker: "Policy",
  lead: "The simple rules that apply when you shop with us.",
  updated: POLICY_UPDATED,
  sections: [
    { id: "p1", title: "Using our store", body: "By placing an order you confirm that the details you give us are correct and that you are allowed to use the payment method you choose." },
    { id: "p2", title: "Prices & availability", body: "Prices are shown in Bangladeshi Taka and include VAT. Stock is limited, and we may cancel an order if an item sells out — you will be refunded in full." },
    { id: "p3", title: "Orders & delivery", body: "An order is confirmed once we send you an SMS. Delivery times are estimates and can change during holidays or bad weather." },
    { id: "p4", title: "Coupons & offers", body: "One coupon can be used per order. Offers can’t be exchanged for cash and may end at any time." },
    { id: "p5", title: "Changes to these terms", body: "We may update these terms from time to time. The version shown on this page applies to every new order." },
  ],
  help: { title: "Questions about these terms?", text: "We’re here 10 AM – 10 PM." },
};
