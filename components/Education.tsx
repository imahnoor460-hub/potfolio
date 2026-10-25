import { GraduationCap } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { education } from "@/data/cv";

export default function Education() {
  return (
    <section id="education" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <SectionHeading title="Where I *learned*" index="03." kicker="Education" />
        </Reveal>

        <div className="grid gap-10 pt-4 md:grid-cols-2">
          {education.map((entry, i) => (
            <Reveal key={entry.school} delay={Math.min(i * 100, 240)}>
              <div
                className={`paper-card lift h-full p-7 md:p-8 ${
                  ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{entry.period}</p>
                  <GraduationCap size={22} className="text-accent-2" />
                </div>
                <h3 className="font-serif mt-4 text-3xl leading-tight text-foreground">{entry.degree}</h3>
                <p className="mt-2 font-semibold text-accent">{entry.school}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
