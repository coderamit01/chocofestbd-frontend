import { Icon } from "@/components/shared/icon";

type WhatsAppButtonProps = { href: string; label: string };

export function WhatsAppButton({ href, label }: WhatsAppButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-6 bottom-6 z-30 flex h-14 items-center gap-2.5 rounded-full bg-[#25d366] pr-[18px] pl-[15px] font-sans text-sm leading-none font-semibold text-white no-underline shadow-[0_12px_26px_-8px_rgba(37,211,102,.6)] hover:-translate-y-0.5 hover:brightness-105 max-[900px]:right-4 max-[900px]:bottom-20 max-[900px]:w-14 max-[900px]:justify-center max-[900px]:p-0"
    >
      <Icon name="whatsapp" size={26} strokeWidth={1.8} />
      <span className="max-[900px]:hidden">{label}</span>
    </a>
  );
}
