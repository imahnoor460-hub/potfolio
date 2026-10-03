import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { profile } from "@/data/cv";

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 border-b border-border bg-surface-2/50">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Reveal>
          <SectionHeading title="About" index="01." />
        </Reveal>
        <Reveal delay={80}>
          <div className="rounded-xl border border-border bg-surface p-6 shadow-sm md:p-8">
            <p className="mb-4 font-mono text-2xl font-bold text-foreground md:text-3xl">
              {profile.name}
            </p>
            <p className="leading-relaxed text-foreground/80">{profile.summary}</p>
            <Link
              href="/about"
              className="mt-4 inline-flex items-center gap-1.5 font-mono text-sm font-semibold text-accent hover:underline"
            >
              Read full bio
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
