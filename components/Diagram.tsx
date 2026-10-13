// Diagrams drawn as ink on the manuscript: square frames, G-pen arrows, one spot node for the
// thing the figure is about. Pure SVG, no library, legible without JavaScript.

export type FlowNode = {
  id: string;
  label: string;
  sub?: string;
  /** grid position: column and row, counted from 0 */
  col: number;
  row: number;
  /** the node the figure is about: drawn with the spot fill (ink text on spot) */
  focus?: boolean;
  /** an outcome that ends a path, e.g. a rejection: drawn with a dashed frame */
  dashed?: boolean;
  /** columns to span */
  span?: number;
};

export type FlowEdge = { from: string; to: string; label?: string; dashed?: boolean };

export type Flow = { kind: "flow"; nodes: FlowNode[]; edges: FlowEdge[]; colW?: number; rowH?: number };

export type Sequence = {
  kind: "sequence";
  actors: string[];
  steps: { from: number; to: number; label: string; dashed?: boolean }[];
};

const NODE_W = 200;
const NODE_H = 62;
const PAD = 24;

function nodeBox(n: FlowNode, colW: number, rowH: number) {
  const span = n.span ?? 1;
  const base = Math.min(NODE_W, colW - 64); // at least 64px of gutter for an arrow and its label
  const w = base + (span - 1) * colW;
  const x = PAD + n.col * colW + (colW - base) / 2;
  const y = PAD + n.row * rowH + (rowH - NODE_H) / 2;
  return { x, y, w, h: NODE_H, cx: x + w / 2, cy: y + NODE_H / 2 };
}

function wrap(text: string, max = 24): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const w of words) {
    if ((line + " " + w).trim().length > max && line) {
      lines.push(line);
      line = w;
    } else {
      line = (line + " " + w).trim();
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 2);
}

function Arrowhead({ id }: { id: string }) {
  return (
    <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 10 5 0 10z" fill="var(--ink)" />
    </marker>
  );
}

export function FlowDiagram({ flow, label }: { flow: Flow; label: string }) {
  const colW = flow.colW ?? 240;
  const rowH = flow.rowH ?? 128;
  const cols = Math.max(...flow.nodes.map((n) => n.col + (n.span ?? 1)));
  const rows = Math.max(...flow.nodes.map((n) => n.row + 1));
  const width = PAD * 2 + cols * colW;
  const height = PAD * 2 + rows * rowH;
  const boxes = Object.fromEntries(flow.nodes.map((n) => [n.id, nodeBox(n, colW, rowH)]));
  const marker = `arrow-${label.replace(/\W+/g, "").slice(0, 24)}`;
  const labels: { x: number; y: number; text?: string; anchor: "middle" | "start" }[] = [];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="mx-auto h-auto w-full" style={{ maxWidth: width * 1.15 }} role="img" aria-label={label}>
      <defs>
        <Arrowhead id={marker} />
      </defs>
      {flow.edges.map((e, i) => {
        const a = boxes[e.from];
        const b = boxes[e.to];
        if (!a || !b) return null;
        let d: string;
        let lx: number;
        let ly: number;
        let anchor: "middle" | "start" = "middle";
        if (Math.abs(a.cy - b.cy) < 2) {
          // same row: straight across, edge to edge
          const [x1, x2] = a.cx < b.cx ? [a.x + a.w, b.x - 3] : [a.x, b.x + b.w + 3];
          d = `M${x1} ${a.cy} H${x2}`;
          lx = (x1 + x2) / 2;
          ly = a.cy - 10;
        } else if (Math.abs(a.cx - b.cx) < 2) {
          // same column: straight down or up
          const [y1, y2] = a.cy < b.cy ? [a.y + a.h, b.y - 3] : [a.y, b.y + b.h + 3];
          d = `M${a.cx} ${y1} V${y2}`;
          lx = a.cx + 12; // beside the line, where a vertical gutter has room
          ly = (y1 + y2) / 2 + 4;
          anchor = "start";
        } else {
          // elbow: leave from the bottom, travel across mid-gutter, arrive from the top
          const down = a.cy < b.cy;
          const y1 = down ? a.y + a.h : a.y;
          const y2 = down ? b.y - 3 : b.y + b.h + 3;
          const mid = (y1 + y2) / 2;
          d = `M${a.cx} ${y1} V${mid} H${b.cx} V${y2}`;
          lx = (a.cx + b.cx) / 2;
          ly = mid - 8;
        }
        labels.push({ x: lx, y: ly, text: e.label, anchor });
        return (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="var(--ink)"
            strokeWidth={2.25}
            strokeDasharray={e.dashed ? "7 6" : undefined}
            markerEnd={`url(#${marker})`}
          />
        );
      })}
      {flow.nodes.map((n) => {
        const b = boxes[n.id];
        const lines = wrap(n.label, Math.round(b.w / 9));
        return (
          <g key={n.id}>
            <rect
              x={b.x}
              y={b.y}
              width={b.w}
              height={b.h}
              fill={n.focus ? "var(--spot)" : "var(--paper)"}
              stroke="var(--ink)"
              strokeWidth={n.focus ? 3 : 2}
              strokeDasharray={n.dashed ? "6 5" : undefined}
            />
            <text x={b.cx} y={b.cy + (n.sub ? -6 : 5) - (lines.length - 1) * 8} textAnchor="middle" className="fill-ink" style={{ font: "900 15px var(--font-zen), sans-serif" }}>
              {lines.map((l, i) => (
                <tspan key={i} x={b.cx} dy={i === 0 ? 0 : 17}>
                  {l}
                </tspan>
              ))}
            </text>
            {n.sub && (
              <text x={b.cx} y={b.cy + 16 + (lines.length - 1) * 8} textAnchor="middle" className="fill-ink-2" style={{ font: "500 12.5px var(--font-zen), sans-serif" }}>
                {n.sub}
              </text>
            )}
          </g>
        );
      })}
      {labels.map((l, i) =>
        l.text ? (
          <text
            key={`label-${i}`}
            x={l.x}
            y={l.y}
            textAnchor={l.anchor}
            className="fill-ink"
            style={{ font: "700 13px var(--font-zen), sans-serif", paintOrder: "stroke", stroke: "var(--paper)", strokeWidth: 6, strokeLinejoin: "round" }}
          >
            {l.text}
          </text>
        ) : null,
      )}
    </svg>
  );
}

