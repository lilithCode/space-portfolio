import { useEffect, useLayoutEffect, useRef, useState } from "react";

const SAMPLE_STEP = 6;
const TIP = 0.62;
const SMOKE = 36;
const BASE_SCALE = 1.35;
const LAND_SCALE = 2.7;
const GROW = 650;
const BURN = 280;
const TAIL = 9.5;

const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const smooth = (t) => t * t * (3 - 2 * t);

function buildPath(all, width) {
  const allowLoops = width >= 900;
  const points = all.filter(
    (p, i) =>
      !(p.bend && i > 0 && i < all.length - 1 && Math.abs(all[i - 1].x - p.x) < 2 && Math.abs(all[i + 1].x - p.x) < 2),
  );
  if (points.length < 2) return { d: "", segs: [] };
  const f = (n) => n.toFixed(1);
  let d = `M ${f(points[0].x)} ${f(points[0].y)}`;
  const segs = [];
  let px = points[0].x;
  let py = points[0].y;
  const C = (ax, ay, bx, by, x, y) => {
    d += ` C ${f(ax)} ${f(ay)} ${f(bx)} ${f(by)} ${f(x)} ${f(y)}`;
    segs.push([px, py, ax, ay, bx, by, x, y]);
    px = x;
    py = y;
  };
  const L = (x, y) => {
    if (Math.hypot(x - px, y - py) < 0.5) return;
    C(lerp(px, x, 1 / 3), lerp(py, y, 1 / 3), lerp(px, x, 2 / 3), lerp(py, y, 2 / 3), x, y);
  };
  const snake = (x, y0, y1, amp, side) => {
    const dy = y1 - y0;
    const n = Math.max(1, Math.round(dy / 190));
    const ease = Math.min(0.5, 110 / dy);
    const env = (t) => smooth(clamp(t / ease, 0, 1)) * smooth(clamp((1 - t) / ease, 0, 1));
    const off = (t) => side * amp * Math.sin(Math.PI * n * t) * env(t);
    const m = n * 6;
    const h = 1 / m;
    const der = (t) => (off(Math.min(1, t + 1e-4)) - off(Math.max(0, t - 1e-4))) / (Math.min(1, t + 1e-4) - Math.max(0, t - 1e-4));
    for (let j = 0; j < m; j++) {
      const t0 = j * h;
      const t1 = (j + 1) * h;
      const a = der(t0) * (h / 3);
      const b = der(t1) * (h / 3);
      C(x + off(t0) + a, y0 + dy * t0 + (dy * h) / 3, x + off(t1) - b, y0 + dy * t1 - (dy * h) / 3, x + off(t1), y0 + dy * t1);
    }
  };

  let prev = points[0];
  let wobble = 1;
  const maxSway = width < 768 ? 14 : 56;
  const corner = width < 768 ? 40 : 110;

  for (let i = 1; i < points.length; i++) {
    const p = points[i];
    const dy = p.y - prev.y;
    const last = i === points.length - 1;

    if (p.loop && allowLoops && dy > 240) {
      const r = clamp(dy * 0.11, 34, 58);
      const side = p.x > width / 2 ? -1 : 1;
      const m = { x: lerp(prev.x, p.x, 0.5) + side * 30, y: prev.y + dy * 0.42 };
      C(prev.x, prev.y + dy * 0.22, m.x, m.y - dy * 0.18, m.x, m.y);
      const k = 0.5523 * r;
      const { x, y } = m;
      const s = side;
      C(x, y + k, x + s * (r - k), y + r, x + s * r, y + r);
      C(x + s * (r + k), y + r, x + s * 2 * r, y + k, x + s * 2 * r, y);
      C(x + s * 2 * r, y - k, x + s * (r + k), y - r, x + s * r, y - r);
      const ex = x - s * r * 0.25;
      const ey = y + r * 0.35;
      C(x + s * (r - k * 1.2), y - r, ex, y - k, ex, ey);
      const rest = p.y - ey;
      C(ex, ey + rest * 0.5, p.x, p.y - rest * 0.5, p.x, p.y);
    } else if (
      width < 768 &&
      Math.abs(p.x - prev.x) < 2 &&
      !last &&
      !p.straight &&
      !prev.straight &&
      !prev.end &&
      dy > 120
    ) {
      const amp = clamp(Math.min(p.x, width - p.x) - 14, 0, 22);
      snake(p.x, prev.y, p.y, amp, wobble);
      wobble *= -1;
    } else if (Math.abs(p.x - prev.x) < 40) {
      let sway;
      const onRail = p.x < width * 0.25 && prev.x < width * 0.25;
      if (last || p.straight || prev.straight) {
        sway = 0;
      } else if (prev.end) {
        sway = Math.min(dy * 0.75, width < 768 ? width * 0.36 : 230);
      } else if (onRail) {
        sway = -Math.min(dy * 0.13, Math.max(0, Math.min(p.x, prev.x) - 24), 160);
      } else {
        sway = clamp(dy * 0.07, 0, maxSway) * wobble;
        wobble *= -1;
      }
      const mx = (prev.x + p.x) / 2 + sway;
      const my = (prev.y + p.y) / 2;
      C(prev.x, prev.y + dy * 0.25, mx, my - dy * 0.25, mx, my);
      C(mx, my + dy * 0.25, p.x, p.y - dy * 0.25, p.x, p.y);
    } else {
      const dx = p.x - prev.x;
      if (width < 1024 && dy > 0) {
        const k = dy * 0.62;
        C(prev.x, prev.y + k, p.x, p.y - k, p.x, p.y);
        prev = p;
        continue;
      }
      const dir = Math.sign(dx);
      const ymid = (prev.y + p.y) / 2;
      const r = Math.max(2, Math.min(dy / 2, Math.abs(dx) / 2, corner));
      const k = 0.5523 * r;
      L(prev.x, ymid - r);
      C(prev.x, ymid - r + k, prev.x + dir * (r - k), ymid, prev.x + dir * r, ymid);
      L(p.x - dir * r, ymid);
      C(p.x - dir * (r - k), ymid, p.x, ymid + r - k, p.x, ymid + r);
      L(p.x, p.y);
    }
    prev = p;
  }
  return { d, segs };
}

