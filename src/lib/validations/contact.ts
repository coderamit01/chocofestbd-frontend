import * as z from "zod";
import { CONTACT_TOPICS } from "@/config/store-contact";

export const CONTACT_FORM_ERROR = "Please add your name, an 11-digit number and a message.";

export const contactSchema = z.object({
  name: z.string().trim().min(1),
  phone: z.string().regex(/^01\d{9}$/),
  topic: z.enum(CONTACT_TOPICS),
  orderNumber: z.string().trim(),
  message: z.string().trim().min(1),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactValues = z.output<typeof contactSchema>;

export const CONTACT_DEFAULTS: ContactInput = {
  name: "",
  phone: "",
  topic: "An existing order",
  orderNumber: "",
  message: "",
};

export const digitsOnly = (value: string, max = 11) => value.replace(/\D/g, "").slice(0, max);