export function SequenceDiagram({ seq, label }: { seq: Sequence; label: string }) {
  const colW = 210;
  const top = 64;
  const stepH = 46;
  const width = PAD * 2 + seq.actors.length * colW;
  const height = top + seq.steps.length * stepH + 40;
  const cx = (i: number) => PAD + i * colW + colW / 2;
  const marker = `seq-${label.replace(/\W+/g, "").slice(0, 24)}`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label={label}>
      <defs>
        <Arrowhead id={marker} />
      </defs>
      {seq.actors.map((a, i) => (
        <g key={a}>
          <line x1={cx(i)} y1={top - 10} x2={cx(i)} y2={height - 16} stroke="var(--guide)" strokeWidth={2} strokeDasharray="4 5" />
          <rect x={cx(i) - 88} y={12} width={176} height={40} fill="var(--paper)" stroke="var(--ink)" strokeWidth={3} />
          <text x={cx(i)} y={37} textAnchor="middle" className="fill-ink" style={{ font: "900 14px var(--font-zen), sans-serif" }}>
            {a}
          </text>
        </g>
      ))}
      {seq.steps.map((s, i) => {
        const y = top + 22 + i * stepH;
        const self = s.from === s.to;
        const x1 = cx(s.from);
        const x2 = cx(s.to);
        const dir = x2 > x1 ? 1 : -1;
        return (
          <g key={i}>
            {self ? (
              <path d={`M${x1} ${y - 8} h34 v16 h-31`} fill="none" stroke="var(--ink)" strokeWidth={2} markerEnd={`url(#${marker})`} />
            ) : (
              <line
                x1={x1}
                y1={y}
                x2={x2 - dir * 4}
                y2={y}
                stroke="var(--ink)"
                strokeWidth={2.25}
                strokeDasharray={s.dashed ? "7 6" : undefined}
                markerEnd={`url(#${marker})`}
              />
            )}
            <text
              x={self ? x1 + 42 : (x1 + x2) / 2}
              y={self ? y + 4 : y - 9}
              textAnchor={self ? "start" : "middle"}
              className="fill-ink"
              style={{ font: "700 12.5px var(--font-zen), sans-serif" }}
            >
              <tspan className="tnum" style={{ font: "900 12.5px var(--font-zen), sans-serif" }}>
                {i + 1}.{" "}
              </tspan>
              {s.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
