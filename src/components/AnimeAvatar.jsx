import { useId } from "react";
import { motion } from "framer-motion";

const SKIN = "#f4d9d2";
const HIJAB = "#4d3092";
const HIJAB_DARK = "#33206b";
const HIJAB_LIGHT = "#8466d6";
const NIQAB = "#22163f";
const BLAZER = "#1c1532";
const INK = "#160d2c";

function Eye({ cx, flip, uid }) {
  const s = flip ? -1 : 1;
  const x = (dx) => cx + s * dx;
  const white = `M ${x(-24)} -52 Q ${x(-4)} -77 ${x(22)} -58 Q ${x(19)} -42 ${x(4)} -38 Q ${x(-15)} -38 ${x(-24)} -52 Z`;
  const clip = `eye-${uid}-${flip ? "r" : "l"}`;
  return (
    <g>
      <defs>
        <clipPath id={clip}>
          <path d={white} />
        </clipPath>
      </defs>
      <path d={white} fill="#fdf8ff" />
      <g clipPath={`url(#${clip})`}>
        <ellipse cx={x(1)} cy="-54" rx="12.5" ry="16" fill={`url(#iris-${uid})`} />
        <ellipse cx={x(1)} cy="-53" rx="5.5" ry="8" fill={INK} />
        <ellipse cx={x(1)} cy="-44" rx="9" ry="4.5" fill="#d9c2ff" opacity="0.45" />
        <path d={`M ${x(-26)} -64 Q ${x(-4)} -80 ${x(24)} -64 L ${x(24)} -56 Q ${x(-4)} -68 ${x(-26)} -55 Z`} fill="#2a1660" opacity="0.35" />
      </g>
      <circle cx={x(-4)} cy="-61" r="4.6" fill="#fff" />
      <circle cx={x(6)} cy="-46" r="2" fill="#fff" opacity="0.9" />
      <path d={`M ${x(-27)} -51 Q ${x(-4)} -80 ${x(24)} -58`} fill="none" stroke={INK} strokeWidth="4.4" strokeLinecap="round" />
      <path d={`M ${x(-25)} -52 L ${x(-34)} -58`} stroke={INK} strokeWidth="3" strokeLinecap="round" />
      <path d={`M ${x(-12)} -39.5 Q ${x(2)} -36 ${x(14)} -41`} fill="none" stroke={INK} strokeWidth="1.2" strokeLinecap="round" opacity="0.45" />
      <path d={`M ${x(-20)} -86 Q ${x(-3)} -93 ${x(16)} -88`} fill="none" stroke="#3a2652" strokeWidth="2.6" strokeLinecap="round" />
    </g>
  );
}

