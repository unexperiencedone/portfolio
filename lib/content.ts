// Every fact on the page lives here. Only user-confirmed facts: see PRODUCT.md → Evidence on Hand.

export const person = {
  name: "Aakshant Kumar",
  alias: "Suraj",
  location: "Kanpur, Uttar Pradesh",
  line: "I train models and ship the products around them.",
  /** gender-neutral Hindi: "from training models to shipping products" */
  lineHi: "मॉडल की ट्रेनिंग से प्रोडक्ट की शिपिंग तक।",
  sub: "Third-year B.Tech CSE (AI) at CSJM University, Kanpur. Co-founder and VP Tech at Kaiketsu Tech, and founder of hackathon squad Void Walkers.",
  kaiketsu: "https://www.kaiketsutech.online",
  email: "kumaraakshant2005@gmail.com",
  github: "https://github.com/unexperiencedone",
  githubHandle: "unexperiencedone",
  linkedin: "https://www.linkedin.com/in/kumaraakshant",
  linkedinHandle: "aakshant-kumar",
} as const;

export type Link = { label: string; href: string; kind: "live" | "source" | "ask" };

export type Status = "Finalist" | "Shipped" | "In production" | "Paper in prep" | "Active" | "Entered" | "Built";

export type Project = {
  id: string;
  title: string;
  aka?: string;
  status: Status;
  context: string;
  problem: string;
  built: string;
  outcome: string;
  /** true when the outcome is a hard, verifiable result worth the editor's circle */
  outcomeIsProof: boolean;
  stack: string[];
  links: Link[];
};

const ask = (project: string): Link => ({
  label: "Ask me about it",
  href: `mailto:${person.email}?subject=${encodeURIComponent(`About ${project}`)}`,
  kind: "ask",
});

export const leadProjects: Project[] = [
  {
    id: "vedavoice",
    title: "VedaVoice",
    aka: "Parchi",
    status: "Finalist",
    context: "Mind Installers Hackathon 4.0",
    problem:
      "Shopkeepers and site supervisors keep उधार (credit) in paper खाता ledgers, and they talk in mixed Hindi and English, not in forms.",
    built:
      "Say the transaction out loud. A DistilBERT NER model fine-tuned for code-mixed speech pulls out who, how much and what kind. Llama-3 on Groq parses intent in under 500 ms, Gemini 1.5 adds context, Supabase keeps the ledger, and Twilio sends WhatsApp reminders to recover उधार.",
    outcome: "Finalist, Mind Installers Hackathon 4.0",
    outcomeIsProof: true,
    stack: ["DistilBERT", "NER", "FastAPI", "Next.js", "Supabase", "Docker", "Hugging Face Spaces"],
    links: [
      { label: "Live app", href: "https://vedavoice.vercel.app", kind: "live" },
      { label: "Source", href: "https://github.com/unexperiencedone/vedavoice", kind: "source" },
    ],
  },
  {
    id: "robo-rumble",
    title: "Robo Rumble 3.0",
    status: "Shipped",
    context: "Official site, national robotics competition",
    problem: "A national robotics competition needed its official website, carrying the event to every team and visitor.",
    built: "Led the frontend, backend and UI in Next.js, React 19, TypeScript and Tailwind CSS.",
    outcome: "113 of 292 commits, the most of any contributor",
    outcomeIsProof: true,
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    links: [
      { label: "Live site", href: "https://robo-rumble-3-0.vercel.app", kind: "live" },
      { label: "Source", href: "https://github.com/unexperiencedone/robo-rumble-3.0", kind: "source" },
    ],
  },
  {
    id: "airgated",
    title: "AirGated",
    status: "Paper in prep",
    context: "Offline identity & attendance verification",
    problem:
      "Attendance is easy to fake: a forwarded link or a friend's phone marks you present. AirGated also has to work with no internet at all.",
    built:
      "Presence is proven by the room's own network. It combines RSA-2048 signatures, WebSocket latency gating, ARP MAC resolution, and browser keys stored as non-extractable in IndexedDB, so they can't be copied off the device.",
    outcome: "Paper in preparation for arXiv",
    outcomeIsProof: true,
    stack: ["RSA-2048", "WebSockets", "IndexedDB", "Web Crypto"],
    links: [ask("AirGated")],
  },
  {
    id: "snake-ai",
    title: "Snake AI",
    status: "Built",
    context: "Reinforcement learning from scratch",
    problem: "Can an agent learn a game from nothing but reward?",
    built: "A Deep Q-Network agent that learns to play Snake, built from scratch.",
    outcome: "DQN shows up again in my Indian Railways precedence simulator.",
    outcomeIsProof: false,
    stack: ["DQN", "Reinforcement learning"],
    links: [{ label: "Source", href: "https://github.com/unexperiencedone/snake_ai_using_rl", kind: "source" }],
  },
];

