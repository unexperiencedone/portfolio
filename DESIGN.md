---
name: Aakshant Kumar Portfolio
description: One manga chapter inked from storyboard to finished page on a vertical webtoon strip.
colors:
  paper: "#f5f5f2"
  paper-2: "#e9e9e4"
  ink: "#0d0d0d"
  ink-2: "#3b3b3b"
  guide: "#a9c8e8"
  spot: "#ff1f6f"
typography:
  display:
    fontFamily: "Dela Gothic One, Rozha One, Arial Black, sans-serif"
    fontSize: "clamp(2.45rem, 11.4vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.86
    letterSpacing: "-0.01em"
  display-flood:
    fontFamily: "Dela Gothic One, Rozha One, Arial Black, sans-serif"
    fontSize: "clamp(3.25rem, 12vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.86
    letterSpacing: "-0.01em"
  display-hi:
    fontFamily: "Rozha One, Dela Gothic One, serif"
    fontSize: "clamp(2rem, 7vw, 3.6rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "0"
  headline-hi:
    fontFamily: "Rozha One, Dela Gothic One, serif"
    fontSize: "clamp(2.3rem, 5.5vw, 3.6rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0"
  headline:
    fontFamily: "Zen Kaku Gothic New, Mukta, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 5.4vw, 3.5rem)"
    fontWeight: 900
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Zen Kaku Gothic New, Mukta, system-ui, sans-serif"
    fontSize: "clamp(1.6rem, 3.2vw, 2.2rem)"
    fontWeight: 900
    lineHeight: 1.02
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Zen Kaku Gothic New, Mukta, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "Zen Kaku Gothic New, Mukta, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 900
    lineHeight: 1.2
    letterSpacing: "0.06em"
  numeral-hi:
    fontFamily: "Zen Kaku Gothic New, Mukta, system-ui, sans-serif"
    fontSize: "2.1rem"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "normal"
  pencil:
    fontFamily: "Klee One, Kalam, Zen Kaku Gothic New, cursive"
    fontSize: "1.6rem"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "normal"
rounded:
  none: "0px"
spacing:
  u: "8px"
  gutter-beat: "16px"
  gutter-scene: "56px"
  gutter-chapter: "128px"
  gutter-held: "clamp(160px, 38svh, 320px)"
  board-pad: "clamp(16px, 4vw, 56px)"
  frame-w-1: "2px"
  frame-w-2: "3px"
  frame-w-3: "5px"
components:
  button-primary:
    backgroundColor: "{colors.spot}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.spot}"
  button-secondary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "48px"
  button-secondary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-small:
    rounded: "{rounded.none}"
    padding: "0 14px"
    height: "40px"
  badge:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "2px 10px"
    height: "30px"
  stamp:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "3px 10px 4px"
  stamp-solid:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  caption:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "16px 16px 18px"
  caption-label:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    padding: "2px 8px 3px"
  panel:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
  arc-numeral:
    textColor: "{colors.ink-2}"
    typography: "{typography.numeral-hi}"
  reader-tab:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 14px"
    height: "48px"
  reader-tab-contact:
    backgroundColor: "{colors.spot}"
    textColor: "{colors.ink}"
---

# Design System: Aakshant Kumar Portfolio

## Overview

**Creative North Star: "Name to Ink"**

The whole site is one manga chapter caught between the storyboard (ネーム) and the finished page, laid out as a vertical webtoon strip. A bright manuscript board carries hard black frames; non-repro blue guide lines and trim marks show the structure underneath; one fluorescent spot ink plays the editor's pencil, circling the proof and flooding the two scene changes. Panels are the navigation and the length of a gutter is the timing: a short gutter is a fast beat, a long one is a scene change, a held gutter is a page turn.

Density is high inside a panel and generous between panels. Ornament is event-bound: screentone and speed lines appear at named moments (the splash, the two floods, the contact splash, a pressed button, an impact hover), never as wallpaper. Display lettering is manga SFX, used for beats only. The chapter is bilingual: English leads and Hindi answers in Devanagari, as a Rozha One line under a heading or SFX word, a small label stacked under a nav item, or the second half of an "English · हिन्दी" tab. The editor's pencil writes in Hindi. Every mark pairs shape with colour, so meaning never rides on hue alone.

