import type { ReactNode } from "react";
import styles from "./SectionHeading.module.css";

type SectionHeadingProps = {
  /** Technical eyebrow, e.g. "02 / SLUŽBY". */
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  /** `split` puts the lead in a right-hand column on wide screens. */
  layout?: "stack" | "split";
  id?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lead,
  layout = "stack",
  id,
  className,
}: SectionHeadingProps) {
  return (
    <header
      className={[styles.head, styles[layout], className]
        .filter(Boolean)
        .join(" ")}
      data-reveal
    >
      <div className={styles.main}>
        <p className={`u-mono ${styles.eyebrow}`}>
          <span className={styles.tick} aria-hidden="true" />
          {eyebrow}
        </p>
        <h2 className={styles.title} id={id}>
          {title}
        </h2>
      </div>
      {lead ? <div className={styles.lead}>{lead}</div> : null}
    </header>
  );
}
