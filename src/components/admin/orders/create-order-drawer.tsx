"use client";

import { useEffect, useRef, useState, useTransition, type FormEvent } from "react";
import { toast } from "sonner";
import { createOrderAction, loadOrderFormOptionsAction, previewOrderAction, searchCustomersAction } from "@/actions/order.actions";
import { FormDrawer } from "@/components/shared/form-drawer";
import { Icon } from "@/components/shared/icon";
import { Button } from "@/components/ui/button";
import { CHECKOUT_PAYMENT_METHODS, PAYMENT_METHODS } from "@/config/orders";
import { SEARCH_DEBOUNCE_MS } from "@/config/search";
import { formStyles } from "@/lib/form-styles";
import { isBangla, money } from "@/lib/order-display";
import { cn, formatPhone, formatTaka, getInitials } from "@/lib/utils";
import type { CheckoutPaymentMethod, CustomerMatch, OrderFormOptions } from "@/types/order";

type CreateOrderDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: () => void;
};

type Line = { productId: string; quantity: number };

type CouponState = { code: string; ok: boolean; message: string; discount: number; delivery: number | null } | null;

type Errors = Partial<Record<"name" | "phone" | "address" | "district" | "area" | "zone" | "lines", boolean>>;

const PHONE = /^01[3-9]\d{8}$/;
const selectClass = cn(formStyles.input, "select-chevron cursor-pointer pr-[38px]");
const errorClass = formStyles.error;

export function CreateOrderDrawer({ open, onOpenChange, onCreated }: CreateOrderDrawerProps) {
  return (
    <FormDrawer
      open={open}
      onOpenChange={onOpenChange}
      title="Create phone order"
      description="For orders taken by phone, WhatsApp or Messenger."
      footer={
        <>
          <Button variant="soft" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" form="create-order-form">
            Create order
          </Button>
        </>
      }
    >
      {open && <CreateOrderForm onCreated={onCreated} />}
    </FormDrawer>
  );
}

