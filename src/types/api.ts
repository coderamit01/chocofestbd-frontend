export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type ActionResult = {
  success: boolean;
  message: string;
};
