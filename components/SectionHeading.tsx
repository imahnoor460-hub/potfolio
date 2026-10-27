import type { ReactNode } from "react";

/** Section opener: a small gradient-dot label, a bold title, and an optional intro. */
export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
}) {
  const centered = align === "center";
  return (
    <div className={`mb-12 md:mb-14 ${centered ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-5 font-display text-[clamp(2.2rem,5vw,3.5rem)] font-bold leading-[1.05] text-foreground">
        {title}
      </h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-muted">{intro}</p>}
    </div>
  );
}
