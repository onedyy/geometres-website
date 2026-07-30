import styles from "./TriangulationDiagram.module.css";

const POINTS: Array<{ id: string; x: number; y: number; label?: string }> = [
  { id: "1", x: 62, y: 332, label: "P1" },
  { id: "2", x: 152, y: 116 },
  { id: "3", x: 282, y: 248, label: "P3" },
  { id: "4", x: 402, y: 86 },
  { id: "5", x: 468, y: 296 },
  { id: "6", x: 330, y: 388, label: "P6" },
  { id: "7", x: 198, y: 300 },
];

const EDGES: Array<[string, string]> = [
  ["1", "2"],
  ["2", "3"],
  ["3", "1"],
  ["2", "4"],
  ["4", "3"],
  ["4", "5"],
  ["5", "3"],
  ["5", "6"],
  ["6", "3"],
  ["6", "7"],
  ["7", "1"],
  ["7", "3"],
];

const at = (id: string) => POINTS.find((p) => p.id === id)!;

/**
 * A triangulation network — the classical way a survey guarantees that every
 * measured point is checked by another. Decorative.
 */
export function TriangulationDiagram({ className }: { className?: string }) {
  return (
    <svg
      className={[styles.svg, className].filter(Boolean).join(" ")}
      viewBox="0 0 530 430"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      {/* closed figure that carries the check */}
      <path
        className={styles.face}
        d={`M${at("3").x} ${at("3").y} L${at("4").x} ${at("4").y} L${
          at("5").x
        } ${at("5").y} Z`}
      />

      <g className={styles.edges}>
        {EDGES.map(([a, b]) => (
          <path
            key={`${a}${b}`}
            d={`M${at(a).x} ${at(a).y} L${at(b).x} ${at(b).y}`}
          />
        ))}
      </g>

      <g className={styles.nodes}>
        {POINTS.map((p) => (
          <g key={p.id}>
            <circle cx={p.x} cy={p.y} r="6" />
            <circle cx={p.x} cy={p.y} r="2" className={styles.core} />
            {p.label ? (
              <text x={p.x + 12} y={p.y - 10}>
                {p.label}
              </text>
            ) : null}
          </g>
        ))}
      </g>

      {/* measured baseline */}
      <g className={styles.baseline}>
        <path d="M62 414h268M62 406v16M330 406v16" />
        <text x="196" y="400" textAnchor="middle">
          ZÁKLADNICA
        </text>
      </g>
    </svg>
  );
}
