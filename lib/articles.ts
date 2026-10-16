// Writing: every project gets two pieces. The Story is for the people it serves (who has the
// problem, what changes for them, why it matters); the Technical piece is for engineers (how it
// is built, what broke, what is still open). Same rule as lib/content.ts: only facts that are in
// the code, the commit history or the project's own status docs. No invented users or metrics.

import type { Flow, Sequence } from "@/components/Diagram";

export type Block =
  | { t: "h"; text: string; id?: string }
  | { t: "p"; text: string }
  | { t: "list"; items: string[] }
  | { t: "callout"; label: string; labelHi: string; text: string }
  | { t: "image"; src: string; alt: string; title: string; takeaway: string }
  | { t: "flow"; flow: Flow; title: string; takeaway: string }
  | { t: "sequence"; seq: Sequence; title: string; takeaway: string }
  | { t: "table"; head: string[]; rows: string[][]; title: string; takeaway: string }
  /** a real excerpt from the repo, trimmed to what the point needs, with the file it came from */
  | { t: "code"; lang: string; source: string; text: string; title: string; takeaway: string };

export type Kind = "story" | "technical";

export type Piece = {
  title: string;
  dek: string;
  blocks: Block[];
};

export type Article = {
  slug: string;
  project: string;
  /** the Devanagari line that answers the project name (a meaning, not a transliteration) */
  projectHi: string;
  published: string; // ISO date
  status: string;
  team: string;
  hero?: { src: string; alt: string };
  links: { label: string; href: string; kind: "live" | "source" }[];
  stack: string[];
  story: Piece;
  technical: Piece;
};

export const kindLabel: Record<Kind, { en: string; hi: string }> = {
  story: { en: "Story", hi: "कहानी" },
  technical: { en: "Technical", hi: "तकनीकी" },
};

export function href(a: Article, kind: Kind) {
  return kind === "story" ? `/writing/${a.slug}` : `/writing/${a.slug}/technical`;
}

export function words(piece: Piece): number {
  let n = 0;
  for (const b of piece.blocks) {
    if (b.t === "p" || b.t === "h" || b.t === "callout") n += b.text.split(/\s+/).length;
    if (b.t === "list") n += b.items.join(" ").split(/\s+/).length;
    if (b.t === "table") n += b.rows.flat().join(" ").split(/\s+/).length;
    if (b.t === "code") n += b.text.split("\n").length * 4; // code is read slowly, line by line
    if (b.t === "image" || b.t === "flow" || b.t === "sequence" || b.t === "table" || b.t === "code") n += 40; // a figure takes reading time too
  }
  return n;
}

export function minutes(piece: Piece) {
  return Math.max(1, Math.round(words(piece) / 220));
}

import { vedcode } from "./writing/ved-code";
import { nutrisafe } from "./writing/nutrisafe";
import { airgated } from "./writing/airgated";
import { emotionEdge } from "./writing/lightweight-emotion-detection";
import { nova } from "./writing/nova";

// One file per project in lib/writing/, so each can be rewritten on its own.
export const articles: Article[] = [vedcode, nutrisafe, airgated, emotionEdge, nova];

export function bySlug(slug: string) {
  return articles.find((a) => a.slug === slug);
}
