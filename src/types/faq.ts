export type Faq = {
  id: string;
  question: string;
  answer: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type FaqFormValues = {
  question: string;
  answer: string;
  isActive: boolean;
};

export type FaqPayload = FaqFormValues & { sortOrder?: number };
