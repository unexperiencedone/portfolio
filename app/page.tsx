import Link from "next/link";
import { Flood, HeldGutter } from "@/components/Panel";
import { LeadProject, MidProject } from "@/components/Projects";
import { ArrowOut } from "@/components/Icons";
import { Reader } from "@/components/Reader";
import { Arcs, Prologue } from "@/components/Journey";
import { Contact, Footer, Skills } from "@/components/Sections";
import { Splash } from "@/components/Splash";
import { leadProjects, midProjects } from "@/lib/content";
import { arcs } from "@/lib/journey";

// Reading order. The page counter, the index and the panel numbers all come from this one list.
const order = [
  { id: "top", label: "Start" },
  ...leadProjects.map((p) => ({ id: p.id, label: p.title })),
  ...midProjects.map((p) => ({ id: p.id, label: p.title })),
  { id: "shorter", label: "Side quests", href: "/works" },
  { id: "kaiketsu", label: "Kaiketsu Tech", href: "/kaiketsu" },
  { id: "prologue", label: "Prologue" },
  ...arcs.map((a) => ({ id: a.id, label: a.name })),
  { id: "stack", label: "Skill tree" },
  { id: "contact", label: "Contact" },
].map((e, i) => ({ ...e, n: i + 1 }));

const n = (id: string) => order.find((e) => e.id === id)!.n;

// Mid panels pair up on the lattice with deliberately unequal spans.
const midSpans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

// Gutters between lead panels: a beat, a scene change (product → research), a beat.
const leadGutters = ["var(--gutter-scene)", "calc(var(--u) * 16)", "var(--gutter-scene)"];

export default function Home() {
  return (
    <>
      <div className="board">
        <Splash />
        <HeldGutter note="पन्ना पलटिए" />
      </div>

      <main>
        <Flood id="work" word="The work" hindi="कारनामे" line="Main quests, ordered by impact. The editor's circle marks the proof." focus={{ x: 300 }} />

        <div className="board">
          <div className="flex flex-col pt-[var(--gutter-scene)]">
            {leadProjects.map((p, i) => (
              <div key={p.id} style={{ marginTop: i === 0 ? 0 : leadGutters[i - 1] }}>
                <LeadProject p={p} n={n(p.id)} flip={i % 2 === 1} />
              </div>
            ))}
          </div>

          {/* fast beats: related panels sit a short gutter apart */}
          <div className="mt-[var(--gutter-scene)] grid gap-[var(--gutter-beat)] lg:grid-cols-12">
            {midProjects.map((p, i) => (
              <MidProject key={p.id} p={p} n={n(p.id)} className={midSpans[i]} />
            ))}
          </div>

          <div className="mt-[var(--gutter-beat)] grid gap-[var(--gutter-beat)] lg:grid-cols-2">
            <section id="shorter" data-panel={n("shorter")} data-panel-label="Side quests" aria-labelledby="shorter-title">
              <Link href="/works" className="group panel flex h-full flex-col p-6 sm:p-10 no-underline transition-colors duration-150 hover:bg-ink hover:text-paper" data-ink="">
                <div className="panel-body flex flex-col justify-between h-full">
                  <div>
                    <h3 id="shorter-title" className="title-ink text-[clamp(1.8rem,3.4vw,2.6rem)]">Complete works</h3>
                    <p className="sfx-hi mt-2 text-[clamp(2rem,4.4vw,3rem)] leading-none" lang="hi">सम्पूर्ण रचनाएँ</p>
                    <p className="mt-6 font-bold max-w-[36ch] group-hover:text-paper text-ink-2">Hackathon builds, experiments and concepts. Smaller panels, same ink.</p>
                  </div>
                  <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-black underline decoration-spot decoration-[3px] underline-offset-4">
                    View all <ArrowOut size={15} />
                  </span>
                </div>
              </Link>
            </section>

            <section id="kaiketsu" data-panel={n("kaiketsu")} data-panel-label="Kaiketsu Tech" aria-labelledby="kaiketsu-title">
              <Link href="/kaiketsu" className="group panel flex h-full flex-col p-6 sm:p-10 no-underline transition-colors duration-150 hover:bg-ink hover:text-paper" data-ink="">
                <div className="panel-body flex flex-col justify-between h-full">
                  <div>
                    <h3 id="kaiketsu-title" className="title-ink text-[clamp(1.8rem,3.4vw,2.6rem)]">KaiketsuTech</h3>
                    <p className="sfx-hi mt-2 text-[clamp(2rem,4.4vw,3rem)] leading-none" lang="hi">समाधान</p>
                    <p className="mt-6 font-bold max-w-[36ch] group-hover:text-paper text-ink-2">Client work and guild contracts. We engineer premium software solutions tailored for high-end enterprises.</p>
                  </div>
                  <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-black underline decoration-spot decoration-[3px] underline-offset-4">
                    About the studio <ArrowOut size={15} />
                  </span>
                </div>
              </Link>
            </section>
          </div>

          {/* chapter change: from the work to the story of how it happened */}
          <div className="mt-[calc(var(--u)*16)] flex flex-col gap-[var(--gutter-beat)]">
            <Prologue n={n("prologue")} />
            <Arcs numberOf={n} />
          </div>

          <div className="mt-[calc(var(--u)*16)]">
            <Skills n={n("stack")} />
          </div>

          <HeldGutter />
        </div>

        <Flood id="contact-flood" word="Your move." hindi="चाल आपकी" line="The next arc starts with a message." focus={{ x: 720 }} />

        <div className="board pt-[var(--gutter-beat)]">
          <Contact n={n("contact")} />
          <Footer />
        </div>
      </main>

      <Reader entries={order} />
    </>
  );
}
