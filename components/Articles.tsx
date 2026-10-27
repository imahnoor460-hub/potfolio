import SectionHeading from "@/components/SectionHeading";
import ArticleList from "@/components/ArticleList";
import Reveal from "@/components/Reveal";
import { MoreLink } from "@/components/Projects";
import { articles } from "@/data/cv";

const HOME_COUNT = 3;

export default function Articles() {
  const homeArticles = articles.slice(0, HOME_COUNT);

  return (
    <section id="articles" className="scroll-mt-28 border-y border-border bg-surface-2/60">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionHeading
              eyebrow="Writing"
              title={
                <>
                  Latest <span className="brush text-gradient">articles</span>
                </>
              }
              intro="Practical write-ups on AI agents, LLMs, and shipping software."
            />
          </Reveal>
          {articles.length > HOME_COUNT && (
            <div className="mb-12 md:mb-14">
              <MoreLink href="/articles">All {articles.length} articles</MoreLink>
            </div>
          )}
        </div>

        <ArticleList articles={homeArticles} />
      </div>
    </section>
  );
}
