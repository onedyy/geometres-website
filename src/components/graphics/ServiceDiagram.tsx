import type { ServiceDiagram as Variant } from "@/data/services";
import styles from "./ServiceDiagram.module.css";

const W = 640;
const H = 480;

/* ---------------------------------------------------------------- cadastre */
function Cadastre() {
  return (
    <>
      {/* neighbouring parcels */}
      <g className={styles.faint}>
        <path d="M60 70h520v340H60z" />
        <path d="M60 190h250M310 70v340M430 190h150M60 300h250" />
      </g>

      {/* the parcel being divided */}
      <path className={styles.subject} d="M310 190h270v110H310z" />
      <path className={styles.boundary} d="M310 190h270v110H310z" />

      {/* new dividing line — the actual result of a geometric plan */}
      <path className={styles.newLine} d="M448 190v110" />

      {/* boundary points */}
      {[
        [310, 190],
        [580, 190],
        [580, 300],
        [310, 300],
        [448, 190],
        [448, 300],
      ].map(([x, y], i) => (
        <g key={i} className={styles.node}>
          <circle cx={x} cy={y} r="4.6" />
          <circle cx={x} cy={y} r="1.6" className={styles.nodeCore} />
        </g>
      ))}

      {/* dimension chain */}
      <g className={styles.dim}>
        <path d="M310 336h138M448 336h132" />
        <path d="M310 328v16M448 328v16M580 328v16" />
        <text x="379" y="356" textAnchor="middle">
          18,40
        </text>
        <text x="514" y="356" textAnchor="middle">
          17,55
        </text>
      </g>

      {/* parcel numbers */}
      <g className={styles.label}>
        <text x="379" y="228" textAnchor="middle">
          2145/6
        </text>
        <text x="514" y="228" textAnchor="middle" className={styles.labelAccent}>
          2145/7
        </text>
        <text x="150" y="140" className={styles.labelFaint}>
          2144
        </text>
        <text x="150" y="260" className={styles.labelFaint}>
          2146
        </text>
        <text x="480" y="130" className={styles.labelFaint}>
          2143/2
        </text>
      </g>

      <g className={styles.tag}>
        <text x="60" y="440">
          GEOMETRICKÝ PLÁN · DELENIE PARCELY
        </text>
      </g>
    </>
  );
}

/* ------------------------------------------------------------- engineering */
function Engineering() {
  const axesX = [150, 300, 450, 560];
  const axesY = [150, 250, 350];
  return (
    <>
      {/* plot outline */}
      <g className={styles.faint}>
        <path d="M70 80h500v320H70z" />
      </g>

      {/* construction axes */}
      <g className={styles.axis}>
        {axesX.map((x) => (
          <path key={`x${x}`} d={`M${x} 60v370`} />
        ))}
        {axesY.map((y) => (
          <path key={`y${y}`} d={`M50 ${y}h540`} />
        ))}
      </g>
      <g className={styles.axisLabel}>
        {axesX.map((x, i) => (
          <g key={`lx${x}`}>
            <circle cx={x} cy="50" r="11" />
            <text x={x} y="54" textAnchor="middle">
              {String.fromCharCode(65 + i)}
            </text>
          </g>
        ))}
        {axesY.map((y, i) => (
          <g key={`ly${y}`}>
            <circle cx="36" cy={y} r="11" />
            <text x="36" y={y + 4} textAnchor="middle">
              {i + 1}
            </text>
          </g>
        ))}
      </g>

      {/* building footprint */}
      <path className={styles.subject} d="M150 150h300v200H150z" />
      <path className={styles.boundary} d="M150 150h300v200H150z" />
      <path className={styles.newLine} d="M300 150v200M450 250h110" />

      {/* spot heights — labels are placed inwards so nothing clips */}
      {(
        [
          [150, 150, "148,32", "start"],
          [450, 150, "148,29", "end"],
          [450, 350, "147,96", "end"],
          [150, 350, "148,04", "start"],
          [560, 250, "147,71", "end"],
        ] as Array<[number, number, string, "start" | "end"]>
      ).map(([x, y, v, anchor], i) => (
        <g key={i} className={styles.spot}>
          <path d={`M${x - 5} ${y + 4}h10l-5-8z`} />
          <text
            x={anchor === "start" ? x + 10 : x - 10}
            y={y - 8}
            textAnchor={anchor}
          >
            {v}
          </text>
        </g>
      ))}

      <g className={styles.tag}>
        <text x="70" y="440">
          VYTÝČENIE OBJEKTU · VÝŠKOVÉ BODY
        </text>
      </g>
    </>
  );
}

