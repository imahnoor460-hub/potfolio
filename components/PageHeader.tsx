import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

/** Sub-page opener: a visible breadcrumb, a label, the page's one h1, and an intro. */
export default function PageHeader({
  crumbs,
  kicker,
  title,
  children,
}: {
  crumbs: { name: string; href?: string }[];
  kicker: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="mb-14">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
          </li>
          {crumbs.map((crumb) => (
            <li key={crumb.name} className="flex items-center gap-1">
              <ChevronRight size={14} aria-hidden="true" />
              {crumb.href ? (
                <Link href={crumb.href} className="transition-colors hover:text-foreground">
                  {crumb.name}
                </Link>
              ) : (
                <span aria-current="page" className="font-medium text-foreground">
                  {crumb.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <p className="eyebrow">{kicker}</p>
      <h1 className="mt-5 font-display text-[clamp(2.6rem,7vw,4.6rem)] font-bold leading-[1.03] text-foreground">
        {title}
      </h1>
      {children && <div className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{children}</div>}
    </header>
  );
}
