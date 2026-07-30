import { contourField } from "@/lib/geometry";
import styles from "./ContourField.module.css";

const W = 1200;
const H = 800;

type ContourFieldProps = {
  lines?: number;
  seed?: number;
  amplitude?: number;
  className?: string;
  /** Draws the lines in sequence once, then settles. */
  animate?: boolean;
};

/**
 * Decorative topographic contour field used as a section backdrop.
 * Purely presentational — hidden from assistive technology.
 */
export function ContourField({
  lines = 22,
  seed = 11,
  amplitude = 26,
  className,
  animate = false,
}: ContourFieldProps) {
  const paths = contourField({ width: W, height: H, lines, seed, amplitude });

  return (
    <svg
      className={[styles.svg, animate ? styles.animate : null, className]
        .filter(Boolean)
        .join(" ")}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="none" strokeLinecap="round">
        {paths.map((path, i) => (
          <path
            key={i}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.index ? 1.15 : 0.7}
            opacity={path.index ? 0.5 : 0.24}
            style={{ ["--i" as string]: i }}
          />
        ))}
      </g>
    </svg>
  );
}
