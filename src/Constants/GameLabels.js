export const SITUATION_LABELS = {
  RaiseFirstIn: "Raise First In",
  "RFI EP/MP": "Facing raise from Early/Middle Position",
  "RFI CO": "Facing raise from Cutoff",
  "RFI BTN": "Facing raise from Button",
  "RFI SB": "Facing raise from Small Blind",
  "RFI BB": "Facing raise from Big Blind",
  "UTG vs 3Bet": "Facing 3-Bet at Under the Gun",
  "UTG+1 vs 3Bet": "Facing 3-Bet at UTG+1",
  "UTG+2 vs 3Bet": "Facing 3-Bet at UTG+2",
};

export const POSITION_LABELS = {
  UTG: "Under the Gun",
  "UTG+1": "Under the Gun + 1",
  "UTG+2": "Under the Gun + 2",
  Lojack: "Lojack",
  Hijack: "Hijack",
  Cutoff: "Cutoff",
  Button: "Button",
  "Small Blind": "Small Blind",

  "UTG+1 vs UTG": "Under the Gun + 1 vs Under the Gun",
  "UTG+2 vs UTG/UTG+1": "UTG+2 vs UTG/UTG+1",
  "LJ vs UTG/UTG+1": "Lojack vs UTG/UTG+1",
  "LJ vs UTG+2": "Lojack vs UTG+2",
  "HJ vs UTG": "Hijack vs Under the Gun",
  "HJ vs UTG+1": "Hijack vs Under the Gun + 1",
  "HJ vs UTG+2": "Hijack vs Under the Gun + 2",
  "HJ vs LJ": "Hijack vs Lojack",

  "CO vs UTG/UTG+1": "Cutoff vs UTG/UTG+1",
  "CO vs UTG+2": "Cutoff vs Under the Gun + 2",
  "CO vs LJ": "Cutoff vs Lojack",
  "CO vs HJ": "Cutoff vs Hijack",

  "BTN vs UTG": "Button vs Under the Gun",
  "BTN vs UTG+1": "Button vs Under the Gun + 1",
  "BTN vs UTG+2": "Button vs Under the Gun + 2",
  "BTN vs LJ": "Button vs Lojack",
  "BTN vs HJ": "Button vs Hijack",
  "BTN vs CO": "Button vs Cutoff",

  "SB vs UTG/UTG+1": "Small Blind vs UTG/UTG+1",
  "SB vs UTG+2": "Small Blind vs Under the Gun + 2",
  "SB vs LJ": "Small Blind vs Lojack",
  "SB vs HJ": "Small Blind vs Hijack",
  "SB vs CO": "Small Blind vs Cutoff",
  "SB vs BTN": "Small Blind vs Button",

  "BB vs UTG/UTG+1": "Big Blind vs UTG/UTG+1",
  "BB vs UTG+2": "Big Blind vs Under the Gun + 2",
  "BB vs LJ": "Big Blind vs Lojack",
  "BB vs HJ": "Big Blind vs Hijack",
  "BB vs CO": "Big Blind vs Cutoff",
  "BB vs BTN": "Big Blind vs Button",
  "BB vs SB": "Big Blind vs Small Blind",

  "UTG vs UTG+1": "Under the Gun vs Under the Gun + 1",
  "UTG vs UTG+2": "Under the Gun vs Under the Gun + 2",
  "UTG vs LJ": "Under the Gun vs Lojack",
  "UTG vs HJ": "Under the Gun vs Hijack",
  "UTG vs CO/BTN": "Under the Gun vs Cutoff/Button",
  "UTG vs SB/BB": "Under the Gun vs Blinds",

  "UTG+1 vs UTG+2": "UTG+1 vs UTG+2",
  "UTG+1 vs LJ": "UTG+1  vs Lojack",
  "UTG+1 vs HJ/Co": "UTG+1 vs Hijack/Cutoff",
  "UTG+1 vs BTN": "UTG+1 vs Button",
  "UTG+1 vs SB/BB": "UTG+1 vs Blinds",

  "UTG+2 vs LJ": "UTG+2 vs Lojack",
  "UTG+2 vs HJ": "UTG+2 vs Hijack",
  "UTG+2 vs CO/BTN": "UTG+2 vs Cutoff/Button",
  "UTG+2 vs SB/BB": "UTG+2 vs Blinds",
};

export const getLabel = (dict, key) => dict[key] || key;
