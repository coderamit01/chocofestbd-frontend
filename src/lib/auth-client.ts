import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  plugins: [
    inferAdditionalFields({
      user: {
        role: { type: "string", required: false, input: false },
        phone: { type: "string", required: false },
        isBanned: { type: "boolean", required: false, input: false },
        points: { type: "number", required: false, input: false },
      },
    }),
  ],
});
