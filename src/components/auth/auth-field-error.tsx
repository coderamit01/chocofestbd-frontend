import { formStyles } from "@/lib/form-styles";

export function AuthFieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;

  return (
    <span id={id} role="alert" className={formStyles.error}>
      {message}
    </span>
  );
}
