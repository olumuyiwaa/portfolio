import { SITE_URL } from "@/lib/siteConfig";
import { projects } from "@/lib/projects";

export default function sitemap() {
  const now = new Date();
  const routes = [
    { path: "", priority: 1 },
    { path: "/projects", priority: 0.9 },
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.6 },
    ...projects.map((p) => ({ path: `/projects/${p.slug}`, priority: 0.7 })),
  ];
  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: r.priority,
  }));
}
