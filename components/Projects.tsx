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
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <SectionHeading title="Selected *works*" index="04." kicker="Projects" />
        </Reveal>

        {featured && (
          <Reveal className="mb-20">
            <FeaturedProject project={featured} />
          </Reveal>
        )}

        <div className="grid gap-10 md:grid-cols-2">
          {rest.map((project, i) => (
            <Reveal key={project.slug} delay={Math.min(i * 60, 240)}>
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
          <Reveal delay={180} className={rest.length % 2 === 0 ? "md:col-span-2" : ""}>
            <Link
              href="/projects"
              className="group flex h-full min-h-56 flex-col items-center justify-center gap-4 rounded-[4px] border-2 border-dashed border-foreground/25 p-10 text-center transition-colors hover:border-accent hover:bg-accent/5"
            >
              <p className="font-serif text-4xl leading-tight text-foreground">
                {projects.length - homeProjects.length} more in the <em className="italic text-accent">collection</em>
              </p>
              <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.2em] text-muted group-hover:text-accent">
                View all projects
                <ArrowUpRight size={14} />
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
