// NutriGenie mark: a barbell running through the letter N.
export default function Logo({ size = 60 }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-label="NutriGenie">
      <defs>
        <linearGradient id="mg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f8e2a0" /><stop offset=".5" stopColor="#d4a84b" /><stop offset="1" stopColor="#8f6a22" />
        </linearGradient>
      </defs>
      <g fill="url(#mg)">
        <rect x="2" y="21" width="4" height="22" rx="1" /><rect x="7.5" y="25" width="3" height="14" rx="1" />
        <rect x="53.5" y="25" width="3" height="14" rx="1" /><rect x="58" y="21" width="4" height="22" rx="1" />
        <rect x="10" y="30.6" width="44" height="2.8" />
      </g>
      <g stroke="#000" strokeWidth="2.6" paintOrder="stroke">
        <polygon points="14,17 21,12 21,52 14,52" fill="url(#mg)" />
        <polygon points="43,12 50,12 50,47 43,52" fill="url(#mg)" />
        <polygon points="21,12 29,12 50,52 42,52" fill="#e1293b" />
      </g>
    </svg>
  );
}
