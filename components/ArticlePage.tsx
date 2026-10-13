import Link from "next/link";
import { type Article, href, type Kind, kindLabel, minutes } from "@/lib/articles";
import { ArticleBody } from "./ArticleBody";
import { ArrowOut, GitHub } from "./Icons";
import { HeldGutter, Panel, Stamp } from "./Panel";
import { Reader } from "./Reader";
import { Footer } from "./Sections";

const date = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

export function ArticlePage({ a, kind }: { a: Article; kind: Kind }) {
  const piece = a[kind];
  const other: Kind = kind === "story" ? "technical" : "story";
  const label = kindLabel[kind];
  const otherLabel = kindLabel[other];

  const order = [
    { id: "top", label: "Writing", href: "/writing", n: 1 },
    { id: "article", label: piece.title, n: 2 },
    { id: "next", label: otherLabel.en, n: 3 },
  ];

  return (
    <>
      <main className="board pt-[var(--gutter-scene)]">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm font-black">
          <Link href="/" className="link-ink">
            Aakshant Kumar
          </Link>
          <span className="mx-2 text-ink-2">/</span>
          <Link href="/writing" className="link-ink">
            Writing
          </Link>
          <span className="mx-2 text-ink-2">/</span>
          <span>{a.project}</span>
        </nav>

        <Panel id="article" n={2} label={a.project} variant="splash" as="article" labelledBy="article-title" bodyClassName="p-5 sm:p-10 lg:p-14">
          <header className="flex flex-col gap-6 border-b-[3px] border-ink pb-8">
            <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-4">
              <div>
                <h1 id="article-title" className="title-ink max-w-[22ch] text-[clamp(2.1rem,5.4vw,3.5rem)]">
                  {piece.title}
                </h1>
                <p className="sfx-hi mt-3 text-[clamp(2rem,5vw,3rem)] leading-none" lang="hi">
                  {a.projectHi}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Stamp solid={kind === "story"} dashed={kind === "technical"}>
                  {label.en} · <span lang="hi">{label.hi}</span>
                </Stamp>
                <Stamp>{a.status}</Stamp>
              </div>
            </div>
            <p className="measure text-[1.15rem] font-bold leading-[1.55] text-ink-2">{piece.dek}</p>
            <dl className="grid gap-x-8 gap-y-2 text-[0.95rem] sm:grid-cols-3">
              <div>
                <dt className="font-black">Published</dt>
                <dd className="tnum">{date(a.published)}</dd>
              </div>
              <div>
                <dt className="font-black">Built by</dt>
                <dd>{a.team}</dd>
              </div>
              <div>
                <dt className="font-black">Read</dt>
                <dd className="tnum">{minutes(piece)} min</dd>
              </div>
            </dl>
            <div className="flex flex-wrap gap-2.5">
              {a.links.map((l) => (
                <a
                  key={l.href}
                  className={`btn btn--small ${l.kind === "live" ? "btn--spot" : ""}`}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {l.kind === "source" && <GitHub size={16} />}
                  {l.label}
                  {l.kind === "live" && <ArrowOut size={16} />}
                </a>
              ))}
              <Link className="btn btn--small" href={href(a, other)}>
                {otherLabel.en} piece · <span lang="hi">{otherLabel.hi}</span>
              </Link>
            </div>
          </header>

          <ArticleBody blocks={piece.blocks} />

          <footer className="mt-[var(--gutter-scene)] flex flex-col gap-5 border-t-[3px] border-ink pt-6 md:flex-row md:items-center md:justify-between">
            <ul className="flex flex-wrap gap-2" aria-label={`${a.project} stack`}>
              {a.stack.map((s) => (
                <li key={s} className="badge">
                  {s}
                </li>
              ))}
            </ul>
          </footer>
        </Panel>

        <section id="next" data-panel={3} data-panel-label={otherLabel.en} className="mt-[var(--gutter-beat)]" aria-labelledby="next-title">
          <Link
            href={href(a, other)}
            className="group panel flex flex-col p-6 no-underline transition-colors duration-150 hover:bg-ink hover:text-paper sm:p-10"
            data-ink=""
          >
            <div className="panel-body">
              <h2 id="next-title" className="title-ink max-w-[30ch] text-[clamp(1.6rem,3.2vw,2.2rem)]">
                {a[other].title}
              </h2>
              <p className="mt-3 font-bold text-ink-2 group-hover:text-paper">
                {kind === "story" ? "How it's built: architecture, trade-offs and what broke." : "Who it's for, what changes for them, and why it matters."}
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-black underline decoration-spot decoration-[3px] underline-offset-4">
                Read the {otherLabel.en.toLowerCase()} piece · <span lang="hi">{otherLabel.hi}</span> <ArrowOut size={15} />
              </span>
            </div>
          </Link>
        </section>

        <HeldGutter note="जारी रहेगा" />
        <Footer />
      </main>
      <Reader entries={order} />
    </>
  );
}
