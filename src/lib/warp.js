export const BRAKE = 700;

const TONES = ["243,238,255", "217,194,255", "127,227,255"];
const TONE_ODDS = [0, 0, 0, 1, 2];
const DEPTHS = 6;

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const smooth = (t) => t * t * (3 - 2 * t);
const smoother = (t) => t * t * t * (t * (t * 6 - 15) + 10);

function speedAt(t, brakeFrom) {
  let v = 2.6;
  if (t < 250) v = 0.03;
  else if (t < 1900) v = 0.03 + smoother((t - 250) / 1650) * 2.57;
  if (brakeFrom != null) v = v * (1 - smooth(clamp((t - brakeFrom) / BRAKE, 0, 1))) + 0.03;
  return v;
}

export function createWarp(canvas, { reduce = false } = {}) {
  const ctx = canvas.getContext("2d", { alpha: false });
  const raf = typeof requestAnimationFrame === "function" ? requestAnimationFrame : (cb) => setTimeout(() => cb(performance.now()), 16);
  const caf = typeof cancelAnimationFrame === "function" ? cancelAnimationFrame : clearTimeout;

  let w = 0;
  let h = 0;
  let stars = [];
  let glow = null;
  let frame = 0;
  let running = false;
  let stopped = false;
  let start = 0;
  let last = 0;
  let brakeAsked = false;
  let brakeFrom = null;
  const paths = new Array(TONES.length * DEPTHS).fill(null);

  const spawn = (s, z = Math.random()) => {
    s.a = Math.random() * Math.PI * 2;
    s.r = 0.04 + Math.sqrt(Math.random()) * 1.1;
    s.z = Math.max(0.05, z);
    s.tone = TONE_ODDS[(Math.random() * TONE_ODDS.length) | 0];
    return s;
  };

  const draw = (now) => {
    frame = 0;
    if (stopped) return;
    if (!start) start = last = now;
    const t = now - start;
    const dt = Math.min(1 / 30, (now - last) / 1000);
    last = now;

    if (brakeAsked && brakeFrom == null) brakeFrom = t;
    const speed = reduce ? 0 : speedAt(t, brakeFrom);
    const swirl = speed * 0.45;
    const cx = w / 2;
    const cy = h / 2;
    const focal = (Math.max(w, h) * 0.55) / 6;
    const trail = 0.012 + speed * 0.05;
    const back = speed > 0.001 ? (swirl * trail) / (speed * 0.42) : 0;

    ctx.globalAlpha = 1;
    ctx.fillStyle = "#0d0920";
    ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = Math.min(1, 0.25 + speed * 0.3);
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);
    ctx.globalAlpha = 1;

    paths.fill(null);
    for (const s of stars) {
      s.z -= speed * dt * 0.42;
      s.a += swirl * dt;
      if (s.z <= 0.04) spawn(s, 1);

      const k0 = (s.r * focal) / s.z;
      const x0 = cx + Math.cos(s.a) * k0;
      const y0 = cy + Math.sin(s.a) * k0;
      if (x0 < -40 || x0 > w + 40 || y0 < -40 || y0 > h + 40) {
        if (speed > 0.3) spawn(s, 1);
        continue;
      }

      const k1 = (s.r * focal) / (s.z + trail);
      const k2 = (s.r * focal) / (s.z + trail * 0.5);
      const x1 = cx + Math.cos(s.a - back) * k1;
      const y1 = cy + Math.sin(s.a - back) * k1;
      const xm = cx + Math.cos(s.a - back * 0.5) * k2;
      const ym = cy + Math.sin(s.a - back * 0.5) * k2;

      const band = Math.min(DEPTHS - 1, ((1 - s.z) * DEPTHS) | 0);
      const key = s.tone * DEPTHS + band;
      const p = paths[key] || (paths[key] = new Path2D());
      p.moveTo(x0, y0);
      p.quadraticCurveTo(2 * xm - (x0 + x1) / 2, 2 * ym - (y0 + y1) / 2, x1 + 0.01, y1);
    }

    ctx.lineCap = "round";
    for (let tone = 0; tone < TONES.length; tone++) {
      for (let band = 0; band < DEPTHS; band++) {
        const p = paths[tone * DEPTHS + band];
        if (!p) continue;
        const depth = (band + 0.5) / DEPTHS;
        ctx.strokeStyle = `rgba(${TONES[tone]},${clamp(depth * 1.3, 0.05, 1)})`;
        ctx.lineWidth = 0.6 + depth * 2;
        ctx.stroke(p);
      }
    }

    const settled = brakeFrom != null && t > brakeFrom + BRAKE + 60;
    running = !reduce && !settled;
    if (running) frame = raf(draw);
  };

  const kick = () => {
    if (!frame && !stopped) frame = raf(draw);
  };

  return {
    resize(width, height, dpr) {
      w = width;
      h = height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      glow = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.6);
      glow.addColorStop(0, "rgba(176,105,219,0.32)");
      glow.addColorStop(0.45, "rgba(46,36,89,0.3)");
      glow.addColorStop(1, "rgba(13,9,32,0)");
      const count = clamp(Math.round((w * h) / 2600), 180, 620);
      if (stars.length !== count) stars = Array.from({ length: count }, () => spawn({}));
      kick();
    },
    brake() {
      brakeAsked = true;
      kick();
    },
    stop() {
      stopped = true;
      if (frame) caf(frame);
    },
  };
}
