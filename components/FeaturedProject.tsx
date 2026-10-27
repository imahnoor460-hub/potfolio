import Link from "next/link";
import { Sparkles } from "lucide-react";
import { ProjectLinks, ProjectShot, ProjectStatus, ProjectTags } from "@/components/ProjectCard";
import type { Project } from "@/data/cv";

/** The featured project as a wide bento tile: story on the left, screenshot on the right. */
export default function FeaturedProject({ project }: { project: Project }) {
  return (
    <article className="group">
      <div data-tilt="3" className="tile tile-hover grid items-center gap-8 overflow-hidden p-4 md:p-6 lg:grid-cols-[1fr_1.35fr]">
        <div className="px-2 py-2 lg:py-4 lg:pl-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-gradient-brand inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white">
              <Sparkles size={12} />
              Featured
            </span>
            <ProjectStatus project={project} />
          </div>
          <h3 className="mt-5 font-display text-3xl font-bold leading-tight text-foreground md:text-4xl">
            <Link href={`/projects/${project.slug}`} className="link-underline">
              {project.name}
            </Link>
          </h3>
          <p className="mt-4 leading-relaxed text-muted">{project.description}</p>
          <div className="mt-6">
            <ProjectTags tags={project.tags} />
          </div>
          <div className="mt-7">
            <ProjectLinks project={project} />
          </div>
        </div>
        <Link href={`/projects/${project.slug}`} aria-label={`${project.name} — project details`} tabIndex={-1}>
          <ProjectShot project={project} sizes="(min-width: 1024px) 38rem, 100vw" priority />
        </Link>
      </div>
    </article>
  );
}
