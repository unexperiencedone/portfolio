import { about } from "@/lib/content";
import { type Arc, arcs, prologue, toDevanagari } from "@/lib/journey";
import { ArrowOut } from "./Icons";
import { IfInk, Illustration } from "./Illustration";
import { Panel, Stamp } from "./Panel";

const arcArt = {
  "arc-origin": "arc-origin-card",
  "arc-party": "arc-party-card",
  "arc-awakening": "arc-awakening-card",
  "arc-horizon": "arc-horizon-card",
} as const;

export function Prologue({ n }: { n: number }) {
  return (
    <Panel id="prologue" n={n} label="Prologue" variant="splash" as="section" labelledBy="prologue-title" bodyClassName="grid gap-8 p-5 sm:p-8 lg:grid-cols-12 lg:gap-10 lg:p-12">
      <div className="lg:col-span-7">
        <h2 id="prologue-title" className="title-ink text-[clamp(2rem,4.6vw,3.2rem)]">
          <span className="sr-only">Prologue: </span>
          {prologue.title}
        </h2>
        <p className="sfx-hi mt-3 -rotate-1 text-[clamp(2.4rem,6.5vw,4.2rem)] leading-none" lang="hi">
          प्रस्तावना
        </p>
        <p className="mt-3 text-[1.35rem] font-bold text-ink-2" lang="hi">
          {prologue.titleHi}
        </p>
        <div className="measure mt-7 space-y-5 text-[1.125rem] leading-[1.7]">
          {about.paragraphs.map((t) => (
            <p key={t}>{t}</p>
          ))}
        </div>
        <p className="pencil mt-8 -rotate-2 text-[1.75rem]" lang="hi" aria-hidden="true">
          कानपुर से, चार पर्वों में
        </p>
      </div>
      <div className="grid content-start gap-7 lg:col-span-5">
        <IfInk id="origin-portrait">
          <div className="panel panel--inset relative mx-auto mt-8 aspect-[4/5] w-full max-w-[360px] overflow-visible lg:mt-6">
            <div className="absolute inset-x-0 -top-10 bottom-0">
              <Illustration id="origin-portrait" sizes="(min-width: 1024px) 360px, 80vw" fit="contain" position="bottom center" />
            </div>
          </div>
        </IfInk>
        <dl className="grid content-start gap-7 pt-4">
          {about.facts.map((f, i) => (
            <div key={f.label} className={`caption ${i === 1 ? "lg:ml-8" : ""}`}>
              <dt className="caption-label">{f.label}</dt>
              <dd className="leading-relaxed">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Panel>
  );
}

function ArcPanel({ arc, n, wide, compact }: { arc: Arc; n: number; wide: boolean; compact: boolean }) {
  const titleId = `${arc.id}-title`;
  const art = arcArt[arc.id as keyof typeof arcArt];
  return (
    <Panel id={arc.id} n={n} label={arc.name} as="article" labelledBy={titleId} className="h-full" bodyClassName="flex h-full flex-col p-5 sm:p-8">
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
        <div>
          <h3 id={titleId} className="title-ink text-[clamp(1.6rem,3.4vw,2.3rem)]">
            Arc {arc.n}: {arc.name}
          </h3>
          <p className="sfx-hi mt-2 text-[clamp(2.3rem,5.5vw,3.6rem)] leading-none" lang="hi">
            {arc.nameHi}
          </p>
          <p className="mt-2 font-bold text-ink-2">
            {arc.period} · {arc.theme}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          {/* Mukta, not Rozha: Rozha's Devanagari digits read as Latin numerals */}
          <span className={`text-[2.1rem] font-black leading-none text-ink-2 ${compact ? "lg:hidden" : ""}`} lang="hi" aria-hidden="true">
            पर्व {toDevanagari(arc.n)}
          </span>
          {arc.ongoing && (
            <Stamp dashed>
              Ongoing · <span lang="hi">जारी</span>
            </Stamp>
          )}
        </div>
      </div>

      {art && (
        <IfInk id={art}>
          <div className="panel panel--inset mt-6 aspect-[16/7] overflow-hidden">
            <Illustration id={art} sizes={wide ? "(min-width: 1280px) 1100px, 92vw" : "(min-width: 1024px) 560px, 92vw"} />
          </div>
        </IfInk>
      )}

      <ol className={`mt-9 grid gap-x-5 gap-y-8 ${wide ? "md:grid-cols-2" : ""}`}>
        {arc.episodes.map((e, i) => (
          <li key={e.title} className="caption">
            <span className="caption-label">
              Ep. {i + 1} · <span lang="hi">प्रसंग {toDevanagari(i + 1)}</span>
            </span>
            <p className="font-black leading-tight">{e.title}</p>
            <p className="mt-1.5 text-[0.975rem] leading-relaxed text-ink-2">{e.text}</p>
            {e.link && (
              <a className="link-ink mt-3 text-[0.95rem]" href={e.link.href} target="_blank" rel="noopener noreferrer">
                {e.link.label} <ArrowOut size={15} />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </li>
        ))}
      </ol>

      <div className="mt-auto pt-8">
        <div className="flex flex-col gap-3 border-t-[3px] border-ink pt-5 sm:flex-row sm:items-center">
          <p className="shrink-0 font-black">
            Unlocked · <span lang="hi">अर्जित शक्तियाँ</span>
          </p>
          <ul className="flex flex-wrap gap-2" aria-label={`${arc.name} skills unlocked`}>
            {arc.unlocked.map((s) => (
              <li key={s} className="badge">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Panel>
  );
}

// Page layout: two short arcs share a tier, the long awakening arc takes a full row, the ongoing arc closes wide.
const arcSpans = ["lg:col-span-5", "lg:col-span-7", "lg:col-span-12", "lg:col-span-12"];

export function Arcs({ numberOf }: { numberOf: (id: string) => number }) {
  return (
    <div className="grid gap-[var(--gutter-beat)] lg:grid-cols-12">
      {arcs.map((arc, i) => (
        <div key={arc.id} className={arcSpans[i]}>
          <ArcPanel arc={arc} n={numberOf(arc.id)} wide={i >= 2} compact={i === 0} />
        </div>
      ))}
    </div>
  );
}
