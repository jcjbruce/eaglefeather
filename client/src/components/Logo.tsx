export function EagleFeatherLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="EagleFeather logo"
      role="img"
    >
      {/* Outer ring with earth tones */}
      <circle cx="28" cy="28" r="27" stroke="#0A6E60" strokeWidth="2" fill="none" />

      {/* Medicine wheel quadrants — four sacred directions */}
      {/* East (yellow) — top-right */}
      <path d="M28 1.5 A26.5 26.5 0 0 1 54.5 28 L28 28 Z" fill="#D4A843" opacity="0.15" />
      {/* South (red) — bottom-right */}
      <path d="M54.5 28 A26.5 26.5 0 0 1 28 54.5 L28 28 Z" fill="#8B2500" opacity="0.12" />
      {/* West (black/dark) — bottom-left */}
      <path d="M28 54.5 A26.5 26.5 0 0 1 1.5 28 L28 28 Z" fill="#1a3a35" opacity="0.12" />
      {/* North (white) — top-left */}
      <path d="M1.5 28 A26.5 26.5 0 0 1 28 1.5 L28 28 Z" fill="#ffffff" opacity="0.12" />

      {/* Eagle feather — main shape */}
      <path
        d="M28 6C28 6 20.5 13 20.5 26C20.5 39 28 46 28 46C28 46 35.5 39 35.5 26C35.5 13 28 6 28 6Z"
        fill="white"
        stroke="#0A6E60"
        strokeWidth="0.6"
      />

      {/* Feather tip — darker at top */}
      <path
        d="M28 6C28 6 24 10 23 14C25 12 28 10 28 10C28 10 31 12 33 14C32 10 28 6 28 6Z"
        fill="#D4A843"
        opacity="0.5"
      />

      {/* Central rachis (quill shaft) */}
      <line x1="28" y1="9" x2="28" y2="44" stroke="#0A6E60" strokeWidth="1.4" strokeLinecap="round" />

      {/* Left barbs — flowing curves */}
      <path d="M28 13 Q23 14.5 21.5 17" stroke="#0A6E60" strokeWidth="0.7" strokeLinecap="round" fill="none" />
      <path d="M28 17 Q22.5 19 21 21.5" stroke="#0A6E60" strokeWidth="0.7" strokeLinecap="round" fill="none" />
      <path d="M28 21 Q22 23.5 20.8 26" stroke="#0A6E60" strokeWidth="0.7" strokeLinecap="round" fill="none" />
      <path d="M28 25 Q22.5 27 21 29.5" stroke="#0A6E60" strokeWidth="0.7" strokeLinecap="round" fill="none" />
      <path d="M28 29 Q23 31 21.5 33" stroke="#0A6E60" strokeWidth="0.7" strokeLinecap="round" fill="none" />
      <path d="M28 33 Q24 35 22.5 36.5" stroke="#0A6E60" strokeWidth="0.7" strokeLinecap="round" fill="none" />
      <path d="M28 37 Q25 38.5 24 39.5" stroke="#0A6E60" strokeWidth="0.7" strokeLinecap="round" fill="none" />

      {/* Right barbs — flowing curves */}
      <path d="M28 13 Q33 14.5 34.5 17" stroke="#0A6E60" strokeWidth="0.7" strokeLinecap="round" fill="none" />
      <path d="M28 17 Q33.5 19 35 21.5" stroke="#0A6E60" strokeWidth="0.7" strokeLinecap="round" fill="none" />
      <path d="M28 21 Q34 23.5 35.2 26" stroke="#0A6E60" strokeWidth="0.7" strokeLinecap="round" fill="none" />
      <path d="M28 25 Q33.5 27 35 29.5" stroke="#0A6E60" strokeWidth="0.7" strokeLinecap="round" fill="none" />
      <path d="M28 29 Q33 31 34.5 33" stroke="#0A6E60" strokeWidth="0.7" strokeLinecap="round" fill="none" />
      <path d="M28 33 Q32 35 33.5 36.5" stroke="#0A6E60" strokeWidth="0.7" strokeLinecap="round" fill="none" />
      <path d="M28 37 Q31 38.5 32 39.5" stroke="#0A6E60" strokeWidth="0.7" strokeLinecap="round" fill="none" />

      {/* Medicine wheel four-dot center */}
      <circle cx="28" cy="28" r="3" fill="#0A6E60" />
      <circle cx="26.5" cy="26.8" r="0.9" fill="#D4A843" /> {/* East — yellow */}
      <circle cx="29.5" cy="26.8" r="0.9" fill="#ffffff" /> {/* North — white */}
      <circle cx="29.5" cy="29.2" r="0.9" fill="#8B2500" /> {/* South — red */}
      <circle cx="26.5" cy="29.2" r="0.9" fill="#1a3a35" /> {/* West — dark */}

      {/* Gold beading at quill base */}
      <circle cx="28" cy="44" r="1.2" fill="#D4A843" />
      <circle cx="26.5" cy="43.5" r="0.6" fill="#D4A843" opacity="0.7" />
      <circle cx="29.5" cy="43.5" r="0.6" fill="#D4A843" opacity="0.7" />
    </svg>
  );
}
