import Lenis from "lenis";

let lenis = null;

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initSmoothScroll() {
  if (prefersReducedMotion()) return () => {};
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  let frame;
  const raf = (time) => {
    lenis?.raf(time);
    frame = requestAnimationFrame(raf);
  };
  frame = requestAnimationFrame(raf);
  return () => {
    cancelAnimationFrame(frame);
    lenis?.destroy();
    lenis = null;
  };
}

export function lockScroll(locked) {
  document.documentElement.style.overflow = locked ? "hidden" : "";
  if (lenis) (locked ? lenis.stop() : lenis.start());
}

export function scrollToId(id) {
  const el = id === "top" ? null : document.getElementById(id);
  if (id !== "top" && !el) return;
  if (lenis) {
    lenis.scrollTo(el ?? 0, { offset: 0, duration: 1.6 });
  } else {
    const behavior = prefersReducedMotion() ? "auto" : "smooth";
    if (el) el.scrollIntoView({ behavior });
    else window.scrollTo({ top: 0, behavior });
  }
}
