import { AlertCircleIcon, UsersIcon } from "lucide-react";
import { DataPagination } from "@/components/shared/data-pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getCurrentUser } from "@/lib/current-user";
import { ApiError } from "@/lib/api-client";
import { parseUsersQuery } from "@/lib/user-query";
import { formatDate, getInitials } from "@/lib/utils";
import { UserService } from "@/services/user.service";
import type { SessionUser } from "@/types/auth";
import type { User, UsersQuery, UserView } from "@/types/user";
import { RoleBadge, UserStatusBadge } from "./user-badges";
import { UserRowActions } from "./user-row-actions";

type UsersTableProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const canManage = (actor: SessionUser | null, target: User) =>
  !!actor?.role && actor.id !== target.id && (actor.role === "SUPER_ADMIN" || target.role !== "SUPER_ADMIN");

async function loadUsers(query: UsersQuery) {
  try {
    const [currentUser, response] = await Promise.all([getCurrentUser(), UserService.getUsers(query)]);
    return { currentUser, users: response.data ?? [], meta: response.meta, error: null };
  } catch (error) {
    return {
      currentUser: null,
      users: [],
      meta: undefined,
      error: error instanceof ApiError ? error.message : "Something went wrong while loading users. Please refresh the page.",
    };
  }
}

export async function UsersTable({ searchParams }: UsersTableProps) {
  const query = parseUsersQuery(await searchParams);
  const { currentUser, users, meta, error } = await loadUsers(query);

  if (error) return <UsersErrorState message={error} />;

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="pl-4">User</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Points</TableHead>
              <TableHead>{query.view === "trash" ? "Trashed" : "Joined"}</TableHead>
              <TableHead className="w-12 pr-4">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <UsersEmptyRow view={query.view} hasSearch={!!query.search} />
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="pl-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9">
                        {user.image && <AvatarImage src={user.image} alt={user.name} />}
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="flex items-center gap-2 truncate font-medium text-foreground">
                          {user.name}
                          {currentUser?.id === user.id && (
                            <Badge variant="outline" className="h-4.5 px-1.5 text-[10px]">
                              You
                            </Badge>
                          )}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{user.phone ?? "—"}</TableCell>
                  <TableCell>
                    <RoleBadge role={user.role} />
                  </TableCell>
                  <TableCell>
                    <UserStatusBadge user={user} />
                  </TableCell>
                  <TableCell className="text-right tabular-nums">{user.points}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(query.view === "trash" && user.deletedAt ? user.deletedAt : user.createdAt)}
                  </TableCell>
                  <TableCell className="pr-4 text-right">
                    {currentUser?.role && canManage(currentUser, user) && (
                      <UserRowActions user={user} view={query.view} actorRole={currentUser.role} />
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {meta && (
        <DataPagination
          meta={meta}
          pathname="/admin/users"
          query={{ view: query.view === "all" ? undefined : query.view, search: query.search }}
        />
      )}
    </div>
  );
}

function UsersEmptyRow({ view, hasSearch }: { view: UserView; hasSearch: boolean }) {
  const message = hasSearch
    ? "No users match your search. Try a different name, email or phone."
    : view === "trash"
      ? "Trash is empty. Users you move to trash will appear here."
      : "No users yet.";

  return (
    <TableRow className="hover:bg-transparent">
      <TableCell colSpan={7} className="py-16">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="flex size-12 items-center justify-center rounded-2xl bg-accent text-secondary">
            <UsersIcon className="size-6" />
          </span>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
      </TableCell>
    </TableRow>
  );
}

function UsersErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-destructive/20 bg-destructive/5 px-6 py-16 text-center">
      <AlertCircleIcon className="size-8 text-destructive" />
      <p className="font-medium text-foreground">Couldn&apos;t load users</p>
      <p className="max-w-sm text-sm text-muted-foreground">{message}</p>
    </div>
  );
}
