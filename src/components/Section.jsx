import { useId } from "react";
import { motion } from "framer-motion";
import { RevealText } from "./Reveal";

const ease = [0.22, 1, 0.36, 1];
const inView = { once: true, margin: "0px 0px -15% 0px" };

function Underline() {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 300 26"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -bottom-[0.28em] left-[-2%] h-[0.36em] w-[104%] overflow-visible"
    >
      <defs>
        <linearGradient id={`ul-${id}`} x1="0" x2="1">
          <stop offset="0" stopColor="#b069db" />
          <stop offset="0.6" stopColor="#d9c2ff" />
          <stop offset="1" stopColor="#7fe3ff" />
        </linearGradient>
      </defs>
      <motion.path
        d="M4 15 C 70 5, 150 3, 296 9"
        fill="none"
        stroke={`url(#ul-${id})`}
        strokeWidth="3.2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={inView}
        transition={{ duration: 0.9, delay: 0.45, ease }}
      />
      <motion.path
        d="M36 22 C 120 14, 200 13, 262 17"
        fill="none"
        stroke={`url(#ul-${id})`}
        strokeOpacity="0.7"
        strokeWidth="1.6"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={inView}
        transition={{ duration: 0.7, delay: 0.85, ease }}
      />
    </svg>
  );
}

function Sparkle() {
  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 40 40"
      className="pointer-events-none absolute -right-[0.62em] -top-[0.12em] h-[0.46em] w-[0.46em]"
      initial={{ scale: 0, rotate: -120, opacity: 0 }}
      whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
      viewport={inView}
      transition={{ type: "spring", stiffness: 220, damping: 13, delay: 0.9 }}
    >
      <path
        d="M20 2 C 21.5 13, 27 18.5, 38 20 C 27 21.5, 21.5 27, 20 38 C 18.5 27, 13 21.5, 2 20 C 13 18.5, 18.5 13, 20 2 Z"
        fill="#d9c2ff"
      />
      <circle cx="34" cy="6" r="2.2" fill="#7fe3ff" />
    </motion.svg>
  );
}

function QuoteIntro({ text }) {
  return (
    <motion.div
      className="relative mt-9 max-w-[36rem] pl-9 md:pl-11"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ duration: 0.8, delay: 0.3, ease }}
    >
      <span
        aria-hidden="true"
        className="absolute -top-[0.32em] left-0 font-display text-[3.5rem] leading-none text-orchid md:text-[4.25rem]"
      >
        &ldquo;
      </span>
      <p className="section-intro">
        <motion.span
          className="highlight"
          initial={{ backgroundSize: "0% 62%" }}
          whileInView={{ backgroundSize: "100% 62%" }}
          viewport={inView}
          transition={{ duration: 1.1, delay: 0.75, ease }}
        >
          {text}
        </motion.span>
      </p>
    </motion.div>
  );
}

export default function Section({ id, index, title, intro, loop = false, children, className = "" }) {
  return (
    <section id={id} className={`relative scroll-mt-10 py-24 md:py-36 ${className}`}>
      <div className="shell">
        <header className="section-head">
          <span className="waypoint" data-waypoint={loop ? "loop" : ""} aria-hidden="true">
            {String(index).padStart(2, "0")}
          </span>
          <div className="section-title relative inline-block">
            <RevealText text={title} as="h2" />
            <Underline />
            <Sparkle />
          </div>
          {intro && <QuoteIntro text={intro} />}
          <span
            data-waypoint="bend"
            aria-hidden="true"
            className="absolute -bottom-10 block h-0 w-0"
            style={{ left: "var(--rail)" }}
          />
        </header>
        {children}
        <span
          data-waypoint="end"
          aria-hidden="true"
          className="relative block h-0 w-0"
          style={{ marginLeft: "var(--rail)" }}
        />
      </div>
    </section>
  );
}
