import { ClientWork } from "@/components/Projects";
import { Reader } from "@/components/Reader";
import { Footer } from "@/components/Sections";
import { Flood, HeldGutter, Panel } from "@/components/Panel";
import { ArrowOut } from "@/components/Icons";

export const metadata = {
  title: "Kaiketsu Tech | Aakshant Kumar",
};

const order = [
  { id: "top", label: "Start", href: "/", n: 1 },
  { id: "kaiketsu", label: "About Kaiketsu", n: 2 },
  { id: "clients", label: "Guild contracts", n: 3 },
];

export default function Kaiketsu() {
  return (
    <>
      <main>
        <Flood id="kaiketsu-flood" word="Kaiketsu Tech" hindi="समाधान" line="A service-based startup initiative with friends." focus={{ x: 500 }} />
        
        <div className="board pt-[var(--gutter-scene)] flex flex-col gap-[var(--gutter-beat)]">
          <section id="kaiketsu" data-panel={2} data-panel-label="About Kaiketsu" aria-labelledby="kaiketsu-title">
            <Panel id="kaiketsu-about" n={2} label="About Kaiketsu" impact labelledBy="kaiketsu-title" bodyClassName="p-6 sm:p-10">
              <div className="grid lg:grid-cols-2 gap-10">
                <div>
                  <h3 id="kaiketsu-title" className="title-ink text-[clamp(2.5rem,5vw,3.5rem)]">KaiketsuTech</h3>
                  <p className="mt-2 text-ink-2 font-bold text-lg">Kaiketsu means solution. That's the job.</p>
                  
                  <div className="mt-8 space-y-5 leading-relaxed">
                    <p>
                      We're a crew of student developers shipping real client work — web, mobile, AI, and security research — while we build out the next generation of the team.
                    </p>
                    <p>
                      We take a narrow number of projects at a time so the people who scoped your work are the people who write it. Every engagement ends with a repo you own, a deployment you control, and documentation written for whoever comes next.
                    </p>
                    <p>
                      It's a joint initiative of friends trying to make a service-based startup that prioritizes premium software solutions tailored for high-end enterprises over just billing hours.
                    </p>
                  </div>
                  
                  <a href="https://kaiketsutech.online" target="_blank" rel="noopener noreferrer" className="btn btn--spot mt-8 inline-flex">
                    Visit kaiketsutech.online <ArrowOut size={16} />
                  </a>
                </div>
                
                <div className="flex flex-col justify-center gap-6 border-t-2 border-ink pt-8 lg:border-t-0 lg:border-l-2 lg:pt-0 lg:pl-10">
                  <div>
                    <h4 className="font-black text-xl">Services</h4>
                    <ul className="mt-4 space-y-3 text-ink-2">
                      <li>• <strong className="text-ink">Web platforms:</strong> React, Node, Postgres</li>
                      <li>• <strong className="text-ink">Mobile:</strong> React Native, Expo, Swift</li>
                      <li>• <strong className="text-ink">AI systems:</strong> RAG, Evals, PyTorch</li>
                      <li>• <strong className="text-ink">Security research:</strong> Threat modelling, Audit</li>
                    </ul>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-black text-xl">Process</h4>
                    <ul className="mt-4 space-y-3 text-ink-2">
                      <li>• <strong>Scope:</strong> A working session, a written brief, and a fixed price.</li>
                      <li>• <strong>Build:</strong> Weekly demos against a live environment.</li>
                      <li>• <strong>Ship:</strong> Deployment, monitoring and a runbook.</li>
                      <li>• <strong>Hand over:</strong> Documentation written for the next engineer.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Panel>
          </section>

          <ClientWork n={3} />
          
          <HeldGutter note="समाप्त" />
          <Footer />
        </div>
      </main>
      <Reader entries={order} />
    </>
  );
}