function CreateOrderForm({ onCreated }: { onCreated: () => void }) {
  const [options, setOptions] = useState<OrderFormOptions | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [customerQuery, setCustomerQuery] = useState("");
  const [matches, setMatches] = useState<CustomerMatch[]>([]);
  const [showMatches, setShowMatches] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [productId, setProductId] = useState("");
  const [lines, setLines] = useState<Line[]>([]);
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [method, setMethod] = useState<CheckoutPaymentMethod>("COD");
  const [code, setCode] = useState("");
  const [coupon, setCoupon] = useState<CouponState>(null);
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [isSaving, startSaving] = useTransition();
  const [isApplying, startApplying] = useTransition();
  const searchRef = useRef(0);

  useEffect(() => {
    let active = true;
    loadOrderFormOptionsAction().then((result) => {
      if (!active) return;
      if (result.success && result.data) {
        setOptions(result.data);
        setZoneId((current) => current || result.data?.zones[0]?.id || "");
      } else {
        setLoadError(result.message);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const term = customerQuery.trim();
    const request = ++searchRef.current;
    if (term.length < 2) return;
    const timer = setTimeout(async () => {
      const result = await searchCustomersAction(term);
      if (request === searchRef.current) setMatches(result.data ?? []);
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [customerQuery]);

  const products = options?.products ?? [];
  const zones = options?.zones ?? [];
  const zone = zones.find((item) => item.id === zoneId);
  const areas = options?.districts.find((item) => item.name === district)?.areas ?? [];
  const priceOf = (id: string) => money(products.find((product) => product.id === id)?.price ?? 0);

  const subtotal = lines.reduce((sum, line) => sum + priceOf(line.productId) * line.quantity, 0);
  const discount = coupon?.ok ? coupon.discount : 0;
  const delivery = coupon?.ok && coupon.delivery !== null ? coupon.delivery : money(zone?.charge ?? 0);
  const total = subtotal ? subtotal - discount + delivery : 0;

  const clearError = (key: keyof Errors) => setErrors((current) => ({ ...current, [key]: false }));

  const checkCoupon = (couponCode: string, nextLines: Line[], nextZoneId: string) => {
    if (!couponCode) return;
    if (!nextLines.length || !nextZoneId) {
      setCoupon({ code: couponCode, ok: false, message: "Add a product and delivery zone first", discount: 0, delivery: null });
      return;
    }
    startApplying(async () => {
      const result = await previewOrderAction({
        items: nextLines,
        deliveryZoneId: nextZoneId,
        couponCode,
        ...(PHONE.test(phone) && { phone }),
      });
      if (result.success && result.data) {
        setCoupon({
          code: couponCode,
          ok: true,
          message: `${couponCode} applied`,
          discount: money(result.data.discountAmount),
          delivery: result.data.deliveryCharge === null ? null : money(result.data.deliveryCharge),
        });
      } else {
        setCoupon({ code: couponCode, ok: false, message: result.message || "Code not found or expired", discount: 0, delivery: null });
      }
    });
  };

  const updateLines = (nextLines: Line[]) => {
    setLines(nextLines);
    if (coupon?.ok) checkCoupon(coupon.code, nextLines, zoneId);
  };

  const addLine = () => {
    if (!productId) return;
    const exists = lines.some((line) => line.productId === productId);
    updateLines(
      exists
        ? lines.map((line) => (line.productId === productId ? { ...line, quantity: line.quantity + 1 } : line))
        : [...lines, { productId, quantity: 1 }]
    );
    clearError("lines");
  };

  const setQuantity = (index: number, quantity: number) =>
    updateLines(lines.map((line, i) => (i === index ? { ...line, quantity } : line)).filter((line) => line.quantity > 0));

  const pickCustomer = (customer: CustomerMatch) => {
    setName(customer.name);
    setPhone(customer.phone ?? "");
    setCustomerQuery(customer.name);
    setShowMatches(false);
    if (customer.address) {
      setAddress(customer.address.address);
      setDistrict(customer.address.district);
      setArea(customer.address.area);
      if (zones.some((item) => item.id === customer.address?.deliveryZoneId)) setZoneId(customer.address.deliveryZoneId);
    }
    setErrors({});
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (isSaving) return;
    const nextErrors: Errors = {
      name: !name.trim(),
      phone: !PHONE.test(phone),
      address: address.trim().length < 5,
      district: !district,
      area: !area,
      zone: !zoneId,
      lines: lines.length === 0,
    };
    if (Object.values(nextErrors).some(Boolean)) {
      setErrors(nextErrors);
      toast.error("Check the form", { description: "Some required fields need attention" });
      return;
    }

    startSaving(async () => {
      const result = await createOrderAction({
        recipientName: name.trim(),
        recipientPhone: phone,
        address: address.trim(),
        district,
        area,
        deliveryZoneId: zoneId,
        items: lines,
        paymentMethod: method,
        ...(coupon?.ok && { couponCode: coupon.code }),
        ...(note.trim() && { customerNote: note.trim() }),
      });
      if (!result.success || !result.data) {
        toast.error("Couldn’t create order", { description: result.message });
        return;
      }
      toast.success("Order created", { description: `${result.data.orderNumber} · ${formatTaka(result.data.total)} · added to Pending` });
      onCreated();
    });
  };

  return (
    <form id="create-order-form" onSubmit={submit} aria-busy={isSaving || undefined} className="contents">
      {loadError && (
        <p role="alert" className="rounded-xl bg-danger-soft px-4 py-3 text-[13px] text-danger">
          {loadError}
        </p>
      )}
      <div className="flex flex-col gap-3.5">
        <span className="eyebrow">Customer</span>
        <div className={cn(formStyles.field, "relative")}>
          <label className={formStyles.label} htmlFor="cq">
            Find existing customer
          </label>
          <div className="relative flex items-center">
            <Icon name="search" size={18} strokeWidth={1.8} className="pointer-events-none absolute left-3.5 text-ink-3" />
            <input
              id="cq"
              value={customerQuery}
              autoComplete="off"
              placeholder="Name or 01XXXXXXXXX"
              onChange={(event) => {
                setCustomerQuery(event.target.value);
                setShowMatches(true);
                if (event.target.value.trim().length < 2) setMatches([]);
              }}
              onBlur={() => setTimeout(() => setShowMatches(false), 150)}
              className={cn(formStyles.input, "border-transparent pl-10.5")}
            />
          </div>
          {showMatches && matches.length > 0 && (
            <div className="absolute top-[76px] right-0 left-0 z-40 min-w-55 animate-pop rounded-[14px] bg-surface p-1.5 shadow-pop">
              {matches.map((customer) => (
                <button
                  key={customer.id}
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => pickCustomer(customer)}
                  className="flex w-full items-center gap-2.5 rounded-[9px] px-3 py-2.5 text-left text-sm leading-[1.2] text-ink hover:bg-surface-2"
                >
                  <span className="flex size-[30px] flex-none items-center justify-center rounded-full bg-choco-50 font-heading text-xs font-semibold text-choco">
                    {getInitials(customer.name) || customer.name.slice(0, 1)}
                  </span>
                  <span className="flex flex-col">
                    <span className={cn(isBangla(customer.name) && "font-bengali")}>{customer.name}</span>
                    <span className="text-xs text-ink-3">
                      {customer.phone ? formatPhone(customer.phone) : "No phone"} · {customer.orderCount} orders
                    </span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-3.5">
          <div className={formStyles.field}>
            <label className={formStyles.label} htmlFor="cn">
              Name<span className={formStyles.required}>*</span>
            </label>
            <input
              id="cn"
              value={name}
              aria-invalid={errors.name || undefined}
              onChange={(event) => {
                setName(event.target.value);
                clearError("name");
              }}
              placeholder="Bangla or English"
              maxLength={100}
              className={formStyles.input}
            />
            {errors.name && <span className={errorClass}>Enter the customer’s name.</span>}
          </div>
          <div className={formStyles.field}>
            <label className={formStyles.label} htmlFor="cp">
              Phone<span className={formStyles.required}>*</span>
            </label>
            <div className={formStyles.inputGroup}>
              <span className={formStyles.groupAddon}>+88</span>
              <input
                id="cp"
                inputMode="numeric"
                placeholder="01XXXXXXXXX"
                value={phone}
                aria-invalid={errors.phone || undefined}
                onChange={(event) => {
                  setPhone(event.target.value.replace(/\D/g, "").slice(0, 11));
                  clearError("phone");
                }}
                className={formStyles.groupInput}
              />
            </div>
            {errors.phone && <span className={errorClass}>11 digits starting 013–019.</span>}
          </div>
        </div>
      </div>

      <hr className="h-px border-0 bg-line" />

      <div className="flex flex-col gap-3.5">
        <span className="eyebrow">Products</span>
        <div className="flex flex-wrap items-center gap-2">
          <select
            aria-label="Product"
            value={productId}
            onChange={(event) => setProductId(event.target.value)}
            disabled={!options}
            className={cn(selectClass, "min-w-0 flex-[1_1_220px]")}
          >
            <option value="">{options ? "Choose a product…" : "Loading products…"}</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name} — {formatTaka(product.price)}
              </option>
            ))}
          </select>
          <Button type="button" variant="dark" onClick={addLine}>
            <Icon name="plus" size={18} strokeWidth={1.8} />
            Add
          </Button>
        </div>
        {errors.lines && <span className={errorClass}>Add at least one product.</span>}
        {lines.map((line, index) => {
          const product = products.find((item) => item.id === line.productId);
          const price = priceOf(line.productId);
          return (
            <div key={line.productId} className="flex items-center gap-3 rounded-xl bg-surface-2 p-3">
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-sm font-medium">{product?.name}</span>
                <span className="text-xs text-ink-3">{formatTaka(price)} each</span>
              </span>
              <div className="flex items-center rounded-[9px] bg-surface">
                <Button type="button" variant="ghost" size="icon-sm" aria-label="Decrease" onClick={() => setQuantity(index, line.quantity - 1)}>
                  <Icon name="minus" size={15} strokeWidth={1.8} />
                </Button>
                <span className="min-w-6 text-center tabular-nums">{line.quantity}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Increase"
                  disabled={product?.stock !== null && product?.stock !== undefined && line.quantity >= product.stock}
                  onClick={() => setQuantity(index, line.quantity + 1)}
                >
                  <Icon name="plus" size={15} strokeWidth={1.8} />
                </Button>
              </div>
              <span className="w-18 text-right font-semibold tabular-nums">{formatTaka(price * line.quantity)}</span>
            </div>
          );
        })}
      </div>

      <hr className="h-px border-0 bg-line" />

      <div className="flex flex-col gap-3.5">
        <span className="eyebrow">Delivery &amp; payment</span>
        <div className={formStyles.field}>
          <label className={formStyles.label} htmlFor="ad">
            Address<span className={formStyles.required}>*</span>
          </label>
          <textarea
            id="ad"
            value={address}
            aria-invalid={errors.address || undefined}
            onChange={(event) => {
              setAddress(event.target.value);
              clearError("address");
            }}
            placeholder="House, road, area — Bangla is fine"
            maxLength={300}
            className={cn(formStyles.textarea, "min-h-[70px]")}
          />
          {errors.address && <span className={errorClass}>Enter a delivery address.</span>}
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-3.5">
          <div className={formStyles.field}>
            <label className={formStyles.label} htmlFor="dd">
              District<span className={formStyles.required}>*</span>
            </label>
            <select
              id="dd"
              value={district}
              aria-invalid={errors.district || undefined}
              onChange={(event) => {
                setDistrict(event.target.value);
                setArea("");
                clearError("district");
              }}
              className={selectClass}
            >
              <option value="">Select district</option>
              {options?.districts.map((item) => (
                <option key={item.name} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            {errors.district && <span className={errorClass}>Select a district.</span>}
          </div>
          <div className={formStyles.field}>
            <label className={formStyles.label} htmlFor="da">
              Area<span className={formStyles.required}>*</span>
            </label>
            <select
              id="da"
              value={area}
              disabled={!district}
              aria-invalid={errors.area || undefined}
              onChange={(event) => {
                setArea(event.target.value);
                clearError("area");
              }}
              className={selectClass}
            >
              <option value="">Select area</option>
              {areas.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            {errors.area && <span className={errorClass}>Select an area.</span>}
          </div>
          <div className={formStyles.field}>
            <label className={formStyles.label} htmlFor="dz">
              Delivery zone
            </label>
            <select
              id="dz"
              value={zoneId}
              aria-invalid={errors.zone || undefined}
              onChange={(event) => {
                setZoneId(event.target.value);
                clearError("zone");
                if (coupon?.ok) checkCoupon(coupon.code, lines, event.target.value);
              }}
              className={selectClass}
            >
              {!zones.length && <option value="">No delivery zones</option>}
              {zones.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} · {formatTaka(item.charge)}
                </option>
              ))}
            </select>
          </div>
          <div className={formStyles.field}>
            <label className={formStyles.label} htmlFor="pm">
              Payment method
            </label>
            <select id="pm" value={method} onChange={(event) => setMethod(event.target.value as CheckoutPaymentMethod)} className={selectClass}>
              {CHECKOUT_PAYMENT_METHODS.map((item) => (
                <option key={item} value={item}>
                  {PAYMENT_METHODS[item].short}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={formStyles.field}>
          <label className={formStyles.label} htmlFor="cc">
            Coupon
          </label>
          <div className="flex items-center gap-2">
            <input
              id="cc"
              value={code}
              onChange={(event) => {
                setCode(event.target.value.toUpperCase());
                setCoupon(null);
              }}
              placeholder="EID25, CHOCO100, FREESHIP"
              className={cn(formStyles.input, "uppercase")}
            />
            <Button type="button" variant="outline" onClick={() => checkCoupon(code.trim(), lines, zoneId)} aria-busy={isApplying || undefined}>
              Apply
            </Button>
          </div>
          <span className={coupon && !coupon.ok ? errorClass : formStyles.hint}>{coupon ? coupon.message : "Codes are checked against limits and dates."}</span>
        </div>
        <div className={formStyles.field}>
          <label className={formStyles.label} htmlFor="nt">
            Note
          </label>
          <input
            id="nt"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            placeholder="e.g. Gift wrap, deliver after 5 PM"
            maxLength={500}
            className={formStyles.input}
          />
        </div>
      </div>

      <dl className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-3 rounded-[14px] bg-surface-2 p-4 text-sm">
        <dt className="text-ink-3">Subtotal</dt>
        <dd className="text-right tabular-nums">{formatTaka(subtotal)}</dd>
        <dt className="text-ink-3">Discount</dt>
        <dd className="text-right text-success tabular-nums">{discount ? `−${formatTaka(discount)}` : "৳0"}</dd>
        <dt className="text-ink-3">Delivery</dt>
        <dd className="text-right tabular-nums">{subtotal ? (delivery ? formatTaka(delivery) : "Free") : "—"}</dd>
        <dt className="font-semibold text-ink">Total</dt>
        <dd className="text-right font-heading text-xl leading-none font-semibold tabular-nums">{formatTaka(total)}</dd>
      </dl>
    </form>
  );
}
