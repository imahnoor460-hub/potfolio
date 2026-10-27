import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ProjectList from "@/components/ProjectList";
import Reveal from "@/components/Reveal";
import { projects } from "@/data/cv";

export function MoreLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 text-sm font-semibold text-foreground shadow-[var(--shadow)] transition-colors hover:border-accent hover:text-accent"
    >
      {children}
      <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

export default function Projects() {
  const homeProjects = projects.filter((p) => p.homepage);

  return (
    <section id="projects" className="scroll-mt-28">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Projects"
            title={
              <>
                Things I&apos;ve designed and <span className="brush text-gradient">built</span>
              </>
            }
            intro="Full-stack and AI products, built end to end and deployed for real users."
          />
        </Reveal>

        <ProjectList projects={homeProjects} />

        <Reveal delay={120}>
          <div className="mt-12 flex justify-center">
            <MoreLink href="/projects">See all {projects.length} projects</MoreLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
