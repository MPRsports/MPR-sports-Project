import { useMemo } from "react";

export type Team = "home" | "away";

export type PlayerPoint = {
  id: string;
  name?: string;
  team?: Team;
  /** Normalized coordinates from tracking engine (0..1). */
  x: number;
  y: number;
};

export type FieldDimensions = {
  lengthM: number; // default 105
  widthM: number; // default 68
};

export type PitchMapProps = {
  field?: Partial<FieldDimensions>;
  players: PlayerPoint[];

  /**
   * Many tracking systems have Y=0 at the bottom rather than the top.
   * If your points appear mirrored vertically, set invertY to true.
   */
  invertY?: boolean;

  /**
   * If left/right are swapped, set flipX to true.
   */
  flipX?: boolean;

  /** Marker radius in meters (SVG viewBox uses meters). */
  markerRadiusM?: number;

  /** Show player labels above markers. */
  showLabels?: boolean;
};

const DEFAULT_FIELD: FieldDimensions = { lengthM: 105, widthM: 68 };

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

const penaltyMarkDist = 11; // meters from the goal line
const penaltyMarkR = 0.2; // dot radius (meters)

/**
 * Convert normalized coordinates (0..1) into meters within the pitch.
 * This is the key math that later works the same for realtime data.
 */
function normalizedToMeters(
  x: number,
  y: number,
  field: FieldDimensions,
  opts: { invertY?: boolean; flipX?: boolean }
) {
  const xN = clamp01(x);
  const yN = clamp01(y);

  let xM = xN * field.lengthM;
  let yM = yN * field.widthM;

  if (opts.invertY) yM = (1 - yN) * field.widthM;
  if (opts.flipX) xM = (1 - xN) * field.lengthM;

  return { xM, yM };
}

export function PitchMap({
  field,
  players,
  invertY = false,
  flipX = false,
  markerRadiusM = 0.9,
  showLabels = true,
}: PitchMapProps) {
  const dims: FieldDimensions = useMemo(() => ({ ...DEFAULT_FIELD, ...field }), [field]);
  const L = dims.lengthM;
  const W = dims.widthM;

  // Standard marking sizes (meters). These are common IFAB dimensions.
  const centerCircleR = 9.15;

  const penaltyAreaDepth = 16.5;
  const penaltyAreaWidth = 40.32;

  const goalAreaDepth = 5.5;
  const goalAreaWidth = 18.32;

  const goalWidth = 7.32;
  const goalDepthVisual = 2.0; // a visual extension outside the field

  const penaltyY = (W - penaltyAreaWidth) / 2;
  const goalAreaY = (W - goalAreaWidth) / 2;
  const goalY = (W - goalWidth) / 2;

  const mappedPlayers = useMemo(() => {
    return players.map((p) => {
      const { xM, yM } = normalizedToMeters(p.x, p.y, dims, { invertY, flipX });
      return { ...p, xM, yM };
    });
  }, [players, dims, invertY, flipX]);

  return (
    <div className="pitchWrap" style={{ aspectRatio: `${L} / ${W}` }}>
      <svg
        className="pitchSvg"
        viewBox={`0 0 ${L} ${W}`}
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Football pitch"
      >
        {/* Pitch background */}
        <rect
          x={0}
          y={0}
          width={L}
          height={W}
          rx={1.2}
          ry={1.2}
          className="pitchBg"
        />

        {/* Outer lines */}
        <rect
          x={0.5}
          y={0.5}
          width={L - 1}
          height={W - 1}
          fill="none"
          className="pitchLine"
          strokeWidth={0.25}
        />

        {/* Halfway line */}
        <line
          x1={L / 2}
          y1={0.5}
          x2={L / 2}
          y2={W - 0.5}
          className="pitchLine"
          strokeWidth={0.25}
        />

        {/* Center circle */}
        <circle
          cx={L / 2}
          cy={W / 2}
          r={centerCircleR}
          fill="none"
          className="pitchLine"
          strokeWidth={0.25}
        />

        {/* Center mark */}
        <circle cx={L / 2} cy={W / 2} r={0.2} className="pitchMark" />

        {/* Penalty marks (11m from each goal line, centered) */}
        <circle
          cx={penaltyMarkDist}
          cy={W / 2}
          r={penaltyMarkR}
          className="pitchMark"
        />
        <circle
          cx={L - penaltyMarkDist}
          cy={W / 2}
          r={penaltyMarkR}
          className="pitchMark"
        />

        {/* Penalty areas */}
        <rect
          x={0.5}
          y={penaltyY}
          width={penaltyAreaDepth}
          height={penaltyAreaWidth}
          fill="none"
          className="pitchLine"
          strokeWidth={0.25}
        />
        <rect
          x={L - 0.5 - penaltyAreaDepth}
          y={penaltyY}
          width={penaltyAreaDepth}
          height={penaltyAreaWidth}
          fill="none"
          className="pitchLine"
          strokeWidth={0.25}
        />

        {/* Goal areas */}
        <rect
          x={0.5}
          y={goalAreaY}
          width={goalAreaDepth}
          height={goalAreaWidth}
          fill="none"
          className="pitchLine"
          strokeWidth={0.25}
        />
        <rect
          x={L - 0.5 - goalAreaDepth}
          y={goalAreaY}
          width={goalAreaDepth}
          height={goalAreaWidth}
          fill="none"
          className="pitchLine"
          strokeWidth={0.25}
        />

        {/* Goals (simple rectangles drawn just outside the pitch) */}
        <rect
          x={-goalDepthVisual}
          y={goalY}
          width={goalDepthVisual}
          height={goalWidth}
          fill="none"
          className="pitchLine"
          strokeWidth={0.25}
        />
        <rect
          x={L}
          y={goalY}
          width={goalDepthVisual}
          height={goalWidth}
          fill="none"
          className="pitchLine"
          strokeWidth={0.25}
        />

        {/* Players */}
        {mappedPlayers.map((p) => (
          <g key={p.id}>
            <circle
              cx={p.xM}
              cy={p.yM}
              r={markerRadiusM}
              className={p.team === "away" ? "playerDot away" : "playerDot home"}
            />
            {showLabels && p.name ? (
              <text
                x={p.xM}
                y={p.yM - markerRadiusM - 0.6}
                fontSize={2.2}
                textAnchor="middle"
                className="playerLabel"
              >
                {p.name}
              </text>
            ) : null}
          </g>
        ))}
      </svg>
    </div>
  );
}