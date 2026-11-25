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
  role?: UserRole;
  isBanned?: boolean;
};

export const UserService = {
  getUsers: ({ view, page, search }: UsersQuery) => {
    const params = new URLSearchParams({ page: String(page), limit: String(USERS_PAGE_SIZE) });
    if (search) params.set("searchTerm", search);

    return serverApiRequest<User[]>(`${LIST_ENDPOINTS[view]}?${params}`);
  },

  updateUser: (userId: string, { role, isBanned }: UpdateUserPayload) =>
    serverApiRequest<User>(`/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify({
        ...(role && { role }),
        ...(isBanned !== undefined && { isBanned: String(isBanned) }),
      }),
    }),

  moveToTrash: (userId: string) => serverApiRequest(`/users/${userId}/trash`, { method: "PATCH" }),

  restore: (userId: string) => serverApiRequest<User>(`/users/${userId}/restore`, { method: "PATCH" }),

  deletePermanently: (userId: string) => serverApiRequest(`/users/${userId}`, { method: "DELETE" }),
};
