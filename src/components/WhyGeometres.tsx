import { Container } from "@/components/ui/Container";
import { TriangulationDiagram } from "@/components/graphics/TriangulationDiagram";
import { differentiators } from "@/data/differentiators";
import { company } from "@/data/company";
import styles from "./WhyGeometres.module.css";

export function WhyGeometres() {
  return (
    <section className={styles.section} aria-labelledby="preco-title">
      <Container className={styles.inner}>
        <div className={styles.statement} data-reveal>
          <p className={`u-mono ${styles.eyebrow}`}>
            <span className={styles.tick} aria-hidden="true" />
            Prečo {company.name}
          </p>

          <h2 className={styles.title} id="preco-title">
            Technológia je nástroj.{" "}
            <br className="u-br" />
            <span className={styles.accent}>Presnosť</span> je výsledok.
          </h2>

          <p className={styles.lead}>
            {company.tagline} — a nie je to fráza. Každý bod má byť overený
            druhým meraním, každý výstup má obstáť pri kontrole.
          </p>

          <div className={styles.diagram}>
            <TriangulationDiagram />
            <p className={`u-mono ${styles.diagramNote}`}>
              Trojuholníková sieť · vzájomná kontrola bodov
            </p>
          </div>
        </div>

        <ul className={styles.list}>
          {differentiators.map((item, i) => (
            <li
              key={item.index}
              className={styles.item}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
            >
              <span className={`u-mono ${styles.itemIndex}`}>{item.index}</span>
              <div className={styles.itemBody}>
                <h3 className={styles.itemTitle}>{item.title}</h3>
                <p className={styles.itemText}>{item.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
