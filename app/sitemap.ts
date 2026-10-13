import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";

const BASE = "https://aakshantkumar.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${BASE}/works`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE}/kaiketsu`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    { url: `${BASE}/writing`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    ...articles.flatMap((a) => [
      { url: `${BASE}/writing/${a.slug}`, lastModified: new Date(a.published), changeFrequency: "monthly" as const, priority: 0.7 },
      { url: `${BASE}/writing/${a.slug}/technical`, lastModified: new Date(a.published), changeFrequency: "monthly" as const, priority: 0.6 },
    ]),
  ];
}
