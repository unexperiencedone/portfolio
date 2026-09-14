/**
 * Concentrated speed lines (集中線) drawn as tapered G-pen wedges, not gradients:
 * each stroke is thick at the frame edge and tapers to a point toward the focus.
 * Deterministic, so server and client render the same art.
 */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

type Props = {
  className?: string;
  /** focus point in viewBox units (0–1000 x, 0–600 y) */
  fx?: number;
  fy?: number;
  /** radius of the calm clearing around the focus */
  clear?: number;
  count?: number;
  seed?: number;
  color?: string;
};

export function SpeedLines({ className = "", fx = 500, fy = 300, clear = 190, count = 150, seed = 7, color = "var(--ink)" }: Props) {
  const rand = rng(seed);
  const R = 1400;
  const wedges: string[] = [];
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2 + (rand() - 0.5) * 0.035;
    const inner = clear * (0.85 + rand() * 0.9);
    const half = 0.0025 + rand() * rand() * 0.011; // most lines hairline, a few heavy
    const x0 = fx + Math.cos(a) * inner;
    const y0 = fy + Math.sin(a) * inner;
    const x1 = fx + Math.cos(a - half) * R;
    const y1 = fy + Math.sin(a - half) * R;
    const x2 = fx + Math.cos(a + half) * R;
    const y2 = fy + Math.sin(a + half) * R;
    wedges.push(`M${x0.toFixed(1)} ${y0.toFixed(1)}L${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}Z`);
  }
  return (
    <svg className={className} viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <path d={wedges.join("")} fill={color} />
    </svg>
  );
}
