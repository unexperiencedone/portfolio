import type { ReactNode } from "react";
import { SpeedLines } from "./SpeedLines";

type PanelProps = {
  id?: string;
  /** reading-order number for the page counter; omit for insets inside a panel */
  n?: number;
  label?: string;
  variant?: "splash" | "medium" | "inset";
  impact?: boolean;
  clip?: boolean;
  as?: "article" | "section" | "div" | "aside" | "li";
  className?: string;
  bodyClassName?: string;
  labelledBy?: string;
  children: ReactNode;
};

export function Panel({
  id,
  n,
  label,
  variant = "medium",
  impact = false,
  clip = false,
  as: Tag = "article",
  className = "",
  bodyClassName = "",
  labelledBy,
  children,
}: PanelProps) {
  const classes = [
    "panel",
    variant === "splash" && "panel--splash",
    variant === "inset" && "panel--inset",
    impact && "panel--impact",
    clip && "panel--clip",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag
      id={id}
      className={classes}
      data-ink=""
      data-panel={n}
      data-panel-label={label}
      aria-labelledby={labelledBy}
    >
      {impact && <span className="impact-corner" aria-hidden="true" />}
      <div className={`panel-body ${bodyClassName}`}>{children}</div>
    </Tag>
  );
}

/** The editor's spot-ink circle. Wrap only verifiable proof in it. */
export function Circled({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`relative inline-block ${className}`}>
      {children}
      <svg className="circle-mark" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path
          pathLength={1}
          d="M9 4.5C35 2.6 70 2.4 92 3.6 97.6 4 98.4 9 98.2 20 98 31 97 36.6 90 37 62 38.2 30 38 9 36.8 2.6 36.4 1.8 31 1.8 20 1.8 9.5 3 5.4 12 4 24 2.8 34 2.6 44 2.4"
        />
      </svg>
    </span>
  );
}

export function Stamp({ children, solid = false, dashed = false }: { children: ReactNode; solid?: boolean; dashed?: boolean }) {
  return <span className={`stamp ${solid ? "stamp--solid" : ""} ${dashed ? "stamp--dashed" : ""}`}>{children}</span>;
}

export function PencilArrow({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="64" height="40" viewBox="0 0 64 40" fill="none" aria-hidden="true" focusable="false">
      <path d="M3 6c14 1 30 7 40 20" stroke="var(--spot)" strokeWidth="3" strokeLinecap="round" />
      <path d="M33 25.5 44 28l1.5-11" stroke="var(--spot)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** A structural transition: spot ink floods the gutter right-to-left, once. Only two exist. */
export function Flood({ id, word, hindi, line, focus = { x: 700 } }: { id: string; word: string; hindi: string; line: string; focus?: { x: number } }) {
  return (
    <section id={id} className="flood" data-ink="" aria-labelledby={`${id}-title`}>
      <div className="flood-field" aria-hidden="true" />
      <div className="flood-lines" aria-hidden="true">
        <SpeedLines className="h-full w-full" fx={focus.x} fy={300} clear={210} count={190} seed={focus.x} />
      </div>
      <div className="relative z-10 px-4 py-14 text-center">
        <h2
          id={`${id}-title`}
          className="sfx text-ink"
          style={{
            fontSize: "clamp(3.25rem, 12vw, 6rem)",
            paintOrder: "stroke fill",
            WebkitTextStroke: "0.16em var(--paper)",
            transform: "rotate(-3deg)",
          }}
        >
          {word}
        </h2>
        <p
          className="sfx-hi mt-3 text-ink"
          lang="hi"
          style={{
            fontSize: "clamp(2rem, 7vw, 3.6rem)",
            paintOrder: "stroke fill",
            WebkitTextStroke: "0.12em var(--paper)",
            transform: "rotate(2deg)",
          }}
        >
          {hindi}
        </p>
        <p className="mx-auto mt-6 inline-block border-[3px] border-ink bg-paper px-4 py-1.5 text-base font-bold">{line}</p>
      </div>
    </section>
  );
}

export function HeldGutter({ note }: { note?: string }) {
  return (
    <div className="held-gutter" aria-hidden="true">
      {note && (
        <p className="pencil absolute left-1/2 top-1/2 ml-5 -translate-y-1/2 -rotate-3 whitespace-nowrap text-[1.75rem]" lang="hi">{note}</p>
      )}
    </div>
  );
}
