"use client";

import { useState } from "react";
import { contact, links } from "@/data/company";
import styles from "./MapPanel.module.css";

/**
 * Keyless map. Nothing here pretends to be interactive before it is:
 * the preview is an explicitly labelled locator, and the real
 * OpenStreetMap view is only requested when the visitor asks for it —
 * which also keeps the third-party request off the initial page load.
 */
export function MapPanel() {
  const [loaded, setLoaded] = useState(false);

  return (
    <figure className={styles.panel}>
      <div className={styles.frame}>
        {loaded ? (
          <iframe
            className={styles.iframe}
            src={links.mapEmbed}
            title={`Mapa — ${contact.street}, ${contact.city}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <>
            <span className={styles.grid} aria-hidden="true" />
            <span className={styles.roads} aria-hidden="true">
              <svg
                viewBox="0 0 400 260"
                preserveAspectRatio="none"
                focusable="false"
              >
                <path d="M-10 168h420M232 -10v280M-10 74c90 12 150-18 240-6s130 26 180 18" />
              </svg>
            </span>

            <span className={styles.marker} aria-hidden="true">
              <span className={styles.markerRing} />
              <span className={styles.markerRing} data-outer="true" />
              <span className={styles.markerCore} />
              <span className={styles.markerCross} />
            </span>

            <div className={styles.overlay}>
              <p className={`u-mono ${styles.overlayLabel}`}>
                Náhľad polohy · mapa sa načíta na vyžiadanie
              </p>
              <button
                type="button"
                className={styles.loadButton}
                onClick={() => setLoaded(true)}
              >
                Zobraziť mapu
              </button>
            </div>
          </>
        )}
      </div>

      <figcaption className={styles.caption}>
        <span className="u-mono">
          {contact.street} · {contact.postalCode} {contact.city}
        </span>
        <a
          className={styles.captionLink}
          href={links.map}
          target="_blank"
          rel="noopener noreferrer"
        >
          Otvoriť v mapách
          <span aria-hidden="true">↗</span>
          <span className="u-visually-hidden">(otvorí sa v novom okne)</span>
        </a>
      </figcaption>
    </figure>
  );
}
