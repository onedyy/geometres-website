import type { ReactNode } from "react";
import styles from "./HeroPlate.module.css";

type HeroPlateProps = {
  children: ReactNode;
  motto: string;
  readout: { lat: string; lng: string; label: string };
};

/** Survey points plotted over the photograph. Positions are percentages. */
const POINTS = [
  { id: "B1", x: 22, y: 24, delay: 0 },
  { id: "B2", x: 74, y: 33, delay: 1 },
  { id: "B3", x: 34, y: 68, delay: 2 },
  { id: "B4", x: 82, y: 76, delay: 3 },
];

/**
 * The hero composition: a field photograph inside a surveying viewfinder,
 * with a boundary line, survey points, a reticle and a dimension chain
 * plotted over it. Every overlay is decorative and hidden from
 * assistive technology; the photograph itself carries the alt text.
 */
export function HeroPlate({ children, motto, readout }: HeroPlateProps) {
  return (
    <figure className={styles.plate}>
      <div className={styles.frame}>
        <div className={styles.media}>
          {children}
          <span className={styles.scrim} aria-hidden="true" />

          {/* boundary line plotted between the survey points */}
          <svg
            className={styles.plot}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <polyline
              className={styles.plotLine}
              points="22,24 74,33 82,76 34,68 22,24"
              fill="none"
              stroke="var(--cyan)"
              strokeWidth="0.22"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {POINTS.map((point) => (
            <span
              key={point.id}
              className={styles.point}
              style={{
                left: `${point.x}%`,
                top: `${point.y}%`,
                ["--d" as string]: point.delay,
              }}
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" focusable="false">
                <circle
                  cx="12"
                  cy="12"
                  r="7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.7"
                />
                <path
                  d="M12 1v5M12 18v5M1 12h5M18 12h5"
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity="0.85"
                />
                <circle cx="12" cy="12" r="2.4" fill="currentColor" />
              </svg>
              <span className={`u-mono ${styles.pointLabel}`}>{point.id}</span>
            </span>
          ))}

          {/* reticle over the instrument */}
          <span className={styles.reticle} aria-hidden="true">
            <svg viewBox="0 0 120 120" width="120" height="120" focusable="false">
              <rect
                x="0.5"
                y="0.5"
                width="119"
                height="119"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.28"
              />
              <path
                d="M0 0h18M0 0v18M120 0h-18M120 0v18M0 120h18M0 120v-18M120 120h-18M120 120v-18"
                stroke="currentColor"
                strokeWidth="1.6"
                fill="none"
              />
              <path
                d="M60 44v-14M60 90v-14M44 60H30M90 60H76"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.8"
              />
            </svg>
          </span>

          {/* dimension chain */}
          <span className={styles.dimension} aria-hidden="true">
            <span className={styles.dimensionRule}>
              <span className={styles.dimensionCapStart} />
              <span className={styles.dimensionCapEnd} />
            </span>
            <span className={`u-mono ${styles.dimensionValue}`}>
              24,60 m
            </span>
          </span>

          <span className={`u-mono ${styles.motto}`} aria-hidden="true">
            {motto}
          </span>
        </div>

        {/* corner ticks */}
        <span className={styles.corner} data-c="tl" aria-hidden="true" />
        <span className={styles.corner} data-c="tr" aria-hidden="true" />
        <span className={styles.corner} data-c="bl" aria-hidden="true" />
        <span className={styles.corner} data-c="br" aria-hidden="true" />
      </div>

      <figcaption className={styles.meta}>
        <span className="u-mono">UAV · RTK GNSS</span>
        <span className="u-mono" data-accent="true">
          GSD &lt; 2 cm
        </span>
        <span className="u-mono">
          {readout.lat} / {readout.lng}
        </span>
      </figcaption>
    </figure>
  );
}
