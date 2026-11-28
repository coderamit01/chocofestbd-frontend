import type { SelectMenuOption } from "@/components/store/ui/select-menu";
import type { AddressLabel, CheckoutAddress, DeliveryZone, PaymentMethod, PlacedOrder } from "@/types/store-cart";

export const ORDER_NUMBER = "CF-260482";

export const CARD_FEE_RATE = 0.015;

export const DISTRICT_OPTIONS: SelectMenuOption[] = [
  { value: "", label: "Select district" },
  ...[
    "Dhaka",
    "Gazipur",
    "Narayanganj",
    "Chattogram",
    "Sylhet",
    "Rajshahi",
    "Khulna",
    "Barishal",
    "Rangpur",
    "Mymensingh",
    "Cumilla",
    "Bogura",
  ].map((district) => ({ value: district, label: district })),
];

export const DISTRICT_AREAS: Record<string, string[]> = {
  Dhaka: [
    "Dhanmondi",
    "Gulshan",
    "Banani",
    "Mirpur",
    "Mohammadpur",
    "Uttara",
    "Bashundhara R/A",
    "Motijheel",
    "Badda",
    "Lalbagh",
  ],
  Gazipur: ["Tongi", "Gazipur Sadar", "Kaliakair"],
  Narayanganj: ["Narayanganj Sadar", "Fatullah", "Siddhirganj"],
  Chattogram: ["Agrabad", "Khulshi", "Panchlaish", "Halishahar", "Chawkbazar"],
  Sylhet: ["Zindabazar", "Ambarkhana", "Sylhet Sadar"],
};

export const DHAKA_CITY_DISTRICT = "Dhaka";

export const DHAKA_SUBURB_DISTRICTS = ["Gazipur", "Narayanganj"];

export const DELIVERY_ZONES: DeliveryZone[] = [
  {
    id: "in",
    name: "Inside Dhaka",
    areas: "Dhaka city corporation (North & South)",
    charge: 70,
    days: "1–2 days",
    icon: "truck",
    active: true,
    sort: 1,
  },
  {
    id: "sub",
    name: "Dhaka suburbs",
    areas: "Gazipur, Narayanganj, Savar, Keraniganj",
    charge: 100,
    days: "2–3 days",
    icon: "truck",
    active: true,
    sort: 2,
  },
  {
    id: "out",
    name: "Outside Dhaka",
    areas: "All other districts",
    charge: 130,
    days: "3–5 days",
    icon: "truck",
    active: true,
    sort: 3,
  },
  {
    id: "exp",
    name: "Express (same day)",
    areas: "Gulshan, Banani, Dhanmondi, Uttara",
    charge: 150,
    days: "Same day",
    icon: "clock",
    active: false,
    sort: 4,
  },
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "cod",
    title: "Cash on delivery",
    description: "Pay the rider in cash or by bKash QR",
    mark: "COD",
    logo: "cod",
    info: "",
    fee: false,
  },
  {
    id: "bkash",
    title: "bKash",
    description: "Pay now from your bKash account",
    mark: "b",
    logo: "bk",
    info: "You’ll be taken to bKash to enter your number, OTP and PIN.",
    fee: false,
  },
  {
    id: "nagad",
    title: "Nagad",
    description: "Pay now from your Nagad account",
    mark: "N",
    logo: "ng",
    info: "You’ll be taken to Nagad to approve the payment securely.",
    fee: false,
  },
  {
    id: "card",
    title: "Debit / credit card",
    description: "Visa, Mastercard, Amex — via SSLCommerz",
    mark: "💳",
    logo: "cd",
    info: "Your card is processed by SSLCommerz. We never see or store your card number. A 1.5% gateway fee applies.",
    fee: true,
  },
];

export const ADDRESS_LABELS: AddressLabel[] = ["Home", "Office", "Gift recipient"];

export const EMPTY_ADDRESS: CheckoutAddress = {
  phone: "",
  name: "",
  district: "",
  area: "",
  addr: "",
  email: "",
  note: "",
};

export const KNOWN_CUSTOMER = {
  phone: "01712345678",
  firstName: "Rafi",
  address: {
    name: "Rafiul Islam",
    district: "Dhaka",
    area: "Dhanmondi",
    addr: "House 21, Road 3, Flat 4B",
  },
};

export const PHONE_HINT = "Tip: try 01712345678 to see saved-address autofill";

export const SAMPLE_ORDER: PlacedOrder = {
  number: ORDER_NUMBER,
  address: {
    ...EMPTY_ADDRESS,
    phone: KNOWN_CUSTOMER.phone,
    ...KNOWN_CUSTOMER.address,
  },
  lines: [
    { productId: 1, quantity: 2 },
    { productId: 9, quantity: 1 },
    { productId: 3, quantity: 1 },
  ],
  delivery: "in",
  payment: "cod",
  total: 6793,
  settled: true,
};
