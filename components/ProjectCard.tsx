import Image from "next/image";
import { ArrowUpRight, Braces, ExternalLink } from "lucide-react";
import type { Project } from "@/data/cv";

export default function ProjectCard({ project }: { project: Project }) {
  const isDeployed = project.status === "Completed · Deployed";

  return (
    <div className="group flex h-full flex-col rounded-xl border border-border bg-surface p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/[0.03] hover:shadow-md">
      {project.image &&
        (project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative mb-4 -mx-6 -mt-6 overflow-hidden rounded-t-xl border-b border-border bg-surface-2"
            style={{ aspectRatio: project.imageAspect ?? "16/9" }}
            aria-label={`Visit ${project.name} live site`}
          >
            <Image
              src={project.image}
              alt={`${project.name} screenshot`}
              fill
              className="object-contain transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </a>
        ) : (
          <div
            className="relative mb-4 -mx-6 -mt-6 overflow-hidden rounded-t-xl border-b border-border bg-surface-2"
            style={{ aspectRatio: project.imageAspect ?? "16/9" }}
          >
            <Image
              src={project.image}
              alt={`${project.name} screenshot`}
              fill
              className="object-contain"
            />
          </div>
        ))}

      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <Braces size={16} className="text-accent" />
          {project.name}
        </h3>
        <span
          className={`flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-medium ${
            isDeployed
              ? "border-accent/30 bg-accent/5 text-accent"
              : "border-border text-muted"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              isDeployed ? "bg-accent" : "bg-muted"
            }`}
          />
          {project.status}
        </span>
      </div>

      <p className="mb-4 flex-1 text-sm leading-relaxed text-foreground/70">
        {project.description}
      </p>

      <div className="mb-4 flex flex-wrap gap-x-3 gap-y-1.5 font-mono text-xs text-muted">
        {project.tags.map((tag) => (
          <span key={tag} className="flex items-center gap-1">
            <span className="text-accent">▹</span>
            {tag}
          </span>
        ))}
      </div>

      {(project.liveUrl || project.links.length > 0) && (
        <div className="flex flex-wrap items-center gap-3 border-t border-border pt-4 text-sm">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 font-medium text-white transition-opacity hover:opacity-90"
            >
              Visit Live Site
              <ArrowUpRight size={14} />
            </a>
          )}
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-md px-2 py-1 font-medium text-muted transition-colors hover:bg-accent/10 hover:text-accent"
            >
              {link.label}
              <ExternalLink size={14} />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
