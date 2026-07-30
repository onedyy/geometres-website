import type { OutputVisual as Variant } from "@/data/outputs";
import { contourField, seeded } from "@/lib/geometry";
import styles from "./OutputVisual.module.css";

const W = 800;
const H = 500;

/* ------------------------------------------------ polohopis a výškopis --- */
function SurveyPlan() {
  const contours = contourField({
    width: W,
    height: H,
    lines: 9,
    seed: 91,
    amplitude: 11,
  });
  /* label anchor chosen per point so nothing collides with the geometry */
  const spots: Array<[number, number, string, "start" | "end"]> = [
    [140, 118, "148,21", "start"],
    [292, 112, "148,64", "start"],
    [560, 176, "147,92", "start"],
    [706, 108, "147,55", "end"],
    [172, 296, "148,38", "start"],
    [478, 240, "148,02", "start"],
    [624, 268, "147,74", "end"],
    [120, 424, "148,55", "start"],
    [604, 432, "147,61", "end"],
  ];
  const parcel = "M96 78h250l84 62h236v170H96z";

  return (
    <>
      <defs>
        <pattern
          id="ov-hatch"
          width="11"
          height="11"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <path d="M0 0v11" className={styles.hatchLine} />
        </pattern>
      </defs>

      <g className={styles.contour}>
        {contours.map((c, i) => (
          <path key={i} d={c.d} strokeWidth={c.index ? 1.1 : 0.7} />
        ))}
      </g>

      {/* road body with a dashed centre line */}
      <g className={styles.road}>
        <path d="M-10 372c120-26 210 14 330-4s250-52 490-24" />
        <path d="M-10 414c120-26 210 14 330-4s250-52 490-24" />
      </g>
      <path
        className={styles.roadAxis}
        d="M-10 393c120-26 210 14 330-4s250-52 490-24"
      />

      {/* parcel boundary */}
      <path className={styles.parcelFill} d={parcel} />
      <path className={styles.parcel} d={parcel} />

      {/* building footprint, properly hatched */}
      <g className={styles.building}>
        <path d="M232 176h176v104H232z" className={styles.hatchFill} />
        <path d="M232 176h176v104H232z" />
      </g>

      {/* boundary points on the parcel corners */}
      <g className={styles.corner}>
        {[
          [96, 78],
          [346, 78],
          [430, 140],
          [666, 140],
          [666, 310],
          [96, 310],
        ].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="4.4" />
            <circle cx={x} cy={y} r="1.5" className={styles.cornerCore} />
          </g>
        ))}
      </g>

      {/* levelling points */}
      <g className={styles.spot}>
        {spots.map(([x, y, v, anchor], i) => (
          <g key={i}>
            <path d={`M${x - 5} ${y + 4}h10l-5-8z`} />
            <text
              x={anchor === "start" ? x + 9 : x - 9}
              y={y + 4}
              textAnchor={anchor}
            >
              {v}
            </text>
          </g>
        ))}
      </g>

      <g className={styles.tag}>
        <text x="24" y="480">
          POLOHOPIS + VÝŠKOPIS · VÝŠKOVÉ KÓTY
        </text>
      </g>
    </>
  );
}

/* ------------------------------------------------------- ortofotosnímky --- */
type Cell = { x: number; y: number; w: number; h: number };

/** Recursive binary subdivision — gives irregular parcels, not a checkerboard. */
function subdivide(
  cell: Cell,
  depth: number,
  rand: () => number,
  out: Cell[] = [],
): Cell[] {
  const min = 58;
  if (depth === 0 || (cell.w < min * 2 && cell.h < min * 2)) {
    out.push(cell);
    return out;
  }
  const splitVertical = cell.w >= cell.h ? rand() > 0.18 : rand() > 0.82;
  const t = 0.32 + rand() * 0.36;
  if (splitVertical) {
    const cut = Math.max(min, Math.min(cell.w - min, cell.w * t));
    subdivide({ ...cell, w: cut }, depth - 1, rand, out);
    subdivide(
      { ...cell, x: cell.x + cut, w: cell.w - cut },
      depth - 1,
      rand,
      out,
    );
  } else {
    const cut = Math.max(min, Math.min(cell.h - min, cell.h * t));
    subdivide({ ...cell, h: cut }, depth - 1, rand, out);
    subdivide(
      { ...cell, y: cell.y + cut, h: cell.h - cut },
      depth - 1,
      rand,
      out,
    );
  }
  return out;
}

