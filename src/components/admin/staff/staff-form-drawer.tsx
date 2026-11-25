"use client";

import { useTransition } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { updateStaffAction } from "@/actions/user.actions";
import { Icon } from "@/components/shared/icon";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { INVITE_ROLE_OPTIONS, type InvitableRole } from "@/config/staff";
import { STATUS_BADGES } from "@/config/status-badges";
import { cn } from "@/lib/utils";
import { getPasswordScore, staffFormSchema, type StaffFormValues } from "@/lib/validations/staff";
import { formStyles } from "@/lib/form-styles";
import type { User } from "@/types/user";

export type StaffDrawerState = { mode: "invite" } | { mode: "edit"; user: User } | null;

type StaffFormDrawerProps = {
  state: StaffDrawerState;
  onClose: () => void;
};

const inputClassName = formStyles.input;

const inputGroupClassName = formStyles.inputGroup;

const groupInputClassName = formStyles.groupInput;

const STRENGTH = [
  { label: "Weak", color: "bg-[#e5533f]" },
  { label: "Weak", color: "bg-[#e5533f]" },
  { label: "Weak", color: "bg-[#e5533f]" },
  { label: "Fair", color: "bg-[#f0a500]" },
  { label: "Strong", color: "bg-[#22a55a]" },
  { label: "Strong", color: "bg-[#22a55a]" },
];

const generatePassword = () => {
  const chunk = () => Math.random().toString(36).slice(2, 6);
  return `Cf-${chunk()}${chunk().toUpperCase()}!9`;
};

export function StaffFormDrawer({ state, onClose }: StaffFormDrawerProps) {
  const formKey = state ? (state.mode === "edit" ? state.user.id : "invite") : "closed";

  return (
    <Sheet open={!!state} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        side="right"
        showCloseButton={false}
        overlayClassName="bg-[rgb(34_21_16/38%)] supports-backdrop-filter:backdrop-blur-none"
        className="w-full gap-0 border-l-0 bg-surface p-0 shadow-modal data-[side=right]:w-full data-[side=right]:sm:max-w-[560px]"
      >
        {state && <StaffForm key={formKey} state={state} onClose={onClose} />}
      </SheetContent>
    </Sheet>
  );
}

