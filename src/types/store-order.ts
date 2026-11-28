import type { IconName } from "@/components/shared/icon";

export type OrderTone = "live" | "ok" | "no";

export type OrderFilter = {
  label: string;
  tone?: OrderTone;
};

export type CustomerOrder = {
  number: string;
  date: string;
  status: string;
  tone: OrderTone;
  productIds: number[];
  total: number;
  payment: string;
};

export type TrackStepState = "done" | "now" | "next";

export type TrackStage = {
  title: string;
  time: string;
  icon: IconName;
  state: TrackStepState;
};

export type TrackUpdate = {
  title: string;
  detail: string;
  state: TrackStepState;
};

export type TrackLine = {
  productId: number;
  quantity: number;
};

export type TrackRider = {
  initials: string;
  name: string;
  vehicle: string;
  rating: string;
  phone: string;
};

export type TrackedOrder = {
  number: string;
  placed: string;
  headline: string;
  eta: string;
  status: string;
  stages: TrackStage[];
  updates: TrackUpdate[];
  rider: TrackRider;
  lines: TrackLine[];
  itemsSummary: string;
};
