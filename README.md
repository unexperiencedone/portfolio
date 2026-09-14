<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-000?style=flat-square&logo=next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=000" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=fff" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=fff" />
  <img src="https://img.shields.io/badge/Framer_Motion-13-E836B2?style=flat-square&logo=framer&logoColor=fff" />
</p>

<h1 align="center">Aakshant Kumar — Portfolio</h1>
<p align="center"><em>One manga chapter inked from storyboard to finished page on a vertical webtoon strip.</em></p>

---

## The Concept

This isn't a hero section plus a card grid. The entire site is **one manga chapter** caught between the rough storyboard (ネーム) and the finished inked page. A bright manuscript board carries hard black frames; non-repro blue guide lines and trim marks expose the structure underneath; one fluorescent spot ink plays the editor's pencil, circling proof and flooding the two scene changes. Panels _are_ the navigation, and the length of a gutter _is_ the timing — a short gutter is a fast beat, a held gutter is a page turn.

The chapter is bilingual: English leads, Hindi answers in Devanagari — as a Rozha One line under a heading, the second half of a bilingual tab, or the editor's pencil scribbling annotations in spot pink.

---

## Design System

### Palette

| Token | Hex | Role |
|---|---|---|
| `--paper` | `#f5f5f2` | Manuscript page. Every panel, badge, and control ground. |
| `--ink` | `#0d0d0d` | G-pen ink. All frames, primary text, screentone dots, speed-line wedges. |
| `--ink-2` | `#3b3b3b` | Diluted ink. Secondary text, context lines, Devanagari nav labels. |
| `--guide` | `#a9c8e8` | Non-repro blue. Structure only — guide lines, rough strokes, trim marks. Never text. |
| `--spot` | `#ff1f6f` | Editor's spot ink. CTAs, proof circles, floods, focus rings, pencil annotations. Rare and intentional. |

### Typography

Six self-hosted faces loaded through `next/font/local`, each Latin face chained to a Devanagari partner behind a `unicode-range` gate so they download only when Devanagari glyphs appear:

| Purpose | Latin | Devanagari |
|---|---|---|
| Display / SFX | Dela Gothic One | Rozha One |
| Body / UI | Zen Kaku Gothic New (400–900) | Mukta (500, 800) |
| Pencil annotations | Klee One (600) | Kalam (700) |

### Elevation

The system is **completely flat** — zero box-shadows. Depth is drawn, not lit: frame weight says importance (2 / 3 / 5 px), overlap and small rotations stack elements, and the rough blue ネーム stroke sits offset beneath each panel like an underdrawing. Screentone dots and multiply-blended ink scenes supply tone.

---

## Architecture

```
app/
├── layout.tsx            # Root: 6 font variables, reveal script, metadata
├── page.tsx              # Main chapter: Splash → Projects → Journey → Skills → Contact
├── globals.css           # 630-line design system: tokens, panels, controls, reveals, floods
├── works/page.tsx        # Side Quests — hackathon builds and experiments
├── kaiketsu/page.tsx     # Kaiketsu Tech — the agency page
└── not-found.tsx         # 404 in manga style

components/
├── Splash.tsx            # Hero panel with speed lines, SFX lettering, LiquidCarveButton CTA
├── Projects.tsx          # Lead + mid project panels with caption boxes and proof circles
├── Journey.tsx           # Prologue + 4 arc panels (पर्व), each with episodes and unlocked skills
├── Sections.tsx          # Skill tree, contact splash, footer, flood transitions
├── Reader.tsx            # Fixed page-counter tab + panel index overlay (IntersectionObserver)
├── Panel.tsx             # Panel primitives: frames, stamps, floods, held gutters, trim marks
├── Illustration.tsx      # Illustration slot system: renders art or storyboard placeholder
├── PixelReveal.tsx       # Canvas pixel-dissolve reveal triggered on viewport entry
├── LiquidCarveButton.tsx # SVG goo-filter button with spring physics (Framer Motion)
├── SpeedLines.tsx        # SVG tapered G-pen wedges converging on a clearing
├── Art.tsx               # Manga-page grid layouts for side quests and client work
├── Icons.tsx             # Custom 24px line icons + GitHub/LinkedIn marks
└── CopyEmail.tsx         # Copy-to-clipboard email with visual feedback

lib/
├── content.ts            # Every fact on the page: person, projects, skills, about
├── journey.ts            # The 4 arcs (पर्व) and their episodes, told as a Mahabharata structure
└── illustrations.ts      # 15 named illustration slots with dimensions, kind, alt text
```

