/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from "react";
import Link from "next/link";
import { Tile } from "@/components/admin/dashboard/kpi-card";
import { Icon } from "@/components/shared/icon";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { COUPONS_PATH, PRODUCT_TINTS, REVIEWS_PATH, CHART_COLORS } from "@/config/dashboard";
import { productEditPath } from "@/config/products";
import { monogram } from "@/lib/monogram";
import { isBangla } from "@/lib/order-display";
import { cn, formatTaka, getInitials } from "@/lib/utils";
import type { DashboardOverview } from "@/types/dashboard";

export function DashCard({ id, title, action, children, className }: { id: string; title: ReactNode; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section aria-labelledby={id} className={cn("min-w-0 rounded-xl bg-card px-6 py-5.5 max-[900px]:p-4.5", className)}>
      <div className="mb-4.5 flex items-center justify-between gap-3">
        <h2 id={id} className="flex items-center gap-2 font-heading text-lg leading-[1.3] font-semibold">
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function OpenLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} aria-label={label} className={buttonVariants({ variant: "square", size: "icon-md" })}>
      <Icon name="arrowRight" size={16} strokeWidth={1.8} />
    </Link>
  );
}

function Track({ pct, color, thin }: { pct: number; color?: string; thin?: boolean }) {
  return (
    <div className={cn("overflow-hidden rounded-full bg-surface-3", thin ? "h-1.5" : "h-2")}>
      <div className="h-full rounded-full bg-brand" style={{ width: `${Math.min(100, Math.max(0, pct)).toFixed(1)}%`, ...(color && { background: color }) }} />
    </div>
  );
}

export type BarRow = { label: string; value: string; sub?: string; raw: number };

export function BarListCard({ id, title, note, rows, color, empty }: { id: string; title: string; note: string; rows: BarRow[]; color: string; empty: string }) {
  const max = Math.max(...rows.map((row) => row.raw), 0) || 1;

  return (
    <DashCard id={id} title={title} action={<span className="text-xs text-ink-3">{note}</span>}>
      <div className="flex flex-col gap-4">
        {rows.length === 0 && <p className="py-6 text-center text-[12.5px] text-ink-3">{empty}</p>}
        {rows.map((row) => (
          <div key={row.label} className="flex flex-col gap-2" title={`${row.label}: ${row.value}`}>
            <div className="flex items-center justify-between text-sm">
              <span>{row.label}</span>
              <span className="tabular-nums">
                <strong className="font-semibold">{row.value}</strong> {row.sub && <span className="text-ink-3">{row.sub}</span>}
              </span>
            </div>
            <Track pct={(row.raw / max) * 100} color={color} />
          </div>
        ))}
      </div>
    </DashCard>
  );
}

export function TopProductsCard({ products }: { products: DashboardOverview["topProducts"] }) {
  return (
    <DashCard id="tp" title="Top-selling products">
      <div className="flex flex-col gap-4">
        {products.length === 0 && <p className="py-6 text-center text-[12.5px] text-ink-3">No sales in this period yet.</p>}
        {products.map((product, index) => {
          const [background, color] = PRODUCT_TINTS[index % PRODUCT_TINTS.length];
          return (
            <div key={product.id} className="flex items-center gap-3">
              <span
                className="flex size-11 flex-none items-center justify-center overflow-hidden rounded-[10px] font-heading text-[13px] leading-none font-bold"
                style={product.image ? undefined : { background, color }}
              >
                {product.image ? <img src={product.image} alt="" className="size-full object-cover" /> : monogram(product.name)}
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-sm font-medium">{product.name}</span>
                <span className="text-xs text-ink-3">{product.units.toLocaleString("en-IN")} sold</span>
              </span>
              <span className="text-sm font-semibold tabular-nums">{formatTaka(product.revenue)}</span>
            </div>
          );
        })}
      </div>
    </DashCard>
  );
}

