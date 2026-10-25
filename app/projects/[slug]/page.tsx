import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Braces, ExternalLink } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
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
          <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
            <Link
              href="/projects"
              className="mb-6 inline-flex items-center gap-1.5 font-mono text-sm text-muted transition-colors hover:text-accent"
            >
              <ArrowLeft size={14} />
              Back to all projects
            </Link>

            {project.image && (
              <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-xl border border-border bg-surface-2">
                <Image
                  src={project.image}
                  alt={`${project.name} screenshot`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            )}

            <div className="flex items-center justify-between gap-3">
              <h1 className="flex items-center gap-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                <Braces size={26} className="text-accent" />
                {project.name}
              </h1>
              <span
                className={`flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                  isDeployed
                    ? "border-accent/30 bg-accent/5 text-accent"
                    : "border-border text-muted"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${isDeployed ? "bg-accent" : "bg-muted"}`}
                />
                {project.status}
              </span>
            </div>

            <p className="mt-2 font-mono text-sm text-muted">
              Built by{" "}
              <Link href="/about" className="text-accent hover:underline">
                {profile.name}
              </Link>
            </p>

            <p className="mt-6 leading-relaxed text-foreground/80">{project.description}</p>

            <div className="mt-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
                Technology Stack
              </h2>
              <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5 font-mono text-xs text-muted">
                {project.tags.map((tag) => (
                  <span key={tag} className="flex items-center gap-1">
                    <span className="text-accent">▹</span>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {(project.liveUrl || project.links.length > 0) && (
              <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-border pt-6 text-sm">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-md bg-accent px-4 py-2 font-medium text-white transition-opacity hover:opacity-90"
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
            )}

            <div className="mt-10">
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-4 py-2 font-mono text-sm font-semibold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent hover:bg-accent/5 hover:text-accent"
              >
                View All Projects
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
