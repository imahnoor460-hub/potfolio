import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { Project } from "@/data/cv";

export default function FeaturedProject({ project }: { project: Project }) {
  return (
    <article className="group relative grid gap-10 md:grid-cols-[1.25fr_1fr] md:items-center">
      <div className="relative">
        <div className="paper-card relative p-4">
          <div className="frame">
            <div className="frame-inner aspect-[16/10]">
              {project.image &&
                (project.liveUrl ? (
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
                      className="object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </a>
                ) : (
                  <Image src={project.image} alt={`${project.name} screenshot`} fill className="object-contain" />
                ))}
            </div>
          </div>
          <p className="font-serif mt-3 px-1 text-center text-sm italic text-muted">
            {project.name} · {project.status}
          </p>
        </div>
      </div>

      <div>
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
          Featured project
        </p>
        <h3 className="font-serif mt-3 text-5xl leading-[0.95] text-foreground md:text-6xl">
          <Link href={`/projects/${project.slug}`} className="ink-link">
            {project.name}
          </Link>
        </h3>
        <p className="mt-5 text-lg leading-relaxed text-foreground/75">{project.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="chip">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-ink">
              Visit live site
              <ArrowUpRight size={15} />
            </a>
          )}
          {project.links.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="btn-line">
              {link.label}
              <ExternalLink size={14} />
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
