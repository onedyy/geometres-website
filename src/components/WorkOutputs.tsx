"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { OutputVisual } from "@/components/graphics/OutputVisual";
import { workOutputs } from "@/data/outputs";
import styles from "./WorkOutputs.module.css";

export function WorkOutputs() {
  const [activeId, setActiveId] = useState(workOutputs[0].id);
  const active = workOutputs.find((o) => o.id === activeId) ?? workOutputs[0];

  return (
    <section
      id="vystupy"
      className={styles.section}
      aria-labelledby="vystupy-title"
    >
      <Container>
        <SectionHeading
          id="vystupy-title"
          eyebrow="05 / Výstupy"
          layout="split"
          title={
            <>
              Čo z merania{" "}
              <br className="u-br" />
              nakoniec <em>dostanete</em>.
            </>
          }
          lead={
            <p>
              Výstup vyberáme podľa toho, kto s ním bude pracovať — projektant,
              úrad, realizačná firma alebo majiteľ nehnuteľnosti.
            </p>
          }
        />

        <div className={styles.wrap} data-reveal>
          <div
            className={styles.tabs}
            role="tablist"
            aria-label="Typy výstupov"
          >
            {workOutputs.map((output, i) => {
              const isActive = output.id === activeId;
              return (
                <button
                  key={output.id}
                  type="button"
                  role="tab"
                  id={`output-tab-${output.id}`}
                  aria-selected={isActive}
                  aria-controls="output-panel"
                  tabIndex={isActive ? 0 : -1}
                  className={styles.tab}
                  data-active={isActive}
                  onClick={() => setActiveId(output.id)}
                  onKeyDown={(event) => {
                    const dir =
                      event.key === "ArrowRight" || event.key === "ArrowDown"
                        ? 1
                        : event.key === "ArrowLeft" || event.key === "ArrowUp"
                          ? -1
                          : 0;
                    if (!dir) return;
                    event.preventDefault();
                    const next =
                      workOutputs[
                        (i + dir + workOutputs.length) % workOutputs.length
                      ];
                    setActiveId(next.id);
                    document.getElementById(`output-tab-${next.id}`)?.focus();
                  }}
                >
                  <span className={`u-mono ${styles.tabIndex}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.tabLabel}>{output.title}</span>
                </button>
              );
            })}
          </div>

          <div
            className={styles.panel}
            role="tabpanel"
            id="output-panel"
            aria-labelledby={`output-tab-${active.id}`}
            tabIndex={-1}
          >
            <figure className={styles.figure} key={active.id}>
              <div className={styles.canvas}>
                <OutputVisual variant={active.visual} />
                <span className={styles.canvasVignette} aria-hidden="true" />
                <span className={styles.frameTicks} aria-hidden="true" />
              </div>
              <figcaption className={`u-mono ${styles.canvasNote}`}>
                {active.visualNote}
              </figcaption>
            </figure>

            <div className={styles.detail}>
              <p className={`u-mono ${styles.format}`}>
                <span className={styles.formatDot} aria-hidden="true" />
                {active.format}
              </p>
              <h3 className={styles.title}>{active.title}</h3>
              <p className={styles.body}>{active.body}</p>
              <dl className={styles.usedFor}>
                <dt className={`u-mono ${styles.usedForTitle}`}>
                  Kde sa používa
                </dt>
                <dd>{active.usedFor}</dd>
              </dl>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
