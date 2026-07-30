/**
 * Deterministic helpers for the generated technical graphics.
 * Everything is seeded so the server and the client render identical SVG
 * (no hydration mismatch, no `Math.random()` in a component body).
 */

/** mulberry32 — small, fast, stable across engines. */
export function seeded(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const round = (n: number, precision = 2) =>
  Number(n.toFixed(precision));

/**
 * A single topographic contour line built from summed sines, sampled across
 * the given width.
 */
export function contourPath({
  width,
  y,
  amplitude,
  phase,
  samples = 40,
}: {
  width: number;
  y: number;
  amplitude: number;
  phase: number;
  samples?: number;
}) {
  const points: string[] = [];
  for (let i = 0; i <= samples; i += 1) {
    const t = i / samples;
    const x = t * width;
    const offset =
      Math.sin(t * Math.PI * 2.1 + phase) * amplitude +
      Math.sin(t * Math.PI * 4.7 + phase * 1.7) * amplitude * 0.34 +
      Math.sin(t * Math.PI * 1.3 + phase * 0.6) * amplitude * 0.5;
    points.push(`${round(x, 1)},${round(y + offset, 1)}`);
  }
  return `M${points.join(" L")}`;
}

/** Nested contour lines for decorative terrain fields. */
export function contourField({
  width,
  height,
  lines,
  seed = 7,
  amplitude = 26,
}: {
  width: number;
  height: number;
  lines: number;
  seed?: number;
  amplitude?: number;
}) {
  const rand = seeded(seed);
  return Array.from({ length: lines }, (_, i) => {
    const y = ((i + 0.6) / (lines + 0.2)) * height;
    return {
      d: contourPath({
        width,
        y,
        amplitude: amplitude * (0.55 + rand() * 0.75),
        phase: rand() * Math.PI * 2,
      }),
      /** Every fifth line is an index contour — drawn slightly stronger. */
      index: i % 5 === 0,
    };
  });
}
