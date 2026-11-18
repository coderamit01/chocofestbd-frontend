import { AuthDivider } from "./auth-divider";
import { SocialAuthButtons } from "./social-auth-buttons";

type AuthSocialSectionProps = {
  label: string;
  onError: (message: string) => void;
};

export function AuthSocialSection({ label, onError }: AuthSocialSectionProps) {
  return (
    <div className="mt-6 flex flex-col gap-6">
      <AuthDivider label={label} />
      <SocialAuthButtons onError={onError} />
    </div>
  );
}
