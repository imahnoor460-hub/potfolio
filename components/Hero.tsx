"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Mail, Phone, X } from "lucide-react";
import GithubIcon from "@/components/GithubIcon";
import LinkedinIcon from "@/components/LinkedinIcon";
import { profile } from "@/data/cv";

export default function Hero() {
  const [typed, setTyped] = useState("");
  const [showResumePreview, setShowResumePreview] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!showResumePreview) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setShowResumePreview(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showResumePreview]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    let timeoutIds: number[] = [];

    function typeName() {
      timeoutIds.forEach((id) => clearTimeout(id));
      timeoutIds = [];
      setTyped("");
      profile.name.split("").forEach((_, i) => {
        const id = window.setTimeout(() => {
          setTyped(profile.name.slice(0, i + 1));
        }, i * 70);
        timeoutIds.push(id);
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            typeName();
          }
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      timeoutIds.forEach((id) => clearTimeout(id));
    };
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative scroll-mt-20 overflow-hidden border-b border-border"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/3 bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--accent)_10%,transparent),transparent)]"
      />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-[1.1fr_1fr] md:items-center md:py-28">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1 font-mono text-xs font-medium text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />
            status: available_for_hire
          </div>

          <p className="font-mono text-sm text-accent">Hi, my name is</p>
         <h1 className="mt-1 flex items-center text-4xl font-bold tracking-tight text-foreground md:text-5xl">
  <span aria-hidden={typed.length > 0}>{typed || profile.name}</span>
  <span className="ml-1 inline-block h-8 w-[4px] bg-accent animate-caret md:h-10" />
</h1>
          <p className="mt-2 text-lg font-medium text-muted md:text-xl">
            {profile.title}
          </p>
          <p className="mt-4 max-w-xl leading-relaxed text-foreground/70">
            I build full-stack web applications and AI-powered, agentic
            workflows — and I also bring a background in game development
            and 3D design with Unity and Blender.
          </p>

          <div className="mt-7 flex items-center gap-5">
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="flex h-9 w-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-2 hover:text-accent"
            >
              <Mail size={20} />
            </a>
            <a
              href={`tel:${profile.phone.replace(/\s+/g, "")}`}
              aria-label="Phone"
              className="flex h-9 w-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-2 hover:text-accent"
            >
              <Phone size={20} />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-2 hover:text-accent"
            >
              <GithubIcon size={20} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-2 hover:text-accent"
            >
              <LinkedinIcon size={20} />
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-md bg-accent px-5 py-2.5 font-mono text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              View Projects
            </a>
            <button
              type="button"
              onClick={() => setShowResumePreview(true)}
              className="flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-2.5 font-mono text-sm font-semibold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent hover:bg-accent/5 hover:text-accent"
            >
              <Download size={16} />
              Download CV
            </button>
            <a
              href="#contact"
              className="flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-2.5 font-mono text-sm font-semibold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent hover:bg-accent/5 hover:text-accent"
            >
              <Mail size={16} />
              Contact
            </a>
          </div>
        </div>

        <div className="w-full [perspective:1200px]">
          <div className="mx-auto max-w-md transition-transform duration-500 [transform:rotateX(4deg)] hover:[transform:rotateX(0deg)]">
            {/* Screen / lid */}
            <div className="rounded-t-2xl border-[10px] border-b-0 border-[#1c1c1e] bg-[#1c1c1e] pb-1 shadow-2xl">
              <div className="flex justify-center py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
              </div>
              <div className="overflow-hidden rounded-sm border border-black/40 bg-surface">
                <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-2.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-2 font-mono text-xs text-muted">
                    mahnoor@portfolio — zsh
                  </span>
                </div>
                <div className="space-y-2 p-5 font-mono text-[13px] leading-relaxed">
                  <p>
                    <span className="text-accent">$</span>{" "}
                    <span className="text-foreground/90">whoami</span>
                  </p>
                  <p className="pl-4 text-muted">{profile.name}</p>
                  <p className="mt-3">
                    <span className="text-accent">$</span>{" "}
                    <span className="text-foreground/90">cat focus.json</span>
                  </p>
                  <p className="pl-4 text-foreground/80">{"{"}</p>
                  <p className="pl-8 text-foreground/80">
                    <span className="text-accent-2">&quot;stack&quot;</span>: [
                    <span className="text-muted">&quot;Django&quot;, &quot;React&quot;, &quot;FastAPI&quot;, &quot;Next.js&quot;</span>
                    ],
                  </p>
                  <p className="pl-8 text-foreground/80">
                    <span className="text-accent-2">&quot;focus&quot;</span>:{" "}
                    <span className="text-muted">&quot;AI &amp; agentic workflows&quot;</span>,
                  </p>
                  <p className="pl-8 text-foreground/80">
                    <span className="text-accent-2">&quot;also_into&quot;</span>: [
                    <span className="text-muted">&quot;Unity&quot;, &quot;Blender&quot;, &quot;3D Design&quot;</span>
                    ]
                  </p>
                  <p className="text-foreground/80">{"}"}</p>
                  <p className="mt-3 flex items-center gap-1">
                    <span className="text-accent">$</span>
                    <span className="inline-block h-3.5 w-2 bg-accent animate-caret" />
                  </p>
                </div>
              </div>
            </div>

            {/* Hinge */}
            <div className="h-2 rounded-b-sm bg-gradient-to-b from-[#2c2c2e] to-[#141416]" />

            {/* Base / keyboard deck */}
            <div className="relative h-4 rounded-b-2xl bg-gradient-to-b from-[#3a3a3c] to-[#1c1c1e] shadow-xl">
              <span className="absolute left-1/2 top-0 h-1.5 w-24 -translate-x-1/2 rounded-b-md bg-[#0a0a0a]" />
            </div>
          </div>

          {/* Reflection / shadow */}
          <div className="mx-auto mt-3 h-3 w-4/5 max-w-sm rounded-full bg-black/25 blur-md" />
        </div>
      </div>

      {showResumePreview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setShowResumePreview(false)}
        >
          <div
            className="flex h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-lg border border-border bg-surface shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <span className="font-mono text-sm font-semibold text-foreground">
                Resume Preview
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="/resume.pdf"
                  download
                  className="flex items-center gap-2 rounded-md bg-accent px-3 py-1.5 font-mono text-xs font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <Download size={14} />
                  Download
                </a>
                <button
                  type="button"
                  aria-label="Close preview"
                  onClick={() => setShowResumePreview(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-2 hover:text-accent"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            <iframe
              src="/resume.pdf"
              title="Resume Preview"
              className="h-full w-full flex-1 bg-white"
            />
          </div>
        </div>
      )}
    </section>
  );
}
