"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "/#about", label: "about" },
  { href: "/#experience", label: "experience" },
  { href: "/projects", label: "projects" },
  { href: "/#skills", label: "skills" },
  { href: "/#certifications", label: "certifications" },
  { href: "/articles", label: "articles" },
  { href: "/#contact", label: "contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    if (pathname !== "/") return;

    const anchorLinks = links.filter((link) => link.href.includes("#"));
    const sections = anchorLinks
      .map((link) => document.getElementById(link.href.split("#")[1]))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`/#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  const isActive = (href: string) =>
    href.includes("#") ? active === href : pathname === href;

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <a href="/#top" className="group flex items-center gap-3" aria-label="Mahnoor Iftikhar, home">
          <span className="font-serif flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-foreground text-lg italic text-foreground transition-all duration-300 group-hover:rotate-[-12deg] group-hover:border-accent group-hover:bg-accent group-hover:text-surface">
            MI
          </span>
          <span className="font-serif hidden text-2xl leading-none text-foreground sm:block">
            Mahnoor <em className="italic text-accent">Iftikhar</em>
          </span>
        </a>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`relative px-3 py-1.5 text-[13px] font-medium tracking-wide transition-colors ${
                  isActive(link.href) ? "text-accent" : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span aria-hidden className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-accent" />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <ThemeToggle />

          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-foreground hover:bg-surface-2 lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-background px-6 py-6 lg:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`font-serif flex items-baseline gap-3 py-1.5 text-3xl transition-colors ${
                    isActive(link.href) ? "italic text-accent" : "text-foreground hover:text-accent"
                  }`}
                >
                  <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