function Orthophoto() {
  const rand = seeded(3307);
  const parcels = subdivide({ x: -20, y: -20, w: W + 40, h: H + 40 }, 5, rand);

  const tone = () => {
    const teal = rand() > 0.55;
    const t = 0.05 + rand() * 0.22;
    return teal
      ? `rgba(0,168,204,${t.toFixed(3)})`
      : `rgba(38,74,158,${t.toFixed(3)})`;
  };
  const fills = parcels.map(tone);

  /* tree clusters rather than evenly scattered dots */
  const clusters = Array.from({ length: 7 }, () => {
    const cx = 40 + rand() * (W - 80);
    const cy = 40 + rand() * (H - 80);
    const n = 7 + Math.floor(rand() * 9);
    return Array.from({ length: n }, () => ({
      x: cx + (rand() - 0.5) * 74,
      y: cy + (rand() - 0.5) * 58,
      r: 3.5 + rand() * 4.5,
    }));
  }).flat();

  /* a small built-up block along the road */
  const houses = Array.from({ length: 9 }, (_, i) => ({
    x: 118 + i * 62 + (rand() - 0.5) * 8,
    y: 268 + (rand() - 0.5) * 14,
    w: 30 + rand() * 14,
    h: 20 + rand() * 12,
  }));

  return (
    <>
      <g>
        {parcels.map((p, i) => (
          <rect
            key={i}
            x={p.x.toFixed(1)}
            y={p.y.toFixed(1)}
            width={p.w.toFixed(1)}
            height={p.h.toFixed(1)}
            fill={fills[i]}
          />
        ))}
      </g>

      {/* parcel edges */}
      <g className={styles.parcelEdges}>
        {parcels.map((p, i) => (
          <rect
            key={i}
            x={p.x.toFixed(1)}
            y={p.y.toFixed(1)}
            width={p.w.toFixed(1)}
            height={p.h.toFixed(1)}
          />
        ))}
      </g>

      {/* vegetation */}
      <g className={styles.trees}>
        {clusters.map((t, i) => (
          <circle
            key={i}
            cx={t.x.toFixed(1)}
            cy={t.y.toFixed(1)}
            r={t.r.toFixed(1)}
          />
        ))}
      </g>

      {/* road network */}
      <g className={styles.orthoRoadCasing}>
        <path d="M-10 322c150-30 250 16 400-8s280-42 420-14" />
        <path d="M528 -10 452 510" />
      </g>
      <g className={styles.orthoRoad}>
        <path d="M-10 322c150-30 250 16 400-8s280-42 420-14" />
        <path d="M528 -10 452 510" />
      </g>

      {/* built-up block */}
      <g className={styles.houses}>
        {houses.map((h, i) => (
          <rect
            key={i}
            x={h.x.toFixed(1)}
            y={h.y.toFixed(1)}
            width={h.w.toFixed(1)}
            height={h.h.toFixed(1)}
          />
        ))}
      </g>

      {/* ground control crosses */}
      <g className={styles.gcp}>
        {[
          [156, 128],
          [560, 196],
          [286, 404],
          [676, 392],
        ].map(([x, y], i) => (
          <g key={i}>
            <path d={`M${x - 11} ${y}h22M${x} ${y - 11}v22`} />
            <circle cx={x} cy={y} r="14" />
          </g>
        ))}
      </g>

      <g className={styles.tag}>
        <text x="24" y="480">
          ORTOFOTOMOZAIKA · GEOREFERENCOVANÉ
        </text>
      </g>
    </>
  );
}

/* ---------------------------------------------------------- mračná bodov --- */
type Pt = { x: number; y: number; r: number; o: number };

