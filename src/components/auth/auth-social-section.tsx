import { AuthDivider } from "./auth-divider";
import { SocialAuthButtons } from "./social-auth-buttons";

type AuthSocialSectionProps = {
  label: string;
  onError: (message: string) => void;
};

export function AuthSocialSection({ label, onError }: AuthSocialSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <AuthDivider label={label} />
      <SocialAuthButtons onError={onError} />
    </div>
  );
}
