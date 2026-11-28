"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@/components/shared/icon";
import { FormField } from "@/components/store/ui/form-field";
import { FormRow } from "@/components/store/ui/form-row";
import { SelectMenu } from "@/components/store/ui/select-menu";
import { StoreButton } from "@/components/store/ui/store-button";
import { StoreCardTitle } from "@/components/store/ui/store-card-title";
import { TextArea } from "@/components/store/ui/text-area";
import { TextInput } from "@/components/store/ui/text-input";
import { CONTACT_TOPIC_OPTIONS } from "@/config/store-contact";
import {
  CONTACT_DEFAULTS,
  CONTACT_FORM_ERROR,
  contactSchema,
  digitsOnly,
  type ContactInput,
  type ContactValues,
} from "@/lib/validations/contact";
import { ContactFormError } from "./contact-form-error";

type ContactFormProps = {
  onSent: (values: ContactValues) => void;
};

export function ContactForm({ onSent }: ContactFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInput, unknown, ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: CONTACT_DEFAULTS,
  });
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <>
      <StoreCardTitle>Send us a message</StoreCardTitle>
      <form noValidate onSubmit={handleSubmit(onSent)} className="flex flex-col gap-3.5">
        <FormRow>
          <FormField label="Your name" required>
            <TextInput autoComplete="name" {...register("name")} />
          </FormField>
          <FormField label="Mobile number" required>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  type="tel"
                  inputMode="numeric"
                  autoComplete="tel-national"
                  placeholder="01XXXXXXXXX"
                  onChange={(event) => field.onChange(digitsOnly(event.target.value))}
                />
              )}
            />
          </FormField>
        </FormRow>
        <FormField label="Topic">
          <Controller
            name="topic"
            control={control}
            render={({ field }) => (
              <SelectMenu options={CONTACT_TOPIC_OPTIONS} value={field.value} onChange={field.onChange} name={field.name} />
            )}
          />
        </FormField>
        <FormField label="Order number" optional>
          <TextInput placeholder="CF-XXXXXX" {...register("orderNumber")} />
        </FormField>
        <FormField label="Message" required>
          <TextArea rows={4} {...register("message")} />
        </FormField>
        {hasErrors && <ContactFormError message={CONTACT_FORM_ERROR} />}
        <StoreButton type="submit" className="self-start">
          <Icon name="send" size={16} strokeWidth={1.8} />
          Send message
        </StoreButton>
      </form>
    </>
  );
}
