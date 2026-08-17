import type { MetadataRoute } from "next";

const SITE = "https://manuel.fyi";

export default function robots(): MetadataRoute.Robots {
  return {
    host: SITE,
    rules: [
      {
        allow: "/",
        disallow: ["/api/", "/stats/"],
        userAgent: "*",
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
  };
}
