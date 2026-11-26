export function AuthDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="h-px flex-1 bg-line" />
      <span className="text-xs text-ink-3">{label}</span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}
