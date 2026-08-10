export default function SectionHeading({
  eyebrow,
  title,
  index,
}: {
  eyebrow: string;
  title: string;
  index: string;
}) {
  return (
    <div className="mb-10">
      <p className="mb-2 flex items-center gap-1.5 font-mono text-xs text-muted">
        <span className="text-accent">{"//"}</span> {eyebrow}
      </p>
      <div className="flex items-center gap-4">
        <h2 className="whitespace-nowrap text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          <span className="font-mono text-accent">{index}</span> {title}
        </h2>
        <span aria-hidden className="h-px flex-1 bg-border" />
      </div>
    </div>
  );
}
