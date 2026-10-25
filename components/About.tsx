import Link from "next/link";
import { ArrowUpRight, Briefcase, FolderGit2, PenLine } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import { profile, experiences, projects, articles } from "@/data/cv";

export default function About() {
  // First sentence as the lead; the rest reads as body text.
  const [lead, ...rest] = profile.summary.split(/(?<=\.)\s+/);

  const stats = [
    { value: experiences.length, label: "Internships", note: "AI and ML roles", Icon: Briefcase },
    { value: projects.length, label: "Projects built", note: "Web, AI and games", Icon: FolderGit2 },
    {
      value: articles.filter((a) => a.url).length,
      label: "Articles published",
      note: "On agents and LLMs",
      Icon: PenLine,
    },
  ];

  return (
    <section id="about" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <SectionHeading title="A little *about* me" index="01." kicker="The person" />
        </Reveal>
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr] md:items-start">
          <Reveal delay={80}>
            <p className="text-2xl leading-[1.4] tracking-[-0.01em] text-foreground md:text-[1.75rem]">
              {lead}
            </p>
            {rest.length > 0 && (
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/70">
                {rest.join(" ")}
              </p>
            )}
            <Link href="/about" className="btn-line mt-8">
              Read the full story
              <ArrowUpRight size={15} />
            </Link>
          </Reveal>

          <Reveal delay={160}>
            <TiltCard>
              <dl className="depth-1 divide-y divide-border/60 px-2 py-3">
                {stats.map(({ value, label, note, Icon }) => (
                  <div
                    key={label}
                    className="group flex items-center gap-4 rounded-2xl px-4 py-4 transition-colors duration-300 hover:bg-accent/[0.06]"
                  >
                    <span className="depth-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent shadow-[0_8px_18px_-10px_var(--accent)] transition-colors duration-300 group-hover:bg-accent group-hover:text-surface">
                      <Icon size={17} strokeWidth={1.75} />
                    </span>
                    <dt className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-foreground">{label}</span>
                      <span className="block text-xs text-muted">{note}</span>
                    </dt>
                    <dd className="num-accent depth-3 text-5xl leading-none text-accent">
                      {String(value).padStart(2, "0")}
                    </dd>
                  </div>
                ))}
              </dl>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
