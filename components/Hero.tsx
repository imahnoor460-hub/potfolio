"use client";

import { useEffect, useState } from "react";
import { ArrowDownRight, Download, Mail, Phone, X } from "lucide-react";
import GithubIcon from "@/components/GithubIcon";
import LinkedinIcon from "@/components/LinkedinIcon";
import MediumIcon from "@/components/MediumIcon";
import HeroConsole from "@/components/HeroConsole";
import { profile, skillGroups } from "@/data/cv";


export default function Hero() {
  const [showResumePreview, setShowResumePreview] = useState(false);

  useEffect(() => {
    if (!showResumePreview) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setShowResumePreview(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showResumePreview]);

  const [firstName, ...rest] = profile.name.split(" ");
  const lastName = rest.join(" ");
  const marqueeSkills = skillGroups.flatMap((g) => g.skills).slice(0, 22);

  const socials = [
    { href: `mailto:${profile.email}`, label: "Email", icon: <Mail size={18} /> },
    { href: `tel:${profile.phone.replace(/\s+/g, "")}`, label: "Phone", icon: <Phone size={18} /> },
    { href: profile.github, label: "GitHub", icon: <GithubIcon size={18} />, external: true },
    { href: profile.linkedin, label: "LinkedIn", icon: <LinkedinIcon size={18} />, external: true },
    { href: profile.medium, label: "Medium", icon: <MediumIcon size={18} />, external: true },
  ];

  return (
    <section id="top" className="relative scroll-mt-20 overflow-hidden border-b border-border">
      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 pb-16 pt-14 md:grid-cols-[1.15fr_1fr] md:items-center md:pb-24 md:pt-20">
        <div className="relative">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            <span>{profile.location}</span>
            <span aria-hidden className="h-px w-6 bg-border" />
            <span>Open to remote</span>
          </p>

          <h1 className="font-serif mt-6 text-[clamp(3.6rem,10vw,7.5rem)] leading-[0.86] text-foreground">
            <span className="block">{firstName}</span>
            <span className="block italic text-accent">{lastName}</span>
          </h1>

          <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-foreground/80">
            {profile.title}
          </p>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-foreground/75">
            I build full-stack web applications and{" "}
            <span className="highlight text-foreground">AI that works in agentic workflows</span>{" "}
            — with a background in game development and 3D design.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#projects" className="btn-ink">
              See the work
              <ArrowDownRight size={16} />
            </a>
            <button type="button" onClick={() => setShowResumePreview(true)} className="btn-line">
              <Download size={16} />
              Download CV
            </button>
          </div>

          <div className="mt-9 flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-all hover:-translate-y-1 hover:border-accent hover:bg-accent hover:text-surface"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Collage composition */}
        <div className="relative mx-auto w-full max-w-[440px] md:h-[600px]">
          <div aria-hidden className="absolute right-2 top-4 h-56 w-56 rounded-full bg-accent md:h-64 md:w-64" />

          {/* In flow on phones (the terminal wraps and grows); pinned on wider screens. */}
          <div className="relative pb-6 pt-24 md:absolute md:inset-x-0 md:top-28 md:pb-0 md:pt-0">
            <HeroConsole />
          </div>
        </div>
      </div>

      {/* Skills ribbon */}
      <div className="relative border-y border-foreground bg-foreground py-3 text-background">
        <div className="marquee">
          {[0, 1].map((copy) => (
            <div key={copy} className="marquee-track" aria-hidden={copy === 1}>
              {marqueeSkills.map((skill) => (
                <span key={skill} className="flex items-center gap-10 whitespace-nowrap text-lg font-medium">
                  {skill}
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="h-8" />

      {showResumePreview && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setShowResumePreview(false)}
        >
          <div
            className="paper-card flex h-[85vh] w-full max-w-3xl flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <span className="font-serif text-xl text-foreground">Resume Preview</span>
              <div className="flex items-center gap-2">
                <a href="/resume.pdf" download className="btn-ink !px-3 !py-1.5 !text-xs">
                  <Download size={14} />
                  Download
                </a>
                <button
                  type="button"
                  aria-label="Close preview"
                  onClick={() => setShowResumePreview(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-accent"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
            <iframe src="/resume.pdf" title="Resume Preview" className="h-full w-full flex-1 bg-white" />
          </div>
        </div>
      )}
    </section>
  );
}
