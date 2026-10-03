import { profile, articles, type Project } from "@/data/cv";

/**
 * Canonical domain for the entire site. Every absolute URL, the sitemap,
 * robots.txt, and all JSON-LD @id/url fields must derive from this constant
 * so the domain never drifts out of sync across files.
 */
export const SITE_URL = "https://mahnooriftikhar.online";

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * Core Person entity, reused by the sitewide JSON-LD (layout) and the
 * /about page's more detailed ProfilePage JSON-LD. Only fields backed by
 * real data in data/cv.ts are included.
 */
export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: profile.name,
    url: `${SITE_URL}/`,
    jobTitle: "Full-Stack Developer & AI Engineer",
    description: profile.summary,
    email: `mailto:${profile.email}`,
    image: `${SITE_URL}/opengraph-image`,
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "University of Central Punjab",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "University of Central Punjab",
    },
    worksFor: [
      { "@type": "Organization", name: "Arbisoft" },
      { "@type": "Organization", name: "Arch Technologies" },
    ],
    knowsAbout: [
      "Full-Stack Web Development",
      "Artificial Intelligence",
      "Large Language Models",
      "Agentic Workflows",
      "React",
      "Next.js",
      "Django",
    ],
    sameAs: [profile.github, profile.linkedin, profile.medium],
  } as const;
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: profile.name,
    description: profile.summary,
    publisher: { "@id": PERSON_ID },
    author: { "@id": PERSON_ID },
  } as const;
}

export function profilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/about#profilepage`,
    url: `${SITE_URL}/about`,
    name: `About ${profile.name}`,
    mainEntity: { "@id": PERSON_ID },
  } as const;
}

export function projectJsonLd(project: Project) {
  const url = `${SITE_URL}/projects/${project.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${url}#project`,
    url,
    name: project.name,
    description: project.description,
    creator: { "@id": PERSON_ID },
    author: { "@id": PERSON_ID },
    keywords: project.tags.join(", "),
    ...(project.image ? { image: `${SITE_URL}${project.image}` } : {}),
    ...(project.liveUrl ? { mainEntityOfPage: project.liveUrl } : {}),
  } as const;
}

/** Articles that are genuinely published (have a real, verified URL). */
export const publishedArticles = articles.filter((a) => Boolean(a.url));

export function articleJsonLd(article: (typeof articles)[number]) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.summary,
    url: article.url,
    ...(article.image ? { image: `${SITE_URL}${article.image}` } : {}),
    // Reference the sitewide Person node by @id only — it's already fully
    // defined in app/layout.tsx on every page. Restating conflicting fields
    // (e.g. a different `url`) here would create inconsistent data for the
    // same @id.
    author: { "@id": PERSON_ID },
  } as const;
}

export function jsonLdScriptProps(data: unknown) {
  return {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(data).replace(/</g, "\\u003c") },
  } as const;
}
