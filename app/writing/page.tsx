import Link from "next/link";
import { ArrowOut } from "@/components/Icons";
import { Flood, HeldGutter, Panel, Stamp } from "@/components/Panel";
import { Reader } from "@/components/Reader";
import { Footer } from "@/components/Sections";
import { articles, href, type Kind, kindLabel, minutes } from "@/lib/articles";

export const metadata = {
  title: "Writing",
  description: "Two pieces per project: the story of who it serves and why it matters, and the technical build.",
};

const order = [
  { id: "top", label: "Start", href: "/", n: 1 },
  ...articles.map((a, i) => ({ id: a.slug, label: a.project, n: i + 2 })),
];

const kinds: Kind[] = ["story", "technical"];

export default function Writing() {
  return (
    <>
      <main>
        <Flood id="writing-flood" word="Writing" hindi="लेख" line="Every project, twice: the story and the build." focus={{ x: 420 }} />

        <div className="board flex flex-col gap-[var(--gutter-beat)] pt-[var(--gutter-scene)]">
          {articles.map((a, i) => (
            <Panel key={a.slug} id={a.slug} n={i + 2} label={a.project} labelledBy={`${a.slug}-title`} bodyClassName="p-5 sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 id={`${a.slug}-title`} className="title-ink text-[clamp(1.8rem,4vw,2.8rem)]">
                    {a.project}
                  </h2>
                  <p className="sfx-hi mt-2 text-[clamp(1.6rem,3.4vw,2.4rem)] leading-none" lang="hi">
                    {a.projectHi}
                  </p>
                </div>
                <Stamp>{a.status}</Stamp>
              </div>
              <div className="mt-8 grid gap-[var(--gutter-beat)] lg:grid-cols-12">
                {kinds.map((k) => (
                  <Link
                    key={k}
                    href={href(a, k)}
                    className={`group panel panel--inset flex flex-col p-5 no-underline transition-colors duration-150 hover:bg-ink hover:text-paper sm:p-6 ${k === "story" ? "lg:col-span-7" : "lg:col-span-5"}`}
                  >
                    <span className="caption-label !static !translate-y-0 self-start">
                      {kindLabel[k].en} · <span lang="hi">{kindLabel[k].hi}</span>
                    </span>
                    <span className="mt-4 block text-[1.3rem] font-black leading-tight">{a[k].title}</span>
                    <span className="mt-3 block leading-snug text-ink-2 group-hover:text-paper">{a[k].dek}</span>
                    <span className="mt-auto flex items-center justify-between gap-3 pt-5 text-sm font-black">
                      <span className="tnum">{minutes(a[k])} min read</span>
                      <span className="inline-flex items-center gap-1.5 underline decoration-spot decoration-[3px] underline-offset-4">
                        Read <ArrowOut size={15} />
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </Panel>
          ))}
          <HeldGutter note="समाप्त" />
          <Footer />
        </div>
      </main>
      <Reader entries={order} />
    </>
  );
}
