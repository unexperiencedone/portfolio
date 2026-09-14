import type { ReactNode } from "react";
import { clientWork, type Link, person, type Project, type Short, shortML } from "@/lib/content";
import { AirGatedArt, CommitArt, SnakeArt, VedaVoiceArt } from "./Art";
import type { IllustrationId } from "@/lib/illustrations";
import { ArrowOut, GitHub, Mail } from "./Icons";
import { IfInk, Illustration } from "./Illustration";
import { Circled, Panel, Stamp } from "./Panel";

const art: Record<string, ReactNode> = {
  vedavoice: <VedaVoiceArt />,
  "robo-rumble": <CommitArt />,
  airgated: <AirGatedArt />,
  "snake-ai": <SnakeArt />,
};

const scene: Record<string, IllustrationId> = {
  vedavoice: "vedavoice-scene",
  "robo-rumble": "roborumble-scene",
  airgated: "airgated-scene",
  "snake-ai": "snake-scene",
  "rise-up": "riseup-scene",
  drishtikon: "drishtikon-scene",
  railways: "railways-scene",
  ambisense: "ambisense-scene",
};

const solidStatus = new Set(["Finalist", "In production", "Shipped"]);

function StatusStamp({ status }: { status: Project["status"] }) {
  return (
    <Stamp solid={solidStatus.has(status)} dashed={status === "Active" || status === "Paper in prep"}>
      {status}
    </Stamp>
  );
}

