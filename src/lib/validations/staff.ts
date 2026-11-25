import * as z from "zod";

export const PHONE_PATTERN = /^01[3-9]\d{8}$/;

export const getPasswordScore = (password: string) =>
  [
    password.length >= 8,
    /[A-Z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9]/.test(password),
    password.length >= 12,
  ].filter(Boolean).length;

export const MIN_PASSWORD_SCORE = 3;

export const staffFormSchema = z
  .object({
    mode: z.enum(["invite", "edit"]),
    name: z.string().trim().min(1, { error: "Name is required." }),
    email: z.email({ error: "Enter a valid email." }),
    phone: z.string().refine((value) => !value || PHONE_PATTERN.test(value), {
      error: "11 digits starting 013–019.",
    }),
    role: z.enum(["ADMIN", "MANAGER", "ORDER_HANDLER", "RIDER"]),
    password: z.string(),
  })
  .refine((data) => data.mode === "edit" || getPasswordScore(data.password) >= MIN_PASSWORD_SCORE, {
    path: ["password"],
    error: "Use 8+ characters with a mix of capitals, numbers or symbols.",
  });

export type StaffFormValues = z.infer<typeof staffFormSchema>;
