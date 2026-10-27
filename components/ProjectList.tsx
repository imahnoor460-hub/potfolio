import ProjectCard from "@/components/ProjectCard";
import FeaturedProject from "@/components/FeaturedProject";
import Reveal from "@/components/Reveal";
import type { Project } from "@/data/cv";

const GROUP_LABELS = {
  selected: "Web & AI projects",
  earlier: "Games, 3D & coursework",
} as const;

function Grid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {projects.map((project, i) => (
        <Reveal key={project.slug} delay={Math.min(i * 60, 240)} className="h-full">
          <ProjectCard project={project} />
        </Reveal>
      ))}
    </div>
  );
}

/**
 * Featured project(s) first as wide tiles, then the rest in a two-column grid.
 * With `grouped`, the rest are split into web & AI work and earlier projects.
 */
export default function ProjectList({ projects, grouped = false }: { projects: Project[]; grouped?: boolean }) {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const groups = grouped
    ? (["selected", "earlier"] as const)
        .map((key) => ({
          key,
          label: GROUP_LABELS[key],
          items: rest.filter((p) => (p.group ?? "selected") === key),
        }))
        .filter((g) => g.items.length > 0)
    : [{ key: "all", label: undefined, items: rest }];

  return (
    <div className="space-y-14">
      {featured.map((project) => (
        <Reveal key={project.slug}>
          <FeaturedProject project={project} />
        </Reveal>
      ))}
      {groups.map((group) => (
        <div key={group.key}>
          {group.label && <h2 className="eyebrow mb-6">{group.label}</h2>}
          <Grid projects={group.items} />
        </div>
      ))}
    </div>
  );
}
