import Link from "next/link";
import { SpeedLines } from "@/components/SpeedLines";

export default function NotFound() {
  return (
    <main className="board grid min-h-svh place-items-center py-10">
      <div className="panel panel--splash w-full max-w-[760px]">
        <div className="relative p-6 sm:p-12">
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <SpeedLines className="h-full w-full" fx={500} fy={280} clear={230} seed={404} />
          </div>
          <div className="relative bg-paper p-4 text-center sm:p-8">
            <p className="sfx text-[clamp(3rem,12vw,5.5rem)]" aria-hidden="true">
              404
            </p>
            <h1 className="title-ink mt-4 text-[clamp(1.6rem,4vw,2.4rem)]">This panel was never inked.</h1>
            <p className="sfx-hi mt-3 text-[clamp(1.6rem,4vw,2.2rem)]" lang="hi">
              यह पन्ना कभी छपा ही नहीं।
            </p>
            <p className="mt-3 text-ink-2">The page you followed doesn&apos;t exist, or it moved.</p>
            <Link href="/" className="btn btn--spot mt-8">
              Back to the first panel · <span lang="hi">पहला पन्ना</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
