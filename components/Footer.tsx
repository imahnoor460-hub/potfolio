import Link from "next/link";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import GithubIcon from "@/components/GithubIcon";
import LinkedinIcon from "@/components/LinkedinIcon";
import MediumIcon from "@/components/MediumIcon";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { profile } from "@/data/cv";

export default function Footer({ showIndex = true }: { showIndex?: boolean }) {
  const links = [
    { href: `mailto:${profile.email}`, label: profile.email, icon: <Mail size={15} /> },
    { href: `tel:${profile.phone.replace(/\s+/g, "")}`, label: profile.phone, icon: <Phone size={15} /> },
    { href: profile.github, label: "GitHub", icon: <GithubIcon size={15} />, external: true },
    { href: profile.linkedin, label: "LinkedIn", icon: <LinkedinIcon size={15} />, external: true },
    { href: profile.medium, label: "Medium", icon: <MediumIcon size={15} />, external: true },
  ];

  return (
    <footer id="contact" className="relative scroll-mt-20 overflow-hidden bg-foreground text-background">
      <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-14 md:grid-cols-[1fr_1.05fr]">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-background/60">
              {showIndex && <span className="text-accent">08 — </span>}Contact
            </p>
            <h2 className="font-serif mt-4 text-[clamp(3rem,7vw,5.5rem)] leading-[0.9]">
              Let&apos;s make
              <br />
              something <em className="italic text-accent">good</em>
              <br />
              together.
            </h2>
            <p className="mt-6 max-w-sm leading-relaxed text-background/70">
              Open to internships, collaborations, and interesting problems. Drop a note — I read
              every one.
            </p>

            <ul className="mt-8 space-y-2.5 text-sm">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group inline-flex items-center gap-3 text-background/80 transition-colors hover:text-accent"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-background/25 transition-all group-hover:rotate-[-10deg] group-hover:border-accent">
                      {l.icon}
                    </span>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={100}>
            <div className="relative rounded-lg bg-background p-6 text-foreground shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)] md:p-9">
              <p className="font-serif text-3xl">
                Write me a <em className="italic text-accent">letter</em>
              </p>
              <p className="mb-6 mt-1 text-sm text-muted">It lands straight in my inbox.</p>
              <ContactForm />
            </div>
          </Reveal>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-background/15 pt-6 font-mono text-xs text-background/55 md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} {profile.name} · Made with care in {profile.location.split(",")[0]}
          </p>
          <Link href="/about" className="inline-flex items-center gap-1 transition-colors hover:text-accent">
            About {profile.name}
            <ArrowUpRight size={13} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
