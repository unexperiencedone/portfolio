# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS, deployed on Vercel. Chosen by the user (matches the stack of their existing client sites). Motion should stay lightweight: CSS / scroll-driven animation and IntersectionObserver first; add a motion library only where a specific interaction needs it.

## Users

- **Primary: technical evaluators deciding whether to hire or collaborate.** Internship and placement recruiters, research-lab and hackathon organisers, ML/engineering leads skimming a link from a resume, LinkedIn, or GitHub profile. They spend under a minute on a first pass and are asking: can this person ship real ML *and* real product, and is the evidence real?
- **Secondary: prospective small-business clients** reached through Kaiketsu Tech, who need to see production websites delivered for real organisations.
- Traffic arrives mostly on mobile from LinkedIn/Instagram/GitHub links, and on desktop from recruiter workflows.

## Product Purpose

A personal portfolio for **Aakshant Kumar** (also goes by Suraj). Its job is to turn a link click into a conversation, whether that's an email, a LinkedIn message, or a GitHub follow. Success means a visitor can name, within one scroll, two or three projects that prove both ML depth and shipped full-stack work, and knows how to get in touch.

## Positioning

A third-year B.Tech CSE (AI) student at CSJM University (UIET Kanpur), batch 2024–2028, who works on both sides of the stack. Aakshant fine-tunes and deploys models (DistilBERT NER, DQN agents, CNN audio classifiers, vision-language work on satellite imagery) and also ships production web platforms for paying clients through Kaiketsu Tech, the student dev collective they co-founded. Most student portfolios show one or the other. This one shows research-grade ML, national-hackathon results, and production client systems side by side.

## Operating Context

- Linked from resume, LinkedIn (linkedin.com/in/aakshant-kumar), GitHub (github.com/unexperiencedone), and hackathon/competition submissions.
- Evaluators often open project links (GitHub repos, Hugging Face Spaces, live client sites) straight from the portfolio, so outbound links must be obvious and correct.
- Content will grow each semester (active hackathons, competition entries, a paper in preparation), so the project model must accept new entries without redesign.

## Capabilities and Constraints

- Sections: hero, quick-scan credibility facts, project case studies (problem → build → outcome → stack → link), skills/stack, about/origin, contact.
- Projects ordered by impact, not chronology. An optional stack/type filter may come later, but only if it doesn't break the first-load narrative.
- Reading order is left-to-right, top-to-bottom. The audience is global and reads English.
- Must be fully responsive, with mobile treated as the primary experience.
- Must respect `prefers-reduced-motion`.
- Lighthouse performance and CLS must stay healthy. Textures should be CSS/SVG, not large rasters.
- **Resolved with the user (2026-09-14):** SatQuery AI and Drishtikon are one project. The railway overcrowding predictor and the DQN precedence simulator are shown as one combined project. Lead projects are VedaVoice, Robo Rumble 3.0, AirGated and Snake AI. All client work may be shown. The "TrueFare" alias is not used anywhere.
- **Still open:** no headshot, project screenshots or résumé PDF supplied. Live URLs are limited to homepage fields on the user's own GitHub repos (see Evidence on Hand).

## Brand Commitments

- Name: Aakshant Kumar. Agency/collective: Kaiketsu Tech (co-founder). Hackathon team: Void Walkers (leader).
- Public contact channels: kumaraakshant2005@gmail.com · github.com/unexperiencedone · linkedin.com/in/aakshant-kumar.
- The user's brief makes the manga-panel format binding for this surface (see surface brief / DESIGN.md once written). It is recorded here only as a binding constraint, not expanded.

## Evidence on Hand

Confirmed by the user (only these facts may appear as outcomes or metrics):

**Education**
- B.Tech CSE (AI), CSJM University / UIET Kanpur, 2024–2028. Current CGPA 8.26.
- Class XII (CBSE, PCM) 92.4%, Class X (CBSE) 90.2%.

**Experience**
- Data Visualization Analyst Intern, Excelerate, Aug–Sep 2025: Looker Studio dashboards, pandas/Jupyter EDA, SQL extraction, stakeholder presentations.
- Virtual intern, CodSoft: Python utility applications.
- Flowbit internship assignment: invoice analytics and NL-to-SQL chat.