function LinkRow({ links, project }: { links: Link[]; project: string }) {
  return (
    <ul className="flex flex-wrap gap-2.5">
      {links.map((l) => {
        const external = l.kind !== "ask";
        return (
          <li key={l.href}>
            <a
              className={`btn btn--small ${l.kind === "live" ? "btn--spot" : ""}`}
              href={l.href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              aria-label={`${l.label}: ${project}${external ? " (opens in a new tab)" : ""}`}
            >
              {l.kind === "source" ? <GitHub size={16} /> : l.kind === "ask" ? <Mail size={16} /> : null}
              {l.label}
              {l.kind === "live" && <ArrowOut size={16} />}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

function Beat({ label, labelHi, children, className = "" }: { label: string; labelHi: string; children: ReactNode; className?: string }) {
  return (
    <div className={`caption ${className}`}>
      <span className="caption-label">
        {label} · <span lang="hi">{labelHi}</span>
      </span>
      {children}
    </div>
  );
}

function Outcome({ p, size = "lg" }: { p: Project; size?: "lg" | "md" }) {
  const cls = size === "lg" ? "text-[1.3rem] sm:text-[1.45rem]" : "text-[1.15rem]";
  return (
    <p className={`title-ink ${cls} leading-tight`}>
      {p.outcomeIsProof ? <Circled>{p.outcome}</Circled> : <span className="border-b-[3px] border-dashed border-ink">{p.outcome}</span>}
    </p>
  );
}

export function LeadProject({ p, n, flip }: { p: Project; n: number; flip: boolean }) {
  const titleId = `${p.id}-title`;
  return (
    <Panel id={p.id} n={n} label={p.title} impact labelledBy={titleId} bodyClassName="p-5 sm:p-8 lg:p-10">
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
        <div>
          <h3 id={titleId} className="title-ink text-[clamp(2.1rem,5.4vw,3.5rem)]">
            {p.title}
            {p.aka && <span className="ml-3 align-middle text-[0.4em] font-bold tracking-normal text-ink-2">a.k.a. {p.aka}</span>}
          </h3>
          <p className="mt-2 font-bold text-ink-2">{p.context}</p>
        </div>
        <StatusStamp status={p.status} />
      </div>

      {scene[p.id] && (
        <IfInk id={scene[p.id]}>
          <div className="panel panel--inset mt-7 aspect-[2/1] overflow-hidden">
            <Illustration id={scene[p.id]} sizes="(min-width: 1280px) 1100px, 92vw" />
          </div>
        </IfInk>
      )}

      <div className="mt-7 grid gap-6 lg:grid-cols-12 lg:gap-8">
        <div className={`panel panel--inset min-h-[300px] min-w-0 lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>{art[p.id]}</div>

        <div className={`flex flex-col gap-8 pt-3 lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
          <Beat label="Problem" labelHi="समस्या">
            <p className="leading-relaxed">{p.problem}</p>
          </Beat>
          <Beat label="Built" labelHi="निर्माण">
            <p className="leading-relaxed">{p.built}</p>
          </Beat>
          <Beat label={p.outcomeIsProof ? "Outcome" : "Where it led"} labelHi={p.outcomeIsProof ? "परिणाम" : "आगे की राह"} className="!pb-5">
            <Outcome p={p} />
          </Beat>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-5 border-t-[3px] border-ink pt-6 md:flex-row md:items-center md:justify-between">
        <ul className="flex flex-wrap gap-2" aria-label={`${p.title} stack`}>
          {p.stack.map((s) => (
            <li key={s} className="badge">
              {s}
            </li>
          ))}
        </ul>
        <LinkRow links={p.links} project={p.title} />
      </div>
    </Panel>
  );
}

export function MidProject({ p, n, className = "" }: { p: Project; n: number; className?: string }) {
  const titleId = `${p.id}-title`;
  return (
    <Panel id={p.id} n={n} label={p.title} impact labelledBy={titleId} className={className} bodyClassName="flex h-full flex-col p-5 sm:p-7">
      {scene[p.id] && (
        <IfInk id={scene[p.id]}>
          <div className="-mx-5 -mt-5 mb-6 aspect-video overflow-hidden border-b-[3px] border-ink sm:-mx-7 sm:-mt-7">
            <Illustration id={scene[p.id]} sizes="(min-width: 1024px) 640px, 92vw" />
          </div>
        </IfInk>
      )}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 id={titleId} className="title-ink text-[clamp(1.6rem,3.2vw,2.2rem)]">
          {p.title}
          {p.aka && <span className="mt-1 block text-base font-bold tracking-normal text-ink-2">a.k.a. {p.aka}</span>}
        </h3>
        <StatusStamp status={p.status} />
      </div>
      <p className="mt-2 text-sm font-bold text-ink-2">{p.context}</p>
      <p className="mt-5 leading-relaxed text-ink-2">{p.problem}</p>
      <p className="mt-3 leading-relaxed">{p.built}</p>
      <div className="mt-7 mb-7">
        <Outcome p={p} size="md" />
      </div>
      <div className="mt-auto flex flex-col gap-4 border-t-2 border-ink pt-5">
        <ul className="flex flex-wrap gap-2" aria-label={`${p.title} stack`}>
          {p.stack.map((s) => (
            <li key={s} className="badge">
              {s}
            </li>
          ))}
        </ul>
        <LinkRow links={p.links} project={p.title} />
      </div>
    </Panel>
  );
}

/* A panel on a manga page. Linked panels invert to ink on hover, like a reversed-out frame. */
function PagePanel({ s, className = "", big = false }: { s: Short; className?: string; big?: boolean }) {
  const external = !!s.href;
  const inner = (
    <>
      <span className={`block font-black leading-tight ${big ? "text-[1.6rem]" : "text-lg"}`}>{s.title}</span>
      <span className="mt-2 block text-[0.9375rem] leading-snug text-ink-2 group-hover:text-paper">{s.note}</span>
      {external && (
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-black underline decoration-spot decoration-[3px] underline-offset-4">
          {s.href!.includes("github.com") ? "Source" : "Visit the site"} <ArrowOut size={15} />
          <span className="sr-only"> (opens in a new tab)</span>
        </span>
      )}
    </>
  );
  return (
    <li className={`panel ${className}`} data-ink="">
      <div className="panel-body">
        {external ? (
          <a href={s.href} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col p-4 no-underline sm:p-5 transition-colors duration-150 hover:bg-ink hover:text-paper">
            {inner}
          </a>
        ) : (
          <div className="flex h-full flex-col p-4 sm:p-5">{inner}</div>
        )}
      </div>
    </li>
  );
}

/* the page's narration panel: the heading lives in a panel of its own */
function NarrationPanel({ id, title, titleHi, children, className = "" }: { id: string; title: string; titleHi: string; children: ReactNode; className?: string }) {
  return (
    <li className={`panel panel--splash ${className}`} data-ink="">
      <div className="panel-body flex h-full flex-col justify-between gap-6 p-6 sm:p-7">
        <div>
          <h3 id={id} className="title-ink text-[clamp(1.8rem,3.4vw,2.6rem)]">
            {title}
          </h3>
          <p className="sfx-hi mt-2 text-[clamp(2rem,4.4vw,3rem)] leading-none" lang="hi">
            {titleHi}
          </p>
        </div>
        <div className="text-ink-2">{children}</div>
      </div>
    </li>
  );
}

// Hand-placed tiers on a 6-column page: sizes say which beat is bigger, not the order of the data.
const shortTiers = [
  "col-span-2 lg:col-span-3", // Smart Home Ear
  "col-span-2 lg:col-span-2", // Student Assistant
  "col-span-1 lg:col-span-2", // Healthcare-3
  "col-span-1 lg:col-span-2", // Introvert vs extrovert
  "col-span-2 lg:col-span-3", // Propely
  "col-span-2 lg:col-span-3", // SoilRx
  "col-span-2 lg:col-span-6", // VedCode
  "col-span-2 lg:col-span-3", // CivicPulse
  "col-span-2 lg:col-span-3", // AssisstantOS
];

export function ShortChapters({ n }: { n: number }) {
  return (
    <section id="shorter" data-panel={n} data-panel-label="Shorter chapters" aria-labelledby="shorter-title">
      <ul className="grid grid-cols-2 gap-3 lg:grid-cols-6 lg:gap-3.5">
        <NarrationPanel id="shorter-title" title="Side quests" titleHi="उप-कथाएँ" className="col-span-2 lg:col-span-3">
          <p className="max-w-[36ch] font-bold">Hackathon builds, experiments and concepts. Smaller panels, same ink.</p>
        </NarrationPanel>
        {shortML.map((s, i) => (
          <PagePanel key={s.title} s={s} className={shortTiers[i]} big={i === 0} />
        ))}
      </ul>
    </section>
  );
}

const clientTiers = [
  "col-span-1 lg:col-span-2", // Suhag Bindi Store
  "col-span-1 lg:col-span-2", // Komal Kalra
  "col-span-2 lg:col-span-4", // Lumière
  "col-span-2 lg:col-span-3", // Devine Digital Academy
  "col-span-1 lg:col-span-2", // Devine Astro Talk
  "col-span-1 lg:col-span-1", // Book-a-Cab
];

export function ClientWork({ n }: { n: number }) {
  return (
    <section id="clients" data-panel={n} data-panel-label="Client work" aria-labelledby="clients-title">
      <ul className="grid grid-cols-2 gap-3 lg:grid-cols-6 lg:gap-3.5">
        <NarrationPanel id="clients-title" title="Guild contracts" titleHi="संघ के अनुबंध" className="col-span-2 lg:col-span-2 lg:row-span-2">
          <p className="max-w-[38ch] leading-relaxed">
            Client work through Kaiketsu Tech, the student developer guild I co-founded and run tech for as VP Tech. Sites for real businesses, alongside Rise UP Public School above.
          </p>
          <a className="link-ink mt-4" href={person.kaiketsu} target="_blank" rel="noopener noreferrer">
            kaiketsutech.online <ArrowOut size={15} />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </NarrationPanel>
        {clientWork.map((s, i) => (
          <PagePanel key={s.title} s={s} className={clientTiers[i]} big={i === 2} />
        ))}
      </ul>
    </section>
  );
}
