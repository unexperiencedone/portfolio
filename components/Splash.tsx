import { person } from "@/lib/content";
import { ArrowDown, GitHub, LinkedIn, Mail } from "./Icons";
import { IfInk, Illustration } from "./Illustration";
import { Circled, Panel, PencilArrow } from "./Panel";
import { SpeedLines } from "./SpeedLines";
import LiquidCarveButton from "./LiquidCarveButton";

const heroStack = ["Python", "PyTorch", "DistilBERT", "FastAPI", "Next.js", "TypeScript"];

const chapters = [
  { href: "#work", label: "The work", hi: "कारनामे" },
  { href: "#prologue", label: "Arcs", hi: "पर्व" },
  { href: "#stack", label: "Skill tree", hi: "कौशल" },
];

function Masthead() {
  return (
    <nav aria-label="Chapters" className="relative z-30 flex items-center justify-between gap-4 border-b-[3px] border-ink bg-paper py-3">
      <a
        href="#top"
        className="flex items-center gap-3 text-ink no-underline group"
        aria-label={`${person.name} - Home`}
      >
        <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden="true" className="shrink-0">
          <path d="M3 3h14v15H3zM20 3h9v9h-9zM20 15h9v14h-9zM3 21h14v8H3z" fill="none" stroke="var(--ink)" strokeWidth="2.5" />
          <rect x="21.5" y="16.5" width="6" height="11" fill="var(--spot)" />
        </svg>
        <span
          lang="hi"
          style={{
            fontFamily: "'Amita', cursive",
            fontWeight: 700,
            fontSize: "1.35rem",
            lineHeight: 1,
            letterSpacing: "0.02em",
          }}
          className="transition-colors group-hover:text-spot"
        >
          आक्षांत कुमार
        </span>
      </a>
      <ul className="flex items-center gap-1 sm:gap-2">
        {chapters.map((c) => (
          <li key={c.href} className="hidden md:block">
            <a href={c.href} className="group flex flex-col items-center px-3 py-1 leading-tight text-ink no-underline">
              <span className="font-bold decoration-spot decoration-[3px] underline-offset-[6px] group-hover:underline">{c.label}</span>
              <span className="text-[0.8rem] font-bold text-ink-2" lang="hi">
                {c.hi}
              </span>
            </a>
          </li>
        ))}
        <li>
          <a className="btn btn--small btn--spot" href="#contact-flood">
            <Mail size={16} /> Contact · <span lang="hi">संपर्क</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}

export function Splash() {
  return (
    <header className="relative pb-10 lg:pb-20">
      <Masthead />
      <div className="relative pt-8 sm:pt-12">
        <span className="trim -left-3 top-4 sm:top-8" aria-hidden="true" />
        <span className="trim -right-3 top-4 sm:top-8" aria-hidden="true" />

        <Panel id="top" n={1} label="Start" variant="splash" as="div" bodyClassName="lg:grid lg:min-h-[min(82svh,760px)] lg:grid-cols-12">
          {/* the splash art bleeds past the frame and the trim: speed lines converge on the proof */}
          <div
            className="tone-event pointer-events-none absolute inset-x-0 top-0 h-[150px] overflow-hidden sm:h-[230px] lg:inset-x-auto lg:-top-12 lg:right-[calc(var(--board-pad)*-1)] lg:bottom-[-3rem] lg:h-auto lg:w-[calc(48%+var(--board-pad))]"
            aria-hidden="true"
          >
            <SpeedLines className="h-full w-full" fx={430} fy={330} clear={150} count={170} seed={11} />
          </div>

          {/* the opening sound of the chapter, set into the speed lines */}
          <p
            className="sfx-hi tone-event pointer-events-none absolute right-[6%] top-[4%] z-[7] hidden rotate-[8deg] text-[clamp(3.5rem,6vw,5.5rem)] leading-none text-ink lg:block"
            style={{ paintOrder: "stroke fill", WebkitTextStroke: "0.14em var(--paper)" }}
            lang="hi"
            aria-hidden="true"
          >
            आरंभ!
          </p>

          {/* the character breaks out through the top of the frame (desktop) */}
          <IfInk id="hero-author">
            <div className="pointer-events-none absolute -top-16 bottom-0 right-[14%] z-[6] hidden w-[36%] lg:block">
              <Illustration id="hero-author" sizes="(min-width: 1024px) 460px, 0px" priority fit="contain" position="bottom center" />
            </div>
          </IfInk>

          <div className="relative z-10 flex flex-col justify-between gap-10 p-6 pt-9 sm:p-10 lg:col-span-7 lg:p-14 lg:pb-28">
            <div>
              <h1
                className="sfx text-ink"
                style={{
                  fontSize: "clamp(2.45rem, 11.4vw, 6rem)",
                  paintOrder: "stroke fill",
                  WebkitTextStroke: "0.14em var(--paper)",
                }}
              >
                <span className="block -rotate-2">Aakshant</span>
                <span className="mt-1 block pl-[12%] -rotate-2">Kumar</span>
              </h1>
              <p className="title-ink mt-9 max-w-[19ch] text-[clamp(1.6rem,3.4vw,2.35rem)]">{person.line}</p>
              <p className="mt-2 text-[clamp(1.2rem,2.4vw,1.55rem)] font-bold text-ink" lang="hi">
                {person.lineHi}
              </p>
              <p className="measure mt-4 max-w-[46ch] text-ink-2">
                Third-year B.Tech CSE (AI) at CSJM University, Kanpur. Co-founder and VP Tech at{" "}
                <a className="font-bold text-ink underline decoration-spot decoration-[3px] underline-offset-4 hover:decoration-ink" href={person.kaiketsu} target="_blank" rel="noopener noreferrer">
                  Kaiketsu Tech<span className="sr-only"> (kaiketsutech.online, opens in a new tab)</span>
                </a>
                , and founder of hackathon squad Void Walkers.
              </p>
            </div>

            <div className="relative">
              <p className="pencil mb-1 flex items-end gap-1 text-[1.6rem]" lang="hi" aria-hidden="true">
                यहाँ से शुरू करें
                <PencilArrow className="translate-y-3 rotate-[18deg]" />
              </p>
              <div className="flex flex-wrap gap-3">
                <LiquidCarveButton
                  label="Read the work"
                  link="#work"
                  newTab={false}
                  colors={{ fill: "#ff1f6f", textColor: "#f5f5f2" }}
                  blob={{ color: "#0d0d0d", size: 60, smoothness: 50 }}
                  font={{
                    fontWeight: 900,
                    fontSize: 16,
                    lineHeight: "1",
                  }}
                  padding="12px 24px"
                  rounded={10}
                  addIcon={true}
                  icon={{ symbol: "↓", size: 18, color: "var(--paper)", side: "right" }}
                  gap={6}
                />
                <a className="btn" href={person.github} target="_blank" rel="noopener noreferrer">
                  <GitHub size={18} /> GitHub
                </a>
                <a className="btn" href={person.linkedin} target="_blank" rel="noopener noreferrer">
                  <LinkedIn size={18} /> LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* mobile: the character gets its own beat between the actions and the proof */}
          <IfInk id="hero-author">
            <div className="relative z-10 mx-auto -mb-2 w-[min(78%,300px)] lg:hidden">
              <Illustration id="hero-author" sizes="(max-width: 1023px) 300px, 0px" fit="contain" position="bottom center" />
            </div>
          </IfInk>

          {/* inset panels: the quick-scan proof, pinned to the lower-right corner of the splash */}
          <div className="relative z-10 grid gap-4 px-6 pb-8 sm:px-10 lg:col-span-5 lg:content-end lg:gap-5 lg:px-0 lg:pb-0">
            <Panel variant="inset" as="div" className="lg:mr-24 lg:-rotate-2" bodyClassName="p-5">
              <p className="sfx text-[clamp(2.2rem,5vw,3rem)] leading-none">
                <Circled>Finalist</Circled>
              </p>
              <p className="mt-4 font-bold leading-snug">Mind Installers Hackathon 4.0, with VedaVoice</p>
            </Panel>
            <Panel variant="inset" as="div" className="lg:-mb-12 lg:-mr-12 lg:ml-10 lg:rotate-[1.5deg]" bodyClassName="p-5">
              <p className="sfx tnum text-[clamp(2.2rem,5vw,3rem)] leading-none">
                <Circled>113/292</Circled>
              </p>
              <p className="mt-4 font-bold leading-snug">commits on Robo Rumble 3.0, the most of any contributor</p>
            </Panel>
          </div>
        </Panel>

        <Panel
          variant="inset"
          as="div"
          className="relative z-20 mx-4 -mt-5 sm:mx-10 lg:absolute lg:-bottom-14 lg:left-[calc(var(--board-pad)+56px)] lg:mx-0 lg:mt-0 lg:w-[min(500px,40%)]"
          bodyClassName="p-4 sm:p-5"
        >
          <ul className="flex flex-wrap gap-2" aria-label="Working stack">
            {heroStack.map((s) => (
              <li key={s} className="badge">
                {s}
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </header>
  );
}
