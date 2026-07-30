/* --------------------------------------------------------------------------
   EQUIPMENT — only specifications that already appeared in the company's
   own content are listed. Do not add further technical numbers without
   confirmation from the manufacturer's datasheet.

   `photoNote` marks images that are illustrative rather than a photograph
   of the company's own unit, so nothing on the page overstates reality.
   -------------------------------------------------------------------------- */

export type Equipment = {
  id: string;
  name: string;
  category: string;
  /** Two-line purpose description. */
  purpose: string;
  /** Verified spec taken from the existing website content. */
  spec: { label: string; value: string };
  /** Services this device is used for. */
  supports: string[];
  image: {
    src: string;
    width: number;
    height: number;
    alt: string;
    /** "field" = photographed in use, "product" = cut-out product shot. */
    kind: "field" | "product";
  };
  photoNote?: string;
};

export const equipment: Equipment[] = [
  {
    id: "phantom-4-rtk",
    name: "DJI Phantom 4 RTK",
    category: "Bezpilotný letecký systém",
    purpose:
      "Letecké snímkovanie pozemkov a areálov s RTK korekciou polohy. Zo snímok vzniká ortofotomozaika a model terénu.",
    spec: { label: "Veľkosť pixela", value: "GSD < 2 cm" },
    supports: ["Letecké snímkovanie", "Ortofotosnímky", "Model terénu"],
    image: {
      src: "/equipment/dji-phantom-4-rtk.webp",
      width: 2000,
      height: 1500,
      alt: "Profesionálny merací dron pri leteckom snímkovaní v teréne za súmraku.",
      kind: "field",
    },
    photoNote: "Ilustračná fotografia",
  },
  {
    id: "viva-gs07",
    name: "Leica Viva GS07",
    category: "GNSS prijímač",
    purpose:
      "Presné určovanie polohy bodov v teréne v reálnom čase. Základný nástroj pre katastrálne a inžinierske merania.",
    spec: { label: "Uvádzaná presnosť", value: "± 8 mm" },
    supports: ["Kataster nehnuteľností", "Polohopis a výškopis", "Vytyčovanie"],
    image: {
      src: "/equipment/leica-viva-gs07.webp",
      width: 837,
      height: 1700,
      alt: "GNSS prijímač Leica Viva GS07 na výtyčke s kontrolnou jednotkou.",
      kind: "product",
    },
  },
  {
    id: "blk360",
    name: "Leica BLK360",
    category: "3D laserový skener",
    purpose:
      "Skenovanie interiérov a exteriérov do mračna bodov. Zachytí geometriu priestoru vrátane detailov, ktoré sa bodovo merať nedajú.",
    spec: { label: "Záber", value: "360° skenovanie" },
    supports: ["Mračná bodov", "Interiéry a výmery", "Virtuálne prehliadky"],
    image: {
      src: "/equipment/leica-blk360.webp",
      width: 586,
      height: 883,
      alt: "Kompaktný 3D laserový skener Leica BLK360 na statíve.",
      kind: "product",
    },
  },
];
