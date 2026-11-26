"use client";

import { useState } from "react";
import { SegmentedControl } from "@/components/shared/segmented-control";
import { ToggleSwitch } from "@/components/shared/toggle-switch";
import { Badge, type BadgeVariant } from "@/components/ui/badge";
import { CHECKOUT_METHOD_STYLES, WALLETS, WALLET_TYPE_HINTS, type WalletKey } from "@/config/settings";
import { hasBengali } from "@/lib/bengali";
import { formStyles } from "@/lib/form-styles";
import { walletNeedsNumber, walletNumberInvalid } from "@/lib/settings";
import { cn, formatPhone } from "@/lib/utils";
import type { MobileWallet, PaymentSettings, WalletAccountType } from "@/types/setting";
import {
  SettingsEyebrow,
  SettingsField,
  SettingsMethodHeader,
  SettingsMonogram,
  SettingsPanel,
  SettingsSectionHeader,
  SettingsTile,
} from "./settings-field";
import type { SectionProps } from "./settings-types";

const whiteInput = cn(formStyles.input, "bg-surface");
const whiteTextarea = cn(formStyles.textarea, "bg-surface");
const fieldsGrid = "grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-4";

const ACCOUNT_TYPES: { value: WalletAccountType; label: string }[] = [
  { value: "MERCHANT", label: "Merchant" },
  { value: "PERSONAL", label: "Personal" },
];

const typeLabel = (type: WalletAccountType) => (type === "MERCHANT" ? "Merchant" : "Personal");

const walletStatus = (wallet: MobileWallet): { label: string; variant: BadgeVariant } => {
  if (!wallet.enabled) return { label: "Off", variant: "neutral" };
  if (walletNeedsNumber(wallet)) return { label: "Needs number", variant: "warning" };
  return { label: "Live", variant: "success" };
};

type CheckoutMethod = { key: string; name: string; short: string; color: string; note: string; instructions: string };

const checkoutMethods = (value: PaymentSettings): CheckoutMethod[] => [
  ...(value.cod.enabled ? [{ key: "cod", ...CHECKOUT_METHOD_STYLES.cod, note: "Pay when it arrives", instructions: value.cod.instructions }] : []),
  ...WALLETS.filter(({ key }) => value[key].enabled).map(({ key, name, short, color }) => ({
    key,
    name,
    short,
    color,
    note: `${typeLabel(value[key].accountType)} · ${value[key].accountNumber ? formatPhone(value[key].accountNumber) : "number missing"}`,
    instructions: value[key].instructions,
  })),
  ...(value.bankTransfer.enabled
    ? [{ key: "bankTransfer", ...CHECKOUT_METHOD_STYLES.bankTransfer, note: value.bankTransfer.bankName, instructions: value.bankTransfer.instructions }]
    : []),
];

