import * as z from "zod";
import { PASSWORD_RULES } from "@/config/auth";

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, { error: "Enter your email address." })
  .pipe(z.email({ error: "Enter a valid email address." }));

export const signUpSchema = z.object({
  name: z.string().trim().min(2, { error: "Enter your full name." }),
  email: emailSchema,
  phone: z
    .string()
    .trim()
    .regex(/^01[3-9]\d{8}$/, { error: "11 digits starting 013–019." })
    .transform((value) => `+88${value}`),
  password: z
    .string()
    .max(128, { error: "Password must be at most 128 characters." })
    .refine((value) => PASSWORD_RULES.every((rule) => rule(value)), {
      error: "Use 8+ characters with a number, a capital and a symbol.",
    }),
  terms: z.boolean().refine(Boolean, { error: "Please accept to continue." }),
});

export type SignUpInput = z.input<typeof signUpSchema>;
export type SignUpValues = z.output<typeof signUpSchema>;

export const signInSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(1, { error: "Enter your password." })
    .max(128, { error: "Password must be at most 128 characters." }),
  rememberMe: z.boolean(),
});

export type SignInInput = z.input<typeof signInSchema>;
export type SignInValues = z.output<typeof signInSchema>;
