"use client";

import { useState } from "react";
import { StoreCard } from "@/components/store/ui/store-card";
import type { ContactValues } from "@/lib/validations/contact";
import { ContactForm } from "./contact-form";
import { ContactSuccess } from "./contact-success";

export function ContactMessageCard() {
  const [sent, setSent] = useState<ContactValues | null>(null);

  return (
    <StoreCard as="section" aria-label="Send us a message">
      {sent ? (
        <ContactSuccess name={sent.name} phone={sent.phone} onReset={() => setSent(null)} />
      ) : (
        <ContactForm onSent={setSent} />
      )}
    </StoreCard>
  );
}