**ML / research**
- **VedaVoice (Parchi / Smart Khata Ledger):** Hinglish voice-to-ledger for shopkeepers and site supervisors. Uses a custom NER model (fine-tuned DistilBERT), Llama-3 via Groq, Gemini 1.5, FastAPI, Next.js, Supabase, Twilio for WhatsApp udhaar-recovery reminders, and Docker on HF Spaces. **Finalist, Mind Installers Hackathon 4.0.**
- **Void / AmbiSense:** multimodal emotion/ambiguity detection. It grew out of a hybrid DistilBERT+LSTM emotion detector (TorchScript-optimised, on HF Spaces, React+Vite frontend). **Entered in the OpenCV AI Competition 2026.**
- **AirGated:** offline, un-spoofable attendance/identity verification using RSA-2048, WebSocket latency gating, ARP MAC resolution, and non-extractable IndexedDB keys. **Paper in preparation for arXiv. Do not describe it as submitted or published.**
- **Drishtikon / SatQuery AI:** agentic vision-language assistant for satellite imagery, adapted on BigEarthNet. SIH 2026, team VAYU, PS SIH26167 / SAC-01. Status: active.
- **Railway work:** SIH rail-overcrowding prediction (voidwalkers-csjmu/sih-25022-rail-project, Python) and a discrete-event RL simulator using DQN for train precedence optimisation.
- **Smart Home Ear:** environmental sound classification with a 2D CNN in PyTorch on ESC-50.
- **Snake AI:** DQN agent built from scratch.
- **Healthcare-3:** malnutrition detection, National Level AI Grand Challenge 2026.
- **Propely:** food-waste forecasting, HackForge hackathon.
- **SoilRx:** soil-personalised fertilizer prescription, as a startup/API concept with a pitch deck.
- **CSJMU Student Assistant:** RAG academic assistant.
- **VedCode:** GitHub repo visualiser, with a separate grant pitch deck.
- **AssisstantOS:** local voice/natural-language assistant that takes actions on the machine. Active.
- **Introvert–extrovert classifier:** Kaggle notebook comparing RandomForest, XGBoost, LogReg, a stacked ensemble, and an ANN.
- **placement_predictor:** first ML project, linear regression.

**Production web / client work (user confirmed all may be shown publicly)**
- **Robo Rumble 3.0:** official site for a national robotics competition (Next.js, React 19, TypeScript, Tailwind). Led frontend, backend and UI. **Authored 113 of 292 commits, the most of any contributor.**
- **Rise UP Public School** (Pipargaon, Bhadohi, UP): MERN with Next.js 14. Public site with 18 routes, a parent/student portal, and an admin panel. **81 REST endpoints**, JWT with refresh rotation, 7 roles with RBAC and row-level scoping. Razorpay order → verify → webhook with idempotent settlement. Email, SMS (MSG91) and WhatsApp notifications behind one orchestrator. The full 2026-27 academic calendar (55 entries) was transcribed from print. Source: `C:\commercial folder\RiseUpPublicSchool`.
- **Suhag Bindi Store:** boutique e-commerce on Next.js, PostgreSQL + Drizzle, Google OAuth plus credentials auth, a role-based admin inventory suite, dynamic sitemaps and metadata. Source: `C:\commercial folder\suhag-bindi-store`.
- **Komal Kalra:** consultation scheduling platform with booking modes, payment verification, WhatsApp, cron jobs, and Google auth. Source: `C:\commercial folder\komal_kalra`.
- **Devine Astro Talk** (`C:\commercial folder\astrotalk_website`), **Devine Digital Academy** landing page, **Book-a-Cab**, and an artificial jewellery e-commerce app.
- **Kaiketsu Tech:** the user's own student dev-collective site.

**GitHub:** 34 public repos, Pull Shark achievement.

**Journey notes (supplied by the user on 2026-09-15; shown on the site as four arcs):**
- Throughline: gamer → builder → founder; chess on Chess.com. **The user asked (2026-09-15) to say only "gamer": no in-game-leader role and no game title on the site.**
- Arc 1, Origin (late 2024 – late 2025): joined B.Tech CSE (AI) at CSJMU; Excelerate internship; Snake AI DQN; discrete-event rail simulation for the SIH overcrowding problem.
- Arc 2, Party (early 2026): Robo Rumble 3.0; Rise UP Public School (admissions flow, parent portal, notices, fee structure); formed Void Walkers for the SIH rail entry; Smart Home Ear.
- Arc 3, Awakening (spring – mid 2026):
  - VedaVoice: DistilBERT NER for code-mixed speech; Llama-3 on Groq for **sub-500 ms intent parsing**; Gemini 1.5 for context.
  - AmbiSense: flags disagreement between visual and spoken signals and escalates to a human only when needed. OpenCV AI Competition 2026, **Best Use of COOL and Agentic Vision tracks**. Target uses: classroom engagement, customer support, remote healthcare check-ins, accessibility.
  - AirGated: arXiv draft.
  - CSJMU Student Assistant: notices, syllabus, mock tests; fixed pgvector similarity-search and embedding-pipeline bottlenecks.
  - SoilRx: ideathon pitch deck.
  - Propely: institutional-kitchen demand forecasting, LightGBM, Next.js, SQLite, Claude API, **MAE 28.38, 95% service level**, HackForge.
  - **Kaiketsu Tech:** co-founder and VP Tech (www.kaiketsutech.online, HTTP 200 on 2026-09-15). The user placed this in Arc 3 and removed it from Arc 2.
  - GeoPathos: **removed at the user's request (2026-09-15). Do not show it on the site.**
