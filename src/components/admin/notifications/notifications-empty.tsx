import { EmptyState } from "@/components/shared/empty-state";

export function NotificationsEmpty() {
  return <EmptyState title="You’re all caught up" description="No notifications match this filter." />;
}
