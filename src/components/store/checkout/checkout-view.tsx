"use client";

import { useEffect, useId, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { CheckoutAuthBanner } from "@/components/store/checkout/checkout-auth-banner";
import { CheckoutErrorBanner } from "@/components/store/checkout/checkout-error-banner";
import { CheckoutSection } from "@/components/store/checkout/checkout-section";
import { CheckoutStickyBar } from "@/components/store/checkout/checkout-sticky-bar";
import { CheckoutSummary, type CheckoutSummaryProps } from "@/components/store/checkout/checkout-summary";
import { ContactAddressForm } from "@/components/store/checkout/contact-address-form";
import { DeliveryOptions } from "@/components/store/checkout/delivery-options";
import { PaymentMethods } from "@/components/store/checkout/payment-methods";
import { PlaceOrderPanel } from "@/components/store/checkout/place-order-panel";
import { SummaryToggle } from "@/components/store/checkout/summary-toggle";
import { COUPON } from "@/config/store-cart";
import { EMPTY_ADDRESS, KNOWN_CUSTOMER, ORDER_NUMBER } from "@/config/store-checkout";
import { cartActions, useStoreCart } from "@/hooks/use-store-cart";
import { checkoutTotals, findPaymentMethod, resolveDeliveryZone, toCartLines } from "@/lib/store-cart";
import { formatTaka } from "@/lib/utils";
import {
  CHECKOUT_FIELD_LABELS,
  checkoutSchema,
  type CheckoutRequiredField,
  type CheckoutValues,
} from "@/lib/validations/checkout";
import type { AddressLabel, DeliveryZoneId, PaymentMethodId } from "@/types/store-cart";

const PLACE_DELAY = 900;

const REQUIRED_FIELDS = Object.keys(CHECKOUT_FIELD_LABELS) as CheckoutRequiredField[];

const attentionText = (count: number) => `${count} field${count > 1 ? "s need" : " needs"} attention`;

export function CheckoutView() {
  const router = useRouter();
  const cart = useStoreCart();
  const summaryId = useId();
  const [payment, setPayment] = useState<PaymentMethodId>("cod");
  const [deliveryOverride, setDeliveryOverride] = useState<DeliveryZoneId | null>(null);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [known, setKnown] = useState(false);
  const [label, setLabel] = useState<AddressLabel>("Home");
  const [couponInput, setCouponInput] = useState("");
  const [couponInvalid, setCouponInvalid] = useState(false);
  const [busy, setBusy] = useState(false);

  const { control, handleSubmit, setValue, clearErrors, formState } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: EMPTY_ADDRESS,
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  const values = useWatch({ control }) as CheckoutValues;

  const lines = toCartLines(cart.items);
  const zone = resolveDeliveryZone(values.district, deliveryOverride);
  const method = findPaymentMethod(payment);
  const totals = checkoutTotals(lines, cart.couponCode, cart.gift, zone, payment);
  const total = formatTaka(totals.total);
  const errorFields = REQUIRED_FIELDS.filter((field) => formState.errors[field]).map(
    (field) => CHECKOUT_FIELD_LABELS[field],
  );

  useEffect(() => {
    if (!lines.length && !busy) router.replace("/cart");
  }, [busy, lines.length, router]);

  const setFields = (patch: Partial<CheckoutValues>) => {
    (Object.keys(patch) as (keyof CheckoutValues)[]).forEach((field) => setValue(field, patch[field] ?? ""));
    clearErrors(Object.keys(patch) as (keyof CheckoutValues)[]);
  };

  const changeField = (field: keyof CheckoutValues, value: string) => {
    if (field === "district") {
      setDeliveryOverride(null);
      setFields({ district: value, area: "" });
      return;
    }
    if (field !== "phone") {
      setFields({ [field]: value });
      return;
    }
    const phone = value.replace(/\D/g, "").slice(0, 11);
    const autofill = phone === KNOWN_CUSTOMER.phone && !values.name;
    setFields(autofill ? { phone, ...KNOWN_CUSTOMER.address } : { phone });
    if (autofill) setKnown(true);
  };

  const clearKnown = () => {
    setKnown(false);
    setFields({ area: "", addr: "" });
  };

  const applyCoupon = () => {
    if (couponInput.trim().toUpperCase() !== COUPON.code) {
      setCouponInvalid(true);
      return;
    }
    cartActions.applyCoupon(COUPON.code);
    setCouponInput("");
    toast.success("Coupon applied", { description: "CHOCO10 · 10% off" });
  };

  const placeOrder = (address: CheckoutValues) => {
    if (busy) return;
    setBusy(true);
    window.setTimeout(() => {
      cartActions.placeOrder({
        number: ORDER_NUMBER,
        address,
        lines: cart.items,
        delivery: zone.id,
        payment,
        total: totals.total,
        settled: false,
      });
      router.push("/checkout/success");
    }, PLACE_DELAY);
  };

  const rejectOrder = (errors: FieldErrors<CheckoutValues>) => {
    const count = REQUIRED_FIELDS.filter((field) => errors[field]).length;
    toast.error("Some details are missing", {
      description: attentionText(count),
    });
  };

  const summaryProps: CheckoutSummaryProps = {
    lines,
    totals,
    deliveryName: zone.name,
    couponCode: cart.couponCode,
    couponInput,
    couponInvalid,
    gift: cart.gift,
    giftNote: cart.giftNote,
    onCouponInput: (value) => {
      setCouponInput(value);
      setCouponInvalid(false);
    },
    onApplyCoupon: applyCoupon,
    onRemoveCoupon: cartActions.removeCoupon,
  };

  const payments = <PaymentMethods value={payment} onChange={setPayment} />;
  const placeLabel = busy ? "Placing your order…" : `${payment === "cod" ? "Place order · " : "Pay "}${total}`;
  const placeShort = busy ? "Placing…" : payment === "cod" ? "Place order" : "Pay now";

  return (
    <>
      <SummaryToggle
        open={summaryOpen}
        count={totals.count}
        total={total}
        controls={summaryId}
        onToggle={() => setSummaryOpen((open) => !open)}
      />
      {summaryOpen && (
        <div id={summaryId} className="mb-3.5 hidden max-[900px]:block">
          <CheckoutSummary {...summaryProps} showGiftNote className="shadow-none" />
        </div>
      )}
      <div className="grid grid-cols-[minmax(0,1fr)_420px] items-start gap-6 max-[1180px]:grid-cols-1">
        <div className="flex min-w-0 flex-col gap-4">
          {errorFields.length > 0 && <CheckoutErrorBanner fields={errorFields} />}
          <CheckoutAuthBanner />
          <CheckoutSection step={1} title="Contact & delivery address">
            <ContactAddressForm
              values={values}
              errors={formState.errors}
              known={known}
              label={label}
              onField={changeField}
              onClearKnown={clearKnown}
              onLabel={setLabel}
              onSubmit={handleSubmit(placeOrder, rejectOrder)}
            />
          </CheckoutSection>
          <CheckoutSection
            step={2}
            title="Delivery option"
            description={
              values.district ? `Suggested for ${values.district} — you can change it` : "Pick your delivery zone"
            }
          >
            <DeliveryOptions value={zone.id} onChange={setDeliveryOverride} />
          </CheckoutSection>
          <div className="hidden max-[900px]:block">
            <CheckoutSection step={3} title="Payment" description="All transactions are secure and encrypted.">
              {payments}
            </CheckoutSection>
          </div>
        </div>
        <aside className="sticky top-4 flex flex-col gap-4 max-[1180px]:static max-[900px]:hidden">
          <CheckoutSummary {...summaryProps} />
          <CheckoutSection step={3} title="Payment" description="All transactions are secure and encrypted." compact>
            {payments}
          </CheckoutSection>
          <PlaceOrderPanel label={placeLabel} busy={busy} />
        </aside>
      </div>
      <CheckoutStickyBar paymentName={method.title} total={total} label={placeShort} busy={busy} />
    </>
  );
}
