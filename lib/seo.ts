import { articles, certifications, education, profile, skillGroups, type ArticleEntry, type Project } from "@/data/cv";
import { PERSON_ID, SITE_DESCRIPTION, SITE_NAME, SITE_URL, WEBSITE_ID, absoluteUrl } from "@/lib/site";

// Structured data (schema.org JSON-LD). Every node that refers to Mahnoor uses
// the Person @id defined once in the root layout, so search engines see one
// consistent entity across all pages.

/** Sitewide Person + WebSite graph, rendered in app/layout.tsx. */
export function siteGraphJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: profile.name,
        url: SITE_URL,
        image: absoluteUrl("/opengraph-image"),
        jobTitle: profile.title,
        description: profile.summary,
        email: `mailto:${profile.email}`,
        address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
        alumniOf: education.map((e) => ({ "@type": "EducationalOrganization", name: e.school })),
        hasCredential: certifications.map((c) => ({
          "@type": "EducationalOccupationalCredential",
          name: c.name,
          credentialCategory: "certificate",
          ...(c.issuer && { recognizedBy: { "@type": "Organization", name: c.issuer } }),
          ...(c.verifyUrl && { url: c.verifyUrl }),
        })),
        knowsAbout: [
          "Full-Stack Web Development",
          "Artificial Intelligence",
          "Machine Learning",
          "Large Language Models",
          "Agentic Workflows",
          ...skillGroups
            .filter((g) => /web|ai|machine/i.test(g.category))
            .flatMap((g) => g.skills),
        ],
        sameAs: [profile.github, profile.linkedin, profile.medium],
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "en",
        publisher: { "@id": PERSON_ID },
      },
    ],
  };
}

/** Marks the home page as a profile page about the Person. */
export function profilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#profilepage`,
    url: SITE_URL,
    name: `${profile.name} — ${profile.title}`,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": PERSON_ID },
    about: { "@id": PERSON_ID },
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function projectJsonLd(project: Project) {
  const url = absoluteUrl(`/projects/${project.slug}`);
  return {
    "@type": "CreativeWork",
    "@id": `${url}#project`,
    url,
    name: project.name,
    description: project.description,
    keywords: project.tags.join(", "),
    creator: { "@id": PERSON_ID },
    author: { "@id": PERSON_ID },
    ...(project.image && { image: absoluteUrl(project.image) }),
    ...(project.liveUrl && { sameAs: project.liveUrl }),
  };
}

export function articleJsonLd(article: ArticleEntry) {
  return {
    "@type": "BlogPosting",
    headline: article.title,
    description: article.summary,
    url: article.url,
    mainEntityOfPage: article.url,
    inLanguage: "en",
    ...(article.datePublished && { datePublished: article.datePublished }),
    ...(article.keywords && { keywords: article.keywords.join(", ") }),
    ...(article.image && { image: absoluteUrl(article.image) }),
    publisher: { "@type": "Organization", name: "Medium" },
    author: { "@id": PERSON_ID },
  };
}

/** Articles that are genuinely published (have a real URL). */
export const publishedArticles = articles.filter((a) => Boolean(a.url));

export function jsonLdScriptProps(data: unknown) {
  return {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: JSON.stringify(data).replace(/</g, "\\u003c") },
  } as const;
}
