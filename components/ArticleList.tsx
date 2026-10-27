import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import type { ArticleEntry } from "@/data/cv";
import { formatDate } from "@/lib/site";

/** Articles as magazine rows: cover on the left, headline and summary beside it. */
export default function ArticleList({ articles }: { articles: ArticleEntry[] }) {
  if (articles.length === 0) {
    return <p className="text-muted">Coming soon.</p>;
  }

  return (
    <ol className="space-y-4">
      {articles.map((article, i) => (
        <li key={article.url ?? article.title}>
          <Reveal delay={Math.min(i * 70, 280)}>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
              aria-label={`Read "${article.title}" on Medium`}
            >
              <article data-tilt="3" className="tile tile-hover grid gap-5 p-4 sm:grid-cols-[14rem_1fr] sm:items-center md:grid-cols-[17rem_1fr] md:gap-7">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-surface-2">
                  {article.image && (
                    <Image
                      src={article.image}
                      alt={`Cover image for ${article.title}`}
                      fill
                      sizes="(min-width: 768px) 17rem, (min-width: 640px) 14rem, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                  )}
                </div>
                <div className="min-w-0 px-1 pb-1 sm:pr-4">
                  <p className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted">
                    <span className="text-accent">Medium</span>
                    {article.datePublished && (
                      <>
                        <span aria-hidden="true">·</span>
                        <time dateTime={article.datePublished}>{formatDate(article.datePublished)}</time>
                      </>
                    )}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-accent md:text-xl">
                    {article.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{article.summary}</p>
                  <p className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-foreground">
                    Read article
                    <ArrowUpRight
                      size={15}
                      className="text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </p>
                </div>
              </article>
            </a>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
