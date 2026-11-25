import { USERS_PAGE_SIZE } from "@/config/users";
import { serverApiRequest } from "@/lib/server-api";
import type { UserRole } from "@/types/auth";
import type { User, UsersQuery, UserView } from "@/types/user";

const LIST_ENDPOINTS: Record<UserView, string> = {
  all: "/users",
  customers: "/users/customers",
  trash: "/users/trash",
};

export type UpdateUserPayload = {
  name?: string;
  phone?: string;
  role?: UserRole;
  isBanned?: boolean;
};

const ALL_USERS_PAGE_SIZE = 100;

const fetchUsersPage = (page: number) =>
  serverApiRequest<User[]>(`/users?${new URLSearchParams({ page: String(page), limit: String(ALL_USERS_PAGE_SIZE) })}`);

export const UserService = {
  getUsers: ({ view, page, search }: UsersQuery) => {
    const params = new URLSearchParams({ page: String(page), limit: String(USERS_PAGE_SIZE) });
    if (search) params.set("searchTerm", search);

    return serverApiRequest<User[]>(`${LIST_ENDPOINTS[view]}?${params}`);
  },

  getStaff: async () => {
    const first = await fetchUsersPage(1);
    const totalPages = first.meta?.totalPages ?? 1;
    const rest = await Promise.all(
      Array.from({ length: Math.max(totalPages - 1, 0) }, (_, index) => fetchUsersPage(index + 2))
    );

    return [first, ...rest].flatMap((response) => response.data ?? []).filter((user) => user.role !== "CUSTOMER");
  },

  updateUser: (userId: string, { name, phone, role, isBanned }: UpdateUserPayload) =>
    serverApiRequest<User>(`/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify({
        ...(name !== undefined && { name }),
        ...(phone !== undefined && { phone }),
        ...(role && { role }),
        ...(isBanned !== undefined && { isBanned: String(isBanned) }),
      }),
    }),

  moveToTrash: (userId: string) => serverApiRequest(`/users/${userId}/trash`, { method: "PATCH" }),

  restore: (userId: string) => serverApiRequest<User>(`/users/${userId}/restore`, { method: "PATCH" }),

  deletePermanently: (userId: string) => serverApiRequest(`/users/${userId}`, { method: "DELETE" }),
};
