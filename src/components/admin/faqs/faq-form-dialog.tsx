"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { saveFaqAction } from "@/actions/faq.actions";
import { FormDialog } from "@/components/shared/form-dialog";
import { ToggleSwitch } from "@/components/shared/toggle-switch";
import { Button } from "@/components/ui/button";
import { FAQ_ANSWER_TOOLS } from "@/config/faqs";
import { hasBengali } from "@/lib/bengali";
import { formStyles } from "@/lib/form-styles";
import { cn } from "@/lib/utils";
import type { Faq, FaqFormValues } from "@/types/faq";

export type FaqDialogState = { mode: "new"; nextSortOrder: number } | { mode: "edit"; faq: Faq } | null;

const toValues = (state: NonNullable<FaqDialogState>): FaqFormValues =>
  state.mode === "edit"
    ? { question: state.faq.question, answer: state.faq.answer, isActive: state.faq.isActive }
    : { question: "", answer: "", isActive: true };

export function FaqFormDialog({ state, onClose }: { state: FaqDialogState; onClose: () => void }) {
  return state ? <FaqForm key={state.mode === "edit" ? state.faq.id : "new"} state={state} onClose={onClose} /> : null;
}

function FaqForm({ state, onClose }: { state: NonNullable<FaqDialogState>; onClose: () => void }) {
  const faqId = state.mode === "edit" ? state.faq.id : null;
  const [values, setValues] = useState<FaqFormValues>(() => toValues(state));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, startSaving] = useTransition();

  const set = (patch: Partial<FaqFormValues>) => {
    setValues((current) => ({ ...current, ...patch }));
    setErrors((current) => {
      const next = { ...current };
      Object.keys(patch).forEach((key) => delete next[key]);
      return next;
    });
  };

  const save = () => {
    const question = values.question.trim();
    const answer = values.answer.trim();
    const problems: Record<string, string> = {};
    if (!question) problems.question = "Question is required.";
    if (!answer) problems.answer = "Answer is required.";
    if (Object.keys(problems).length) {
      setErrors(problems);
      return;
    }

    startSaving(async () => {
      const result = await saveFaqAction(faqId, {
        question,
        answer,
        isActive: values.isActive,
        ...(state.mode === "new" && { sortOrder: state.nextSortOrder }),
      });

      if (result.success) {
        toast.success("FAQ saved", { description: question });
        onClose();
        return;
      }

      const fieldErrors = result.fieldErrors ?? [];
      if (fieldErrors.length) setErrors(Object.fromEntries(fieldErrors.map((item) => [item.field, item.message])));
      else toast.error("Couldn’t save FAQ", { description: result.message });
    });
  };

  return (
    <FormDialog
      open
      onOpenChange={(open) => !open && !isSaving && onClose()}
      title={faqId ? "Edit FAQ" : "New FAQ"}
      description="Bangla and English both work."
      className="sm:max-w-150"
      footer={
        <>
          <Button variant="soft" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button onClick={save} aria-busy={isSaving || undefined}>
            {isSaving ? "Saving…" : "Save FAQ"}
          </Button>
        </>
      }
    >
      <div className={formStyles.field}>
        <label htmlFor="fq" className={formStyles.label}>
          Question<span className={formStyles.required}>*</span>
        </label>
        <input
          id="fq"
          value={values.question}
          aria-invalid={!!errors.question || undefined}
          onChange={(event) => set({ question: event.target.value })}
          className={cn(formStyles.input, hasBengali(values.question) && "font-bengali")}
        />
        {errors.question && <span className={formStyles.error}>{errors.question}</span>}
      </div>

      <div className={formStyles.field}>
        <span id="fal" className={formStyles.label}>
          Answer<span className={formStyles.required}>*</span>
        </span>
        <div
          className={cn(
            "overflow-hidden rounded-[12px] border border-input bg-surface-2 transition-[border-color,box-shadow] focus-within:border-brand focus-within:shadow-focus",
            errors.answer && "border-danger"
          )}
        >
          <div role="toolbar" aria-labelledby="fal" className="flex items-center gap-1 border-b border-input bg-surface p-1.5">
            {FAQ_ANSWER_TOOLS.map((tool) => (
              <Button
                key={tool.label}
                variant="ghost"
                size="sm"
                aria-label={tool.label}
                className="font-semibold"
                onClick={() => set({ answer: values.answer + tool.insert })}
              >
                {tool.glyph}
              </Button>
            ))}
          </div>
          <textarea
            aria-labelledby="fal"
            value={values.answer}
            aria-invalid={!!errors.answer || undefined}
            onChange={(event) => set({ answer: event.target.value })}
            className={cn(
              formStyles.textarea,
              "min-h-35 rounded-none border-0 focus:shadow-none aria-invalid:bg-transparent",
              hasBengali(values.answer) && "font-bengali"
            )}
          />
        </div>
        {errors.answer && <span className={formStyles.error}>{errors.answer}</span>}
      </div>

      <ToggleSwitch checked={values.isActive} onChange={(isActive) => set({ isActive })} label={<span className="order-last">Show on website</span>} />
    </FormDialog>
  );
}
