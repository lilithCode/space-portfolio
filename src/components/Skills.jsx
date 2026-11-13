import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import Section from "./Section";
import skills, { groups } from "../data/skills";

const HEX = "50,1.5 98.5,29.5 98.5,86 50,114 1.5,86 1.5,29.5";
const RATIO = 1.1547;
const ease = [0.22, 1, 0.36, 1];
const groupLabel = Object.fromEntries(groups.map((g) => [g.id, g.label]));
const slug = (s) => s.replace(/\W/g, "");

function useWidth(ref) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, [ref]);
  return width;
}

function layoutComb(count, width) {
  const w = width < 480 ? 84 : width < 760 ? 104 : 122;
  const h = w * RATIO;
  const gap = width < 480 ? 6 : 9;
  const sx = w + gap;
  const sy = h * 0.75 + gap * 0.87;
  const cols = Math.max(2, Math.floor((width + gap) / sx));

  const rows = [];
  let left = count;
  for (let r = 0; left > 0; r++) {
    const n = Math.min(left, r % 2 === 0 ? cols : cols - 1);
    rows.push(n);
    left -= n;
  }

  const combW = cols * sx - gap;
  const shift = (width - combW) / 2;
  const cells = [];
  rows.forEach((n, r) => {
    const full = r % 2 === 0 ? cols : cols - 1;
    const offset = (r % 2 === 0 ? 0 : sx / 2) + ((full - n) * sx) / 2;
    for (let c = 0; c < n; c++) cells.push({ x: shift + offset + c * sx, y: r * sy });
  });

  const height = (rows.length - 1) * sy + h;
  const cx = width / 2;
  const cy = height / 2;
  const far = Math.hypot(cx, cy) || 1;
  cells.forEach((cell) => {
    cell.delay = (Math.hypot(cell.x + w / 2 - cx, cell.y + h / 2 - cy) / far) * 0.7;
  });
  return { cells, w, h, height };
}

function Cell({ skill, cell, w, h, active, dimmed, onSelect }) {
  const Icon = skill.icon;
  const fillId = `hexfill-${slug(skill.name)}`;
  return (
    <motion.button
      type="button"
      aria-pressed={active}
      aria-label={skill.name}
      onPointerEnter={(e) => e.pointerType === "mouse" && onSelect(skill)}
      onFocus={() => onSelect(skill)}
      onClick={() => onSelect(skill)}
      className="group absolute outline-none"
      style={{
        left: cell.x,
        top: cell.y,
        width: w,
        height: h,
        clipPath: "polygon(50% 0, 100% 25%, 100% 75%, 50% 100%, 0 75%, 0 25%)",
      }}
      variants={{
        hidden: { opacity: 0, scale: 0.2, rotate: -40 },
        show: {
          opacity: 1,
          scale: 1,
          rotate: 0,
          transition: { delay: cell.delay, type: "spring", stiffness: 210, damping: 17 },
        },
      }}
    >
      <span
        className={`absolute inset-0 grid place-items-center transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          dimmed ? "opacity-20" : "opacity-100"
        } ${active ? "scale-[1.04]" : "group-hover:scale-[1.04]"}`}
      >
        <svg viewBox="0 0 100 115.47" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <defs>
            <radialGradient id={fillId} cx="50%" cy="35%" r="70%">
              <stop offset="0" stopColor={active ? skill.color : "#2e2459"} stopOpacity={active ? 0.3 : 1} />
              <stop offset="1" stopColor="#1b1438" />
            </radialGradient>
          </defs>
          <polygon
            points={HEX}
            fill={`url(#${fillId})`}
            stroke={active ? "#d9c2ff" : "#2e2459"}
            strokeWidth="1.5"
            strokeLinejoin="round"
            className="transition-[stroke] duration-300 group-hover:stroke-lilac group-focus-visible:stroke-comet"
          />
        </svg>
        <span className="relative flex flex-col items-center gap-1.5 px-2 text-center">
          <Icon
            aria-hidden="true"
            className={`transition-colors duration-300 ${active ? "" : "text-lilac"}`}
            style={{ width: w * 0.34, height: w * 0.34, color: active ? skill.color : undefined }}
          />
          <span className="hidden max-w-[88%] text-[0.75rem] leading-tight text-mist transition-colors group-hover:text-star md:block">
            {skill.name}
          </span>
        </span>
      </span>
    </motion.button>
  );
}

