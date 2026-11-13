import { useId, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimeAvatar from "./AnimeAvatar";

const BLOB =
  "M222 18c64-4 126 30 158 86 30 52 18 110 22 166 4 60 6 122-40 164-46 42-118 44-180 34-62-10-122-38-150-94-28-54-6-112-4-170 2-58-16-112 22-152C88 10 160 22 222 18Z";

const BLOB_SHORT =
  "M222 18c64 -3.2 126 24 158 68.8 30 41.6 18 88 22 132.8 4 48 6 97.6 -40 131.2 -46 33.6 -118 35.2 -180 27.2 -62 -8 -122 -30.4 -150 -75.2 -28 -43.2 -6 -89.6 -4 -136 2 -46.4 -16 -89.6 22 -121.6C88 11.6 160 21.2 222 18Z";

const POP_FADE = [290, 360];

const FIGURE = { x: -178, y: -257, width: 680, height: 646 };

const STARS = [
  [70, 150, 1.4], [120, 330, 1], [330, 170, 1.6], [360, 300, 1.1], [300, 410, 1.3],
  [90, 250, 0.9], [200, 440, 1], [380, 230, 0.8], [60, 370, 1.2], [250, 120, 0.9],
];

export default function Portrait({ src, cutout, alt, variant = "photo" }) {
  const anime = variant === "anime";
  const popOut = anime || Boolean(cutout);
  const blob = popOut ? BLOB_SHORT : BLOB;
  const uid = useId().replace(/:/g, "");
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lift = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const lean = useTransform(scrollYProgress, [0, 1], [18, -18]);

  return (
    <figure ref={ref} className={`relative mx-auto w-full ${popOut ? "max-w-[34rem] lg:max-w-none" : "max-w-[27rem]"}`}>
      <svg
        viewBox={popOut ? "-160 -72 670 476" : "-20 -20 480 520"}
        role="img"
        aria-label={alt}
        className="w-full overflow-visible"
      >
        <defs>
          <clipPath id={`clip-${uid}`}>
            <path d={blob} />
          </clipPath>
          <linearGradient id={`popfade-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="white" />
            <stop offset="1" stopColor="black" />
          </linearGradient>
          <mask id={`pop-${uid}`} maskUnits="userSpaceOnUse" x="-600" y="-600" width="1800" height="1800">
            <rect x="-600" y="-600" width="1800" height={600 + POP_FADE[0]} fill="white" />
            <rect x="-600" y={POP_FADE[0]} width="1800" height={POP_FADE[1] - POP_FADE[0]} fill={`url(#popfade-${uid})`} />
            <path d={blob} fill="white" />
          </mask>
          <clipPath id={`lip-${uid}`}>
            <rect x="-200" y={POP_FADE[1]} width="860" height="600" />
          </clipPath>
          <radialGradient id={`neb-${uid}`} cx="50%" cy="30%" r="80%">
            <stop offset="0" stopColor="#5b3d9e" />
            <stop offset="0.35" stopColor="#2e2459" />
            <stop offset="0.75" stopColor="#1b1438" />
            <stop offset="1" stopColor="#0d0920" />
          </radialGradient>
          <radialGradient id={`glow-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#7fe3ff" stopOpacity="0.35" />
            <stop offset="0.5" stopColor="#b069db" stopOpacity="0.25" />
            <stop offset="1" stopColor="#b069db" stopOpacity="0" />
          </radialGradient>
          <pattern id={`dots-${uid}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1.5" fill="#d9c2ff" />
          </pattern>
          <linearGradient id={`fade-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="white" stopOpacity="0.7" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id={`dotmask-${uid}`}>
            <rect x="250" y="-20" width="210" height="230" fill={`url(#fade-${uid})`} />
          </mask>
          <filter id={`shade-${uid}`} x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="14" stdDeviation="12" floodColor="#0d0920" floodOpacity="0.7" />
          </filter>
          <filter id={`tone-${uid}`} x="-15%" y="-15%" width="130%" height="130%" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0 0 0 1 0"
            />
            <feComponentTransfer>
              <feFuncR type="table" tableValues="0.07 0.40 0.78 0.97" />
              <feFuncG type="table" tableValues="0.05 0.21 0.64 0.94" />
              <feFuncB type="table" tableValues="0.15 0.52 0.94 1" />
            </feComponentTransfer>
            {cutout && <feDropShadow dx="0" dy="14" stdDeviation="12" floodColor="#0d0920" floodOpacity="0.75" />}
          </filter>
        </defs>

        <rect x="250" y="-20" width="210" height="230" fill={`url(#dots-${uid})`} mask={`url(#dotmask-${uid})`} />

        <motion.path
          d={blob}
          fill="none"
          stroke="#d9c2ff"
          strokeOpacity="0.7"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeDasharray="0.1 9"
          transform="translate(18 16)"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.g style={{ y: lift }}>
          {popOut ? (
            <>
              <path d={blob} fill={`url(#neb-${uid})`} />
              <g clipPath={`url(#clip-${uid})`}>
                <ellipse cx="215" cy="150" rx="230" ry="190" fill={`url(#glow-${uid})`} />
                {STARS.map(([cx, cy, r]) => (
                  <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="#f3eeff" opacity="0.8" />
                ))}
              </g>
              <path d={blob} fill="none" stroke="#d9c2ff" strokeOpacity="0.55" strokeWidth="1.5" />

              <motion.g style={{ y: lean }}>
                <g mask={`url(#pop-${uid})`}>
                  <motion.g
                    initial={{ y: 90, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{
                      y: { type: "spring", stiffness: 70, damping: 16, delay: 0.25 },
                      opacity: { duration: 0.5, delay: 0.25 },
                    }}
                  >
                    {anime ? (
                      <g filter={`url(#shade-${uid})`}>
                        <AnimeAvatar />
                      </g>
                    ) : (
                      <image
                        href={cutout}
                        {...FIGURE}
                        preserveAspectRatio="xMidYMid meet"
                        filter={`url(#tone-${uid})`}
                      />
                    )}
                  </motion.g>
                </g>
              </motion.g>

              <path
                d={blob}
                fill="none"
                stroke="#b069db"
                strokeOpacity="0.6"
                strokeWidth="1"
                clipPath={`url(#lip-${uid})`}
              />
            </>
          ) : (
            <>
              <path d={blob} fill="#1b1438" />
              <image
                href={src}
                x="-10"
                y="-10"
                width="440"
                height="480"
                preserveAspectRatio="xMidYMid slice"
                clipPath={`url(#clip-${uid})`}
                filter={`url(#tone-${uid})`}
              />
              <path d={blob} fill="none" stroke="#b069db" strokeOpacity="0.5" strokeWidth="1" />
            </>
          )}
        </motion.g>

      </svg>
    </figure>
  );
}