/* ---------------------------------------------------------- photogrammetry */
function Photogrammetry() {
  /* Plan view of a survey flight: serpentine legs, overlapping image
     footprints and ground control points. */
  const legs = [96, 168, 240, 312];
  const left = 92;
  const right = 552;

  const serpentine = legs
    .map((y, i) => {
      const start = i % 2 === 0 ? left : right;
      const end = i % 2 === 0 ? right : left;
      const turn =
        i < legs.length - 1
          ? `L${end} ${legs[i + 1]}`
          : "";
      return `${i === 0 ? `M${start} ${y}` : `L${start} ${y}`}L${end} ${y}${turn}`;
    })
    .join("");

  /* overlapping image footprints along the second leg */
  const shots = Array.from({ length: 11 }, (_, i) => left + 42 + i * 38);

  return (
    <>
      {/* area of interest */}
      <g className={styles.faint}>
        <path d="M70 70h500v290H70z" />
      </g>

      {/* image footprints */}
      <g className={styles.footprint}>
        {shots.map((x, i) => (
          <path
            key={i}
            d={`M${x - 46} ${168 - 42}h92v84h-92z`}
            opacity={0.9 - i * 0.045}
          />
        ))}
      </g>

      {/* flight path */}
      <path className={styles.flight} d={serpentine} />

      {/* waypoints */}
      <g className={styles.node}>
        {legs.flatMap((y, i) => {
          const xs = i % 2 === 0 ? [left, right] : [right, left];
          return xs.map((x, j) => (
            <circle key={`${i}-${j}`} cx={x} cy={y} r="3.4" />
          ));
        })}
      </g>

      {/* nadir camera at the current position */}
      <g className={styles.frustum}>
        <path d="M322 168 276 232M322 168 368 232M276 232h92" />
      </g>
      <g className={styles.node}>
        <circle cx="322" cy="168" r="7" />
        <circle cx="322" cy="168" r="2.4" className={styles.nodeCore} />
      </g>

      {/* ground control points */}
      <g className={styles.gcp}>
        {[
          [150, 116],
          [470, 130],
          [200, 316],
          [500, 300],
        ].map(([x, y], i) => (
          <g key={i}>
            <path d={`M${x - 9} ${y}h18M${x} ${y - 9}v18`} />
            <circle cx={x} cy={y} r="12" />
          </g>
        ))}
      </g>

      <g className={styles.dim}>
        <path d="M92 386h460M92 378v16M552 378v16" />
        <text x="322" y="406" textAnchor="middle">
          OBLASŤ ZÁUJMU
        </text>
      </g>

      <g className={styles.tag}>
        <text x="70" y="446">
          LETOVÝ PLÁN · PREKRYT SNÍMOK · VLÍCOVACIE BODY
        </text>
      </g>
    </>
  );
}

const VARIANTS: Record<Variant, () => React.JSX.Element> = {
  cadastre: Cadastre,
  engineering: Engineering,
  photogrammetry: Photogrammetry,
};

/**
 * Schematic technical drawing that accompanies each service category.
 * Decorative illustration of the discipline — not project documentation.
 */
export function ServiceDiagram({
  variant,
  className,
}: {
  variant: Variant;
  className?: string;
}) {
  const Shape = VARIANTS[variant];
  return (
    <svg
      className={[styles.svg, className].filter(Boolean).join(" ")}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <Shape />
    </svg>
  );
}
