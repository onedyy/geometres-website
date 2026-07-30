import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ContourField } from "@/components/graphics/ContourField";
import { HeroPlate } from "@/components/graphics/HeroPlate";
import { company, geoReadout, links } from "@/data/company";
import { services } from "@/data/services";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section id="uvod" className={styles.hero} aria-labelledby="hero-title">
      {/* ---- backdrop: fine grid + terrain contours, no moving noise ---- */}
      <div className={styles.backdrop} aria-hidden="true">
        <div className={styles.grid} />
        <div className={styles.contours}>
          <ContourField lines={16} seed={23} amplitude={30} animate />
        </div>
        <div className={styles.depth} />
      </div>

      <Container className={styles.inner}>
        <div className={styles.copy}>
          <p className={`u-mono ${styles.eyebrow}`}>
            <span className={styles.eyebrowTick} aria-hidden="true" />
            {company.discipline}
          </p>

          {/* No hard break — the balanced wrap holds at every width. */}
          <h1 className={styles.title} id="hero-title">
            Presnosť, na ktorej môžete stavať
            <span className={styles.period} aria-hidden="true">
              .
            </span>
          </h1>

          <p className={styles.lead}>
            Geodetické a katastrálne služby pre pozemky, stavby a technické
            projekty. Presné meranie, moderná technika a spoľahlivé výstupy.
          </p>

          <div className={styles.actions}>
            <Button href={links.mailtoConsultation}>Nezáväzná konzultácia</Button>
            <Button href="#sluzby" variant="secondary">
              Pozrieť služby
            </Button>
          </div>

          {/* Capabilities, not counters — every line is verifiable. */}
          <ul className={styles.capabilities}>
            {services.map((service) => (
              <li key={service.id} className={styles.capability}>
                <span className={styles.capabilityTick} aria-hidden="true" />
                {service.short}
              </li>
            ))}
          </ul>
        </div>

        {/* ---- art-directed field photograph with survey annotations ---- */}
        <div className={styles.plateWrap}>
          <HeroPlate motto={company.tagline} readout={geoReadout}>
            <Image
              src="/hero/survey-uav-portrait.webp"
              alt="Merací dron pri leteckom snímkovaní terénu za súmraku."
              fill
              priority
              fetchPriority="high"
              sizes="(min-width: 1440px) 46vw, (min-width: 1100px) 44vw, 100vw"
              className={styles.plateImage}
            />
          </HeroPlate>
        </div>
      </Container>

      <div className={styles.baseline} aria-hidden="true">
        <Container className={styles.baselineInner}>
          <span className="u-mono">{geoReadout.label}</span>
          <span className={styles.baselineRule} />
          <span className="u-mono">
            {geoReadout.lat} / {geoReadout.lng}
          </span>
        </Container>
      </div>
    </section>
  );
}
