import { Icon } from "@/components/shared/icon";

export function LoadError({ title, message }: { title: string; message: string }) {
  return (
    <section className="flex flex-col items-center gap-3 rounded-xl bg-card px-6 py-16 text-center">
      <span className="flex size-12 items-center justify-center rounded-xl bg-danger-soft text-danger">
        <Icon name="ban" size={22} strokeWidth={1.8} />
      </span>
      <p className="font-medium text-ink">{title}</p>
      <p className="max-w-sm text-caption text-ink-3">{message}</p>
    </section>
  );
}
