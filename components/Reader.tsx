"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { Close, Mail, Pages } from "./Icons";

type Entry = { id: string; n: number; label: string; href?: string };

declare global {
  interface Window {
    __inkReady?: boolean;
  }
}

/**
 * The reader's chrome: inks panels as they cross into view, keeps the page counter,
 * and holds the contact tab. Panels stay fully legible without it.
 */
export function Reader({ entries }: { entries: Entry[] }) {
  const [current, setCurrent] = useState(1);
  const [open, setOpen] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [idle, setIdle] = useState(true);
  const menuId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const total = entries.length;

  // ink-in: scroll position is the trigger, 30% up from the bottom of the viewport
  useEffect(() => {
    window.__inkReady = true;
    const root = document.documentElement;
    if (!root.classList.contains("reveal") && !root.classList.contains("reveal-fade")) return;

    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-ink]"));
    const ink = (el: Element) => el.setAttribute("data-inked", "");
    const io = new IntersectionObserver(
      (records) => {
        for (const r of records) {
          if (r.isIntersecting || r.boundingClientRect.bottom < 0) {
            ink(r.target);
            io.unobserve(r.target);
          }
        }
      },
      { rootMargin: "0px 0px -30% 0px", threshold: 0 },
    );
    const fold = window.innerHeight;
    for (const t of targets) {
      if (t.getBoundingClientRect().top < fold) ink(t);
      else io.observe(t);
    }
    return () => io.disconnect();
  }, []);

  // page counter: whichever panel crosses the middle of the viewport
  useEffect(() => {
    const panels = Array.from(document.querySelectorAll<HTMLElement>("[data-panel]"));
    const io = new IntersectionObserver(
      (records) => {
        for (const r of records) {
          if (r.isIntersecting) setCurrent(Number(r.target.getAttribute("data-panel")));
        }
      },
      { rootMargin: "-48% 0px -48% 0px", threshold: 0 },
    );
    panels.forEach((p) => io.observe(p));

    const contact = document.getElementById("contact");
    const cio = new IntersectionObserver(([r]) => setContactVisible(r.isIntersecting), { threshold: 0.15 });
    if (contact) cio.observe(contact);
    return () => {
      io.disconnect();
      cio.disconnect();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setIdle(window.scrollY < 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!menuRef.current?.contains(t) && !buttonRef.current?.contains(t)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    menuRef.current?.querySelector<HTMLAnchorElement>('a[aria-current="true"]')?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const pad = (v: number) => String(v).padStart(2, "0");
  const currentLabel = entries.find((e) => e.n === current)?.label ?? "";

  return (
    <div data-idle={idle && !open}>
      <button
        ref={buttonRef}
        type="button"
        className="reader-tab reader-tab--counter"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? <Close size={18} /> : <Pages size={18} />}
        <span className="tnum" aria-hidden="true">
          p.{pad(current)}
          <span className="font-bold text-ink-2 [.reader-tab:hover_&]:text-paper"> / {pad(total)}</span>
        </span>
        <span className="hidden max-w-[16ch] truncate font-bold md:inline" aria-hidden="true">
          {currentLabel}
        </span>
        <span className="sr-only">
          Panel {current} of {total}: {currentLabel}. {open ? "Close" : "Open"} the panel index
        </span>
      </button>

      {open && (
        <nav ref={menuRef} id={menuId} className="reader-index" aria-label="Panel index">
          <ol>
            {entries.map((e) => (
              <li key={e.id}>
                {e.href ? (
                  <Link href={e.href} aria-current={e.n === current ? "true" : undefined} onClick={() => setOpen(false)}>
                    <span className="tnum">p.{pad(e.n)}</span>
                    <span>{e.label}</span>
                  </Link>
                ) : (
                  <a href={`#${e.id}`} aria-current={e.n === current ? "true" : undefined} onClick={() => setOpen(false)}>
                    <span className="tnum">p.{pad(e.n)}</span>
                    <span>{e.label}</span>
                  </a>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      <a className="reader-tab reader-tab--contact" href="#contact-flood" data-hidden={contactVisible} tabIndex={contactVisible ? -1 : 0} aria-hidden={contactVisible}>
        <Mail size={18} /> Contact
      </a>
    </div>
  );
}
