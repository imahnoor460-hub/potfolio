import type { MetadataRoute } from "next";
import { articles, projects } from "@/data/cv";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const latestArticle = articles[0]?.datePublished;

  const projectImages = projects.flatMap((p) => (p.image ? [absoluteUrl(p.image)] : []));
  const articleImages = articles.flatMap((a) => (a.image ? [absoluteUrl(a.image)] : []));

  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: [absoluteUrl("/opengraph-image"), ...projectImages],
    },
    {
      url: absoluteUrl("/about"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/projects"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      images: projectImages,
    },
    ...projects.map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.6,
      ...(project.image && { images: [absoluteUrl(project.image)] }),
    })),
    {
      url: absoluteUrl("/articles"),
      lastModified: latestArticle ? new Date(latestArticle) : lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
      images: articleImages,
    },
  ];
}
