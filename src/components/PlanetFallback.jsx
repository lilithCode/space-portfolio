import { motion } from "framer-motion";

export default function PlanetFallback() {
  return (
    <motion.svg
      viewBox="0 0 400 400"
      className="h-full w-full"
      aria-hidden="true"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      <defs>
        <radialGradient id="pf-body" cx="36%" cy="30%" r="75%">
          <stop offset="0" stopColor="#d9c2ff" />
          <stop offset="0.28" stopColor="#b069db" />
          <stop offset="0.62" stopColor="#2e2459" />
          <stop offset="1" stopColor="#0d0920" />
        </radialGradient>
        <linearGradient id="pf-ring" x1="0" x2="1">
          <stop offset="0" stopColor="#7fe3ff" stopOpacity="0.1" />
          <stop offset="0.5" stopColor="#d9c2ff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#b069db" stopOpacity="0.15" />
        </linearGradient>
        <clipPath id="pf-front">
          <rect x="0" y="200" width="400" height="200" />
        </clipPath>
        <clipPath id="pf-back">
          <rect x="0" y="0" width="400" height="200" />
        </clipPath>
      </defs>

      <g transform="rotate(-16 200 200)">
        <g clipPath="url(#pf-back)" fill="none" stroke="url(#pf-ring)">
          <ellipse cx="200" cy="200" rx="170" ry="38" strokeWidth="10" opacity="0.55" />
          <ellipse cx="200" cy="200" rx="148" ry="31" strokeWidth="3" opacity="0.7" />
        </g>
        <circle cx="200" cy="200" r="104" fill="url(#pf-body)" />
        <g fill="none" stroke="#f3eeff" strokeOpacity="0.08" strokeWidth="6">
          <path d="M104 180 C 160 196, 240 196, 298 176" />
          <path d="M100 214 C 160 232, 250 232, 300 210" />
        </g>
        <g clipPath="url(#pf-front)" fill="none" stroke="url(#pf-ring)">
          <ellipse cx="200" cy="200" rx="170" ry="38" strokeWidth="10" opacity="0.55" />
          <ellipse cx="200" cy="200" rx="148" ry="31" strokeWidth="3" opacity="0.7" />
        </g>
      </g>

      <circle cx="74" cy="112" r="9" fill="#2e2459" stroke="#d9c2ff" strokeOpacity="0.5" />
      <circle cx="334" cy="300" r="5" fill="#7fe3ff" opacity="0.8" />
    </motion.svg>
  );
}
