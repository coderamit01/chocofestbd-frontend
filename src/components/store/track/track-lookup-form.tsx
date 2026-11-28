import type { FormEvent } from "react";
import { Icon } from "@/components/shared/icon";
import { FormField } from "@/components/store/ui/form-field";
import { StoreButton } from "@/components/store/ui/store-button";
import { StoreCard } from "@/components/store/ui/store-card";
import { TextInput } from "@/components/store/ui/text-input";
import { TextLink } from "@/components/store/ui/text-link";

type TrackLookupFormProps = {
  orderNumber: string;
  phone: string;
  notFound: boolean;
  onOrderNumberChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onSubmit: () => void;
};

export function TrackLookupForm({
  orderNumber,
  phone,
  notFound,
  onOrderNumberChange,
  onPhoneChange,
  onSubmit,
}: TrackLookupFormProps) {
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <StoreCard as="section" aria-labelledby="track-title">
      <form onSubmit={submit} noValidate className="flex flex-col gap-3.5">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-brand-50 text-brand">
          <Icon name="truck" size={26} strokeWidth={1.8} />
        </span>
        <h1 id="track-title" className="m-0 font-heading text-[26px] leading-[1.15] font-bold text-ink">
          Track your order
        </h1>
        <p className="m-0 text-[13.5px] leading-[1.6] text-ink-2">
          Enter the order number from your SMS and the phone number you ordered with. No login needed.
        </p>
        <FormField label="Order number">
          <TextInput
            name="order"
            placeholder="e.g. CF-260482"
            autoComplete="off"
            value={orderNumber}
            onChange={(event) => onOrderNumberChange(event.target.value)}
          />
        </FormField>
        <FormField label="Mobile number">
          <TextInput
            name="phone"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="01XXXXXXXXX"
            value={phone}
            onChange={(event) => onPhoneChange(event.target.value)}
          />
        </FormField>
        {notFound && (
          <small role="alert" className="flex items-center gap-[5px] text-xs font-normal text-[#d92d20]">
            <Icon name="alert" size={13} strokeWidth={1.8} className="flex-none" />
            We couldn’t find that order. Check the number in your SMS.
          </small>
        )}
        <StoreButton type="submit">
          <Icon name="search" size={17} strokeWidth={1.8} />
          Track order
        </StoreButton>
        <p className="m-0 text-[13px] text-[#8a7f79]">
          Have an account? <TextLink href="/account">See all your orders</TextLink>
        </p>
      </form>
    </StoreCard>
  );
}
