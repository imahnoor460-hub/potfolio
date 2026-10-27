import { CalendarDays, GraduationCap } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { education } from "@/data/cv";

export default function Education() {
  return (
    <section id="education" className="scroll-mt-28">
      <div className="mx-auto max-w-6xl px-6 pt-20 md:pt-28">
        <Reveal>
          <SectionHeading
            eyebrow="Education"
            title={
              <>
                My <span className="brush text-gradient">studies</span>
              </>
            }
          />
        </Reveal>

        <ol className="grid gap-5 md:grid-cols-2">
          {education.map((edu, i) => (
            <li key={edu.school}>
              <Reveal delay={i * 80} className="h-full">
                <div data-tilt className="tile tile-hover flex h-full flex-col p-7">
                  <div className="flex items-start justify-between gap-4">
                    <span className="bg-gradient-brand flex h-12 w-12 items-center justify-center rounded-2xl text-white">
                      <GraduationCap size={22} strokeWidth={1.8} />
                    </span>
                    <span className="pill !py-1 text-xs text-muted">
                      <CalendarDays size={13} />
                      {edu.period}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-semibold leading-snug text-foreground">{edu.degree}</h3>
                  <p className="mt-2 text-muted">{edu.school}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
