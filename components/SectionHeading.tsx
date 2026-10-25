
/**
 * Editorial section title: a small "chapter" label above a large serif
 * heading. A word wrapped in *asterisks* in `title` is set in italic accent.
 */
export default function SectionHeading({
  title,
  index,
  kicker,
}: {
  title: string;
  index?: string;
  kicker?: string;
}) {
  const parts = title.split(/(\*[^*]+\*)/g).filter(Boolean);

  return (
    <div className="mb-12">
      <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
        {index && <span className="text-accent">{index.replace(".", "")}</span>}
        {index && kicker && <span aria-hidden className="h-px w-8 bg-border" />}
        {kicker && <span>{kicker}</span>}
      </p>
      <h2 className="font-serif mt-3 text-5xl leading-[0.95] text-foreground md:text-6xl">
        {parts.map((part, i) =>
          part.startsWith("*") ? (
            <em key={i} className="italic text-accent">
              {part.slice(1, -1)}
            </em>
          ) : (
            <span key={i}>{part}</span>
          ),
        )}
      </h2>
    </div>
  );
}
