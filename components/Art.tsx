import { ArrowDown } from "./Icons";

function Synthetic({ children = "Illustrative example" }: { children?: string }) {
  return (
    <span className="absolute right-3 top-3 z-10 border-2 border-dashed border-ink bg-paper px-2 py-0.5 text-xs font-bold">
      {children}
    </span>
  );
}

/* VedaVoice: a spoken Hinglish line becomes a ledger row */
export function VedaVoiceArt() {
  return (
    <figure className="relative flex h-full flex-col justify-center gap-5 p-5 pt-12 sm:p-8 sm:pt-12">
      <Synthetic />
      <div className="tone-coarse tone-fade-r tone-event absolute inset-y-0 right-0 w-2/3 opacity-25" aria-hidden="true" />
      <div className="relative self-start">
        <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M58 81A96 40 0 1 1 78 83.9L40 98Z" fill="var(--paper)" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="relative px-10 pt-7 pb-[3.4rem] sm:px-12">
          <p className="text-[1.45rem] font-black leading-snug sm:text-[1.75rem]" lang="hi">
            &ldquo;<mark className="bg-transparent underline decoration-spot decoration-[4px] underline-offset-[7px]">रमेश</mark> को{" "}
            <mark className="bg-transparent underline decoration-spot decoration-[4px] underline-offset-[7px]">500</mark>{" "}
            <mark className="bg-transparent underline decoration-spot decoration-[4px] underline-offset-[7px]">उधार</mark> दिए&rdquo;
          </p>
        </div>
      </div>
      <ArrowDown size={28} className="relative ml-12" />
      <div className="relative overflow-x-auto">
        <table className="w-full min-w-[300px] border-collapse border-[3px] border-ink bg-paper text-left text-sm sm:text-base">
          <caption className="sr-only">Ledger entry extracted from the spoken sentence</caption>
          <thead>
            <tr className="bg-ink text-paper">
              <th scope="col" className="px-3 py-1.5 font-black">Who · <span lang="hi">नाम</span></th>
              <th scope="col" className="px-3 py-1.5 font-black">Amount · <span lang="hi">रक़म</span></th>
              <th scope="col" className="px-3 py-1.5 font-black">Entry · <span lang="hi">प्रविष्टि</span></th>
            </tr>
          </thead>
          <tbody>
            <tr className="tnum">
              <td className="border-t-2 border-ink px-3 py-2 font-bold" lang="hi">रमेश</td>
              <td className="border-t-2 border-ink px-3 py-2 font-bold">₹500</td>
              <td className="border-t-2 border-ink px-3 py-2 font-bold"><span lang="hi">उधार दिया</span> <span className="text-ink-2">(credit given)</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <figcaption className="sr-only">
        Illustration: the spoken Hindi sentence &ldquo;<span lang="hi">रमेश को 500 उधार दिए</span>&rdquo; (gave Ramesh 500 on credit) is turned into a ledger row for Ramesh, 500 rupees, credit given.
      </figcaption>
    </figure>
  );
}

/* Robo Rumble 3.0: real data. 292 commits, 113 of them mine. */
export function CommitArt() {
  const total = 292;
  const mine = 113;
  const cols = 20;
  const cell = 14;
  const gap = 4;
  const rows = Math.ceil(total / cols);
  const w = cols * cell + (cols - 1) * gap;
  const h = rows * cell + (rows - 1) * gap;
  return (
    <figure className="relative flex h-full flex-col justify-center gap-5 p-5 sm:p-8">
      <div className="flex items-end justify-between gap-4">
        <p className="title-ink tnum text-[clamp(3rem,7vw,4.5rem)] leading-none" aria-hidden="true">
          113<span className="text-ink-2"> / 292</span>
        </p>
      </div>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="h-auto w-full max-w-[420px]"
        role="img"
        aria-label="A grid of 292 squares, one per commit to the Robo Rumble 3.0 repository. 113 are filled in black: the commits Aakshant authored."
      >
        {Array.from({ length: total }, (_, i) => {
          const x = (i % cols) * (cell + gap);
          const y = Math.floor(i / cols) * (cell + gap);
          return i < mine ? (
            <rect key={i} x={x} y={y} width={cell} height={cell} fill="var(--ink)" />
          ) : (
            <rect key={i} x={x + 1} y={y + 1} width={cell - 2} height={cell - 2} fill="none" stroke="var(--ink)" strokeWidth="1.5" />
          );
        })}
      </svg>
      <figcaption className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm font-bold">
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-3.5 w-3.5 bg-ink" aria-hidden="true" /> my commits
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-3.5 w-3.5 border-[1.5px] border-ink" aria-hidden="true" /> everyone else
        </span>
        <span className="text-ink-2">One square = one commit</span>
      </figcaption>
    </figure>
  );
}

