import {
  siBlender,
  siCplusplus,
  siDjango,
  siFastapi,
  siFirebase,
  siMysql,
  siNextdotjs,
  siOpenjdk,
  siPython,
  siReact,
  siUnity,
} from "simple-icons";
import { Box, Cloud, Code2, Gamepad2, LayoutTemplate, Sparkles, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { skillGroups } from "@/data/cv";

// Logo path per skill name, for the skills that have a brand mark.
const LOGOS: Record<string, string> = {
  Python: siPython.path,
  "C++": siCplusplus.path,
  Java: siOpenjdk.path,
  SQL: siMysql.path,
  Unity: siUnity.path,
  Blender: siBlender.path,
  Django: siDjango.path,
  React: siReact.path,
  FastAPI: siFastapi.path,
  "Next.js": siNextdotjs.path,
  "Firebase (Basic)": siFirebase.path,
};

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "AI & LLMs": Sparkles,
  "Full-Stack Web": LayoutTemplate,
  "Programming Languages": Code2,
  "Game Development": Gamepad2,
  "3D Design & Tools": Box,
  "Cloud (AWS)": Cloud,
  "Other Technologies": Wrench,
};

export default function Skills() {
  // Lead with the areas the work centres on.
  const lead = ["AI & LLMs", "Full-Stack Web", "Cloud (AWS)"];
  const groups = [
    ...lead.flatMap((c) => skillGroups.filter((g) => g.category === c)),
    ...skillGroups.filter((g) => !lead.includes(g.category)),
  ];
  const total = groups.reduce((n, g) => n + g.skills.length, 0);

  return (
    <section id="skills" className="scroll-mt-28">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Skills"
            title={
              <>
                My <span className="brush text-gradient">toolkit</span>
              </>
            }
            intro={`${total} languages, frameworks, and tools across ${groups.length} areas — all in one view.`}
          />
        </Reveal>

        {/* Masonry-style columns so cards of different heights pack neatly. */}
        <div className="columns-1 gap-5 md:columns-2 lg:columns-3">
          {groups.map((group, i) => {
            const Icon = CATEGORY_ICONS[group.category] ?? Sparkles;
            return (
              <Reveal key={group.category} delay={Math.min(i * 50, 250)} className="mb-5 break-inside-avoid">
                <div data-tilt className="tile tile-hover p-6">
                  <div className="flex items-center gap-3">
                    <span className="bg-gradient-brand flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-white">
                      <Icon size={18} strokeWidth={1.8} />
                    </span>
                    <h3 className="font-display text-lg font-semibold text-foreground">{group.category}</h3>
                    <span className="ml-auto rounded-full bg-surface-2 px-2 py-0.5 text-xs font-semibold text-muted">
                      {group.skills.length}
                    </span>
                  </div>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <li
                        key={skill}
                        className="group/pill flex cursor-default items-center gap-2 rounded-lg border border-border bg-surface px-3 py-1.5 text-sm font-medium text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-transparent hover:bg-linear-to-br hover:from-(--brand-1) hover:to-(--brand-2) hover:text-white hover:shadow-[0_8px_18px_-8px_var(--brand-1)]"
                      >
                        {LOGOS[skill] ? (
                          <svg
                            aria-hidden="true"
                            viewBox="0 0 24 24"
                            className="h-4 w-4 fill-current text-accent transition-colors group-hover/pill:text-white"
                          >
                            <path d={LOGOS[skill]} />
                          </svg>
                        ) : (
                          <span
                            aria-hidden="true"
                            className="h-1.5 w-1.5 rounded-full bg-accent transition-colors group-hover/pill:bg-white"
                          />
                        )}
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
