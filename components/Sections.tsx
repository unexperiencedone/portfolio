import { person, skillGroups, skillUse } from "@/lib/content";
import { CopyEmail } from "./CopyEmail";
import { GitHub, LinkedIn, Mail } from "./Icons";
import { IfInk, Illustration } from "./Illustration";
import { Panel } from "./Panel";
import { SpeedLines } from "./SpeedLines";

function weightClass(uses: number) {
  if (uses >= 3) return "bg-ink text-paper border-ink";
  if (uses === 2) return "border-[3px] border-ink";
  if (uses === 1) return "border-2 border-ink";
  return "border-2 border-dashed border-ink-2 text-ink-2";
}

export function Skills({ n }: { n: number }) {
  return (
    <Panel id="stack" n={n} label="Skill tree" as="section" labelledBy="stack-title" bodyClassName="p-5 sm:p-8 lg:p-10">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <h2 id="stack-title" className="title-ink text-[clamp(2rem,4.6vw,3rem)]">
            Skill tree, inked by how often each skill ships
          </h2>
          <p className="sfx-hi mt-3 text-[clamp(2.2rem,5vw,3.4rem)] leading-none" lang="hi">
            कौशल वृक्ष
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-x-5 gap-y-2 text-sm font-bold lg:col-span-5" aria-label="Legend">
          {[
            [3, "3+ pieces of work on this page"],
            [2, "2 pieces of work"],
            [1, "1 piece of work"],
            [0, "Used, not featured here"],
          ].map(([u, label]) => (
            <div key={label} className="flex items-center gap-2.5">
              <dt className={`h-5 w-9 shrink-0 ${weightClass(u as number)}`}>
                <span className="sr-only">{u === 3 ? "Solid" : u === 2 ? "Heavy frame" : u === 1 ? "Thin frame" : "Dashed"}</span>
              </dt>
              <dd>{label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-9 grid gap-4 md:grid-cols-3">
        {skillGroups.map((g) => (
          <section key={g.name} className="panel panel--inset" aria-labelledby={`sk-${g.name}`}>
            <div className="p-5">
              <h3 id={`sk-${g.name}`} className="flex flex-wrap items-baseline gap-x-2 text-lg font-black">
                {g.name}
                <span className="text-base font-bold text-ink-2" lang="hi">
                  {g.nameHi}
                </span>
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.skills.map((s) => {
                  const uses = skillUse(s);
                  return (
                    <li key={s} className={`inline-flex min-h-[34px] items-center gap-2 px-2.5 py-1 text-[0.9375rem] font-bold leading-tight ${weightClass(uses)}`}>
                      {s}
                      {uses > 0 && (
                        <span className="tnum text-xs opacity-80" aria-label={`used in ${uses}`}>
                          ×{uses}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        ))}
      </div>
    </Panel>
  );
}

export function Contact({ n }: { n: number }) {
  return (
    <Panel id="contact" n={n} label="Contact" variant="splash" as="section" labelledBy="contact-flood-title" bodyClassName="relative p-5 sm:p-10 lg:p-14">
      <div className="tone-event pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <SpeedLines className="h-full w-full" fx={500} fy={290} clear={260} count={210} seed={29} />
      </div>
      <div className="relative mx-auto flex max-w-[820px] flex-col items-center bg-paper px-2 py-8 text-center sm:px-10 sm:py-12">
        <p className="title-ink max-w-[26ch] text-[clamp(1.4rem,3vw,2rem)]">
          Internships, research collaborations, hackathon teams, or a website for your business.
        </p>
        <p className="mt-3 text-ink-2">
          Email is the fastest way to reach me. <span lang="hi">एक ईमेल काफ़ी है।</span>
        </p>

        <a
          href={`mailto:${person.email}`}
          className="mt-8 break-all text-[clamp(1.15rem,3.6vw,2.4rem)] font-black leading-tight underline decoration-spot decoration-[5px] underline-offset-[0.25em] hover:decoration-ink"
        >
          {person.email}
        </a>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a className="btn btn--spot" href={`mailto:${person.email}`}>
            <Mail size={18} /> Write an email
          </a>
          <CopyEmail email={person.email} />
        </div>
        <ul className="mt-3 flex flex-wrap justify-center gap-3">
          <li>
            <a className="btn" href={person.github} target="_blank" rel="noopener noreferrer">
              <GitHub size={18} /> {person.githubHandle}
              <span className="sr-only"> on GitHub (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a className="btn" href={person.linkedin} target="_blank" rel="noopener noreferrer">
              <LinkedIn size={18} /> {person.linkedinHandle}
              <span className="sr-only"> on LinkedIn (opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </div>

      <IfInk id="contact-sendoff">
        <div className="pointer-events-none relative z-10 mx-auto mt-6 w-[min(80%,340px)] lg:absolute lg:-right-8 lg:bottom-32 lg:mt-0 lg:w-[280px]">
          <Illustration id="contact-sendoff" sizes="340px" fit="contain" />
        </div>
      </IfInk>

      {/* the closing beat: to be continued */}
      <div className="relative z-10 mt-8 flex justify-center lg:-mb-2">
        <p className="inline-flex -rotate-2 flex-wrap items-baseline justify-center gap-x-4 gap-y-1 border-[3px] border-ink bg-ink px-5 py-3 text-paper">
          <span className="sfx text-[clamp(1.5rem,4vw,2.4rem)]">To be continued</span>
          <span className="sfx-hi text-[clamp(1.5rem,4vw,2.4rem)] text-spot" lang="hi">
            जारी रहेगा…
          </span>
        </p>
      </div>
    </Panel>
  );
}

export function Footer() {
  return (
    <footer className="flex flex-col gap-3 pt-10 pb-28 sm:pb-24 text-sm font-bold text-ink-2 sm:flex-row sm:items-center sm:justify-between">
      <p>
        © {new Date().getFullYear()} {person.name} · {person.location} · <span lang="hi">कानपुर से स्नेह सहित</span>
      </p>
      <a className="link-ink" href="#top">
        Back to the first panel · <span lang="hi">पहला पन्ना</span>
      </a>
    </footer>
  );
}
