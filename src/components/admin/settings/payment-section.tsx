import { Icon } from "@/components/shared/icon";
import { SegmentedControl } from "@/components/shared/segmented-control";
import { ToggleSwitch } from "@/components/shared/toggle-switch";
import { WALLETS, type WalletKey } from "@/config/settings";
import { formStyles } from "@/lib/form-styles";
import { cn } from "@/lib/utils";
import type { MobileWallet, PaymentSettings, WalletAccountType } from "@/types/setting";
import { SettingsField, SettingsPanel, SettingsSectionHeader } from "./settings-field";
import type { SectionProps } from "./settings-types";

const whiteInput = cn(formStyles.input, "bg-surface");
const whiteTextarea = cn(formStyles.textarea, "min-h-18 bg-surface");
const ACCOUNT_TYPES: { value: WalletAccountType; label: string }[] = [
  { value: "MERCHANT", label: "Merchant" },
  { value: "PERSONAL", label: "Personal" },
];

function MethodHeader({ badge, title, subtitle, children }: { badge: React.ReactNode; title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      {badge}
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="font-heading text-base leading-[1.3] font-semibold text-ink">{title}</span>
        <span className="text-xs text-ink-3">{subtitle}</span>
      </span>
      {children}
    </div>
  );
}

const fieldsGrid = "grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-4";

export function PaymentSection({ value, onChange, errorFor }: SectionProps<"payment">) {
  const setWallet = (key: WalletKey, patch: Partial<MobileWallet>) => onChange({ [key]: { ...value[key], ...patch } });
  const setBank = (patch: Partial<PaymentSettings["bankTransfer"]>) => onChange({ bankTransfer: { ...value.bankTransfer, ...patch } });
  const bank = value.bankTransfer;

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
    <div className="flex flex-col gap-5">
      <SettingsSectionHeader
        title="Payment methods"
        description="Shown at checkout. Wallet instructions appear after the customer picks the method."
      />
      {errorFor("payment") && <p className={formStyles.error}>{errorFor("payment")}</p>}

      {WALLETS.map(({ key, name, short, color }) => {
        const wallet = value[key];
        const typeLabel = wallet.accountType === "MERCHANT" ? "Merchant" : "Personal";

        return (
          <SettingsPanel key={key}>
            <MethodHeader
              badge={
                <span
                  className="flex size-11 flex-none items-center justify-center rounded-xl font-heading text-sm leading-none font-bold text-white"
                  style={{ background: color }}
                >
                  {short}
                </span>
              }
              title={name}
              subtitle={wallet.enabled ? `${typeLabel} · ${wallet.accountNumber || "number not set"}` : "Disabled"}
            >
              <ToggleSwitch ariaLabel={`Enable ${name}`} checked={wallet.enabled} onChange={(enabled) => setWallet(key, { enabled })} />
            </MethodHeader>

            {wallet.enabled && (
              <div className={fieldsGrid}>
                <SettingsField label="Account type">
                  <SegmentedControl
                    ariaLabel={`${name} account type`}
                    options={ACCOUNT_TYPES}
                    value={wallet.accountType}
                    onChange={(accountType) => setWallet(key, { accountType })}
                    className="bg-surface"
                  />
                </SettingsField>
                <SettingsField label="Account number" htmlFor={`${key}n`} error={errorFor(`payment.${key}.accountNumber`)}>
                  <input
                    id={`${key}n`}
                    inputMode="numeric"
                    value={wallet.accountNumber}
                    aria-invalid={!!errorFor(`payment.${key}.accountNumber`) || undefined}
                    onChange={(event) => setWallet(key, { accountNumber: event.target.value.replace(/\D/g, "").slice(0, 11) })}
                    className={cn(whiteInput, "tabular-nums")}
                  />
                </SettingsField>
                <SettingsField label="Instructions for customers" htmlFor={`${key}i`} className="col-span-full">
                  <textarea
                    id={`${key}i`}
                    value={wallet.instructions}
                    onChange={(event) => setWallet(key, { instructions: event.target.value })}
                    className={cn(whiteTextarea, "font-bengali")}
                  />
                </SettingsField>
              </div>
            )}
          </SettingsPanel>
        );
      })}

      <SettingsPanel>
        <MethodHeader
          badge={
            <span className="flex size-10 flex-none items-center justify-center rounded-[10px] bg-info-soft text-info">
              <Icon name="bank" />
            </span>
          }
          title="Bank transfer"
          subtitle="Customer uploads a transfer reference"
        >
          <ToggleSwitch ariaLabel="Enable bank transfer" checked={bank.enabled} onChange={(enabled) => setBank({ enabled })} />
        </MethodHeader>
        {errorFor("payment.bankTransfer.enabled") && (
          <p className={formStyles.error}>{errorFor("payment.bankTransfer.enabled")}</p>
        )}

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
                className={whiteTextarea}
              />
            </SettingsField>
          </div>
        )}
      </SettingsPanel>

      <SettingsPanel className="px-5 py-4.5">
        <MethodHeader
          badge={
            <span className="flex size-10 flex-none items-center justify-center rounded-[10px] bg-success-soft text-success">
              <Icon name="cash" />
            </span>
          }
          title="Cash on delivery"
          subtitle="Rider collects cash · available in every zone"
        >
          <ToggleSwitch
            ariaLabel="Enable cash on delivery"
            checked={value.cod.enabled}
            onChange={(enabled) => onChange({ cod: { ...value.cod, enabled } })}
          />
        </MethodHeader>
      </SettingsPanel>
    </div>
  );
}
