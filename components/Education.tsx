import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { education } from "@/data/cv";

export default function Education() {
  return (
    <section id="education" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Reveal>
          <SectionHeading eyebrow="Where I've studied" title="Education" />
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2">
          {education.map((entry, i) => (
            <Reveal key={entry.school} delay={Math.min(i * 80, 240)}>
              <div className="h-full rounded-xl border border-border bg-surface p-6 shadow-sm transition-shadow hover:shadow-md">
                <p className="text-xs font-medium uppercase tracking-wide text-muted">
                  {entry.period}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-foreground">{entry.degree}</h3>
                <p className="text-sm font-medium text-accent">{entry.school}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
