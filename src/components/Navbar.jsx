import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { scrollToId } from "../lib/scroll";
import site from "../data/site";

const LINKS = [
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "journey", label: "Journey" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const NAV_LINKS = LINKS.filter((l) => l.id !== "contact");

const ease = [0.22, 1, 0.36, 1];

function useActiveSection() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["home", ...LINKS.map((l) => l.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return active;
}

export default function Navbar({ ready }) {
  const active = useActiveSection();
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > 200 && y > prev + 2);
  });

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const go = (id) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: -100, opacity: 0 }}
        animate={ready ? { y: hidden && !open ? -100 : 0, opacity: 1 } : { y: -100, opacity: 0 }}
        transition={{ duration: 0.6, ease }}
      >
        <nav
          aria-label="Main"
          className="mx-auto mt-3 flex w-[calc(100%-1.5rem)] max-w-[112rem] items-center justify-between gap-4 rounded-full border border-dusk/80 bg-nebula/60 p-2 shadow-[0_14px_50px_-18px_rgb(13_9_32/0.95)] backdrop-blur-xl md:mt-5 md:w-[calc(100%-4rem)]"
        >
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              go("top");
            }}
            className="flex items-center gap-3 rounded-full py-1 pl-1 pr-3 transition-colors hover:bg-void/50"
            aria-label="Back to top"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-void font-display text-lg text-lilac ring-1 ring-dusk">
              H.
            </span>
            <span className="hidden font-display text-lg text-star sm:inline">{site.name}</span>
          </a>

          <ul className="hidden items-center gap-1 lg:gap-3 md:flex">
            {NAV_LINKS.map(({ id, label }) => {
              const isActive = active === id;
              return (
                <li key={id} className="relative">
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-gradient-to-b from-lilac/25 to-orchid/20 ring-1 ring-lilac/40"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <a
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      go(id);
                    }}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative block rounded-full px-5 py-2.5 text-base font-medium transition-colors ${
                      isActive ? "text-star" : "text-mist hover:text-star"
                    }`}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              go("contact");
            }}
            aria-current={active === "contact" ? "true" : undefined}
            className={`hidden rounded-full px-6 py-2.5 text-base font-semibold transition-colors md:block ${
              active === "contact" ? "bg-lilac text-void" : "bg-star text-void hover:bg-lilac"
            }`}
          >
            Contact me
          </a>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="relative z-[60] grid h-10 w-10 place-items-center rounded-full bg-void ring-1 ring-dusk md:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span
              className={`absolute h-px w-5 bg-star transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1"}`}
            />
            <span
              className={`absolute h-px w-5 bg-star transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1"}`}
            />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col justify-center bg-void/95 px-8 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className="space-y-3">
              {LINKS.map(({ id, label }, i) => (
                <motion.li
                  key={id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 + i * 0.05, ease }}
                >
                  <a
                    href={`#${id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      go(id);
                    }}
                    className={`font-display text-5xl ${active === id ? "text-lilac" : "text-star"}`}
                  >
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
