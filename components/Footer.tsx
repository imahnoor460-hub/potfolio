import { Mail, Phone } from "lucide-react";
import GithubIcon from "@/components/GithubIcon";
import LinkedinIcon from "@/components/LinkedinIcon";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { profile } from "@/data/cv";

export default function Footer() {
  return (
    <footer id="contact" className="scroll-mt-20 bg-surface-2/50">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Reveal>
          <SectionHeading eyebrow="Let's work together" title="Contact" index="07." />
        </Reveal>

        <Reveal delay={80}>
          <div className="rounded-xl border border-border bg-surface p-6 shadow-sm md:p-8">
            <p className="mb-6 text-foreground/80">
              Open to internships, collaborations, and interesting problems —
              send a message directly:
            </p>
            <ContactForm />
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2 font-medium text-foreground transition-colors hover:border-accent hover:bg-accent/5 hover:text-accent"
            >
              <Mail size={16} />
              {profile.email}
            </a>
            <a
              href={`tel:${profile.phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2 font-medium text-foreground transition-colors hover:border-accent hover:bg-accent/5 hover:text-accent"
            >
              <Phone size={16} />
              {profile.phone}
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2 font-medium text-foreground transition-colors hover:border-accent hover:bg-accent/5 hover:text-accent"
            >
              <GithubIcon size={16} />
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2 font-medium text-foreground transition-colors hover:border-accent hover:bg-accent/5 hover:text-accent"
            >
              <LinkedinIcon size={16} />
              LinkedIn
            </a>
          </div>
        </Reveal>

        <p className="mt-8 text-center font-mono text-xs text-muted">
          <span className="text-accent">{"//"}</span> {profile.name}
        </p>
      </div>
    </footer>
  );
}
