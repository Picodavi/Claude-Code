import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/structured-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, priority: 1 },
    { url: `${SITE_URL}/legal/aviso-legal/`, priority: 0.3 },
    { url: `${SITE_URL}/legal/privacidad/`, priority: 0.3 },
    { url: `${SITE_URL}/legal/cookies/`, priority: 0.3 },
  ];
}
