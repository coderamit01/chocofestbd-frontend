import { COUPON_PAGE_SIZE } from "@/config/coupons";
import { serverApiRequest } from "@/lib/server-api";
import type {
  CouponDetail,
  CouponInsights,
  CouponOptions,
  CouponOrder,
  CouponPayload,
  CouponsQuery,
  CouponStats,
} from "@/types/coupon";

const couponUrl = (couponId: string) => `/coupons/admin/${encodeURIComponent(couponId)}`;

export const CouponService = {
  getCoupons: (query: CouponsQuery) => {
    const params = new URLSearchParams({ page: String(query.page), limit: String(COUPON_PAGE_SIZE) });
    if (query.search) params.set("searchTerm", query.search);
    if (query.status !== "all") params.set("status", query.status);
    if (query.type) params.set("discountType", query.type);
    return serverApiRequest<CouponDetail[]>(`/coupons/admin?${params}`);
  },

  getStats: () => serverApiRequest<CouponStats>("/coupons/admin/stats"),

  getOptions: () => serverApiRequest<CouponOptions>("/coupons/admin/options"),

  getCoupon: (couponId: string) => serverApiRequest<CouponDetail>(couponUrl(couponId)),

  getInsights: (couponId: string) => serverApiRequest<CouponInsights>(`${couponUrl(couponId)}/insights`),

  getOrders: (couponId: string, query: { page: number; limit: number; search?: string }) => {
    const params = new URLSearchParams({ page: String(query.page), limit: String(query.limit) });
    if (query.search) params.set("searchTerm", query.search);
    return serverApiRequest<CouponOrder[]>(`${couponUrl(couponId)}/orders?${params}`);
  },

  saveCoupon: (couponId: string | null, payload: CouponPayload) =>
    serverApiRequest<CouponDetail>(couponId ? `/coupons/${encodeURIComponent(couponId)}` : "/coupons", {
      method: couponId ? "PUT" : "POST",
      body: JSON.stringify(payload),
    }),

  setActive: (couponId: string, isActive: boolean) =>
    serverApiRequest<CouponDetail>(`/coupons/${encodeURIComponent(couponId)}`, { method: "PUT", body: JSON.stringify({ isActive }) }),

  moveToTrash: (couponId: string) => serverApiRequest(`/coupons/${encodeURIComponent(couponId)}/trash`, { method: "PATCH" }),
};
