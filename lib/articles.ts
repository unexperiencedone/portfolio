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
  | { t: "table"; head: string[]; rows: string[][]; title: string; takeaway: string };

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
    if (b.t === "image" || b.t === "flow" || b.t === "sequence" || b.t === "table") n += 40; // a figure takes reading time too
  }
  return n;
}

export function minutes(piece: Piece) {
  return Math.max(1, Math.round(words(piece) / 220));
}

// ──────────────────────────────────────────────────────────────────── Ved Code

const vedcode: Article = {
  slug: "ved-code",
  project: "Ved Code",
  projectHi: "कोड को समझना",
  published: "2026-10-13",
  status: "Work in progress",
  team: "Aakshant Kumar, with a contribution from letscodesatish",
  hero: { src: "/writing/ved-code/explore-graph.png", alt: "Ved Code's Project Constellation mapping the files and imports of a Python repository" },
  links: [
    { label: "Live demo", href: "https://vedcode-ai4bharat.vercel.app", kind: "live" },
    { label: "Source", href: "https://github.com/unexperiencedone/vedcode-ai4bharat", kind: "source" },
  ],
  stack: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle", "Amazon Bedrock", "DynamoDB", "Docker", "ts-morph"],
  story: {
    title: "Ved Code: a mentor that remembers what you learned",
    dek: "Developers spend hours learning, then forget it the week they need it. Ved Code is an attempt to keep that learning attached to the code you're actually writing.",
    blocks: [
      { t: "p", text: "Every developer knows the loop. You watch a tutorial, read the docs, build the example, and feel like you understand. A month later you open a real codebase, hit the same concept, and you're back at the tutorial. The knowledge didn't stick, because it was never attached to anything you were working on." },
      { t: "p", text: "Coding assistants don't break that loop. They answer the question in front of them and forget it the moment the tab closes. They don't know which concepts you've already struggled with, what your project looks like, or whether you've seen this pattern three times this week." },
      { t: "callout", label: "In short", labelHi: "सार", text: "Ved Code is an AI coding mentor. Point it at a codebase and it maps the structure, explains each file in context, and teaches the concepts you meet, with spaced repetition so they stay learned. It's unfinished, and this piece says which parts are real." },
      { t: "h", text: "Who it's for" },
      { t: "p", text: "Mostly beginners and intermediate developers, and anyone landing in a codebase they didn't write. Our own feature audit rated it the same way. For a beginner, \"help me understand a repo I've never seen\" plus a visual sense of which files are risky to touch is exactly what's missing. For an intermediate developer starting a new job, it's a faster way into an unfamiliar codebase. An expert who owns the repo can usually get the same answers faster from their own IDE, and we say so." },
      { t: "image", src: "/writing/ved-code/home.png", alt: "Ved Code landing page: Understand code. Build faster.", title: "The front door", takeaway: "The pitch is two verbs, understand and build. Everything behind the sign-in is judged against those two words." },
      { t: "h", text: "What changes for them" },
      { t: "p", text: "You paste a GitHub link and get a map of the project: every file as a node, every import as a line, and on hover, what a file depends on and what depends on it. Click a file and an AI walks you through it. Instead of reading a repository top to bottom, you see its shape first and dive where it matters." },
      { t: "image", src: "/writing/ved-code/explore-graph.png", alt: "Project Constellation showing files of the AirGated repository with complexity 40 and three files depending on face_verify.py", title: "A real repository, mapped", takeaway: "Ved Code read the AirGated repo and found that three files depend on face_verify.py. That's the file to be careful with, visible before you've read a line." },
      { t: "p", text: "Documentation stops being a pile of tabs. In the Knowledge Studio you feed it the docs you're learning from, and it turns them into something you can search by meaning, read like an encyclopedia, and browse as a galaxy of related concepts." },
      { t: "image", src: "/writing/ved-code/knowledge-studio.png", alt: "Knowledge Studio with tabs for ingestion, Ripple Guard, encyclopedia reader and galaxy map", title: "Your docs, made searchable", takeaway: "Three of these four tabs work end to end. The fourth, Ripple Guard, is honest about having nothing to say yet, and the technical piece explains why." },
      { t: "p", text: "Learning stays learned. Each concept you meet gets a mastery score that decays over time the way memory does, and comes back for review at growing intervals, from a day to three months. That's the part that's meant to break the tutorial loop." },
      { t: "h", text: "Why it matters" },
      { t: "p", text: "For an individual, it's the difference between re-learning something five times and learning it once. For a team or a college, onboarding is expensive: senior people spend hours explaining the same codebase to each new person. A tool that gives newcomers the map, the walkthrough and the follow-up review takes part of that load. And for India specifically, where a huge number of people are learning to code right now, often without a mentor, a mentor that remembers you is the point." },
      { t: "h", text: "Where it honestly stands" },
      { t: "p", text: "Before writing this, we went through the code feature by feature and asked one question: is what we hand the AI actually true? The AI calls were almost always real. What was often fake was the input. So here's the plain state of it." },
      { t: "table", head: ["Works today", "Still for show"], rows: [
        ["Project Constellation: real dependency maps from any public GitHub repo", "The dashboard's \"System Live\" numbers are seeded once and never change"],
        ["Knowledge Studio: ingest docs, search by meaning, reader, galaxy", "The stress heatmap and Ripple Guard: the pipeline that feeds them is never called"],
        ["A web IDE that runs 7 languages in an isolated sandbox (locally)", "Knowledge-map stats are placeholders"],
        ["Spaced repetition with forgetting-curve decay", "Learn has thin content: only a handful of technologies are seeded"],
      ], title: "The honest split", takeaway: "The left column is the product. The right column is the to-do list, and saying it out loud is cheaper than having a user find it." },
      { t: "p", text: "We also cut things. There were four separate \"warn me about the impact of this change\" features, and none of them had real access to the codebase. Three are deleted. The one real engine is kept for a proper rebuild." },
      { t: "h", text: "Try it" },
      { t: "p", text: "The live demo has a public account, so you don't need to sign up: `demo@vedcode.dev` with the password `VedCodeDemo#2026`. Start with Explore and paste any public GitHub link. If you want the architecture, the sandbox flags and the bugs we hit along the way, the technical piece is next door." },
    ],
  },
  technical: {
    title: "Ved Code, technically: real AI, and the plumbing in front of it",
    dek: "How the dependency map, the semantic search and the sandboxed IDE are built, and the one lesson from auditing all of it: the AI is rarely fake, the input often is.",
    blocks: [
      { t: "p", text: "Ved Code is a Next.js application with a deliberately boring core and a few genuinely hard pieces bolted to it: an AST-based dependency mapper, a semantic search pipeline on Amazon Bedrock, a learning engine with real spaced repetition, and a code runner that executes untrusted programs. This piece walks through each, then through the audit that told us which of them were real." },
      { t: "callout", label: "TL;DR", labelHi: "सार", text: "The most useful finding wasn't about any one feature. Across the codebase the model calls were genuine. What broke was what we fed them: a hardcoded file path, a cache nothing writes to, a metric typed in as `100 // Dummy`. If you audit an AI product, ask \"is the input true?\" before \"is the AI real?\"" },
      { t: "h", text: "System architecture" },
      { t: "p", text: "As shown in Figure 1 below, the browser talks only to Next.js API routes, and those routes fan out to four kinds of backend: Postgres for everything relational, DynamoDB for vector chunks, Bedrock for models, and Docker for code execution. GitHub is read through its public Trees API." },
      { t: "flow", title: "System architecture", takeaway: "One web tier, four specialised backends. Each heavy capability has exactly one home, which made the later audit tractable.", flow: { kind: "flow", nodes: [
        { id: "ui", label: "Browser", sub: "Next.js App Router", col: 1, row: 0 },
        { id: "api", label: "API routes", sub: "Next.js route handlers", col: 1, row: 1, focus: true },
        { id: "gh", label: "GitHub", sub: "Git Trees API", col: 0, row: 1 },
        { id: "pg", label: "PostgreSQL", sub: "Drizzle ORM", col: 0, row: 2 },
        { id: "ddb", label: "DynamoDB", sub: "Titan vector chunks", col: 1, row: 2 },
        { id: "br", label: "Amazon Bedrock", sub: "Nova Pro · Mistral · Titan", col: 2, row: 2 },
        { id: "dk", label: "Docker sandbox", sub: "one container per run", col: 2, row: 1 },
      ], edges: [
        { from: "ui", to: "api" }, { from: "api", to: "gh", label: "fetch tree" }, { from: "api", to: "dk", label: "run code" },
        { from: "api", to: "pg" }, { from: "api", to: "ddb" }, { from: "api", to: "br" },
      ] } },
      { t: "h", text: "Project Constellation: from a URL to a map" },
      { t: "p", text: "The strongest feature is also the most conventional engineering. A GitHub URL becomes a file list through the Git Trees API, capped at 200 files and 100 KB per file, a limit the UI now states instead of failing silently. TypeScript and JavaScript files go through `ts-morph`, a real AST, which counts branches, catches and functions for a complexity score. Twenty-plus other languages fall back to regex heuristics." },
      { t: "p", text: "Import resolution was where most of the bugs lived. It now handles relative imports, TypeScript path aliases, and dotted or `::`-namespaced imports for Python, Java, Kotlin, C#, Scala and Rust, with a suffix-match fallback. Layout is a deterministic DAG layering pass rather than a physics simulation, so the same repository always draws the same way." },
      { t: "flow", title: "The Constellation pipeline", takeaway: "Only the last step calls a model. The map itself is parsing and graph layout, which is why it's the part we trust most.", flow: { kind: "flow", colW: 210, nodes: [
        { id: "url", label: "GitHub URL", col: 0, row: 0 },
        { id: "tree", label: "Git Trees API", sub: "200 files · 100 KB cap", col: 1, row: 0 },
        { id: "ast", label: "ts-morph AST", sub: "TS / JS", col: 2, row: 0 },
        { id: "rx", label: "Regex heuristics", sub: "20+ languages", col: 2, row: 1 },
        { id: "imp", label: "Import resolution", sub: "aliases · namespaces", col: 1, row: 1, focus: true },
        { id: "dag", label: "DAG layering", sub: "deterministic layout", col: 0, row: 1 },
        { id: "ai", label: "File walkthrough", sub: "Nova Pro + Zod schema", col: 0, row: 2, dashed: true },
      ], edges: [
        { from: "url", to: "tree" }, { from: "tree", to: "ast" }, { from: "ast", to: "rx", label: "other files" },
        { from: "rx", to: "imp" }, { from: "imp", to: "dag" }, { from: "dag", to: "ai", label: "on click", dashed: true },
      ] } },
      { t: "h", text: "Knowledge Studio: semantic search on Bedrock" },
      { t: "p", text: "Ingestion scrapes a documentation page, chunks it, embeds each chunk with Amazon Titan, and stores the vectors in DynamoDB. Search embeds the query and ranks chunks by cosine similarity. It's a linear scan rather than an approximate-nearest-neighbour index, which is fine at this size and the first thing to change if it grows. Page summaries and concept extraction call Nova Pro and Mistral Large, and the galaxy view is a hand-rolled force-directed layout. Maintenance scripts in the repo show this pipeline was run against live AWS, not just written." },
      { t: "h", text: "The web IDE: executing untrusted code" },
      { t: "p", text: "The IDE began as two half-built editors. One ran code with raw `child_process.spawn()` on the host, no sandbox and no authentication, which is an open remote-code-execution endpoint. We merged them into one IDE and rebuilt execution so that every run is a disposable Docker container. Figure 4 shows the round trip." },
      { t: "sequence", title: "One run, end to end", takeaway: "The session check comes before anything touches Docker, and the container is thrown away after every run, so a hostile program gets one short-lived, offline, read-only box.", seq: { kind: "sequence", actors: ["Browser", "/api/execute", "Docker", "Container"], steps: [
        { from: 0, to: 1, label: "POST source + language" },
        { from: 1, to: 1, label: "session? else 401" },
        { from: 1, to: 2, label: "docker run (flags below)" },
        { from: 2, to: 3, label: "start, source mounted read-only" },
        { from: 3, to: 3, label: "compile + run, timeout 8 s" },
        { from: 3, to: 1, label: "stdout · stderr · exit code", dashed: true },
        { from: 1, to: 0, label: "real exit code (never a fake 0)", dashed: true },
      ] } },
      { t: "table", head: ["Flag", "Why"], rows: [
        ["`--network none`", "A submitted program can't reach the internet or the host network"],
        ["`--read-only` + small `/tmp` tmpfs", "Nothing persists; compiled output has one writable place"],
        ["`--memory 128m --cpus 0.5`", "One run can't starve the server"],
        ["`--pids-limit 128`", "Fork bombs stop; raised from 64 because Go's toolchain needs threads"],
        ["`--cap-drop ALL`, `no-new-privileges`, non-root user", "No kernel capabilities and no escalation inside the box"],
      ], title: "The sandbox, flag by flag", takeaway: "Every flag answers a specific attack. The two numbers were tuned by running real programs, not by reasoning." },
      { t: "p", text: "Security flags are easy to get right by thinking. Runtime compatibility isn't. Running all seven languages for real surfaced three bugs no type checker could see: `tmpfs` mounts default to `noexec`, so compiled C, C++ and Rust binaries couldn't run; Go's build cache tried to write outside `/tmp` on a read-only root; and Go's compile and link steps needed more processes than a limit of 64. Each was a one-line fix once it was visible." },
      { t: "callout", label: "Trade-off", labelHi: "समझौता", text: "Vercel has no Docker, so on the hosted demo the Run button returns a clear 503 instead of executing. The alternative was executing untrusted code without isolation, which is not an alternative. Running it hosted needs a separate sandbox host." },
      { t: "h", text: "The learning engine" },
      { t: "p", text: "This is the most sophisticated logic in the repository. Each user has a per-concept mastery score with forgetting-curve decay, and a discrete review schedule of 1, 3, 7, 14, 30 and 90 days that resets on a failed recall. Skill level is inferred from the last 100 behavioural signals with recency weighting, and it changes how deep Learn's explanations go. Gap detection walks a prerequisite graph against what you've actually mastered. Roadmaps are one model call reasoning over the real concept catalogue for a technology." },
      { t: "p", text: "Its weakness is data, not logic. Only a handful of technologies are seeded, so many concepts return nothing yet, and Handbook, Learn and Roadmap don't link to each other. Finishing a lesson in one doesn't update mastery in the others the same way." },
      { t: "h", text: "The audit: real AI, fake input" },
      { t: "p", text: "We traced every feature from its UI claim to the code underneath. The pattern was consistent enough to be the main lesson, as Figure 6 shows." },
      { t: "flow", title: "Where the dead features actually broke", takeaway: "One function with no callers silently disabled three features. The models downstream were fine; they reported honestly on empty input.", flow: { kind: "flow", colW: 230, nodes: [
        { id: "idx", label: "indexCodebase()", sub: "zero callers", col: 1, row: 0, focus: true, dashed: true },
        { id: "tbl", label: "fileNodes · metrics", sub: "never populated", col: 1, row: 1 },
        { id: "s1", label: "Explore stress overlay", col: 0, row: 2, dashed: true },
        { id: "s2", label: "Checkup heatmap", col: 1, row: 2, dashed: true },
        { id: "s3", label: "Pre-flight gate", sub: "since removed", col: 2, row: 2, dashed: true },
      ], edges: [
        { from: "idx", to: "tbl", label: "would write", dashed: true }, { from: "tbl", to: "s1" }, { from: "tbl", to: "s2" }, { from: "tbl", to: "s3" },
      ] } },
      { t: "list", items: [
        "Ripple Guard parses real ASTs, but reads an import cache that `writeImportCache` is supposed to fill, and nothing calls it. So it always says \"no ripple effects\".",
        "The Knowledge Map is a real graph, but its node stats are `lineCount: 100, // Dummy`.",
        "Four separate change-impact features existed; none had real codebase access. One used a real AST engine, then pointed it at a hardcoded file regardless of what you pasted.",
      ] },
      { t: "h", text: "What's next" },
      { t: "list", items: [
        "Wire up the indexing pipeline once, on demand, when Explore analyses a repo. That repairs three features at the same time.",
        "Rebuild change-impact detection on the real AST engine we kept, against the IDE's own files.",
        "Make Handbook, Learn and Roadmap one product that shares a single mastery signal.",
        "Fix the IDE's file saving, and add interactive input for programs that ask questions while they run.",
      ] },
      { t: "p", text: "The repository's `PROGRESS.md` keeps the full audit and the session log, bug by bug. The code is public, and the demo account on the live site lets you check any of this yourself." },
    ],
  },
};

