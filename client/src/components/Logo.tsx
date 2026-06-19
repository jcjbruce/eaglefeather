export function EagleFeatherLogo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="EagleFeather logo"
      role="img"
    >
      {/* Green circle background */}
      <circle cx="24" cy="24" r="24" fill="#0A6E60" />

      {/* Feather icon — golden/amber color, matching the site accent */}
      <g transform="translate(12, 8) scale(1.1)">
        {/* Feather body */}
        <path
          d="M11 4C11 4 5.5 9.5 5.5 18C5.5 26.5 11 30 11 30C11 30 16.5 26.5 16.5 18C16.5 9.5 11 4 11 4Z"
          fill="none"
          stroke="#D4A843"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Rachis (quill shaft) */}
        <line x1="11" y1="6" x2="11" y2="29" stroke="#D4A843" strokeWidth="1.6" strokeLinecap="round" />
        {/* Left barbs */}
        <path d="M11 10 Q8 11 6.5 13" stroke="#D4A843" strokeWidth="1.1" strokeLinecap="round" fill="none" />
        <path d="M11 14 Q7.5 15.5 6 17.5" stroke="#D4A843" strokeWidth="1.1" strokeLinecap="round" fill="none" />
        <path d="M11 18 Q7.5 19.5 6 21.5" stroke="#D4A843" strokeWidth="1.1" strokeLinecap="round" fill="none" />
        <path d="M11 22 Q8 23.5 7 25" stroke="#D4A843" strokeWidth="1.1" strokeLinecap="round" fill="none" />
        {/* Right barbs */}
        <path d="M11 10 Q14 11 15.5 13" stroke="#D4A843" strokeWidth="1.1" strokeLinecap="round" fill="none" />
        <path d="M11 14 Q14.5 15.5 16 17.5" stroke="#D4A843" strokeWidth="1.1" strokeLinecap="round" fill="none" />
        <path d="M11 18 Q14.5 19.5 16 21.5" stroke="#D4A843" strokeWidth="1.1" strokeLinecap="round" fill="none" />
        <path d="M11 22 Q14 23.5 15 25" stroke="#D4A843" strokeWidth="1.1" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}