function StaffForm({ state, onClose }: { state: NonNullable<StaffDrawerState>; onClose: () => void }) {
  const [isPending, startTransition] = useTransition();
  const isEdit = state.mode === "edit";
  const user = isEdit ? state.user : null;

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<StaffFormValues>({
    resolver: zodResolver(staffFormSchema),
    defaultValues: {
      mode: state.mode,
      name: user?.name ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      role: user && user.role !== "SUPER_ADMIN" && user.role !== "CUSTOMER" ? user.role : "ORDER_HANDLER",
      password: "",
    },
  });

  const role = useWatch({ control, name: "role" });
  const password = useWatch({ control, name: "password" });
  const score = getPasswordScore(password);
  const strength = STRENGTH[score];

  const onSubmit = handleSubmit((values) => {
    const roleLabel = STATUS_BADGES.role[values.role].label;

    if (!user) {
      toast.error("Invites aren’t available yet", {
        description: "The server doesn’t have a staff invite endpoint yet.",
      });
      return;
    }

    startTransition(async () => {
      const result = await updateStaffAction(user.id, {
        name: values.name,
        phone: values.phone,
        role: values.role,
      });
      if (!result.success) {
        toast.error("Couldn’t save changes", { description: result.message });
        return;
      }
      toast.success("Staff updated", { description: `${values.name} · ${roleLabel}` });
      onClose();
    });
  });

  return (
    <form noValidate onSubmit={onSubmit} className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-3 px-7 pt-[26px] pb-[18px]">
        <div>
          <SheetTitle className="font-heading text-xl leading-[1.3] font-semibold text-ink">
            {isEdit ? "Edit staff member" : "Invite staff member"}
          </SheetTitle>
          <SheetDescription className="mt-1.5 text-caption text-ink-3">
            They get an email with a link to sign in.
          </SheetDescription>
        </div>
        <SheetClose render={<Button variant="ghost" size="icon-sm" aria-label="Close" />}>
          <Icon name="close" size={18} strokeWidth={1.8} />
        </SheetClose>
      </div>

      <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-7 pt-1 pb-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="staff-name" className="text-label text-ink">
            Full name<span className="ml-0.5 text-danger">*</span>
          </label>
          <input
            id="staff-name"
            autoComplete="off"
            aria-invalid={!!errors.name}
            className={inputClassName}
            {...register("name")}
          />
          {errors.name && <span className="text-caption text-danger">{errors.name.message}</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="staff-email" className="text-label text-ink">
            Email<span className="ml-0.5 text-danger">*</span>
          </label>
          <input
            id="staff-email"
            type="email"
            autoComplete="off"
            disabled={isEdit}
            aria-invalid={!!errors.email}
            className={inputClassName}
            {...register("email")}
          />
          {errors.email && <span className="text-caption text-danger">{errors.email.message}</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="staff-phone" className="text-label text-ink">
            Phone
          </label>
          <div className={inputGroupClassName}>
            <span className="flex items-center px-3 text-[13.5px] whitespace-nowrap text-ink-3">+88</span>
            <input
              id="staff-phone"
              inputMode="numeric"
              placeholder="01XXXXXXXXX"
              aria-invalid={!!errors.phone}
              className={cn(groupInputClassName, "pl-0")}
              {...register("phone", {
                onChange: (event) =>
                  setValue("phone", event.target.value.replace(/\D/g, "").slice(0, 11), { shouldValidate: !!errors.phone }),
              })}
            />
          </div>
          {errors.phone && <span className="text-caption text-danger">{errors.phone.message}</span>}
        </div>

        <fieldset className="flex flex-col gap-2">
          <legend className="mb-2 text-label text-ink">
            Role<span className="ml-0.5 text-danger">*</span>
          </legend>
          <div role="radiogroup" aria-label="Role" className="flex flex-col gap-2">
            {INVITE_ROLE_OPTIONS.map((option) => {
              const isSelected = role === option.value;

              return (
                <label
                  key={option.value}
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-xl px-3.5 py-3",
                    isSelected ? "bg-brand-50 shadow-[inset_0_0_0_1.5px_var(--brand)]" : "bg-surface-2"
                  )}
                >
                  <input
                    type="radio"
                    value={option.value}
                    className="mt-0.5 size-[18px] accent-brand"
                    {...register("role", { setValueAs: (value: string) => value as InvitableRole })}
                  />
                  <span className="flex flex-col gap-1">
                    <span className="font-medium text-ink">{option.label}</span>
                    <span className="text-xs text-ink-3">{option.description}</span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {!isEdit && (
          <div className="flex flex-col gap-2">
            <label htmlFor="staff-password" className="text-label text-ink">
              Temporary password<span className="ml-0.5 text-danger">*</span>
            </label>
            <div className={inputGroupClassName}>
              <input
                id="staff-password"
                type="text"
                autoComplete="off"
                aria-invalid={!!errors.password}
                className={cn(groupInputClassName, "font-mono")}
                {...register("password")}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="m-1 h-auto"
                onClick={() => setValue("password", generatePassword(), { shouldValidate: !!errors.password })}
              >
                Generate
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-3">
                <div
                  className={cn("h-full rounded-full transition-[width]", strength.color)}
                  style={{ width: `${(score / 5) * 100}%` }}
                />
              </div>
              <span className="w-[54px] text-xs text-ink-3">{password ? strength.label : ""}</span>
            </div>
            {errors.password ? (
              <span className="text-caption text-danger">{errors.password.message}</span>
            ) : (
              <span className="text-caption text-ink-3">They must change it on first sign-in.</span>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2.5 border-t border-line px-7 py-[18px]">
        <SheetClose render={<Button type="button" variant="soft" />}>Cancel</SheetClose>
        <Button type="submit" disabled={isPending} aria-busy={isPending}>
          {isPending && <span className="size-[15px] animate-spin rounded-full border-2 border-current border-r-transparent" />}
          {isEdit ? "Save changes" : "Send invite"}
        </Button>
      </div>
    </form>
  );
}
