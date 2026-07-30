"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EquipmentFeature } from "@/components/EquipmentFeature";
import { equipment } from "@/data/equipment";
import styles from "./TechnologyShowcase.module.css";

export function TechnologyShowcase() {
  const [activeId, setActiveId] = useState(equipment[0].id);
  const active = equipment.find((e) => e.id === activeId) ?? equipment[0];

  return (
    <section
      id="technika"
      className={styles.section}
      aria-labelledby="technika-title"
    >
      <Container>
        <SectionHeading
          id="technika-title"
          eyebrow="04 / Technika"
          layout="split"
          title={
            <>
              Prístroje, ktoré{" "}
              <br className="u-br" />
              určujú <em>presnosť</em>.
            </>
          }
          lead={
            <p>
              Každé zadanie má vhodnú metódu merania. Toto sú tri prístroje,
              medzi ktorými sa v teréne rozhodujeme.
            </p>
          }
        />

        <div className={styles.layout} data-reveal>
          {/* ---- vertical equipment selector ---- */}
          <div
            className={styles.selector}
            role="tablist"
            aria-label="Výber prístroja"
            aria-orientation="vertical"
          >
            {equipment.map((item, i) => {
              const isActive = item.id === activeId;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`equipment-tab-${item.id}`}
                  aria-selected={isActive}
                  aria-controls={`equipment-panel-${item.id}`}
                  tabIndex={isActive ? 0 : -1}
                  className={styles.option}
                  data-active={isActive}
                  onClick={() => setActiveId(item.id)}
                  onKeyDown={(event) => {
                    const dir =
                      event.key === "ArrowDown" || event.key === "ArrowRight"
                        ? 1
                        : event.key === "ArrowUp" || event.key === "ArrowLeft"
                          ? -1
                          : 0;
                    if (!dir) return;
                    event.preventDefault();
                    const next =
                      equipment[(i + dir + equipment.length) % equipment.length];
                    setActiveId(next.id);
                    document
                      .getElementById(`equipment-tab-${next.id}`)
                      ?.focus();
                  }}
                >
                  <span className={`u-mono ${styles.optionIndex}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.optionText}>
                    <span className={`u-mono ${styles.optionCategory}`}>
                      {item.category}
                    </span>
                    <span className={styles.optionName}>{item.name}</span>
                  </span>
                  <span className={styles.optionRule} aria-hidden="true" />
                </button>
              );
            })}
          </div>

          {/* ---- active equipment stage ---- */}
          <div
            className={styles.stage}
            role="tabpanel"
            id={`equipment-panel-${active.id}`}
            aria-labelledby={`equipment-tab-${active.id}`}
            tabIndex={-1}
          >
            <EquipmentFeature item={active} />
          </div>
        </div>
      </Container>
    </section>
  );
}
