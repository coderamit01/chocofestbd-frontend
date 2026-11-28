"use client";

import { useState, type ReactNode } from "react";
import { toast } from "sonner";
import { TRACK_DEFAULT_PHONE, TRACK_FOUND_TOAST, TRACK_SAMPLE_ORDER } from "@/config/store-track";
import { isTrackable, normalizeOrderNumber, normalizePhone } from "@/lib/store-track";
import { TrackLookupForm } from "./track-lookup-form";

type TrackOrderProps = {
  initialOrder?: string;
  result: ReactNode;
};

export function TrackOrder({ initialOrder, result }: TrackOrderProps) {
  const [orderNumber, setOrderNumber] = useState(normalizeOrderNumber(initialOrder ?? TRACK_SAMPLE_ORDER.number));
  const [phone, setPhone] = useState(TRACK_DEFAULT_PHONE);
  const [notFound, setNotFound] = useState(false);
  const [found, setFound] = useState(() => isTrackable(orderNumber, phone));

  const find = () => {
    if (isTrackable(orderNumber, phone)) {
      setFound(true);
      toast.success(TRACK_FOUND_TOAST.title, { description: TRACK_FOUND_TOAST.description });
      return;
    }
    setNotFound(true);
    setFound(false);
  };

  return (
    <div className="grid grid-cols-[380px_1fr] items-start gap-5 pt-2.5 max-[900px]:grid-cols-1">
      <TrackLookupForm
        orderNumber={orderNumber}
        phone={phone}
        notFound={notFound}
        onOrderNumberChange={(value) => {
          setOrderNumber(normalizeOrderNumber(value));
          setNotFound(false);
        }}
        onPhoneChange={(value) => {
          setPhone(normalizePhone(value));
          setNotFound(false);
        }}
        onSubmit={find}
      />
      {found && result}
    </div>
  );
}
