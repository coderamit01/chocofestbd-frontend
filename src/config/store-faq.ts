import type { FaqCategory, FaqEntry } from "@/types/store-faq";

export const FAQ_CATEGORIES: FaqCategory[] = [
  { value: "All", icon: "grid" },
  { value: "Delivery", icon: "truck" },
  { value: "Payment", icon: "cash" },
  { value: "Products", icon: "box" },
  { value: "Returns", icon: "refresh" },
  { value: "Gifting", icon: "gift" },
];

export const FAQ_ENTRIES: FaqEntry[] = [
  { id: 0, topic: "Delivery", question: "How much is the delivery charge?", answer: "Inside Dhaka city ৳80 (free over ৳2,000), Gazipur & Narayanganj ৳100, everywhere else ৳130. Express same-day delivery in Dhaka is ৳150." },
  { id: 1, topic: "Delivery", question: "How fast will I get my order?", answer: "Dhaka: same day if you order before 4 PM with Express, otherwise next day. Outside Dhaka: 1–3 working days by courier." },
  { id: 2, topic: "Delivery", question: "Will the chocolate melt in the heat?", answer: "No. Every order is packed in an insulated bag with ice gels. If anything still arrives soft or melted, send a photo within 3 days and we’ll replace it free." },
  { id: 3, topic: "Payment", question: "Which payment methods do you accept?", answer: "Cash on delivery, bKash, Nagad, and Visa / Mastercard / Amex cards through SSLCommerz." },
  { id: 4, topic: "Payment", question: "Is cash on delivery available everywhere?", answer: "Yes, across all 64 districts. For orders above ৳10,000 we may ask for a small advance by bKash." },
  { id: 5, topic: "Products", question: "Are your chocolates original?", answer: "Yes. We buy only from official importers and keep batch records. Every pack carries the importer sticker required by BSTI." },
  { id: 6, topic: "Products", question: "How do I check the expiry date?", answer: "Every product page shows the best-before date of our current batch. We never sell items with less than 4 months left." },
  { id: 7, topic: "Returns", question: "What is your return policy?", answer: "Damaged, melted, expired or wrong items can be returned within 3 days of delivery. Opened food items can’t be returned for change of mind." },
  { id: 8, topic: "Gifting", question: "Can you deliver a gift with a note?", answer: "Yes. Turn on “Send as a gift” in your cart to add wrapping and a handwritten card. Prices are hidden on gift invoices." },
];

export const FAQ_SEARCH_PLACEHOLDER = "Search e.g. delivery charge, bKash, melted";
