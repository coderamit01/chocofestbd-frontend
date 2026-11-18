type AuthHeaderProps = {
  title: string;
  description: string;
};

export function AuthHeader({ title, description }: AuthHeaderProps) {
  return (
    <header className="flex flex-col items-center text-center">
      <h1 className="text-[32px] leading-tight font-bold tracking-tight text-foreground">{title}</h1>
      <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
    </header>
  );
}
