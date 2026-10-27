import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { GithubIcon, LinkedinIcon, MediumIcon } from "@/components/icons";
import { profile } from "@/data/cv";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/articles", label: "Articles" },
  { href: "/#skills", label: "Skills" },
  { href: "/#certifications", label: "Certifications" },
];

/** "https://github.com/mahnoorift/" → "mahnoorift" */
function handle(url: string) {
  return new URL(url).pathname.replace(/^\/|\/$/g, "");
}

export default function Footer() {
  const channels = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: <Mail size={17} /> },
    {
      label: "Phone",
      value: profile.phone,
      href: `tel:${profile.phone.replace(/[^+\d]/g, "")}`,
      icon: <Phone size={17} />,
    },
    { label: "LinkedIn", value: handle(profile.linkedin), href: profile.linkedin, icon: <LinkedinIcon width={17} height={17} />, external: true },
    { label: "GitHub", value: handle(profile.github), href: profile.github, icon: <GithubIcon width={17} height={17} />, external: true },
    { label: "Medium", value: handle(profile.medium), href: profile.medium, icon: <MediumIcon width={17} height={17} />, external: true },
  ];

  return (
    <footer id="contact" className="scroll-mt-28">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <div className="bg-gradient-brand relative overflow-hidden rounded-[2rem] p-3 shadow-[0_30px_80px_-30px_var(--accent)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-white/15 blur-3xl"
            />
            <div className="relative grid gap-3 lg:grid-cols-[1fr_1.15fr]">
              <div className="flex flex-col p-6 text-white md:p-9">
                <p className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                  Contact
                </p>
                <h2 className="mt-5 font-display text-[clamp(2.2rem,5vw,3.4rem)] font-bold leading-[1.05]">
                  Let&apos;s build something together
                </h2>
                <p className="mt-4 max-w-md text-white/80">
                  Open to full-time roles, internships, freelance work, and collaborations. Send a message and
                  I&apos;ll get back to you.
                </p>
                <ul className="mt-8 space-y-2">
                  {channels.map((c) => (
                    <li key={c.label}>
                      <a
                        href={c.href}
                        {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="group flex items-center gap-3 rounded-xl px-2 py-1.5 transition-colors hover:bg-white/10"
                      >
                        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/15">
                          {c.icon}
                        </span>
                        <span className="w-20 flex-shrink-0 text-sm text-white/70">{c.label}</span>
                        <span className="truncate text-sm font-semibold">{c.value}</span>
                        <ArrowUpRight size={15} className="ml-auto flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                      </a>
                    </li>
                  ))}
                  <li className="flex items-center gap-3 px-2 py-1.5">
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/15">
                      <MapPin size={17} />
                    </span>
                    <span className="w-20 flex-shrink-0 text-sm text-white/70">Based in</span>
                    <span className="text-sm font-semibold">{profile.location} · remote-friendly</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-[1.5rem] bg-surface p-6 md:p-8">
                <ContactForm />
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="bg-gradient-brand flex h-8 w-8 items-center justify-center rounded-full font-display text-xs font-bold text-white">
              MI
            </span>
            <span className="text-sm text-muted">
              © {new Date().getFullYear()} {profile.name} · {profile.title}
            </span>
          </Link>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-foreground">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
