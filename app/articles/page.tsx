import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Articles from "@/components/Articles";
import PageIntro from "@/components/PageIntro";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Articles by Mahnoor Iftikhar on building AI agents with long-term memory, the Model Context Protocol (MCP), LLM infrastructure, and CI/CD for full-stack deployment, published on Medium.",
  alternates: { canonical: `${SITE_URL}/articles` },
};

export default function ArticlesPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6 pt-16 md:pt-20">
          <PageIntro kicker="Writing" title="The" italic="journal">
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/70">
              Notes on AI agents, LLM infrastructure, and shipping full-stack software.
            </p>
          </PageIntro>
        </div>
        <Articles showIndex={false} />
      </main>
      <Footer showIndex={false} />
    </div>
  );
}