- Arc 4, Horizon (late 2026, ongoing):
  - Drishtikon: SIH 2026, team VAYU, ISRO PS SIH26167 / SAC-01. Pivoted from an earlier team (Vision X) and an earlier concept, TrueFare (a real-time airfare price index for MoSPI/CPI augmentation).
  - **CivicPulse:** Build With Bharat 2.0, team Localhost (5 people, NIT Delhi finale); a Jurisdiction Registry routes complaints by department and municipality.
  - AssisstantOS: classify → plan → execute pipeline on Groq Llama-3.1, with local STT/TTS.
  - A self-built deep learning curriculum, a three.js "ronin cuts the world in half" intro scene, and premium sample sites.
- The notes themselves flag gaming/chess, Smart Home Ear and Urdu poetry/macro photography as "from your notes". The user gave all three directly in the first interview, so they are treated as confirmed.

**Language:** Hindi appears in Devanagari script, never romanised. First-person Hindi is written as gender-neutral noun phrases, because the user's gender hasn't been stated and Hindi verbs are gendered. The user's name is not rendered in Devanagari until they confirm a spelling.

**Skills (from the user's résumé paste):** Python, pandas, NumPy, scikit-learn, TensorFlow/Keras, PyTorch, SQL; Transformers (DistilBERT), LSTM, NER, RL (DQN), hyperparameter tuning; Flask, FastAPI, Docker, TorchScript, Hugging Face Spaces, Git/GitHub. Platforms: Vercel, Google Cloud Run, Hugging Face Spaces, Kaggle, Looker Studio. Web: Next.js, React, TypeScript, Tailwind CSS, PostgreSQL, Supabase.

**Sourced from the user's own public GitHub repos** (api.github.com/users/unexperiencedone/repos, fetched 2026-09-14). Repo descriptions and homepage fields set by the account owner:
- student_assistant_system: "RAG-powered student companion dashboard for CSJMU. Built with Next.js, AWS Bedrock"
- vedcode-ai4bharat: hackathon project for AI4Bharat; homepage vedcode-ai4bharat.vercel.app
- artificial-jewellery-app: "ecommerce app for Lumière artificial jewellery. JWT + OAuth auth, USER/ADMIN roles". The homepage returned HTTP 500 on 2026-09-14, so the site links to the repo instead.
- devine-digital-academy: "landing page for Devine Digital Academy's Digital Marketing Certification"; homepage devine-digital-academy.vercel.app (HTTP 200 on 2026-09-14)
- Live homepages: vedavoice.vercel.app, robo-rumble-3-0.vercel.app, riseuppublicschool.vercel.app, komal-kalra.vercel.app, suhag-bindi-store.vercel.app, emotion-classification-work-fronten.vercel.app
- Repos: snake_ai_using_rl, Crowd-Management-Project, Propely, introvert-extrovert-classifier-, voidwalkers-csjmu/sih-25022-rail-project

**Personal (usable in the about beat):** based in Kanpur, UP. Competitive chess on Chess.com (insanelyhuman). Writes original Urdu poetry. A gamer (keep it at that; see the note above). Macro photography and sketching.

**Must not be fabricated:** testimonials, client logos, user counts, traffic or revenue figures, accuracy/F1 scores (none supplied), hackathon placements beyond those listed, publication status.

**Must not be published:** date of birth, family members' names, collaborators' names, personal device details, or anything from the assistant-memory notes the user pasted.

## Product Principles

1. **Proof over adjectives.** Every project claim is backed by a concrete fact from Evidence on Hand. If no metric exists, show the mechanism and don't invent a number.
2. **Both halves, early.** A visitor should see ML depth and shipped production work within the first few beats, not buried in one or the other.
3. **Every project answers "why hire me."** Frame each one as problem → build → outcome, not a gallery tile.
4. **Honest status.** Active, entered, finalist and in-preparation are distinct states, and the copy never rounds them up.
5. **Contact is always one tap away.**

## Accessibility & Inclusion

WCAG 2.2 AA contrast on every ink, paper and accent pairing. Keyboard-reachable CTAs with visible focus. Alt text on all panel imagery. The `prefers-reduced-motion` fallback uses simple crossfades with no snap or flash effects, and nothing flashes more than three times per second.
