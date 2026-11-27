"use client";

import { usePathname } from "next/navigation";
import { AUTH_ART } from "@/config/auth";

function AuthIllustration() {
  return (
    <svg viewBox="0 0 420 300" aria-hidden="true" className="relative z-1 mt-6 block h-auto w-full">
      <defs>
        <linearGradient id="au-ph" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#ffe9dc" />
        </linearGradient>
        <linearGradient id="au-pod" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd9c2" />
          <stop offset="1" stopColor="#ffb487" />
        </linearGradient>
        <linearGradient id="au-choc" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6b2a12" />
          <stop offset="1" stopColor="#3d1104" />
        </linearGradient>
        <linearGradient id="au-gift" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" />
          <stop offset="1" stopColor="#ffe3d2" />
        </linearGradient>
        <filter id="au-sh" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#8a2c00" floodOpacity=".28" />
        </filter>
      </defs>
      <ellipse cx="210" cy="282" rx="170" ry="16" fill="#c5450a" opacity=".35" />
      <path d="M60 250h300v22a10 10 0 0 1-10 10H70a10 10 0 0 1-10-10z" fill="url(#au-pod)" />
      <ellipse cx="210" cy="250" rx="150" ry="14" fill="#ffe7d8" />
      <g filter="url(#au-sh)">
        <rect x="150" y="40" width="124" height="214" rx="22" fill="#2a0b02" />
        <rect x="157" y="47" width="110" height="200" rx="16" fill="url(#au-ph)" />
        <rect x="190" y="53" width="44" height="7" rx="3.5" fill="#2a0b02" />
        <rect x="167" y="72" width="90" height="44" rx="10" fill="#ee5615" />
        <rect x="175" y="81" width="38" height="5" rx="2.5" fill="#fff" opacity=".7" />
        <rect x="175" y="92" width="58" height="10" rx="5" fill="#fff" />
        <path d="M167 158 l14 -10 14 6 14 -14 14 4 14 -12 18 -6" fill="none" stroke="#ee5615" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="167" y="176" width="90" height="26" rx="8" fill="#fff" />
        <circle cx="180" cy="189" r="6" fill="#ffd9c2" />
        <rect x="191" y="184" width="44" height="4" rx="2" fill="#d8cfc9" />
        <rect x="191" y="191" width="28" height="4" rx="2" fill="#ece6e1" />
        <rect x="167" y="208" width="90" height="26" rx="8" fill="#fff" />
        <circle cx="180" cy="221" r="6" fill="#e6f6ec" />
        <rect x="191" y="216" width="40" height="4" rx="2" fill="#d8cfc9" />
        <rect x="191" y="223" width="24" height="4" rx="2" fill="#ece6e1" />
      </g>
      <g filter="url(#au-sh)" transform="rotate(-10 100 205)">
        <rect x="58" y="168" width="88" height="70" rx="12" fill="url(#au-gift)" />
        <rect x="52" y="156" width="100" height="22" rx="8" fill="#fff" />
        <rect x="96" y="156" width="12" height="82" fill="#ee5615" />
        <path d="M102 156c-14-20-34-14-26-2 4 5 16 4 26 2zM102 156c14-20 34-14 26-2-4 5-16 4-26 2z" fill="#ee5615" />
      </g>
      <g filter="url(#au-sh)" transform="rotate(12 330 195)">
        <rect x="288" y="128" width="84" height="120" rx="10" fill="url(#au-choc)" />
        <g fill="#7a3418" opacity=".9">
          <rect x="296" y="136" width="32" height="24" rx="5" />
          <rect x="332" y="136" width="32" height="24" rx="5" />
          <rect x="296" y="164" width="32" height="24" rx="5" />
          <rect x="332" y="164" width="32" height="24" rx="5" />
        </g>
        <rect x="284" y="192" width="92" height="58" rx="8" fill="#ee5615" />
        <rect x="296" y="208" width="52" height="7" rx="3.5" fill="#fff" />
        <rect x="296" y="221" width="34" height="5" rx="2.5" fill="#fff" opacity=".7" />
      </g>
      <g fill="#fff">
        <circle cx="70" cy="70" r="4" opacity=".7" />
        <circle cx="356" cy="64" r="3" opacity=".6" />
        <path d="M330 98l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" opacity=".8" />
        <path d="M92 112l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" opacity=".7" />
      </g>
    </svg>
  );
}

export function AuthArt() {
  const pathname = usePathname();
  const copy = AUTH_ART[pathname.startsWith("/signup") ? "signup" : "login"];

  return (
    <aside
      aria-hidden="true"
      className="relative flex flex-[0_0_46%] flex-col justify-between overflow-hidden rounded-[26px] bg-[linear-gradient(160deg,#ff7a2f_0%,#ee5615_42%,#ffb07e_100%)] px-10 pt-11 text-white before:absolute before:-top-[90px] before:-right-[90px] before:size-[280px] before:rounded-full before:bg-white/10 before:content-[''] after:absolute after:bottom-[120px] after:-left-[60px] after:size-[180px] after:rounded-full after:bg-white/8 after:content-[''] max-[860px]:hidden"
    >
      <div className="relative z-1">
        <h2 className="m-0 mb-[18px] max-w-105 font-heading text-[40px] leading-[1.15] font-bold tracking-[-0.02em] text-white max-[1000px]:text-[32px]">
          {copy.lead}{" "}
          <span className="relative inline-block whitespace-nowrap">
            {copy.highlight}
            <svg viewBox="0 0 220 18" preserveAspectRatio="none" className="absolute right-0 -bottom-2.5 left-0 h-3.5 w-full">
              <path d="M4 13c40-9 120-12 212-6" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </span>
        </h2>
        <p className="m-0 max-w-85 text-[14.5px] leading-[1.6] font-medium text-[#fff3ea]">{copy.body}</p>
      </div>
      <AuthIllustration />
    </aside>
  );
}