export const midProjects: Project[] = [
  {
    id: "rise-up",
    title: "Rise UP Public School",
    status: "In production",
    context: "School website, parent portal & admin panel",
    problem: "Rise UP Public School in Bhadohi, UP needed a public site, a parent and student portal, and an admin panel, all backed by one secure API.",
    built:
      "MERN with Next.js 14. JWT with refresh rotation, 7 roles with RBAC and row-level scoping, idempotent Razorpay settlement, and email, SMS and WhatsApp behind one orchestrator.",
    outcome: "81 REST endpoints, 7 roles, one API",
    outcomeIsProof: true,
    stack: ["Next.js", "Express", "MongoDB", "Razorpay"],
    links: [
      { label: "Live site", href: "https://riseuppublicschool.vercel.app", kind: "live" },
      { label: "Source", href: "https://github.com/unexperiencedone/riseuppublicschool", kind: "source" },
    ],
  },
  {
    id: "drishtikon",
    title: "Drishtikon",
    aka: "SatQuery AI",
    status: "Active",
    context: "Smart India Hackathon 2026 · team VAYU · ISRO PS SIH26167",
    problem: "Satellite imagery is rich, but asking it a plain-language question still takes a remote-sensing specialist.",
    built: "An agentic vision-language assistant for multimodal satellite image analysis, with models adapted on the BigEarthNet dataset.",
    outcome: "In progress for SIH 2026 (SAC-01)",
    outcomeIsProof: false,
    stack: ["Vision-language models", "BigEarthNet"],
    links: [ask("Drishtikon")],
  },
  {
    id: "railways",
    title: "Indian Railways, two ways",
    status: "Built",
    context: "Smart India Hackathon · team Void Walkers",
    problem: "Overcrowded trains and delay knock-ons: which trains get priority, and where will the crowd be?",
    built:
      "An ML model that predicts crowd levels, plus a discrete-event simulator where a Deep Q-Network learns train precedence.",
    outcome: "Prediction and control in one project",
    outcomeIsProof: false,
    stack: ["Python", "DQN", "Reinforcement learning"],
    links: [
      { label: "SIH repo", href: "https://github.com/voidwalkers-csjmu/sih-25022-rail-project", kind: "source" },
      { label: "Crowd model", href: "https://github.com/unexperiencedone/Crowd-Management-Project", kind: "source" },
    ],
  },
  {
    id: "ambisense",
    title: "Void / AmbiSense",
    status: "Entered",
    context: "OpenCV AI Competition 2026 · Best Use of COOL & Agentic Vision tracks",
    problem: "People rarely say how they feel in plain words. Emotion is ambiguous and context-bound.",
    built:
      "Started as a hybrid DistilBERT + LSTM emotion classifier, TorchScript-optimised on Hugging Face Spaces. Now a multimodal ambiguity detector: it flags when what a face shows and what a voice says disagree, instead of forcing a confident label, and hands off to a human only when it matters.",
    outcome: "Entered, OpenCV AI Competition 2026",
    outcomeIsProof: true,
    stack: ["DistilBERT", "LSTM", "TorchScript", "Hugging Face Spaces", "React"],
    links: [{ label: "Classifier demo", href: "https://emotion-classification-work-fronten.vercel.app", kind: "live" }],
  },
];

export type Short = { title: string; note: string; tag: string; href?: string; stack: string[] };

