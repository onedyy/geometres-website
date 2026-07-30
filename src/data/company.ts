/* --------------------------------------------------------------------------
   COMPANY / CONTACT — single source of truth.
   Everything a non-developer might need to change lives in this folder.
   Only verified facts belong here. Do not add certifications, project
   counts, years of experience, guarantees or precision claims that the
   company has not confirmed in writing.
   -------------------------------------------------------------------------- */

export const company = {
  name: "GEOMETRES",
  legalSuffix: "s.r.o.",
  legalName: "GEOMETRES s.r.o.",
  tagline: "Presnosť je našou silou",
  discipline: "Geodézia · Kataster · 3D meranie",
  /** Short positioning line, used in the header meta and footer. */
  positioning:
    "Geodetické a katastrálne služby pre pozemky, stavby a technické projekty.",
} as const;

export const contact = {
  street: "Pekná cesta 19",
  city: "Bratislava",
  /** Postal code of the address above (Bratislava – Rača). */
  postalCode: "831 52",
  country: "Slovensko",
  countryCode: "SK",
  email: "geodeti.geometres@gmail.com",
  hours: {
    label: "Pondelok – Piatok",
    time: "8:00 – 16:00",
    /** schema.org openingHours notation */
    schema: "Mo-Fr 08:00-16:00",
  },
  youtube: {
    handle: "@geometres9199",
    url: "https://www.youtube.com/@geometres9199",
  },
  /** Approximate coordinates of the address — used for the map view only. */
  geo: {
    lat: 48.19818,
    lng: 17.13501,
  },
} as const;

/** Human-readable coordinate readout used as a technical graphic detail. */
export const geoReadout = {
  lat: "48.1982° N",
  lng: "17.1350° E",
  label: "Bratislava · SK",
} as const;

const mapQuery = encodeURIComponent(
  `${contact.street}, ${contact.postalCode} ${contact.city}, ${contact.country}`,
);

export const links = {
  mailto: `mailto:${contact.email}`,
  mailtoConsultation: `mailto:${contact.email}?subject=${encodeURIComponent(
    "Nezáväzná konzultácia — geodetické práce",
  )}&body=${encodeURIComponent(
    [
      "Dobrý deň,",
      "",
      "rád by som sa informoval o geodetických prácach.",
      "",
      "Predmet zamerania (pozemok / stavba / interiér):",
      "Lokalita alebo katastrálne územie:",
      "Stručný popis požiadavky:",
      "Kontaktné telefónne číslo:",
      "",
      "Ďakujem za odpoveď.",
    ].join("\n"),
  )}`,
  /** Opens the real address in Google Maps — no API key required. */
  map: `https://www.google.com/maps/search/?api=1&query=${mapQuery}`,
  /** Keyless OpenStreetMap embed, lazy-loaded in the contact section. */
  mapEmbed: (() => {
    const { lat, lng } = contact.geo;
    const d = 0.0055;
    const bbox = [lng - d * 1.9, lat - d, lng + d * 1.9, lat + d]
      .map((n) => n.toFixed(5))
      .join("%2C");
    return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`;
  })(),
} as const;
