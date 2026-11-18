export function AuthDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 px-10">
      <span className="h-px flex-1 bg-border" />
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}
