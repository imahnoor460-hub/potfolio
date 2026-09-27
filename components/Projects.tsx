import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import FeaturedProject from "@/components/FeaturedProject";
import Reveal from "@/components/Reveal";
import { projects } from "@/data/cv";

export default function Projects() {
  const homeProjects = projects.filter((p) => p.homepage);
  const featured = homeProjects.find((p) => p.featured);
  const rest = homeProjects.filter((p) => !p.featured);

  return (
    <section id="projects" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Reveal>
          <SectionHeading title="Projects" index="04." />
        </Reveal>

        {featured && (
          <Reveal className="mb-8">
            <FeaturedProject project={featured} />
          </Reveal>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          {rest.map((project, i) => (
            <Reveal key={project.slug} delay={Math.min(i * 60, 240)}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={180}>
          <Link
            href="/projects"
            className="mt-8 inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-4 py-2 font-mono text-sm font-semibold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent hover:bg-accent/5 hover:text-accent"
          >
            View All Projects
            <ArrowUpRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
