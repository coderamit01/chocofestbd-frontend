import { USER_VIEWS } from "@/config/users";
import type { UsersQuery, UserView } from "@/types/user";

type SearchParams = Record<string, string | string[] | undefined>;

const firstValue = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

export const parseUserView = (value: unknown): UserView =>
  USER_VIEWS.some((view) => view.value === value) ? (value as UserView) : "all";

export function parseUsersQuery(searchParams: SearchParams): UsersQuery {
  const page = Number(firstValue(searchParams.page));
  const search = firstValue(searchParams.search)?.trim();

  return {
    view: parseUserView(firstValue(searchParams.view)),
    page: Number.isInteger(page) && page > 0 ? page : 1,
    ...(search && { search }),
  };
}
