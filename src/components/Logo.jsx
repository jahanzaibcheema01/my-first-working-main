const SEGMENTS = [
  '#8b5cf6', '#ec4899', '#f97316', '#14b8a6',
  '#3b82f6', '#8b5cf6', '#ec4899', '#f97316',
]

// Pre-computed vertices of 8 wedges on a r=38 circle centered at (50,54)
const POINTS = [
  [88, 54], [76.87, 80.87], [50, 92], [23.13, 80.87],
  [12, 54], [23.13, 27.13], [50, 16], [76.87, 27.13],
]

export default function Logo({ size = 36 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label="Spin the Wheel logo"
    >
      <defs>
        <linearGradient id="logo-rim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f8fafc" />
          <stop offset=".5" stopColor="#94a3b8" />
          <stop offset="1" stopColor="#475569" />
        </linearGradient>
        <radialGradient id="logo-hub" cx=".35" cy=".35" r=".9">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".6" stopColor="#e2e8f0" />
          <stop offset="1" stopColor="#94a3b8" />
        </radialGradient>
        <linearGradient id="logo-pointer" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fde047" />
          <stop offset="1" stopColor="#d97706" />
        </linearGradient>
        <radialGradient id="logo-gloss" cx=".5" cy=".25" r=".75">
          <stop offset="0" stopColor="#ffffff" stopOpacity=".45" />
          <stop offset=".55" stopColor="#ffffff" stopOpacity=".08" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <filter id="logo-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.2" floodOpacity=".35" />
        </filter>
      </defs>

      <g filter="url(#logo-shadow)">
        {SEGMENTS.map((color, i) => {
          const [x1, y1] = POINTS[i]
          const [x2, y2] = POINTS[(i + 1) % POINTS.length]
          return (
            <path
              key={i}
              d={`M50,54 L${x1},${y1} A38,38 0 0 1 ${x2},${y2} Z`}
              fill={color}
            />
          )
        })}
        <circle cx="50" cy="54" r="38" fill="url(#logo-gloss)" />
        <circle cx="50" cy="54" r="38" fill="none" stroke="url(#logo-rim)" strokeWidth="5" />
        <circle cx="50" cy="54" r="10" fill="url(#logo-hub)" stroke="#64748b" strokeWidth="1.5" />
        <path d="M50,4 L57,17 L50,14 L43,17 Z" fill="url(#logo-pointer)" stroke="#92400e" strokeWidth="1" />
      </g>
    </svg>
  )
}
