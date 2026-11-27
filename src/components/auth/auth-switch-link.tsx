import Link from "next/link";
import { authStyles } from "@/lib/auth-styles";

type AuthSwitchLinkProps = {
  question: string;
  label: string;
  href: string;
};

export function AuthSwitchLink({ question, label, href }: AuthSwitchLinkProps) {
  return (
    <p className={authStyles.alt}>
      {question}{" "}
      <Link href={href} className={authStyles.link}>
        {label}
      </Link>
    </p>
  );
}
