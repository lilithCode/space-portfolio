import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight, FiGithub, FiPlay } from "react-icons/fi";
import { TbRocket } from "react-icons/tb";
import Section from "./Section";
import { Reveal } from "./Reveal";
import projects from "../data/projects";

function ProjectLinks({ project }) {
  const items = [
    project.live && { href: project.live, label: "Visit site", icon: FiArrowUpRight },
    project.demo && { href: project.demo, label: "Watch demo", icon: FiPlay },
    project.code && { href: project.code, label: "View code", icon: FiGithub },
  ].filter(Boolean);

  return (
    <div className="flex flex-wrap gap-3">
      {items.map(({ href, label, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${label}: ${project.title}`}
          className="inline-flex items-center gap-2 rounded-full border border-dusk px-4 py-2 text-[0.95rem] text-star transition-colors hover:border-lilac hover:bg-lilac/10"
        >
          <Icon aria-hidden="true" className="h-4 w-4" />
          {label}
        </a>
      ))}
    </div>
  );
}

function DrawnCover({ project }) {
  return (
    <div className="relative grid aspect-[16/9] place-items-center overflow-hidden bg-[radial-gradient(circle_at_50%_40%,#2e2459,#1b1438_55%,#0d0920)]">
      <svg viewBox="0 0 400 225" className="absolute inset-0 h-full w-full" aria-hidden="true">
        {[40, 70, 100, 130].map((r) => (
          <circle
            key={r}
            cx="200"
            cy="100"
            r={r}
            fill="none"
            stroke="#d9c2ff"
            strokeOpacity={0.5 - r / 400}
            strokeDasharray="0.1 6"
            strokeLinecap="round"
          />
        ))}
      </svg>
      <div className="relative flex flex-col items-center text-center">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-void text-lilac shadow-[0_0_60px_-10px_#b069db] ring-1 ring-lilac/40">
          <TbRocket className="h-10 w-10" aria-hidden="true" />
        </span>
        <p className="mt-5 font-display text-3xl text-star md:text-4xl">{project.title}</p>
        <p className="mt-1 text-mist">{project.cover?.tagline}</p>
      </div>
    </div>
  );
}

function ProjectRow({ project, flip, side }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], [24, -24]);
  const href = project.live || project.demo || project.code;

  const image = (
    <Reveal className="lg:col-span-7">
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-hidden="true"
        style={{ y: drift }}
        className="group block overflow-hidden rounded-2xl border border-dusk bg-nebula max-lg:[transform:none!important] shadow-[0_40px_100px_-40px_rgb(176_105_219/0.65)] transition-colors hover:border-lilac/60"
      >
        {project.image ? (
          <img
            src={project.image}
            alt=""
            loading="lazy"
            className="block h-auto w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
          />
        ) : (
          <DrawnCover project={project} />
        )}
      </motion.a>
    </Reveal>
  );

  const text = (
    <Reveal delay={0.1} className="lg:col-span-4">
      <p className="text-sm text-mist">{project.year}</p>
      <h3 className="mt-2 font-display text-[clamp(2.25rem,3.6vw,3.1rem)] leading-none">{project.title}</h3>
      <p className="mt-5 text-star/85">{project.summary}</p>
      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Built with">
        {project.stack.map((s) => (
          <li key={s} className="rounded-full bg-nebula px-3 py-1 text-sm text-lilac ring-1 ring-dusk">
            {s}
          </li>
        ))}
      </ul>
      <div className="mt-7">
        <ProjectLinks project={project} />
      </div>
    </Reveal>
  );

  const node = (
    <div className="relative hidden items-center justify-center self-stretch lg:col-span-1 lg:flex">
      <span data-waypoint="straight" aria-hidden="true" className="absolute top-0 left-1/2 h-0 w-0" />
      <span className="node" data-waypoint="straight" aria-hidden="true" />
      <span data-waypoint="straight" aria-hidden="true" className="absolute bottom-0 left-1/2 h-0 w-0" />
    </div>
  );

  return (
    <article
      ref={ref}
      className={`relative grid items-center gap-8 lg:grid-cols-12 lg:gap-0 ${
        side === "right" ? "max-lg:-ml-[var(--rail-indent)] max-lg:pr-[var(--rail-indent)]" : ""
      }`}
    >
      {["top-0", "bottom-0"].map((edge) => (
        <span
          key={edge}
          data-waypoint=""
          aria-hidden="true"
          className={`absolute ${edge} block h-0 w-0 lg:hidden`}
          style={side === "right" ? { right: "var(--rail)" } : { left: "calc(var(--rail) - var(--rail-indent))" }}
        />
      ))}
      {flip ? (
        <>
          {text}
          {node}
          {image}
        </>
      ) : (
        <>
          {image}
          {node}
          {text}
        </>
      )}
    </article>
  );
}

export default function Projects() {
  return (
    <Section
      id="work"
      index={1}
      loop
      title="Selected work"
      intro="Chatbots with personality, a keyboard made of air, and a few games. Most of these are live, so go and try them."
    >
      <div className="indent space-y-36 md:space-y-40 lg:space-y-56 lg:pt-36 lg:pb-40">
        {projects.map((p, i) => (
          <ProjectRow key={p.title} project={p} flip={i % 2 === 1} side={i % 2 === 1 ? "right" : "left"} />
        ))}
      </div>
    </Section>
  );
}
