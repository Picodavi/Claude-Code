import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/structured-data";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // En staging (/beta) bloqueamos indexación para no competir con producción.
  if (process.env.STAGING === "1") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