/* AirGated: how presence is proven without the internet */
export function AirGatedArt() {
  const steps = [
    { head: "Student's browser", body: "Non-extractable key in IndexedDB signs the check-in (RSA-2048)" },
    { head: "Latency gate", body: "WebSocket round-trip must be fast enough to be in the room" },
    { head: "Network check", body: "ARP resolves the device's MAC on the local network" },
  ];
  return (
    <figure className="relative flex h-full flex-col justify-center p-5 pt-12 sm:p-8 sm:pt-12">
      <Synthetic>Simplified flow</Synthetic>
      <ol className="relative flex flex-col gap-0">
        {steps.map((s, i) => (
          <li key={s.head} className="relative">
            <div className="caption bg-paper" style={{ marginLeft: `${i * 6}%`, marginRight: `${(2 - i) * 6}%` }}>
              <p className="text-base font-black">{s.head}</p>
              <p className="text-sm leading-snug text-ink-2">{s.body}</p>
            </div>
            <div className="flex h-9 items-center" style={{ marginLeft: `calc(${i * 6}% + 22px)` }} aria-hidden="true">
              <ArrowDown size={24} />
            </div>
          </li>
        ))}
        <li>
          <div className="inline-flex items-center gap-3 border-[3px] border-ink bg-spot px-4 py-2 font-black" style={{ marginLeft: "12%" }}>
            Marked present
          </div>
        </li>
      </ol>
      <div className="tone tone-fade-b tone-event pointer-events-none absolute inset-x-0 bottom-0 h-1/3 opacity-20" aria-hidden="true" />
    </figure>
  );
}

/* Snake AI: a board mid-episode */
export function SnakeArt() {
  const cols = 14;
  const rows = 10;
  const body = [
    [2, 7], [3, 7], [4, 7], [5, 7], [5, 6], [5, 5], [6, 5], [7, 5], [8, 5], [8, 4], [8, 3], [9, 3], [10, 3],
  ];
  const food = [10, 7];
  const head = body[body.length - 1];
  const key = (c: number, r: number) => `${c}-${r}`;
  const bodySet = new Set(body.map(([c, r]) => key(c, r)));
  return (
    <figure className="relative flex h-full flex-col justify-center gap-4 p-5 pt-12 sm:p-8 sm:pt-12">
      <Synthetic>Illustration</Synthetic>
      <div
        className="relative mx-auto grid w-full max-w-[440px] border-[3px] border-ink"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, aspectRatio: `${cols} / ${rows}` }}
        aria-hidden="true"
      >
        {Array.from({ length: cols * rows }, (_, i) => {
          const c = i % cols;
          const r = Math.floor(i / cols);
          const isHead = head[0] === c && head[1] === r;
          const isBody = bodySet.has(key(c, r));
          const isFood = food[0] === c && food[1] === r;
          return (
            <span
              key={i}
              className={
                isHead
                  ? "m-[1px] bg-ink outline outline-2 outline-offset-1 outline-spot"
                  : isBody
                    ? "m-[1px] bg-ink"
                    : isFood
                      ? "m-[3px] rounded-full bg-spot"
                      : "border-[0.5px] border-guide/60"
              }
            />
          );
        })}
      </div>
      <figcaption className="text-center text-sm font-bold text-ink-2">
        The agent sees the board, picks a move, and learns from the reward.
      </figcaption>
    </figure>
  );
}
