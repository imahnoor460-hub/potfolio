import { ArrowRight, Mail } from "lucide-react";
import { profile } from "@/data/cv";
import { GithubIcon, LinkedinIcon, MediumIcon } from "@/components/icons";
import ResumePreview from "@/components/ResumePreview";
import HeroStage from "@/components/HeroStage";

export default function Hero() {
  const socials = [
    { label: "GitHub", href: profile.github, icon: <GithubIcon width={17} height={17} /> },
    { label: "LinkedIn", href: profile.linkedin, icon: <LinkedinIcon width={17} height={17} /> },
    { label: "Medium", href: profile.medium, icon: <MediumIcon width={17} height={17} /> },
    { label: "Email", href: `mailto:${profile.email}`, icon: <Mail size={17} /> },
  ];

  return (
    <section id="top" className="relative scroll-mt-28 overflow-hidden">
      <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_20%,black,transparent_75%)]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-accent/12 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-accent-2/10 blur-[110px]"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-14 md:pt-20 lg:grid-cols-[1.15fr_1fr] lg:pb-28">
        <div className="animate-fade-in-up">
          <p className="pill font-mono !text-xs">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse-dot" />
            status: available for roles &amp; collaborations
          </p>

          <h1 className="mt-7 font-display text-[clamp(2.5rem,5.4vw,4.1rem)] font-bold leading-[1.02] text-foreground">
            Mahnoor Iftikhar
            <span className="mt-2 block text-gradient">builds AI agents</span>
            <span className="block text-[0.62em] font-semibold leading-tight text-muted">
              and the full-stack products around them.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted">
            <strong className="font-semibold text-foreground">{profile.title}</strong> working across LLM agents and
            agentic workflows, RAG pipelines, and full-stack Django · React · Next.js apps that ship to the cloud.
          </p>


          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
            >
              View my work
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <ResumePreview />
          </div>

          <ul className="mt-9 flex items-center gap-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-muted transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                >
                  {s.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="animate-fade-in-up [animation-delay:150ms]">
          <HeroStage />
        </div>
      </div>
    </section>
  );
}
