import type { Service } from "@/data/services";
import { ServiceDiagram } from "@/components/graphics/ServiceDiagram";
import styles from "./ServiceDetail.module.css";

/** The expanded body of one service category. */
export function ServiceDetail({ service }: { service: Service }) {
  return (
    <div className={styles.detail} key={service.id}>
      <div className={styles.figure}>
        <ServiceDiagram variant={service.diagram} />
        <span className={`u-mono ${styles.figureNote}`}>
          Schéma · {service.short}
        </span>
      </div>

      <div className={styles.body}>
        <p className={styles.lead}>{service.lead}</p>

        <div className={styles.block}>
          <h4 className={`u-mono ${styles.blockTitle}`}>Zahŕňa</h4>
          <ul className={styles.items}>
            {service.items.map((item) => (
              <li key={item}>
                <span className={styles.itemTick} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <dl className={styles.facts}>
          <div>
            <dt className={`u-mono ${styles.blockTitle}`}>Čo dostanete</dt>
            <dd>{service.deliverable}</dd>
          </div>
          <div>
            <dt className={`u-mono ${styles.blockTitle}`}>Typické využitie</dt>
            <dd>{service.useCase}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