// ──────────────────────────────────────────────────────────────────── NutriSafe

const nutrisafe: Article = {
  slug: "nutrisafe",
  project: "NutriSafe",
  projectHi: "थाली की जाँच",
  published: "2026-10-15",
  status: "Live",
  team: "Anant Tirupati (lead) and Aakshant Kumar",
  hero: { src: "/writing/nutrisafe/home.png", alt: "NutriSafe landing page: Eat what you want, just safe" },
  links: [
    { label: "Live app", href: "https://nutrisafe-rust.vercel.app", kind: "live" },
    { label: "Source", href: "https://github.com/AnantTirupati/nutrisafe", kind: "source" },
  ],
  stack: ["Next.js", "TypeScript", "MongoDB", "NextAuth", "Amazon Bedrock", "Open Food Facts", "Razorpay"],
  story: {
    title: "NutriSafe: reading the label so you don't have to",
    dek: "If you have diabetes, hypertension or a nut allergy, every packaged food is a small research project. NutriSafe turns a barcode or a photo of the label into an answer about your body.",
    blocks: [
      { t: "p", text: "Pick up any packet in an Indian supermarket and turn it over. The ingredients list is long, in small print, often half in another language, and full of names like maltodextrin, INS 621 or hydrogenated vegetable fat. Most people can't tell which of those matter. For someone managing diabetes, hypertension or PCOS, or someone with a nut or gluten allergy, they all might." },
      { t: "p", text: "The usual answer is \"read the label carefully\". That assumes you know what each ingredient does to your particular body, every time, for every product. Nobody does." },
      { t: "callout", label: "In short", labelHi: "सार", text: "NutriSafe checks packaged food against your health profile. Scan a barcode, photograph the label or type the ingredients, and it tells you the risk for you, low, medium or high, ingredient by ingredient, in plain words and in your language." },
      { t: "image", src: "/writing/nutrisafe/home.png", alt: "NutriSafe landing page with the line Eat what you want, just safe", title: "The promise", takeaway: "\"Eat what you want, just safe.\" It doesn't tell anyone what not to eat; it tells them what a specific product means for them." },
      { t: "h", text: "Who it's for" },
      { t: "list", items: [
        "People managing a long-term condition such as diabetes, hypertension, PCOS or heart disease, for whom sugar, sodium and fats aren't abstract.",
        "People with allergies or intolerances to nuts, gluten, lactose or soy, where one missed ingredient is a bad day or worse.",
        "Families shopping for someone else: a parent with diabetes, a child with an allergy.",
        "Anyone who'd rather read their own language: answers come in English, Hindi, Marathi, Gujarati, Tamil, Telugu, Kannada, Malayalam, Bengali or Punjabi.",
      ] },
      { t: "h", text: "What changes for them" },
      { t: "p", text: "You set up a health profile once: age, conditions, allergies, and whether you're vegetarian, non-vegetarian or vegan. After that, checking a product takes one of three routes: scan the barcode, photograph the label, or type it in. NutriSafe works out what the product contains and judges it against your profile, not against an average person's." },
      { t: "p", text: "The answer is a risk level and a short list: which ingredients are safe for you, which call for caution, which are harmful, and why, in a sentence each. Low-risk products collect in a \"safe for me\" list, so the next shopping trip starts from things you already know are fine. There's also a health assistant you can ask follow-up questions, and diet and workout plans built around the same profile." },
      { t: "h", text: "Why it matters" },
      { t: "p", text: "India has one of the largest diabetic populations in the world, and packaged food is everywhere. The information to make a safe choice is already printed on the packet. What's missing is the translation from \"ingredients\" to \"what this means for me\". That translation is what NutriSafe sells." },
      { t: "p", text: "For a business, the model is already in the code. Checking food is free; the personalised diet and workout planner is premium, unlocked with a one-time ₹299 payment through Razorpay. The audience is defined by a medical need, so the value is easy to explain, and people come back to it every time they shop." },
      { t: "callout", label: "Honest limits", labelHi: "सीमाएँ", text: "NutriSafe's judgement comes from an AI model reading ingredients against your profile. It's guidance, not a diagnosis, and it's only as good as the label it can read. A blurry photo means a worse answer. Anyone with a serious condition should treat it as a second opinion next to their doctor's." },
      { t: "h", text: "Built by two" },
      { t: "p", text: "NutriSafe is Anant Tirupati's project; he built most of it, including the app, the diet plans, the health assistant and the Razorpay premium tier. My part was the intelligence layer: moving the model calls to AWS Bedrock, adding label reading for photos, identifying products that aren't in any barcode database, and making answers come back in the user's language. The technical piece covers how that works." },
    ],
  },
  technical: {
    title: "NutriSafe, technically: three ways in, one judgement out",
    dek: "Barcode, photo or typed text all converge on one ingredients list, which one model judges against one person's health profile. Here's the pipeline, and what happens when the barcode isn't in any database.",
    blocks: [
      { t: "p", text: "NutriSafe is a Next.js 14 application with MongoDB behind NextAuth. Its interesting part is a small pipeline: three different inputs have to become the same thing, a clean ingredients list, before a model can judge it against a specific person." },
      { t: "callout", label: "TL;DR", labelHi: "सार", text: "Open Food Facts first. If the barcode isn't there, a web search plus Amazon Nova Pro identifies the product. A photo goes through Qwen3-VL to read the label. Whatever the route, Nova Pro gets the ingredients and the user's profile and must return a typed verdict." },
      { t: "h", text: "The pipeline" },
      { t: "p", text: "Figure 1 below shows the three routes converging. The design choice that matters is that the judgement step only ever sees one shape of input, so it doesn't care how the product arrived." },
      { t: "flow", title: "Three inputs, one judgement", takeaway: "Every route ends in the same ingredients list, so there's one prompt, one schema and one place to fix a bad answer.", flow: { kind: "flow", colW: 220, nodes: [
        { id: "bc", label: "Barcode", col: 1, row: 0 },
        { id: "ph", label: "Label photo", col: 2, row: 0 },
        { id: "srch", label: "Search fallback", sub: "Serper + Nova Pro", col: 0, row: 1, dashed: true },
        { id: "off", label: "Open Food Facts", sub: "public product DB", col: 1, row: 1 },
        { id: "ocr", label: "Qwen3-VL", sub: "reads the label", col: 2, row: 1 },
        { id: "mn", label: "Typed text", sub: "manual entry", col: 3, row: 1 },
        { id: "ing", label: "Ingredients list", sub: "+ health profile", col: 2, row: 2, focus: true },
        { id: "judge", label: "Nova Pro verdict", sub: "risk + per-ingredient", col: 3, row: 2 },
      ], edges: [
        { from: "bc", to: "off" }, { from: "off", to: "srch", label: "not found", dashed: true }, { from: "off", to: "ing", label: "found" },
        { from: "srch", to: "ing" }, { from: "ph", to: "ocr" }, { from: "ocr", to: "ing" }, { from: "mn", to: "ing" }, { from: "ing", to: "judge" },
      ] } },
      { t: "h", text: "When the barcode isn't in the database" },
      { t: "p", text: "Open Food Facts is free and needs no key, but its coverage of Indian products is patchy. When a barcode comes back empty, NutriSafe doesn't give up. It searches the web for the barcode number through Serper, hands the results to Nova Pro, and asks it to identify the product and its likely ingredients. Only if that also fails does the user see \"not found\". The fallback is visible in the server log as a deliberate branch, not an error path." },
      { t: "h", text: "Reading a label from a photo" },
      { t: "p", text: "Labels in India mix scripts. A photo goes to Qwen3-VL, a vision-language model, through Bedrock's Converse API, which extracts the ingredients and reports the label's language, such as `hi`, `ta` or `en`. That detected language is useful twice: it tells us how to read the label, and it's a strong hint about which language the user wants back." },
      { t: "h", text: "The judgement, and its contract" },
      { t: "p", text: "The analysis prompt gives Nova Pro the ingredients plus the user's age, conditions, allergies and diet, and requires JSON back: an overall `riskLevel` of `low`, `medium` or `high`, and a category of `safe`, `caution` or `harmful` for each ingredient, with a reason. The server validates that contract. If the model returns a risk level outside the three allowed values, the code sets it to `medium` instead of passing nonsense to the UI." },
      { t: "sequence", title: "One scan, end to end", takeaway: "The model is called at most twice per scan, once to identify an unknown product and once to judge it, and its output is checked before anyone sees it.", seq: { kind: "sequence", actors: ["Phone", "API route", "Open Food Facts", "Bedrock"], steps: [
        { from: 0, to: 1, label: "barcode 890…" },
        { from: 1, to: 2, label: "GET /api/v2/product" },
        { from: 2, to: 1, label: "not found", dashed: true },
        { from: 1, to: 3, label: "Serper results → identify (Nova Pro)" },
        { from: 3, to: 1, label: "name + ingredients", dashed: true },
        { from: 1, to: 3, label: "ingredients + profile → judge" },
        { from: 3, to: 1, label: "JSON verdict", dashed: true },
        { from: 1, to: 1, label: "validate riskLevel, save scan" },
        { from: 1, to: 0, label: "risk + per-ingredient notes", dashed: true },
      ] } },
      { t: "h", text: "Data model" },
      { t: "table", head: ["Collection", "Holds"], rows: [
        ["User", "Account; bcrypt-hashed password or Google OAuth"],
        ["HealthProfile", "Age, gender, conditions, allergies, diet, language"],
        ["FoodProduct", "Products analysed before, from any route"],
        ["ScanHistory", "Every check with its risk level, which powers history and \"safe for me\""],
        ["IngredientKnowledge", "Defined for ingredient facts shared across scans, but not used by any route yet"],
        ["DietPlan", "Saved diet and workout plans"],
      ], title: "MongoDB collections", takeaway: "The health profile is its own document, so every feature (scan, chat, diet plan) personalises from the same source." },
      { t: "h", text: "Trade-offs and loose ends" },
      { t: "list", items: [
        "**Model judgement, not rules.** A rules engine for every ingredient and condition would be more predictable but would never cover Indian labels. The model covers far more and is wrong in less predictable ways, so the UI frames results as guidance.",
        "**Health data goes to the model.** The profile has to reach Bedrock to personalise the verdict. It's stored only in the app's own MongoDB otherwise.",
        "**Docs lag the code.** The README and the client file are still named after Gemini, the original provider. The calls themselves moved to Bedrock.",
        "**Photo quality is the ceiling.** A blurry label gives a worse ingredients list, and everything downstream inherits it.",
      ] },
      { t: "p", text: "Anant built the application, the ₹299 premium tier and the planning features; my commits are the Bedrock migration, Qwen3-VL label reading, the search-backed barcode fallback and multi-language answers. The source is public on his GitHub." },
    ],
  },
};

