// The journey, told as arcs (पर्व — the way the Mahabharata is divided). Facts from the user's journey notes; see PRODUCT.md.

export type Episode = { title: string; text: string; link?: { label: string; href: string } };

export type Arc = {
  id: string;
  n: number;
  name: string;
  nameHi: string;
  period: string;
  theme: string;
  ongoing?: boolean;
  episodes: Episode[];
  unlocked: string[];
};

export const prologue = {
  title: "Gamer to builder to founder",
  titleHi: "खिलाड़ी से निर्माता, निर्माता से संस्थापक",
};

export const arcs: Arc[] = [
  {
    id: "arc-origin",
    n: 1,
    name: "Origin Arc",
    nameHi: "आरंभ पर्व",
    period: "Late 2024 – Late 2025",
    theme: "Foundations and systems",
    episodes: [
      { title: "Onto campus", text: "Started B.Tech CSE with an AI specialisation at CSJM University, Kanpur. Core computing before anything applied." },
      {
        title: "First field mission",
        text: "Data Visualization Analyst intern at Excelerate (Aug–Sep 2025): Looker Studio dashboards, EDA in pandas and Jupyter, SQL extraction, insights presented to stakeholders.",
      },
      {
        title: "First agent",
        text: "Snake AI, a Deep Q-Network that learns Snake from scratch. My first real reinforcement-learning build, later followed by a discrete-event rail simulation for the SIH overcrowding problem.",
      },
    ],
    unlocked: ["Python", "pandas", "SQL", "Looker Studio", "DQN"],
  },
  {
    id: "arc-party",
    n: 2,
    name: "Party Arc",
    nameHi: "दल पर्व",
    period: "Early 2026",
    theme: "Architecture and rapid prototyping",
    episodes: [
      { title: "Robo Rumble 3.0", text: "The national robotics competition's official site in Next.js, React 19, TypeScript and Tailwind. 113 of 292 commits, the most of anyone." },
      { title: "Rise UP Public School", text: "A production school platform: admissions flow, parent portal, notices and fee structure." },
      { title: "Assembling the party", text: "Formed Void Walkers, the hackathon squad behind the SIH rail-overcrowding entry: useful software, demo-ready under deadline." },
      { title: "Sound and perception", text: "Smart Home Ear, a PyTorch 2D CNN trained on environmental sound." },
    ],
    unlocked: ["Next.js", "React 19", "TypeScript", "Tailwind CSS", "PyTorch"],
  },
  {
    id: "arc-awakening",
    n: 3,
    name: "Awakening Arc",
    nameHi: "जागरण पर्व",
    period: "Spring – Mid 2026",
    theme: "Domain-specific AI and multimodal engineering",
    episodes: [
      {
        title: "VedaVoice",
        text: "Voice-to-ledger for shopkeepers: DistilBERT NER for code-mixed speech, Llama-3 on Groq for intent parsing in under 500 ms. Finalist, Mind Installers Hackathon 4.0.",
      },
      {
        title: "Void / AmbiSense",
        text: "An emotion classifier grew into a multimodal ambiguity detector. Entered in the OpenCV AI Competition 2026 (Best Use of COOL and Agentic Vision tracks).",
      },
      { title: "AirGated", text: "Offline, un-spoofable attendance verification. Paper being drafted for arXiv." },
      { title: "CSJMU Student Assistant", text: "RAG over notices, syllabus and mock tests. Fixed pgvector similarity-search and embedding-pipeline bottlenecks." },
      { title: "Propely and SoilRx", text: "Propely forecasts kitchen demand to cut food waste (LightGBM, MAE 28.38 at a 95% service level). SoilRx pitched soil-personalised fertilizer prescriptions at an ideathon." },
      {
        title: "Kaiketsu Tech",
        text: "Co-founder and VP Tech. Turned personal dev skill into client work, and built the agency's own site as a monochrome, motion-driven build.",
        link: { label: "kaiketsutech.online", href: "https://www.kaiketsutech.online" },
      },
    ],
    unlocked: ["DistilBERT NER", "LSTM", "TorchScript", "Llama-3 on Groq", "pgvector", "LightGBM"],
  },
  {
    id: "arc-horizon",
    n: 4,
    name: "Horizon Arc",
    nameHi: "क्षितिज पर्व",
    period: "Late 2026",
    theme: "Remote sensing, edge research, what's next",
    ongoing: true,
    episodes: [
      {
        title: "Drishtikon",
        text: "Smart India Hackathon 2026 with team VAYU: an agentic vision-language assistant for satellite imagery on an ISRO problem statement, after pivoting from an earlier team and an airfare price-index concept.",
      },
      { title: "CivicPulse", text: "Build With Bharat 2.0 with team Localhost: civic complaints routed by department and municipality through a Jurisdiction Registry." },
      { title: "AssisstantOS", text: "A local assistant that acts on the machine: classify, plan, execute on Llama-3.1, with local speech in and out." },
      {
        title: "Training arc",
        text: "A self-built deep learning curriculum meant to beat any course, a three.js intro scene where a ronin cuts the world in half, and a run of premium sample sites.",
      },
    ],
    unlocked: ["Vision-language models", "Agentic pipelines", "three.js"],
  },
];

const devanagariDigits = "०१२३४५६७८९";
export const toDevanagari = (n: number) => String(n).replace(/\d/g, (d) => devanagariDigits[Number(d)]);
