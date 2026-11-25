export type DeliveryZone = {
  id: string;
  name: string;
  charge: string;
  estimatedDays: string | null;
  sortOrder: number;
  isActive: boolean;
  areas: string | null;
  recentOrders: number;
  createdAt: string;
  updatedAt: string;
  _count: { addresses: number };
};

export type FreeDeliveryOffer = {
  code: string;
  minOrderAmount: string | null;
};

export type DeliveryZoneFormValues = {
  name: string;
  areas: string;
  charge: string;
  estimatedDays: string;
  sortOrder: string;
  isActive: boolean;
};

export type DeliveryZonePayload = {
  name: string;
  areas: string;
  charge: string;
  estimatedDays: string;
  sortOrder: number;
  isActive: boolean;
};
