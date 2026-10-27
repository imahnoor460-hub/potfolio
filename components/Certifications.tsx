import { Award, ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { certifications } from "@/data/cv";

export default function Certifications() {
  return (
    <section id="certifications" className="scroll-mt-28">
      <div className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
        <Reveal>
          <SectionHeading eyebrow="Certifications" title="Courses & credentials" />
        </Reveal>

        <ol className="grid gap-5 md:grid-cols-3">
          {certifications.map((cert, i) => {
            const href = cert.fileUrl ?? cert.verifyUrl;
            const body = (
              <div data-tilt className="tile tile-hover flex h-full flex-col p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Award size={20} />
                </span>
                <h3 className="mt-5 flex-1 font-display text-lg font-semibold leading-snug text-foreground">{cert.name}</h3>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
                  {cert.issuer && <span className="text-sm font-medium text-muted">{cert.issuer}</span>}
                  {href && (
                    <ArrowUpRight
                      size={17}
                      className="text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  )}
                </div>
              </div>
            );
            return (
              <li key={cert.name}>
                <Reveal delay={i * 70} className="h-full">
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block h-full"
                      aria-label={`View certificate: ${cert.name}`}
                    >
                      {body}
                    </a>
                  ) : (
                    body
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
