import { useId } from "react";
import { Icon } from "@/components/shared/icon";
import { Spinner } from "@/components/shared/spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PROFILE_ROLES } from "@/config/profile";
import { joinedLabel } from "@/lib/profile";
import { cn, formatPhone, getInitials } from "@/lib/utils";
import type { Profile } from "@/types/profile";

type ProfileHeroProps = {
  profile: Profile;
  name: string;
  phone: string | null;
  isUploading: boolean;
  onChangePhoto: () => void;
  onEdit: () => void;
};

export function ProfileHero({
  profile,
  name,
  phone,
  isUploading,
  onChangePhoto,
  onEdit,
}: ProfileHeroProps) {
  const patternId = useId();
  const role = PROFILE_ROLES[profile.role];

  return (
    <section className="overflow-hidden rounded-xl bg-card">
      <div className="relative h-33 bg-[linear-gradient(120deg,var(--choco)_0%,#7a2a0c_55%,var(--brand)_130%)]">
        <svg
          width="100%"
          height="132"
          className="absolute inset-0 opacity-14"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id={patternId}
              width="22"
              height="22"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.6" fill="#fff" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#${patternId})`} />
        </svg>
      </div>

      <div className="px-7 pb-6">
        <div className="relative -mt-12 flex flex-wrap items-end gap-5">
          <div className="relative flex-none">
            <Avatar className="size-28 rounded-[30px] border-5 border-surface after:hidden">
              {profile.image && (
                <AvatarImage
                  src={profile.image}
                  alt={name}
                  className="rounded-[25px]"
                />
              )}
              <AvatarFallback
                className={cn(
                  "rounded-[25px] font-heading text-[38px] leading-none font-semibold",
                  role.avatar,
                )}
              >
                {getInitials(name)}
              </AvatarFallback>
            </Avatar>
            <button
              type="button"
              aria-label="Change photo"
              title="Change photo"
              onClick={onChangePhoto}
              aria-busy={isUploading || undefined}
              className="absolute -right-1 bottom-0.5 flex size-9 items-center justify-center rounded-[12px] border-3 border-surface bg-brand text-white outline-none hover:bg-brand-hover focus-visible:shadow-focus aria-busy:pointer-events-none"
            >
              {isUploading ? (
                <Spinner />
              ) : (
                <Icon name="upload" size={16} strokeWidth={1.8} />
              )}
            </button>
          </div>

          <div className="flex min-w-60 flex-1 flex-col gap-2 py-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <h2 className="font-heading text-[26px] leading-[1.3] font-semibold text-ink">
                {name}
              </h2>
              <Badge variant="dark" size="sm">
                {profile.role}
              </Badge>
              <Badge variant="success" size="sm">
                <span className="size-1.5 rounded-full bg-current" />
                Active
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-5 text-[12.5px] text-ink-3">
              <span className="flex items-center gap-1.5">
                <Icon name="staff" size={16} strokeWidth={1.8} />
                {role.name}
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="send" size={16} strokeWidth={1.8} />
                {profile.email}
              </span>
              {phone && (
                <span className="flex items-center gap-1.5 tabular-nums">
                  <Icon name="phone" size={16} strokeWidth={1.8} />
                  {formatPhone(phone)}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Icon name="cal" size={16} strokeWidth={1.8} />
                Joined {joinedLabel(profile.createdAt)}
              </span>
            </div>
          </div>

          <div className="flex gap-2.5 pb-1">
            <Button onClick={onEdit}>
              <Icon name="edit" size={17} strokeWidth={1.8} />
              Edit profile
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
