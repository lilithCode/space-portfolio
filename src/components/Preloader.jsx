import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { lockScroll, prefersReducedMotion } from "../lib/scroll";
import { BRAKE, createWarp } from "../lib/warp";

const CRUISE_UNTIL = 2400;
const MAX_PIXELS = 3_000_000;

function viewport() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  if (w * h * dpr * dpr > MAX_PIXELS) dpr = Math.sqrt(MAX_PIXELS / (w * h));
  return { w, h, dpr };
}

function makeCanvas(host) {
  const canvas = document.createElement("canvas");
  canvas.className = "absolute inset-0 h-full w-full";
  host.appendChild(canvas);
  return canvas;
}

function runHere(host, reduce) {
  const canvas = makeCanvas(host);
  const warp = createWarp(canvas, { reduce });
  const { w, h, dpr } = viewport();
  warp.resize(w, h, dpr);
  return {
    resize: () => {
      const v = viewport();
      warp.resize(v.w, v.h, v.dpr);
    },
    brake: () => warp.brake(),
    stop: () => {
      warp.stop();
      canvas.remove();
    },
  };
}

function runInWorker(host, reduce, onFail) {
  const canvas = makeCanvas(host);
  const offscreen = canvas.transferControlToOffscreen();
  const worker = new Worker(new URL("../lib/warp.worker.js", import.meta.url), { type: "module" });
  worker.onerror = () => {
    worker.terminate();
    canvas.remove();
    onFail();
  };
  worker.postMessage({ type: "init", canvas: offscreen, reduce, ...viewport() }, [offscreen]);
  return {
    resize: () => worker.postMessage({ type: "resize", ...viewport() }),
    brake: () => worker.postMessage({ type: "brake" }),
    stop: () => {
      worker.terminate();
      canvas.remove();
    },
  };
}

function WarpField({ braking }) {
  const hostRef = useRef(null);
  const apiRef = useRef(null);
  const brakeRef = useRef(braking);
  brakeRef.current = braking;

  useEffect(() => {
    const host = hostRef.current;
    const reduce = prefersReducedMotion();
    let stopped = false;

    const fallback = () => {
      if (stopped) return;
      apiRef.current = runHere(host, reduce);
      if (brakeRef.current) apiRef.current.brake();
    };

    try {
      if ("transferControlToOffscreen" in HTMLCanvasElement.prototype && typeof Worker !== "undefined") {
        apiRef.current = runInWorker(host, reduce, fallback);
      }
    } catch {
      host.replaceChildren();
      apiRef.current = null;
    }
    if (!apiRef.current) fallback();

    const onResize = () => apiRef.current?.resize();
    window.addEventListener("resize", onResize);
    return () => {
      stopped = true;
      window.removeEventListener("resize", onResize);
      apiRef.current?.stop();
      apiRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (braking) apiRef.current?.brake();
  }, [braking]);

  return <div ref={hostRef} className="absolute inset-0" />;
}

export default function Preloader({ onDone }) {
  const [visible, setVisible] = useState(true);
  const [braking, setBraking] = useState(false);

  useEffect(() => {
    lockScroll(true);
    const reduce = prefersReducedMotion();
    const minTime = reduce ? 200 : CRUISE_UNTIL;
    const startedAt = performance.now();
    let cancelled = false;
    const timers = [];

    const fonts = document.fonts?.ready ?? Promise.resolve();
    const cap = new Promise((r) => setTimeout(r, 4500));

    Promise.race([fonts, cap]).then(() => {
      const wait = Math.max(0, minTime - (performance.now() - startedAt));
      timers.push(
        setTimeout(() => {
          if (cancelled) return;
          setBraking(true);
          timers.push(
            setTimeout(
              () => {
                if (cancelled) return;
                setVisible(false);
                onDone();
              },
              reduce ? 0 : BRAKE - 250,
            ),
          );
        }, wait),
      );
    });

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [onDone]);

  return (
    <AnimatePresence onExitComplete={() => lockScroll(false)}>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] overflow-hidden bg-void will-change-[opacity]"
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.33, 0, 0.2, 1] }}
          role="status"
          aria-label="Loading"
        >
          <WarpField braking={braking} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
