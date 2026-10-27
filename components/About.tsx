import { Brain, Code2, Gamepad2, Workflow } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { profile } from "@/data/cv";

const STRENGTHS = [
  {
    icon: Code2,
    title: "Full-stack web",
    text: "Django and FastAPI backends with React and Next.js frontends, REST APIs, auth, and relational data.",
  },
  {
    icon: Workflow,
    title: "LLMs & agents",
    text: "Integrating LLMs into products: agentic workflows, MCP tools, embeddings, and RAG pipelines.",
  },
  {
    icon: Brain,
    title: "Machine learning",
    text: "Training and evaluating models with Scikit-learn and PyTorch, and NLP with transformers.",
  },
  {
    icon: Gamepad2,
    title: "Games & 3D",
    text: "Unity game mechanics and physics, plus realistic and stylized environments built in Blender.",
  },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-28">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="About me"
              title={
                <>
                  Building software that is useful and <span className="brush text-gradient">well made</span>
                </>
              }
            />
            <p className="-mt-4 text-lg leading-relaxed text-muted">{profile.summary}</p>
          </Reveal>

          <ul className="grid gap-4 sm:grid-cols-2">
            {STRENGTHS.map(({ icon: Icon, title, text }, i) => (
              <li key={title}>
                <Reveal delay={i * 70} className="h-full">
                  <div data-tilt className="tile tile-hover h-full p-6">
                    <span className="bg-gradient-brand flex h-11 w-11 items-center justify-center rounded-xl text-white">
                      <Icon size={20} strokeWidth={1.8} />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-semibold text-foreground">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
