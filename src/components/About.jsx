import Section from "./Section";
import Portrait from "./Portrait";
import { Reveal } from "./Reveal";
import site from "../data/site";

export default function About() {
  const links = site.socials.filter((s) => s.href);

  return (
    <Section
      id="about"
      index={4}
      title="About me"
      intro="Full-stack dev who ships AI products people actually want to use, not just demos."
    >
      <div className="indent grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-6 lg:-ml-16">
          <Portrait
            src={site.portrait}
            cutout={site.portraitCutout}
            variant={site.portraitStyle}
            alt={`Portrait of ${site.name}`}
          />
        </Reveal>

        <div className="lg:col-span-6 lg:pl-4">
          <Reveal
            as="p"
            className="max-w-[36rem] font-display font-normal text-2xl leading-snug tracking-[-0.01em] text-star md:text-[2rem]"
          >
            I'm {site.name}. I'm a full stack MERN developer who builds AI products
            that people actually want to use. I ship things that
            work, and I ship them fast. My work is open source, and I love
            mentoring others to help them grow as engineers.
          </Reveal>
          <Reveal
            as="p"
            delay={0.1}
            className="mt-6 max-w-[34rem] text-lg text-mist"
          >
            Side life: I'm an Asian girl who's almost 20. I love reading
            Agatha Christie mystery novels, painting (sometimes making a mess
            and calling it abstract art), spending questionable amounts of time
            playing video games and watching anime. I also love messing around
            with electronics (ESP32 experiments, anyone?) and picking up hobbies
            I probably don't need but absolutely want to try. I just can't stick
            to one thing for too long :){" "}
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pl-4">
          <Reveal
            as="dl"
            delay={0.2}
            className="divide-y divide-dusk border-y border-dusk"
          >
            <div className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
              <dt className="text-sm font-semibold text-lilac">Find me on</dt>
              <dd className="flex flex-wrap gap-x-5 gap-y-1">
                {links.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center text-star underline decoration-dusk underline-offset-4 transition-colors hover:decoration-lilac"
                  >
                    {s.label}
                  </a>
                ))}
              </dd>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