function PointCloud() {
  const rand = seeded(7717);

  /** points scattered along a line — a laser return on a surface edge */
  const onLine = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    count: number,
    jitter = 3,
  ): Pt[] =>
    Array.from({ length: count }, () => {
      const t = rand();
      return {
        x: x1 + (x2 - x1) * t + (rand() - 0.5) * jitter,
        y: y1 + (y2 - y1) * t + (rand() - 0.5) * jitter,
        r: 0.7 + rand() * 1.4,
        o: 0.3 + rand() * 0.6,
      };
    });

  /** sparser returns across a whole surface */
  const onFace = (
    x: number,
    y: number,
    w: number,
    h: number,
    count: number,
  ): Pt[] =>
    Array.from({ length: count }, () => ({
      x: x + rand() * w,
      y: y + rand() * h,
      r: 0.6 + rand() * 1.1,
      o: 0.12 + rand() * 0.34,
    }));

  /* building elevation: walls, pitched roof, floor line, openings */
  const shell: Pt[] = [
    ...onLine(250, 344, 250, 168, 90),
    ...onLine(250, 168, 402, 104, 90),
    ...onLine(402, 104, 554, 168, 90),
    ...onLine(554, 168, 554, 344, 90),
    ...onLine(250, 344, 554, 344, 130),
    ...onLine(250, 240, 554, 240, 110),
  ];
  const openings: Pt[] = [
    ...onLine(292, 276, 292, 330, 22, 2),
    ...onLine(292, 276, 346, 276, 22, 2),
    ...onLine(346, 276, 346, 330, 22, 2),
    ...onLine(430, 276, 430, 330, 22, 2),
    ...onLine(430, 276, 484, 276, 22, 2),
    ...onLine(484, 276, 484, 330, 22, 2),
    ...onLine(360, 158, 360, 206, 18, 2),
    ...onLine(360, 158, 444, 158, 18, 2),
    ...onLine(444, 158, 444, 206, 18, 2),
  ];
  const faces: Pt[] = [
    ...onFace(252, 170, 300, 68, 120),
    ...onFace(252, 244, 300, 96, 150),
    ...onFace(258, 132, 288, 60, 70),
  ];

  /* ground plane, thinning out with distance from the scanner */
  const ground: Pt[] = Array.from({ length: 460 }, () => {
    const x = 30 + rand() * 740;
    const distance = Math.abs(x - 120) / 700;
    if (rand() < distance * 0.55) return null;
    const t = (x - 30) / 740;
    return {
      x,
      y: 396 + Math.sin(t * Math.PI * 2.2) * 12 + (rand() - 0.5) * 34,
      r: 0.6 + rand() * 1,
      o: 0.1 + rand() * 0.32,
    };
  }).filter((p): p is Pt => p !== null);

  const dot = (p: Pt, i: number) => (
    <circle
      key={i}
      cx={p.x.toFixed(1)}
      cy={p.y.toFixed(1)}
      r={p.r.toFixed(2)}
      opacity={p.o.toFixed(2)}
    />
  );

  return (
    <>
      <g className={styles.cloudGround}>{ground.map(dot)}</g>
      <g className={styles.cloudFace}>{faces.map(dot)}</g>
      <g className={styles.cloud}>
        {shell.map(dot)}
        {openings.map(dot)}
      </g>

      {/* geometry modelled from the cloud */}
      <g className={styles.extract}>
        <path d="M250 344V168l152-64 152 64v176" />
      </g>

      {/* scanner station with range rings */}
      <g className={styles.station}>
        <circle cx="120" cy="352" r="52" />
        <circle cx="120" cy="352" r="104" />
        <circle cx="120" cy="352" r="164" />
        <path d="M120 328v48M96 352h48" className={styles.stationCross} />
        <circle cx="120" cy="352" r="3.6" className={styles.stationCore} />
      </g>

      <g className={styles.tag}>
        <text x="24" y="480">
          MRAČNO BODOV · REGISTROVANÉ SKENY
        </text>
      </g>
    </>
  );
}

/* --------------------------------------------------- matterport prehliadky --- */
function Tour() {
  const cameras: Array<[number, number, number]> = [
    [238, 190, -32],
    [430, 158, 34],
    [568, 302, 168],
    [300, 330, 104],
  ];
  /* outer shell, then partitions with door gaps left open */
  const shell = "M150 90h520v300H150z";

  return (
    <>
      <defs>
        <clipPath id="ov-room">
          <path d={shell} />
        </clipPath>
      </defs>

      <path className={styles.planFill} d={shell} />

      {/* view cones, clipped to the interior */}
      <g clipPath="url(#ov-room)">
        {cameras.map(([x, y, rot], i) => (
          <g key={i} transform={`rotate(${rot} ${x} ${y})`}>
            <path
              className={styles.cone}
              d={`M${x} ${y} L${x - 44} ${y - 62} A76 76 0 0 1 ${x + 44} ${
                y - 62
              } Z`}
            />
          </g>
        ))}
      </g>

      {/* walls: gaps in the paths are the doorways */}
      <g className={styles.plan}>
        <path d={shell} />
        <path d="M366 90v72M366 202v48" />
        <path d="M150 250h96M306 250h60" />
        <path d="M366 250h124M540 250h130" />
        <path d="M490 250v42M490 332v58" />
      </g>

      {/* camera positions */}
      {cameras.map(([x, y], i) => (
        <g key={i} className={styles.camera}>
          <circle cx={x} cy={y} r="7.5" className={styles.cameraRing} />
          <circle cx={x} cy={y} r="2.6" className={styles.cameraCore} />
        </g>
      ))}

      {/* dimension chain */}
      <g className={styles.dim}>
        <path d="M150 424h520M150 416v16M670 416v16M366 416v16" />
        <text x="258" y="444" textAnchor="middle">
          8,40
        </text>
        <text x="518" y="444" textAnchor="middle">
          9,15
        </text>
      </g>

      <g className={styles.tag}>
        <text x="24" y="480">
          VIRTUÁLNA PREHLIADKA · POZÍCIE SKENOV
        </text>
      </g>
    </>
  );
}

const VARIANTS: Record<Variant, () => React.JSX.Element> = {
  survey: SurveyPlan,
  orthophoto: Orthophoto,
  pointcloud: PointCloud,
  tour: Tour,
};

/**
 * Generated technical illustration of an output *type*. These are not
 * photographs or exports of real client projects — the page labels them as
 * such next to every instance.
 */
export function OutputVisual({
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
      /* On narrow screens the canvas is taller than the drawing, so the view
         crops in from the left instead of shrinking the annotations. */
      preserveAspectRatio="xMinYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <Shape />
    </svg>
  );
}
