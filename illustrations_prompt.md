# Illustration prompts — Aakshant Kumar portfolio

Fifteen illustrations. The site already has a slot for each one. A slot stays invisible on the live site until its file exists, and during `npm run dev` it shows as a blue-crossed "ink pending" panel, so you can see exactly where each image lands.

## How to hand them back

1. Generate each image below. **Save it with the exact filename given**, as PNG.
2. Put the files in `public/illustrations/` (create the folder), or hand them to me and I'll place them.
3. Tell me the exact prompt and tool you used for each one, if it differs from what's written here. I record that inside the file so every image carries its provenance.
4. I'll check the alpha edges, crops at desktop and mobile widths, and file weight, then tune placement.

## Style lock (paste this at the start of EVERY prompt)

> Black-and-white Japanese manga ink illustration, printed-page quality. G-pen line art with confident tapered strokes, thick outer contours and thinner interior lines. Solid spot blacks for shadow. Mid-tones only as mechanical screentone dots (halftone), never grey gradients or airbrush. Occasional crosshatching in deep shadow. Pure black ink (#0D0D0D) on pure white. No colour at all. No text, no lettering, no sound effects, no speech-balloon text, no logos, no watermarks, no signatures. Contemporary Indian setting and people where people appear. Clean, high-contrast, reproducible as if scanned from a manuscript page.

**Avoid, for every image:** colour, grey gradients, soft shading, 3D render, photorealism, watercolor, glow, lens flare, neon, chibi or super-deformed proportions, huge sparkly anime eyes, any lettering in the image (Devanagari, English or Japanese; the site sets all Hindi and English text in code), brand logos (no Apple logo on laptops, no real company marks), borders or panel frames drawn into the image (the site draws the frames).

## Technical rules

| Kind | Background | Why |
|---|---|---|
| **Cutout** | **Transparent PNG** (real alpha, not a white box) | Sits on top of speed lines or overlaps panel frames. White areas inside the figure must stay opaque white. |
| **Scene** | **Pure white #FFFFFF**, full frame | The site multiplies scenes onto the paper colour, so the white becomes manuscript paper. Keep the composition edge to edge. |

- Deliver at the listed pixel size or larger, keeping the aspect ratio. The site serves optimised AVIF/WebP, so a large source is fine.
- Keep the important subject inside the safe zone noted for each image. Mobile crops the edges.
- **`{YOU}`:** in prompts 1 and 10, replace `{YOU}` with how you want to be drawn: age range, gender presentation, hair, glasses, build, typical clothes. Example shape: "a young Indian [description] in their early twenties".
- **Likeness:** hero-author and origin-portrait depict you. For a recognisable likeness, give the generator a reference photo of yourself. Without one, keep the figure stylised and seen three-quarters from behind or in shadow, so it isn't a stranger's face presented as yours.
- Nothing in any image should suggest a claim the site doesn't make: no trophies, prize cheques, company logos, fake dashboards with numbers, or crowds holding signs.

---

## 1. `hero-author.png` — splash character
- **Where:** the hero. On desktop it bursts up through the top edge of the splash panel on the right, behind the two proof insets. On mobile it's its own beat between the buttons and the proof.
- **Kind / size:** cutout, transparent · **1200 × 1500** (4:5)
- **Safe zone:** head and shoulders in the top 55%. The lower 30% will be partly covered by two overlapping inset panels on desktop.
- **Prompt:**
  > [style lock] Full-body-to-knees manga splash-page drawing of {YOU}, a computer-science student and ML engineer, leaning forward over an open laptop held in one hand, the other hand raised mid-gesture as if about to snap their fingers. Determined half-smile, sleeves pushed up, casual shirt, lanyard. Dynamic low-angle perspective, strong foreshortening on the raised hand, wind in hair. Heavy spot blacks on the shadow side, screentone on the shirt. Isolated figure on a transparent background, no ground, no scenery, no speed lines (the site draws those).
- **Avoid:** logo on the laptop, text on screen, headphones with brand marks.

## 2. `vedavoice-scene.png` — VedaVoice establishing shot
- **Where:** a wide panel under the VedaVoice title, above the speech-balloon-to-ledger diagram.
- **Kind / size:** scene, white · **2100 × 900** (21:9)
- **Safe zone:** the central 70% width.
- **Prompt:**
  > [style lock] Wide establishing panel inside a small Indian kirana (general) store. Behind a crowded wooden counter stacked with jars, sacks of rice and packets on shelves, a middle-aged shopkeeper speaks into his smartphone held close to his mouth, mid-sentence, eyebrows raised. A thick cloth-bound paper khata ledger lies open on the counter with a pen on it. A customer is partly visible in the foreground, from behind, over the shoulder. Evening light, hanging bulb, deep shadows under the shelves, screentone on walls. Cinematic manga composition, eye-level.
- **Avoid:** readable writing in the ledger, shop signboards with text, brand packaging.

## 3. `roborumble-scene.png` — Robo Rumble 3.0 establishing shot
- **Where:** a wide panel under the Robo Rumble 3.0 title, above the commit grid.
- **Kind / size:** scene, white · **2100 × 900** (21:9)
- **Safe zone:** the central 70% width.
- **Prompt:**
  > [style lock] Wide action panel of two student-built combat robots colliding in the centre of a square competition arena. One robot is a low wedge flipper, the other has a spinning drum weapon. Sparks drawn as sharp black-and-white starbursts, debris flying. Arena floor with bolted steel plates, polycarbonate arena walls, blurred silhouettes of a cheering college crowd behind. Strong motion lines on the robots, heavy blacks under the chassis, screentone on the crowd.
- **Avoid:** scoreboards or banners with text, event logos, sponsor marks.

## 4. `airgated-scene.png` — AirGated establishing shot
- **Where:** a wide panel under the AirGated title, above the check-in flow diagram.
- **Kind / size:** scene, white · **2100 × 900** (21:9)
- **Safe zone:** the central 70% width. The doorway detail sits in the right third.
- **Prompt:**
  > [style lock] Wide establishing panel of a university lecture hall seen from the side aisle. Rows of Indian students at desks each hold up a smartphone toward the front of the room, where a small wireless router sits on the lecturer's desk. Faint concentric signal arcs drawn in ink radiate from the router and stop at the classroom walls. In the right third, through a half-open door in the corridor outside, a lone student holds a phone toward the room, and the signal arcs end before reaching him, his screen dark. Afternoon light through tall windows, screentone on the walls, heavy blacks in the corridor.
- **Avoid:** text on screens or the board, Wi-Fi logos, padlock icons.

## 5. `snake-scene.png` — Snake AI establishing shot
- **Where:** a wide panel under the Snake AI title, above the game-board illustration.
- **Kind / size:** scene, white · **2100 × 900** (21:9)
- **Safe zone:** the central 60% width.
- **Prompt:**
  > [style lock] Wide close-up panel of a small, boxy, friendly-looking robot with a single round camera-lens eye, hunched intently over a chunky retro handheld game console gripped in its metal hands. On the console's screen, a simple Snake game: a blocky snake chasing a single square pellet on a grid. Tiny ink star-bursts pop around the pellet like a reward. Background is a desk at night with scattered notebook pages covered in abstract neural-network node diagrams (circles and connecting lines only, no text or numbers). Dramatic top light, deep screentone shadows.
- **Avoid:** numbers, equations or code on the pages, brand console designs.

## 6. `riseup-scene.png` — Rise UP Public School header
- **Where:** top image band of the Rise UP Public School panel.
- **Kind / size:** scene, white · **1600 × 900** (16:9)
- **Safe zone:** the central 80%. The top 10% may be cropped.
- **Prompt:**
  > [style lock] Morning establishing panel of a modest two-storey school building in a village in eastern Uttar Pradesh, with a boundary wall, an iron gate and a neem tree. Children in simple school uniforms with backpacks walk in through the gate. A parent at the gate glances at a smartphone. Fields and a distant water tank on the horizon. Long morning shadows, screentone sky, crisp architectural linework.
- **Avoid:** the school's real name, crest, or any text on the building; recognisable real children.

## 7. `drishtikon-scene.png` — Drishtikon header
- **Where:** top image band of the Drishtikon (SatQuery AI) panel.
- **Kind / size:** scene, white · **1600 × 900** (16:9)
- **Safe zone:** the satellite in the left-centre. The Earth curve can crop at the edges.
- **Prompt:**
  > [style lock] Dramatic space panel of an Earth-observation satellite with long solar-panel wings in low orbit, drawn with precise mechanical linework. Below it, the curve of the Earth with the Indian subcontinent and the Himalayas recognisable in stylised ink contours, cloud swirls in screentone. A single thin ink beam from the satellite's camera to the ground. Deep solid black space with a few white star specks.
- **Avoid:** country borders drawn as political lines, agency logos or flags on the satellite, text.

## 8. `railways-scene.png` — Indian Railways header
- **Where:** top image band of the Indian Railways panel.
- **Kind / size:** scene, white · **1600 × 900** (16:9)
- **Safe zone:** the central 80%.
- **Prompt:**
  > [style lock] Busy Indian railway platform at dusk as a long-distance train pulls in, locomotive headlight flaring as a white starburst. The platform is packed with passengers carrying luggage and bundles, a chai vendor, people pressing toward the coach doors. Overhead electric catenary wires and a signal gantry. Strong one-point perspective down the platform, motion lines on the train, dense screentone crowd.
- **Avoid:** station name boards, coach numbers or any text, the Indian Railways logo.

## 9. `ambisense-scene.png` — Void / AmbiSense header
- **Where:** top image band of the Void / AmbiSense panel.
- **Kind / size:** scene, white · **1600 × 900** (16:9)
- **Safe zone:** the central face strip.
- **Prompt:**
  > [style lock] A single young adult face shown in a horizontal strip of four tall narrow vertical slices, like adjacent manga panels cut from one portrait, each slice with a subtly different expression: a polite smile, a smile with glistening eyes, a tightened jaw, a neutral stare. Together they read as one ambiguous emotion. Dramatic side lighting, heavy blacks, screentone skin shading, fine hair strands. The slices separated by thin white gaps, not drawn frames.
- **Avoid:** tears drawn as cartoon streams, emoji-like expressions, text.

## 10. `origin-portrait.png` — "How I got here" portrait
- **Where:** the origin panel, above the Studying / Interned / Off the clock facts. On desktop the figure rises out of the top of its frame.
- **Kind / size:** cutout, transparent · **1200 × 1500** (4:5)
- **Safe zone:** head in the top 45%. The bottom edge sits on the frame.
- **Prompt:**
  > [style lock] Quiet late-night manga portrait of {YOU}, the same person as the hero illustration [use the same reference], seated at a cluttered desk, drawn from the waist up, resting their chin on one hand, thinking over a chessboard mid-game. Beside him: an open notebook with handwritten lines (illegible scribble strokes only, no readable script), a camera with a macro lens, a laptop pushed aside, and a desk lamp casting a cone of light. Soft screentone around the lamp glow, heavy black shadows elsewhere. Isolated on a transparent background; the desk edge may be cut straight at the bottom.
- **Avoid:** readable Urdu, Hindi or English text in the notebook, logos, chess-site UI.

## 11. `contact-sendoff.png` — contact send-off
- **Where:** the final contact splash. On desktop it overlaps the lower-right frame edge. On mobile it sits above the "To be continued" banner.
- **Kind / size:** cutout, transparent · **1400 × 1000** (7:5)
- **Safe zone:** the plane and hand within the central 80%.
- **Prompt:**
  > [style lock] Dynamic close-up of a hand, fingers spread, having just launched a paper plane into the air toward the upper right. The paper plane is folded from a sheet of manga manuscript paper showing faint panel borders (no text). Sharp motion lines trail behind the plane, a small ink swoosh behind the wrist, a few tiny paper specks. Isolated on a transparent background.
- **Avoid:** envelope icons, email symbols (@), text on the paper.

---

## Arc title cards (12–15)

Each of the four journey arcs (पर्व) opens with a wide title card under its heading. The site sets the arc name, the Devanagari title and the episode captions in code, **so these images carry no lettering at all**: no Devanagari, no English, no numbers.

## 12. `arc-origin-card.png` — Origin Arc · आरंभ पर्व
- **Where:** the top of the Origin Arc panel (the left panel of the first arc row on desktop).
- **Kind / size:** scene, white · **1600 × 700** (16:7)
- **Safe zone:** the central 70%. The panel is narrow on desktop, so keep the subject compact.
- **Prompt:**
  > [style lock] Wide still-life title panel on a hostel desk at night: two thumbs gripping a smartphone held sideways mid-battle (the game shown only as abstract motion shapes and speed lines on the screen, no UI, no brand), a chessboard with a knight mid-move beside it, a university ID lanyard coiled on a notebook, and an open laptop in the background showing abstract grid shapes. Phone glow rendered as screentone, deep spot blacks around the edges. Quiet, before-the-journey mood.
- **Avoid:** recognisable game characters or UI, brand logos, any text.

## 13. `arc-party-card.png` — Party Arc · दल पर्व
- **Where:** the top of the Party Arc panel (the right, wider panel of the first arc row).
- **Kind / size:** scene, white · **1600 × 700** (16:7)
- **Safe zone:** the central 75%.
- **Prompt:**
  > [style lock] Wide title panel of a hackathon squad assembling late at night around one table: four young Indian people seen mostly from behind and in three-quarter view, laptops open, one standing and pointing at a large sheet of system-diagram sketches (boxes and arrows only) taped to the wall, chai glasses, tangled chargers. Overhead tube light, strong perspective down the table, screentone shadows, the feeling of a party forming before a quest.
- **Avoid:** readable wireframe text, logos, recognisable real faces.

## 14. `arc-awakening-card.png` — Awakening Arc · जागरण पर्व
- **Where:** the top of the Awakening Arc panel (a full-width row).
- **Kind / size:** scene, white · **1600 × 700** (16:7)
- **Safe zone:** the figure in the central third.
- **Prompt:**
  > [style lock] Dramatic wide title panel: a lone young figure seen from behind stands before a towering wall made of many manga panels, each showing a different image drawn in ink: a sound waveform, a paper ledger, a face half in shadow, a network of connected nodes, a satellite dish. Radiating concentrated speed lines burst outward from the figure like an awakening aura, and fragments of the panels peel away into the air. Heavy blacks, high contrast, heroic low angle.
- **Avoid:** glowing effects in grey gradients, text or numbers in any panel.

## 15. `arc-horizon-card.png` — Horizon Arc · क्षितिज पर्व
- **Where:** the top of the Horizon Arc panel, the ongoing arc that closes the journey.
- **Kind / size:** scene, white · **1600 × 700** (16:7)
- **Safe zone:** the figure in the left third, the satellite streak across the upper right.
- **Prompt:**
  > [style lock] Wide dawn title panel: a lone figure seen from behind sits on the parapet of a rooftop in Kanpur, laptop closed beside them, looking out over a dense city skyline of water tanks, rooftops and a distant river bridge with a train crossing. Across the pale sky, a satellite streaks as a thin bright line trailed by speed lines toward the horizon. Sun rising as a white disc ringed with screentone. Calm, forward-looking, unfinished-story mood.
- **Avoid:** landmark signage, text, colour.

---

## Optional extras (not wired up yet)
- **Social share card** (`og-card.png`, 1200 × 630, scene): a manga title-page composition with open space in the left half for your name, which the site would set in code. Ask and I'll wire it into `opengraph-image`.
- **Client work:** for Suhag Bindi Store, Komal Kalra, Lumière, Devine Digital Academy, Devine Astro Talk and Book-a-Cab, **real screenshots of the live sites** beat illustrations, because they're proof. I can capture them myself if you want those panels to carry thumbnails.
