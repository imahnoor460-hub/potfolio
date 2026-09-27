import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, Newspaper } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { articles } from "@/data/cv";

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

  return (
    <section id="articles" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Reveal>
          <SectionHeading title="Articles" index={showIndex ? "07." : undefined} />
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((article, i) => {
            const isLive = Boolean(article.url);
            const content = (
              <div
                className={`flex h-full flex-col overflow-hidden rounded-xl border transition-all ${
                  isLive
                    ? "border-border bg-surface shadow-sm hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/[0.03] hover:shadow-md"
                    : "border-border/60 bg-surface-2/60"
                }`}
              >
                {article.image && (
                  <div className="relative aspect-video w-full border-b border-border bg-surface-2">
                    <Image
                      src={article.image}
                      alt={`${article.title} cover`}
                      fill
                      className="object-contain"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <div className="flex items-center gap-2">
                    <Newspaper size={16} className="text-accent" />
                    <span className="font-mono text-xs uppercase tracking-wide text-muted">
                      {article.date ?? (isLive ? "Read on Medium" : "Coming soon")}
                    </span>
                  </div>
                  <h3 className="flex items-center gap-1.5 text-base font-semibold text-foreground">
                    {article.title}
                    {isLive && (
                      <ExternalLink size={13} className="flex-shrink-0 text-muted" />
                    )}
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground/70">
                    {article.summary}
                  </p>
                </div>
              </div>
            );

            return (
              <Reveal key={article.title + i} delay={Math.min(i * 60, 240)}>
                {isLive ? (
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block h-full"
                    aria-label={`Read article: ${article.title}`}
                  >
                    {content}
                  </a>
                ) : (
                  content
                )}
              </Reveal>
            );
          })}
        </div>

        {viewAllHref && (
          <Reveal delay={120}>
            <Link
              href={viewAllHref}
              className="mt-8 inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-4 py-2 font-mono text-sm font-semibold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent hover:bg-accent/5 hover:text-accent"
            >
              View All Articles
              <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
