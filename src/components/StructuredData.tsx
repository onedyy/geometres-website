import { company, contact } from "@/data/company";
import { services } from "@/data/services";
import { siteMeta, siteUrl } from "@/lib/site";

/**
 * ProfessionalService structured data. Contains only confirmed facts —
 * no aggregate ratings, reviews, price ranges or founding dates.
 */
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteUrl}/#organizacia`,
    name: company.legalName,
    alternateName: company.name,
    description: siteMeta.description,
    url: siteUrl,
    email: contact.email,
    image: `${siteUrl}/og.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.street,
      addressLocality: contact.city,
      postalCode: contact.postalCode,
      addressCountry: contact.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: contact.geo.lat,
      longitude: contact.geo.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "08:00",
        closes: "16:00",
      },
    ],
    sameAs: [contact.youtube.url],
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Slovensko",
    },
    knowsLanguage: ["sk"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Geodetické služby",
      itemListElement: services.map((service) => ({
        "@type": "OfferCatalog",
        name: service.category,
        itemListElement: service.items.map((item) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: item },
        })),
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      // Static, developer-authored JSON — no user input is interpolated.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
