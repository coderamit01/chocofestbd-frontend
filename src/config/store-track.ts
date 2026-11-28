import type { TrackedOrder } from "@/types/store-order";

export const TRACK_DEFAULT_PHONE = "01712345678";

export const TRACK_SAMPLE_ORDER: TrackedOrder = {
  number: "CF-260482",
  placed: "placed today, 11:42 AM",
  headline: "Out for delivery 🛵",
  eta: "today, 4:00 – 5:00 PM",
  status: "On the way",
  stages: [
    { title: "Placed", time: "11:42 AM", icon: "check", state: "done" },
    { title: "Confirmed", time: "11:58 AM", icon: "phone", state: "done" },
    { title: "Packed", time: "1:10 PM", icon: "box", state: "done" },
    { title: "On the way", time: "2:35 PM", icon: "truck", state: "now" },
    { title: "Delivered", time: "Expected 4–5 PM", icon: "home", state: "next" },
  ],
  updates: [
    { title: "Picked up by rider Sohel", detail: "2:35 PM · Banani hub", state: "now" },
    { title: "Cool-packed with 2 ice gels", detail: "1:10 PM", state: "done" },
    { title: "Order confirmed by phone", detail: "11:58 AM", state: "done" },
    { title: "Order placed", detail: "11:42 AM", state: "done" },
  ],
  rider: {
    initials: "SM",
    name: "Sohel Mia · your rider",
    vehicle: "Honda · DHK-METRO-HA-24-1182",
    rating: "★ 4.9 · 1,240 deliveries",
    phone: "01700000000",
  },
  lines: [
    { productId: 1, quantity: 2 },
    { productId: 9, quantity: 1 },
    { productId: 3, quantity: 1 },
  ],
  itemsSummary: "Items · ৳6,873 cash on delivery",
};

export const TRACK_FOUND_TOAST = {
  title: "Order found",
  description: "CF-260482 is out for delivery",
};
