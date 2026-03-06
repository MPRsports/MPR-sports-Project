// src/App.tsx
import { useEffect, useMemo, useState } from "react";
import "./App.css";
import { PitchMap } from "./components/PitchMap";
import { samplePayload } from "./data/samplePositions";

type Player = (typeof samplePayload.players)[number];

// Simulation helper only: wraps values so dots re-enter from the opposite edge.
// When backend positions are authoritative, you can remove this and trust payload values.
function wrap01(n: number) {
  if (n < 0) return n + 1;
  if (n > 1) return n - 1;
  return n;
}

export default function App() {
  // Backend target state:
  // - Keep this `players` state.
  // - Replace its source from `samplePayload.players` to your API stream payload.
  const [players, setPlayers] = useState<Player[]>(samplePayload.players);

  // deterministic drift per player so it looks like they are moving
  const drift = useMemo(() => {
    const map = new Map<string, { dx: number; dy: number }>();
    for (const p of samplePayload.players) {
      const seed = p.id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);

      // small movement per tick. tweak these numbers if you want faster/slower
      const dx = ((seed % 17) - 8) * 0.0008;
      const dy = ((seed % 13) - 6) * 0.0008;

      map.set(p.id, { dx, dy });
    }
    return map;
  }, []);

  useEffect(() => {
    // BACKEND INTEGRATION CHECKLIST (replace this effect)
    // 1) Open your realtime source here (WebSocket/SSE) or start polling with fetch.
    // 2) Parse incoming payload into `Player[]` with normalized x/y in the 0..1 range.
    // 3) Call `setPlayers(nextPlayers)` for each message/tick from the backend.
    // 4) Keep `samplePayload.field` aligned with backend field dimensions when available.
    // 5) Cleanup on unmount: close socket / clear poll interval / abort in-flight requests.
    //
    // Quick payload contract expected by `PitchMap`:
    // { id: string, name?: string, team?: "home" | "away", x: number, y: number }
    // Coordinates should remain normalized (0..1), not meters.

    // Fake movement loop for local demo only.
    const id = window.setInterval(() => {
      setPlayers((prev) =>
        prev.map((p) => {
          const d = drift.get(p.id) ?? { dx: 0, dy: 0 };
          return {
            ...p,
            x: wrap01(p.x + d.dx),
            y: wrap01(p.y + d.dy),
          };
        }),
      );
    }, 120); // update every 120ms

    return () => window.clearInterval(id);
  }, [drift]);

  return (
    <div className="appPage">
      <h1>Pitch Map (SVG)</h1>

      <div className="card">
        <PitchMap field={samplePayload.field} players={players} invertY={false} flipX={false} showLabels={true} />
        <div className="hint">Players move because React state updates on an interval. Replace the interval with your realtime tracking feed later.</div>
      </div>
    </div>
  );
}
