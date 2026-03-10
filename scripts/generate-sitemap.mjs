import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const siteUrl = (process.env.SITE_URL || "https://www.zollushouse.eu").replace(/\/$/, "");

// Keep this list aligned with real indexable routes in your app.
const routes = [
  "/",
];

const today = new Date().toISOString().slice(0, 10);

const urls = routes
  .map((route) => {
    const normalizedRoute = route.startsWith("/") ? route : `/${route}`;
    return [
      "  <url>",
      `    <loc>${siteUrl}${normalizedRoute}</loc>`,
      `    <lastmod>${today}</lastmod>`,
      "    <changefreq>weekly</changefreq>",
      `    <priority>${normalizedRoute === "/" ? "1.0" : "0.8"}</priority>`,
      "  </url>",
    ].join("\n");
  })
  .join("\n");

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  urls,
  "</urlset>",
  "",
].join("\n");

const outputPath = resolve("public", "sitemap.xml");
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, xml, "utf8");

console.log(`Generated sitemap at ${outputPath}`);
