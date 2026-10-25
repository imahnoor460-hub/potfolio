"use client";

import { useEffect, useState } from "react";
import { Download, FileText, X } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import { experiences } from "@/data/cv";

export default function Experience() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!previewUrl) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setPreviewUrl(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [previewUrl]);

  return (
    <section id="experience" className="scroll-mt-20 border-b border-border bg-surface-2/40">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <SectionHeading title="Where I've *worked*" index="02." kicker="Experience" />
        </Reveal>

        <ol className="relative">
          {experiences.map((exp, i) => (
            <li key={exp.company}>
              <Reveal delay={80 + i * 80}>
                <article className="group -mx-4 grid gap-4 border-t-[1.5px] border-foreground px-4 py-10 transition-colors duration-300 hover:border-accent hover:bg-accent/[0.06] md:-mx-6 md:grid-cols-[120px_1fr_1.4fr] md:gap-10 md:px-6">
                  <span className="font-serif text-7xl leading-none text-accent/70 transition-colors duration-300 group-hover:text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    {exp.period && (
                      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{exp.period}</p>
                    )}
                    <h3 className="font-serif mt-2 text-3xl leading-tight text-foreground transition-colors duration-300 group-hover:text-accent">{exp.role}</h3>
                    {exp.certificateUrl ? (
                      <button
                        type="button"
                        onClick={() => setPreviewUrl(exp.certificateUrl!)}
                        className="ink-link mt-2 inline-flex items-center gap-1.5 text-base font-semibold text-accent"
                      >
                        <FileText size={15} />
                        {exp.company}
                        <span className="font-mono text-[10px] font-normal uppercase tracking-wider text-muted">
                          · view letter
                        </span>
                      </button>
                    ) : (
                      <p className="mt-2 text-base font-semibold text-accent">{exp.company}</p>
                    )}
                  </div>
                  <p className="leading-relaxed text-foreground/75 md:pt-6">{exp.description}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
        <div className="border-t-[1.5px] border-foreground" />
      </div>

      {previewUrl && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setPreviewUrl(null)}
        >
          <div
            className="paper-card flex h-[85vh] w-full max-w-3xl flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <span className="font-serif text-xl text-foreground">Experience Letter</span>
              <div className="flex items-center gap-2">
                <a href={previewUrl} download className="btn-ink !px-3 !py-1.5 !text-xs">
                  <Download size={14} />
                  Download
                </a>
                <button
                  type="button"
                  aria-label="Close preview"
                  onClick={() => setPreviewUrl(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-accent"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            <iframe src={previewUrl} title="Experience Letter Preview" className="h-full w-full flex-1 bg-white" />
          </div>
        </div>
      )}
    </section>
  );
}
