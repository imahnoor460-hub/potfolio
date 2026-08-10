import { Download, Mail, Phone } from "lucide-react";
import GithubIcon from "@/components/GithubIcon";
import { profile } from "@/data/cv";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function Hero() {
  return (
    <section id="top" className="relative scroll-mt-20 overflow-hidden border-b border-border">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/3 bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--accent)_10%,transparent),transparent)]"
      />
      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-xs font-medium text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-dot" />
          Available for internships &amp; collaborations
        </div>

        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
          <div className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-accent-2 text-3xl font-bold text-white shadow-lg shadow-accent/20 md:h-28 md:w-28 md:text-4xl">
            {initials(profile.name)}
          </div>

          <div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              {profile.name}
            </h1>
            <p className="mt-3 text-lg font-medium text-accent md:text-xl">
              {profile.title}
            </p>
            <p className="mt-4 max-w-xl leading-relaxed text-muted">
              I build full-stack web applications and AI-powered, agentic
              workflows — and I also bring a background in game development
              and 3D design with Unity and Blender.
            </p>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-5">
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="text-muted transition-colors hover:text-accent"
          >
            <Mail size={20} />
          </a>
          <a
            href={`tel:${profile.phone.replace(/\s+/g, "")}`}
            aria-label="Phone"
            className="text-muted transition-colors hover:text-accent"
          >
            <Phone size={20} />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted transition-colors hover:text-accent"
          >
            <GithubIcon size={20} />
          </a>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="#projects"
            className="rounded-md bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            View Projects
          </a>
          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
          >
            <Download size={16} />
            Download CV
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
          >
            <Mail size={16} />
            Contact
          </a>
        </div>
      </div>
    </section>
  );
}
