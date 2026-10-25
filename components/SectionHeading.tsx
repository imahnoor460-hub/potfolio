export default function SectionHeading({
  title,
  index,
}: {
  title: string;
  index?: string;
}) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-4">
        <h2 className="whitespace-nowrap text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {index && <span className="font-mono text-accent">{index} </span>}
          {title}
        </h2>
        <span aria-hidden className="h-px flex-1 bg-border" />
      </div>
    </div>
  );
}
