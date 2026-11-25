/* eslint-disable @next/next/no-img-element */
import { Badge } from "@/components/ui/badge";
import { INVOICE_COPY, PAYMENT_METHODS } from "@/config/orders";
import { STATUS_BADGES } from "@/config/status-badges";
import { dhakaDate, dhakaDateTime } from "@/lib/dhaka-time";
import { monogram } from "@/lib/monogram";
import { isBangla, money, splitStoreName, toBanglaDigits } from "@/lib/order-display";
import { tableStyles } from "@/lib/table-styles";
import { cn, formatPhone, formatTaka } from "@/lib/utils";
import type { OrderInvoice } from "@/types/order";

type InvoiceSheetProps = {
  invoice: OrderInvoice;
  printedAt: number;
  page: number;
  pages: number;
};

const cellClass = "border-b border-line px-3.5 py-4 align-top";

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-ink-3">{label}</span>
      <b className="font-semibold wrap-break-word">{value}</b>
    </div>
  );
}

export function InvoiceSheet({ invoice, printedAt, page, pages }: InvoiceSheetProps) {
  const { store, billTo, payment, summary } = invoice;
  const storeName = splitStoreName(store.name);
  const contact = store.whatsapp || store.phone;
  const paymentBadge = STATUS_BADGES.payment[payment.status];
  const discount = money(summary.discountAmount);
  const delivery = money(summary.deliveryCharge);
  const address = [billTo.address, billTo.area, billTo.district].filter(Boolean).join(", ");
  const storeLines = [store.address, [contact && `WhatsApp ${formatPhone(contact)}`, store.email].filter(Boolean).join(" · ")].filter(Boolean);

  return (
    <article
      data-print-sheet
      className="mx-auto box-border flex h-280.75 w-198.5 flex-none flex-col bg-white p-14 font-sans text-[13px] leading-normal text-ink shadow-pop"
    >
      <div className="flex items-start justify-between gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <span className="flex size-12 items-center justify-center overflow-hidden rounded-[14px] bg-brand font-heading text-lg leading-none font-bold text-white">
              {store.logo ? <img src={store.logo} alt="" className="size-full object-cover" /> : monogram(store.name)}
            </span>
            <span className="font-heading text-2xl leading-none font-semibold">
              {storeName.main} {storeName.accent && <span className="text-brand-text">{storeName.accent}</span>}
            </span>
          </div>
          <span className="text-xs leading-[1.6] text-ink-2">
            {storeLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </span>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span className="font-heading text-[34px] leading-none font-semibold whitespace-nowrap">
            Invoice <span className="text-brand">#{invoice.invoiceNumber}</span>
          </span>
          <Badge variant={paymentBadge.variant}>
            {paymentBadge.label} · {PAYMENT_METHODS[payment.method].short}
          </Badge>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-1.5">
          <span className="text-ink-3">Bill to</span>
          <span className={cn("text-[17px] leading-[1.3] font-semibold", isBangla(billTo.name) && "font-bengali")}>{billTo.name}</span>
          <span className={cn("text-ink-2", isBangla(address) && "font-bengali")}>{address}</span>
          <span className="text-ink-2">{[formatPhone(billTo.phone), billTo.email].filter(Boolean).join(" · ")}</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Meta label="Order" value={invoice.orderNumber} />
          <Meta label="Issued" value={dhakaDate(invoice.issuedAt)} />
          <Meta label="Payment" value={[payment.methodLabel, payment.transactionId].filter(Boolean).join(" · ")} />
          <Meta label="Delivery" value={summary.deliveryZoneName} />
        </div>
      </div>

      <h3 className="mt-10 mb-3.5 font-heading text-base leading-none font-semibold">Item details</h3>
      <table className="w-full border-separate border-spacing-0 text-[13px]">
        <thead>
          <tr>
            <th className={tableStyles.head}>Description</th>
            <th className={cn(tableStyles.head, "text-right")}>Price</th>
            <th className={cn(tableStyles.head, "text-right")}>Qty</th>
            <th className={cn(tableStyles.head, "text-right")}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, index) => {
            const itemDiscount = money(item.discountAmount);
            return (
              <tr key={`${item.sku}-${index}`}>
                <td className={cellClass}>
                  {item.name}
                  <div className="text-[11.5px] text-ink-3">
                    {item.sku}
                    {itemDiscount ? ` · ${formatTaka(itemDiscount)} off` : ""}
                  </div>
                </td>
                <td className={cn(cellClass, "text-right tabular-nums")}>{formatTaka(item.unitPrice)}</td>
                <td className={cn(cellClass, "text-right tabular-nums")}>{item.quantity}</td>
                <td className={cn(cellClass, "text-right tabular-nums")}>{formatTaka(item.lineTotal)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <dl className="mt-5 ml-auto grid w-75 grid-cols-[1fr_auto] gap-2.5 text-[13.5px]">
        <dt className="text-ink-2">Subtotal</dt>
        <dd className="m-0 text-right tabular-nums">{formatTaka(summary.subtotal)}</dd>
        {discount > 0 && (
          <>
            <dt className="text-ink-2">Discount{summary.couponCode ? ` (${summary.couponCode})` : ""}</dt>
            <dd className="m-0 text-right tabular-nums">−{formatTaka(discount)}</dd>
          </>
        )}
        <dt className="text-ink-2">Delivery fee</dt>
        <dd className="m-0 text-right tabular-nums">{delivery ? formatTaka(delivery) : "Free"}</dd>
        <dt className="border-t border-line-2 pt-3.5 font-heading text-base leading-none font-semibold">Total amount</dt>
        <dd className="m-0 border-t border-line-2 pt-3 text-right font-heading text-[22px] leading-none font-bold tabular-nums">{formatTaka(summary.total)}</dd>
      </dl>

      <div className="flex-1" />

      <div className="flex items-center justify-between gap-6 rounded-xl bg-brand-50 p-4.5">
        <div className="flex flex-col gap-1">
          <b className="font-heading text-[15px] leading-[1.3] font-semibold">
            {INVOICE_COPY.thanks} {store.name}
          </b>
          <span className="text-xs text-ink-2">{INVOICE_COPY.policy}</span>
          {contact && (
            <span className="font-bengali text-[12.5px] text-ink-2">
              {INVOICE_COPY.helpPrefix} {toBanglaDigits(formatPhone(contact))}
            </span>
          )}
        </div>
        <div className="flex flex-none flex-col items-center gap-1.5">
          <span className="h-8 w-32.5 border-b border-ink" />
          <span className="text-[11.5px] text-ink-2">{INVOICE_COPY.signature}</span>
        </div>
      </div>
      <div className="mt-4.5 flex items-center justify-between text-[11.5px] text-ink-3">
        <span>
          Printed {dhakaDateTime(printedAt)} ({INVOICE_COPY.timeZoneLabel})
        </span>
        <span>
          Page {page} of {pages}
        </span>
      </div>
    </article>
  );
}