export function LowStockCard({ lowStock }: { lowStock: DashboardOverview["lowStock"] }) {
  return (
    <DashCard
      id="ls"
      title={
        <>
          Low stock
          <Badge variant="danger" size="sm">
            {lowStock.total}
          </Badge>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        {lowStock.items.length === 0 && <p className="py-6 text-center text-[12.5px] text-ink-3">Every product is above its alert level.</p>}
        {lowStock.items.map((product) => (
          <div key={product.id} className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-sm font-medium">{product.name}</span>
                <span className="text-xs text-ink-3">
                  {product.stock} left · alert at {product.lowStockThreshold}
                </span>
              </span>
              <Link href={productEditPath(product.id)} className={buttonVariants({ variant: "tint", size: "sm" })}>
                Restock
              </Link>
            </div>
            <Track
              thin
              pct={Math.max(4, product.lowStockThreshold ? (product.stock / product.lowStockThreshold) * 100 : 0)}
              color={product.stock <= 0 ? CHART_COLORS.critical : CHART_COLORS.warning}
            />
          </div>
        ))}
      </div>
    </DashCard>
  );
}

export function PendingReviewsCard({ reviews }: { reviews: DashboardOverview["pendingReviews"] }) {
  return (
    <DashCard
      id="pr"
      title={
        <>
          Pending reviews
          <Badge variant="lavender" size="sm">
            {reviews.total}
          </Badge>
        </>
      }
      action={<OpenLink href={REVIEWS_PATH} label="Open reviews" />}
    >
      <div className="flex flex-col gap-4">
        {reviews.items.length === 0 && <p className="py-6 text-center text-[12.5px] text-ink-3">No reviews waiting for approval.</p>}
        {reviews.items.map((review) => (
          <div key={review.id} className="flex items-start gap-3">
            <span className="flex size-9 flex-none items-center justify-center rounded-full bg-choco-50 font-heading text-[13px] leading-none font-semibold text-choco">
              {getInitials(review.customerName) || review.customerName.slice(0, 1)}
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <span className="flex items-center justify-between gap-2 text-[13.5px]">
                <span className={cn("font-medium", isBangla(review.customerName) && "font-bengali")}>{review.customerName}</span>
                <span className="tracking-[1px] text-[#e08a00]" aria-label={`${review.rating} of 5`}>
                  {"★".repeat(review.rating)}
                  {"☆".repeat(Math.max(0, 5 - review.rating))}
                </span>
              </span>
              <span className={cn("truncate text-[12.5px] text-ink-3", isBangla(review.comment) && "font-bengali")}>{review.comment || "No comment"}</span>
            </div>
          </div>
        ))}
      </div>
    </DashCard>
  );
}

const couponLabel = (coupon: DashboardOverview["activeCoupons"][number]) =>
  coupon.discountType === "PERCENTAGE" ? `${coupon.discountValue}% off` : coupon.discountType === "FIXED" ? `${formatTaka(coupon.discountValue)} off` : "Free delivery";

export function ActiveCouponsCard({ coupons }: { coupons: DashboardOverview["activeCoupons"] }) {
  const maxUsed = Math.max(...coupons.map((coupon) => coupon.usedCount), 0) || 1;

  return (
    <DashCard id="ac" title="Active coupons" action={<OpenLink href={COUPONS_PATH} label="Open coupons" />}>
      <div className="flex flex-col gap-4">
        {coupons.length === 0 && <p className="py-6 text-center text-[12.5px] text-ink-3">No coupons are running right now.</p>}
        {coupons.map((coupon) => (
          <div key={coupon.id} className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-[13.5px]">
              <span className="flex items-center gap-2">
                <Badge variant="brand" size="sm" className="font-mono font-semibold">
                  {coupon.code}
                </Badge>
                <span className="text-ink-2">{couponLabel(coupon)}</span>
              </span>
              <span className="text-ink-2 tabular-nums">
                {coupon.usedCount}/{coupon.usageLimit ?? "∞"}
              </span>
            </div>
            <Track thin pct={coupon.usageLimit ? (coupon.usedCount / coupon.usageLimit) * 100 : (coupon.usedCount / maxUsed) * 100} />
          </div>
        ))}
      </div>
    </DashCard>
  );
}

export function CaughtUp() {
  return (
    <div className="flex flex-col items-center gap-2 py-7 text-center">
      <Tile icon="check" tone="mint" className="rounded-full" />
      <span className="font-semibold">All caught up</span>
      <span className="text-[12.5px] text-ink-3">No wallet or bank payments waiting.</span>
    </div>
  );
}
