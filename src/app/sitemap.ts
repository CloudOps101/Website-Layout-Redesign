import type { MetadataRoute } from "next";

import { programs } from "@/content/site";
import { siteUrl } from "@/content/site-url";

// Update this date when page content changes meaningfully
const lastModified = "2026-10-27";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: [string, number, MetadataRoute.Sitemap[number]["changeFrequency"]][] = [
    ["/", 1, "weekly"],
    ["/about", 0.8, "monthly"],
    ["/programs", 0.9, "monthly"],
    ...programs.map((p) => [p.href, 0.8, "monthly"] as [string, number, "monthly"]),
    ["/partnerships", 0.7, "monthly"],
    ["/donate", 0.8, "monthly"],
    ["/contact", 0.7, "yearly"],
  ];
  return pages.map(([path, priority, changeFrequency]) => ({
    url: `${siteUrl}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
