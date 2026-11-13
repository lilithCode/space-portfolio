import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { FiMail } from "react-icons/fi";
import site from "../data/site";
import { scrollToId } from "../lib/scroll";
import PlanetHorizon from "./PlanetHorizon";

const ease = [0.22, 1, 0.36, 1];

function CyclingPhrase({ words, run }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!run) return;
    const id = setInterval(() => setI((n) => (n + 1) % words.length), 2600);
    return () => clearInterval(id);
  }, [run, words.length]);

  return (
    <span className="relative inline-grid overflow-hidden align-bottom">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          className="col-start-1 row-start-1 whitespace-nowrap"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function LaunchButton({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative isolate inline-flex items-center gap-4 overflow-hidden rounded-full bg-star py-2 pl-7 pr-2 text-lg font-semibold text-void shadow-[0_0_0_1px_rgb(217_194_255/0.4),0_18px_50px_-18px_rgb(176_105_219/0.9)] transition-colors duration-500 hover:text-star"
    >
      <span
        aria-hidden="true"
        className="absolute right-2 top-1/2 -z-10 h-11 w-11 -translate-y-1/2 rounded-full bg-void transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[9]"
      />
      {children}
      <span
        aria-hidden="true"
        className="grid h-11 w-11 place-items-center rounded-full bg-void text-lilac transition-transform duration-500 group-hover:rotate-[20deg]"
      >
        <svg viewBox="-10 -16 20 40" className="h-6 w-3 rotate-180 transition-transform duration-500 group-hover:translate-y-1">
          <path d="M-3.2 8 Q0 19 3.2 8 Z" fill="#7fe3ff" />
          <path d="M-4.6 2 L-8.5 9.5 L-4.2 8 Z" fill="#b069db" />
          <path d="M4.6 2 L8.5 9.5 L4.2 8 Z" fill="#b069db" />
          <path d="M0 -14 C6.2 -8 6.2 2 4.6 8.5 L-4.6 8.5 C-6.2 2 -6.2 -8 0 -14 Z" fill="#f3eeff" />
        </svg>
      </span>
    </button>
  );
}

export default function Hero({ ready }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const nameY = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const horizonY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);

  const letters = site.name.split("");
  const state = ready ? "show" : "hidden";

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-svh items-center overflow-hidden pb-40 pt-28 md:pb-52 [@media(max-height:560px)]:pb-28 [@media(max-height:560px)]:pt-20"
    >
      <motion.div style={{ y: horizonY }} className="absolute inset-x-0 bottom-0">
        <PlanetHorizon ready={ready} />
      </motion.div>

      <div className="shell relative z-10 w-full text-center">
        <motion.div style={{ y: nameY, opacity: fade }}>
          <motion.p
            className="text-lg text-mist md:text-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
          >
            Hello, I'm
          </motion.p>

          <motion.h1
            aria-label={site.name}
            className="font-display text-[clamp(4.75rem,min(17vw,20svh),13rem)] font-bold leading-[0.9] tracking-[-0.05em] text-star"
            initial="hidden"
            animate={state}
            transition={{ staggerChildren: 0.07, delayChildren: 0.15 }}
          >
            {letters.map((ch, i) => (
              <span key={i} aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em]">
                <motion.span
                  className="inline-block bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(90deg, #e2d0ff 0%, #c9a4f5 50%, #a865d8 100%)",
                    backgroundSize: `${letters.length * 100}% 100%`,
                    backgroundPosition: `${letters.length > 1 ? (i / (letters.length - 1)) * 100 : 0}% 0`,
                  }}
                  variants={{
                    hidden: { y: "105%", rotate: 6 },
                    show: { y: "0%", rotate: 0, transition: { duration: 1.1, ease } },
                  }}
                >
                  {ch}
                </motion.span>
              </span>
            ))}
          </motion.h1>
        </motion.div>

        <motion.p
          className="mx-auto mt-6 max-w-2xl text-xl leading-snug text-star/90 md:mt-8 md:text-[1.75rem] [@media(max-height:560px)]:mt-3"
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease, delay: 0.55 }}
        >
          {site.role} building
          <br />
          <CyclingPhrase words={site.building} run={ready} />
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-5 md:mt-12 [@media(max-height:560px)]:mt-5"
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease, delay: 0.75 }}
        >
          <LaunchButton onClick={() => scrollToId("work")}>See my work</LaunchButton>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("contact");
            }}
            className="group inline-flex h-[3.75rem] items-center gap-3 rounded-full border border-lilac/40 bg-void/40 px-7 text-lg font-semibold text-star backdrop-blur-sm transition-colors duration-300 hover:border-lilac hover:bg-lilac/10"
          >
            Get in touch
            <FiMail aria-hidden="true" className="h-5 w-5 text-lilac transition-transform duration-300 group-hover:-rotate-12" />
          </a>
        </motion.div>

        <span
          data-waypoint=""
          aria-hidden="true"
          className="absolute -bottom-24 left-1/2 block h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-lilac md:-bottom-28"
        />
      </div>
    </section>
  );
}
