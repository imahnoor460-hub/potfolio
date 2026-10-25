import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageIntro from "@/components/PageIntro";
import GithubIcon from "@/components/GithubIcon";
import LinkedinIcon from "@/components/LinkedinIcon";
import MediumIcon from "@/components/MediumIcon";
import { profile, experiences, articles } from "@/data/cv";
import { SITE_URL, profilePageJsonLd, jsonLdScriptProps } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: "About Mahnoor Iftikhar | Full-Stack Developer & AI Engineer" },
  description:
    "About Mahnoor Iftikhar — a Full-Stack Developer & AI Engineer from Lahore, Pakistan, working with React, Next.js, Django, LLMs, and agentic workflows.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    type: "profile",
    url: `${SITE_URL}/about`,
    title: "About Mahnoor Iftikhar | Full-Stack Developer & AI Engineer",
    description:
      "Full-Stack Developer & AI Engineer working with React, Next.js, Django, LLMs, and agentic workflows.",
  },
};

export default function AboutPage() {
  const linkedArticles = articles.filter((a) => Boolean(a.url));
  const socials = [
    { href: profile.github, label: "GitHub", icon: <GithubIcon size={16} /> },
    { href: profile.linkedin, label: "LinkedIn", icon: <LinkedinIcon size={16} /> },
    { href: profile.medium, label: "Medium", icon: <MediumIcon size={16} /> },
  ];

  return (
    <div className="flex flex-1 flex-col">
      <script {...jsonLdScriptProps(profilePageJsonLd())} />
      <Nav />
      <main className="flex-1">
        <section className="border-b border-border">
          <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
            <PageIntro kicker={profile.title} title="About" italic={profile.name} />

            <div className="mt-12 space-y-6 text-lg leading-relaxed text-foreground/80">
              <p className="dropcap font-serif text-[1.6rem] leading-snug text-foreground">{profile.summary}</p>
              <p>
                Her work spans{" "}
                <Link href="/projects" className="highlight font-medium text-foreground">
                  full-stack web projects
                </Link>{" "}
                built with Django, React, FastAPI, and Next.js, alongside AI
                engineering work that integrates large language models into
                production-style, agentic workflows.
              </p>
              {experiences.map((exp) => (
                <p key={exp.company}>
                  As {exp.role} at <strong className="font-semibold text-accent">{exp.company}</strong>
                  {exp.period ? ` (${exp.period})` : ""}, she {exp.description.charAt(0).toLowerCase() + exp.description.slice(1)}
                </p>
              ))}
              <p>
                Outside of software and AI, she also has a background in game
                development and 3D design, having built projects in Unity and
                Blender.
              </p>
            </div>

            <div className="paper-card mt-14 p-7">
              <h2 className="font-serif text-3xl text-foreground">
                Let&apos;s <em className="italic text-accent">connect</em>
              </h2>
              <div className="mt-5 flex flex-wrap gap-3">
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="btn-line">
                    {s.icon}
                    {s.label}
                    <ExternalLink size={13} />
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/projects" className="btn-ink">
                View projects
                <ArrowUpRight size={16} />
              </Link>
              {linkedArticles.length > 0 && (
                <Link href="/articles" className="btn-line">
                  Read articles
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
