import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { person } from "@/lib/content";
import "./globals.css";

// Self-hosted subsets (Fontsource, SIL OFL 1.1). Google's CSS for these CJK/Devanagari families
// splits into hundreds of unicode-range slices; the page only needs Latin (+ Devanagari for Rozha).
const dela = localFont({
  variable: "--font-dela",
  src: [{ path: "./fonts/dela-gothic-one-latin-400-normal.woff2", weight: "400" }],
  display: "swap",
});

const zen = localFont({
  variable: "--font-zen",
  src: [
    { path: "./fonts/zen-kaku-gothic-new-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/zen-kaku-gothic-new-latin-500-normal.woff2", weight: "500" },
    { path: "./fonts/zen-kaku-gothic-new-latin-700-normal.woff2", weight: "700" },
    { path: "./fonts/zen-kaku-gothic-new-latin-900-normal.woff2", weight: "900" },
  ],
  display: "swap",
});

const klee = localFont({
  variable: "--font-klee",
  src: [{ path: "./fonts/klee-one-latin-600-normal.woff2", weight: "600" }],
  display: "swap",
  preload: false,
});

// Devanagari faces sit behind each Latin face in the stack; unicode-range keeps them from
// downloading for Latin text. Rozha = SFX lettering, Mukta = text, Kalam = the editor's pencil.
// (next/font needs literal option values, so the range is repeated in each call.)

const rozha = localFont({
  variable: "--font-rozha",
  src: [{ path: "./fonts/rozha-one-devanagari-400-normal.woff2", weight: "400" }],
  display: "swap",
  preload: false,
  declarations: [{ prop: "unicode-range", value: "U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FF" }],
});

const mukta = localFont({
  variable: "--font-mukta",
  src: [
    { path: "./fonts/mukta-devanagari-500-normal.woff2", weight: "400 600" },
    { path: "./fonts/mukta-devanagari-800-normal.woff2", weight: "700 900" },
  ],
  display: "swap",
  preload: false,
  declarations: [{ prop: "unicode-range", value: "U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FF" }],
});

const kalam = localFont({
  variable: "--font-kalam",
  src: [{ path: "./fonts/kalam-devanagari-700-normal.woff2", weight: "400 700" }],
  display: "swap",
  preload: false,
  declarations: [{ prop: "unicode-range", value: "U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FF" }],
});

const description =
  "Aakshant Kumar, a B.Tech CSE (AI) student at CSJM University, Kanpur. ML engineer and full-stack builder: VedaVoice (hackathon finalist), Robo Rumble 3.0, AirGated, and production client platforms.";

export const metadata: Metadata = {
  title: `${person.name}: ML engineer who ships`,
  description,
  authors: [{ name: person.name, url: person.github }],
  openGraph: {
    title: `${person.name}: ML engineer who ships`,
    description,
    type: "profile",
  },
  twitter: { card: "summary_large_image", title: `${person.name}: ML engineer who ships`, description },
};

export const viewport: Viewport = {
  themeColor: "#f5f5f2",
};

// Opt in to the rough-to-ink reveal before first paint, so already-visible panels never flash.
// If the app never hydrates, the chapter falls back to fully inked after 2.5s.
const revealScript = `(function(){try{var d=document.documentElement;var r=window.matchMedia('(prefers-reduced-motion: reduce)').matches;d.classList.add(r?'reveal-fade':'reveal');setTimeout(function(){if(!window.__inkReady){d.classList.remove('reveal','reveal-fade')}},2500)}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${dela.variable} ${zen.variable} ${klee.variable} ${rozha.variable} ${mukta.variable} ${kalam.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealScript }} />
      </head>
      <body>
        <a className="skip-link" href="#work">
          Skip to the work
        </a>
        {children}
      </body>
    </html>
  );
}
