import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { person } from "@/lib/content";
import IntroAnimation from "@/components/IntroAnimation";
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
  "Aakshant Kumar (आक्षांत कुमार) — Machine Learning Engineer & Full-Stack Builder. Co-founder & VP Tech at Kaiketsu Tech. Building production ML models, computer vision systems, and modern web architectures with PyTorch, FastAPI, and Next.js.";

const shareDescription =
  "Aakshant Kumar (आक्षांत कुमार) — ML Engineer & Full-Stack Builder. B.Tech CSE (AI) at CSJM University, Kanpur. Co-founder & VP Tech at Kaiketsu Tech. Creator of VedaVoice (hackathon finalist), Robo Rumble 3.0, and AirGated. Engineering applied AI pipelines, neural architectures, and robust web applications with PyTorch, FastAPI, TypeScript, and Next.js.";

export const metadata: Metadata = {
  metadataBase: new URL("https://aakshantkumar.vercel.app"),
  title: {
    default: `आक्षांत कुमार (Aakshant Kumar) | ML Engineer & Builder`,
    template: `%s | Aakshant Kumar`,
  },
  description,
  keywords: [
    "Aakshant Kumar",
    "आक्षांत कुमार",
    "ML Engineer",
    "Machine Learning",
    "Artificial Intelligence",
    "Full-Stack Developer",
    "PyTorch",
    "FastAPI",
    "Next.js",
    "Kaiketsu Tech",
    "CSJM University",
    "Portfolio",
  ],
  authors: [{ name: person.name, url: person.github }],
  creator: person.name,
  verification: {
    google: "ZmWGt-xPRrOJjnBHw3S3vGMJFsrQPhxio2hTBER0Pf0",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aakshantkumar.vercel.app",
    siteName: "आक्षांत कुमार · Aakshant Kumar",
    title: "आक्षांत कुमार (Aakshant Kumar) — ML Engineer & Builder",
    description: shareDescription,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "आक्षांत कुमार (Aakshant Kumar) — ML Engineer & Full-Stack Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "आक्षांत कुमार (Aakshant Kumar) — ML Engineer & Builder",
    description: shareDescription,
    images: ["/og-image.jpg"],
    creator: "@kumaraakshant",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://aakshantkumar.vercel.app",
  },
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Amita:wght@400;700&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: revealScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: person.name,
              alternateName: ["आक्षांत कुमार", person.alias],
              url: "https://aakshantkumar.vercel.app",
              sameAs: [person.github, person.linkedin, person.kaiketsu],
              jobTitle: "ML Engineer & Full-Stack Builder",
              alumniOf: "CSJM University, Kanpur",
              description,
              image: "https://aakshantkumar.vercel.app/og-image.jpg",
            }),
          }}
        />
      </head>
      <body>
        <IntroAnimation />
        <a className="skip-link" href="#work">
          Skip to the work
        </a>
        {children}
      </body>
    </html>
  );
}
