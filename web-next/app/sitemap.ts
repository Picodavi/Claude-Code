import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/structured-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified: now, priority: 1 },
    { url: `${SITE_URL}/legal/aviso-legal/`, lastModified: now, priority: 0.3 },
    { url: `${SITE_URL}/legal/privacidad/`, lastModified: now, priority: 0.3 },
    { url: `${SITE_URL}/legal/cookies/`, lastModified: now, priority: 0.3 },
  ];
}
