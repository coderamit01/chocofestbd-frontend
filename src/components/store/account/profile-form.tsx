"use client";

import type { FormEvent } from "react";
import { toast } from "sonner";
import { FormField } from "@/components/store/ui/form-field";
import { FormRow } from "@/components/store/ui/form-row";
import { StoreButton } from "@/components/store/ui/store-button";
import { StoreCard } from "@/components/store/ui/store-card";
import { TextInput } from "@/components/store/ui/text-input";
import type { AccountCustomer } from "@/types/store-account";
import { SmsSwitch } from "./sms-switch";

export function ProfileForm({ customer }: { customer: AccountCustomer }) {
  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast.success("Saved", { description: "Your profile is up to date" });
  };

  return (
    <StoreCard as="section" aria-label="Profile details" className="max-w-[640px]">
      <form onSubmit={save} className="flex flex-col gap-3.5">
        <FormRow>
          <FormField label="Full name">
            <TextInput name="name" autoComplete="name" defaultValue={customer.name} />
          </FormField>
          <FormField label="Mobile number">
            <TextInput name="mobile" inputMode="numeric" defaultValue={customer.mobile} readOnly />
          </FormField>
        </FormRow>
        <FormRow>
          <FormField label="Email">
            <TextInput name="email" type="email" autoComplete="email" defaultValue={customer.email} />
          </FormField>
          <FormField
            label={
              <>
                Birthday <i className="ml-1.5 text-xs font-normal text-[#a69b95] not-italic">for a birthday treat 🎂</i>
              </>
            }
          >
            <TextInput name="birthday" type="date" defaultValue={customer.birthday} />
          </FormField>
        </FormRow>
        <SmsSwitch title="Offers by SMS" description="Max 2 messages a week" defaultChecked />
        <StoreButton type="submit" className="self-start">
          Save changes
        </StoreButton>
      </form>
    </StoreCard>
  );
}
