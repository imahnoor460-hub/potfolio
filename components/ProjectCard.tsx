import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Project } from "@/data/cv";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const isDeployed = project.status === "Completed · Deployed";

  return (
    <article className="paper-card lift group flex h-full flex-col p-4">
      {project.image ? (
        <div className="frame">
          <div className="frame-inner aspect-[16/10]">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0"
                aria-label={`Visit ${project.name} live site`}
              >
                <Image
                  src={project.image}
                  alt={`${project.name} screenshot`}
                  fill
                  className="object-contain transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </a>
            ) : (
              <Image src={project.image} alt={`${project.name} screenshot`} fill className="object-contain" />
            )}
          </div>
        </div>
      ) : (
        <div className="frame">
          <div className="frame-inner flex aspect-[16/10] items-center justify-center bg-[radial-gradient(circle_at_30%_30%,color-mix(in_srgb,var(--accent)_22%,transparent),transparent_60%),radial-gradient(circle_at_75%_70%,color-mix(in_srgb,var(--accent-2)_22%,transparent),transparent_55%)]">
            <span className="font-serif px-6 text-center text-4xl italic leading-tight text-foreground/80">
              {project.name}
            </span>
          </div>
        </div>
      )}

      <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
        <div className="flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          <span>Plate {ROMAN[index] ?? index + 1}</span>
          <span className={`flex items-center gap-1.5 ${isDeployed ? "text-accent-2" : ""}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${isDeployed ? "bg-accent-2" : "bg-muted"}`} />
            {project.status}
          </span>
        </div>

        <h3 className="font-serif mt-2 text-3xl leading-tight text-foreground">
          <Link href={`/projects/${project.slug}`} className="ink-link">
            {project.name}
          </Link>
        </h3>

        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-foreground/70">{project.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>

        {(project.liveUrl || project.links.length > 0) && (
          <div className="mt-6 flex flex-wrap items-center gap-5 border-t border-dashed border-border pt-4 text-sm font-semibold">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-accent transition-transform hover:translate-x-0.5"
              >
                Visit live site
                <ArrowUpRight size={15} />
              </a>
            )}
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-foreground/70 transition-colors hover:text-accent"
              >
                {link.label}
                <ExternalLink size={13} />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
