import { ShortChapters } from "@/components/Projects";
import { Reader } from "@/components/Reader";
import { Footer } from "@/components/Sections";
import { Flood, HeldGutter } from "@/components/Panel";

export const metadata = {
  title: "Side Quests | Aakshant Kumar",
};

const order = [
  { id: "top", label: "Start", href: "/", n: 1 },
  { id: "shorter", label: "Side quests", n: 2 },
];

export default function Works() {
  return (
    <>
      <main>
        <Flood id="works-flood" word="Side quests" hindi="अन्य प्रसंग" line="Hackathon builds, experiments and concepts." focus={{ x: 300 }} />
        
        <div className="board pt-[var(--gutter-scene)] flex flex-col gap-[var(--gutter-beat)]">
          <ShortChapters n={2} />
          
          <HeldGutter note="समाप्त" />
          <Footer />
        </div>
      </main>
      <Reader entries={order} />
    </>
  );
}
