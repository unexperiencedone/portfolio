import type { Article } from "../articles";

// ──────────────────────────────────────────────────────────────────── NutriSafe
//
// Sources: github.com/AnantTirupati/nutrisafe at origin/main (ba63324, 2026-10-12), read for this
// piece: ARCHITECTURE.md, DEV_LOG.md, FEATURES.md, PRODUCT.md, PRODUCT_STRATEGY.md, MARKET.md,
// DESIGN.md, WORKFLOW.md, README.md, the legal pages (privacy, fair usage), every route under
// src/app/api, src/lib, src/models, scripts/seed-ingredient-knowledge.js, and git log back to the
// first commit (including the removed Express server, whose rule engine is quoted below).
// Things this piece reports that the project's own docs don't (the allergen net matching "nut"
// inside "Nutrition", the reformulation check comparing model-written lists, the chat and diet
// plan not using the language setting, and the middleware gap's real cause) come from reading the
// code for this article and are labelled that way. Nothing was measured on users: there is no test
// suite, no accuracy evaluation and no usage data in the repo. Images: home.png, how-it-works.png
// and pricing.png are screenshots of the public pages of the live site, no account involved.

const IMG = "/writing/nutrisafe";

export const nutrisafe: Article = {
  slug: "nutrisafe",
  project: "NutriSafe",
  projectHi: "थाली की जाँच",
  published: "2026-10-17",
  status: "Live, early stage",
  team: "Anant Tirupati (lead) and Aakshant Kumar",
  hero: { src: `${IMG}/home.png`, alt: "NutriSafe landing page: Eat what you want, just safe" },
  links: [
    { label: "Live app", href: "https://nutrisafe-rust.vercel.app", kind: "live" },
    { label: "Source", href: "https://github.com/AnantTirupati/nutrisafe", kind: "source" },
  ],
  stack: ["Next.js 14", "TypeScript", "MongoDB", "NextAuth", "Amazon Bedrock", "Nova Pro", "Qwen3-VL", "Open Food Facts", "Serper", "Razorpay"],

  // ─────────────────────────────────────────────────────────────────────── Story
  story: {
    title: "NutriSafe: reading the label so you don't have to",
    dek: "If you manage diabetes, high blood pressure or a nut allergy, every packaged food is a small research project. NutriSafe turns a barcode or a photo of the label into an answer about your body, in your language. Here is who it's for, what it does, and where it stands.",
    blocks: [
      { t: "p", text: "Pick up any packet in an Indian shop and turn it over. The ingredients list is long, printed small, sometimes in two scripts, and full of names like maltodextrin, INS 621 or hydrogenated vegetable fat. Most people can't say which of those matter. For someone managing diabetes, high blood pressure or PCOS, or someone with a nut or gluten allergy, any of them might." },
      { t: "p", text: "The usual advice is \"read the label carefully\". That assumes you know what each ingredient does to your particular body, every time, for every product, in a hurry, in a shop aisle. Nobody does. So people guess, or they stick to the five products they already trust, or they ask a relative who guesses for them." },
      { t: "callout", label: "In short", labelHi: "सार", text: "NutriSafe checks a packaged food against your own health profile. Scan the barcode, photograph the label or type the ingredients, and it gives a verdict for you (Good Fit, Use Caution or Not Recommended) with a plain sentence for each ingredient that matters, in English or one of nine Indian languages. It's an AI's judgement, not a doctor's, and it says so." },
      { t: "image", src: `${IMG}/home.png`, alt: "NutriSafe landing page with the line Eat what you want, just safe", title: "The promise", takeaway: "\"Eat what you want, just safe.\" It doesn't hand anyone a list of forbidden foods. It tells them what one specific product means for them." },

      { t: "h", text: "Who has this problem" },
      { t: "p", text: "The people NutriSafe was built around are the ones for whom a label is not trivia:" },
      { t: "list", items: [
        "**People managing a long-term condition.** The profile offers twelve: diabetes, hypertension, PCOS, heart, kidney and liver disease, celiac disease, IBS, GERD, obesity, thyroid conditions, and \"other\". For these people sugar, salt and certain fats are not abstract health advice; they are numbers on next month's blood test.",
        "**People with allergies or intolerances.** Thirteen options, from peanuts and tree nuts to gluten, dairy, soy, eggs, shellfish, sesame and sulphites. One missed word on a label can mean a bad day, or worse.",
        "**People shopping for someone else.** The adult child managing a parent's diabetes diet. The parent of a child with a nut allergy. They read labels on someone else's behalf, which is harder, because they don't feel the consequences themselves until it's too late.",
        "**People who'd rather read their own language.** Results can come back in English, Hindi, Marathi, Gujarati, Tamil, Telugu, Kannada, Malayalam, Bengali or Punjabi.",
      ] },
      { t: "p", text: "Think of a woman in her fifties, recently told she's diabetic, standing in front of a shelf of \"healthy\" biscuits. One says sugar-free but lists maltitol. One says multigrain and lists sugar third. One is in a language she reads slowly. She doesn't need a lecture on nutrition. She needs to know which of these three she can buy, and why." },

      { t: "h", text: "What changes for them" },
      { t: "p", text: "You set up a health profile once: age, conditions, allergies, whether you're vegetarian, non-vegetarian or vegan, and the language you want answers in. After that, checking a product takes one of three routes, shown below." },
      { t: "image", src: `${IMG}/how-it-works.png`, alt: "Four steps from the NutriSafe site: build health profile, scan or type, instant verdict, safe alternatives", title: "Four steps, from the live site", takeaway: "The profile is the part that makes it personal. The same biscuit can be a Good Fit for one person and Not Recommended for the next." },
      { t: "list", items: [
        "**Scan the barcode** with the phone camera, or type the number. NutriSafe looks the product up in Open Food Facts, a free public database of packaged foods. Plenty of Indian products aren't in it, so when the barcode comes back empty, NutriSafe searches Indian shopping sites for that barcode and works out what the product is, instead of giving up.",
        "**Photograph the label.** An AI model reads the text off the photo, in whatever script it's printed, and the ingredients go on from there.",
        "**Type it in.** For loose items, home-packed food, or a label too damaged to photograph.",
      ] },
      { t: "p", text: "Whichever route you take, the answer looks the same: an overall verdict, a short explanation of how this product affects you in particular, a line for each ingredient worth knowing about (fine, take care, or avoid, and why), a few practical tips, and search links for healthier alternatives on Amazon, Flipkart, BigBasket and Google Shopping. Products that come back as a Good Fit collect in a \"Safe for me\" list, so the next trip to the shop starts from things you already know are fine." },
      { t: "p", text: "One part of the answer doesn't come from the AI at all. If you've told NutriSafe you're allergic to peanuts and the word peanut (or groundnut, or arachis) appears anywhere in the ingredients, the verdict is forced to Not Recommended, whatever the AI concluded. For an allergy, being too careful is an acceptable mistake. Missing it is not." },
      { t: "p", text: "Two more things sit next to the scanner: a health chat that knows your profile and can answer follow-up questions (\"what can I have instead?\"), and, on the paid tier, a diet and workout plan built around the same profile, with Indian food preferred." },

      { t: "h", text: "Why it was worded so carefully" },
      { t: "p", text: "The first versions said \"Low risk\" and \"High risk\". The team changed that to Good Fit, Use Caution and Not Recommended, on purpose. \"High risk\" on a packet of crisps reads like a poison warning, and what's actually happening is a computer reading an ingredient list against a profile and making a judgement. The words now claim exactly that much and no more. The same review removed claims the old landing page made that weren't true, like a \"clinical expert\" chat (it's an AI) and a \"clinically approved\" badge (no such approval exists)." },

      { t: "h", text: "Why it matters" },
      { t: "p", text: "India has one of the largest diabetic populations in the world, and packaged food is everywhere. The information needed for a safe choice is already printed on the packet. What's missing is the translation from \"ingredients\" to \"what this means for me\", and for a lot of people, the translation from English to the language they actually think in. That double translation is the whole product." },
      { t: "p", text: "It also changes who can do the checking. Today, label-reading falls on whoever in the family reads English best and knows the most about the condition. With an answer in Tamil or Bengali that names the condition directly (\"since you have diabetes, this sugar will spike your blood sugar quickly\"), the person who eats the food can check it themselves." },

      { t: "h", text: "What it costs" },
      { t: "p", text: "Checking food is free: up to 10 scans and 15 chat messages a day. Premium is ₹500 for 30 days of access, with higher limits (60 scans and 60 messages a day) and up to 10 diet and workout plans a month. It doesn't renew automatically; you pay again when you want another month. People who bought the earlier one-time ₹299 plan keep what they paid for." },
      { t: "image", src: `${IMG}/pricing.png`, alt: "NutriSafe pricing: a free scanner tier and a ₹500 premium tier with daily limits listed", title: "The two tiers, as shown on the live site", takeaway: "The limits exist because every scan costs real money in AI calls. The free tier was unlimited until August 2026, which was generous and not sustainable." },

      { t: "h", text: "Where it stands, honestly" },
      { t: "table", head: ["Works today", "Not yet, or not proven"], rows: [
        ["Barcode, label photo and typed-ingredient checks, live at nutrisafe-rust.vercel.app", "No measurement of how often the AI's verdict is right. No test suite of any kind."],
        ["Verdicts in English and nine Indian languages", "The health chat and diet plans still answer in English, whatever language you chose"],
        ["A hard allergy check that doesn't depend on the AI", "That check matches words very bluntly, so it can over-warn (more on that in the technical piece)"],
        ["Daily limits and a paid tier enforced on the server", "No automatic renewal, no self-service account deletion, no password reset"],
        ["An alert when a product's ingredients change between scans", "That alert can fire when the AI simply words the same list differently"],
      ], title: "What's real and what isn't", takeaway: "It's a working product with real gaps. The biggest one is the first row: nobody has yet measured how often the verdict is right." },
      { t: "callout", label: "Honest limits", labelHi: "सीमाएँ", text: "NutriSafe's verdict comes from an AI reading ingredients against your profile. It's guidance, not a diagnosis, and only as good as the label it can read: a blurry photo means a worse answer, and a product found through web search may have its ingredients guessed from its name. Anyone with a serious condition or allergy should treat it as a second opinion next to their doctor's, and still read the label." },

      { t: "h", text: "Built by two" },
      { t: "p", text: "NutriSafe is Anant Tirupati's project. He built the app itself: accounts and health profiles, scan history, the health assistant, diet plans and the Razorpay payment flow. My part was the intelligence layer: moving the AI to Amazon Bedrock, reading label photos with a vision model, identifying products that aren't in any barcode database, and making results come back in the user's language. Later I did a hardening pass: the hard allergy check, a reviewed ingredient reference the AI draws on, the usage limits, and closing a gap where the paid feature could be reached without paying. The technical piece covers how all of it works, and what's still wrong with it." },
    ],
  },

  // ──────────────────────────────────────────────────────────────────── Technical
  technical: {
    title: "NutriSafe, technically: three ways in, one judgement out",
    dek: "A barcode, a photo or typed text all become one ingredients list, which a language model judges against one person's health profile, and a deterministic rule then checks behind it. This is the whole system: the pipeline, the data model, the money, the bugs, and what's still open.",
    blocks: [
      { t: "p", text: "NutriSafe tells a person whether a packaged food suits their health. They keep a profile (conditions, allergies, diet, language), then check a product by barcode, by photographing its label, or by typing its ingredients. The answer is a verdict, a per-ingredient breakdown and a few recommendations, written for them, in their language." },
      { t: "p", text: "Under that sits a fairly small system: a Next.js 14 app with its API routes, MongoDB behind NextAuth, two models on Amazon Bedrock, two external lookups (Open Food Facts and Serper), and Razorpay for payment. The interesting engineering is in two places. First, three very different inputs have to become the same thing, a clean ingredients list, before anything can judge them. Second, the judgement comes from a language model, which is flexible and sometimes wrong, so the code around it has to decide where to trust it and where to overrule it." },
      { t: "callout", label: "TL;DR", labelHi: "सार", text: "Open Food Facts first; if the barcode isn't there, a Serper web search plus Amazon Nova Pro identifies the product. A label photo goes through Qwen3-VL to read its text. Non-English text is translated. Nova Pro then gets the ingredients, the profile and some reviewed reference notes, and must return a fixed JSON shape. A plain substring rule forces the verdict to \"high\" if a declared allergen appears, and a per-user counter caps how often any of this runs. There are no automated tests and no accuracy measurement yet." },

      { t: "h", text: "The problem and its constraints" },
      { t: "p", text: "Five constraints shaped almost every decision, and it's worth naming them before the architecture, because the architecture is mostly a response to them." },
      { t: "list", items: [
        "**Indian labels are messy input.** Ingredient lists mix English with Devanagari or other scripts, use INS/E-numbers, and are printed small on curved, shiny packets. Any approach that needs a clean, standardised list will fail on a large share of real products.",
        "**Product databases have gaps.** Open Food Facts (OFF) is a free, crowd-sourced product database with a public API and no key. It's the obvious first lookup, and its coverage of Indian products is patchy, so \"barcode not found\" has to be a normal path, not an error.",
        "**The answer must be personal and in the user's language.** A generic health score is the thing NutriSafe exists to replace. The same biscuit has to be judged differently for a diabetic and for someone with a gluten allergy, and explained in Hindi or Tamil if that's what they read.",
        "**Every judgement costs money.** Each scan is one to four model calls on Bedrock, billed per use. That cost doesn't shrink with scale the way most software costs do, which turned out to matter more than anything else in the business model.",
        "**It handles health data, built by two students.** Medical conditions and allergies are sensitive personal data. The team is two people, there's no QA, and the only automated check in the repo is the TypeScript compiler.",
      ] },

      { t: "h", text: "Architecture at a glance" },
      { t: "p", text: "Everything runs inside one Next.js 14 application using the App Router. Pages are React; the backend is a set of route handlers under `src/app/api/`, which run as server functions. There is no separate backend service. The figure below shows the pieces and which way requests flow." },
      { t: "flow", title: "The system", takeaway: "One app, one choke point for AI. Every model call goes through a single module (still named `gemini.ts`, from before the move to Bedrock), so prompts, model IDs and parsing live in one file.", flow: { kind: "flow", colW: 230, nodes: [
        { id: "web", label: "Browser", sub: "Next.js pages, camera", col: 1, row: 0 },
        { id: "auth", label: "NextAuth", sub: "JWT session, 30 days", col: 0, row: 1 },
        { id: "api", label: "API routes", sub: "src/app/api/*", col: 1, row: 1, focus: true },
        { id: "pay", label: "Razorpay", sub: "order + HMAC verify", col: 2, row: 1 },
        { id: "db", label: "MongoDB Atlas", sub: "7 collections", col: 0, row: 2 },
        { id: "ai", label: "lib/gemini.ts", sub: "Bedrock Converse client", col: 1, row: 2 },
        { id: "ext", label: "Lookups", sub: "Open Food Facts, Serper", col: 2, row: 2 },
        { id: "nova", label: "Nova Pro", sub: "text: judge, translate", col: 1, row: 3 },
        { id: "qwen", label: "Qwen3-VL 235B", sub: "vision: read labels", col: 2, row: 3 },
      ], edges: [
        { from: "web", to: "api" },
        { from: "api", to: "auth" },
        { from: "api", to: "pay" },
        { from: "api", to: "db" },
        { from: "api", to: "ai" },
        { from: "api", to: "ext" },
        { from: "ai", to: "nova" },
        { from: "ai", to: "qwen" },
      ] } },
      { t: "p", text: "Each piece in one line, before we go deep on the ones that matter:" },
      { t: "table", head: ["Component", "What it does", "Why this choice"], rows: [
        ["Next.js 14 App Router", "Pages and API in one deployable app", "One codebase and one deploy for a two-person team; route handlers are enough backend for this load"],
        ["NextAuth v4", "Email + password (bcrypt, cost 12) and Google sign-in; JWT sessions for 30 days", "No session table to manage; Google sign-in removes password friction"],
        ["MongoDB Atlas + Mongoose", "Users, profiles, scans, products, plans, usage counters, ingredient reference", "Scan results are nested documents (insights inside a scan), which fit a document store naturally"],
        ["Amazon Nova Pro (Bedrock)", "Judges ingredients, translates, identifies unknown barcodes, chats, writes diet plans", "Moved here from Gemini in March 2026; one AWS account and one SDK for text and vision"],
        ["Qwen3-VL 235B (Bedrock)", "Reads the text off a label photo", "A large vision-language model reached through the same Bedrock Converse API, so photo reading needs no second vendor"],
        ["Open Food Facts", "Barcode to product name and ingredients", "Free, no key, and the ingredient text is already structured when the product exists"],
        ["Serper", "Google search API, used when OFF has no record", "Indian shopping sites list products OFF doesn't have, often with ingredients in the snippet"],
        ["Razorpay", "One payment for 30 days of Premium", "Indian payment methods; the order-then-verify flow is simple to integrate"],
      ], title: "Every major component", takeaway: "Nothing exotic. The design work is in how these are chained and guarded, not in the parts themselves." },

      { t: "h", text: "How it got here" },
      { t: "p", text: "The current shape is the fourth version, and the earlier ones explain several decisions. The git history goes back to January 2026; the table below is built from it." },
      { t: "table", head: ["When", "Version", "What changed"], rows: [
        ["Jan 2026", "v0: Express + rules", "A separate Express server and Next.js client. Risk came from a rule engine of 12 hand-written rules; Google Cloud Vision did OCR; Gemini Pro wrote the explanation"],
        ["Feb 2026", "v1: one Next.js app", "Rewritten as a single Next.js 14 app with NextAuth and Mongoose. The rule engine was dropped: Gemini 2.5 Flash now read labels, translated and judged"],
        ["Mar 2026", "Features", "Health chat, diet and workout plans, saved plans, and a one-time ₹299 Razorpay unlock (Anant)"],
        ["26 Mar 2026", "v2: Bedrock", "All model calls moved to Amazon Bedrock: Nova Pro for text, Qwen3-VL for photos. Added the Serper search fallback and answers in 10 languages (my commits)"],
        ["Aug 2026", "v3: hardening", "Allergen safety net, reviewed ingredient grounding, JSON retry, translation skipped for English, usage caps, server-side paywall, ₹500 per 30 days, legal pages, reformulation alerts (my commits)"],
        ["Oct 2026", "SEO", "Search Console verification and metadata (Anant)"],
      ], title: "33 commits, four versions", takeaway: "The big swing was v0 to v1: from rules that were predictable but blind, to a model that reads anything but has to be watched. v3 adds a few rules back, in the one place they're worth it." },
      { t: "p", text: "The v0 rule engine is worth a look, because it's the alternative everyone suggests first (\"why not just a list of bad ingredients per condition?\"), and here it is, actually built:" },
      { t: "code", lang: "javascript", source: "server/src/services/RuleEngine.js (first commit, since removed)", title: "The rules the project started with", takeaway: "Start at 10, subtract 5 for a HIGH match and 2 for a MODERATE one, then bucket. It's transparent and cheap. It also only knew 12 ingredient words across four conditions, and \"sugar\" matched by substring, as its own comment admits.", text: `const rules = await RiskRule.find({ condition: { $in: userDiseases } });
let score = 10; // Start with perfect score

for (const rule of rules) {
    const riskTerm = rule.risk_ingredient.toLowerCase();
    // naive check: ingredient.includes(riskTerm) -> this covers "Cane Sugar" contains "Sugar"
    const match = normalizedIngredients.find(ing => ing.includes(riskTerm));
    if (match) {
        risks.push({ ingredient: match, condition: rule.condition, severity: rule.severity, reason: rule.reason });
        if (rule.severity === 'HIGH') score -= 5;
        else if (rule.severity === 'MODERATE') score -= 2;
    }
}

if (score < 5) overallRisk = 'HIGH';
else if (score < 8) overallRisk = 'MODERATE';` },
      { t: "p", text: "The seed file gave it four rules for diabetes (sugar, corn syrup, dextrose, maltodextrin), four for hypertension, two for heart disease and two for kidney disease. Anything else, a sweetener called maltitol, an INS number, a word in Hindi, was invisible to it. Writing rules for every ingredient, every alias, every script and every condition was never going to finish. That's the real reason v1 handed judgement to a model." },
      { t: "p", text: "v0 had a second habit worth remembering. When Vision OCR failed or had no credentials, it didn't report an error. It substituted a hard-coded soda label (\"Carbonated Water, High Fructose Corn Syrup, Caramel Color...\") and analysed that. When Gemini failed, it returned canned \"Offline Mode\" advice. Both made demos look smooth, and both meant a real user could get a confident verdict about a product they never scanned. The current code has no fake fallbacks: if Bedrock fails, the route returns a 500 and the user sees an error." },
      { t: "callout", label: "Lesson", labelHi: "सबक", text: "A fallback that invents data is worse than a crash in a health product. The crash is honest; the invented verdict is a wrong answer delivered with full confidence. Every fallback in the current pipeline either fetches real data from somewhere else or fails visibly." },

      { t: "h", text: "Three inputs, one ingredients list" },
      { t: "p", text: "The core design choice is that the judgement step only ever sees one shape of input: a product name and a comma-separated list of ingredients in English. Whatever happens upstream, a barcode, a photo or typing, has one job: produce that list. The figure below is the pipeline as it runs today." },
      { t: "flow", title: "The scan pipeline", takeaway: "Every route converges before the model judges anything, so there's one prompt, one schema and one place to fix a bad answer. The deterministic safety net runs after the model, not before, so it can overrule it.", flow: { kind: "flow", colW: 220, nodes: [
        { id: "bc", label: "Barcode", sub: "camera or typed", col: 1, row: 0 },
        { id: "ph", label: "Label photo", sub: "base64 upload", col: 2, row: 0 },
        { id: "srch", label: "Search fallback", sub: "Serper + Nova Pro", col: 0, row: 1, dashed: true },
        { id: "off", label: "Open Food Facts", sub: "API v2 lookup", col: 1, row: 1 },
        { id: "ocr", label: "Qwen3-VL", sub: "reads text as printed", col: 2, row: 1 },
        { id: "mn", label: "Typed text", sub: "manual entry", col: 3, row: 1 },
        { id: "tr", label: "To English", sub: "only if non-ASCII", col: 2, row: 2 },
        { id: "kb", label: "Reference notes", sub: "IngredientKnowledge", col: 1, row: 3 },
        { id: "judge", label: "Nova Pro judges", sub: "profile + JSON contract", col: 2, row: 3, focus: true },
        { id: "net", label: "Safety net", sub: "allergens, consistency", col: 3, row: 3 },
        { id: "save", label: "Verdict saved", sub: "ScanHistory", col: 3, row: 4 },
      ], edges: [
        { from: "bc", to: "off" },
        { from: "off", to: "srch", label: "miss", dashed: true },
        { from: "off", to: "tr", label: "found" },
        { from: "srch", to: "tr" },
        { from: "ph", to: "ocr" },
        { from: "ocr", to: "tr" },
        { from: "mn", to: "tr" },
        { from: "tr", to: "judge" },
        { from: "kb", to: "judge" },
        { from: "judge", to: "net" },
        { from: "net", to: "save" },
      ] } },

      { t: "h", text: "Route 1: the barcode, and what happens when it isn't known", id: "barcode" },
      { t: "p", text: "The browser decodes the barcode itself with `html5-qrcode` (10 frames a second, a 250 × 150 pixel scan box), so no image is uploaded for this route, just digits. `GET /api/barcode/[barcode]` rejects anything that isn't all digits, then asks Open Food Facts' v2 API for the product. When OFF knows it, the route takes the raw `ingredients_text`, splits it on commas, semicolons and brackets, adds OFF's own parsed ingredient entries, and removes duplicates with a `Set`. The product name, brand, image URL and nutrition values come along too." },
      { t: "p", text: "When OFF returns nothing, the route doesn't give up. It searches the web for that exact barcode, restricted to the Indian sites most likely to list it:" },
      { t: "code", lang: "typescript", source: "src/lib/search.ts", title: "The search-backed fallback", takeaway: "Quote the barcode so Google matches it exactly, restrict to three Indian retailers, set the country to India, and keep the top 5 results as title + snippet + link. If that finds nothing, one broader query runs before giving up.", text: `const query = \`site:amazon.in OR site:bigbasket.com OR site:blinkit.com "\${barcode}"\`;

const response = await fetch("https://google.serper.dev/search", {
  method: "POST",
  headers: { "X-API-KEY": apiKey, "Content-Type": "application/json" },
  body: JSON.stringify({ q: query, gl: "in" }),
});
// ...
for (let i = 0; i < Math.min(data.organic.length, 5); i++) {
  const item = data.organic[i];
  results.push(\`Result \${i + 1}: \${item.title}\\nSnippet: \${item.snippet}\\nLink: \${item.link}\`);
}
if (results.length === 0) {
  return searchProductBroadly(barcode, apiKey); // \`\${barcode} product name India\`
}` },
      { t: "p", text: "The search results become context for Nova Pro, which is asked to identify the exact product and return JSON with its name, brand and ingredient list. Only if the search finds nothing, or the model can't name a product, does the user see \"not found\". In the server log this shows up as a deliberate branch (\"not found in OFF. Triggering search fallback\"), not an error path." },
      { t: "p", text: "There is an honesty problem inside this fallback, and it's in the prompt itself: the model is told to return the full ingredient list \"if available in snippets, otherwise best guess based on product name\". A search snippet rarely contains a whole ingredient list, so for many fallback products the ingredients are the model's guess at what such a product usually contains. The route marks these products with `source: \"search_ai\"`, but the scan page doesn't yet show the user that the list was inferred rather than read. That's the most important open item on this route." },

      { t: "h", text: "Route 2: reading a label photo" },
      { t: "p", text: "The photo is read in the browser into a base64 data URL and sent in the JSON body of `POST /api/analyze`. The server strips the data-URL header, works out the format (JPEG, PNG, GIF or WebP) from the MIME type, and sends the raw bytes to Qwen3-VL through Bedrock's Converse API. The Bedrock model ID is `qwen.qwen3-vl-235b-a22b`: a 235-billion-parameter vision-language model, of which about 22 billion are active per token (that's what the `a22b` means)." },
      { t: "p", text: "The instruction is narrow on purpose: \"Extract all text from this food label image exactly as it appears. Do not translate. Return only the raw text: ingredient list, nutrition facts, product name. Preserve line breaks. If you cannot read it, return 'Unable to read label'.\" Keeping transcription separate from interpretation means a reading error and a judgement error can be told apart, and the original text can be stored exactly as printed. If the model returns the sentinel, the route falls back to whatever text the user typed alongside the photo." },
      { t: "p", text: "Two things are missing here. The photo isn't resized or compressed before upload, so a full-resolution phone photo travels as base64 (about a third larger than the file) in a single request. And nothing checks image quality before spending a model call on it, so a blurry photo costs the same as a sharp one and produces a worse list." },

      { t: "h", text: "Route 3: typed text, and the step into English" },
      { t: "p", text: "Typed ingredients are split on commas, semicolons and newlines in the browser and sent as a list. All three routes then meet the same step: if the text is not English, translate it. Translation is a Nova Pro call that also reports the detected language as a code like `hi` or `ta`. That code is returned and currently thrown away: nothing uses it yet, and the answer language comes from the user's profile setting, not from the label." },
      { t: "p", text: "Until August this translation ran on every scan, English or not, a full extra model call on the most common path. It's now gated by a deliberately crude check, `looksLikeEnglishOrLatin`, which skips translation when the text contains no character outside ASCII. It's conservative: one accented letter in a French product's OFF entry, or one rupee sign, still sends the text through translation. That over-translates a little and never skips a Hindi label, which is the right way round." },

      { t: "h", text: "The judgement, and its contract" },
      { t: "p", text: "Now the one call that matters. Nova Pro receives a system prompt and a user message. The user message is the profile as JSON (age, conditions, allergies, diet, language, notes), the product name, optional reference notes (next section), and the ingredients, with a warning that they \"may contain OCR errors; normalize and interpret\". The system prompt sets the voice (explain like a friend, connect every risk to the user's actual condition, no jargon) and the output contract:" },
      { t: "list", items: [
        "`riskLevel`: exactly one of `low`, `medium`, `high` (shown to users as Good Fit, Use Caution, Not Recommended).",
        "`ingredientInsights`: one entry per ingredient, each with a `category` of `safe`, `caution` or `harmful`, an `explanation` and a `reason` tied to the user's conditions.",
        "`riskSummary`, 2 to 5 `recommendations`, and 3 to 6 `suggestedProductSearches` for buying alternatives.",
        "Every text field in the user's chosen language, injected into the prompt as `${language}`: English or one of Hindi, Marathi, Gujarati, Tamil, Telugu, Kannada, Malayalam, Bengali, Punjabi.",
      ] },
      { t: "p", text: "No inference settings are passed (no temperature, no token limit), so the model runs on Bedrock's defaults. The response is treated as untrusted text. Markdown code fences are stripped, the rest is parsed as JSON, and if parsing fails, the code doesn't throw away the scan immediately:" },
      { t: "code", lang: "typescript", source: "src/lib/gemini.ts", title: "One corrective retry", takeaway: "The failed answer goes back into the conversation as the assistant's turn, followed by a one-line correction. One retry, then a real error. Since each scan now costs the user a credit, failing on a formatting slip would charge them for nothing.", text: `let responseText = await callBedrock(messages, systemPrompts);
let parsed = tryParseJson<AnalysisResult>(responseText);

if (!parsed) {
  const retryMessages: Message[] = [
    ...messages,
    { role: "assistant", content: [{ text: responseText }] },
    { role: "user", content: [{ text: "That was not valid JSON. Respond again with ONLY the JSON object, no other text." }] },
  ];
  responseText = await callBedrock(retryMessages, systemPrompts);
  parsed = tryParseJson<AnalysisResult>(responseText);
}

if (!parsed) throw new Error("AI returned invalid JSON: " + responseText.slice(0, 200));
if (!["low", "medium", "high"].includes(parsed.riskLevel)) parsed.riskLevel = "medium";
if (!Array.isArray(parsed.ingredientInsights)) parsed.ingredientInsights = [];` },
      { t: "p", text: "After parsing, the shape is repaired rather than trusted: a risk level outside the three allowed values becomes `medium`, and any list field that isn't an array becomes an empty array. Defaulting an unknown verdict to the middle is a choice: it never tells a user something is fine on the strength of a malformed answer, and never alarms them on one either." },

      { t: "h", text: "Grounding: a small reviewed reference" },
      { t: "p", text: "Left alone, the model explains each ingredient from its own general knowledge, fresh every time. The same additive could be described differently in two scans, and a wrong explanation can't be corrected anywhere, because there's no record to correct. The fix is grounding: before the call, look up known ingredients in a reviewed reference and put those notes into the prompt, with the instruction to \"prefer this over your own general knowledge where it applies\"." },
      { t: "p", text: "The reference lives in the `IngredientKnowledge` collection. Its schema existed from the first Next.js version and sat unused for seven months; in August it was seeded with 15 researched entries by a re-runnable script: monosodium glutamate (E621), sodium benzoate (E211), high fructose corn syrup, aspartame (E951), palm oil, sodium nitrite (E250), partially hydrogenated oil, tartrazine (E102), carrageenan (E407), sorbitol (E420), casein, gluten, caffeine, xanthan gum (E415) and potassium sorbate (E202). Matching is a substring test in both directions against each entry's name and aliases, done in JavaScript after loading the whole table. That's fine at 15 entries and the code says to switch to a text index when it reaches the hundreds." },
      { t: "p", text: "It was checked the only way the project checks anything, by hand: after seeding, a live scan's explanation of sodium benzoate came back almost word for word from the reference text, which confirms the model is using it. Fifteen entries is a start, not coverage. Most ingredients on most labels still get the model's own explanation." },

      { t: "h", text: "The safety net: where a rule overrules the model" },
      { t: "p", text: "Here's the uncomfortable fact about the design so far: whether a scan caught someone's declared allergy depended entirely on a language model noticing it inside a general-purpose prompt. Usually it would. \"Usually\" is not good enough for an allergy. So after the model answers, a deterministic function runs over the result. Deterministic means it gives the same output for the same input every time; no model is involved." },
      { t: "code", lang: "typescript", source: "src/lib/allergySafety.ts", title: "The backstop, trimmed", takeaway: "Two rules. A declared allergen found anywhere forces \"high\" and adds a harmful insight if the model didn't flag one. And the overall verdict can't undersell the model's own per-ingredient tags: any \"harmful\" means high, any \"caution\" lifts low to medium.", text: `const ALLERGEN_ALIASES: Record<string, string[]> = {
  Nuts: ["nut", "almond", "cashew", "walnut", "hazelnut", "pistachio", "pecan", "macadamia", "brazil nut"],
  Peanuts: ["peanut", "groundnut", "arachis"],
  Gluten: ["wheat", "barley", "rye", "malt", "semolina", "gluten", "spelt", "triticale"],
  Sesame: ["sesame", "tahini", "til"],
  Sulfites: ["sulfite", "sulphite", "e220", "e221", "e222", "e223", "e224", "e228"],
  // ...12 allergies in all; "Other" has nothing to match on
};

// in applySafetyRules(analysis, allergies, rawIngredientsText):
const combinedText = \`\${rawIngredientsText} \${result.ingredients.join(" ")}\`;
const allergenHits = detectAllergenMatches(allergies, combinedText); // lowercase text, .includes(alias)

for (const hit of allergenHits) {
  const alreadyFlagged = result.ingredientInsights.some(
    (i) => i.category === "harmful" && i.name.toLowerCase().includes(hit.matchedTerm)
  );
  if (!alreadyFlagged) {
    result.ingredientInsights.push({ name: hit.matchedTerm, category: "harmful", /* explanation, reason */ });
  }
}
if (allergenHits.length > 0) result.riskLevel = "high";

const hasHarmful = result.ingredientInsights.some((i) => i.category === "harmful");
const hasCaution = result.ingredientInsights.some((i) => i.category === "caution");
if (hasHarmful && result.riskLevel !== "high") result.riskLevel = "high";
else if (hasCaution && result.riskLevel === "low") result.riskLevel = "medium";` },
      { t: "p", text: "The comment above the alias table states the policy plainly: false positives are an acceptable cost for a food-safety product; false negatives on a declared allergy are not. I agree with the policy. But reading the code for this article, the matching is blunter than the policy needs, because it's a plain substring test over the whole text. These are consequences of the code as written, not observed reports:" },
      { t: "table", head: ["Declared allergy", "Alias", "Also matches", "Effect"], rows: [
        ["Nuts", "nut", "nutrition, nutmeg, coconut", "Label photos include the nutrition table (the OCR prompt asks for it), so a Nuts profile can get \"high\" on almost any photographed label"],
        ["Sesame", "til", "distilled (vinegar)", "A common ingredient flags a sesame allergy"],
        ["Lactose / Dairy", "butter", "cocoa butter", "Dark chocolate can be flagged for a dairy allergy"],
        ["Gluten", "malt", "maltodextrin, maltitol", "Over-warns; maltodextrin can come from wheat, so this one is the most defensible"],
      ], title: "What a substring match also catches", takeaway: "None of these are dangerous, which is the point of the policy, but \"Not Recommended\" on everything teaches people to ignore the verdict. Word-boundary matching, plus running the check on the ingredient section only, would remove most of them." },

      { t: "h", text: "One scan, end to end" },
      { t: "p", text: "Putting it together, here is the longest common path: a barcode Open Food Facts doesn't know, judged for a signed-in user. The barcode lookup and the analysis are two separate requests from the browser." },
      { t: "sequence", title: "A barcode miss, from camera to verdict", takeaway: "Two model calls on this path (identify, then judge), plus one more if the identified text isn't English and one more if the JSON is malformed. The usage counter is charged before any of them.", seq: { kind: "sequence", actors: ["Phone", "API routes", "OFF / Serper", "Bedrock", "MongoDB"], steps: [
        { from: 0, to: 1, label: "GET /api/barcode/890…" },
        { from: 1, to: 2, label: "OFF product lookup" },
        { from: 2, to: 1, label: "no product", dashed: true },
        { from: 1, to: 2, label: "Serper: 3 Indian retailers" },
        { from: 2, to: 1, label: "top 5 results", dashed: true },
        { from: 1, to: 3, label: "Nova Pro: identify product" },
        { from: 3, to: 1, label: "name, brand, ingredients", dashed: true },
        { from: 1, to: 0, label: "product", dashed: true },
        { from: 0, to: 1, label: "POST /api/analyze" },
        { from: 1, to: 4, label: "premium? then $inc usage counter" },
        { from: 1, to: 4, label: "profile + reference notes" },
        { from: 1, to: 3, label: "Nova Pro: judge vs profile" },
        { from: 3, to: 1, label: "JSON verdict", dashed: true },
        { from: 1, to: 1, label: "allergen + consistency rules" },
        { from: 1, to: 4, label: "reformulation check, save scan" },
        { from: 1, to: 0, label: "verdict + insights", dashed: true },
      ] } },
      { t: "p", text: "How many model calls a scan costs depends on the route, and since each call is billed, that's the number that drives cost:" },
      { t: "table", head: ["Route", "Model calls", "Other external calls"], rows: [
        ["Typed, English", "1 (judge)", "none"],
        ["Typed, other script", "2 (translate, judge)", "none"],
        ["Barcode found in OFF", "1, or 2 if the OFF text has any non-ASCII character", "1 OFF request"],
        ["Barcode not in OFF", "2 or 3 (identify, maybe translate, judge)", "1 OFF + 1 or 2 Serper searches"],
        ["Label photo", "2 or 3 (Qwen3-VL read, maybe translate, judge)", "none"],
        ["Any route, malformed JSON", "+1 retry", "none"],
      ], title: "Model calls per scan", takeaway: "The cheapest scan is one call and the most expensive is four. Before August, translation ran on every scan, so every row was one call heavier." },

      { t: "h", text: "The data model" },
      { t: "p", text: "Seven Mongoose collections. The health profile is its own document, one per user, and every personalised feature (scan, chat, diet plan) reads from it, so editing the profile changes the very next answer everywhere. The figure shows how they relate." },
      { t: "flow", title: "Collections and their links", takeaway: "Everything hangs off User, but HealthProfile is the one that makes the product personal. IngredientKnowledge stands alone: it's shared reference data, read at analysis time, owned by no user.", flow: { kind: "flow", colW: 220, nodes: [
        { id: "user", label: "User", sub: "account, premium dates", col: 1, row: 0 },
        { id: "hp", label: "HealthProfile", sub: "1:1, unique userId", col: 0, row: 1, focus: true },
        { id: "scan", label: "ScanHistory", sub: "{userId, createdAt}", col: 1, row: 1 },
        { id: "plan", label: "DietPlan", sub: "saved plans", col: 2, row: 1 },
        { id: "use", label: "UsageCounter", sub: "per action, per period", col: 3, row: 1 },
        { id: "kb", label: "IngredientKnowledge", sub: "15 reviewed entries", col: 0, row: 2, dashed: true },
        { id: "fp", label: "FoodProduct", sub: "one per scan", col: 1, row: 2 },
      ], edges: [
        { from: "user", to: "hp" },
        { from: "user", to: "scan" },
        { from: "user", to: "plan" },
        { from: "user", to: "use" },
        { from: "scan", to: "fp" },
      ] } },
      { t: "table", head: ["Collection", "Holds", "Notes"], rows: [
        ["User", "Email, bcrypt hash or Google account, `isPremium`, `premiumSince`, `premiumExpiresAt`, `premiumOrderId`", "`emailVerified` exists but nothing sets it; there's no verification or password-reset flow"],
        ["HealthProfile", "Age, gender, height, weight, conditions, allergies, diet, `preferredLanguage`, notes", "Unique index on `userId`. Conditions and allergies are now free strings at the API (were enums)"],
        ["ScanHistory", "Product, ingredients, `riskLevel`, summary, nested insights, recommendations, barcode, source", "Indexed `{userId: 1, createdAt: -1}`. Powers history, the dashboard and the Safe Foods list (`riskLevel: low`)"],
        ["FoodProduct", "Name, raw text as printed, normalised ingredients, barcode, source", "Barcode-indexed for caching, but written on every scan and only read by the reformulation check"],
        ["DietPlan", "Name and plan text", "`{userId, createdAt}` index added in August"],
        ["UsageCounter", "`userId`, `action`, `period`, `count`", "Unique index on `{userId, action, period}`, which makes the counter safe under concurrency"],
        ["IngredientKnowledge", "Name, aliases, category, E-number, description, concerns, related conditions", "Defined in February, unused until August; 15 seeded entries"],
      ], title: "Every collection", takeaway: "Two things stand out: the internal verdict values never changed when the labels did (a copy change, not a migration), and the product cache that would save the most money exists but isn't consulted." },
      { t: "p", text: "One detail in that table matters more than it looks. `ScanHistory` stores both the raw text exactly as it came off the label and the model's normalised English list. Keeping the original means a disputed verdict can be traced back to what was actually read, which is the only audit trail a model-based judgement has." },

      { t: "h", text: "Accounts, limits and money" },
      { t: "p", text: "**Authentication.** NextAuth v4 with two providers. Email sign-up requires a password of at least 8 characters, hashed with bcrypt at cost 12. Google sign-in finds or creates the user by email on first login and creates an empty health profile at the same time, so no code path has to handle a user without one. Sessions are JWTs (signed tokens kept in a cookie) that last 30 days. The JWT callback always looks up the MongoDB user ID rather than the provider's ID, so a Google user and an email user both get the same kind of ID." },
      { t: "p", text: "**Route protection, and a gap with a misleading history.** Pages are protected by `middleware.ts`, which redirects anyone without a token to sign-in. It only covers the paths in a hand-written list, and for months that list had five entries while the app had grown to eight protected pages: `/diet-plan`, `/my-plans` and `/premium` were reachable without signing in. No data leaked, since every API route checks the session itself, but logged-out visitors landed on broken pages. The project's dev log first blamed a commit titled \"disable middleware for debugging\". Reading that commit for this article, its only change is to `.gitignore`. The real cause was simpler: the three pages were added in March and nobody added them to the list. The list now has all eight, and the lesson stands either way: protection defined in two places (the folder and the list) will drift." },
      { t: "p", text: "**Usage limits.** Until August, scanning and chat were free and unlimited, while the only paid feature, the diet plan, was the cheapest to run. Any spike in sign-ups would have turned straight into a Bedrock bill. Now every expensive route charges a counter before doing any work:" },
      { t: "code", lang: "typescript", source: "src/lib/usage.ts", title: "An atomic per-user meter", takeaway: "One `findOneAndUpdate` with `$inc` and `upsert` both creates and increments the counter in a single atomic operation, so two simultaneous requests can't both slip under the cap. The period key (a UTC date or month) makes resets free: tomorrow is simply a new document.", text: `const LIMITS = {
  scan:     { free: 10, premium: 60, window: "day" },
  chat:     { free: 15, premium: 60, window: "day" },
  dietPlan: { free: 0,  premium: 10, window: "month" },
};

export async function checkAndConsumeUsage(userId, action, isPremium) {
  const { free, premium, window } = LIMITS[action];
  const limit = isPremium ? premium : free;
  if (limit <= 0) return { allowed: false, limit, used: 0, window };

  const period = periodKey(window); // "2026-10-17" or "2026-10", UTC
  const result = await UsageCounter.findOneAndUpdate(
    { userId, action, period },
    { $inc: { count: 1 } },
    { new: true, upsert: true }
  );
  return { allowed: result.count <= limit, limit, used: result.count, window };
}` },
      { t: "p", text: "The numbers are placeholders, and the code says so: they were chosen to stop unbounded use, not tuned from real per-call costs, which haven't been pulled from AWS Cost Explorer yet. The same numbers are published, word for word, in the app's Fair Usage Policy. Two consequences of charging first: a scan that fails halfway still uses a credit (one reason the JSON retry exists), and the counter keeps counting rejected attempts, which the read-only summary clamps when it displays them. The barcode lookup route, which can trigger a search and a model call on a miss, is not metered yet." },
      { t: "p", text: "**Premium.** The diet-plan route used to rely on a blurred `<PremiumGate>` component in the browser, which meant anyone calling the API directly got plans without paying. It now checks Premium on the server and returns 403 before any model call. That check reads the database, not the session: the session's `isPremium` flag can be up to 30 days old, which didn't matter when Premium was forever and matters now that it expires. The session flag is still used for display only, which is just as well, because the JWT callback copies `isPremium` from a client-side session update without checking it." },
      { t: "p", text: "**Payment.** The server creates a Razorpay order for 50,000 paise (₹500); the browser completes checkout; then `/api/premium/verify` recomputes an HMAC-SHA256 of `order_id|payment_id` with the secret key and compares it with Razorpay's signature. If they match, Premium is extended by 30 days, stacked on top of any time remaining. Accounts from the earlier ₹299 lifetime plan have no expiry date and are treated as permanent. What's missing is the other half of a payment system: there's no payment ledger (no record of which payments have been honoured, for how much) and no webhook, so if the browser closes between payment and verification, Razorpay has the money and NutriSafe has no record of it." },

      { t: "h", text: "Security and privacy" },
      { t: "p", text: "The privacy policy in the app is unusually specific, and it matches the code. Here's where each piece of data goes:" },
      { t: "table", head: ["Service", "Receives", "Why"], rows: [
        ["Amazon Bedrock", "Ingredient text, label photos, chat messages and images, the health profile", "All AI: reading, translating, judging, chat, plans. The profile has to reach the model to personalise anything"],
        ["MongoDB Atlas", "Everything stored: account, profile, scans, plans, usage counts", "The database"],
        ["Open Food Facts", "The barcode number only", "Product lookup"],
        ["Serper", "The barcode number only", "Search fallback"],
        ["Razorpay", "Payment; NutriSafe gets back an order reference, never card details", "Premium"],
        ["Google", "Sign-in only, if chosen", "OAuth"],
      ], title: "Where the data goes", takeaway: "Personal health data goes to exactly two places: the database and the model. The lookups only ever see a barcode." },
      { t: "list", items: [
        "**Not kept:** uploaded label photos (only the extracted text is stored) and chat conversations (they live in the browser session only).",
        "**A small cross-user leak, by design:** the reformulation alert can say a product changed \"since it was last scanned (Aug 2026, by another user)\", revealing that someone else scanned it and roughly when. Minor, but it's another user's activity.",
        "**Deletion is manual:** there's no delete-account button; the policy asks users to email a request.",
        "**The model sees the profile.** There's no way to personalise a verdict without sending conditions and allergies to Bedrock. The mitigation is contractual and stated, not technical.",
      ] },
      { t: "p", text: "The project also had a real incident. In August, every Bedrock call started failing with `AWSCompromisedKeyQuarantineV3`: AWS had flagged the account's access keys as compromised and quarantined them. Rotating the key didn't clear it, because a second IAM user in the same account was quarantined too; it took an AWS Support case. Looking for a cause turned up an older, separate mistake: an environment file with real secrets had been committed in the project's first week, back in the Express version. The lessons are the boring, correct ones: secrets never go in git, deleting a file doesn't remove it from history, turn on GitHub secret scanning and push protection, and rotate everything that ever touched a public commit." },

      { t: "h", text: "Performance" },
      { t: "p", text: "There are no latency measurements in the repo, so this section can only describe the shape of the work, not its speed. A scan is a chain of sequential network calls (OFF, maybe Serper, then one to three model calls, then several database operations), each waiting for the one before. Nothing is streamed: the user sees a spinner until the whole verdict is ready. None of the outbound `fetch` calls set a timeout, so a slow OFF or Serper response holds the whole request open." },
      { t: "p", text: "The two optimisations that exist are both about not making calls: skipping translation for ASCII text, and the usage cap. The big one that doesn't exist yet is caching. `FoodProduct` is indexed on barcode precisely so repeat scans could reuse the product lookup, but nothing reads it before writing, so every scan of the same product, by anyone, re-runs identification from scratch. The right split is clear from the design: cache the product (what's in it), never the verdict (what it means for this person)." },

      { t: "h", text: "Testing, and how quality is measured" },
      { t: "p", text: "Plainly: it isn't, yet, in any automated way. There is no test framework in `package.json`. `npm run lint` is broken (there's no ESLint config, so it stops to ask how to set one up). The only check that runs is `tsc --noEmit`. There is no evaluation set of labels with known-correct verdicts, so there is no accuracy number for the thing the product exists to do, and this piece won't invent one." },
      { t: "p", text: "What exists is manual verification, recorded in the dev log with what was checked:" },
      { t: "table", head: ["Change", "How it was verified"], rows: [
        ["Paywall on `/api/diet-plan`", "A non-premium session calling the endpoint directly gets 403 before any Bedrock call"],
        ["Usage caps", "A counter seeded at the cap; the route returns 429 without touching Bedrock"],
        ["Ingredient grounding", "A scan's sodium benzoate explanation came back nearly word for word from the seeded reference"],
        ["Reformulation alerts", "Two scans of the same made-up barcode with different ingredients; the second was flagged"],
        ["Route protection", "Each page requested with no session cookie returns 307 to sign-in"],
        ["Chat formatting fix", "Found only by reading real model output: text after `**Summary:**` on the same line was being dropped"],
      ], title: "Every verification on record", takeaway: "Real checks, done properly, once each. None of them run again automatically, so any of them can silently regress." },
      { t: "p", text: "The first tests worth writing are cheap and specific: unit tests for `applySafetyRules` (including the false positives in the table above), the usage meter's period rollover, and the HMAC verification; and a small evaluation set of real Indian labels, each with a profile and the verdict a nutritionist would give, run against every prompt change. The project's own workflow doc says the same: test prompt changes against a diabetic profile, an allergy profile and an empty profile before merging." },

      { t: "h", text: "What broke, and what it taught" },
      { t: "table", head: ["What went wrong", "What it taught"], rows: [
        ["v0 replaced failed OCR with a hard-coded soda label and failed AI calls with canned advice", "Never invent data to keep a demo smooth. Fail visibly"],
        ["Early commits included `node_modules` (removed in March: 5,102 files, about a million lines)", "Set up `.gitignore` before the first commit, not after"],
        ["Code, UI copy and README said \"Gemini\" for months after the move to Bedrock; the file is still `gemini.ts`", "A health product that misstates which AI checks your food invites doubt about everything else it says"],
        ["Three protected pages missing from the middleware list", "Protection defined in two places drifts; generate the list or assert it"],
        ["Paywall enforced only in the browser; free tier uncapped", "Every limit lives on the server, and every AI feature ships with an answer to \"what stops 10,000 free calls?\""],
        ["The chat formatter silently dropped text after a heading on the same line", "Type checks and code review don't catch output bugs. Look at real model output"],
        ["My March prompt rewrite for multi-language support cut the detailed instructions for alternative-product searches, and asked for them in the user's language, though they're pasted into Amazon and Flipkart search URLs", "A prompt is code. Changing it for one feature can quietly degrade another, and there was no test to notice"],
        ["Several \"bugs\" were the dev server running stale code after a schema or env change", "Restart before assuming the code is wrong"],
      ], title: "Failures and lessons", takeaway: "Most of these are not clever bugs. They're the gaps a two-person team without tests or review leaves, which is exactly why the next item on the list is tests." },

      { t: "h", text: "Trade-offs and alternatives" },
      { t: "table", head: ["Decision", "Alternative", "Why this way, and the cost"], rows: [
        ["A model judges ingredients", "A rules engine (v0 had one)", "Rules covered 12 words; the model reads any label in any script. Cost: it's wrong in less predictable ways, so verdicts are framed as guidance and backed by rules where rules are cheap"],
        ["Deterministic allergen override", "Trust the model's verdict", "An allergy miss is the one error that can't be tolerated; over-warning is accepted. Cost: the false positives above"],
        ["Separate read, translate and judge steps", "One multimodal call doing everything", "Each step can be checked, logged and retried alone, and the raw text is kept. Cost: up to two extra calls and more latency"],
        ["Search + model when OFF misses", "Show \"not found\"", "Most Indian products would dead-end otherwise. Cost: ingredients can be guessed, and the user isn't told yet"],
        ["Bedrock for both models", "Gemini, or a separate vision vendor", "One account, one SDK, one bill. Cost: months of the code and UI still saying \"Gemini\", and AWS credentials to guard"],
        ["Charge the counter before work", "Charge after success", "Over-limit requests cost nothing to reject. Cost: failed scans still use a credit"],
        ["₹500 per 30 days, manual renewal", "Lifetime ₹299, or real subscriptions", "Lifetime access can't cover per-call AI costs. Cost: renewal is manual until Razorpay Subscriptions and a webhook exist"],
      ], title: "Decisions and what they cost", takeaway: "The pattern: use the model where flexibility matters, put a rule behind it where an error is unacceptable, and put a meter in front of it because it costs money every time." },

      { t: "h", text: "What's still open" },
      { t: "list", items: [
        "**Measure accuracy.** An evaluation set of real labels, profiles and expected verdicts. Without it, every prompt change is a guess.",
        "**Tell users when ingredients were inferred.** Fallback products marked `search_ai` should say so on the result.",
        "**Sharpen the allergen net.** Word-boundary matching and checking the ingredient section only, keeping the over-warn policy.",
        "**Cache products by barcode,** reusing identification for 30 to 90 days while keeping every verdict per user.",
        "**Fix the reformulation check.** It compares the model-written ingredient lists from two scans, so a model wording the same list differently (or answering in another language) can look like a recipe change. It should compare the raw source lists instead.",
        "**Language everywhere.** The chat and diet-plan prompts don't receive the profile's language yet, so only scan results are localised.",
        "**Meter the barcode route.** A barcode miss can trigger a search and a model call, and that route doesn't charge the usage counter yet.",
        "**Payments properly:** a payment ledger, a `payment.captured` webhook as the source of truth, then real subscriptions.",
        "**Make the pricing card true.** It promises \"priority generation speed\" and \"advanced ingredient risk analysis\" for Premium; in the code, premium scans run the same pipeline with higher limits and nothing more.",
        "**The rest of the list:** password reset, self-service deletion, request timeouts, error tracking beyond `console.error`, and renaming `gemini.ts` and removing the unused Gemini dependency.",
      ] },
      { t: "p", text: "Planned but deliberately not built: family profiles (one account, several health profiles), a shopping loop joining Safe Foods, diet plans and chat, and a WhatsApp bot. The weekly digest is half there: the content is computed, but nothing sends it, because no email provider is wired in." },

      { t: "h", text: "Who did what" },
      { t: "p", text: "The repository has 33 commits: 15 by Anant Tirupati, 18 by me. Anant built the application: the original Express version, the Next.js rewrite, accounts and health profiles, scan history, the health chat, diet plans and the Razorpay flow. My commits are the move to Bedrock (Nova Pro and Qwen3-VL), the Serper search fallback, multi-language results, and the August hardening pass: the allergen net, grounding, the JSON retry, the translation skip, usage caps, the server-side paywall, 30-day pricing, reformulation alerts, the legal pages and the project's documentation. The source is public on Anant's GitHub." },
    ],
  },
};