The system rejects the hero-plus-card-grid category default. It also rejects, by recorded decision, the parts of the Google Stitch "Devanagari-English Fusion Manga Portfolio" screen that were reviewed and not adopted: its crimson / Anton / Space Grotesk token set, hard offset shadows, kicker labels, percentage skill bars, a contact form with no backend, and fabricated testimonials and metrics. Adopted from that screen: a masthead with chapter nav, illustration slots, Devanagari SFX lines under the flood titles, and a bilingual "To be continued / जारी रहेगा" closing banner.

**Key Characteristics:**
- Manuscript paper, G-pen ink, non-repro blue structure, one spot ink.
- Square corners everywhere; hierarchy comes from frame weight (2 / 3 / 5px), not radius or shadow.
- An 8px lattice with named gutters (beat, scene, chapter, held).
- Panels ink in from a rough blue line as they cross 30% up the viewport; reduced motion crossfades.
- Tone and speed lines are events, not textures.
- English first, Hindi after, always in Devanagari; every Latin face has a Devanagari partner behind it.
- Ink line-art illustrations on the paper: greyscale scenes multiplied in, matted cutouts that break frames.

## Colors

A four-value manuscript (paper, ink, guide blue, spot pink) with two quiet support tones; the spot ink is rare and always means proof, action or transition.

### Primary
- **Editor's Spot Pink** (spot): The editor's pencil. Fills the primary CTA and the contact tab, draws the hand circle around verifiable proof, underlines inked links, floods the two structural transitions, colours pencil annotations and the Devanagari half of the closing banner, focus rings, selection and the caret. Ink text sits on it, never paper.

### Neutral
- **Manuscript Paper** (paper): The page. Every panel, badge, caption and control ground; the white of every scene illustration multiplies down onto it.
- **Board Shadow Paper** (paper-2): Scrollbar track only; a second paper, not a surface tier.
- **G-Pen Ink** (ink): All frames, all primary text, solid stamps, caption tabs, hover inversion of controls, screentone dots and speed-line wedges.
- **Diluted Ink** (ink-2): Secondary text: context lines, sub-lines, notes, the stacked Devanagari nav labels, the arc numerals "पर्व N", the dashed "used, not featured" skill tier.
- **Non-Repro Blue** (guide): Structure only. The board's inner-frame guide lines, the rough ネーム stroke under each panel, the held-gutter dashed rule, and the cross on pending illustration slots.

### Named Rules
**The Non-Repro Rule.** Guide blue never carries text or meaning a reader must parse. It draws structure and the unfinished state, nothing else.

**The Editor's Pencil Rule.** Spot pink marks only proof, the next action, or a scene change. If a spot mark does not point at one of those, it is decoration and does not ship.

