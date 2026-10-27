import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Nav from "@/components/Nav";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { articles, experiences, profile, projects } from "@/data/cv";
import { breadcrumbJsonLd } from "@/lib/seo";
import { PERSON_ID, absoluteUrl, baseOpenGraph, baseTwitter, defaultSocialImage } from "@/lib/site";

const DESCRIPTION =
  "Mahnoor Iftikhar is a Full-Stack Developer and AI Engineer from Lahore with internships at Arbisoft and Arch Technologies in full-stack web and AI.";

export const metadata: Metadata = {
  title: "About",
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    ...baseOpenGraph,
    type: "profile",
    url: "/about",
    title: "About Mahnoor Iftikhar",
    description: DESCRIPTION,
    images: [defaultSocialImage],
  },
  twitter: {
    ...baseTwitter,
    title: "About Mahnoor Iftikhar",
    description: DESCRIPTION,
    images: [defaultSocialImage],
  },
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    breadcrumbJsonLd([{ name: "About", path: "/about" }]),
    {
      "@type": "AboutPage",
      "@id": `${absoluteUrl("/about")}#page`,
      url: absoluteUrl("/about"),
      name: `About ${profile.name}`,
      description: DESCRIPTION,
      mainEntity: { "@id": PERSON_ID },
    },
  ],
};

export default function AboutPage() {
  const live = projects.filter((p) => p.status === "Completed · Deployed").length;

  return (
    <div className="flex flex-1 flex-col">
      <JsonLd data={aboutJsonLd} />
      <Nav />
      <main className="flex-1">
        <section>
          <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
            <PageHeader
              crumbs={[{ name: "About" }]}
              kicker={profile.title}
              title={
                <>
                  About Mahnoor <span className="brush text-gradient">Iftikhar</span>
                </>
              }
            />

            <div className="space-y-6 text-lg leading-relaxed text-foreground/80">
              <p className="font-display text-[1.75rem] leading-snug text-foreground">{profile.summary}</p>
              <p>
                Her work spans{" "}
                <Link
                  href="/projects"
                  className="font-medium text-foreground underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
                >
                  {projects.length} projects
                </Link>
                , {live} of them live in production, built with Django, React, FastAPI, and Next.js,
                alongside AI engineering that brings large language models into agentic workflows.
              </p>
              <h2 className="pt-6 font-display text-3xl text-foreground">Experience</h2>
              {experiences.map((exp) => (
                <p key={exp.company}>
                  As <strong className="font-semibold text-foreground">{exp.role}</strong> at{" "}
                  <strong className="font-semibold text-accent">{exp.company}</strong>
                  {exp.period ? ` (${exp.period})` : ""}, she{" "}
                  {exp.description.charAt(0).toLowerCase() + exp.description.slice(1)}
                </p>
              ))}
              <h2 className="pt-6 font-display text-3xl text-foreground">Writing</h2>
              <p>
                She writes about AI agents, LLMs, and software delivery on Medium — {articles.length}{" "}
                articles so far, from engineering memory for production agents to how overfitting and data
                leakage make models look better than they are.
              </p>
              <h2 className="pt-6 font-display text-3xl text-foreground">Beyond the web</h2>
              <p>
                Outside of software and AI she has a background in game development and 3D design, building
                games in Unity and environments in Blender.
              </p>
            </div>

            <div className="mt-14 grid gap-4 sm:grid-cols-2">
              <Link href="/projects" className="group">
                <div data-tilt className="tile tile-hover flex items-center justify-between rounded-xl p-5">
                  <span className="font-display text-2xl text-foreground">See the projects</span>
                  <ArrowRight size={18} className="text-accent transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
              <Link href="/articles" className="group">
                <div data-tilt className="tile tile-hover flex items-center justify-between rounded-xl p-5">
                  <span className="font-display text-2xl text-foreground">Read the articles</span>
                  <ArrowRight size={18} className="text-accent transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
