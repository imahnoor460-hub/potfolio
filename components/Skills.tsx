import type { CSSProperties } from "react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { skillGroups } from "@/data/cv";

const SWATCHES = ["bg-accent", "bg-accent-2", "bg-accent-3", "bg-foreground"];
// Same colours as the swatches, for tinting each domain's skill chips.
const SWATCH_VARS = ["var(--accent)", "var(--accent-2)", "var(--accent-3)", "var(--foreground)"];

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 border-b border-border bg-surface-2/40">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <SectionHeading title="The *palette*" index="05." kicker="Skills & tools" />
        </Reveal>

        <div className="grid gap-x-12 md:grid-cols-2">
          {skillGroups.map((group, i) => (
            <Reveal key={group.category} delay={Math.min(i * 50, 250)}>
              <div
                className="group grid grid-cols-[auto_1fr] gap-5 border-t border-foreground/20 py-7"
                style={{ "--chip": SWATCH_VARS[i % SWATCH_VARS.length] } as CSSProperties}
              >
                <span
                  aria-hidden
                  className={`mt-1.5 h-8 w-8 rounded-full ${SWATCHES[i % SWATCHES.length]} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-45 [border-radius:46%_54%_60%_40%/50%_42%_58%_50%]`}
                />
                <div>
                  <h3 className="font-serif text-2xl leading-tight text-foreground">{group.category}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span key={skill} className="chip chip-tinted">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