function sampleCurve(segs) {
  const xs = [];
  const ys = [];
  const lens = [];
  let total = 0;
  for (const [x0, y0, x1, y1, x2, y2, x3, y3] of segs) {
    const rough = Math.hypot(x1 - x0, y1 - y0) + Math.hypot(x2 - x1, y2 - y1) + Math.hypot(x3 - x2, y3 - y2);
    const n = clamp(Math.ceil(rough / SAMPLE_STEP), 6, 400);
    for (let i = xs.length ? 1 : 0; i <= n; i++) {
      const t = i / n;
      const u = 1 - t;
      const x = u * u * u * x0 + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t * x3;
      const y = u * u * u * y0 + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t * y3;
      if (xs.length) total += Math.hypot(x - xs[xs.length - 1], y - ys[ys.length - 1]);
      xs.push(x);
      ys.push(y);
      lens.push(total);
    }
  }
  return { xs, ys, lens, total };
}

function search(arr, v) {
  let lo = 0;
  let hi = arr.length - 1;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] < v) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

export default function Trajectory() {
  const svgRef = useRef(null);
  const trailRef = useRef(null);
  const glowRef = useRef(null);
  const rocketRef = useRef(null);
  const flameRef = useRef(null);
  const smokeRef = useRef(null);
  const burnGlowRef = useRef(null);
  const geo = useRef({ length: 0, lens: [], ys: [], waypoints: [], top: 0 });
  const [layout, setLayout] = useState({ d: "", segs: [], w: 0, h: 0 });

  useLayoutEffect(() => {
    const main = svgRef.current.parentElement;
    let queued = 0;

    const build = () => {
      queued = 0;
      const box = main.getBoundingClientRect();
      const nodes = [...main.querySelectorAll("[data-waypoint]")].filter(
        (n) => n.offsetParent !== null,
      );
      const points = nodes
        .map((el) => {
          const r = el.getBoundingClientRect();
          return {
            el,
            x: r.left + r.width / 2 - box.left,
            y: r.top + r.height / 2 - box.top,
            loop: el.dataset.waypoint === "loop",
            straight: el.dataset.waypoint === "straight",
            bend: el.dataset.waypoint === "bend",
            end: el.dataset.waypoint === "end",
          };
        })
        .sort((a, b) => a.y - b.y);

      geo.current.waypoints = points;
      geo.current.top = box.top + window.scrollY;
      const { d, segs } = buildPath(points, box.width);
      setLayout({
        d,
        segs,
        w: box.width,
        h: box.height,
      });
    };

    const schedule = () => {
      if (!queued) queued = requestAnimationFrame(build);
    };

    build();
    const ro = new ResizeObserver(schedule);
    ro.observe(main);
    window.addEventListener("load", schedule);
    document.fonts?.ready.then(schedule);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(queued);
      window.removeEventListener("load", schedule);
    };
  }, []);

  useEffect(() => {
    const path = trailRef.current;
    if (!path || !layout.d) return;
    const length = path.getTotalLength();
    const { xs, ys, lens, total } = sampleCurve(layout.segs);
    if (!xs.length) return;
    const k = total > 0 ? length / total : 1;
    for (let i = 0; i < lens.length; i++) lens[i] *= k;
    const reach = new Float64Array(ys.length);
    let maxY = -Infinity;
    for (let i = 0; i < ys.length; i++) reach[i] = maxY = Math.max(maxY, ys[i]);

    const lengthAtY = (y) => lens[search(reach, y)];
    const pointAt = (l) => {
      const i = search(lens, l);
      if (i === 0) return { x: xs[0], y: ys[0] };
      const span = lens[i] - lens[i - 1] || 1;
      const t = clamp((l - lens[i - 1]) / span, 0, 1);
      return { x: lerp(xs[i - 1], xs[i], t), y: lerp(ys[i - 1], ys[i], t) };
    };

    geo.current.pointAt = pointAt;
    geo.current.length = length;
    geo.current.lengthAtY = lengthAtY;
    for (const wp of geo.current.waypoints) wp.at = lengthAtY(wp.y - 1);

    for (const p of [trailRef.current, glowRef.current]) {
      p.style.strokeDasharray = `${length} ${length}`;
    }
    rocketRef.current.dataset.ready = "";
  }, [layout]);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let current = 0;
    let angle = 180;
    let turning = 0;
    let frame = 0;

    const puffs = Array.from({ length: SMOKE }, () => ({ age: 1, life: 1 }));
    const smoke = { last: performance.now(), acc: 0, wasLanded: false, landedAt: 0, alive: false };

    const spawn = (x, ground, power) => {
      const pf = puffs.find((q) => q.age >= q.life);
      if (!pf) return;
      const dir = Math.random() < 0.5 ? -1 : 1;
      pf.x = x + dir * Math.random() * 8;
      pf.y = ground - 2 - Math.random() * 5;
      pf.vx = dir * (60 + Math.random() * 150) * power;
      pf.vy = -(6 + Math.random() * 26);
      pf.r0 = 4 + Math.random() * 5;
      pf.r1 = 18 + Math.random() * 26;
      pf.life = 1.4 + Math.random() * 1.3;
      pf.age = 0;
    };

    const updateSmoke = (p, end, landed, burn) => {
      const now = performance.now();
      const dt = Math.min(0.05, (now - smoke.last) / 1000);
      smoke.last = now;
      const glowEl = burnGlowRef.current;
      const nodes = smokeRef.current?.children;
      if (reduce || !nodes || !glowEl) return false;

      const ground = end.y + TAIL * BASE_SCALE;
      const near = clamp(1 - (end.y - p.y) / 150, 0, 1);

      if (landed && !smoke.wasLanded) {
        smoke.landedAt = now;
        for (let i = 0; i < 16; i++) spawn(end.x, ground, 1.3);
      }
      smoke.wasLanded = landed;

      let rate = 0;
      if (!landed) rate = 40 * burn * near;
      else rate = 12 * clamp(1 - (now - smoke.landedAt) / 1200, 0, 1);
      smoke.acc += rate * dt;
      while (smoke.acc >= 1) {
        spawn(end.x, ground, landed ? 0.6 : 1);
        smoke.acc -= 1;
      }

      const glow = landed ? 0 : burn * near;
      glowEl.setAttribute("opacity", glow.toFixed(3));
      if (glow > 0) {
        glowEl.setAttribute("cx", end.x);
        glowEl.setAttribute("cy", ground);
      }

      let alive = false;
      for (let i = 0; i < SMOKE; i++) {
        const pf = puffs[i];
        const el = nodes[i];
        if (pf.age >= pf.life) {
          if (pf.shown) {
            el.setAttribute("opacity", "0");
            pf.shown = false;
          }
          continue;
        }
        alive = true;
        pf.age += dt;
        pf.vx *= Math.exp(-2.4 * dt);
        pf.vy *= Math.exp(-1.1 * dt);
        pf.x += pf.vx * dt;
        pf.y += pf.vy * dt;
        const t = Math.min(1, pf.age / pf.life);
        const radius = pf.r0 + (pf.r1 - pf.r0) * (1 - (1 - t) * (1 - t));
        const alpha = 0.62 * Math.min(1, pf.age * 10) * Math.pow(1 - t, 1.4);
        el.setAttribute("cx", pf.x.toFixed(1));
        el.setAttribute("cy", pf.y.toFixed(1));
        el.setAttribute("r", radius.toFixed(1));
        el.setAttribute("opacity", alpha.toFixed(3));
        pf.shown = true;
      }
      smoke.alive = alive;
      return alive || glow > 0;
    };

    const tick = () => {
      frame = requestAnimationFrame(tick);
      const g = geo.current;
      const path = trailRef.current;
      if (!g.length || !g.lengthAtY || !path) return;

      const vh = window.innerHeight;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - vh);
      const progress = window.scrollY / maxScroll;
      const tipFrac = lerp(
        TIP,
        1,
        smooth(clamp((progress - 0.88) / 0.12, 0, 1)),
      );
      const targetY = window.scrollY + vh * tipFrac - g.top;
      const target = clamp(g.lengthAtY(targetY), 0, g.length);

      const prev = current;
      current = reduce ? target : current + (target - current) * 0.1;
      if (Math.abs(target - current) < 0.05) current = target;

      const p = g.pointAt(current);
      const end = g.pointAt(g.length);
      const landed = current >= g.length - 1;
      const burn = smooth(clamp((current - (g.length - BURN)) / (BURN - 60), 0, 1));
      const smoking = updateSmoke(p, end, landed, burn);

      if (
        Math.abs(prev - current) < 0.01 &&
        Math.abs(turning) < 0.05 &&
        !smoking &&
        rocketRef.current.dataset.ready
      )
        return;
      rocketRef.current.dataset.ready = "1";

      const offset = g.length - current;
      path.style.strokeDashoffset = offset;
      glowRef.current.style.strokeDashoffset = offset;

      const q = g.pointAt(Math.max(0, current - 5));
      const r = g.pointAt(Math.min(g.length, current + 5));
      let heading = (Math.atan2(r.y - q.y, r.x - q.x) * 180) / Math.PI + 90;

      const approach = clamp((current - (g.length - 440)) / 260, 0, 1);
      heading = lerp(heading, 0, smooth(approach));

      const delta = ((heading - angle + 540) % 360) - 180;
      turning = reduce ? 0 : delta;
      angle += reduce ? delta : delta * 0.2;

      const landing = smooth(clamp((current - (g.length - GROW)) / GROW, 0, 1));
      const launch = 1 - smooth(clamp(current / GROW, 0, 1));
      const size = lerp(BASE_SCALE, LAND_SCALE, Math.max(landing, launch));
      const lift = (size - BASE_SCALE) * TAIL * smooth(approach);
      rocketRef.current.setAttribute(
        "transform",
        `translate(${p.x} ${p.y - lift}) rotate(${angle}) scale(${size / BASE_SCALE})`,
      );
      rocketRef.current.dataset.landed = landed ? "true" : "false";
      flameRef.current.setAttribute("transform", `translate(0 8) scale(${1 + burn * 0.25} ${1 + burn * 1.1}) translate(0 -8)`);

      for (const wp of g.waypoints) {
        const lit = current >= (wp.at ?? Infinity) ? "true" : "false";
        if (wp.el.dataset.lit !== lit) wp.el.dataset.lit = lit;
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <svg
        ref={svgRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-0 overflow-visible"
        width={layout.w}
        height={layout.h}
        viewBox={`0 0 ${layout.w || 1} ${layout.h || 1}`}
      >
        <defs>
          <linearGradient
            id="trail-tone"
            gradientUnits="userSpaceOnUse"
            x1="0"
            y1="0"
            x2="0"
            y2={layout.h || 1}
          >
            <stop offset="0" stopColor="#d9c2ff" />
            <stop offset="0.5" stopColor="#b069db" />
            <stop offset="1" stopColor="#d9c2ff" />
          </linearGradient>
        </defs>

        <path
          d={layout.d}
          fill="none"
          stroke="#a99fcc"
          strokeOpacity="0.28"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeDasharray="0.1 9"
        />
        <path
          ref={glowRef}
          d={layout.d}
          fill="none"
          stroke="#b069db"
          strokeOpacity="0.18"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <path
          ref={trailRef}
          d={layout.d}
          fill="none"
          stroke="url(#trail-tone)"
          strokeWidth="1.6"
          strokeLinecap="round"
          style={{ strokeDashoffset: 1e5 }}
        />
      </svg>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-20 overflow-visible"
        width={layout.w}
        height={layout.h}
        viewBox={`0 0 ${layout.w || 1} ${layout.h || 1}`}
      >
        <defs>
          <radialGradient id="smoke-puff">
            <stop offset="0" stopColor="#f3eeff" stopOpacity="0.95" />
            <stop offset="0.5" stopColor="#cbbde8" stopOpacity="0.55" />
            <stop offset="1" stopColor="#a99fcc" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="burn-light">
            <stop offset="0" stopColor="#7fe3ff" stopOpacity="0.8" />
            <stop offset="0.45" stopColor="#b069db" stopOpacity="0.35" />
            <stop offset="1" stopColor="#b069db" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse ref={burnGlowRef} rx="90" ry="20" fill="url(#burn-light)" opacity="0" />
        <g ref={rocketRef} className="rocket" transform="translate(-100 -100)">
          <g transform="scale(1.35)">
            <g ref={flameRef}>
              <g className="rocket-flame">
                <path d="M-3.2 8 Q0 21 3.2 8 Z" fill="#7fe3ff" />
                <path d="M-1.6 8 Q0 15 1.6 8 Z" fill="#f3eeff" />
              </g>
            </g>
            <path d="M-4.6 2 L-8.5 9.5 L-4.2 8 Z" fill="#b069db" />
            <path d="M4.6 2 L8.5 9.5 L4.2 8 Z" fill="#b069db" />
            <path
              d="M0 -14 C6.2 -8 6.2 2 4.6 8.5 L-4.6 8.5 C-6.2 2 -6.2 -8 0 -14 Z"
              fill="#f3eeff"
            />
            <circle
              cx="0"
              cy="-3"
              r="2.1"
              fill="#0d0920"
              stroke="#b069db"
              strokeWidth="1"
            />
          </g>
        </g>
        <g ref={smokeRef}>
          {Array.from({ length: SMOKE }, (_, i) => (
            <circle key={i} r="0" fill="url(#smoke-puff)" opacity="0" />
          ))}
        </g>
      </svg>
    </>
  );
}
