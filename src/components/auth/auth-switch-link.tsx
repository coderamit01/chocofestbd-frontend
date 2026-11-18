import Link from "next/link";

type AuthSwitchLinkProps = {
  question: string;
  label: string;
  href: string;
};

export function AuthSwitchLink({ question, label, href }: AuthSwitchLinkProps) {
  return (
    <p className="text-center text-sm text-muted-foreground">
      {question}{" "}
      <Link
        href={href}
        className="font-medium text-secondary underline underline-offset-4 transition-colors hover:text-secondary/80"
      >
        {label}
      </Link>
    </p>
  );
}
