"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ServiceDetail } from "@/components/ServiceDetail";
import { services } from "@/data/services";
import { links } from "@/data/company";
import styles from "./Services.module.css";

/**
 * Numbered service index. One disclosure pattern at every width:
 * on mobile the detail opens under its own row, on desktop the grid places
 * the same element into the right-hand column. No duplicated markup, so the
 * `aria-controls` relationship stays valid on every screen size.
 */
export function Services() {
  const [activeId, setActiveId] = useState(services[0].id);

  return (
    <section
      id="sluzby"
      className={styles.section}
      aria-labelledby="sluzby-title"
    >
      <Container>
        <SectionHeading
          id="sluzby-title"
          eyebrow="02 / Služby"
          layout="split"
          title={
            <>
              Tri oblasti, jeden{" "}
              <br className="u-br" />
              geodetický <em>základ</em>.
            </>
          }
          lead={
            <p>
              Katastrálne aj inžinierske práce riešime rovnakou metodikou:
              zameriame skutočný stav, spracujeme ho a odovzdáme v podobe, s
              ktorou sa dá ďalej pracovať.
            </p>
          }
        />

        <div className={styles.layout} data-reveal>
          <ul className={styles.index}>
            {services.map((service) => {
              const isActive = service.id === activeId;
              return (
                <li key={service.id} className={styles.item}>
                  <h3 className={styles.triggerHeading}>
                    <button
                      type="button"
                      className={styles.trigger}
                      data-active={isActive}
                      aria-expanded={isActive}
                      aria-controls={`service-panel-${service.id}`}
                      id={`service-trigger-${service.id}`}
                      onClick={() => setActiveId(service.id)}
                    >
                      <span className={`u-mono ${styles.triggerIndex}`}>
                        {service.index}
                      </span>
                      <span className={styles.triggerTitle}>
                        {service.category}
                      </span>
                      <span className={styles.triggerMark} aria-hidden="true">
                        <span />
                        <span />
                      </span>
                    </button>
                  </h3>

                  <div
                    className={styles.panel}
                    id={`service-panel-${service.id}`}
                    role="region"
                    aria-labelledby={`service-trigger-${service.id}`}
                    hidden={!isActive}
                  >
                    <ServiceDetail service={service} />
                  </div>
                </li>
              );
            })}
          </ul>

          {/* fills the index column on wide screens and offers a way out */}
          <div className={styles.aside}>
            <p className={styles.asideText}>
              Neviete, do ktorej oblasti vaše zadanie patrí? Napíšte nám, o aký
              pozemok alebo stavbu ide — navrhneme postup.
            </p>
            <Button href={links.mailtoConsultation} variant="text">
              Nezáväzná konzultácia
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
