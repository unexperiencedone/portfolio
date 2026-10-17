import type { Article } from "../articles";

// ──────────────────────────────────────────────────────────────────── Ved Code
//
// Sources: the repo at github.com/unexperiencedone/vedcode-ai4bharat (local copy: the-archive),
// read in full for this piece: PROGRESS.md (the 2026-08-01 feature audit and session log), the
// README, the VEDACODE_* docs, the Kiro spec in .kiro/specs, src/, docker/, scripts/ and git log.
// Where this piece reports something the audit did not (the learner-signal ID mismatch, the stress
// score that can't reach its own threshold, per-language import resolution), it comes from reading
// the code for this article and is labelled that way. Nothing here was measured on users; there are
// no users to measure yet. Images: home, explore-graph and knowledge-studio are screenshots of the
// app's demo account; blast-panel-python and sandbox-honest-error are crops of the repo's own
// public/debug_images screenshots, cut so no browser chrome or profile photo is included.

const IMG = "/writing/ved-code";

export const vedcode: Article = {
  slug: "ved-code",
  project: "Ved Code",
  projectHi: "कोड को समझना",
  published: "2026-10-17",
  status: "Work in progress",
  team: "Aakshant Kumar, with a contribution from letscodesatish",
  hero: { src: `${IMG}/explore-graph.png`, alt: "Ved Code's Project Constellation mapping the files and imports of a Python repository" },
  links: [
    { label: "Live demo", href: "https://vedcode-ai4bharat.vercel.app", kind: "live" },
    { label: "Source", href: "https://github.com/unexperiencedone/vedcode-ai4bharat", kind: "source" },
  ],
  stack: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle", "Amazon Bedrock", "DynamoDB", "Docker", "ts-morph"],

  // ─────────────────────────────────────────────────────────────────────── Story
  story: {
    title: "Ved Code: a mentor that remembers what you learned",
    dek: "Developers spend hours learning, then forget it the week they need it. Ved Code tries to attach that learning to the code you're actually reading. Here is who it's for, what it does today, and what still doesn't work.",
    blocks: [
      { t: "p", text: "Every developer knows the loop. You watch a tutorial, read the docs, build the example, and feel like you understand. A month later you open a real codebase, run into the same idea, and you're back at the tutorial. The knowledge didn't stick, because it was never attached to anything you were working on." },
      { t: "p", text: "Coding assistants don't break that loop. They answer the question in front of them and forget it the moment the tab closes. They don't know which ideas you've already struggled with, what your project looks like, or that this is the third time this week you've asked what a closure is. They make the answer cheap. They don't make it stay." },
      { t: "callout", label: "In short", labelHi: "सार", text: "Ved Code is an AI coding mentor. Point it at a GitHub repository and it maps the structure, explains each file in context, and teaches the concepts you meet, with spaced repetition so they stay learned. It's unfinished. Some of it is real and some of it is still for show, and this piece says which is which." },

      { t: "h", text: "Who has the problem" },
      { t: "p", text: "Mostly beginners and intermediate developers: students learning a stack on their own, and anyone who has just landed in a codebase they didn't write. The project began at the AI for Bharat hackathon, student track, and that origin shows in who it was built for. In India a very large number of people are learning to code right now, many of them without a senior developer nearby to ask." },
      { t: "p", text: "Think about the first week at an internship. Someone hands you a repository with two hundred files and a deadline. You don't know which file is the heart of it and which is a forgotten experiment. You don't know which file you can change safely and which one breaks five others. So you read from the top, or you guess, or you interrupt someone busy. Most of what you need isn't any single fact. It's the shape of the thing." },
      { t: "p", text: "Our own audit of the code was blunt about who benefits. For a beginner, \"help me understand a repo I've never seen\" plus a visual sense of which files are risky to touch is exactly what's missing. For an intermediate developer starting a new job, it's a faster way in. An expert who owns the repo can usually get the same answers faster from their own editor, and the audit says so." },
      { t: "image", src: `${IMG}/home.png`, alt: "Ved Code landing page with the headline Understand code. Build faster.", title: "The front door", takeaway: "The pitch is two verbs, understand and build. Everything behind the sign-in is judged against those two words." },

      { t: "h", text: "What changes for them" },
      { t: "p", text: "**You see the shape first.** Paste a GitHub link and Ved Code draws the project: every file is a box, every import is a line, and files are arranged so the ones everything else depends on sit at one end and the ones that depend on everything sit at the other. Hover a file and it tells you what that file uses and what uses it. Instead of reading top to bottom, you find the load-bearing files and start there." },
      { t: "image", src: `${IMG}/explore-graph.png`, alt: "Project Constellation showing the AirGated repository: face_verify.py has complexity 40 and is used by three other files", title: "A real repository, mapped", takeaway: "Ved Code read the AirGated repository and found that three files depend on face_verify.py. That's the file to be careful with, and you can see it before reading a line of it." },
      { t: "p", text: "**Then a file explains itself.** Click any file and an AI walks through it a few lines at a time: what each part does, why it's written that way, which programming ideas it uses, and one alternative way it could have been written. The explanation is about this file, not a generic tutorial on the language." },
      { t: "p", text: "**Documentation stops being a pile of tabs.** In the Knowledge Studio you give it the pages you're learning from. It reads them, splits them into sections, and lets you search by meaning rather than by exact words, read them like an encyclopedia, and browse the ideas as a map of what leads to what." },
      { t: "image", src: `${IMG}/knowledge-studio.png`, alt: "Knowledge Studio with tabs for ingestion, Ripple Guard, an encyclopedia reader and a galaxy map", title: "Your docs, made searchable", takeaway: "Three of these four tabs work end to end. The fourth, Ripple Guard, always reports that nothing would break, because the data it needs is never collected. The technical piece explains exactly why." },
      { t: "p", text: "**You can try code without installing anything.** A small web editor saves your files and runs programs in seven languages: Python, JavaScript, C, C++, Java, Go and Rust. Each run happens inside a sealed box that can't reach the internet or keep anything afterwards, so running a stranger's snippet can't hurt the machine it runs on." },
      { t: "p", text: "**And learning is meant to stay learned.** Each concept you meet gets a score for how well you understand it and how well you can recall it. The score fades over time the way memory does, and the concept comes back for a short question after a day, then three days, a week, two weeks, a month, three months. Get it wrong and the clock goes back to a day. That rhythm is the part meant to break the tutorial loop, and the figure below shows it." },
      { t: "flow", title: "The learning loop, as designed", takeaway: "Reading alone can only take a concept so far; the score only climbs high through answering questions. In today's code the loop is built, but a quiz answered on the Handbook page doesn't reach it yet (see below).", flow: { kind: "flow", colW: 240, nodes: [
        { id: "meet", label: "Meet a concept", sub: "in a file or a doc", col: 0, row: 0 },
        { id: "read", label: "Read it at your level", sub: "beginner · intermediate · advanced", col: 1, row: 0 },
        { id: "quiz", label: "Answer a question", sub: "recall, not rereading", col: 2, row: 0, focus: true },
        { id: "fade", label: "The score fades", sub: "forgetting curve", col: 2, row: 1 },
        { id: "back", label: "It comes back", sub: "1 · 3 · 7 · 14 · 30 · 90 days", col: 1, row: 1 },
      ], edges: [
        { from: "meet", to: "read" }, { from: "read", to: "quiz" }, { from: "quiz", to: "fade" }, { from: "fade", to: "back" }, { from: "back", to: "meet", label: "review" },
      ] } },

      { t: "h", text: "Why it matters" },
      { t: "p", text: "For one person, it's the difference between learning something five times and learning it once. For a team or a college, onboarding is expensive: senior people spend hours walking each newcomer through the same codebase. A tool that hands the newcomer the map, the walkthrough and the follow-up review takes part of that load off them." },
      { t: "p", text: "And it matters that the mentor is honest. A tool that teaches with confidence on top of wrong information is worse than no tool, because a beginner can't tell the difference. That's why the most useful work on Ved Code so far wasn't a new feature. It was checking, one feature at a time, whether what we hand the AI is actually true." },

      { t: "h", text: "Where it honestly stands" },
      { t: "p", text: "In August we traced every feature from what its screen claims to the code underneath. The AI calls were almost always real. What was often fake was the input: a file path typed in by hand instead of the one you chose, a store of data that nothing ever fills, a number written in as a placeholder. Writing this piece turned up a few more of the same kind. Here is the plain state of it." },
      { t: "table", head: ["Works today", "Still for show, or broken"], rows: [
        ["Project Constellation: a real map of files and imports from any public GitHub repo, with an AI walkthrough per file", "The dashboard's \"System Live\" numbers are seeded once and never change"],
        ["Knowledge Studio: read docs, search them by meaning, an encyclopedia reader and a concept map", "The stress heatmap and Ripple Guard: the step that would feed them is never run, so they always come back empty"],
        ["A web editor that saves files and runs 7 languages in a sealed sandbox, on a machine with Docker", "On the hosted demo, Run says plainly that it needs Docker; saving a file currently fails, and programs can't ask you for input while they run"],
        ["Spaced repetition: scores that fade, and reviews from 1 to 90 days", "A quiz answered on the Handbook page isn't recorded, so its review schedule never starts from there"],
        ["Sign-in with email and password, Google or GitHub", "Learn has thin content: only a handful of technologies are seeded, so many concepts return nothing yet"],
      ], title: "The honest split", takeaway: "The left column is the product. The right column is the to-do list, and saying it out loud is cheaper than letting a learner find it." },
      { t: "image", src: `${IMG}/sandbox-honest-error.png`, alt: "The editor's output panel saying the sandbox image isn't built yet, with the exact docker build command to run", title: "An honest failure", takeaway: "This used to print \"Process exited with code 0\" even when nothing ran. Now, without its sandbox, the editor says exactly what's missing and how to fix it. A beginner would have trusted the old message." },
      { t: "p", text: "We also cut things. There were four separate \"warn me before this change breaks something\" features, built at different times, and none of them could actually see your code. One asked an AI to imagine the answer from text you pasted in. Another did real analysis, but always on the same hard-coded file, whatever you asked about. Three are deleted. The one real engine is kept, switched off, for a proper rebuild." },

      { t: "h", text: "What comes next" },
      { t: "list", items: [
        "Switch on the one dormant step that would feed the stress map, the health check page and Ripple Guard. It silently disables all three today.",
        "Make Handbook, Learn and Roadmap one product that shares one record of what you know, and fix the quiz answers that never reach it.",
        "Fix saving in the editor, and let programs ask for input while they run.",
        "Rebuild \"what breaks if I change this\" on the real engine we kept, pointed at your own files.",
      ] },

      { t: "h", text: "Try it" },
      { t: "p", text: "The live demo has a public account, so you don't need to sign up: `demo@vedcode.dev` with the password `VedCodeDemo#2026`. Start with Explore and paste any public GitHub link; a Python or TypeScript repository shows it best. If you want the architecture, the sandbox's flags, the formulas behind the learning engine and every bug we hit along the way, the technical piece is next door." },
    ],
  },

  // ─────────────────────────────────────────────────────────────────── Technical
  technical: {
    title: "Ved Code, technically: real AI, and the plumbing in front of it",
    dek: "How the dependency map, the semantic search, the spaced-repetition engine and the sandboxed IDE are built, with the actual parameters, and the one lesson from auditing all of it: the AI is rarely fake, the input often is.",
    blocks: [
      { t: "p", text: "Ved Code is a Next.js application with a deliberately plain core and a few genuinely hard pieces attached to it: a multi-language dependency mapper built on a real TypeScript syntax tree, a document search pipeline on Amazon Bedrock and DynamoDB, a learning engine with a forgetting curve and a review schedule, and a code runner that executes programs from strangers. This piece walks through each one, the data underneath, the bugs that shaped them, and the audit that told us which parts were real." },
      { t: "callout", label: "TL;DR", labelHi: "सार", text: "The most useful finding wasn't about any one feature. Across the codebase the model calls are genuine. What broke was what we fed them: a hardcoded file path, a cache nothing writes to, a metric typed in as `100 // Dummy`, and, found while writing this, a concept's name sent where its ID was expected. If you audit an AI product, ask \"is the input true?\" before \"is the AI real?\" There are no automated tests yet; everything verified here was verified by running it." },

      // ── problem
      { t: "h", text: "The problem and the constraints" },
      { t: "p", text: "The README states the problem as a paradox: developers invest hours in tutorials and forget them, and coding assistants are \"largely stateless\", with no memory of the user's project or learning history. Ved Code's answer has two halves. One half reads a codebase and makes its structure visible. The other half tracks what the learner has met and brings it back before it's forgotten. The bet is that the two together, a map plus a memory, teach better than either alone." },
      { t: "p", text: "The constraints were the ones a student team has. It started as an entry for AI for Bharat (student track), on Vercel's serverless platform, with model access through Amazon Bedrock. Repositories come from GitHub's public API, so private code and local folders are out of scope unless a server-side `GITHUB_TOKEN` is set. And one feature, running code, means executing arbitrary programs from anyone who signs in, which turns a learning tool into a security problem." },

      // ── plan vs reality
      { t: "h", text: "What was planned, and what was built" },
      { t: "p", text: "The first commit in the repository, on 5 February 2026, is a specification generated with Kiro: requirements, a 1,041-line design document and a task list. The hackathon-era docs (`VEDACODE_TECHNICAL_DOCUMENTATION.md` and friends) describe the same vision in present tense. Comparing those documents to the code is the quickest way to understand the real architecture, because almost every gap between them was a decision, or a shortcut, made under time pressure. The table below lines them up." },
      { t: "table", head: ["The docs say", "The code does"], rows: [
        ["A radial, force-directed React Flow graph with files clustered into \"solar systems\"", "A deterministic layered layout drawn as hand-written SVG; the radial layout survives only for Document Explainer's concept map"],
        ["Embeddings stored in Postgres with `pgvector`", "Embeddings stored in DynamoDB and ranked by a linear cosine scan; the `concept_cards.embedding` vector column exists and nothing writes it"],
        ["Upstash/Redis background workers deliver a challenge exactly 24 hours later", "No worker. A review is due when `nextReviewAt` has passed, and it surfaces only when you next open that concept's page"],
        ["Row-level security isolates every user's data", "No RLS. Isolation is per route: 12 of 47 API route files check the session"],
        ["Claude 3 Sonnet and Mistral on Bedrock", "Amazon Nova Pro and Mistral Large on Bedrock, Titan for embeddings; the Claude, DeepSeek and Mistral direct clients are configured but secondary"],
        ["Coupling score = (in-degree × 1.5) + out-degree", "Not in the code. The stress engine uses 0.4 × coupling + 0.3 × density + 0.3 × change frequency, and file coupling is hardcoded to 0"],
        ["Upload a code archive", "Paste a GitHub URL; files are read through the Git Trees API"],
        ["Property-based tests for every requirement", "No test files in the repository"],
      ], title: "Spec versus source", takeaway: "None of these gaps is hidden in the code, but several were stated as fact in the docs. The audit treats the source as the truth and the docs as intentions, and so does this piece." },

      // ── history
      { t: "h", text: "How it evolved" },
      { t: "p", text: "The git history has 163 commits, but the count is misleading and worth explaining. On 6 March, a script in the repository (`commit_bot.js`) committed the hackathon build one file per commit, 87 commits titled \"feat: integrate <file> for Phase 1-8 logic\", then appended 23 lines to a dummy file to bring the total to 110, with messages like \"chore(cache): optimize intelligence metrics pass 7\". That leaves 53 hand-written commits. The real story is in four phases, summarised below." },
      { t: "table", head: ["When", "What happened"], rows: [
        ["Feb 5–11", "Kiro spec; Next.js scaffold; Google, GitHub and email sign-in; a five-step onboarding; scroll-driven landing page; workspace shell with tabs"],
        ["Mar 2–8", "Learn, Explore and Guard modes; letscodesatish's compiler pull request (#1); the hackathon build, committed by script on Mar 6; Handbook, Roadmap, Knowledge Studio and Document Explainer integrated on Mar 8"],
        ["Mar 27", "A proprietary licence: study and education only, no production or competition use without consent from all five listed owners"],
        ["Jul 31", "Explore hardened end to end against a real Next.js repo and a real Python/FastAPI repo: 18 bugs fixed in one session"],
        ["Aug 1", "A full feature audit, written into `PROGRESS.md`; then the Guard surfaces deleted, Compiler merged into the Workspace IDE, and code execution moved into Docker"],
        ["Oct 13", "The August work committed; a script that creates the public demo account"],
      ], title: "Four phases, not 163 steps", takeaway: "A hackathon sprint, a long pause, then a slower phase of making the existing features true. Most of what this piece praises comes from the last two rows." },

      // ── architecture
      { t: "h", text: "System architecture" },
      { t: "p", text: "The browser only ever talks to Next.js route handlers (the App Router's server functions, one file per URL). Those handlers fan out to four kinds of backend, each with one job: Postgres, through the Drizzle ORM, for everything relational; DynamoDB for document chunks and their vectors; Amazon Bedrock for every model call; and Docker for running code. GitHub is read through its REST API. There is no separate backend service, no queue and no worker. The figure below is the whole system." },
      { t: "flow", title: "System architecture", takeaway: "One web tier, four specialised backends. Each heavy capability has exactly one home, which is what made a feature-by-feature audit tractable.", flow: { kind: "flow", colW: 240, nodes: [
        { id: "ui", label: "Browser", sub: "React 19 · Monaco editor", col: 1, row: 0 },
        { id: "gh", label: "GitHub API", sub: "repo · tree · blobs", col: 0, row: 1 },
        { id: "api", label: "Route handlers", sub: "Next.js 16 App Router", col: 1, row: 1, focus: true },
        { id: "dk", label: "Docker", sub: "one container per run", col: 2, row: 1 },
        { id: "pg", label: "PostgreSQL", sub: "Drizzle · 33 tables", col: 0, row: 2 },
        { id: "ddb", label: "DynamoDB", sub: "one table, chunks + vectors", col: 1, row: 2 },
        { id: "br", label: "Amazon Bedrock", sub: "Nova Pro · Mistral · Titan", col: 2, row: 2 },
      ], edges: [
        { from: "ui", to: "api", label: "fetch" }, { from: "api", to: "gh" }, { from: "api", to: "dk" },
        { from: "api", to: "pg" }, { from: "api", to: "ddb" }, { from: "api", to: "br" },
      ] } },
      { t: "p", text: "Two pieces of state live outside all four stores. Explore keeps each analysed repository in memory, in two `Map`s pinned to `globalThis`, keyed by a session cookie. And the learning engine's background work runs as un-awaited promises inside the request that triggered it. Both are fine on one long-running Node process and both are fragile on serverless, which comes up again under performance." },

      // ── data model
      { t: "h", text: "The data model" },
      { t: "p", text: "Postgres holds 33 tables in `src/db/schema.ts`. They fall into a few clusters, and knowing which cluster is alive explains most of the product's behaviour. The table below groups them and says, for each, what actually reads and writes it today." },
      { t: "table", head: ["Cluster", "Tables", "State"], rows: [
        ["Identity", "`profiles`, `learner_profile`, `logs`", "Live. `profiles` stores the bcrypt hash and OAuth link; `learner_profile` holds the inferred skill level and score"],
        ["Knowledge base", "`technologies`, `concept_cards`, `concept_examples`, `concept_relationships`, `concept_quizzes`", "Live but thin: seeded by CLI scripts for a handful of technologies. Each card stores beginner, intermediate and advanced explanations"],
        ["Learning", "`skill_signals`, `user_concept_progress`, `user_roadmaps`", "Live engine, partly starved of input (see the learning engine below)"],
        ["Workspace", "`projects`, `project_files`", "Live. Files form a tree through a self-referencing `parent_id`"],
        ["Code graph", "`file_nodes`, `file_edges`, `symbol_nodes`, `symbol_edges`, `concept_usage`, `code_change_log`, `architecture_metrics`", "Dormant. Written only by an indexer nothing calls"],
        ["Mentor and chat", "`chat_sessions`, `chat_messages`, `mentor_evidence_patterns`, `mentor_insight_log`, `concept_change_log`", "Chat is live; the insight tables are fed by the same dormant pipeline"],
        ["Leftovers", "`learning_roadmaps`, `memory_log`, `snippets`, `portfolio_works`, `journals` and others", "Superseded or orphaned by features that were cut"],
      ], title: "33 tables, sorted by whether anything uses them", takeaway: "About a third of the schema is waiting for a pipeline that never runs. That one fact explains three dead features at once." },
      { t: "p", text: "Two schema details matter later. `file_nodes.path` is unique across the whole table, with no project or user column, so the code graph as designed can only describe one codebase at a time. And the project uses `drizzle-kit push` to sync the schema directly, so the five files in `drizzle/` don't reflect the live database: the audit found a foreign key declared with `onDelete: 'cascade'` that no migration ever created." },
      { t: "p", text: "DynamoDB uses a single-table design, where one table holds several item types distinguished by their keys. The keys are listed below." },
      { t: "table", head: ["Partition key (pk)", "Sort key (sk)", "Holds"], rows: [
        ["`SOURCE#<sourceId>`", "`META`", "Name, URL, status, chunk count, the extracted concept graph"],
        ["`SOURCE#<sourceId>`", "`CHUNK#000042`", "One chunk: page title, heading breadcrumb, text, a 512-number embedding, URL"],
        ["`SOURCES_INDEX`", "`SOURCE#<sourceId>`", "A lightweight index so listing sources is a Query, not a Scan"],
        ["`FILE#<path>`", "`IMPORT#<target>`", "Ripple Guard's import cache. Defined, never written"],
      ], title: "One DynamoDB table, four item shapes", takeaway: "Chunk IDs are zero-padded to six digits so they sort in order. The `SOURCES_INDEX` partition was added after the fact; `scripts/repair-sources-index.mjs` backfills it for sources ingested before it existed." },

      // ── constellation
      { t: "h", text: "Project Constellation: from a URL to a map" },
      { t: "p", text: "This is the strongest feature and also the most conventional engineering: almost all of it is parsing and graph work, and a model is called only when you open a file. The pipeline below runs inside one request to `POST /api/explore/upload`." },
      { t: "flow", title: "The Constellation pipeline", takeaway: "Only the last step calls a model. The map itself is parsing and graph layout, which is why it's the part we trust most.", flow: { kind: "flow", colW: 230, nodes: [
        { id: "url", label: "GitHub URL", sub: "owner · repo · branch", col: 0, row: 0 },
        { id: "tree", label: "Git Trees API", sub: "≤ 200 files · < 100 KB each", col: 1, row: 0 },
        { id: "ast", label: "ts-morph syntax tree", sub: "TS / JS", col: 2, row: 0 },
        { id: "rx", label: "Regex heuristics", sub: "19 language patterns", col: 2, row: 1 },
        { id: "imp", label: "Import resolution", sub: "relative · alias · dotted", col: 1, row: 1, focus: true },
        { id: "dag", label: "Layered layout", sub: "longest path, deterministic", col: 0, row: 1 },
        { id: "ai", label: "File walkthrough", sub: "Nova Pro + Zod schema", col: 0, row: 2, dashed: true },
      ], edges: [
        { from: "url", to: "tree" }, { from: "tree", to: "ast" }, { from: "ast", to: "rx", label: "the rest" },
        { from: "rx", to: "imp" }, { from: "imp", to: "dag" }, { from: "dag", to: "ai", label: "on click", dashed: true },
      ] } },
      { t: "p", text: "**Fetching.** `githubFetcher.ts` parses the URL, asks GitHub for the default branch if none is given, and fetches the whole file tree in one recursive call. It keeps files with one of 39 code extensions, skips `node_modules`, `.next`, `dist`, `build`, `.git`, `coverage` and `.turbo`, drops any file of 100 KB or more, and takes the first 200. Contents are fetched as blobs, 20 in parallel at a time. It also fetches the shallowest `tsconfig.json` or `jsconfig.json`, outside the 200-file budget, because it's needed to resolve import aliases. When a repo has more than 200 eligible files the response now says so, with the true count, instead of silently cutting it off." },
      { t: "p", text: "**Analysing TypeScript and JavaScript.** These files are loaded into a ts-morph project on an in-memory file system. ts-morph is a wrapper around the TypeScript compiler's own API, so this is a real syntax tree, not text matching. Each file gets a complexity score from counting branch points in the tree, shown below." },
      { t: "code", lang: "typescript", source: "src/lib/constellation/astParser.ts", title: "Complexity from the syntax tree", takeaway: "A rough cousin of cyclomatic complexity (the number of independent paths through code): every if, ternary, switch and catch adds a path, and functions count half. It's normalised against the most complex file in the repo to become the node's brightness.", text: `const ifCount     = sf.getDescendantsOfKind(SyntaxKind.IfStatement).length;
const ternCount   = sf.getDescendantsOfKind(SyntaxKind.ConditionalExpression).length;
const switchCount = sf.getDescendantsOfKind(SyntaxKind.SwitchStatement).length;
const catchCount  = sf.getDescendantsOfKind(SyntaxKind.CatchClause).length;
const fnCount = sf.getFunctions().length +
    sf.getDescendantsOfKind(SyntaxKind.ArrowFunction).length;

complexity: 1 + ifCount + ternCount + switchCount + catchCount + Math.ceil(fnCount * 0.5),` },
      { t: "p", text: "**Analysing everything else.** The other languages go through regular expressions, with patterns for 19 languages and a generic fallback: one set for import statements and one for branching keywords. Complexity there is 1 plus the number of lines containing any branching keyword (`if`, `elif`, `except`, `match`, `when` and so on). It's a proxy, and the code says so, but it puts Python, Go and Rust files on the same scale as TypeScript ones." },
      { t: "p", text: "**Resolving imports.** This is where most of the bugs lived, because an import string is not a file path. `./utils` is relative to the importing file. `@/lib/db` is an alias defined in `tsconfig.json`. `app.core.config` in Python is relative to wherever the package root happens to sit, which is often not the repository root. The resolver tries each interpretation in turn: relative paths are joined to the importer's directory, aliases are expanded from the config's `paths` (after a best-effort strip of the comments and trailing commas that `tsconfig.json` allows), and dotted or `::` names are turned into slashes. Then every candidate is tried with a list of extensions, exactly first and by path suffix second." },
      { t: "code", lang: "typescript", source: "src/lib/constellation/astParser.ts", title: "Matching an import to a file", takeaway: "The suffix pass is what lets Python's `app.core.config` find `backend/app/core/config.py`. It's a heuristic: two files with the same trailing path under different roots could produce a false edge, which the session log records as a known risk.", text: `const candidates = [
    imp,
    imp + '.ts', imp + '.tsx', imp + '.js', imp + '.jsx',
    imp + '.py', imp + '.go', imp + '.rs', imp + '.rb',
    imp.replace(/\\.ts$/, '.tsx'), imp.replace(/\\.tsx$/, '.ts'),
    imp + '/index.ts', imp + '/index.js', imp + '/__init__.py',
];

function findNodeMatch(candidates: string[]): string | undefined {
    for (const c of candidates) if (nodeMap.has(c)) return c;
    for (const c of candidates) {
        const suffix = '/' + c;
        for (const key of nodeMap.keys()) if (key.endsWith(suffix)) return key;
    }
    return undefined;
}` },
      { t: "p", text: "That candidate list is also the honest limit of the feature. The public description says \"import resolution across 20+ languages\"; reading the code for this piece, the more accurate statement is that Ved Code **reads** 20-plus languages and **resolves edges** reliably for a few of them. The table below is from reading the resolver, not from new live tests; the TypeScript and Python rows are the two that were tested against real repositories in July." },
      { t: "table", head: ["Language", "Edges resolve?", "Why"], rows: [
        ["TypeScript / JavaScript", "Yes, tested", "Relative imports and `tsconfig` path aliases, on a real syntax tree"],
        ["Python", "Yes, tested", "Dotted imports become paths, `.py` and `__init__.py` are candidates, suffix match finds the package root"],
        ["Ruby", "Mostly", "`require_relative` paths are relative and `.rb` is a candidate"],
        ["Java, Kotlin, C#, Scala", "No", "Dotted names convert to paths, but `.java`, `.kt`, `.cs` and `.scala` aren't in the candidate list, so nothing ever matches"],
        ["Go", "Rarely", "The regex reads single-line `import \"x\"` only, not the usual grouped `import ( ... )` block, and Go imports name a package directory, not a file"],
        ["Rust", "Rarely", "`crate::a::b` becomes `crate/a/b`, which no file path contains; the session log already lists this as unhandled"],
        ["C / C++", "No", "`#include \"util.h\"` contains a dot, so it is rewritten as `util/h`"],
      ], title: "What \"20+ languages\" means today", takeaway: "Every file still appears on the map with its size and complexity. What's missing for the bottom rows is the lines between them, and three of the fixes are one line each." },
      { t: "p", text: "**Laying it out.** The current renderer, `ConstellationGraph.tsx`, replaced a radial \"solar system\" view in July. It uses longest-path layering: a file that imports nothing local is in layer 0, and every other file sits one layer past its deepest dependency. Columns are drawn in reverse so dependencies are on the right and their consumers on the left. Tall layers wrap into sub-columns, with the number of rows per column derived from the viewport height and clamped between 3 and 10. The core is a few lines." },
      { t: "code", lang: "typescript", source: "src/lib/graph-layout.ts", title: "Longest-path layering, cycle-safe", takeaway: "Memoised by the `layer` map, and a cycle is cut by treating the repeat visit as a leaf. The same repository always draws the same way, which a physics simulation can't promise and a learner needs.", text: `function resolve(id: string, seen = new Set<string>()): number {
  if (layer.has(id)) return layer.get(id)!;
  if (seen.has(id)) return 0; // cycle → treat as leaf
  seen.add(id);
  const deps = importsOf.get(id) ?? [];
  const l =
    deps.length === 0
      ? 0
      : 1 + Math.max(...deps.map((d) => resolve(d, new Set(seen))));
  layer.set(id, l);
  return l;
}` },
      { t: "p", text: "The graph is plain SVG with a shared zoom-and-pan hook rather than React Flow, though the server still shapes its output as React Flow nodes for the older view. Hovering a node opens the \"blast radius\" panel (what this file imports, and what imports it) and highlights both sets of edges; the panel waits 150 ms before hiding so the pointer can travel to it. Clicking opens the file." },
      { t: "p", text: "**Explaining a file.** `POST /api/explore/explain` sends the file to Amazon Nova Pro through the Vercel AI SDK's `generateObject`, which validates the model's reply against a Zod schema (a TypeScript schema library) and retries or fails rather than returning malformed JSON. The file is capped at 8,000 characters. The prompt asks for near line-by-line blocks of 3 to 10 lines, at temperature 0.5, and each block must come back with exactly this shape: `lines` as a start and end pair, a `title` of at most five words, a 2 to 4 sentence `explanation`, one to four `concepts`, and one `creativity` note on a trade-off or alternative. The sequence below shows both requests, the analysis and the explanation, end to end." },
      { t: "sequence", title: "Analyse a repo, then open a file", takeaway: "The session ID is minted fresh for every analysis. The explain call re-sends the file's content from the browser, so the model sees exactly what the user sees.", seq: { kind: "sequence", actors: ["Browser", "Route handlers", "GitHub", "Bedrock"], steps: [
        { from: 0, to: 1, label: "POST /api/explore/upload" },
        { from: 1, to: 2, label: "repo → default branch" },
        { from: 1, to: 2, label: "tree?recursive=1" },
        { from: 1, to: 2, label: "blobs, 20 at a time" },
        { from: 1, to: 1, label: "parse · resolve · lay out" },
        { from: 1, to: 1, label: "cache under a new UUID" },
        { from: 1, to: 0, label: "nodes · edges · stats + cookie", dashed: true },
        { from: 0, to: 1, label: "GET /api/explore/file" },
        { from: 0, to: 1, label: "POST /api/explore/explain" },
        { from: 1, to: 3, label: "Nova Pro, ≤ 8,000 chars" },
        { from: 3, to: 1, label: "blocks matching the schema", dashed: true },
        { from: 1, to: 0, label: "the walkthrough", dashed: true },
      ] } },

      { t: "h", text: "What live testing broke in Explore" },
      { t: "p", text: "On 31 July the pipeline was run against two real third-party repositories, one Next.js/TypeScript and one Python/FastAPI, and fixed as it broke. Eighteen bugs came out of that one session. None of them was visible to the type checker. A selection is below, because they're a good catalogue of how a graph tool lies without anyone meaning it to." },
      { t: "table", head: ["Symptom", "Root cause", "Fix"], rows: [
        ["Graph of a TS repo looked arbitrary", "Only `./relative` imports resolved; `@/lib/foo` aliases were dropped, so most real edges never existed", "Fetch `tsconfig.json`, expand `compilerOptions.paths`"],
        ["Every file in a Python repo was an island", "Imports not starting with `.` or `/` were filtered out, and Python's are absolute and dotted", "Keep all imports, convert dots to slashes, add suffix matching"],
        ["Panel showed \"8 imports\" next to \"0 imports\"", "One number counted raw import statements, the other resolved local edges, under the same label", "Show one number, the resolved one, everywhere"],
        ["Open a file: 404, though it was fetched", "Node IDs came from ts-morph's normalised path, cache keys from the original; paths with spaces disagreed", "Use the fetched path as the only identity"],
        ["A second tab broke the first", "The session cookie was reused, so two analyses shared one cache slot", "Mint `crypto.randomUUID()` per analysis"],
        ["\"No project loaded\" right after success", "Dev-mode Fast Refresh re-ran the module and recreated its `Map`s empty", "Pin both caches to `globalThis`"],
        ["Crash on a fast drag: `reading 'ox'` of null", "A React state updater read a ref later than the guard that checked it", "Copy the ref into a local before the closure"],
        ["Legend floated over the file sheet", "The graph's internal z-indexes competed in the page's global stacking order", "`isolation: isolate` on the graph root"],
        ["Memory grew with every \"New Repo\"", "Clearing the UI never told the server to drop the session", "`DELETE /api/explore/upload` on clear"],
      ], title: "Nine of the eighteen", takeaway: "The first two bugs made the map look plausible and be wrong. That's the worst kind of bug for a teaching tool, because a beginner has no way to notice it." },
      { t: "image", src: `${IMG}/blast-panel-python.png`, alt: "Debug screenshot of the blast-radius panel for market_prices.py: complexity 26, imports 8, inbound 0, and below it 0 imports, no dependencies", title: "The contradiction, caught on screen", takeaway: "A screenshot from that July session, on a real Python repo: \"8\" and \"0 imports\" side by side, before the dotted-import and single-number fixes. \"Safe to change alone\" was a claim the tool couldn't support." },

      // ── knowledge studio
      { t: "h", text: "Knowledge Studio: semantic search on Bedrock" },
      { t: "p", text: "Semantic search means finding text by meaning rather than by matching words. Each piece of text is turned into an embedding, a list of numbers positioned so that passages about similar things land close together, and a query is answered by finding the passages nearest to the query's own embedding. The Knowledge Studio builds this from documentation URLs, in the stages shown below." },
      { t: "sequence", title: "Ingesting one documentation page", takeaway: "The request answers in step 2, before any work is done; the rest runs as a promise nobody awaits, and the browser polls. That's fine on a long-lived server and a gamble on serverless, where the function can be frozen once the response is sent.", seq: { kind: "sequence", actors: ["Browser", "Ingest route", "Docs site", "Bedrock", "DynamoDB"], steps: [
        { from: 0, to: 1, label: "POST { url, name }" },
        { from: 1, to: 0, label: "sourceId · \"started\"", dashed: true },
        { from: 1, to: 4, label: "META + SOURCES_INDEX" },
        { from: 1, to: 2, label: "fetch HTML" },
        { from: 1, to: 1, label: "split at h1–h3, chunk" },
        { from: 1, to: 3, label: "Titan v2, 512 dims" },
        { from: 1, to: 4, label: "one CHUNK# per chunk" },
        { from: 1, to: 3, label: "Nova Pro: concept graph" },
        { from: 1, to: 4, label: "status done + graph" },
        { from: 0, to: 1, label: "GET ?sourceId= (poll)" },
      ] } },
      { t: "p", text: "**Crawling and chunking.** The page is fetched with a `VedCode-Bot/1.0` user agent. Scripts, styles, `nav`, `header`, `footer` and `aside` are stripped with regular expressions, the `main` or `article` element is kept if there is one, and the text is cut at every `h1`, `h2` and `h3`, so each chunk carries a breadcrumb like \"Routing > Dynamic routes\". Sections under 50 characters are skipped. Sections over 2,000 characters (roughly 500 tokens) are split at sentence boundaries, and each piece is prefixed with the last 200 characters of the previous one so an idea cut in half still appears whole somewhere." },
      { t: "p", text: "**Embedding and storing.** Each chunk is embedded with Amazon Titan Text Embeddings v2 at 512 dimensions, normalised to unit length, after truncating to 8,000 characters. The code comment calls 512 \"the sweet spot\" between accuracy and DynamoDB item size; Titan also offers 256 and 1,024. Calls go three at a time with a 200 ms pause between batches to stay under Bedrock's rate limits." },
      { t: "p", text: "**Searching.** A query is embedded the same way and compared with every chunk of the chosen source by cosine similarity, the angle between two vectors, which for unit-length vectors is just their dot product. The top 5 come back with scores rounded to three decimals." },
      { t: "code", lang: "typescript", source: "src/lib/vedcode/dynamodb.ts", title: "The whole vector index", takeaway: "A brute-force scan: exact, simple, and linear in the number of chunks. An approximate nearest-neighbour index is the standard upgrade once a source grows past what one request can scan.", text: `export async function vectorSearch(
    queryEmbedding: number[],
    sourceId: string,
    topK: number = 5
): Promise<Array<DocChunk & { score: number }>> {
    const chunks = await queryChunks(sourceId);

    return chunks
        .map(chunk => ({ ...chunk, score: cosineSimilarity(queryEmbedding, chunk.embedding) }))
        .sort((a, b) => b.score - a.score)
        .slice(0, topK);
}` },
      { t: "p", text: "There's a quieter limit inside `queryChunks`: it issues one DynamoDB Query and never follows `LastEvaluatedKey`, and a Query returns at most 1 MB per page. With 512 numbers per chunk plus up to 2,000 characters of text, a large source will have chunks that are stored but never searched. This is from reading the code; no source big enough to hit it has been measured." },
      { t: "p", text: "**The concept galaxy.** After the chunks are stored, Nova Pro reads the first 15 chunks (300 characters of each) at temperature 0.1 and returns 8 to 15 concepts, each with a prerequisite, what it unlocks and what it's related to. The galaxy route turns those into typed edges, keeping only edges whose both ends are in the set and de-duplicating \"related\" pairs by sorting their names. The view draws them with a hand-written force-directed layout of about 700 lines. Because only the first 15 chunks are read, the galaxy describes the top of a page, not all of it." },
      { t: "p", text: "Two things say this pipeline ran against real AWS rather than only being written: `scripts/repair-sources-index.mjs`, which backfills the index partition for sources ingested before it existed, and `scripts/fixAndRetryIngest.mjs`, which re-runs a manifest of Next.js, Drizzle and PostgreSQL documentation pages that had failed. Page summaries for the encyclopedia reader are generated afterwards, also in the background." },

      // ── learning engine
      { t: "h", text: "The learning engine" },
      { t: "p", text: "This is the most sophisticated logic in the repository, and it lives mostly in one file, `src/lib/learner/inference.ts`. It has three jobs: infer a learner's overall level, track how well they know each concept, and schedule when each concept should come back." },
      { t: "p", text: "**Signals.** Every interaction worth learning from is posted to `/api/learner/signal` as one of seven typed events: `concept_viewed`, `quiz_answered`, `jit_explainer_used`, `example_opened`, `advanced_tab_opened`, `keyword_search` and `roadmap_step_complete`. Each has a weight, listed below." },
      { t: "table", head: ["Signal", "Weight", "Feeds"], rows: [
        ["Quiz correct: beginner / intermediate / advanced", "+0.03 / +0.05 / +0.07", "Recall"],
        ["Quiz failed", "−0.02", "Recall, and the next review resets to 1 day"],
        ["Concept viewed", "+0.01", "Understanding (passive)"],
        ["Explainer used", "+0.02", "Understanding (passive)"],
        ["Example opened", "+0.03", "Understanding (active)"],
        ["Advanced tab opened", "+0.04", "Understanding"],
        ["Roadmap step complete", "+0.05", "Overall skill score only"],
      ], title: "What each signal is worth", takeaway: "Active retrieval is worth up to seven times a passive view. The weights encode the testing effect, the well-replicated finding that recalling something strengthens memory more than rereading it." },
      { t: "p", text: "**Overall level.** After each signal, the last 100 signals are summed by weight, with older ones discounted: full weight within 7 days, 0.8 up to 30 days, 0.6 up to 90, and 0.2 beyond. The sum is added to the stored skill score, clamped to between 0 and 1, and the level follows from fixed thresholds: below 0.35 is beginner, 0.35 to 0.70 intermediate, 0.70 and above advanced. The level then decides which of each concept card's three stored explanations Learn shows: beginner, intermediate or advanced." },
      { t: "p", text: "**Per-concept mastery and the forgetting curve.** Each concept a learner meets has two scores, understanding and recall, each between 0 and 1. Before any new signal is applied, understanding is decayed by an Ebbinghaus forgetting curve, R = e^(−t/S): retention R falls exponentially with t, the days since the last review, and S is the memory's strength, which grows with repetitions and with how well it was understood. The excerpt below is the whole of it, including the review schedule." },
      { t: "code", lang: "typescript", source: "src/lib/learner/inference.ts", title: "Decay, then schedule", takeaway: "S grows by 1.5 per repetition and doubles with full understanding: a concept seen once at understanding 0.1 falls to 80% retention in about 3 hours, one reviewed four times and fully understood takes about 2.7 days. Any negative delta sends the next review back to tomorrow.", text: `const baseStrength = Math.max(1, repetitions * 1.5) * Math.max(0.5, understandingScore * 2);
const retention = Math.exp(-timeElapsedDays / baseStrength);

function getNextReviewIntervalDays(repetitions: number, scoreDelta: number): number {
  if (scoreDelta < 0) return 1; // If they failed/decayed, review tomorrow
  switch (repetitions) {
    case 0: return 1; // +24h exactly for first active recall
    case 1: return 3;
    case 2: return 7;
    case 3: return 14;
    case 4: return 30;
    default: return 90;
  }
}` },
      { t: "p", text: "Only understanding decays; the recall score, once earned, is never decayed, which is a gap between the code and its own comments. Three rules sit on top. Passive sources (viewing, using the explainer) can't push understanding past 0.6, so reading alone never makes a concept \"mastered\". Recall only grows through quizzes, and only quizzes increment the repetition count that drives the schedule. And mastery is weighted towards recall: mastery = 0.45 × understanding + 0.55 × recall, labelled learning below 0.4, familiar above it and mastered above 0.8. Gap detection walks the `depends_on` edges of the prerequisite graph and reports any prerequisite whose understanding is below 0.4 or that the learner has never met." },
      { t: "p", text: "Quizzes themselves are model-generated: one four-option question per concept from Mistral Large, cached in `concept_quizzes` under a `tech::concept` key so \"python::variables\" and \"javascript::variables\" stay different, and free-text answers are graded by Mistral Large against a rubric, told to be lenient on phrasing and strict on the concept." },
      { t: "h", text: "The learning engine's input problem" },
      { t: "p", text: "The engine is sound. Reading the code for this piece, its inputs mostly aren't, and the pattern is exactly the one the audit named. The figure below follows a quiz answer from the Handbook page into the engine." },
      { t: "flow", title: "Where a quiz answer goes", takeaway: "Everything right of the first arrow works. The first arrow carries a concept's name into a field validated as a UUID, so the request is rejected before it's stored, and the review schedule is never started from this page.", flow: { kind: "flow", colW: 260, nodes: [
        { id: "card", label: "ExplanationCard", sub: "Handbook · Learn", col: 0, row: 0 },
        { id: "sig", label: "/api/learner/signal", sub: "Zod: conceptId is a UUID", col: 1, row: 0, focus: true },
        { id: "ss", label: "skill_signals", sub: "Postgres", col: 2, row: 0 },
        { id: "lp", label: "learner_profile", sub: "skill score · level", col: 0, row: 1 },
        { id: "inf", label: "inferSkillLevel()", sub: "last 100 signals", col: 1, row: 1 },
        { id: "upd", label: "Concept mastery", sub: "updateConceptMastery()", col: 2, row: 1 },
        { id: "rp", label: "RecallPrompter", sub: "shown if due, on page view", col: 1, row: 2, dashed: true },
        { id: "ucp", label: "user_concept_progress", sub: "nextReviewAt", col: 2, row: 2 },
      ], edges: [
        { from: "card", to: "sig", label: "the name" }, { from: "sig", to: "ss" }, { from: "sig", to: "inf" },
        { from: "inf", to: "lp" }, { from: "inf", to: "upd" }, { from: "upd", to: "ucp" }, { from: "ucp", to: "rp" },
      ] } },
      { t: "code", lang: "tsx", source: "src/components/learning/ExplanationCard.tsx", title: "The one field that's wrong", takeaway: "`keyword` is `concept.name` on the Handbook page and the search term on Learn. The route's schema is `conceptId: z.string().uuid().optional()`, so the whole signal fails validation with a 400.", text: `await fetch("/api/learner/signal", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    profileId: session.user.id,
    conceptId: keyword,
    signalType: "quiz_answered",
    payload: { correct, difficulty: "beginner" },
  }),
});` },
      { t: "list", items: [
        "**The view signal carries no concept.** \"Log to memory\" posts `concept_viewed` without a `conceptId`, so it nudges the overall skill score but never creates or updates a concept's mastery.",
        "**The Handbook looks up the wrong column.** The concept page finds the learner with `profiles.authId = session.user.id`, but the session's `id` is the profile's own UUID, set in the JWT callback, and `authId` holds the OAuth provider's account ID. The two never match, so the page always shows \"unexplored\".",
        "**Placeholders that read as data.** When Learn finds a card it returns `groundingScore: 100` and `isProjectSynced: true` as constants, and Roadmap completion adds 0.15 to a separate mastery score and 10 to \"keywords learned\", commented `// approximate`.",
        "**Reviews are pull, not push.** There is no scheduler. A due review appears only if the learner happens to open that concept's page, as a prompt when recall is below 0.45 or `nextReviewAt` has passed.",
        "**Three surfaces, three records.** Handbook, Learn and Roadmap don't link to each other, and Roadmap writes a different score from the other two, so the same concept can have different mastery depending on where it was studied.",
      ] },
      { t: "p", text: "Content is the other half of the gap. Five technologies are seeded, with 5 to 18 concepts each, by CLI scripts with no UI. One seed script writes the literal string \"Bootstrap\" as an explanation, and another writes to `concept_quizzes` columns that no longer exist." },

      // ── IDE
      { t: "h", text: "The web IDE: executing untrusted code" },
      { t: "p", text: "Until August there were two half-built editors. The Compiler page had a real Monaco editor (the editor component from VS Code) and real execution for seven languages, implemented as `child_process.spawn()` of the host machine's own `python`, `node`, `gcc`, `javac`, `go` and `rustc`, with a 5-second timeout and no authentication. That's an open remote-code-execution endpoint: anyone who found the URL could run any program on the server. The Workspace page had solid, user-scoped persistence, recognised only two languages when running, and printed \"Process exited with code 0\" when a run had failed before starting." },
      { t: "p", text: "They were merged into one IDE at `/workspace`, keeping the Workspace's persistence and the Compiler's editor theme and Ctrl/Cmd+Enter binding. (That binding needed care: Monaco's `onMount` fires once, so binding it straight to the run handler would have kept running whichever file was open at mount time; it calls through a ref that's updated on every render instead.) Execution was rebuilt so every run is a disposable Docker container. The sequence below is one run." },
      { t: "sequence", title: "One run, end to end", takeaway: "The session check comes before anything touches Docker, and the container is thrown away after every run, so a hostile program gets one short-lived, offline, read-only box.", seq: { kind: "sequence", actors: ["Browser", "/api/execute", "Docker", "Container"], steps: [
        { from: 0, to: 1, label: "POST language, code, stdin" },
        { from: 1, to: 1, label: "session? else 401" },
        { from: 1, to: 2, label: "image inspect (once), else 503" },
        { from: 1, to: 1, label: "write main.<ext> to a temp dir" },
        { from: 1, to: 2, label: "docker run --rm (flags below)" },
        { from: 2, to: 3, label: "source mounted read-only" },
        { from: 3, to: 3, label: "compile + run, timeout 8s" },
        { from: 3, to: 1, label: "stdout · stderr · exit code", dashed: true },
        { from: 1, to: 0, label: "the real exit code", dashed: true },
      ] } },
      { t: "code", lang: "typescript", source: "src/app/api/execute/route.ts", title: "The container, as invoked", takeaway: "Every flag answers a specific attack. A host-side timer at 13 seconds kills the client and issues a separate `docker kill`, because killing the CLI alone doesn't guarantee the daemon stops the container.", text: `const args = [
  "run", "--rm", "-i",
  "--name", containerName,
  "--network", "none",
  "--memory", "128m",
  "--memory-swap", "128m",
  "--cpus", "0.5",
  "--pids-limit", "128",
  "--cap-drop", "ALL",
  "--security-opt", "no-new-privileges",
  "--read-only",
  "--tmpfs", "/tmp:rw,exec,size=64m,mode=1777",
  "-v", hostDir + ":/sandbox:ro",
  "-w", "/sandbox",
  SANDBOX_IMAGE,
  "sh", "-c", containerCmd,
];` },
      { t: "table", head: ["Flag", "What it stops"], rows: [
        ["`--network none`", "Reaching the internet, the host or other services"],
        ["`--read-only` + 64 MB `/tmp` tmpfs", "Persisting anything; compiled output gets one small writable place that vanishes with the container"],
        ["`--memory 128m --memory-swap 128m --cpus 0.5`", "One run starving the server; equal memory and swap means no swap at all"],
        ["`--pids-limit 128`", "Fork bombs; raised from 64 because Go's toolchain needs the threads"],
        ["`--cap-drop ALL`, `no-new-privileges`, uid 10001", "Kernel capabilities and privilege escalation inside the box"],
        ["Source mounted `:ro`", "A program rewriting itself or the request's directory"],
      ], title: "The sandbox, flag by flag", takeaway: "The image is Debian bookworm-slim with python3, nodejs, build-essential, a headless JDK, golang-go and rustc, about 578 MB, run as a non-root user with no login shell." },
      { t: "p", text: "Security flags are easy to get right by thinking. Runtime compatibility isn't. The first version was written while Docker wasn't running on the development machine, and the session log says so rather than claiming it worked. The same evening the image was built and all seven languages were run through the exact `docker run` the route constructs. Three bugs appeared that no type checker could have seen, listed below." },
      { t: "table", head: ["Symptom", "Cause", "Fix"], rows: [
        ["C, C++ and Rust compiled, then `Permission denied`", "Docker's tmpfs mounts default to `noexec`, so binaries in `/tmp` can't run", "Add `exec` to the tmpfs options"],
        ["`go run`: failed to initialize build cache, read-only file system", "Go caches under `$HOME/.cache/go-build`, outside the one writable path", "`GOCACHE=/tmp/go-cache`"],
        ["`go run`: failed to create new OS thread, errno 11", "Go's compile and link steps spawn more threads than 64 pids allow", "`GOMAXPROCS=1` and a limit of 128"],
      ], title: "Three bugs only a real run could find", takeaway: "Each was a one-line fix once visible. The lesson the log records: budget a live run for every language added, not a code read." },
      { t: "p", text: "After the fixes, the log records clean runs in all seven languages; a deliberate C syntax error surfacing as real `gcc` output with a non-zero exit; an infinite loop stopped by the timeout with exit 124 after about 9 seconds of wall clock, container start-up included; a `urllib` request inside the container failing on DNS, confirming the network is gone; and writes to the root filesystem and the source mount both rejected, running as uid 10001. What wasn't tested is the HTTP route itself from a signed-in browser; the checks replicated the route's `docker run` directly." },
      { t: "p", text: "Two smaller fixes rode along. The output console had been built with `innerHTML +=` on raw program output, so a program that printed markup would have had it parsed by the page, a stored cross-site scripting hole; it now renders React state as text, which escapes it. And deleting a folder now walks its whole subtree in the application, because the database-level cascade the schema declares was never actually created." },
      { t: "callout", label: "Trade-off", labelHi: "समझौता", text: "Vercel has no Docker, so on the hosted demo Run returns a clear 503 instead of executing. The alternative was executing untrusted code without isolation, which is not an alternative. Running hosted needs a separate sandbox host." },
      { t: "p", text: "Still open: saving a file fails with an unexpected error, reported in real use and not yet diagnosed. And a program that calls `input()` hangs until the timeout, because `stdin.end()` is only called when the stdin box has text, so the container waits forever for input that isn't coming; the fix is to always close it. Typing into a program while it runs is a different matter: it needs a streaming connection to the container instead of one request and one response." },

      // ── dormant pipeline
      { t: "h", text: "The pipeline that would feed three features" },
      { t: "p", text: "The repository contains a second, more ambitious code-analysis system in `src/lib/codebase` and `src/lib/code-intelligence`: an indexer that would record every file and symbol, how they reference each other, which concepts each uses and how often each changes, and a stress engine that would combine those into one fragility score per file. Explore's red-and-amber overlay, Checkup's architectural heatmap and the deleted pre-flight warning all read its output. Its entry point, `CodeGraphBuilder.indexCodebase()`, has no callers. The figure below shows what that silences." },
      { t: "flow", title: "Where the dead features actually break", takeaway: "Two functions with no callers silence three features. The code downstream is fine; it reports honestly on empty tables.", flow: { kind: "flow", colW: 240, nodes: [
        { id: "disk", label: "Local disk", sub: "not a GitHub repo", col: 0, row: 0 },
        { id: "idx", label: "indexCodebase()", sub: "zero callers", col: 1, row: 0, focus: true, dashed: true },
        { id: "wic", label: "writeImportCache()", sub: "zero callers", col: 2, row: 0, dashed: true },
        { id: "tbl", label: "file_nodes · metrics", sub: "never populated", col: 1, row: 1 },
        { id: "imp", label: "IMPORT# items", sub: "never written", col: 2, row: 1 },
        { id: "s1", label: "Explore stress overlay", col: 0, row: 2, dashed: true },
        { id: "s2", label: "Checkup heatmap", col: 1, row: 2, dashed: true },
        { id: "s3", label: "Ripple Guard", sub: "always \"no ripple\"", col: 2, row: 2, dashed: true },
      ], edges: [
        { from: "disk", to: "idx", label: "reads" }, { from: "idx", to: "tbl", dashed: true }, { from: "wic", to: "imp", dashed: true },
        { from: "tbl", to: "s1" }, { from: "tbl", to: "s2" }, { from: "imp", to: "s3" },
      ] } },
      { t: "p", text: "The audit's proposed fix is to run the indexer when Explore analyses a repository. Reading the indexer for this piece shows why that's a rebuild rather than a wire-up. It walks a directory on the server's own disk (`fs.readdirSync` from a root path), not the in-memory files Explore fetched from GitHub. It writes to `file_nodes`, whose `path` is unique across all users. And Explore merges its metrics by loading every row of both tables and matching on path suffix, which would mix one user's repository with another's." },
      { t: "code", lang: "typescript", source: "src/lib/code-intelligence/stressEngine.ts", title: "A threshold files can't reach", takeaway: "For files, coupling is always 0, so the most stressed file possible scores 0.3 + 0.3 = 0.6. Explore marks a red alert above 0.7. Even fully wired, the red state could never fire for a file.", text: `// Normalized Weights: Coupling (40%), Density (30%), Frequency (30%)
const stressScore = (coupling * 0.4) + (density * 0.3) + (frequency * 0.3);

private async calculateCoupling(nodeId: string, nodeType: "file" | "symbol"): Promise<number> {
  if (nodeType === "symbol") {
    // ... dependents / 10, capped at 1.0
  }
  return 0; // File level coupling could be imports count, simplified here
}` },
      { t: "p", text: "Ripple Guard, the fourth tab of the Knowledge Studio, has the same shape of problem in miniature. Its AST work is real: it extracts a file's exported symbols with ts-morph, classifies every file into a layer (database model, Drizzle action, server action, API, hook, component), and rates severity by how many layers separate a change from the file that imports it, three or more being \"breaking\". But it learns who imports a file from `IMPORT#` items that `writeImportCache` would write and nothing calls. Its header comment promises \"a single indexed Query, not a full table scan\"; the function underneath uses a Scan. And even when an importer is found, its content was never stored, so the symbol check falls back to nothing." },

      // ── audit
      { t: "h", text: "The audit: how \"real\" was decided" },
      { t: "p", text: "In August every route, page and component was traced against all 160 commits that existed then, and each feature was judged with the same five tests, quoted here because they're reusable for any AI product." },
      { t: "list", items: [
        "**Trace the claim to its mechanism.** Read what the screen asserts, then the code path underneath: is there a real algorithm, model call or query, or a hardcoded value, a `// Dummy`, an empty catch, a button with no handler?",
        "**Check the infrastructure gap.** If the claim needs something the repo doesn't have (a sandbox for \"isolated environments\", a populated cache for \"ripple detection\"), the code describes the destination without the road. That's different from incomplete.",
        "**Find the actual data source.** The AI is rarely fake. The input to it often is.",
        "**Redundancy means same job, different code**, for the same user. Deliberate reuse, like Document Explainer calling Explore's layout, is good engineering.",
        "**Rate practicality per skill band**, not with one blended score: who does the working version actually serve?",
      ] },
      { t: "p", text: "The clearest result was the change-impact cluster, four separate implementations of \"warn me before this change breaks something\", none sharing code with each other or with Explore's graph. The table below is the whole of it." },
      { t: "table", head: ["Implementation", "What it really did", "Outcome"], rows: [
        ["`/guard` → `/api/guard`", "Sent a pasted diff to Mistral Large and asked it to invent a ripple report; the UI claimed \"AST dependency tracing\" with no codebase access", "Deleted"],
        ["`/api/preflightCheck` (Impact Guard tab)", "A real ts-morph `CodebaseAnalyzer` using `findReferences()`, pointed at a hardcoded `src/app/page.tsx` whatever the user pasted", "Route deleted, engine kept and parked"],
        ["`PreFlightGateway` in Explore", "Read the never-populated stress tables; its own comment called it a demo shortcut", "Deleted"],
        ["`lib/agents/guard.ts`", "A fourth version on OpenAI `gpt-4o`, with zero callers", "Deleted"],
      ], title: "Four guards, one real engine", takeaway: "The one implementation that used the compiler's own reference-finding was the one aimed at the wrong file. Real analysis, wrong target, every time." },
      { t: "p", text: "The same pass found the smaller fakes the story mentions: Document Explainer's concept map with `lineCount: 100, // Dummy` under a comment reading \"Calculate mock stats that look good visually\", a \"Llama 3.3\" badge for a model that's defined and never called, three non-converging \"explain one keyword\" implementations of which one is reachable, and a dashboard whose \"System Live\" numbers are written once by the seed script and can't change, under a pulsing badge." },

      // ── security
      { t: "h", text: "Security and privacy" },
      { t: "p", text: "Authentication is the most trustworthy piece of the codebase. NextAuth v5 handles Google, GitHub and email/password sign-in; passwords are hashed with bcrypt at cost 12; sessions are JWTs in HTTP-only cookies; and an OAuth sign-in upserts the profile by email. The gaps are a dead \"Forgot password?\" link and a terms checkbox that isn't bound to anything." },
      { t: "p", text: "Authorisation is where the work is. Page routes are protected by middleware, but API routes each check the session for themselves, and not all of them do yet; some also trust an ID from the request body rather than the signed-in user. Code execution was the first to be closed: it now requires a session and gets a fresh container per run. Closing the rest is the top open item." },
      { t: "callout", label: "The fix", labelHi: "सुधार", text: "One shared session check in front of every API route except sign-in, and the user always taken from the session, never from the body. It is a single, well-understood change, and it comes before any new feature." },
      { t: "p", text: "On privacy, the code that is analysed comes from public GitHub repositories and is held in server memory for the session, with a 24-hour cookie. When a file is explained, up to 8,000 characters of it go to Amazon Bedrock. Nothing claims row-level security any more in the code itself, though the hackathon docs still do. Secrets live in `.env`, which `.gitignore` excludes; the variable names are AWS credentials and region, `DATABASE_URL`, `DYNAMODB_TABLE_NAME`, `GITHUB_TOKEN`, Bedrock model IDs, and optional direct keys for Claude, Mistral and DeepSeek." },

      // ── performance
      { t: "h", text: "Performance and cost" },
      { t: "p", text: "No load test or latency measurement exists in the repository, so this section is about design limits, not numbers. Each limit below is deliberate, accidental, or both." },
      { t: "table", head: ["Limit", "Where", "Consequence"], rows: [
        ["200 files, < 100 KB each, 20 blobs in parallel", "Explore fetch", "One request per file plus the repo, tree and config: about 203 for a full-size repo. GitHub allows 60 unauthenticated requests an hour, so the hosted app depends on `GITHUB_TOKEN` being set"],
        ["8,000 characters per explanation", "Explore explain", "Long files are explained from their top only"],
        ["No caching of explanations", "Explore explain", "Reopening a file spends Bedrock tokens again; caching by content hash is the planned fix"],
        ["In-memory session cache on `globalThis`", "Explore", "Survives dev reloads; does not survive a second serverless instance"],
        ["Linear cosine scan, one 1 MB page", "Knowledge search", "Exact but O(chunks), and large sources are partly unsearchable"],
        ["Three embeddings at a time, 200 ms pause", "Ingestion", "Slow but under rate limits; about 1 s per 15 chunks before model latency"],
        ["Fire-and-forget background work", "Ingestion, skill inference", "Fast responses; on serverless the work can be frozen mid-way"],
        ["Image check cached for the server's life", "Execute", "One `docker image inspect` per process, not per run"],
      ], title: "Where the time and money go", takeaway: "The expensive operations are all model calls, and none is cached yet. Caching explanations and authenticating the spending routes are the two cheapest wins." },

      // ── config & deploy
      { t: "h", text: "Configuration and deployment" },
      { t: "p", text: "It's one Next.js 16 app (React 19, Tailwind 4) with `npm run dev`, `build` and `start`. The schema is pushed with `npm run db:push` (drizzle-kit against `DATABASE_URL`). The hosted demo runs on Vercel; Postgres and DynamoDB are managed services; Bedrock defaults to `us-east-1`. Code execution needs `docker build -t vedcode-sandbox -f docker/sandbox.Dockerfile .` once on a machine that has Docker, and the image name can be overridden with `EXEC_SANDBOX_IMAGE`." },
      { t: "p", text: "`npm run demo:create` creates or resets `demo@vedcode.dev`, already past onboarding, hashing its public password at the same bcrypt cost as registration. The credentials are public on purpose: the account exists to show the app, not to hold anything, and running the script again never touches other users." },

      // ── testing
      { t: "h", text: "Testing, and how quality is measured" },
      { t: "p", text: "There are no automated tests. The Kiro spec planned property-based tests for every requirement, and none were written. Quality today rests on three things: `tsc --noEmit` and `next lint` kept clean across every change in the July and August sessions, live runs against real inputs, and the audit itself. The live verification on record is below, with what each covered." },
      { t: "table", head: ["Check", "Covered", "Result"], rows: [
        ["Explore against a Next.js/TypeScript repo", "Fetch, alias resolution, layout, explain", "18 bugs found across both repos and fixed"],
        ["Explore against a Python/FastAPI repo", "Dotted imports, suffix matching", "Edges resolved after the fix"],
        ["Seven languages through the sandbox's `docker run`", "Python, JavaScript, C, C++, Java, Go, Rust", "All clean after three fixes"],
        ["Deliberate compile error", "Errors surface, not swallowed", "Real `gcc` text, non-zero exit"],
        ["Infinite loop", "In-container timeout", "Exit 124 after about 9 s"],
        ["Network and filesystem probes", "`--network none`, read-only mounts, non-root", "Blocked, as uid 10001"],
        ["Go, Java/Kotlin, Rust repos in Explore", "Classifier and resolver", "Not tested; this piece's reading says most edges won't resolve"],
        ["The execute route from a signed-in browser", "Request parsing, auth, response shape", "Not tested"],
      ], title: "What has actually been verified", takeaway: "The verified rows are the ones this piece calls real. The unverified rows are exactly where this piece found new problems by reading, which is an argument for tests, not against them." },

      // ── failures and lessons
      { t: "h", text: "Failures, dead ends and what they taught" },
      { t: "list", items: [
        "**Building the narrative before the pipeline.** Stress overlays, red-alert trajectories and pre-flight gates were drawn before anything fed them. A demo looks finished long before it is.",
        "**Four versions of one idea.** Change-impact detection was attempted four times, never with real codebase input. One honest version would have been worth more than four impressive ones.",
        "**Feature sprawl, then cutting.** Atelier and Vault were built, shipped, shelved into `src/app_future_features` and deleted; Lab never had a page. Their backend routes are still there, and the public landing nav still links to `/vault`, which 404s.",
        "**Docs written in the present tense about the future.** pgvector, Redis workers and row-level security are described as built. The audit's rule since: the source is the truth.",
        "**Type-checking is not running.** Every serious bug in July and August, from tmpfs `noexec` to the empty Python graph, was invisible to the compiler and obvious the first time real input went through.",
      ] },

      // ── trade-offs
      { t: "h", text: "Trade-offs and alternatives" },
      { t: "table", head: ["Decision", "Chosen", "Alternative", "Why"], rows: [
        ["Graph layout", "Deterministic longest-path layers", "Force-directed physics, as specified", "The same repo draws the same way every time, and direction reads as dependency"],
        ["Non-TS languages", "Regex heuristics", "A real parser per language (tree-sitter was in the README)", "Twenty languages in one file, at the cost of the resolution gaps above"],
        ["Vector store", "DynamoDB + linear scan", "pgvector in the existing Postgres", "Fits the AWS stack; pgvector would have meant one database and an index"],
        ["Code execution", "Container per run, local only", "Host processes; a hosted sandbox service", "Safety over availability: Run is off on the demo rather than unsafe"],
        ["Change impact", "Delete three, park the real one", "Merge all four into one live feature", "None had true input; rebuilding on the IDE's own files is cleaner"],
        ["Review delivery", "Due-check on page view", "Background scheduler and notifications", "No worker infrastructure; the cost is reviews nobody sees"],
      ], title: "The choices behind the current shape", takeaway: "Most choices favour honesty and determinism over reach. The two that don't, regex parsing and pull-based reviews, are where the product is weakest." },

      // ── next
      { t: "h", text: "What is open, and what comes next" },
      { t: "list", items: [
        "**Authenticate every API route** in one place, and take the user from the session, not the body.",
        "**Fix the learning engine's inputs:** send concept IDs, look profiles up by `id`, attach a concept to view signals, and make Handbook, Learn and Roadmap write one shared mastery record.",
        "**Rebuild the indexer on Explore's in-memory files**, scoped by project, with real file coupling, so the stress overlay, Checkup and Ripple Guard come back together.",
        "**Rebuild change impact** on the parked `CodebaseAnalyzer`, fed from the IDE's `project_files` instead of the server's disk.",
        "**Finish the IDE:** diagnose saving, always close stdin, then decide whether interactive input is worth a streaming connection.",
        "**Widen import resolution** with the missing extensions, grouped Go imports and C includes, then test against Go, Java and Rust repos.",
        "**Persist and cache:** move Explore's session cache to Postgres and cache explanations by content hash.",
        "**Write the first tests** for the resolver, the layering and the mastery maths, where the logic is pure and the bugs have been.",
      ] },
      { t: "p", text: "`PROGRESS.md` in the repository keeps the full audit and the session log, bug by bug, and is updated in place as features change. The code is public, and the demo account on the live site lets you check any of this yourself." },
    ],
  },
};
