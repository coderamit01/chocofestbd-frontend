import { COOKIE_BITES } from "@/config/not-found";

type ChocolateCookieProps = {
  bites: number;
  label: string;
  onBite: () => void;
};

export function ChocolateCookie({ bites, label, onBite }: ChocolateCookieProps) {
  return (
    <button
      type="button"
      onClick={onBite}
      aria-label={label}
      title={label}
      className="relative size-[150px] cursor-pointer rounded-full border-0 bg-transparent p-0 drop-shadow-[0_14px_18px_rgb(61_17_4/28%)] outline-none transition-transform duration-200 ease-[cubic-bezier(.2,1.4,.4,1)] hover:scale-105 hover:-rotate-10 focus-visible:shadow-[0_0_0_5px_rgb(238_86_21/30%)] active:scale-[0.92] max-[900px]:size-[92px]"
    >
      <svg viewBox="0 0 140 140" aria-hidden="true" className="size-full">
        <defs>
          <mask id="cookie-bites">
            <rect width="140" height="140" fill="#fff" />
            {COOKIE_BITES.map((bite, index) => (
              <circle
                key={index}
                cx={bite.cx}
                cy={bite.cy}
                r={bites > index ? bite.r : 0}
                fill="#000"
                className="transition-[r] duration-250 ease-out"
              />
            ))}
          </mask>
          <radialGradient id="cookie-fill" cx="35%" cy="30%" r="75%">
            <stop offset="0" stopColor="#7a2f12" />
            <stop offset="1" stopColor="#3d1104" />
          </radialGradient>
        </defs>
        <g mask="url(#cookie-bites)">
          <circle cx="70" cy="70" r="62" fill="url(#cookie-fill)" />
          <circle cx="70" cy="70" r="50" fill="none" stroke="#5a1f0b" strokeWidth="3" strokeDasharray="4 7" />
          <g fill="#ee5615">
            <ellipse cx="48" cy="46" rx="7" ry="5" transform="rotate(-20 48 46)" />
            <ellipse cx="88" cy="58" rx="6" ry="4.5" transform="rotate(25 88 58)" />
            <ellipse cx="58" cy="90" rx="6.5" ry="5" transform="rotate(10 58 90)" />
            <ellipse cx="94" cy="96" rx="5" ry="4" />
          </g>
          <g fill="#fff" opacity=".9">
            <ellipse cx="70" cy="38" rx="4" ry="3" />
            <ellipse cx="38" cy="74" rx="4" ry="3" />
            <ellipse cx="76" cy="76" rx="3.5" ry="2.6" />
          </g>
          <path d="M30 40a50 50 0 0 1 30-24" fill="none" stroke="#fff" strokeOpacity=".25" strokeWidth="5" strokeLinecap="round" />
        </g>
      </svg>
      {bites > 0 && (
        <span key={bites} className="pointer-events-none absolute inset-0">
          {["top-7 right-1.5", "top-[70px] right-0 [animation-delay:.05s]", "right-[30px] bottom-1 [animation-delay:.1s]"].map((position) => (
            <i
              key={position}
              className={`absolute size-[7px] animate-[crumb_.6s_ease-out_both] rounded-[2px] bg-[#5a1f0b] opacity-0 ${position}`}
            />
          ))}
        </span>
      )}
    </button>
  );
}
