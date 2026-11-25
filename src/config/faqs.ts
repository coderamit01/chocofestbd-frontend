import type { UserRole } from "@/types/auth";

export const FAQ_ROLES: UserRole[] = ["SUPER_ADMIN", "ADMIN", "MANAGER"];

export const FAQ_DELETE_ROLES: UserRole[] = ["SUPER_ADMIN", "ADMIN"];

export const FAQ_LIST_LIMIT = 100;

export const FAQ_PUBLIC_PATH = "chocofestbd.com/faq";

export const FAQ_ANSWER_TOOLS = [
  { label: "Bold", glyph: "B", insert: " **bold**" },
  { label: "Italic", glyph: "I", insert: " _italic_" },
  { label: "List", glyph: "•", insert: "\n- " },
  { label: "Link", glyph: "Link", insert: " [text](https://)" },
];
