// src/App.tsx
import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import { PitchMap } from "./components/PitchMap";
import { samplePayload } from "./data/samplePositions";

type Player = (typeof samplePayload.players)[number];

function wrap01(n: number) {
  if (n < 0) return n + 1;
  if (n > 1) return n - 1;
  return n;
}

export default function App() {
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
    const id = window.setInterval(() => {
      setPlayers((prev) =>
        prev.map((p) => {
          const d = drift.get(p.id) ?? { dx: 0, dy: 0 };
          return {
            ...p,
            x: wrap01(p.x + d.dx),
            y: wrap01(p.y + d.dy),
          };
        })
      );
    }, 120); // update every 120ms

    return () => window.clearInterval(id);
  }, [drift]);

  return (
    <div className="appPage">
      <h1>Pitch Map (SVG)</h1>

      <div className="card">
        <PitchMap
          field={samplePayload.field}
          players={players}
          invertY={false}
          flipX={false}
          showLabels={true}
        />
        <div className="hint">
          Players move because React state updates on an interval. Replace the
          interval with your realtime tracking feed later.
        </div>
      </div>
    </div>
  );
}