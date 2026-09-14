"use client";

import { useEffect, useState } from "react";

/**
 * Intro animation: "आक्षांत कुमार" rendered as SVG text using the
 * Amita font (Google Fonts, Devanagari calligraphic).
 * Animated with stroke-dashoffset for a hand-written drawing effect,
 * then the fill fades in and the curtain slides up.
 */

const DRAW_DURATION = 2.4;
const FILL_DELAY = 1.8;
const FILL_DURATION = 0.6;
const HOLD_TIME = 0.5;
const SLIDE_DURATION = 0.75;
const SUBTITLE_DELAY = 1.6;

const TOTAL_BEFORE_SLIDE = DRAW_DURATION + HOLD_TIME;

export default function IntroAnimation() {
  const [phase, setPhase] = useState<"active" | "sliding" | "done">("active");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const slideTimer = setTimeout(() => {
      setPhase("sliding");
    }, TOTAL_BEFORE_SLIDE * 1000);

    const doneTimer = setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
    }, (TOTAL_BEFORE_SLIDE + SLIDE_DURATION) * 1000);

    return () => {
      clearTimeout(slideTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className="intro-curtain"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0d0d0d",
        transform: phase === "sliding" ? "translateY(-100%)" : "translateY(0)",
        transition: phase === "sliding"
          ? `transform ${SLIDE_DURATION}s cubic-bezier(0.7, 0, 0.2, 1)`
          : "none",
        willChange: "transform",
      }}
    >
      {/* Calligraphy text rendered with Amita */}
      <svg
        viewBox="0 0 820 200"
        style={{
          width: "min(90vw, 680px)",
          height: "auto",
          overflow: "visible",
        }}
        role="img"
        aria-label="आक्षांत कुमार"
      >
        <text
          x="410"
          y="160"
          textAnchor="middle"
          className="intro-text"
          lang="hi"
          style={{
            fontFamily: "'Amita', cursive",
            fontSize: "140px",
            fontWeight: 700,
          }}
        >
          आक्षांत कुमार
        </text>
      </svg>

      {/* Subtitle */}
      <p className="intro-subtitle">
        ML Engineer &middot; Builder &middot; Co-founder
      </p>

      <style>{`
        .intro-text {
          fill: none;
          stroke: #f5f5f2;
          stroke-width: 1.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 3000;
          stroke-dashoffset: 3000;
          animation:
            intro-stroke ${DRAW_DURATION}s cubic-bezier(0.35, 0.1, 0.25, 1) 0.3s forwards,
            intro-fill-in ${FILL_DURATION}s ease ${FILL_DELAY}s forwards;
        }

        .intro-subtitle {
          color: #ff1f6f;
          font-family: 'Amita', var(--font-zen), cursive;
          font-weight: 400;
          font-size: clamp(0.85rem, 2vw, 1.15rem);
          letter-spacing: 0.08em;
          margin-top: 1.5rem;
          opacity: 0;
          animation: intro-fade 0.6s ease ${SUBTITLE_DELAY}s forwards;
        }

        @keyframes intro-stroke {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes intro-fill-in {
          0% {
            fill: transparent;
            stroke-width: 1.5;
          }
          100% {
            fill: #f5f5f2;
            stroke-width: 0.3;
          }
        }

        @keyframes intro-fade {
          to { opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          .intro-curtain {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
