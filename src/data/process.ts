/* --------------------------------------------------------------------------
   PROCESS — deliberately free of turnaround-time promises.
   -------------------------------------------------------------------------- */

export type ProcessStep = {
  index: string;
  title: string;
  body: string;
  /** Short technical annotation shown on the survey line. */
  marker: string;
};

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Konzultácia a podklady",
    body: "Ujasníme si, čo presne je predmetom merania, a prejdeme dostupnú dokumentáciu — katastrálne údaje, projekt alebo predchádzajúce zamerania.",
    marker: "ZADANIE",
  },
  {
    index: "02",
    title: "Meranie v teréne",
    body: "Body a plochy zameriame technológiou, ktorá zadaniu vyhovuje — GNSS prijímačom, laserovým skenerom alebo leteckým snímkovaním.",
    marker: "TERÉN",
  },
  {
    index: "03",
    title: "Spracovanie dát",
    body: "Nameraná zostava sa skontroluje, vyrovná a spracuje do požadovaného technického výstupu vo zvolenom formáte.",
    marker: "VÝPOČET",
  },
  {
    index: "04",
    title: "Odovzdanie výsledku",
    body: "Dostanete dohodnuté plány, dáta, dokumentáciu alebo vizuálne výstupy a vysvetlenie, čo z nich vyplýva.",
    marker: "VÝSTUP",
  },
];
