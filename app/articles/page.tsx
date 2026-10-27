import type { Metadata } from "next";
import Nav from "@/components/Nav";
import PageHeader from "@/components/PageHeader";
import ArticleList from "@/components/ArticleList";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { articles, profile } from "@/data/cv";
import { articleJsonLd, breadcrumbJsonLd, publishedArticles } from "@/lib/seo";
import { absoluteUrl, baseOpenGraph, baseTwitter, defaultSocialImage } from "@/lib/site";

const DESCRIPTION =
  "Mahnoor Iftikhar on Medium: AI agents with long-term memory, MCP, honest model evaluation, and CI/CD with GitHub Actions.";

export const metadata: Metadata = {
  title: "Articles",
  description: DESCRIPTION,
  alternates: { canonical: "/articles" },
  openGraph: {
    ...baseOpenGraph,
    url: "/articles",
    title: "Articles | Mahnoor Iftikhar",
    description: DESCRIPTION,
    images: [defaultSocialImage],
  },
  twitter: {
    ...baseTwitter,
    title: "Articles | Mahnoor Iftikhar",
    description: DESCRIPTION,
    images: [defaultSocialImage],
  },
};

const articlesJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    breadcrumbJsonLd([{ name: "Articles", path: "/articles" }]),
    {
      "@type": "CollectionPage",
      "@id": `${absoluteUrl("/articles")}#page`,
      url: absoluteUrl("/articles"),
      name: "Articles by Mahnoor Iftikhar",
      description: DESCRIPTION,
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: publishedArticles.length,
        itemListElement: publishedArticles.map((article, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: articleJsonLd(article),
        })),
      },
    },
  ],
};

export default function ArticlesPage() {
  return (
    <div className="flex flex-1 flex-col">
      <JsonLd data={articlesJsonLd} />
      <Nav />
      <main className="flex-1">
        <section>
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
            <PageHeader
              crumbs={[{ name: "Articles" }]}
              kicker="Writing"
              title={
                <>
                  All <span className="brush text-gradient">articles</span>
                </>
              }
            >
              Practical write-ups on AI agents, LLMs, and shipping software — all published
              on{" "}
              <a
                href={profile.medium}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-foreground underline decoration-accent decoration-2 underline-offset-4 hover:text-accent"
              >
                Medium
              </a>
              .
            </PageHeader>
            <ArticleList articles={articles} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
