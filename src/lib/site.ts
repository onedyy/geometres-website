/**
 * Set NEXT_PUBLIC_SITE_URL in the hosting environment before going live
 * (canonical URLs, Open Graph images, sitemap).
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.geometres.sk"
).replace(/\/$/, "");

export const siteMeta = {
  title: "GEOMETRES | Geodézia, kataster a 3D meranie Bratislava",
  shortTitle: "GEOMETRES",
  description:
    "Geodetické a katastrálne služby v Bratislave. Geometrické plány, inžinierska geodézia, vytyčovanie stavieb, letecké snímkovanie a 3D laserové skenovanie.",
  locale: "sk_SK",
  lang: "sk",
} as const;
