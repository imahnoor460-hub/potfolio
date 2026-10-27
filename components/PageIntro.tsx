import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/** Opening block for sub-pages: back link, kicker, and a large serif title. */
export default function PageIntro({
  backHref = "/",
  backLabel = "Back to home",
  kicker,
  title,
  italic,
  children,
}: {
  backHref?: string;
  backLabel?: string;
  kicker: string;
  title: string;
  italic?: string;
  children?: ReactNode;
}) {
  return (
    <div>
      <Link
        href={backHref}
        className="group mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
        {backLabel}
      </Link>
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">{kicker}</p>
      <h1 className="font-serif mt-3 text-[clamp(3rem,8vw,5.5rem)] leading-[0.92] text-foreground">
        {title} {italic && <em className="italic text-accent">{italic}</em>}
      </h1>
      {children}
    </div>
  );
}
