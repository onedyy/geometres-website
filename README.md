# GEOMETRES s.r.o. — firemný web

Jednostránková prezentácia geodetickej firmy. Next.js 15 (App Router),
TypeScript, CSS Modules, bez UI knižníc a bez externých fontových CDN.

## Spustenie

```bash
npm install
npm run dev        # http://localhost:3000
```

Ďalšie príkazy:

```bash
npm run build      # produkčný build
npm start          # spustenie produkčného buildu
npm run lint       # ESLint (next/core-web-vitals + next/typescript)
npm run typecheck  # tsc --noEmit
```

Pred nasadením nastavte v prostredí hostingu premennú:

```
NEXT_PUBLIC_SITE_URL=https://www.geometres.sk
```

Používa sa pre kanonickú URL, Open Graph obrázok, `sitemap.xml` a `robots.txt`.

## Kde sa mení obsah

Všetok redakčný obsah je v `src/data/` a je typovaný — netreba zasahovať do
komponentov.

| Súbor | Obsah |
| --- | --- |
| `src/data/company.ts` | názov firmy, adresa, e-mail, pracovná doba, YouTube, súradnice, odkazy (mailto, mapa) |
| `src/data/navigation.ts` | položky navigácie a ich poradie |
| `src/data/services.ts` | tri kategórie služieb, ich položky, výstupy a využitie |
| `src/data/process.ts` | štyri kroky spolupráce |
| `src/data/equipment.ts` | technika, kategórie, parametre, fotografie |
| `src/data/outputs.ts` | typy výstupov a formáty |
| `src/data/differentiators.ts` | sekcia „Prečo GEOMETRES“ |
| `src/lib/site.ts` | titulok a meta popis stránky |

Zásady, ktoré prosím dodržte pri úpravách: v dátach sú len fakty potvrdené
firmou. Nie sú tu žiadne referencie, počty projektov, roky skúseností,
certifikáty ani presnosti nad rámec toho, čo firma uvádza. Ak takéto údaje
pridáte, mali by byť overiteľné.

## Obrázky

| Cesta | Zdroj |
| --- | --- |
| `public/hero/survey-uav.webp`, `survey-uav-portrait.webp` | dodaná fotografia drona (výrezy pre hero) |
| `public/equipment/dji-phantom-4-rtk.webp` | dodaná fotografia drona — v `equipment.ts` označená ako ilustračná |
| `public/equipment/leica-viva-gs07.webp` | dodaná fotografia GS07, odstránené biele pozadie |
| `public/equipment/leica-blk360.webp` | dodaná fotografia BLK360 (pôvodná priehľadnosť zachovaná) |
| `public/og.jpg` | Open Graph obrázok zložený z hero fotografie |
| `img/` | pôvodné nespracované súbory od klienta |

### Doplnenie reálnych referenčných fotografií

Sekcia **Výstupy** používa generované technické ilustrácie typov výstupu, nie
fotografie dokončených projektov — každá je na stránke označená popisom
„Vizualizácia typu výstupu“ (`visualNote` v `src/data/outputs.ts`).

Keď budú k dispozícii schválené reálne ukážky:

1. vložte obrázok do `public/work/`,
2. v `src/data/outputs.ts` doplňte pole s cestou k obrázku,
3. odstráňte `visualNote`, aby zmizlo označenie ilustrácie,
4. v `src/components/WorkOutputs.tsx` vymeňte `<OutputVisual />` za
   `next/image`.

## Písma

Self-hosted WOFF2 v `public/fonts`, deklarované v `src/app/fonts.css`
s `unicode-range` pre `latin` aj `latin-ext` (slovenská diakritika).
Žiadny `@import`, žiadna požiadavka na Google Fonts.

- **Syne 700** — displejové titulky a wordmark
- **Inter Tight** (variable 100–900) — text a UI
- **JetBrains Mono** 400/500 — súradnice, parametre, technické popisky

## Prístupnosť

Semantické značkovanie, jedna úroveň `h1`, odkaz na preskočenie navigácie,
viditeľné focus stavy, klávesová obsluha akordeónu služieb aj prepínačov
techniky (kurzorové klávesy), `aria-expanded` / `aria-controls`,
zámok skrolovania a focus trap v mobilnom menu, dekoratívna grafika je
`aria-hidden`, podpora `prefers-reduced-motion`.

## Nasadenie

Statická prerenderovaná stránka, funguje na Vercel bez ďalšej konfigurácie
(`npm run build` → `.next`). Pri inom hostingu spustite `npm start` za
reverzným proxy, alebo použite Node runtime s podporou Next.js 15.
