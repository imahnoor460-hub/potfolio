import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { certifications } from "@/data/cv";

export default function Certifications() {
  return (
    <section id="certifications" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <SectionHeading title="Credentials" index="06." kicker="Certifications" />
        </Reveal>
        <ol className="mx-auto max-w-4xl">
          {certifications.map((cert, i) => {
            const href = cert.fileUrl ?? cert.verifyUrl;
            const content = (
              <div className="flex items-baseline gap-4 py-5">
                <span className="font-serif w-10 shrink-0 text-2xl italic text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <span className="font-serif text-2xl leading-tight text-foreground transition-colors group-hover:text-accent md:text-[1.75rem]">
                    {cert.name}
                  </span>
                  {cert.issuer && (
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{cert.issuer}</p>
                  )}
                </div>
                <span aria-hidden className="mb-2 hidden flex-1 border-b-2 border-dotted border-foreground/25 md:block" />
                {href && (
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center self-center rounded-full border border-foreground/30 text-foreground transition-all group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-surface">
                    <ArrowUpRight size={17} />
                  </span>
                )}
              </div>
            );

            return (
              <li key={cert.name} className="border-b border-foreground/15 first:border-t">
                <Reveal delay={Math.min(i * 60, 300)}>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                      aria-label={`View certificate: ${cert.name}`}
                    >
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
