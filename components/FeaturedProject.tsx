import Image from "next/image";
import { ArrowUpRight, Braces, ExternalLink } from "lucide-react";
import type { Project } from "@/data/cv";

export default function FeaturedProject({ project }: { project: Project }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-accent/30 bg-surface shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:bg-accent/[0.03] hover:shadow-lg">
      <div className="grid gap-0 md:grid-cols-2">
        <div className="flex flex-col justify-center p-6 md:p-10">
          <p className="mb-3 font-mono text-xs font-semibold text-accent">
            <span className="text-muted">{"//"}</span> Featured Project
          </p>
          <h3 className="flex items-center gap-2 text-2xl font-semibold text-foreground md:text-3xl">
            <Braces size={22} className="text-accent" />
            {project.name}
          </h3>
          <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-accent/30 bg-accent/5 px-2.5 py-0.5 text-xs font-medium text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {project.status}
          </span>

          <p className="mt-4 text-sm leading-relaxed text-foreground/70 md:text-base">
            {project.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1.5 font-mono text-xs text-muted">
            {project.tags.map((tag) => (
              <span key={tag} className="flex items-center gap-1">
                <span className="text-accent">▹</span>
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3 text-sm">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-md bg-accent px-4 py-2 font-medium text-white transition-transform hover:-translate-y-0.5 hover:opacity-90"
              >
                Visit Live Site
                <ArrowUpRight size={15} />
              </a>
            )}
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-md border border-border px-4 py-2 font-medium text-foreground/80 transition-colors hover:border-accent hover:bg-accent/5 hover:text-accent"
              >
                {link.label}
                <ExternalLink size={14} />
              </a>
            ))}
          </div>
        </div>

        {project.image ? (
          <div className="relative aspect-video w-full border-t border-border bg-surface-2 md:aspect-auto md:h-full md:border-l md:border-t-0">
            <div className="absolute inset-6 md:inset-10">
              <Image
                src={project.image}
                alt={`${project.name} screenshot`}
                fill
                className="object-contain"
              />
            </div>
          </div>
        ) : (
          <div className="relative flex items-center justify-center border-t border-border bg-surface-2 p-6 md:border-l md:border-t-0 md:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,color-mix(in_srgb,var(--accent)_10%,transparent),transparent_60%)]" />
            <div className="relative w-full max-w-sm overflow-hidden rounded-lg border border-border bg-surface shadow-lg">
              <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                <span className="h-2 w-2 rounded-full bg-[#28c840]" />
                <span className="ml-1 truncate font-mono text-[11px] font-medium text-muted">
                  {project.name}
                </span>
              </div>
              <div className="space-y-3 p-4">
                <div className="grid grid-cols-3 gap-2">
                  <div className="h-16 rounded border border-accent/30 bg-accent/5" />
                  <div className="h-16 rounded bg-surface-2" />
                  <div className="h-16 rounded bg-surface-2" />
                </div>
                <div className="h-2 w-full rounded bg-surface-2" />
                <div className="h-2 w-5/6 rounded bg-surface-2" />
                <div className="h-2 w-3/4 rounded bg-surface-2" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
