import Image from "next/image";
import type { Equipment } from "@/data/equipment";
import styles from "./EquipmentFeature.module.css";

/**
 * One piece of equipment presented on a technical stage: large photograph,
 * measured axis, leader line to the verified specification, and the
 * services the device supports.
 */
export function EquipmentFeature({ item }: { item: Equipment }) {
  const isProduct = item.image.kind === "product";

  return (
    <article className={styles.feature} key={item.id}>
      <figure className={styles.plate} data-kind={item.image.kind}>
        <span className={styles.floor} aria-hidden="true" />
        <span className={styles.rim} aria-hidden="true" />
        <span className={styles.mesh} aria-hidden="true" />

        <div className={styles.media}>
          <Image
            src={item.image.src}
            alt={item.image.alt}
            width={item.image.width}
            height={item.image.height}
            sizes="(min-width: 1280px) 42vw, (min-width: 1024px) 60vw, 92vw"
            className={isProduct ? styles.product : styles.photo}
            loading="lazy"
          />
        </div>

        {/* measured axis with a scale, only meaningful over cut-outs */}
        {isProduct ? (
          <span className={styles.axis} aria-hidden="true">
            <svg
              viewBox="0 0 40 300"
              preserveAspectRatio="none"
              focusable="false"
            >
              <path
                d="M20 0v300"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.35"
                vectorEffect="non-scaling-stroke"
              />
              {Array.from({ length: 13 }, (_, i) => (
                <path
                  key={i}
                  d={`M${i % 4 === 0 ? 8 : 14} ${i * 25} H26`}
                  stroke="currentColor"
                  strokeWidth="1"
                  opacity={i % 4 === 0 ? 0.6 : 0.28}
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>
          </span>
        ) : null}

        {/* annotation rail: category top-left, verified spec bottom-right */}
        <span className={`u-mono ${styles.plateTag}`} aria-hidden="true">
          <span className={styles.plateTagTick} />
          {item.category}
        </span>

        <span className={styles.spec}>
          <span className={`u-mono ${styles.specLabel}`}>
            {item.spec.label}
          </span>
          <span className={styles.specValue}>{item.spec.value}</span>
        </span>

        {item.photoNote ? (
          <figcaption className={`u-mono ${styles.note}`}>
            {item.photoNote}
          </figcaption>
        ) : null}

        <span className={styles.corner} data-c="tl" aria-hidden="true" />
        <span className={styles.corner} data-c="br" aria-hidden="true" />
      </figure>

      <div className={styles.info}>
        <h3 className={styles.name}>{item.name}</h3>
        <p className={styles.purpose}>{item.purpose}</p>

        <div className={styles.supports}>
          <h4 className={`u-mono ${styles.supportsTitle}`}>Používame pri</h4>
          <ul>
            {item.supports.map((service) => (
              <li key={service}>
                <span className={styles.supportTick} aria-hidden="true" />
                {service}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