**The Ink-On-Spot Rule.** Text on a spot fill is ink (#0d0d0d), about 5.3:1. Informational text is never set in spot on paper.

## Typography

**Display Font:** Dela Gothic One (with Rozha One for Devanagari glyphs, then Arial Black)
**Devanagari Display Font:** Rozha One, first in the stack for `lang="hi"` display lines
**Body Font:** Zen Kaku Gothic New 400 / 500 / 700 / 900 (with Mukta 500 / 800 for Devanagari glyphs, then system-ui)
**Annotation Font:** Klee One 600 (with Kalam 700 for Devanagari glyphs, then Zen Kaku Gothic New, cursive)

All six faces are self-hosted subsets loaded through `next/font/local`: the three Latin faces carry Latin only, and the three Devanagari faces are declared with a Devanagari `unicode-range`, so they download only when a Devanagari glyph appears.

**Character:** A heavy SFX letterer shouting the beats over a plain, very black Japanese gothic that does the reading; a high-contrast Devanagari display face answers each English heading, and a handwritten editor's hand annotates in spot pink, in Hindi.

### Hierarchy
- **Display / SFX** (400, clamp(2.45rem, 11.4vw, 6rem), 0.86, uppercase, balanced): The name on the splash, the flood words ("The work", "Your move."), the 404, the circled proof numerals in insets, the "To be continued" banner. Set with a paper-coloured text stroke (0.14–0.16em, paint-order stroke fill) and a -2° to -3° tilt when it overlaps speed lines.
- **Devanagari SFX** (Rozha One 400, clamp(2rem, 7vw, 3.6rem), 1.05): A Hindi sound or beat word inside an event. Under a flood word (कारनामे, चाल आपकी) with a +2° counter-tilt and a 0.12em paper stroke; spot-coloured inside the ink closing banner; and on desktop, the splash's opening sound आरंभ! set into the speed lines (clamp(3.5rem, 6vw, 5.5rem), +8°, 0.14em paper stroke, aria-hidden).
- **Devanagari Heading Line** (Rozha One 400, clamp(2.3rem, 5.5vw, 3.6rem), 1, no stroke): The Hindi name directly after an English heading: arc names (आरंभ पर्व), the Prologue (प्रस्तावना, up to 4.2rem, -1°), narration-panel titles (उप-कथाएँ, संघ के अनुबंध, 2–3rem), Skill tree (कौशल वृक्ष), and the 404 line (1.6–2.2rem).
- **Headline** (900, clamp(2.1rem, 5.4vw, 3.5rem), 1.02, -0.025em): Lead project titles, section titles (clamp(2rem, 4.6vw, 3.2rem)), the positioning line.
- **Title** (900, clamp(1.6rem, 3.2vw, 2.2rem), 1.02): Mid project titles, arc titles ("Arc N: Name", to 2.3rem), narration-panel titles; outcomes at 1.15–1.45rem in the same face.
- **Hindi Sub-line** (700, clamp(1.2rem, 2.4vw, 1.55rem) to 1.35rem): A full Hindi sentence under the English positioning line or Prologue title, ink or ink-2.
- **Body** (400, 1.0625rem, 1.65): Reading copy, capped at 62ch; Prologue copy steps up to 1.125rem / 1.7.
- **Label** (900, 0.75–0.8125rem, 0.06–0.08em, uppercase): Status stamps and caption-box tabs only.
- **Devanagari Numeral** (Mukta via the text stack, 900, 2.1rem, 1, ink-2): "पर्व N" beside each arc title, aria-hidden.
- **Pencil** (Klee One / Kalam, 1.6–1.75rem, 1.1, spot): Short editor annotations in Hindi ("यहाँ से शुरू करें", "पन्ना पलटिए", "कानपुर से, चार पर्वों में"), aria-hidden, rotated -2° to -3°.

### Named Rules
**The Beats-Only Rule.** SFX lettering is for beats: the name, the two floods, proof numerals, the splash's opening sound, the closing banner. Rozha One additionally sets the Devanagari line under a heading. Neither ever sets a paragraph, a nav item or a button.

**The Answering Line Rule.** A Devanagari display line comes after the English heading or Latin SFX word it answers, directly below it or set into the same event art, never above it. A Hindi line above a heading is a kicker.

**The Per-Glyph Fallback Rule.** Every Latin face is chained to its Devanagari partner (Dela to Rozha, Zen Kaku to Mukta, Klee to Kalam) behind a Devanagari `unicode-range`. Mixed English and Hindi strings fall through glyph by glyph; do not switch font-family by hand for Hindi text.

**The Mukta Numeral Rule.** Devanagari numerals are set in Mukta, not Rozha: Rozha's Devanagari digits read as Latin numerals.

**The Devanagari Script Rule.** Hindi is always written in Devanagari, never romanised, and every Hindi run carries `lang="hi"`. First-person Hindi is written as gender-neutral noun phrases. The owner's name stays in Latin until a Devanagari spelling is confirmed.

## Layout

The board is a centred column, max 1280px, with inline padding clamp(16px, 4vw, 56px); a 1px guide line runs down each side at half the board padding for the whole chapter. Everything counts in units of 8px:

- **Beat gutter** (2u, 16px): related panels (mid projects, the side-quest and guild-contract pages, the Prologue and the arcs).
- **Scene gutter** (7u, 56px): between lead projects and between major blocks.
- **Chapter gutter** (16u, 128px): the product-to-research turn, the jump from the work into the Prologue, and the jump into the Skill tree.
- **Held gutter** (clamp(20u, 38svh, 40u)): a page turn, marked with a dashed guide rule and an optional pencil note.

Floods break the board and run full-bleed. They sit directly in `main`, so their width is 100%, never 100vw (which would add the scrollbar's width); min-height clamp(260px, 52svh, 480px), with 5px ink rules top and bottom. There are exactly two.

Inside panels, a 12-column grid at lg (1024px) with deliberately unequal spans (7/5, 5/7); lead projects alternate art and captions left and right. Manga pages (side quests, guild contracts) use a 2-column grid on mobile and 6 columns at lg with hand-placed spans, gap 12–14px, so size says which beat is bigger. The journey is a Prologue splash panel (7/5 inside) followed by four arc panels on a 12-column tier: 5 / 7, then 12, then 12; the two wide arcs put episodes in two columns from md, and the narrow first arc drops its numeral at lg. Panel padding steps 20 / 32 / 40px (splash to 48–56px) across base / sm / lg. Mobile is the primary experience: grids collapse to one column, the splash character gets its own beat between the actions and the proof, the Devanagari splash SFX is desktop-only, and the page counter hides until the reader scrolls past 120px.

### Named Rules
**The Counted Gutter Rule.** A gutter is a timing decision expressed in units of 8px. Pick beat, scene, chapter or held; never an eyeballed margin.

## Elevation & Depth

The system is flat and has no box-shadows. Depth is drawn, not lit: frame weight says importance, overlap and small rotations (-2° to +1.5°) stack insets over the splash, cutout characters break out through a frame's top edge, and the rough blue ネーム stroke sits 5–6px offset beneath each panel like an underdrawing. Screentone and multiply-blended ink scenes supply tone.

### Shadow Vocabulary
None. Tone is the depth vocabulary:
- **Fine tone** (radial ink dot 0.95px on a 6px grid): standard screentone.
- **Coarse tone** (1.6px dot on a 9px grid): heavier shading.
- **Spot tone** (spot dot 1.4px on a 7px grid): the settled state of the impact-corner flash.
- **Pressed tone** (paper dot 0.9px on a 5px grid over ink): a button's active state.

### Named Rules
**The Drawn Depth Rule.** No box-shadow, no offset shadow, no blur. If something must read as in front, overlap it, rotate it, or give it a heavier frame.

**The Event Tone Rule.** Tone and speed lines appear only at named events: splash, floods, contact splash, impact hover, pressed state. Never as a page background.

## Shapes

All corners are square (0px). The form language is the manga frame: rectangles with ink borders at three weights, 2px for insets, badges, captions, illustration frames and small buttons, 3px for standard panels, buttons, stamps, the arc "Unlocked" rule and the masthead rule, 5px for splash panels and flood edges. Rectangles tilt slightly rather than round. Speed lines are tapered G-pen wedges converging on a calm clearing, drawn as SVG paths, never gradients. The only curve in the system is the editor's hand-drawn spot circle (3.5px round-capped stroke) and the pencil arrow. Icons are custom 24px line glyphs at 2.25px stroke with square caps and mitre joins; GitHub and LinkedIn use their filled marks.

## Components

### Buttons
Inked frames that fill with ink on hover and with tone when pressed.
- **Shape:** square (0px), 3px ink frame, min-height 48px, padding 0 20px, weight 900, 1rem, icon gap 10px.
- **Primary (spot):** spot fill, ink text. One per beat: "Read the work", "Write an email", live-site links, the masthead "Contact · संपर्क", the 404 "Back to the first panel · पहला पन्ना".
- **Secondary:** paper fill, ink text. GitHub, LinkedIn, Copy address.
- **Hover / Focus:** instant inversion (120ms): secondary becomes ink with paper text; primary becomes ink with spot text. Focus is a 3px spot outline offset 3px.
- **Active:** translateY(1px) with pressed tone.
- **Small:** 40px high, padding 0 14px, 0.9375rem, 2px frame; used in link rows and the masthead.

### Chips
- **Badge:** paper, 2px ink frame, 30px min-height, 0.8125rem / 700. Stack lists and the arcs' unlocked skills.
- **Skill weight chip:** the frame encodes how often a skill ships: solid ink (3+ uses), 3px frame (2), 2px frame (1), 2px dashed ink-2 (0), with a tabular ×n count and a legend. Weight, not a percentage bar.
- **Status stamp:** uppercase label type, 3px frame, rotated -2°. Solid ink for Finalist / In production / Shipped; dashed for Active / Paper in prep and for the ongoing arc's "Ongoing · जारी"; plain otherwise. Status is never rounded up.

### Cards / Containers
- **Panel:** paper, square, 3px ink frame drawn as an overlay (5px splash, 2px inset) above a 1.5px guide-blue rough stroke at -0.4°, 60% opacity. Every top-level panel is addressable (`data-panel` number and label).
- **Caption box:** the narration box carrying Problem / Built / Outcome beats, About facts and arc episodes. Paper, 2px frame, padding 2u / 2u / 2.25u, with an ink tab (0.75rem, 900, 0.08em, uppercase) hanging off its top-left edge. Beat tabs are bilingual, "English · हिन्दी" joined by a middle dot: "Problem · समस्या", "Built · निर्माण", "Outcome · परिणाम", "Ep. N · प्रसंग N".
- **Narration panel:** a splash-weight panel that holds a manga page's English title and its Devanagari heading line inside the page grid ("Side quests / उप-कथाएँ", "Guild contracts / संघ के अनुबंध").
- **Page panel:** a small panel on a manga page; if linked, the whole panel inverts to ink on hover.
- **Internal padding:** 20px mobile, 28–40px desktop.

### Navigation
- **Masthead:** name with the four-panel mark (one cell in spot); chapter links stack an English label (700, gains a 3px spot underline on hover) over a small Devanagari label (0.8rem, 700, ink-2): The work / कारनामे, Arcs / पर्व, Skill tree / कौशल, hidden below md; a small spot "Contact · संपर्क" button always visible; a 3px ink rule beneath.
- **Reader chrome:** a fixed page counter tab bottom-left ("p.01 / 18" in tabular numerals plus the current panel label from md) opening a panel index (340px, 3px frame, current entry inverted to ink); a fixed spot Contact tab bottom-right that retreats while the contact panel is in view and before first scroll.

### Arc Panel (signature)
One chapter of the journey, told as an anime arc (पर्व). A standard 3px panel, flex column, padding 20 / 32px. Header: the English title "Arc N: Name" in title type, the Devanagari heading line under it, then period · theme in 700 ink-2; top-right, the Mukta numeral "पर्व N" and, for the ongoing arc only, a dashed "Ongoing · जारी" stamp. Below, an optional 16:7 title-card illustration in a 2px inset frame, then episodes as an ordered list of caption boxes tabbed "Ep. N · प्रसंग N", then, pinned to the foot above a 3px ink rule, "Unlocked · अर्जित शक्तियाँ" in 900 followed by a row of badges. The Prologue that opens the journey is a splash panel: English title, प्रस्तावना heading line, Hindi sub-line, body copy and a Hindi pencil note on the left; the origin-portrait cutout breaking the top of a 4:5 inset frame and three About caption boxes on the right.

### The Editor's Circle (signature)
A hand-drawn, slightly overshooting spot loop (SVG, pathLength 1) wrapped around verifiable proof only: "Finalist", "113/292", and outcomes flagged as proof. Non-proof outcomes get a 3px dashed ink underline instead. It draws on (420ms, ease-ink, 380ms delay) as its panel inks.

### Rough-to-Ink Reveal (signature motion)
Panels start as the blue ネーム stroke with the body offset 20px and rotated -0.6°; crossing 30% up the viewport the ink frame wipes in (clip-path, 300ms ease-ink) and the body settles (460ms ease-settle), tone events fade and scale in. Opted in by a head script before first paint and forced fully inked after 2.5s if the app never hydrates. Under `prefers-reduced-motion` it is a 320ms crossfade from 40% opacity.

### Flood
Full-bleed structural transition: spot field wipes in from the right (380ms ease-out-expo), ink speed lines slide in, an SFX word with a Devanagari SFX line beneath, and a one-line boxed caption (3px frame). Only two per page.

### Impact Hover
Project panels on fine pointers: the body lurches (-3px, -0.9°) and settles at (-1px, -0.35°) over 420ms; an 88px corner triangle flashes solid spot and settles to spot tone.

### Illustration Slot
Fifteen named slots (`lib/illustrations.ts`), all filled with user-supplied ink manga line art prepared by `scripts/ink-illustrations.mjs` and shipped as WebP in `public/illustrations/`, each with a provenance sidecar (`<file>.webp.json`) beside it.
- **Scenes** (twelve): cropped inside the drawn outer frame (the site draws its own), converted to greyscale with the paper normalised to true white, and rendered with `mix-blend-multiply` so the manuscript paper shows through. Lead-project establishing shots sit in a 2px inset frame at 2:1; mid-project headers bleed to the panel edge at 16:9 over a 3px ink rule; arc title cards sit in a 2px inset frame at 16:7.
- **Cutouts** (hero-author, origin-portrait, contact-sendoff): alpha matted from the line art, leaving a thin paper halo round the figure, drawn with `object-fit: contain` and allowed to break out of frames.

A slot and its frame render only when the file exists. In development, or with `ILLUSTRATION_SLOTS=show`, a missing file draws a storyboard placeholder: an empty frame crossed corner to corner in guide blue with a pencil "ink pending: <file>" note. Production renders nothing for a missing file.

## Do's and Don'ts

### Do:
- **Do** keep every corner at 0px and express hierarchy with the 2 / 3 / 5px frame weights.
- **Do** count gutters on the 8px lattice: beat 16px, scene 56px, chapter 128px, held clamp(160px, 38svh, 320px).
- **Do** reserve spot pink (#ff1f6f) for proof, the next action and the two floods; put ink text on it.
- **Do** wrap only verifiable proof in the editor's circle; give non-proof outcomes the dashed ink underline.
- **Do** set each Devanagari display line after the English heading or Latin SFX beat it answers, and mark every Hindi run `lang="hi"`.
- **Do** write bilingual tabs, stamps and buttons as "English · हिन्दी", and stack nav items English over a small Devanagari label.
- **Do** set Devanagari numerals in Mukta through the text stack.
- **Do** prepare supplied art with the ink script: greyscale scenes on white, multiplied onto paper; matted cutouts that break the frame; a provenance sidecar beside every file; nothing rendered for a missing file in production.
- **Do** make every top-level panel addressable so the page counter and index stay true.
- **Do** give every motion a reduced-motion crossfade and keep content legible without JavaScript.

### Don't:
- **Don't** use box-shadows or hard offset shadows; depth is overlap, rotation and frame weight.
- **Don't** use Stitch's crimson / Anton / Space Grotesk tokens; the palette and faces above are the system.
- **Don't** add kicker or eyebrow labels above headings, in either script; uppercase label type belongs to stamps and caption tabs only.
- **Don't** romanise Hindi, write gendered first-person Hindi, or render the owner's name in Devanagari before a spelling is confirmed.
- **Don't** set Devanagari numerals in Rozha One.
- **Don't** show skills as percentage bars; show frequency with frame weight and a counted ×n.
- **Don't** ship a contact form without a backend; contact is mailto, copy address, GitHub and LinkedIn.
- **Don't** add testimonials, client logos or metrics that are not in the evidence on hand.
- **Don't** set text in guide blue or use it for anything but structure and the unfinished state.
- **Don't** lay screentone or speed lines as a background; they belong to named events.
- **Don't** add a third flood, size a flood at 100vw, or use SFX lettering outside beats.
