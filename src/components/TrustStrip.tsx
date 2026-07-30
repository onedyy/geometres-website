import { Container } from "@/components/ui/Container";
import styles from "./TrustStrip.module.css";

/** Capability band — technologies the company actually works with. */
const capabilities = [
  "GNSS meranie s RTK korekciou",
  "3D laserové skenovanie",
  "Letecké snímkovanie UAV",
  "Katastrálna dokumentácia",
];

export function TrustStrip() {
  return (
    <section className={styles.strip} aria-label="Technológie a zameranie">
      <Container className={styles.inner}>
        <ul className={styles.list}>
          {capabilities.map((item, i) => (
            <li
              key={item}
              className={styles.item}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
            >
              <span className={styles.tick} aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
