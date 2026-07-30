import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/data/process";
import styles from "./SurveyProcess.module.css";

export function SurveyProcess() {
  return (
    <section
      id="proces"
      className={styles.section}
      aria-labelledby="proces-title"
    >
      <Container>
        <SectionHeading
          id="proces-title"
          eyebrow="03 / Ako pracujeme"
          layout="split"
          title={
            <>
              Od zadania{" "}
              <br className="u-br" />k presnému <em>výstupu</em>.
            </>
          }
          lead={
            <p>
              Postup je pri každom zadaní rovnaký. Mení sa len technológia
              merania a forma výstupu — podľa toho, čo je predmetom zamerania.
            </p>
          }
        />

        <ol className={styles.track} data-reveal>
          {/* The survey line the steps are plotted on. */}
          <span className={styles.line} aria-hidden="true">
            <span className={styles.lineFill} />
          </span>

          {processSteps.map((step, i) => (
            <li
              key={step.index}
              className={styles.step}
              style={{ ["--i" as string]: i }}
            >
              <span className={styles.node} aria-hidden="true">
                <svg viewBox="0 0 22 22" width="22" height="22" focusable="false">
                  <circle
                    cx="11"
                    cy="11"
                    r="10"
                    fill="var(--surface, var(--ink-850))"
                    stroke="currentColor"
                    strokeWidth="1"
                    opacity="0.85"
                  />
                  <circle cx="11" cy="11" r="3.2" fill="currentColor" />
                  <path
                    d="M11 0v3.2M11 18.8V22M0 11h3.2M18.8 11H22"
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                </svg>
              </span>

              <p className={`u-mono ${styles.marker}`}>
                <span className={styles.markerIndex}>{step.index}</span>
                <span className={styles.markerDot} aria-hidden="true" />
                {step.marker}
              </p>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.body}>{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
