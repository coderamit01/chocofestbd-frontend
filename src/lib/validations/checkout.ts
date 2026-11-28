import * as z from "zod";

export const CHECKOUT_FIELD_LABELS = {
  phone: "Mobile number",
  name: "Full name",
  district: "District",
  area: "Area",
  addr: "Address",
  email: "Email",
} as const;

export type CheckoutRequiredField = keyof typeof CHECKOUT_FIELD_LABELS;

export const checkoutSchema = z.object({
  phone: z.string().regex(/^01[3-9]\d{8}$/, {
    error: "Enter an 11-digit number like 01712345678",
  }),
  name: z.string().refine((value) => value.trim().length >= 3, {
    error: "Enter your full name",
  }),
  district: z.string().min(1, { error: "Choose your district" }),
  area: z.string().min(1, { error: "Choose your area" }),
  addr: z.string().refine((value) => value.trim().length >= 8, {
    error: "Add house & road so the rider can find you",
  }),
  email: z.string().refine((value) => !value || /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value), {
    error: "Enter a valid email or leave it empty",
  }),
  note: z.string(),
});

export type CheckoutValues = z.infer<typeof checkoutSchema>;

export const isValidPhone = (phone: string) => checkoutSchema.shape.phone.safeParse(phone).success;
