import { FAQ_LIST_LIMIT } from "@/config/faqs";
import { serverApiRequest } from "@/lib/server-api";
import type { Faq, FaqPayload } from "@/types/faq";

const fetchFaqsPage = (page: number) => serverApiRequest<Faq[]>(`/faqs/admin?page=${page}&limit=${FAQ_LIST_LIMIT}`);

export const FaqService = {
  getAllFaqs: async () => {
    const first = await fetchFaqsPage(1);
    const totalPages = first.meta?.totalPages ?? 1;
    const rest = await Promise.all(Array.from({ length: Math.max(totalPages - 1, 0) }, (_, index) => fetchFaqsPage(index + 2)));
    return [first, ...rest].flatMap((response) => response.data ?? []);
  },

  saveFaq: (faqId: string | null, payload: FaqPayload) =>
    serverApiRequest<Faq>(faqId ? `/faqs/${faqId}` : "/faqs", { method: faqId ? "PUT" : "POST", body: JSON.stringify(payload) }),

  updateFaq: (faqId: string, body: Partial<FaqPayload>) => serverApiRequest<Faq>(`/faqs/${faqId}`, { method: "PUT", body: JSON.stringify(body) }),

  deleteFaq: (faqId: string) => serverApiRequest(`/faqs/${faqId}`, { method: "DELETE" }),
};
