import { BrandLogo } from "@/components/shared/brand-logo";

type AuthHeaderProps = {
  title: string;
  description: string;
};

export function AuthHeader({ title, description }: AuthHeaderProps) {
  return (
    <header className="flex flex-col items-center text-center">
      <BrandLogo priority />
      <h1 className="mt-6 text-[32px] leading-tight font-bold tracking-tight text-foreground">{title}</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
    </header>
  );
}
