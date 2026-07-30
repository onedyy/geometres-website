/* --------------------------------------------------------------------------
   WHY GEOMETRES — factual differentiators only. No testimonials, no client
   logos, no counts, no awards.
   -------------------------------------------------------------------------- */

export type Differentiator = {
  index: string;
  title: string;
  body: string;
};

export const differentiators: Differentiator[] = [
  {
    index: "A",
    title: "Kataster aj stavba pod jednou strechou",
    body: "Majetkovo-právne a inžinierske merania riešime v rámci jednej firmy. Údaje si nemusíte prenášať medzi dodávateľmi a body v jednom projekte sedia na seba.",
  },
  {
    index: "B",
    title: "Metóda podľa zadania, nie podľa vybavenia",
    body: "GNSS, laserové skenovanie a letecké snímkovanie kombinujeme podľa toho, čo dané zadanie skutočne potrebuje.",
  },
  {
    index: "C",
    title: "Výstup, s ktorým sa dá pracovať",
    body: "Dáta odovzdávame skontrolované, utriedené a vo formátoch, ktoré otvorí projektant, úrad aj realizačná firma.",
  },
  {
    index: "D",
    title: "Priama technická komunikácia",
    body: "Rozprávate sa s tým, kto meranie vykonal a spracoval — nie s prostredníkom, ktorý odpoveď posúva ďalej.",
  },
];