export const shortML: Short[] = [
  { title: "Smart Home Ear", note: "Environmental sound classification: a 2D CNN in PyTorch trained on ESC-50.", tag: "Audio", stack: ["PyTorch"] },
  {
    title: "CSJMU Student Assistant",
    note: "RAG assistant for CSJMU notices, syllabus and mock tests on AWS Bedrock. Tracked down and fixed pgvector similarity-search and embedding-pipeline bottlenecks.",
    tag: "RAG", stack: ["Next.js"],
    href: "https://github.com/unexperiencedone/student_assistant_system",
  },
  { title: "Healthcare-3", note: "Malnutrition detection for the National Level AI Grand Challenge 2026.", tag: "Vision", stack: [] },
  {
    title: "Introvert vs. extrovert",
    note: "Kaggle personality classification comparing RandomForest, XGBoost, logistic regression, a stacked ensemble and an ANN.",
    tag: "Kaggle",
    href: "https://github.com/unexperiencedone/introvert-extrovert-classifier-",
    stack: ["XGBoost"],
  },
  { title: "Propely", note: "Demand forecasting to cut food waste in institutional kitchens: LightGBM, Next.js, SQLite and the Claude API. MAE 28.38 at a 95% service level. Built at HackForge.", tag: "Forecasting", href: "https://github.com/unexperiencedone/Propely", stack: ["Python", "Next.js", "LightGBM"] },
  { title: "SoilRx", note: "Soil-personalised fertilizer prescriptions as an API: startup concept with an ideathon pitch deck.", tag: "Concept", stack: [] },
  {
    title: "VedCode",
    note: "A visual explorer for GitHub repositories, built for AI4Bharat, with a grant pitch alongside.",
    tag: "DevTools", stack: ["TypeScript"],
    href: "https://vedcode-ai4bharat.vercel.app",
  },
  {
    title: "CivicPulse",
    note: "Civic issue reporting and escalation for Build With Bharat 2.0 with team Localhost. A Jurisdiction Registry routes complaints by department and municipality, not category alone.",
    tag: "Civic",
    stack: [],
  },
  {
    title: "AssisstantOS",
    note: "A local natural-language assistant that takes real actions on the machine: classify, plan, execute on Groq's Llama-3.1, with local speech-to-text and text-to-speech.",
    tag: "Agents",
    stack: [],
  },
];

export const clientWork: Short[] = [
  { title: "Suhag Bindi Store", note: "Boutique e-commerce: PostgreSQL + Drizzle, Google OAuth, admin inventory.", tag: "Commerce", href: "https://suhag-bindi-store.vercel.app", stack: ["Next.js", "PostgreSQL", "TypeScript"] },
  { title: "Komal Kalra", note: "Consultation booking with payment verification, WhatsApp and cron jobs.", tag: "Booking", href: "https://komal-kalra.vercel.app", stack: ["Next.js", "TypeScript"] },
  { title: "Lumière Jewellery", note: "E-commerce for an artificial-jewellery brand, with JWT + OAuth auth and user and admin roles.", tag: "Commerce", href: "https://github.com/unexperiencedone/artificial-jewellery-app", stack: ["Next.js", "TypeScript"] },
  { title: "Devine Digital Academy", note: "Landing page for a digital marketing certification.", tag: "Landing", href: "https://devine-digital-academy.vercel.app", stack: ["Next.js", "TypeScript"] },
  { title: "Devine Astro Talk", note: "Astrology consultation platform.", tag: "Platform", stack: ["Next.js"] },
  { title: "Book-a-Cab", note: "Cab booking web app.", tag: "Booking", stack: ["Next.js"] },
];

const internship = { stack: ["pandas", "SQL", "Looker Studio", "Python"] };

export type SkillGroup = { name: string; nameHi: string; skills: string[] };

export const skillGroups: SkillGroup[] = [
  {
    name: "Models",
    nameHi: "मॉडल",
    skills: ["PyTorch", "TensorFlow / Keras", "scikit-learn", "DistilBERT", "LSTM", "NER", "DQN", "Vision-language models", "XGBoost"],
  },
  {
    name: "Data & serving",
    nameHi: "डेटा और सर्विंग",
    skills: ["Python", "pandas", "NumPy", "SQL", "FastAPI", "Flask", "Docker", "TorchScript", "Hugging Face Spaces", "Google Cloud Run", "Looker Studio", "LightGBM"],
  },
  {
    name: "Product",
    nameHi: "प्रोडक्ट",
    skills: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "MongoDB", "Express", "Vercel"],
  },
];

/** How many projects on this page use a skill — the skill sheet's ink weight is derived, never self-rated. */
export function skillUse(skill: string): number {
  const key = skill.split(" / ")[0].toLowerCase();
  const work: { stack: string[] }[] = [...leadProjects, ...midProjects, ...shortML, ...clientWork, internship];
  return work.filter((p) => p.stack.some((s) => s.toLowerCase() === key)).length;
}

export const about = {
  paragraphs: [
    "I came up as a gamer, and I still play chess on Chess.com as insanelyhuman. Somewhere along the way the centre of gravity moved from playing to building.",
    "Now it's websites, products, research and business ideas, turning a stack of separate skills into something people can use. I pick premium craft over templates, I'm as happy arguing about backend routing as about a hero animation, and I'm just as likely to spend a night on an Urdu couplet as on an architecture diagram.",
  ],
  facts: [
    { label: "Studying", value: "B.Tech CSE (AI), CSJM University, 2024–2028 · CGPA 8.26" },
    { label: "Interned", value: "Data Visualization Analyst, Excelerate (Aug–Sep 2025): Looker Studio, pandas, SQL" },
    { label: "Off the clock", value: "Gaming · chess on Chess.com as insanelyhuman · original Urdu poetry · macro photography & sketching" },
  ],
};
