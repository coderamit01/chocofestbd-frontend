type AuthHeaderProps = {
  title: string;
  description: string;
};

export function AuthHeader({ title, description }: AuthHeaderProps) {
  return (
    <header className="flex flex-col gap-2">
      <h2 className="text-[32px] leading-[1.2]">{title}</h2>
      <p className="text-ink-2">{description}</p>
    </header>
  );
}
