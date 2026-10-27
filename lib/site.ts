import type { Metadata } from "next";
import { profile } from "@/data/cv";

// Single source of truth for the canonical origin and the metadata every
// route shares. Next.js merges `openGraph`/`twitter` shallowly, so pages that
// override them spread these bases to keep siteName, locale, etc.

export const SITE_URL = "https://mahnooriftikhar.online";
export const SITE_NAME = profile.name;
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const SITE_TITLE = `${profile.name} | Full-Stack Developer & AI Engineer`;

export const SITE_DESCRIPTION =
  "Mahnoor Iftikhar is a Full-Stack Developer and AI Engineer in Lahore, Pakistan, building Django, React and Next.js apps, LLM agents, and RAG pipelines.";

export const SOCIAL_DESCRIPTION =
  "Portfolio of Mahnoor Iftikhar — Full-Stack Developer and AI Engineer building web apps, AI agents, and RAG-powered assistants.";

export const SITE_KEYWORDS = [
  "Mahnoor Iftikhar",
  "Mahnoor Iftikhar portfolio",
  "Full-Stack Developer",
  "AI Engineer",
  "AI Agents",
  "Agentic Workflows",
  "LLM Integration",
  "RAG",
  "Django Developer",
  "React Developer",
  "Next.js Developer",
  "FastAPI",
  "Python Developer",
  "Software Engineer Lahore",
  "Developer Portfolio Pakistan",
];

// The generated card from app/opengraph-image.tsx. A page that sets its own
// `openGraph`/`twitter` loses the root's file-based image, so subpages pass
// this explicitly.
export const defaultSocialImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${profile.name} — ${profile.title}`,
};

export const baseOpenGraph = {
  type: "website",
  siteName: SITE_NAME,
  locale: "en_US",
} satisfies NonNullable<Metadata["openGraph"]>;

export const baseTwitter = {
  card: "summary_large_image",
} satisfies NonNullable<Metadata["twitter"]>;

/** Absolute URL for a site path; already-absolute URLs pass through. */
export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

/** Trim text to a search-snippet-friendly length (~155 chars) at a word boundary. */
export function metaDescription(text: string, max = 155) {
  if (text.length <= max) return text;
  return `${text.slice(0, max).replace(/\s+\S*$/, "").replace(/[,;:—-]$/, "")}…`;
}

/** "2026-10-25" → "Oct 25, 2026" (fixed to UTC so server and client agree). */
export function formatDate(iso?: string) {
  if (!iso) return undefined;
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