function Readout({ skill, compact = false }) {
  const badge = compact ? "h-14 w-12" : "h-28 w-24";
  return (
    <div aria-live="polite" className="min-h-[5rem]">
      <AnimatePresence mode="wait" initial={false}>
        {skill ? (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease }}
            className={compact ? "flex items-start gap-4" : ""}
          >
            <span
              className={`relative grid shrink-0 place-items-center ${badge}`}
              style={{ filter: `drop-shadow(0 0 22px ${skill.color}55)` }}
            >
              <svg viewBox="0 0 100 115.47" className="absolute inset-0 h-full w-full" aria-hidden="true">
                <polygon points={HEX} fill="#0d0920" stroke={skill.color} strokeOpacity="0.7" strokeWidth="2" />
              </svg>
              <skill.icon
                aria-hidden="true"
                className={`relative ${compact ? "h-6 w-6" : "h-11 w-11"}`}
                style={{ color: skill.color }}
              />
            </span>
            <div>
              <p className={`text-sm font-semibold text-lilac ${compact ? "" : "mt-6"}`}>
                {groupLabel[skill.group]}
              </p>
              <h3 className={`font-display leading-tight ${compact ? "text-2xl" : "mt-1 text-4xl"}`}>
                {skill.name}
              </h3>
              <p className={`text-star/80 ${compact ? "mt-1 text-[0.95rem]" : "mt-4"}`}>{skill.description}</p>
              {!compact && skill.usedIn.length > 0 && (
                <>
                  <p className="mt-6 text-sm text-mist">Used in</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {skill.usedIn.map((p) => (
                      <li key={p} className="rounded-full bg-void px-3 py-1 text-sm text-lilac ring-1 ring-dusk">
                        {p}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={compact ? "flex items-center gap-4" : ""}
          >
            <span className={`relative block shrink-0 ${badge}`}>
              <svg viewBox="0 0 100 115.47" className="absolute inset-0 h-full w-full" aria-hidden="true">
                <polygon
                  points={HEX}
                  fill="none"
                  stroke="#a99fcc"
                  strokeWidth="2"
                  strokeDasharray="0.1 8"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <p className={`text-star/80 ${compact ? "" : "mt-6 text-lg"}`}>
              {compact
                ? "Tap a skill to see what I use it for."
                : "Hover over a skill to see what I use it for and where it shows up in my work."}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Skills() {
  const combRef = useRef(null);
  const width = useWidth(combRef);
  const inView = useInView(combRef, { once: true, amount: 0.2 });
  const [active, setActive] = useState(skills[0]);
  const [filter, setFilter] = useState(null);

  const comb = useMemo(() => (width ? layoutComb(skills.length, width) : null), [width]);

  return (
    <Section
      id="skills"
      index={2}
      title="Skills and tools"
      intro="What I build with, from the interface down to the model behind it."
    >
      <div className="indent">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter skills by area">
          {[{ id: null, label: "All" }, ...groups].map((g) => {
            const on = filter === g.id;
            return (
              <button
                key={g.label}
                type="button"
                aria-pressed={on}
                onClick={() => {
                  setFilter(g.id);
                  setActive(skills.find((s) => g.id === null || s.group === g.id) ?? skills[0]);
                }}
                className={`rounded-full px-4 py-2 text-[0.95rem] font-medium ring-1 transition-colors ${
                  on ? "bg-lilac text-void ring-lilac" : "text-mist ring-dusk hover:text-star hover:ring-lilac/60"
                }`}
              >
                {g.label}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <motion.div
            ref={combRef}
            className="relative lg:col-span-8"
            style={{ height: comb?.height ?? 600 }}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            {comb &&
              skills.map((s, i) => (
                <Cell
                  key={s.name}
                  skill={s}
                  cell={comb.cells[i]}
                  w={comb.w}
                  h={comb.h}
                  active={active?.name === s.name}
                  dimmed={filter !== null && s.group !== filter}
                  onSelect={setActive}
                />
              ))}
          </motion.div>

          <aside className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-32 rounded-[2rem] border border-dusk bg-nebula/60 p-8 backdrop-blur-md">
              <Readout skill={active} />
            </div>
          </aside>
        </div>

        <div className="sticky bottom-3 z-30 mt-8 rounded-3xl border border-dusk bg-nebula/90 p-4 backdrop-blur-md md:mx-auto md:max-w-xl lg:hidden">
          <Readout skill={active} compact />
        </div>
      </div>
    </Section>
  );
}
