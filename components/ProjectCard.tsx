import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/cv";

export function ProjectStatus({ project }: { project: Project }) {
  const isLive = project.status === "Completed · Deployed";
  return (
    <span
      className={`pill !py-1 text-xs font-semibold ${isLive ? "text-green-600 dark:text-green-400" : "text-muted"}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${isLive ? "bg-green-500 animate-pulse-dot" : "bg-muted"}`} />
      {isLive ? "Live" : "Completed"}
    </span>
  );
}

export function ProjectLinks({ project }: { project: Project }) {
  if (!project.liveUrl && project.links.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-2">
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-brand inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Live site
          <ArrowUpRight size={15} />
        </a>
      )}
      {project.links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
        >
          {link.label}
          <ArrowUpRight size={15} />
        </a>
      ))}
    </div>
  );
}

export function ProjectTags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <li key={tag} className="rounded-md bg-surface-2 px-2 py-1 text-xs font-medium text-muted">
          {tag}
        </li>
      ))}
    </ul>
  );
}

/** Screenshot frame: wide shots keep their ratio; portrait ones are fitted in. */
export function ProjectShot({ project, sizes, priority }: { project: Project; sizes: string; priority?: boolean }) {
  if (!project.image) {
    return (
      <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-accent/15 via-surface-2 to-accent-2/15">
        <span aria-hidden="true" className="font-display text-3xl font-bold text-foreground/20">
          {project.tags[0]}
        </span>
      </div>
    );
  }
  const [w, h] = (project.imageAspect ?? "16/9").split("/").map(Number);
  const isPortrait = h > w;
  return (
    <div
      className="relative overflow-hidden rounded-xl border border-border bg-surface-2"
      style={{ aspectRatio: isPortrait ? "16/10" : project.imageAspect ?? "16/9" }}
    >
      <Image
        src={project.image}
        alt={`${project.name} screenshot`}
        fill
        priority={priority}
        sizes={sizes}
        className={`${isPortrait ? "object-contain py-3" : "object-cover object-top"} transition-transform duration-700 group-hover:scale-[1.03]`}
      />
    </div>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group h-full">
      <div data-tilt className="tile tile-hover flex h-full flex-col p-4">
        <Link href={`/projects/${project.slug}`} aria-label={`${project.name} — project details`} tabIndex={-1}>
          <ProjectShot project={project} sizes="(min-width: 768px) 30rem, 100vw" />
        </Link>
        <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-display text-xl font-semibold text-foreground">
              <Link href={`/projects/${project.slug}`} className="link-underline">
                {project.name}
              </Link>
            </h3>
            <ProjectStatus project={project} />
          </div>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>
          <div className="mt-5">
            <ProjectTags tags={project.tags} />
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
            <ProjectLinks project={project} />
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1 text-sm font-semibold text-muted transition-colors hover:text-accent"
            >
              Details
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