---

## Signature Interactions

### Rough-to-Ink Reveal
Panels start as the blue storyboard stroke — body offset 20px and rotated -0.6°. Crossing 30% up the viewport, the ink frame wipes in via `clip-path` (300ms), the body settles (460ms), and screentone events fade in. A head script opts in before first paint; panels fall back to fully inked after 2.5s if the app never hydrates. Under `prefers-reduced-motion`, it's a 320ms crossfade.

### Pixel Reveal
Scene illustrations (project headers, arc title cards) dissolve in through a canvas-based pixel grid that clears directionally as the image scrolls into view. Configurable grid size, edge softness, easing, and direction.

### Liquid Carve Button
The primary CTA uses an SVG goo filter with spring-physics blob tracking (Framer Motion). The blob follows the cursor with variable tau, and the button squashes proportionally to pointer velocity.

### Flood Transitions
Two full-bleed structural breaks: spot-pink field wipes from the right (380ms), ink speed lines slide in, and an SFX word with its Devanagari answer drops in with a boxed caption. Exactly two per page — more would dilute the beat.

### Impact Hover
On fine pointers, project panels lurch (-3px, -0.9°) and settle (-1px, -0.35°) over 420ms. An 88px corner triangle flashes solid spot and settles to spot-tone dots.

---

## Illustration System

15 named slots in `lib/illustrations.ts`. All filled with ink manga line art, prepared by `scripts/ink-illustrations.mjs` and shipped as WebP in `public/illustrations/`:

- **Scenes** (12): Greyscale, paper normalised to true white, rendered with `mix-blend-multiply` so the manuscript paper shows through. Each scene enters with the PixelReveal dissolve.
- **Cutouts** (3): Alpha-matted from line art with a thin paper halo, drawn with `object-fit: contain` and allowed to break out of frames.

A slot and its frame render **only when the file exists**. In development, missing art draws a storyboard placeholder (guide-blue X with a pencil note). Production renders nothing.

---

## The Grid

Everything counts in units of **8px**:

| Gutter | Size | Timing |
|---|---|---|
| Beat | 16px (2u) | Related panels — fast cut |
| Scene | 56px (7u) | Between major blocks |
| Chapter | 128px (16u) | Major turn in the story |
| Held | clamp(160px, 38svh, 320px) | Page turn — dashed guide rule, optional pencil note |

The board is a centred 1280px column. Inside panels, a 12-column grid at `lg` with deliberately unequal spans (7/5, 5/7). Lead projects alternate art and captions left-right. Mobile is the primary experience.

---

## Tech Stack

| Layer | Tools |
|---|---|
| **Framework** | Next.js 16 (App Router, Server Components) |
| **UI** | React 19 |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS v4 + 630 lines of vanilla CSS design system |
| **Animation** | Framer Motion 13 (spring physics), CSS transitions, `clip-path` reveals |
| **Canvas** | HTML5 Canvas API (PixelReveal), SVG filters (LiquidCarveButton) |
| **Typography** | 6 self-hosted font subsets via `next/font/local` (Fontsource, SIL OFL 1.1) |
| **Accessibility** | `prefers-reduced-motion` fallbacks, `skip-link`, `aria` labels, `lang="hi"` on all Hindi runs |
| **Deployment** | Vercel |

---

## Design Rules

> **The Editor's Pencil Rule** — Spot pink marks only proof, the next action, or a scene change. If a spot mark doesn't point at one of those, it doesn't ship.

> **The Non-Repro Rule** — Guide blue never carries text or meaning. It draws structure and the unfinished state, nothing else.

> **The Drawn Depth Rule** — No box-shadow, no offset shadow, no blur. If something must read as in front, overlap it, rotate it, or give it a heavier frame.

> **The Event Tone Rule** — Screentone and speed lines appear only at named events: splash, floods, contact splash, impact hover, pressed state. Never as wallpaper.

> **The Counted Gutter Rule** — A gutter is a timing decision expressed in units of 8px. Pick beat, scene, chapter, or held. Never an eyeballed margin.

---

<p align="center"><strong>I train models and ship the products around them.</strong></p>
<p align="center"><em>मॉडल की ट्रेनिंग से प्रोडक्ट की शिपिंग तक।</em></p>
