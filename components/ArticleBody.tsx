import type { ReactNode } from "react";
import type { Block } from "@/lib/articles";
import { FlowDiagram, SequenceDiagram } from "./Diagram";

/** `code` spans and **ink-heavy** words, and nothing else: articles stay plain text in the data. */
function inline(text: string): ReactNode[] {
  return text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="border-2 border-ink px-1 py-px text-[0.92em] font-bold">
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-black">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function Figure({ n, title, takeaway, children, wide = false }: { n: number; title: string; takeaway: string; children: ReactNode; wide?: boolean }) {
  return (
    <figure className={`my-[var(--gutter-scene)] ${wide ? "" : "mx-auto max-w-[920px]"}`}>
      <div className="panel panel--inset overflow-hidden bg-paper p-3 sm:p-5">{children}</div>
      <figcaption className="caption mt-8">
        <span className="caption-label">
          Figure {n} · <span lang="hi">चित्र {n}</span>
        </span>
        <span className="font-black">{title}</span> — {takeaway}
      </figcaption>
    </figure>
  );
}

export function ArticleBody({ blocks }: { blocks: Block[] }) {
  let figure = 0;
  return (
    <div className="article-body">
      {blocks.map((b, i) => {
        switch (b.t) {
          case "h":
            return (
              <h2 key={i} id={b.id} className="title-ink measure mt-[var(--gutter-scene)] scroll-mt-8 text-[clamp(1.6rem,3.2vw,2.2rem)]">
                {b.text}
              </h2>
            );
          case "p":
            return (
              <p key={i} className="measure mt-5 text-[1.0625rem] leading-[1.65]">
                {inline(b.text)}
              </p>
            );
          case "list":
            return (
              <ul key={i} className="measure mt-5 flex flex-col gap-2.5">
                {b.items.map((item, j) => (
                  <li key={j} className="flex gap-3 leading-[1.6]">
                    <span aria-hidden="true" className="mt-[0.55em] inline-block h-2 w-2 shrink-0 bg-ink" />
                    <span>{inline(item)}</span>
                  </li>
                ))}
              </ul>
            );
          case "callout":
            return (
              <aside key={i} className="caption measure mt-[var(--gutter-scene)]">
                <span className="caption-label">
                  {b.label} · <span lang="hi">{b.labelHi}</span>
                </span>
                <p className="leading-[1.6]">{inline(b.text)}</p>
              </aside>
            );
          case "image":
            figure += 1;
            return (
              <Figure key={i} n={figure} title={b.title} takeaway={b.takeaway} wide>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.src} alt={b.alt} width={1440} height={900} loading="lazy" className="block h-auto w-full border-2 border-ink" />
              </Figure>
            );
          case "flow":
            figure += 1;
            return (
              <Figure key={i} n={figure} title={b.title} takeaway={b.takeaway}>
                <FlowDiagram flow={b.flow} label={`${b.title}. ${b.takeaway}`} />
              </Figure>
            );
          case "sequence":
            figure += 1;
            return (
              <Figure key={i} n={figure} title={b.title} takeaway={b.takeaway} wide>
                <div className="overflow-x-auto">
                  <div className="min-w-[640px]">
                    <SequenceDiagram seq={b.seq} label={`${b.title}. ${b.takeaway}`} />
                  </div>
                </div>
              </Figure>
            );
          case "table":
            figure += 1;
            return (
              <Figure key={i} n={figure} title={b.title} takeaway={b.takeaway} wide>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[560px] border-collapse text-left text-[0.97rem]">
                    <thead>
                      <tr>
                        {b.head.map((h) => (
                          <th key={h} className="border-b-[3px] border-ink px-3 py-2.5 font-black">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {b.rows.map((row, r) => (
                        <tr key={r}>
                          {row.map((cell, c) => (
                            <td key={c} className={`border-b-2 border-ink px-3 py-2.5 align-top leading-snug ${c === 0 ? "font-bold" : ""}`}>
                              {inline(cell)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Figure>
            );
        }
      })}
    </div>
  );
}