export function PaymentSection({ value, onChange, errorFor }: SectionProps<"payment">) {
  const [previewKey, setPreviewKey] = useState<string>("bkash");
  const setWallet = (key: WalletKey, patch: Partial<MobileWallet>) => onChange({ [key]: { ...value[key], ...patch } });
  const setBank = (patch: Partial<PaymentSettings["bankTransfer"]>) => onChange({ bankTransfer: { ...value.bankTransfer, ...patch } });
  const bank = value.bankTransfer;
  const methods = checkoutMethods(value);
  const selected = methods.find((method) => method.key === previewKey) ?? methods[0];

  const bankInput = (key: keyof PaymentSettings["bankTransfer"], id: string, label: string, placeholder?: string, numeric?: boolean) => (
    <SettingsField label={label} htmlFor={id} error={errorFor(`payment.bankTransfer.${key}`)}>
      <input
        id={id}
        placeholder={placeholder}
        inputMode={numeric ? "numeric" : undefined}
        value={String(bank[key])}
        aria-invalid={!!errorFor(`payment.bankTransfer.${key}`) || undefined}
        onChange={(event) => setBank({ [key]: event.target.value })}
        className={numeric ? cn(whiteInput, "tabular-nums") : whiteInput}
      />
    </SettingsField>
  );

  return (
    <div className="flex flex-col gap-6">
      <SettingsSectionHeader title="Payment methods" description="What customers can pay with at checkout, and the details they see." />
      {errorFor("payment") && <p className={formStyles.error}>{errorFor("payment")}</p>}

      <div className="flex flex-wrap items-center gap-2 rounded-[14px] bg-brand-50 px-4 py-3.5">
        <span className="text-[12.5px] font-medium text-brand-text">Live at checkout:</span>
        {methods.map((method) => (
          <Badge key={method.key} size="sm" variant="outline" className="border-transparent text-ink">
            {method.name}
          </Badge>
        ))}
      </div>

      <SettingsEyebrow>Mobile wallets</SettingsEyebrow>
      {WALLETS.map(({ key, name, short, color }) => {
        const wallet = value[key];
        const status = walletStatus(wallet);
        const invalid = walletNumberInvalid(wallet);
        const numberError = invalid ? "11 digits starting 013–019." : errorFor(`payment.${key}.accountNumber`);
        const subtitle = wallet.enabled
          ? `${typeLabel(wallet.accountType)} account${wallet.accountNumber ? ` · ${formatPhone(wallet.accountNumber)}` : ""}`
          : "Not offered at checkout";

        return (
          <SettingsPanel key={key}>
            <SettingsMethodHeader badge={<SettingsMonogram label={short} color={color} />} title={name} subtitle={subtitle}>
              <Badge size="sm" variant={status.variant}>
                {status.label}
              </Badge>
              <ToggleSwitch ariaLabel={`Enable ${name}`} checked={wallet.enabled} onChange={(enabled) => setWallet(key, { enabled })} />
            </SettingsMethodHeader>

            {wallet.enabled && (
              <div className={fieldsGrid}>
                <SettingsField label="Account type" hint={WALLET_TYPE_HINTS[wallet.accountType]}>
                  <SegmentedControl
                    ariaLabel={`${name} account type`}
                    options={ACCOUNT_TYPES}
                    value={wallet.accountType}
                    onChange={(accountType) => setWallet(key, { accountType })}
                    className="bg-surface"
                  />
                </SettingsField>
                <SettingsField label="Account number" htmlFor={`${key}n`} required error={numberError}>
                  <input
                    id={`${key}n`}
                    inputMode="numeric"
                    placeholder="01XXXXXXXXX"
                    value={wallet.accountNumber}
                    aria-invalid={!!numberError || undefined}
                    onChange={(event) => setWallet(key, { accountNumber: event.target.value.replace(/\D/g, "").slice(0, 11) })}
                    className={whiteInput}
                  />
                </SettingsField>
                <SettingsField label="Instructions shown at checkout" htmlFor={`${key}i`} className="col-span-full">
                  <textarea
                    id={`${key}i`}
                    value={wallet.instructions}
                    onChange={(event) => setWallet(key, { instructions: event.target.value })}
                    className={cn(whiteTextarea, "min-h-19 font-bengali")}
                  />
                </SettingsField>
              </div>
            )}
          </SettingsPanel>
        );
      })}

      <SettingsEyebrow>Cards &amp; online banking</SettingsEyebrow>
      <SettingsPanel>
        <SettingsMethodHeader
          badge={<SettingsTile icon="bank" tone="gray" />}
          title="Bank transfer"
          subtitle="Customer types the transfer reference at checkout"
        >
          <ToggleSwitch ariaLabel="Enable bank transfer" checked={bank.enabled} onChange={(enabled) => setBank({ enabled })} />
        </SettingsMethodHeader>
        {errorFor("payment.bankTransfer.enabled") && <p className={formStyles.error}>{errorFor("payment.bankTransfer.enabled")}</p>}

        {bank.enabled && (
          <div className={fieldsGrid}>
            {bankInput("bankName", "b1", "Bank name")}
            {bankInput("accountName", "b2", "Account name")}
            {bankInput("accountNumber", "b3", "Account number", "[ACCOUNT NUMBER]", true)}
            {bankInput("branch", "b4", "Branch")}
            {bankInput("routingNumber", "b5", "Routing number", "[ROUTING NUMBER]", true)}
            <SettingsField label="Instructions" htmlFor="b6" className="col-span-full">
              <textarea
                id="b6"
                value={bank.instructions}
                onChange={(event) => setBank({ instructions: event.target.value })}
                className={cn(whiteTextarea, "min-h-18")}
              />
            </SettingsField>
          </div>
        )}
      </SettingsPanel>

      <SettingsEyebrow>Cash</SettingsEyebrow>
      <SettingsPanel>
        <SettingsMethodHeader badge={<SettingsTile icon="cash" tone="mint" />} title="Cash on delivery" subtitle="Rider collects cash at the door">
          <ToggleSwitch
            ariaLabel="Enable cash on delivery"
            checked={value.cod.enabled}
            onChange={(enabled) => onChange({ cod: { ...value.cod, enabled } })}
          />
        </SettingsMethodHeader>
      </SettingsPanel>

      <div className="flex flex-col gap-3 rounded-xl border-[1.5px] border-dashed border-line-2 p-[22px]">
        <SettingsEyebrow>Checkout preview</SettingsEyebrow>
        <div className="flex flex-col gap-2">
          {methods.map((method) => {
            const isOn = selected?.key === method.key;

            return (
              <button
                key={method.key}
                type="button"
                onClick={() => setPreviewKey(method.key)}
                className={cn(
                  "flex w-full cursor-pointer items-center gap-3 rounded-[12px] px-3.5 py-3 text-left",
                  isOn ? "bg-brand-50 shadow-[inset_0_0_0_1.5px_var(--brand)]" : "bg-surface-2"
                )}
              >
                <span
                  className={cn(
                    "size-4.5 flex-none rounded-full border-2 shadow-[inset_0_0_0_3px_var(--surface)]",
                    isOn ? "border-brand bg-brand" : "border-[#d8cec6] bg-surface"
                  )}
                />
                <SettingsMonogram label={method.short} color={method.color} size="sm" />
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="font-medium text-ink">{method.name}</span>
                  <span className="text-xs text-ink-3">{method.note}</span>
                </span>
              </button>
            );
          })}
        </div>
        {selected?.instructions && (
          <p className={cn("rounded-[12px] bg-brand-50 p-3.5 text-sm leading-[1.6] text-ink", hasBengali(selected.instructions) && "font-bengali")}>
            {selected.instructions}
          </p>
        )}
      </div>
    </div>
  );
}
