export type SamplePayload = {
  field: { lengthM: number; widthM: number };
  players: Array<{
    id: string;
    name: string;
    x: number; // normalized 0..1
    y: number; // normalized 0..1
    team: "home" | "away";
  }>;
};

export const samplePayload: SamplePayload = {
  field: { lengthM: 105, widthM: 68 },
  players: [
    // HOME (11 players: GK + 4 + 4 + 2)
    { id: "H1", name: "H GK", team: "home", x: 0.07, y: 0.50 },

    { id: "H2", name: "H LB", team: "home", x: 0.20, y: 0.18 },
    { id: "H3", name: "H LCB", team: "home", x: 0.20, y: 0.40 },
    { id: "H4", name: "H RCB", team: "home", x: 0.20, y: 0.60 },
    { id: "H5", name: "H RB", team: "home", x: 0.20, y: 0.82 },

    { id: "H6", name: "H LM", team: "home", x: 0.48, y: 0.20 },
    { id: "H7", name: "H LCM", team: "home", x: 0.45, y: 0.42 },
    { id: "H8", name: "H RCM", team: "home", x: 0.45, y: 0.58 },
    { id: "H9", name: "H RM", team: "home", x: 0.48, y: 0.80 },

    { id: "H10", name: "H ST1", team: "home", x: 0.80, y: 0.42 },
    { id: "H11", name: "H ST2", team: "home", x: 0.80, y: 0.58 },

    // AWAY (11 players: mirrored across the length)
    { id: "A1", name: "A GK", team: "away", x: 0.93, y: 0.50 },

    { id: "A2", name: "A LB", team: "away", x: 0.80, y: 0.18 },
    { id: "A3", name: "A LCB", team: "away", x: 0.80, y: 0.40 },
    { id: "A4", name: "A RCB", team: "away", x: 0.80, y: 0.60 },
    { id: "A5", name: "A RB", team: "away", x: 0.80, y: 0.82 },

    { id: "A6", name: "A LM", team: "away", x: 0.52, y: 0.20 },
    { id: "A7", name: "A LCM", team: "away", x: 0.55, y: 0.42 },
    { id: "A8", name: "A RCM", team: "away", x: 0.55, y: 0.58 },
    { id: "A9", name: "A RM", team: "away", x: 0.52, y: 0.80 },

    { id: "A10", name: "A ST1", team: "away", x: 0.20, y: 0.42 },
    { id: "A11", name: "A ST2", team: "away", x: 0.20, y: 0.58 },
  ],
};