// ──────────────────────────────────────────────────────────────────── AirGated

const airgated: Article = {
  slug: "airgated",
  project: "AirGated",
  projectHi: "हाज़िरी का पहरा",
  published: "2026-10-17",
  status: "Paper in prep",
  team: "Aakshant Kumar",
  links: [{ label: "Source", href: "https://github.com/unexperiencedone/airgated-", kind: "source" }],
  stack: ["Python", "FastAPI", "SQLite", "Web Crypto", "WebSockets", "YuNet", "MediaPipe", "SFace"],
  story: {
    title: "AirGated: attendance you can't fake from your hostel room",
    dek: "Every way colleges have taken attendance has been beaten by a cheap trick. AirGated is attendance that needs you, your phone and the classroom's own Wi-Fi at the same moment, with no internet at all.",
    blocks: [
      { t: "p", text: "Ask any student how attendance gets faked and you'll get a list. A friend answers \"present\" at roll call. The QR code on the projector gets screenshotted and forwarded to a WhatsApp group. The GPS geofence is beaten by a fake-location app. Each new system lasted exactly as long as it took someone to find the trick." },
      { t: "flow", title: "The arms race", takeaway: "Each step was introduced to stop the trick before it, and each was beaten by a new one. AirGated's design starts from the last arrow, not the first.", flow: { kind: "flow", colW: 300, rowH: 104, nodes: [
        { id: "a", label: "Roll call", col: 0, row: 0 },
        { id: "b", label: "QR on projector", col: 0, row: 1 },
        { id: "c", label: "GPS geofence", col: 0, row: 2 },
        { id: "d", label: "Wi-Fi + device key", col: 0, row: 3 },
        { id: "e", label: "+ face & blink", sub: "AirGated today", col: 0, row: 4, focus: true },
      ], edges: [
        { from: "a", to: "b", label: "friend says present" }, { from: "b", to: "c", label: "screenshot" },
        { from: "c", to: "d", label: "fake GPS" }, { from: "d", to: "e", label: "friend has your phone" },
      ] } },
      { t: "callout", label: "In short", labelHi: "सार", text: "The instructor's laptop creates a Wi-Fi network. To be marked present, a student must prove four things at once: they're on that network directly, on the phone they enrolled with, they're a live person who blinks when asked, and their face matches the one recorded on day one. Nothing goes to the cloud." },
      { t: "h", text: "Who it's for" },
      { t: "p", text: "Colleges and schools where attendance counts towards eligibility, which in India is most of them, and where faking it is a known, shrugged-at problem. Instructors who are tired of spending ten minutes of a fifty-minute lecture on roll call. Classrooms where internet is unreliable, because AirGated never needs it." },
      { t: "h", text: "What changes for them" },
      { t: "p", text: "On day one, each student enrolls: they type their roll number, look into the front camera, and blink a few times. Their phone quietly creates a key that can never leave it. After that, a check-in takes seconds: join the classroom Wi-Fi, open the page, blink when asked. The instructor sees who's present, who's absent, who tried and failed and why, and a seven-day trend, on a dashboard that only opens on their own laptop." },
      { t: "table", head: ["The trick", "What stops it now"], rows: [
        ["A friend says \"present\" for you", "Your face has to match your enrollment"],
        ["Forwarding a QR code or screenshot", "There's no QR; every check-in signs a fresh, single-use challenge"],
        ["Fake GPS", "GPS isn't used; you must be on the classroom Wi-Fi, directly"],
        ["Joining from home through a VPN", "The server times the connection itself and rejects slow links"],
        ["Copying your login to a friend's phone", "The key is locked inside your phone's browser and can't be exported"],
        ["Holding up a photo", "Liveness needs a random number of blinks"],
        ["One phone marking five friends", "One device can check in one roll number per minute"],
      ], title: "Every trick, and its answer", takeaway: "Each row is a real way attendance gets faked. AirGated's design is this table, read row by row." },
      { t: "h", text: "Why it matters" },
      { t: "p", text: "Attendance is a rule with consequences: exam eligibility, scholarships, sometimes a hostel place. A rule that's easy to break rewards the students who break it and punishes the ones who don't. For an institution, honest attendance is also honest data about which lectures are working. And because AirGated runs entirely on one laptop, there's no subscription, no student data in someone else's cloud, and nothing to install on the college network." },
      { t: "callout", label: "Honest limits", labelHi: "सीमाएँ", text: "It isn't finished. It hasn't been tested at full class scale on real phones yet. Wi-Fi reaches into the corridor, so \"on the network\" isn't quite \"in the room\". Someone holding your phone and a video of you blinking could still get through. And face data needs a proper consent screen and a deletion policy before any college should use it. All of this is in the project's own status list, and the technical piece goes through it." },
      { t: "h", text: "Where it's going" },
      { t: "p", text: "AirGated is being written up as a paper. I designed it, made the design decisions and tested it; as the project's README says, I used an AI coding assistant to help write most of the code, tests and documentation. The next step is a real trial with a full class of phones, which is the only thing that can answer the questions the tests can't." },
    ],
  },
  technical: {
    title: "AirGated, technically: six gates between a phone and \"present\"",
    dek: "A captive portal, a server-timed latency check, the laptop's own ARP table, a key the browser can't export, and an offline face-and-blink check. How each one works, and what's still open.",
    blocks: [
      { t: "p", text: "AirGated proves physical presence without the internet. Everything runs on the instructor's laptop: a DNS spoofer, an HTTP listener for the phone's connectivity checks, a FastAPI server on HTTPS, three small face models and a SQLite database. This piece walks through how a phone finds the portal, what happens at enrollment and check-in, and the six gates every check-in must pass." },
      { t: "callout", label: "TL;DR", labelHi: "सार", text: "Never trust a number the phone reports. The server times the pings itself, reads the MAC address from its own ARP table, issues single-use challenges, and analyses the camera frames itself. The phone contributes exactly two things: a signature from a key it can't export, and the frames that signature covers." },
      { t: "h", text: "The network" },
      { t: "p", text: "As Figure 1 shows, the laptop is the whole network. Every DNS lookup resolves to it, so every request a phone makes lands there. HTTPS is required because browsers only allow the camera and `crypto.subtle` on secure pages." },
      { t: "flow", title: "Everything runs on one laptop", takeaway: "No cloud and no internet. The trust boundary is the room's Wi-Fi, and every check happens on hardware the instructor controls.", flow: { kind: "flow", colW: 230, nodes: [
        { id: "p", label: "Student phones", col: 0, row: 0 },
        { id: "ap", label: "Wi-Fi hotspot", col: 1, row: 0 },
        { id: "dns", label: "DNS spoofer", sub: "UDP 53 → laptop", col: 2, row: 0 },
        { id: "http", label: "HTTP :80", sub: "probes · landing", col: 0, row: 1 },
        { id: "https", label: "FastAPI :443", sub: "portal · APIs · WebSocket", col: 1, row: 1, focus: true },
        { id: "face", label: "Face engine", sub: "YuNet · MediaPipe · SFace", col: 2, row: 1 },
        { id: "arp", label: "ARP table", sub: "IP → MAC", col: 0, row: 2 },
        { id: "db", label: "SQLite", sub: "registry · records · audit", col: 1, row: 2 },
      ], edges: [
        { from: "p", to: "ap" }, { from: "ap", to: "dns" }, { from: "ap", to: "https" }, { from: "https", to: "http" },
        { from: "https", to: "face" }, { from: "https", to: "arp" }, { from: "https", to: "db" },
      ] } },
      { t: "h", text: "Making the \"Sign in to network\" popup appear" },
      { t: "p", text: "When a phone joins Wi-Fi, its OS fetches a known URL to check for internet. A `204` means \"internet works, show nothing\"; a redirect means \"there's a login page\" and opens the popup. The first version answered `204` to everyone, so the popup never appeared. Now the server tracks which phones have checked in: unverified phones get a `302` to the landing page, verified phones get `204` for three hours. The popup's built-in browser usually can't use the camera, so the landing page sends students to a real browser." },
      { t: "h", text: "Enrollment" },
      { t: "p", text: "Enrollment creates an RSA-2048 key pair in the browser with `extractable: false` and stores it as a `CryptoKey` in IndexedDB. Even the page's own JavaScript can't read the private key's bytes, so it can't be copied to another phone. The key is saved only after the server accepts the enrollment, so a failed enrollment doesn't leave the phone thinking it's enrolled." },
      { t: "h", text: "Check-in" },
      { t: "sequence", title: "A daily check-in", takeaway: "The server times the pings and issues the challenge before the camera records anything, so a slow or replayed request never reaches the face check.", seq: { kind: "sequence", actors: ["Student", "Phone browser", "Laptop server", "Face engine"], steps: [
        { from: 0, to: 1, label: "roll no. → \"Verify face\"" },
        { from: 1, to: 2, label: "WebSocket: 3 warm-up + 10 timed pings" },
        { from: 2, to: 2, label: "fastest RTT ≤ 20 ms?" },
        { from: 2, to: 1, label: "nonce N, blink K times (2 or 3)", dashed: true },
        { from: 1, to: 1, label: "record ~60 frames, sign N + roll + sha256(frames)" },
        { from: 1, to: 2, label: "POST /api/checkin" },
        { from: 2, to: 2, label: "gates 1–4: nonce · latency · MAC · signature" },
        { from: 2, to: 3, label: "analyse frames" },
        { from: 3, to: 2, label: "blinks · one face · embedding", dashed: true },
        { from: 2, to: 1, label: "\"Attendance marked\" (or the reason it wasn't)", dashed: true },
      ] } },
      { t: "h", text: "The six gates" },
      { t: "p", text: "Every check-in passes through the gates in order, and any failure stops it and writes the reason to an audit log. Figure 4 lists what each gate proves and why the phone can't fake it." },
      { t: "table", head: ["Gate", "What it proves", "Why the phone can't fake it"], rows: [
        ["1. Nonce", "The request is fresh, for this roll and this phone", "The server created it and deletes it on first use (120 s)"],
        ["2. Latency", "The phone is directly on the classroom network", "The server times 10 pings and gates on the fastest; the phone never reports a number"],
        ["3. MAC", "It's the enrolled phone's network card", "The laptop reads the MAC from its own ARP table"],
        ["4. Signature", "It's the enrolled phone's secret key", "The key can't be exported, and the signature covers the exact frames"],
        ["5. Face", "A live person who matches the enrollment is holding it", "The laptop analyses the frames, not the phone"],
        ["6. Multi-profile", "One phone isn't marking several students", "The server checks its own records for 60 s"],
      ], title: "The six gates", takeaway: "Every gate relies on something the server measures or holds itself. That's the whole security argument." },
      { t: "p", text: "Two details came from a live trial. Phones in power-save mode produce 100–200 ms ping spikes, so gating on the last ping rejected honest students; gating on the fastest of ten fixed it while a relayed link (fastest 36 ms) still fails. And the signature covers a hash of the frames, so a valid signature can't be reused with a different video." },
      { t: "h", text: "Face and blink, offline" },
      { t: "flow", title: "The face engine", takeaway: "Blink counting uses two thresholds with a gap between them, so a slow blink counts once and a squint never counts.", flow: { kind: "flow", colW: 220, nodes: [
        { id: "fr", label: "~60 frames", sub: "320 px · ~12 fps · 5 s", col: 0, row: 0 },
        { id: "yu", label: "YuNet", sub: "face detector", col: 1, row: 0 },
        { id: "rej", label: "2+ faces → reject", col: 2, row: 0, dashed: true },
        { id: "mp", label: "MediaPipe", sub: "eye-blink scores", col: 0, row: 1 },
        { id: "bl", label: "count_blinks()", sub: "open ≤ .25 · shut ≥ .45", col: 0, row: 2 },
        { id: "sf", label: "SFace", sub: "128-number embedding", col: 1, row: 1 },
        { id: "dec", label: "Decision", sub: "K blinks · similarity ≥ 0.363", col: 1, row: 2, focus: true },
      ], edges: [
        { from: "fr", to: "yu" }, { from: "yu", to: "rej", label: "many" }, { from: "yu", to: "mp", label: "one face" },
        { from: "mp", to: "bl" }, { from: "yu", to: "sf" }, { from: "bl", to: "dec" }, { from: "sf", to: "dec" },
      ] } },
      { t: "p", text: "All three models run locally; `fetch_models.py` downloads them once and verifies their checksums. Face matching uses cosine similarity between SFace embeddings with OpenCV's general-purpose threshold of 0.363, and every embedding sampled from the clip must also match the clip's own average, so a video that switches people partway through fails. The blink count is random (2 or 3) and revealed only after the nonce, which makes a pre-recorded clip less likely to fit." },
      { t: "h", text: "Testing" },
      { t: "p", text: "There are 31 automated tests covering replayed signatures, expired and misdirected nonces, a key from another device, swapped frames, latency, MAC mismatch, the multi-profile window, re-enrollment rules, the popup behaviour, that the key is non-extractable, and that the dashboard refuses anyone but the laptop. They were checked with deliberate bugs to make sure they fail when they should. What they can't tell you is whether 0.363 suits cheap front cameras, or whether 60 phones at once stay under 20 ms." },
      { t: "h", text: "What's still open" },
      { t: "table", head: ["Problem", "Why it matters"], rows: [
        ["Video replay of a blinking face", "Someone with your phone and a clip of you blinking could pass; a random head-turn challenge would close it"],
        ["Face threshold not tuned", "0.363 is a general value; it needs real students, lighting and cameras"],
        ["Not yet tested on real phones at scale", "The popup, camera flow and blink detection at 12 fps are verified only by tests and a laptop run"],
        ["\"On the network\" isn't \"in the room\"", "Wi-Fi reaches corridors; the face proves who, not where"],
        ["No rate limiting; dashboard has no password", "It relies on requests coming from the laptop itself"],
        ["Biometric data handling", "Embeddings and evidence photos need a consent screen and automatic deletion"],
      ], title: "Open problems, from the project's own status list", takeaway: "The closed attacks are closed by design. The open ones are mostly about real-world calibration and data handling, which a trial and a policy fix, not more code." },
      { t: "p", text: "The README in the repository has the full threat model, the database schema and every test explained line by line." },
    ],
  },
};

export const articles: Article[] = [vedcode, nutrisafe, airgated];

export function bySlug(slug: string) {
  return articles.find((a) => a.slug === slug);
}