export default function AnimeAvatar() {
  const uid = useId().replace(/:/g, "");
  const face =
    "M 215 -112 C 252 -112 277 -84 277 -48 C 277 -8 253 30 215 34 C 177 30 153 -8 153 -48 C 153 -84 178 -112 215 -112 Z";

  return (
    <g>
      <defs>
        <radialGradient id={`iris-${uid}`} cx="45%" cy="35%" r="70%">
          <stop offset="0" stopColor="#e9dcff" />
          <stop offset="0.35" stopColor="#a77de8" />
          <stop offset="0.8" stopColor="#4b2a9c" />
          <stop offset="1" stopColor="#2a1660" />
        </radialGradient>
        <linearGradient id={`hijab-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={HIJAB_LIGHT} />
          <stop offset="0.35" stopColor={HIJAB} />
          <stop offset="1" stopColor={HIJAB_DARK} />
        </linearGradient>
        <linearGradient id={`lid-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ddd0f6" />
          <stop offset="1" stopColor="#8d79c4" />
        </linearGradient>
        <radialGradient id={`screen-${uid}`} cx="50%" cy="100%" r="100%">
          <stop offset="0" stopColor="#7fe3ff" stopOpacity="0.5" />
          <stop offset="0.45" stopColor="#b069db" stopOpacity="0.18" />
          <stop offset="1" stopColor="#b069db" stopOpacity="0" />
        </radialGradient>
        <clipPath id={`face-${uid}`}>
          <path d={face} />
        </clipPath>
      </defs>

      <path
        d="M 100 108 C 62 122 44 168 46 238 L 50 490 L 380 490 L 384 238 C 386 168 368 122 330 108 Z"
        fill={BLAZER}
      />
      <path d="M 384 238 C 386 168 368 122 330 108" fill="none" stroke="#4a3a78" strokeWidth="3" strokeLinecap="round" />

      <path
        d="M 215 -150 C 272 -150 310 -112 314 -56 C 318 -10 314 30 322 58 C 348 76 358 104 352 136 L 336 252 C 298 288 132 288 94 252 L 78 136 C 72 104 82 76 108 58 C 116 30 112 -10 116 -56 C 120 -112 158 -150 215 -150 Z"
        fill={`url(#hijab-${uid})`}
      />
      <path
        d="M 116 -56 C 112 -10 116 30 108 58 C 82 76 72 104 78 136 L 94 252 C 104 262 118 270 134 278 C 116 220 110 150 130 98 C 140 66 138 20 140 -30 Z"
        fill={HIJAB_DARK}
        opacity="0.75"
      />
      <path d="M 290 90 C 300 150 300 210 290 276" fill="none" stroke={HIJAB_DARK} strokeWidth="3" opacity="0.6" strokeLinecap="round" />
      <path d="M 150 120 C 146 170 150 230 160 284" fill="none" stroke={HIJAB_DARK} strokeWidth="3" opacity="0.5" strokeLinecap="round" />
      <path d="M 196 -140 C 246 -144 290 -114 300 -68" fill="none" stroke="#c9b3ff" strokeWidth="5" strokeLinecap="round" opacity="0.55" />
      <circle cx="262" cy="-128" r="5" fill="#f3eeff" />
      <circle cx="260.5" cy="-129.5" r="1.8" fill="#fff" />

      <path d={face} fill={SKIN} />
      <g clipPath={`url(#face-${uid})`}>
        <path d={face} fill="none" stroke="#c99aae" strokeWidth="16" opacity="0.45" />
      </g>
      <path d={face} fill="none" stroke={HIJAB_LIGHT} strokeWidth="6" />

      <motion.g
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        animate={{ scaleY: [1, 1, 0.08, 1, 1, 0.08, 1] }}
        transition={{ duration: 6, times: [0, 0.6, 0.63, 0.66, 0.9, 0.93, 0.96], repeat: Infinity, ease: "easeInOut" }}
      >
        <Eye cx={184} uid={uid} />
        <Eye cx={246} flip uid={uid} />
      </motion.g>

      <ellipse cx="176" cy="-33" rx="9" ry="2.8" fill="#f29bb5" opacity="0.5" />
      <ellipse cx="254" cy="-33" rx="9" ry="2.8" fill="#f29bb5" opacity="0.5" />

      <path
        d="M 149 -27 Q 215 -37 281 -27 L 285 8 C 290 62 270 112 215 130 C 160 112 140 62 145 8 Z"
        fill={NIQAB}
      />
      <path d="M 149 -27 Q 215 -37 281 -27" fill="none" stroke="#4a3482" strokeWidth="3" strokeLinecap="round" />
      <path d="M 214 -30 Q 208 40 215 124" fill="none" stroke="#3a2766" strokeWidth="2.4" opacity="0.8" />
      <path d="M 250 -26 Q 262 40 246 108" fill="none" stroke="#120a24" strokeWidth="2" opacity="0.6" />

      <path d="M 52 300 C 70 336 100 352 132 352 L 136 318 C 110 318 86 300 74 272 Z" fill={BLAZER} />
      <path d="M 378 300 C 360 336 330 352 298 352 L 294 318 C 320 318 344 300 356 272 Z" fill={BLAZER} />
      <path d="M 120 318 L 138 316 L 140 352 L 122 354 Z" fill="#efe6ff" />
      <path d="M 310 318 L 292 316 L 290 352 L 308 354 Z" fill="#efe6ff" />

      <path d="M 128 306 L 302 306 L 318 446 L 112 446 Z" fill={`url(#lid-${uid})`} />
      <path d="M 128 306 L 302 306" stroke="#f3eeff" strokeWidth="2.5" strokeLinecap="round" />
      <g transform="translate(215 372)">
        <circle r="17" fill="#2e2459" />
        <ellipse rx="27" ry="7" fill="none" stroke="#7fe3ff" strokeWidth="2.6" transform="rotate(-18)" />
        <circle r="11" fill="#b069db" />
      </g>
      <g transform="translate(152 336) rotate(-10)">
        <rect x="-19" y="-11" width="38" height="22" rx="6" fill="#0d0920" />
        <text x="0" y="5" textAnchor="middle" fontSize="13" fontWeight="700" fill="#7fe3ff" fontFamily="ui-monospace, monospace">
          &lt;/&gt;
        </text>
      </g>
      <path
        d="M 282 408 l 4 9 10 1 -7 7 2 10 -9 -5 -9 5 2 -10 -7 -7 10 -1 Z"
        fill="#ffd36e"
      />
      <g transform="translate(272 340) rotate(14)">
        <rect x="-15" y="-10" width="30" height="20" rx="10" fill="#ff7ad9" />
        <text x="0" y="4.5" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0d0920" fontFamily="ui-sans-serif, sans-serif">
          AI
        </text>
      </g>

      <g fill={SKIN}>
        <rect x="124" y="320" width="24" height="12" rx="6" />
        <rect x="126" y="333" width="24" height="12" rx="6" />
        <rect x="282" y="320" width="24" height="12" rx="6" />
        <rect x="280" y="333" width="24" height="12" rx="6" />
      </g>

      <motion.ellipse
        cx="215"
        cy="300"
        rx="190"
        ry="330"
        fill={`url(#screen-${uid})`}
        style={{ mixBlendMode: "screen" }}
        animate={{ opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </g>
  );
}
