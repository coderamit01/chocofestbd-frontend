import * as z from "zod";

export const signUpSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { error: "Full name is required" })
    .min(2, { error: "Name must be at least 2 characters" }),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, { error: "Email is required" })
    .pipe(z.email({ error: "Enter a valid email address" })),
  password: z
    .string()
    .min(1, { error: "Password is required" })
    .min(8, { error: "Password must be at least 8 characters" })
    .max(128, { error: "Password must be at most 128 characters" }),
  address: z.string().trim().optional(),
});

export type SignUpInput = z.input<typeof signUpSchema>;
export type SignUpValues = z.output<typeof signUpSchema>;
