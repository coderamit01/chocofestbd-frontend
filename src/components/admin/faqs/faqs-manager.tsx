"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteFaqAction, reorderFaqsAction, setFaqActiveAction } from "@/actions/faq.actions";
import { DangerDialog } from "@/components/shared/danger-dialog";
import { EmptyState } from "@/components/shared/empty-state";
import { Icon } from "@/components/shared/icon";
import { SearchInput } from "@/components/shared/search-input";
import { ToggleSwitch } from "@/components/shared/toggle-switch";
import { Button, buttonVariants } from "@/components/ui/button";
import { FAQ_PUBLIC_PATH } from "@/config/faqs";
import { hasBengali } from "@/lib/bengali";
import { moveInSortOrder, nextSortOrder } from "@/lib/sort-order";
import { cn } from "@/lib/utils";
import type { Faq } from "@/types/faq";
import { FaqFormDialog, type FaqDialogState } from "./faq-form-dialog";

const squareButton = buttonVariants({ variant: "square", size: "icon-md" });
const moveButton = cn(buttonVariants({ variant: "ghost", size: "icon-sm" }), "h-6.5 w-7");

type FaqsManagerProps = {
  faqs: Faq[];
  canDelete: boolean;
};

export function FaqsManager({ faqs, canDelete }: FaqsManagerProps) {
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);
  const [dialog, setDialog] = useState<FaqDialogState>(null);
  const [toDelete, setToDelete] = useState<Faq | null>(null);
  const [isSaving, startSaving] = useTransition();

  const term = search.trim().toLowerCase();
  const rows = faqs
    .map((faq, index) => ({ faq, index }))
    .filter(({ faq }) => !term || `${faq.question}${faq.answer}`.toLowerCase().includes(term));

  const move = (index: number, direction: -1 | 1) => {
    const changes = moveInSortOrder(faqs, index, direction);
    if (!changes.length) return;
    startSaving(async () => {
      const result = await reorderFaqsAction(changes);
      if (!result.success) toast.error("Couldn’t reorder FAQs", { description: result.message });
    });
  };

  const toggleActive = (faq: Faq, isActive: boolean) =>
    startSaving(async () => {
      const result = await setFaqActiveAction(faq.id, isActive);
      if (!result.success) toast.error("Couldn’t update FAQ", { description: result.message });
    });

  const confirmDelete = () => {
    if (!toDelete) return;
    const faq = toDelete;
    startSaving(async () => {
      const result = await deleteFaqAction(faq.id);
      if (result.success) {
        toast.error("FAQ deleted");
        setToDelete(null);
      } else {
        toast.error("Couldn’t delete FAQ", { description: result.message });
      }
    });
  };

  return (
    <section className="flex flex-col gap-5 rounded-xl bg-card px-6 py-5.5 max-[900px]:p-4.5">
      <div className="flex flex-wrap items-center gap-3">
        <SearchInput label="Search questions" wrapperClassName="flex-[0_1_300px]" value={search} onChange={(event) => setSearch(event.target.value)} />
        <span className="flex-1" />
        <span className="text-[12.5px] text-ink-3">
          {faqs.length} FAQs · shown on {FAQ_PUBLIC_PATH} in this order
        </span>
        <Button onClick={() => setDialog({ mode: "new", nextSortOrder: nextSortOrder(faqs) })}>
          <Icon name="plus" size={18} strokeWidth={1.8} />
          Add FAQ
        </Button>
      </div>

      {rows.length > 0 && (
        <div className={cn("flex flex-col gap-2.5", isSaving && "opacity-80")}>
          {rows.map(({ faq, index }) => {
            const isOpen = openId === faq.id;

            return (
              <div key={faq.id} className="rounded-[14px] bg-surface-2">
                <div className="flex items-center gap-2.5 px-4 py-3.5">
                  <span className="flex flex-col gap-0.5">
                    <button type="button" aria-label="Move up" disabled={index === 0 || isSaving} onClick={() => move(index, -1)} className={moveButton}>
                      <Icon name="chevronUp" size={15} strokeWidth={1.8} className="size-[15px]" />
                    </button>
                    <button
                      type="button"
                      aria-label="Move down"
                      disabled={index === faqs.length - 1 || isSaving}
                      onClick={() => move(index, 1)}
                      className={moveButton}
                    >
                      <Icon name="chevronDown" size={15} strokeWidth={1.8} className="size-[15px]" />
                    </button>
                  </span>
                  <span className="w-5.5 font-semibold text-ink-3 tabular-nums">{index + 1}</span>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenId(isOpen ? null : faq.id)}
                    className="flex min-w-0 flex-1 cursor-pointer flex-col gap-1 text-left outline-none focus-visible:shadow-focus"
                  >
                    <span className={cn("font-heading text-[15px] leading-[1.4] font-semibold text-ink", hasBengali(faq.question) && "font-bengali")}>{faq.question}</span>
                    <span className="truncate text-[12.5px] text-ink-3">{faq.answer.replace(/\n/g, " ")}</span>
                  </button>
                  <ToggleSwitch ariaLabel="Active" checked={faq.isActive} disabled={isSaving} onChange={(isActive) => toggleActive(faq, isActive)} />
                  <button type="button" aria-label="Edit" onClick={() => setDialog({ mode: "edit", faq })} className={squareButton}>
                    <Icon name="edit" size={16} strokeWidth={1.8} className="size-4" />
                  </button>
                  {canDelete && (
                    <button type="button" aria-label="Delete" onClick={() => setToDelete(faq)} className={squareButton}>
                      <Icon name="trash" size={16} strokeWidth={1.8} className="size-4" />
                    </button>
                  )}
                </div>
                {isOpen && (
                  <p
                    className={cn(
                      "pr-5 pb-4.5 pl-28 leading-[1.65] whitespace-pre-line text-ink max-[900px]:pl-4",
                      hasBengali(faq.answer) && "font-bengali"
                    )}
                  >
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {rows.length === 0 &&
        (faqs.length ? (
          <EmptyState title="No FAQs match" description="Try another search." />
        ) : (
          <EmptyState title="No FAQs yet" description="Add the questions customers ask most." />
        ))}

      <FaqFormDialog state={dialog} onClose={() => setDialog(null)} />

      <DangerDialog
        open={!!toDelete}
        title="Delete this FAQ?"
        description="It disappears from the FAQ page immediately."
        confirmLabel="Delete"
        pendingLabel="Deleting…"
        isPending={isSaving}
        onOpenChange={(open) => !open && setToDelete(null)}
        onConfirm={confirmDelete}
      />
    </section>
  );
}
