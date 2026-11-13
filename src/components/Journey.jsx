import Section from "./Section";
import { Reveal } from "./Reveal";
import Highlight from "./Highlight";
import journey from "../data/journey";

const PROJECT = "text-comet";
const TECH = "text-lilac";
const TERMS = {
  PassFort: PROJECT,
  BeatStream: PROJECT,
  "Trova Tstra": PROJECT,
  "Lilith's Canvas": PROJECT,
  Amadeus: PROJECT,
  Iris: PROJECT,
  Echo: PROJECT,
  Jinx: PROJECT,
  "0Keys": PROJECT,
  "C++": TECH,
  React: TECH,
  Express: TECH,
  MongoDB: TECH,
  "Three.js": TECH,
  "Next.js": TECH,
  GSAP: TECH,
  "TensorFlow.js": TECH,
  "Llama-3 8B": TECH,
  Unsloth: TECH,
  "Steins;Gate": TECH,
  "retrieval-augmented generation": TECH,
};

export default function Journey() {
  return (
    <Section
      id="journey"
      index={3}
      title="How I got here"
      intro="From hand-rolled data structures in C++ to fine-tuned LLMs, one shipped project at a time."
    >
      <ol className="indent relative space-y-24 pb-24 lg:space-y-20 lg:pb-40 lg:pt-16">
        {journey.map((step, i) => {
          const right = i % 2 === 1;
          return (
            <li
              key={step.date + step.title}
              className={`journey-item relative lg:grid lg:grid-cols-[1fr_5rem_1fr] ${
                right ? "max-lg:-ml-[var(--rail-indent)] max-lg:pr-[var(--rail-indent)] max-lg:text-right" : ""
              }`}
            >
              <div className={`${right ? "lg:col-start-3" : "lg:col-start-1 lg:text-right"} lg:row-start-1`}>
                <Reveal>
                  <p className="text-sm font-semibold text-lilac">{step.date}</p>
                  <h3 className="mt-1 font-display text-[1.75rem] leading-tight md:text-[2rem]">{step.title}</h3>
                  <p className={`mt-3 max-w-[30rem] text-star/80 ${right ? "max-lg:ml-auto" : "lg:ml-auto"}`}><Highlight text={step.text} terms={TERMS} /></p>
                </Reveal>
              </div>
              <span
                className="node absolute top-1.5 lg:static lg:col-start-2 lg:row-start-1 lg:mx-auto lg:mt-1.5"
                style={
                  right
                    ? { right: "calc(var(--rail) - 0.4375rem)" }
                    : { left: "calc(var(--rail) - var(--rail-indent) - 0.4375rem)" }
                }
                data-waypoint=""
                aria-hidden="true"
              />
              <span
                data-waypoint=""
                aria-hidden="true"
                className="absolute bottom-0 block h-0 w-0 lg:hidden"
                style={right ? { right: "var(--rail)" } : { left: "calc(var(--rail) - var(--rail-indent))" }}
              />
            </li>
          );
        })}
        <span
          data-waypoint=""
          aria-hidden="true"
          className="absolute bottom-32 hidden h-0 w-0 lg:block"
          style={{ left: "calc(var(--rail-indent) + (100% - var(--rail-indent)) / 2)" }}
        />
      </ol>
    </Section>
  );
}
