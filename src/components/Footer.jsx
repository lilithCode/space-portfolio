import { SiGithub, SiKaggle, SiHuggingface, SiLinkedin } from "react-icons/si";
import site from "../data/site";
import { scrollToId } from "../lib/scroll";

const ICONS = { GitHub: SiGithub, Kaggle: SiKaggle, "Hugging Face": SiHuggingface, LinkedIn: SiLinkedin };

export default function Footer() {
  const links = site.socials.filter((s) => s.href);
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 md:mt-32">
      <div className="relative h-44 md:h-56">
        <svg
          viewBox="0 0 1600 220"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="moon-rim" x1="0" x2="1">
              <stop offset="0" stopColor="#d9c2ff" stopOpacity="0" />
              <stop offset="0.5" stopColor="#d9c2ff" stopOpacity="0.8" />
              <stop offset="1" stopColor="#d9c2ff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 150 C 90 120 160 96 250 110 C 330 122 370 70 450 74 C 540 78 560 128 650 132 C 720 136 760 150 800 150 C 840 150 880 136 950 130 C 1030 122 1070 66 1160 72 C 1240 78 1270 118 1350 112 C 1440 104 1520 92 1600 120 L 1600 220 L 0 220 Z"
            fill="#1b1438"
          />
          <path
            d="M0 150 C 90 120 160 96 250 110 C 330 122 370 70 450 74 C 540 78 560 128 650 132 C 720 136 760 150 800 150 C 840 150 880 136 950 130 C 1030 122 1070 66 1160 72 C 1240 78 1270 118 1350 112 C 1440 104 1520 92 1600 120"
            fill="none"
            stroke="url(#moon-rim)"
            strokeWidth="1.2"
            vectorEffect="non-scaling-stroke"
          />
          <g fill="#0d0920" opacity="0.55">
            <ellipse cx="300" cy="170" rx="46" ry="8" />
            <ellipse cx="520" cy="190" rx="26" ry="5" />
            <ellipse cx="1110" cy="178" rx="60" ry="9" />
            <ellipse cx="1420" cy="160" rx="30" ry="6" />
            <ellipse cx="140" cy="196" rx="22" ry="4" />
          </g>
        </svg>

        <div className="absolute left-1/2 top-[68.2%]" aria-hidden="true">
          <span className="absolute -left-10 top-0 h-px w-20 bg-gradient-to-r from-transparent via-lilac to-transparent" />
          <span className="absolute -left-[3px] -top-[3px] h-1.5 w-1.5 rounded-full bg-comet shadow-[0_0_12px_#7fe3ff]" />
          <span data-waypoint="" className="absolute left-0 block h-0 w-0" style={{ top: "-210px" }} />
          <span data-waypoint="" className="absolute left-0 block h-0 w-0" style={{ top: "-15px" }} />
        </div>
      </div>

      <div className="bg-nebula pb-10 pt-4">
        <div className="shell flex flex-col items-center gap-8 text-center">
          <ul className="flex gap-3">
            {links.map((s) => {
              const Icon = ICONS[s.label];
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-12 w-12 place-items-center rounded-full bg-void text-lilac ring-1 ring-dusk transition-all hover:bg-lilac hover:text-void"
                  >
                    {Icon && <Icon className="h-5 w-5" aria-hidden="true" />}
                  </a>
                </li>
              );
            })}
          </ul>
          <p className="text-mist">
            Designed and built by {site.fullName}
          </p>
          <button
            type="button"
            onClick={() => scrollToId("top")}
            className="inline-flex min-h-11 items-center px-3 text-sm text-star underline decoration-dusk underline-offset-4 transition-colors hover:decoration-lilac"
          >
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
