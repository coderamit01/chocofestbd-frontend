"use client";

import type { FormEventHandler } from "react";
import type { FieldErrors } from "react-hook-form";
import { cn } from "cn";
import { Icon } from "@/components/shared/icon";
import { FormField } from "@/components/store/ui/form-field";
import { SelectMenu } from "@/components/store/ui/select-menu";
import { TextArea } from "@/components/store/ui/text-area";
import { TextInput } from "@/components/store/ui/text-input";
import { TextLink } from "@/components/store/ui/text-link";
import { ADDRESS_LABELS, DISTRICT_OPTIONS, KNOWN_CUSTOMER, PHONE_HINT } from "@/config/store-checkout";
import { districtAreas } from "@/lib/store-cart";
import { isValidPhone, type CheckoutValues } from "@/lib/validations/checkout";
import type { AddressLabel } from "@/types/store-cart";

export const CHECKOUT_FORM_ID = "checkout-form";

type ContactAddressFormProps = {
  values: CheckoutValues;
  errors: FieldErrors<CheckoutValues>;
  known: boolean;
  label: AddressLabel;
  onField: (field: keyof CheckoutValues, value: string) => void;
  onClearKnown: () => void;
  onLabel: (label: AddressLabel) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
};

export function ContactAddressForm({
  values,
  errors,
  known,
  label,
  onField,
  onClearKnown,
  onLabel,
  onSubmit,
}: ContactAddressFormProps) {
  const phoneOk = isValidPhone(values.phone);
  const areas = districtAreas(values.district);
  const areaOptions = [
    {
      value: "",
      label: values.district ? "Select area" : "Choose district first",
    },
    ...areas.map((area) => ({ value: area, label: area })),
  ];

  return (
    <form
      id={CHECKOUT_FORM_ID}
      noValidate
      onSubmit={onSubmit}
      className="grid grid-cols-2 items-start gap-4 max-[700px]:grid-cols-1"
    >
      <FormField
        label="Mobile number"
        required
        error={errors.phone?.message}
        hint={phoneOk ? undefined : PHONE_HINT}
        valid={phoneOk}
        className="min-w-0"
      >
        <TextInput
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          placeholder="01XXXXXXXXX"
          maxLength={11}
          leading="+88"
          value={values.phone}
          onChange={(event) => onField("phone", event.target.value)}
          className="h-12 text-base font-medium tracking-[0.04em]"
        />
      </FormField>
      {known && (
        <div className="col-span-full flex gap-2.5 rounded-[12px] bg-[#e6f6ec] px-3.5 py-3 text-[13px] leading-[1.5] text-[#1f8a4c]">
          <Icon name="check" size={16} strokeWidth={1.8} className="mt-0.5 flex-none" />
          <span className="text-[#2f5e41]">
            <b>Welcome back, {KNOWN_CUSTOMER.firstName}!</b> We filled in your saved address.{" "}
            <TextLink onClick={onClearKnown}>Use a different one</TextLink>
          </span>
        </div>
      )}
      <FormField label="Full name" required error={errors.name?.message} className="min-w-0">
        <TextInput
          type="text"
          autoComplete="name"
          placeholder="e.g. Rafiul Islam"
          value={values.name}
          onChange={(event) => onField("name", event.target.value)}
          className="h-12"
        />
      </FormField>
      <FormField label="District" required error={errors.district?.message} className="min-w-0">
        <SelectMenu
          ariaLabel="District"
          name="district"
          options={DISTRICT_OPTIONS}
          value={values.district}
          onChange={(district) => onField("district", district)}
          triggerClassName="h-12"
        />
      </FormField>
      <FormField label="Area / Thana" required error={errors.area?.message} className="min-w-0">
        <SelectMenu
          ariaLabel="Area"
          name="area"
          options={areaOptions}
          value={values.area}
          onChange={(area) => onField("area", area)}
          triggerClassName="h-12"
        />
      </FormField>
      <FormField label="Full address" required error={errors.addr?.message} className="col-span-full min-w-0">
        <TextArea
          rows={2}
          autoComplete="street-address"
          placeholder="House, road, block, flat / floor"
          value={values.addr}
          onChange={(event) => onField("addr", event.target.value)}
          className="min-h-[76px]"
        />
      </FormField>
      <FormField label="Email" optional error={errors.email?.message} className="col-span-full min-w-0">
        <TextInput
          type="email"
          autoComplete="email"
          placeholder="For the invoice"
          value={values.email}
          onChange={(event) => onField("email", event.target.value)}
          className="h-12"
        />
      </FormField>
      <FormField label="Order note" optional className="col-span-full min-w-0">
        <TextArea
          rows={2}
          placeholder="e.g. Call before coming, gate code 1203, preferred delivery time"
          value={values.note}
          onChange={(event) => onField("note", event.target.value)}
          className="min-h-[76px]"
        />
      </FormField>
      <div className="col-span-full flex flex-wrap items-center gap-2 pt-0.5">
        <span className="mr-1 text-[13px] text-ink-2">Save address as</span>
        {ADDRESS_LABELS.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={option === label}
            onClick={() => onLabel(option)}
            className={cn(
              "h-9 cursor-pointer rounded-full border-[1.5px] px-3.5 font-sans text-[13px] leading-none font-medium",
              option === label ? "border-brand bg-brand-50 text-[#9a3412]" : "border-[#e7e0da] bg-white text-[#3f3531]",
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </form>
  );
}
