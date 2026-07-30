/* --------------------------------------------------------------------------
   SERVICES — the three approved categories. Wording is editable; the
   category names and the individual service items match the company's
   existing offer and should only be changed by the company.
   -------------------------------------------------------------------------- */

export type ServiceDiagram = "cadastre" | "engineering" | "photogrammetry";

export type Service = {
  id: string;
  index: string;
  category: string;
  /** Short label used in narrow layouts and in the hero capability strip. */
  short: string;
  lead: string;
  items: string[];
  /** What the client physically receives. */
  deliverable: string;
  /** Typical situations in which the service is ordered. */
  useCase: string;
  diagram: ServiceDiagram;
};

export const services: Service[] = [
  {
    id: "kataster",
    index: "01",
    category: "Kataster nehnuteľností",
    short: "Kataster nehnuteľností",
    lead: "Riešime vzťah medzi skutočným stavom v teréne a stavom zapísaným v katastri. Zameriame hranice, stavbu alebo parcelu, porovnáme ich s katastrálnou dokumentáciou a pripravíme podklady pre zápis.",
    items: [
      "Geodetické podklady ku kolaudácii stavby",
      "Riešenie vlastníckych hraníc pozemkov",
      "Vyhotovenie geometrických plánov",
      "Identifikácia pozemkov",
    ],
    deliverable:
      "Geometrický plán, technická správa a zoznam súradníc — v tlačenej aj digitálnej podobe.",
    useCase:
      "Kolaudácia stavby, rozdelenie alebo scelenie parciel, vecné bremeno, príprava prevodu nehnuteľnosti.",
    diagram: "cadastre",
  },
  {
    id: "inzinierska",
    index: "02",
    category: "Inžinierska geodézia",
    short: "Inžinierska geodézia",
    lead: "Geodetické práce, ktoré držia stavbu v projektovaných rozmeroch — od podkladov pre projektanta, cez vytýčenie objektu, až po zameranie skutočného stavu po realizácii.",
    items: [
      "Polohopisné a výškopisné zameranie",
      "Vytyčovanie stavieb",
      "Určenie výmer plôch interiérov",
    ],
    deliverable:
      "Polohopisný a výškopisný plán v CAD formáte, vytyčovací protokol a zoznam súradníc bodov.",
    useCase:
      "Príprava projektovej dokumentácie, osadenie objektu na pozemok, kontrola realizácie, pasportizácia priestorov.",
    diagram: "engineering",
  },
  {
    id: "fotogrametria",
    index: "03",
    category: "Fotogrametria a 3D",
    short: "Fotogrametria a 3D",
    lead: "Tam, kde klasické meranie naráža na rozsah alebo zložitosť tvaru, nastupuje laserové skenovanie a letecké snímkovanie. Priestor zaznamenáme ako celok a detaily doriešime pri spracovaní dát.",
    items: [
      "3D laserové skenovanie",
      "Letecké snímkovanie",
      "3D virtuálne prehliadky",
      "Mračná bodov",
    ],
    deliverable:
      "Mračno bodov, ortofotomozaika, model terénu alebo interaktívna prehliadka priestoru.",
    useCase:
      "Dokumentácia existujúcich objektov, rozsiahle areály, členité a historické stavby, prezentácia nehnuteľnosti.",
    diagram: "photogrammetry",
  },
];
