import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { articles, type ArticleEntry } from "@/data/cv";
import { articleJsonLd, jsonLdScriptProps, publishedArticles } from "@/lib/seo";

function formatDate(iso?: string) {
  if (!iso) return undefined;
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function ArticleLink({ article, children, className = "" }: { article: ArticleEntry; children: ReactNode; className?: string }) {
  if (!article.url) return <div className={className}>{children}</div>;
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block ${className}`}
      aria-label={`Read article: ${article.title}`}
    >
      {children}
    </a>
  );
}

function Meta({ article }: { article: ArticleEntry }) {
  return (
    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
      {article.date ?? formatDate(article.datePublished) ?? (article.url ? "Medium" : "Coming soon")}
      <span className="mx-2 text-accent">✦</span>
      By <span className="text-foreground/80">Mahnoor Iftikhar</span>
    </p>
  );
}

export default function Articles({
  limit,
  viewAllHref,
  showIndex = true,
}: {
  limit?: number;
  viewAllHref?: string;
  showIndex?: boolean;
}) {
  const items = limit ? articles.slice(0, limit) : articles;
  const [lead, ...others] = items;

  return (
    <section id="articles" className="scroll-mt-20 border-b border-border bg-surface-2/40">
      {publishedArticles.map((article) => (
        <script key={article.url} {...jsonLdScriptProps(articleJsonLd(article))} />
      ))}
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        {showIndex && (
          <Reveal>
            <SectionHeading title="From the *journal*" index="07." kicker="Articles" />
          </Reveal>
        )}

        {lead && (
          <Reveal>
            <ArticleLink article={lead}>
              <article className="grid gap-8 border-y-[1.5px] border-foreground py-8 md:grid-cols-[1.2fr_1fr] md:items-center md:gap-12">
                {lead.image && (
                  <div className="frame">
                    <div className="frame-inner aspect-[16/9]">
                      <Image
                        src={lead.image}
                        alt={`${lead.title} cover`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    </div>
                  </div>
                )}
                <div>
                  <p className="mb-3 inline-block rounded-full bg-accent px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-surface">
                    Latest
                  </p>
                  <h3 className="font-serif text-3xl leading-[1.12] text-foreground transition-colors group-hover:text-accent md:text-4xl">
                    {lead.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-foreground/70">{lead.summary}</p>
                  <div className="mt-5 flex items-center justify-between gap-4">
                    <Meta article={lead} />
                    {lead.url && (
                      <ArrowUpRight size={22} className="shrink-0 text-accent transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                    )}
                  </div>
                </div>
              </article>
            </ArticleLink>
          </Reveal>
        )}

        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {others.map((article, i) => (
            <Reveal key={article.title} delay={Math.min(i * 80, 240)} className="h-full">
              <ArticleLink article={article} className="h-full">
                <article className="flex h-full flex-col">
                  {article.image && (
                    <div className="frame">
                      <div className="frame-inner aspect-[16/10]">
                        <Image
                          src={article.image}
                          alt={`${article.title} cover`}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                        />
                      </div>
                    </div>
                  )}
                  <div className="mt-5 flex flex-1 flex-col">
                    <Meta article={article} />
                    <h3 className="font-serif mt-2 text-2xl leading-tight text-foreground transition-colors group-hover:text-accent">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/70">{article.summary}</p>
                  </div>
                </article>
              </ArticleLink>
            </Reveal>
          ))}
        </div>

        {viewAllHref && (
          <Reveal delay={120}>
            <div className="mt-14 flex justify-center">
              <Link href={viewAllHref} className="btn-line">
                Read the whole journal
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
