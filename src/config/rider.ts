import type { BadgeVariant } from "@/components/ui/badge";
import type { UserRole } from "@/types/auth";
import type { DeliveryResult } from "@/types/rider";

export const RIDER_ROLES: UserRole[] = ["RIDER"];

export const FAILED_DELIVERY_REASONS = [
  "Customer not reachable by phone",
  "Customer refused the parcel",
  "Wrong or incomplete address",
  "Customer asked to reschedule",
];

export const DELIVERY_BADGES: Record<DeliveryResult | "OPEN", { label: string; variant: BadgeVariant }> = {
  OPEN: { label: "Shipped", variant: "shipped" },
  DELIVERED: { label: "Delivered", variant: "success" },
  FAILED: { label: "Failed", variant: "danger" },
};

export const PHONE_COUNTRY_PREFIX = "+88";
