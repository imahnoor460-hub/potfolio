"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

// Absolute hrefs ("/#about") so the same bar works on sub-pages; on the home
// page they resolve to in-page jumps.
const links = [
  { href: "/#about", label: "About", id: "about" },
  { href: "/#experience", label: "Experience", id: "experience" },
  { href: "/projects", label: "Projects", id: "projects" },
  { href: "/articles", label: "Articles", id: "articles" },
  { href: "/#skills", label: "Skills", id: "skills" },
  { href: "/#contact", label: "Contact", id: "contact" },
];

/** A floating, rounded glass bar that stays centred at the top of the page. */
export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [inView, setInView] = useState("");

  useEffect(() => {
    if (!isHome) return;
    const targets = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setInView(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHome]);

  const active = isHome ? inView : pathname.split("/")[1] ?? "";

  const linkClass = (id: string) =>
    `rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
      active === id ? "bg-foreground text-background" : "text-muted hover:bg-surface-2 hover:text-foreground"
    }`;

  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-full border border-border bg-surface/80 py-2 pl-2 pr-2 shadow-[var(--shadow)] backdrop-blur-xl"
      >
        <Link href="/" aria-label="Mahnoor Iftikhar — home" className="flex items-center gap-2.5 rounded-full pr-2">
          <span className="bg-gradient-brand flex h-9 w-9 items-center justify-center rounded-full font-display text-sm font-bold text-white">
            MI
          </span>
          <span className="font-display text-[15px] font-semibold text-foreground">Mahnoor Iftikhar</span>
        </Link>

        <ul className="hidden items-center gap-0.5 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className={linkClass(link.id)} aria-current={active === link.id ? "page" : undefined}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Link
            href="/#contact"
            className="bg-gradient-brand hidden rounded-full px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Let&apos;s talk
          </Link>
        </div>
      </nav>

      {/* Phones: the same links, always visible, in a swipeable row under the bar. */}
      <ul
        aria-label="Sections"
        className="mx-auto mt-2 flex max-w-5xl items-center gap-1 overflow-x-auto rounded-full border border-border bg-surface/80 p-1.5 shadow-[var(--shadow)] backdrop-blur-xl [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden"
      >
        {links.map((link) => (
          <li key={link.href} className="flex-shrink-0">
            <Link href={link.href} className={linkClass(link.id)} aria-current={active === link.id ? "page" : undefined}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
