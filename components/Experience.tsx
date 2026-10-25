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
    <section id="experience" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Reveal>
          <SectionHeading title="Experience" index="02." />
        </Reveal>

        <div className="space-y-6">
          {experiences.map((exp, i) => (
            <Reveal key={exp.company} delay={80 + i * 80}>
              <div className="rounded-xl border border-border bg-surface p-6 shadow-sm md:p-8">
                {exp.period && (
                  <p className="text-xs font-medium uppercase tracking-wide text-muted">
                    {exp.period}
                  </p>
                )}
                <h3 className="mt-1 text-lg font-semibold text-foreground">{exp.role}</h3>
                {exp.certificateUrl ? (
                  <button
                    type="button"
                    onClick={() => setPreviewUrl(exp.certificateUrl!)}
                    className="flex items-center gap-1.5 text-sm font-medium text-accent underline decoration-accent/30 underline-offset-2 transition-colors hover:decoration-accent"
                  >
                    <FileText size={14} />
                    {exp.company}
                  </button>
                ) : (
                  <p className="text-sm font-medium text-accent">{exp.company}</p>
                )}
                <p className="mt-3 leading-relaxed text-foreground/80">{exp.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {previewUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setPreviewUrl(null)}
        >
          <div
            className="flex h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-lg border border-border bg-surface shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <span className="font-mono text-sm font-semibold text-foreground">
                Experience Letter
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={previewUrl}
                  download
                  className="flex items-center gap-2 rounded-md bg-accent px-3 py-1.5 font-mono text-xs font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <Download size={14} />
                  Download
                </a>
                <button
                  type="button"
                  aria-label="Close preview"
                  onClick={() => setPreviewUrl(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-2 hover:text-accent"
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
