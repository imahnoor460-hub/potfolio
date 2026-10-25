import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import GithubIcon from "@/components/GithubIcon";
import LinkedinIcon from "@/components/LinkedinIcon";
import MediumIcon from "@/components/MediumIcon";
import { profile, education, experiences, articles } from "@/data/cv";
import { SITE_URL, profilePageJsonLd, jsonLdScriptProps } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "About Mahnoor Iftikhar | Full-Stack Developer & AI Engineer" },
  description:
    "About Mahnoor Iftikhar — a Computer Science student at the University of Central Punjab (UCP) and Full-Stack Developer & AI Engineer working with React, Next.js, Django, LLMs, and agentic workflows.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    type: "profile",
    url: `${SITE_URL}/about`,
    title: "About Mahnoor Iftikhar | Full-Stack Developer & AI Engineer",
    description:
      "Computer Science student at UCP and Full-Stack Developer & AI Engineer working with React, Next.js, Django, LLMs, and agentic workflows.",
  },
};

export default function AboutPage() {
  const linkedArticles = articles.filter((a) => Boolean(a.url));

  return (
    <div className="flex flex-1 flex-col">
      <script {...jsonLdScriptProps(profilePageJsonLd())} />
      <Nav />
      <main className="flex-1">
        <section className="border-b border-border">
          <div className="mx-auto max-w-3xl px-6 py-16 md:py-20">
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-1.5 font-mono text-sm text-muted transition-colors hover:text-accent"
            >
              <ArrowLeft size={14} />
              Back to home
            </Link>

            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              About {profile.name}
            </h1>
            <p className="mt-2 text-lg font-medium text-muted">{profile.title}</p>

            <div className="mt-8 space-y-4 leading-relaxed text-foreground/80">
              <p>{profile.summary}</p>
              <p>
                {profile.name} is currently pursuing a{" "}
                {education[0].degree} at{" "}
                <strong className="font-semibold text-foreground">
                  {education[0].school}
                </strong>{" "}
                ({education[0].period}). Her work spans{" "}
                <Link href="/projects" className="text-accent underline decoration-accent/30 underline-offset-2 hover:decoration-accent">
                  full-stack web projects
                </Link>{" "}
                built with Django, React, FastAPI, and Next.js, alongside AI
                engineering work that integrates large language models into
                production-style, agentic workflows.
              </p>
              {experiences.map((exp) => (
                <p key={exp.company}>
                  As {exp.role} at <strong className="font-semibold text-foreground">{exp.company}</strong>
                  {exp.period ? ` (${exp.period})` : ""}, she {exp.description.charAt(0).toLowerCase() + exp.description.slice(1)}
                </p>
              ))}
              <p>
                Outside of software and AI, she also has a background in game
                development and 3D design, having built projects in Unity and
                Blender.
              </p>
            </div>

            <div className="mt-10 rounded-xl border border-border bg-surface p-6 shadow-sm">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
                Connect
              </h2>
              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2 font-medium text-foreground transition-colors hover:border-accent hover:bg-accent/5 hover:text-accent"
                >
                  <GithubIcon size={16} />
                  GitHub
                  <ExternalLink size={13} className="text-muted" />
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2 font-medium text-foreground transition-colors hover:border-accent hover:bg-accent/5 hover:text-accent"
                >
                  <LinkedinIcon size={16} />
                  LinkedIn
                  <ExternalLink size={13} className="text-muted" />
                </a>
                <a
                  href={profile.medium}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2 font-medium text-foreground transition-colors hover:border-accent hover:bg-accent/5 hover:text-accent"
                >
                  <MediumIcon size={16} />
                  Medium
                  <ExternalLink size={13} className="text-muted" />
                </a>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-4 py-2 font-mono text-sm font-semibold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent hover:bg-accent/5 hover:text-accent"
              >
                View Projects
                <ArrowUpRight size={16} />
              </Link>
              {linkedArticles.length > 0 && (
                <Link
                  href="/articles"
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-4 py-2 font-mono text-sm font-semibold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent hover:bg-accent/5 hover:text-accent"
                >
                  Read Articles
                  <ArrowUpRight size={16} />
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer showIndex={false} />
    </div>
  );
}
