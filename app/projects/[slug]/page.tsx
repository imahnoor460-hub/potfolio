import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Nav from "@/components/Nav";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import ProjectCard, { ProjectLinks, ProjectShot, ProjectStatus, ProjectTags } from "@/components/ProjectCard";
import { profile, projects } from "@/data/cv";
import { breadcrumbJsonLd, projectJsonLd } from "@/lib/seo";
import { baseOpenGraph, baseTwitter, defaultSocialImage, metaDescription } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  const title = `${project.name} — Project by ${profile.name}`;
  const path = `/projects/${project.slug}`;
  const description = metaDescription(project.description);
  const images = project.image
    ? [{ url: project.image, alt: `${project.name} screenshot` }]
    : [defaultSocialImage];

  return {
    title: { absolute: title },
    description,
    keywords: [...project.tags, profile.name],
    alternates: { canonical: path },
    openGraph: { ...baseOpenGraph, type: "article", url: path, title, description, images },
    twitter: { ...baseTwitter, title, description, images },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const project = projects[index];
  const others = projects.filter((p) => p.slug !== slug && p.group === project.group).slice(0, 2);

  const pageJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbJsonLd([
        { name: "Projects", path: "/projects" },
        { name: project.name, path: `/projects/${project.slug}` },
      ]),
      projectJsonLd(project),
    ],
  };

  return (
    <div className="flex flex-1 flex-col">
      <JsonLd data={pageJsonLd} />
      <Nav />
      <main className="flex-1">
        <article>
          <div className="mx-auto max-w-5xl px-6 py-14 md:py-20">
            <PageHeader
              crumbs={[{ name: "Projects", href: "/projects" }, { name: project.name }]}
              kicker={`Project ${index + 1} of ${projects.length}`}
              title={project.name}
            >
              {project.description}
            </PageHeader>

            <div className="grid gap-5 lg:grid-cols-[1.6fr_1fr]">
              <div className="tile p-3 sm:p-4">
                <ProjectShot project={project} sizes="(min-width: 1024px) 40rem, 100vw" priority />
              </div>

              <aside className="tile flex flex-col gap-7 p-6">
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">Status</h2>
                  <div className="mt-3">
                    <ProjectStatus project={project} />
                  </div>
                </div>
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">Built with</h2>
                  <div className="mt-3">
                    <ProjectTags tags={project.tags} />
                  </div>
                </div>
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">Built by</h2>
                  <p className="mt-3">
                    <Link href="/about" className="link-underline font-semibold text-foreground">
                      {profile.name}
                    </Link>
                  </p>
                </div>
                {(project.liveUrl || project.links.length > 0) && (
                  <div className="mt-auto border-t border-border pt-6">
                    <ProjectLinks project={project} />
                  </div>
                )}
              </aside>
            </div>
          </div>
        </article>

        {others.length > 0 && (
          <section aria-labelledby="more-projects" className="border-t border-border bg-surface-2/60">
            <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <h2 id="more-projects" className="font-display text-3xl font-bold text-foreground">
                  More <span className="brush text-gradient">projects</span>
                </h2>
                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-accent"
                >
                  All projects
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {others.map((p) => (
                  <ProjectCard key={p.slug} project={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
