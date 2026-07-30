/* --------------------------------------------------------------------------
   WORK OUTPUTS — the four approved output types.

   The accompanying visuals are generated technical illustrations of the
   *type* of output, not photographs of completed client projects. Each
   item therefore carries `visualNote`, which is rendered on the page.
   Replace `visual` with a real project image once one is approved for
   publication and drop the note.
   -------------------------------------------------------------------------- */

export type OutputVisual = "survey" | "orthophoto" | "pointcloud" | "tour";

export type WorkOutput = {
  id: string;
  title: string;
  /** Format / file the client ends up with. */
  format: string;
  body: string;
  /** Bullet-free single line: what it is typically used for. */
  usedFor: string;
  visual: OutputVisual;
  visualNote: string;
};

export const workOutputs: WorkOutput[] = [
  {
    id: "polohopis",
    title: "Polohopis a výškopis",
    format: "DWG / DXF / PDF",
    body: "Členený plán zameraného terénu, objektov a výškových bodov. Podklad, z ktorého projektant kreslí, a stavbár stavia.",
    usedFor: "Projektová dokumentácia, osadenie objektu, výpočet kubatúr.",
    visual: "survey",
    visualNote: "Vizualizácia typu výstupu",
  },
  {
    id: "ortofoto",
    title: "Ortofotosnímky",
    format: "GeoTIFF / PDF",
    body: "Geometricky opravená letecká snímka, ktorú je možné merať. Zobrazuje skutočný stav lokality k dátumu letu.",
    usedFor: "Dokumentácia lokality, porovnanie stavu v čase, podklad pre mapy.",
    visual: "orthophoto",
    visualNote: "Vizualizácia typu výstupu",
  },
  {
    id: "mracna-bodov",
    title: "Mračná bodov",
    format: "E57 / LAS / RCP",
    body: "Hustý priestorový záznam prostredia v troch rozmeroch. Z jedného skenu sa dá dodatočne odmerať takmer čokoľvek.",
    usedFor: "Rekonštrukcie, BIM modely, členité a historické objekty.",
    visual: "pointcloud",
    visualNote: "Vizualizácia typu výstupu",
  },
  {
    id: "matterport",
    title: "Matterport prehliadky",
    format: "Webový odkaz",
    body: "Interaktívna digitálna prehliadka interiéru alebo nehnuteľnosti, ktorú otvoríte v prehliadači bez inštalácie.",
    usedFor: "Prezentácia nehnuteľnosti, pasport priestoru, vzdialená obhliadka.",
    visual: "tour",
    visualNote: "Vizualizácia typu výstupu",
  },
];
