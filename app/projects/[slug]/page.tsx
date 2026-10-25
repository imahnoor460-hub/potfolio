import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageIntro from "@/components/PageIntro";
import { profile, projects } from "@/data/cv";
import { SITE_URL, projectJsonLd, jsonLdScriptProps } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  const title = `${project.name} | Project by Mahnoor Iftikhar`;
  const url = `${SITE_URL}/projects/${project.slug}`;

  return {
    title: { absolute: title },
    description: project.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description: project.description,
      ...(project.image ? { images: [{ url: project.image }] } : {}),
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const isDeployed = project.status === "Completed · Deployed";

  return (
    <div className="flex flex-1 flex-col">
      <script {...jsonLdScriptProps(projectJsonLd(project))} />
      <Nav />
      <main className="flex-1">
        <section className="border-b border-border">
          <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
            <PageIntro backHref="/projects" backLabel="Back to all projects" kicker="Project" title={project.name}>
              <div className="mt-6 flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                <span className={`flex items-center gap-1.5 ${isDeployed ? "text-accent-2" : ""}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${isDeployed ? "bg-accent-2" : "bg-muted"}`} />
                  {project.status}
                </span>
                <span aria-hidden className="h-px w-6 bg-border" />
                <span>
                  Built by{" "}
                  <Link href="/about" className="text-accent hover:underline">
                    {profile.name}
                  </Link>
                </span>
              </div>
            </PageIntro>

            {project.image && (
              <div className="paper-card mt-14 p-4">
                <div className="frame">
                  <div className="frame-inner aspect-video">
                    <Image
                      src={project.image}
                      alt={`${project.name} screenshot`}
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="mt-14 grid gap-10 md:grid-cols-[1.6fr_1fr]">
              <p className="font-serif text-[1.6rem] leading-snug text-foreground">{project.description}</p>
              <div>
                <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Technology stack</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-dashed border-border pt-8">
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
              <Link href="/projects" className="btn-line">
                View all projects
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer showIndex={false} />
    </div>
  );
}
