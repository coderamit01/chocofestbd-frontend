import { PASSWORD_RULES, PASSWORD_STRENGTH } from "@/config/auth";

export const passwordScore = (value: string) => PASSWORD_RULES.filter((rule) => rule(value)).length;

export function PasswordStrength({ value }: { value: string }) {
  if (!value) return null;

  const score = passwordScore(value);
  const shown = Math.max(score, 1);
  const { color } = PASSWORD_STRENGTH[shown];

  return (
    <div className="-mt-1 flex items-center gap-3 px-1" aria-live="polite">
      <div className="grid flex-1 grid-cols-4 gap-1.5">
        {PASSWORD_RULES.map((_, index) => (
          <i
            key={index}
            className="h-1 rounded-[4px] transition-colors duration-200"
            style={{ backgroundColor: index < shown ? color : "#ebe5df" }}
          />
        ))}
      </div>
      <span className="text-xs font-semibold whitespace-nowrap" style={{ color }}>
        {PASSWORD_STRENGTH[score].label}
      </span>
    </div>
  );
}
