import { SettingsTile } from "@/components/admin/settings/settings-field";
import { Icon } from "@/components/shared/icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ProfileSession } from "@/types/profile";
import { ProfileCard, ProfileCardNote, ProfileCardTitle } from "./profile-card";

type ProfileSessionsCardProps = {
  sessions: ProfileSession[];
  pendingToken: string | null;
  onSignOut: (session: ProfileSession) => void;
  onSignOutOthers: () => void;
};

export function ProfileSessionsCard({ sessions, pendingToken, onSignOut, onSignOutOthers }: ProfileSessionsCardProps) {
  const hasOthers = sessions.some((session) => !session.current);

  return (
    <ProfileCard className="gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <SettingsTile icon="globe" tone="sky" />
        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <ProfileCardTitle>Where you’re signed in</ProfileCardTitle>
          <ProfileCardNote>
            {sessions.length} active {sessions.length === 1 ? "session" : "sessions"}. Sign out any you don’t recognise.
          </ProfileCardNote>
        </span>
        <Button variant="outline" className="text-danger hover:text-danger" onClick={onSignOutOthers} disabled={!hasOthers}>
          <Icon name="logout" size={17} strokeWidth={1.8} />
          Sign out all others
        </Button>
      </div>

      <div className="flex flex-col">
        {sessions.map((session) => (
          <div key={session.id} className="flex flex-wrap items-center gap-3.5 border-t border-dashed border-line-dash py-4">
            <span className="flex size-11 flex-none items-center justify-center rounded-[36%] bg-surface-3 text-ink-2">
              <Icon name={session.icon} size={20} strokeWidth={1.8} />
            </span>
            <span className="flex min-w-50 flex-1 flex-col gap-[3px]">
              <span className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-ink">{session.device}</span>
                {session.current && (
                  <Badge variant="success" size="sm">
                    This device
                  </Badge>
                )}
              </span>
              {session.ip && <span className="text-xs text-ink-3 tabular-nums">{session.ip}</span>}
            </span>
            <ProfileCardNote className="min-w-30">{session.seen}</ProfileCardNote>
            {!session.current && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSignOut(session)}
                disabled={pendingToken !== null && pendingToken !== session.token}
                aria-busy={pendingToken === session.token || undefined}
              >
                {pendingToken === session.token ? "Signing out…" : "Sign out"}
              </Button>
            )}
          </div>
        ))}
      </div>
    </ProfileCard>
  );
}
