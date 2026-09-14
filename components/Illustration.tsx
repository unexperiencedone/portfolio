import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import type { ReactNode } from "react";
import PixelReveal from "./PixelReveal";
import { type IllustrationId, illustrations } from "@/lib/illustrations";

const showSlots = process.env.NODE_ENV !== "production" || process.env.ILLUSTRATION_SLOTS === "show";

export type InkState = "ready" | "slot" | "none";

/** ready: the file exists · slot: missing, but placeholders are shown (dev) · none: missing, render nothing */
export function inkState(id: IllustrationId): InkState {
  const exists = fs.existsSync(path.join(process.cwd(), "public", "illustrations", illustrations[id].file));
  if (exists) return "ready";
  return showSlots ? "slot" : "none";
}

type Props = {
  id: IllustrationId;
  className?: string;
  sizes: string;
  priority?: boolean;
  fit?: "cover" | "contain";
  position?: string;
};

export function Illustration({ id, className = "", sizes, priority = false, fit = "cover", position = "center" }: Props) {
  const spec = illustrations[id];
  const state = inkState(id);
  if (state === "none") return null;

  if (state === "ready") {
    if (spec.kind === "scene") {
      return (
        <PixelReveal
          imageSrc={`/illustrations/${spec.file}`}
          transitionColor="#f5f5f2"
          className={`h-full w-full mix-blend-multiply ${className}`}
        />
      );
    }

    return (
      <Image
        src={`/illustrations/${spec.file}`}
        alt={spec.alt}
        width={spec.width}
        height={spec.height}
        sizes={sizes}
        priority={priority}
        className={`h-full w-full ${className}`}
        style={{ objectFit: fit, objectPosition: position }}
      />
    );
  }

  // storyboard placeholder: an empty ネーム panel crossed in non-repro blue
  return (
    <div
      className={`ink-slot relative grid h-full w-full place-items-center ${className}`}
      style={{ aspectRatio: `${spec.width} / ${spec.height}` }}
      role="img"
      aria-label={`Illustration slot: ${spec.slot}`}
    >
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100" aria-hidden="true">
        <path d="M0 0 100 100M100 0 0 100" stroke="var(--guide)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
      <span className="pencil relative bg-paper px-2 text-center text-lg">
        ink pending: {spec.file}
      </span>
    </div>
  );
}

/** Renders its frame only when the illustration will render. */
export function IfInk({ id, children }: { id: IllustrationId; children: ReactNode }) {
  return inkState(id) === "none" ? null : <>{children}</>;
}
