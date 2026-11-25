import { Button } from "@/components/ui/button";

type UnsavedChangesBarProps = {
  isSaving: boolean;
  onDiscard: () => void;
  onSave: () => void;
};

export function UnsavedChangesBar({ isSaving, onDiscard, onSave }: UnsavedChangesBarProps) {
  return (
    <div
      role="region"
      aria-label="Unsaved changes"
      className="fixed bottom-6 left-1/2 z-45 flex w-[calc(100%-32px)] max-w-160 -translate-x-1/2 animate-pop flex-wrap items-center gap-3 rounded-2xl bg-ink py-2.5 pr-2.5 pl-5 text-white shadow-[0_24px_48px_-12px_rgb(34_21_16/40%)]"
    >
      <span className="size-2 rounded-full bg-brand" />
      <span className="min-w-0 flex-1">You have unsaved changes</span>
      <Button size="sm" variant="ghost" onClick={onDiscard} disabled={isSaving} className="text-[#e8d6cc] hover:bg-white/10 hover:text-white">
        Discard
      </Button>
      <Button size="sm" onClick={onSave} aria-busy={isSaving || undefined}>
        {isSaving ? "Saving…" : "Save changes"}
      </Button>
    </div>
  );
}
