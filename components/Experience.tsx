import { ArrowUpRight, CalendarDays } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { experiences } from "@/data/cv";

/** True while a "Start – End" period hasn't ended yet. */
function isOngoing(period?: string) {
  const end = period?.split("–")[1]?.trim();
  const endTime = end ? Date.parse(end) : NaN;
  return Number.isNaN(endTime) ? false : endTime >= Date.now();
}

export default function Experience() {
  // Newest first.
  const roles = [...experiences].reverse();

  return (
    <section id="experience" className="scroll-mt-28 border-y border-border bg-surface-2/60">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Experience"
            title={
              <>
                Where I&apos;ve <span className="brush text-gradient">worked</span>
              </>
            }
            intro="Internships where I shipped real work: full-stack apps, LLM integrations, and machine learning."
          />
        </Reveal>

        <ol className="grid gap-5 md:grid-cols-2">
          {roles.map((role, i) => {
            const body = (
              <div data-tilt className="tile tile-hover flex h-full flex-col p-7">
                <div className="flex items-start justify-between gap-4">
                  <span className="bg-gradient-brand flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl font-display text-lg font-bold text-white">
                    {role.company.charAt(0)}
                  </span>
                  {isOngoing(role.period) && (
                    <span className="pill !py-1 text-xs font-semibold text-green-600 dark:text-green-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                      Current
                    </span>
                  )}
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-foreground">{role.role}</h3>
                <p className="mt-1 font-medium text-accent">{role.company}</p>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
                  <CalendarDays size={14} />
                  {role.period}
                </p>
                <p className="mt-5 flex-1 leading-relaxed text-muted">{role.description}</p>
                {role.certificateUrl && (
                  <p className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    View experience letter
                    <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </p>
                )}
              </div>
            );
            return (
              <li key={role.company}>
                <Reveal delay={i * 80} className="h-full">
                  {role.certificateUrl ? (
                    <a href={role.certificateUrl} target="_blank" rel="noopener noreferrer" className="group block h-full">
                      {body}
                    </a>
                  ) : (
                    body
                  )}
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
