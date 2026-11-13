import { useEffect, useRef } from "react";

const TONES = [
  ["243,238,255", 0.72],
  ["217,194,255", 0.2],
  ["176,105,219", 0.08],
];

const REACH = 150;
const LINK = 105;

function pickTone() {
  let r = Math.random();
  for (const [tone, weight] of TONES) {
    if ((r -= weight) < 0) return tone;
  }
  return TONES[0][0];
}

export default function Starfield({ paused = false }) {
  const pausedRef = useRef(paused);
  pausedRef.current = paused;
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let stars = [];
    let frame = 0;
    let running = true;

    const pointer = { x: -1e4, y: -1e4, tx: -1e4, ty: -1e4, strength: 0, target: 0 };
    const drift = { x: 0, y: 0, tx: 0, ty: 0 };
    let shooting = null;
    let nextShot = performance.now() + 5000;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(360, Math.round((w * h) / 5200));
      stars = Array.from({ length: count }, () => {
        const z = Math.random() ** 1.7 * 0.9 + 0.1;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          z,
          r: 0.35 + z * 1.3,
          tone: pickTone(),
          phase: Math.random() * Math.PI * 2,
          speed: 0.4 + Math.random() * 1.1,
          ox: 0,
          oy: 0,
          sx: 0,
          sy: 0,
        };
      });
      if (reduce) draw(performance.now());
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);

      pointer.x += (pointer.tx - pointer.x) * 0.14;
      pointer.y += (pointer.ty - pointer.y) * 0.14;
      pointer.strength += (pointer.target - pointer.strength) * 0.06;
      drift.x += (drift.tx - drift.x) * 0.04;
      drift.y += (drift.ty - drift.y) * 0.04;

      const scroll = reduce ? 0 : window.scrollY;
      const near = [];

      for (const s of stars) {
        const baseX = s.x + drift.x * s.z;
        const baseY = (((s.y - scroll * s.z * 0.12 + drift.y * s.z) % h) + h) % h;

        const dx = baseX - pointer.x;
        const dy = baseY - pointer.y;
        const dist = Math.hypot(dx, dy);
        let tx = 0;
        let ty = 0;
        if (dist < REACH && dist > 0.01) {
          const push = (1 - dist / REACH) ** 2 * 22 * s.z * pointer.strength;
          tx = (dx / dist) * push;
          ty = (dy / dist) * push;
        }
        s.ox += (tx - s.ox) * 0.08;
        s.oy += (ty - s.oy) * 0.08;
        s.sx = baseX + s.ox;
        s.sy = baseY + s.oy;

        const twinkle = reduce ? 0.8 : 0.55 + 0.45 * Math.sin(t * 0.001 * s.speed + s.phase);
        let alpha = (0.3 + 0.7 * twinkle) * (0.35 + 0.65 * s.z);
        if (dist < REACH * 1.2) {
          alpha = Math.min(1, alpha + (1 - dist / (REACH * 1.2)) * 0.6 * pointer.strength);
          near.push(s);
        }

        ctx.beginPath();
        ctx.arc(s.sx, s.sy, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.tone},${alpha})`;
        ctx.fill();
      }

      if (near.length > 1 && pointer.strength > 0.02) {
        ctx.lineWidth = 0.6;
        for (let i = 0; i < near.length; i++) {
          for (let j = i + 1; j < near.length; j++) {
            const a = near[i];
            const b = near[j];
            const d = Math.hypot(a.sx - b.sx, a.sy - b.sy);
            if (d < LINK) {
              ctx.strokeStyle = `rgba(217,194,255,${(1 - d / LINK) * 0.35 * pointer.strength})`;
              ctx.beginPath();
              ctx.moveTo(a.sx, a.sy);
              ctx.lineTo(b.sx, b.sy);
              ctx.stroke();
            }
          }
        }
      }

      if (!reduce) drawShootingStar(t);
    };

    const drawShootingStar = (t) => {
      if (!shooting && t > nextShot) {
        const fromLeft = Math.random() > 0.5;
        shooting = {
          x: fromLeft ? Math.random() * w * 0.5 : w * 0.5 + Math.random() * w * 0.5,
          y: Math.random() * h * 0.4,
          vx: (fromLeft ? 1 : -1) * (6 + Math.random() * 3),
          vy: 2.5 + Math.random() * 1.5,
          life: 1,
        };
        nextShot = t + 7000 + Math.random() * 8000;
      }
      if (!shooting) return;
      const s = shooting;
      s.x += s.vx;
      s.y += s.vy;
      s.life -= 0.018;
      const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 14, s.y - s.vy * 14);
      grad.addColorStop(0, `rgba(243,238,255,${0.9 * s.life})`);
      grad.addColorStop(1, "rgba(127,227,255,0)");
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x - s.vx * 14, s.y - s.vy * 14);
      ctx.stroke();
      if (s.life <= 0) shooting = null;
    };

    const loop = (t) => {
      if (running && !pausedRef.current) draw(t);
      frame = requestAnimationFrame(loop);
    };

    const onMove = (e) => {
      pointer.tx = e.clientX;
      pointer.ty = e.clientY;
      if (pointer.x < -1000) {
        pointer.x = e.clientX;
        pointer.y = e.clientY;
      }
      pointer.target = 1;
      drift.tx = (e.clientX / w - 0.5) * -36;
      drift.ty = (e.clientY / h - 0.5) * -24;
    };
    const onLeave = () => {
      pointer.target = 0;
    };
    const onVisibility = () => {
      running = !document.hidden;
    };

    resize();
    window.addEventListener("resize", resize);
    if (!reduce) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      document.addEventListener("visibilitychange", onVisibility);
      frame = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60rem 40rem at 88% -8%, rgb(176 105 219 / 0.16), transparent 62%)," +
            "radial-gradient(48rem 36rem at -8% 108%, rgb(127 227 255 / 0.06), transparent 60%)," +
            "radial-gradient(40rem 30rem at 30% 55%, rgb(46 36 89 / 0.35), transparent 70%)",
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
