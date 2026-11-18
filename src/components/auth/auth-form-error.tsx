export function AuthFormError({ message }: { message: string | null }) {
  if (!message) return null;

  return (
    <p role="alert" className="mt-4 text-sm text-destructive">
      {message}
    </p>
  );
}
