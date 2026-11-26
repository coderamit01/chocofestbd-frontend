import Link from "next/link";

type AuthSwitchLinkProps = {
  question: string;
  label: string;
  href: string;
};

export function AuthSwitchLink({ question, label, href }: AuthSwitchLinkProps) {
  return (
    <p className="text-center text-xs text-ink-3">
      {question}{" "}
      <Link href={href} className="font-medium">
        {label}
      </Link>
    </p>
  );
}
