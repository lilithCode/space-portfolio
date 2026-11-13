import { motion } from "framer-motion";

export default function PlanetHorizon({ ready }) {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none relative h-[34vh] min-h-56 w-full"
      initial={{ y: "40%", opacity: 0 }}
      animate={ready ? { y: "0%", opacity: 1 } : {}}
      transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      style={{
        maskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 55%, transparent 100%)",
      }}
    >
      <svg
        viewBox="0 0 1600 400"
        preserveAspectRatio="xMidYMin slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="atmo" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#7fe3ff" stopOpacity="0" />
            <stop offset="0.22" stopColor="#7fe3ff" stopOpacity="0.85" />
            <stop offset="0.5" stopColor="#d9c2ff" />
            <stop offset="0.78" stopColor="#b069db" stopOpacity="0.9" />
            <stop offset="1" stopColor="#b069db" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="ground" cx="0.5" cy="0" r="0.75">
            <stop offset="0" stopColor="#2e2459" />
            <stop offset="0.35" stopColor="#1b1438" />
            <stop offset="1" stopColor="#0d0920" />
          </radialGradient>
          <radialGradient id="haze" cx="0.5" cy="1" r="0.6">
            <stop offset="0" stopColor="#b069db" stopOpacity="0.35" />
            <stop offset="1" stopColor="#b069db" stopOpacity="0" />
          </radialGradient>
          <filter id="atmo-blur" x="-10%" y="-50%" width="120%" height="200%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>

        <ellipse cx="800" cy="150" rx="760" ry="120" fill="url(#haze)" />
        <ellipse cx="800" cy="1700" rx="2100" ry="1580" fill="url(#ground)" />
        <ellipse
          cx="800"
          cy="1700"
          rx="2100"
          ry="1580"
          fill="none"
          stroke="url(#atmo)"
          strokeWidth="18"
          filter="url(#atmo-blur)"
          opacity="0.8"
        />
        <ellipse cx="800" cy="1700" rx="2100" ry="1580" fill="none" stroke="url(#atmo)" strokeWidth="1.6" />
      </svg>
    </motion.div>
  );
}
