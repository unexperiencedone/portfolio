"use client";

import { useState } from "react";
import { Check, Copy } from "./Icons";

export function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
    window.setTimeout(() => setState("idle"), 2400);
  }

  return (
    <>
      <button type="button" className="btn" onClick={copy}>
        {state === "copied" ? <Check size={18} /> : <Copy size={18} />}
        {state === "copied" ? "Copied" : "Copy address"}
      </button>
      <p className="sr-only" aria-live="polite">
        {state === "copied" ? "Email address copied" : state === "failed" ? "Couldn't copy. Select the address above instead." : ""}
      </p>
      {state === "failed" && <p className="w-full text-sm font-bold">Couldn&apos;t copy. Select the address above instead.</p>}
    </>
  );
}
