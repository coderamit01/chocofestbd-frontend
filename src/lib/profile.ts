import { ADMIN_NAV } from "@/config/admin-nav";
import { PASSWORD_STRENGTH, PASSWORD_STRENGTH_EMPTY, PROFILE_PHONE_PATTERN, PROFILE_TABS } from "@/config/profile";
import { relativeDhakaTime } from "@/lib/dhaka-time";
import type { UserRole } from "@/types/auth";
import type {
  AuthSession,
  PasswordErrors,
  PasswordValues,
  ProfileAccess,
  ProfileInfoErrors,
  ProfileInfoValues,
  ProfileSession,
  ProfileTab,
} from "@/types/profile";

const HOUR = 60 * 60 * 1000;
const RECENT_WINDOW = 12 * HOUR;

const joinedFormat = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Dhaka", month: "short", year: "numeric" });

export const joinedLabel = (value: string) => joinedFormat.format(new Date(value));

export const parseProfileTab = (value: string | string[] | undefined): ProfileTab =>
  PROFILE_TABS.find((tab) => tab.value === value)?.value ?? "info";

export const cleanPhoneInput = (value: string) => value.replace(/\D/g, "").slice(0, 11);

export const validateProfileInfo = (values: ProfileInfoValues): ProfileInfoErrors => {
  const errors: ProfileInfoErrors = {};
  if (!values.name.trim()) errors.name = true;
  if (!PROFILE_PHONE_PATTERN.test(values.phone)) errors.phone = true;
  return errors;
};

export const passwordChecks = (password: string) => [
  password.length >= 8,
  /\d/.test(password),
  /[A-Z]/.test(password) && /[a-z]/.test(password),
  /[^A-Za-z0-9]/.test(password),
];

export const passwordStrength = (password: string) =>
  password ? PASSWORD_STRENGTH[passwordChecks(password).filter(Boolean).length] : PASSWORD_STRENGTH_EMPTY;

export const validatePassword = (values: PasswordValues): PasswordErrors => {
  const errors: PasswordErrors = {};
  if (passwordChecks(values.next).some((ok) => !ok)) errors.next = true;
  if (!values.confirm || values.confirm !== values.next) errors.confirm = true;
  return errors;
};

const BROWSERS: [RegExp, string][] = [
  [/Edg\//, "Edge"],
  [/OPR\/|Opera/, "Opera"],
  [/SamsungBrowser/, "Samsung Internet"],
  [/Firefox\/|FxiOS/, "Firefox"],
  [/Chrome\/|CriOS/, "Chrome"],
  [/Safari\//, "Safari"],
];

const SYSTEMS: [RegExp, string, boolean][] = [
  [/iPhone/, "iPhone", true],
  [/iPad/, "iPad", true],
  [/Android/, "Android", true],
  [/Windows/, "Windows", false],
  [/Mac OS X|Macintosh/, "macOS", false],
  [/CrOS/, "ChromeOS", false],
  [/Linux/, "Linux", false],
];

export const describeUserAgent = (userAgent?: string | null) => {
  const agent = userAgent ?? "";
  const browser = BROWSERS.find(([pattern]) => pattern.test(agent))?.[1];
  const system = SYSTEMS.find(([pattern]) => pattern.test(agent));
  const device = browser && system ? `${browser} on ${system[1]}` : browser ?? system?.[1] ?? "Unknown device";
  return { device, icon: system?.[2] ? ("phone" as const) : ("grid" as const) };
};

const seenLabel = (value: string, now: number) => {
  const elapsed = now - new Date(value).getTime();
  if (elapsed < HOUR) return `${Math.max(1, Math.floor(elapsed / 60_000))} min ago`;
  if (elapsed < RECENT_WINDOW) {
    const hours = Math.floor(elapsed / HOUR);
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  }
  return relativeDhakaTime(value, now);
};

export const toProfileSessions = (sessions: AuthSession[], currentId: string | null, now: number): ProfileSession[] =>
  [...sessions]
    .sort(
      (a, b) =>
        Number(b.id === currentId) - Number(a.id === currentId) ||
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .map((session) => ({
      id: session.id,
      token: session.token,
      ...describeUserAgent(session.userAgent),
      ip: session.ipAddress || null,
      seen: session.id === currentId ? "Active now" : seenLabel(session.updatedAt, now),
      current: session.id === currentId,
    }));

export const profileAccess = (role: UserRole): ProfileAccess => {
  const items = ADMIN_NAV.flatMap((section) => section.items).filter(
    (item) => item.roles.includes(role) || !item.roles.includes("RIDER")
  );
  return {
    can: items.filter((item) => item.roles.includes(role)).map((item) => item.title),
    cannot: items.filter((item) => !item.roles.includes(role)).map((item) => item.title),
  };
};
