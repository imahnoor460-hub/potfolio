import type { Metadata } from "next";
import Nav from "@/components/Nav";
import PageHeader from "@/components/PageHeader";
import ProjectList from "@/components/ProjectList";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { projects } from "@/data/cv";
import { breadcrumbJsonLd, projectJsonLd } from "@/lib/seo";
import { absoluteUrl, baseOpenGraph, baseTwitter, defaultSocialImage } from "@/lib/site";

const DESCRIPTION =
  "Projects by Mahnoor Iftikhar: a competitor-tracking dashboard, Savora restaurant bookings, an OLX clone, a RAG assistant, Unity games and 3D art.";

export const metadata: Metadata = {
  title: "Projects",
  description: DESCRIPTION,
  alternates: { canonical: "/projects" },
  openGraph: {
    ...baseOpenGraph,
    url: "/projects",
    title: "Projects | Mahnoor Iftikhar",
    description: DESCRIPTION,
    images: [defaultSocialImage],
  },
  twitter: {
    ...baseTwitter,
    title: "Projects | Mahnoor Iftikhar",
    description: DESCRIPTION,
    images: [defaultSocialImage],
  },
};

const projectsJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    breadcrumbJsonLd([{ name: "Projects", path: "/projects" }]),
    {
      "@type": "CollectionPage",
      "@id": `${absoluteUrl("/projects")}#page`,
      url: absoluteUrl("/projects"),
      name: "Projects by Mahnoor Iftikhar",
      description: DESCRIPTION,
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: projects.length,
        itemListElement: projects.map((project, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: projectJsonLd(project),
        })),
      },
    },
  ],
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <JsonLd data={projectsJsonLd} />
      <Nav />
      <main className="flex-1">
        <section>
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <PageHeader
              crumbs={[{ name: "Projects" }]}
              kicker="Everything I've built"
              title={
                <>
                  All <span className="brush text-gradient">projects</span>
                </>
              }
            >
              The full list: full-stack and AI products deployed for real users, plus the games, 3D
              environments, and coursework where I practised specific skills.
            </PageHeader>
            <ProjectList projects={projects} grouped />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
