// Illustration slots. Files live in public/illustrations/; supplied art is prepared by scripts/ink-illustrations.mjs
// (scenes cropped to the art inside their drawn frame, cutouts matted from the line art). Prompts: illustrations_prompt.md.
// A slot renders only when its file exists; in development a storyboard placeholder marks where it goes.

export type IllustrationId =
  | "hero-author"
  | "vedavoice-scene"
  | "roborumble-scene"
  | "airgated-scene"
  | "snake-scene"
  | "riseup-scene"
  | "drishtikon-scene"
  | "railways-scene"
  | "ambisense-scene"
  | "origin-portrait"
  | "contact-sendoff"
  | "arc-origin-card"
  | "arc-party-card"
  | "arc-awakening-card"
  | "arc-horizon-card";

export type IllustrationSpec = {
  file: string;
  width: number;
  height: number;
  /** cutout = transparent PNG that sits on the paper; scene = full-frame, opaque paper ground */
  kind: "cutout" | "scene";
  alt: string;
  slot: string;
};

export const illustrations: Record<IllustrationId, IllustrationSpec> = {
  "hero-author": {
    file: "hero-author.webp",
    width: 879,
    height: 1116,
    kind: "cutout",
    alt: "Ink manga illustration of Aakshant at a laptop, bursting out of the splash panel",
    slot: "Splash character",
  },
  "vedavoice-scene": {
    file: "vedavoice-scene.webp",
    width: 978,
    height: 622,
    kind: "scene",
    alt: "Ink manga illustration of a kirana shopkeeper speaking a credit entry into a phone beside a paper khata",
    slot: "VedaVoice establishing shot",
  },
  "roborumble-scene": {
    file: "roborumble-scene.webp",
    width: 1147,
    height: 637,
    kind: "scene",
    alt: "Ink manga illustration of two combat robots clashing in a competition arena",
    slot: "Robo Rumble establishing shot",
  },
  "airgated-scene": {
    file: "airgated-scene.webp",
    width: 1312,
    height: 705,
    kind: "scene",
    alt: "Ink manga illustration of a lecture hall where students check in on their phones while a phone outside the door is turned away",
    slot: "AirGated establishing shot",
  },
  "snake-scene": {
    file: "snake-scene.webp",
    width: 1046,
    height: 587,
    kind: "scene",
    alt: "Ink manga illustration of a small robot agent intently playing Snake on a handheld console",
    slot: "Snake AI establishing shot",
  },
  "riseup-scene": {
    file: "riseup-scene.webp",
    width: 1248,
    height: 720,
    kind: "scene",
    alt: "Ink manga illustration of a school building in rural Uttar Pradesh with children arriving",
    slot: "Rise UP header",
  },
  "drishtikon-scene": {
    file: "drishtikon-scene.webp",
    width: 1306,
    height: 688,
    kind: "scene",
    alt: "Ink manga illustration of an observation satellite in orbit above the Indian subcontinent",
    slot: "Drishtikon header",
  },
  "railways-scene": {
    file: "railways-scene.webp",
    width: 1044,
    height: 768,
    kind: "scene",
    alt: "Ink manga illustration of a crowded Indian railway platform as a train pulls in",
    slot: "Indian Railways header",
  },
  "ambisense-scene": {
    file: "ambisense-scene.webp",
    width: 1272,
    height: 711,
    kind: "scene",
    alt: "Ink manga illustration of one face split across panels, each showing a different, ambiguous emotion",
    slot: "AmbiSense header",
  },
  "origin-portrait": {
    file: "origin-portrait.webp",
    width: 873,
    height: 950,
    kind: "cutout",
    alt: "Ink manga illustration of Aakshant at a desk at night with a chessboard, a poetry notebook and a macro camera",
    slot: "Origin portrait",
  },
  "contact-sendoff": {
    file: "contact-sendoff.webp",
    width: 1041,
    height: 815,
    kind: "cutout",
    alt: "Ink manga illustration of a hand launching a paper plane folded from a manga page",
    slot: "Contact send-off",
  },
  "arc-origin-card": {
    file: "arc-origin-card.webp",
    width: 1077,
    height: 642,
    kind: "scene",
    alt: "Ink manga title card: hands mid-game on a phone beside a chessboard, an open laptop and a university lanyard",
    slot: "Origin Arc title card",
  },
  "arc-party-card": {
    file: "arc-party-card.webp",
    width: 1268,
    height: 672,
    kind: "scene",
    alt: "Ink manga title card: a hackathon squad at night, one member pointing at a system diagram taped to the wall while the others work at laptops",
    slot: "Party Arc title card",
  },
  "arc-awakening-card": {
    file: "arc-awakening-card.webp",
    width: 1086,
    height: 666,
    kind: "scene",
    alt: "Ink manga title card: a figure bursting with speed lines in front of a wall of panels showing a waveform, a ledger, a half-shadowed face, a network and a satellite dish",
    slot: "Awakening Arc title card",
  },
  "arc-horizon-card": {
    file: "arc-horizon-card.webp",
    width: 1208,
    height: 701,
    kind: "scene",
    alt: "Ink manga title card: a figure on a Kanpur rooftop at dawn watching a satellite streak above the horizon",
    slot: "Horizon Arc title card",
  },
};
