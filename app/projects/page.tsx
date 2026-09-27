import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import FeaturedProject from "@/components/FeaturedProject";
import { projects } from "@/data/cv";

export const metadata: Metadata = {
  title: "Projects",
  description: "All projects built by Mahnoor Iftikhar.",
};

export default function ProjectsPage() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <main className="flex-1">
        <section className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-1.5 font-mono text-sm text-muted transition-colors hover:text-accent"
            >
              <ArrowLeft size={14} />
              Back to home
            </Link>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              All Projects
            </h1>

            <div className="mt-10 space-y-8">
              {featured.map((project) => (
                <FeaturedProject key={project.slug} project={project} />
              ))}
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {rest.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer showIndex={false} />
    </div>
  );
}
