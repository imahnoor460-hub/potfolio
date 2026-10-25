import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PageIntro from "@/components/PageIntro";
import ProjectCard from "@/components/ProjectCard";
import FeaturedProject from "@/components/FeaturedProject";
import { projects } from "@/data/cv";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Full-stack, AI, and game development projects built by Mahnoor Iftikhar, including Savora, an OLX clone, and a Competitive Intelligence Monitor dashboard.",
  alternates: { canonical: `${SITE_URL}/projects` },
};

export default function ProjectsPage() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <main className="flex-1">
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <PageIntro kicker="The collection" title="All" italic="projects">
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/70">
                Full-stack products, AI tools, games, and 3D worlds — everything I&apos;ve built, in one place.
              </p>
            </PageIntro>

            <div className="mt-20 space-y-16">
              {featured.map((project) => (
                <FeaturedProject key={project.slug} project={project} />
              ))}
            </div>

            <div className="mt-20 grid gap-10 md:grid-cols-2">
              {rest.map((project, i) => (
                <ProjectCard key={project.slug} project={project} index={i} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer showIndex={false} />
    </div>
  );
}
