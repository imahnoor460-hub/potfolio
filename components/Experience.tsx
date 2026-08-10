import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { experience } from "@/data/cv";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Reveal>
          <SectionHeading eyebrow="Where I've worked" title="Experience" index="02." />
        </Reveal>

        <Reveal delay={80}>
          <div className="rounded-xl border border-border bg-surface p-6 shadow-sm md:p-8">
            <p className="text-xs font-medium uppercase tracking-wide text-muted">
              {experience.period}
            </p>
            <h3 className="mt-1 text-lg font-semibold text-foreground">{experience.role}</h3>
            <p className="text-sm font-medium text-accent">{experience.company}</p>
            <p className="mt-3 leading-relaxed text-foreground/80">{experience.description}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
