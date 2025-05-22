export const SITUATION_LABELS = {
  RFI: "You're Raising First",
  "RFI EP/MP": "Facing raise at Early/Middle Position",
  "RFI CO": "Facing raise at Cutoff",
  "RFI BTN": "Facing raise at Button",
  "RFI SB": "Facing raise at Small Blind",
  "RFI BB": "Facing raise at Big Blind",
  "UTG vs 3Bet": "Facing 3-Bet at UTG",
  "UTG+1 vs 3Bet": "Facing 3-Bet at UTG+1",
  "UTG+2 vs 3Bet": "Facing 3-Bet at UTG+2",
  "LJ vs 3Bet": "Facing 3-Bet at Lojack",
  "HJ/CO vs 3Bet": "Facing 3-Bet at Hijact/Cutoff",
  "BTN/SB vs 3Bet": "Facing 3-Bet at Button/Small Blind",
};

export const POSITION_LABELS = {
  UTG: { label: "No Raise - UTG - N/A", hero: "UTG", villain: "N/A" },
  "UTG+1": { label: "No Raise - From UTG+1 - N/A", hero: "UTG+1", villain: "N/A" },
  "UTG+2": { label: "No Raise - From UTG+2 - N/A", hero: "UTG+2", villain: "N/A" },
  LJ: { label: "No Raise - From Lojack - N/A", hero: "LJ", villain: "N/A" },
  HJ: { label: "No Raise - From Hijack - N/A", hero: "HJ", villain: "N/A" },
  CO: { label: "No Raise - From Cutoff - N/A", hero: "CO", villain: "N/A" },
  BTN: { label: "No Raise - From Button - N/A", hero: "BTN", villain: "N/A" },
  SB: { label: "No Raise - From SB - N/A", hero: "SB", villain: "N/A" },

  "UTG+1 vs UTG": { label: "Facing raise - UTG+1 - UTG", hero: "UTG+1", villain: "UTG" },
  "UTG+2 vs UTG/UTG+1": { label: "Facing raise - UTG+2 - UTG/UTG+1", hero: "UTG+2", villain: "UTG/UTG+1" },
  "LJ vs UTG/UTG+1": { label: "Facing raise - Lojack - UTG/UTG+1", hero: "LJ", villain: "UTG/UTG+1" },
  "LJ vs UTG+2": { label: "Facing raise - Lojack - UTG+2", hero: "LJ", villain: "UTG+2" },
  "HJ vs UTG": { label: "Facing raise - Hijack - UTG", hero: "HJ", villain: "UTG" },
  "HJ vs UTG+1": { label: "Facing raise - Hijack - UTG+1", hero: "HJ", villain: "UTG+1" },
  "HJ vs UTG+2": { label: "Facing raise - Hijack - UTG+2", hero: "HJ", villain: "UTG+2" },
  "HJ vs LJ": { label: "Facing raise - Hijack - Lojack", hero: "HJ", villain: "LJ" },

  "CO vs UTG/UTG+1": { label: "Facing raise - Cutoff - From UTG/UTG+1", hero: "CO", villain: "UTG/UTG+1" },
  "CO vs UTG+2": { label: "Facing raise - Cutoff - UTG+2", hero: "CO", villain: "UTG+2" },
  "CO vs LJ": { label: "Facing raise - Cutoff - Lojack", hero: "CO", villain: "LJ" },
  "CO vs HJ": { label: "Facing raise - Cutoff - Hijack", hero: "CO", villain: "HJ" },

  "BTN vs UTG": { label: "Facing raise - Button - UTG", hero: "BTN", villain: "UTG" },
  "BTN vs UTG+1": { label: "Facing raise - Button - UTG+1", hero: "BTN", villain: "UTG+1" },
  "BTN vs UTG+2": { label: "Facing raise - Button - UTG+2", hero: "BTN", villain: "UTG+2" },
  "BTN vs LJ": { label: "Facing raise - Button - Lojack", hero: "BTN", villain: "LJ" },
  "BTN vs HJ": { label: "Facing raise - Button - Hijack", hero: "BTN", villain: "HJ" },
  "BTN vs CO": { label: "Facing raise - Button - Cutoff", hero: "BTN", villain: "CO" },

  "SB vs UTG/UTG+1": { label: "Facing raise - Small Blind - UTG/UTG+1", hero: "SB", villain: "UTG/UTG+1" },
  "SB vs UTG+2": { label: "Facing raise - Small Blind - UTG+2", hero: "SB", villain: "UTG+2" },
  "SB vs LJ": { label: "Facing raise - Small Blind - Lojack", hero: "SB", villain: "LJ" },
  "SB vs HJ": { label: "Facing raise - Small Blind - Hijack", hero: "SB", villain: "HJ" },
  "SB vs CO": { label: "Facing raise - Small Blind - Cutoff", hero: "SB", villain: "CO" },
  "SB vs BTN": { label: "Facing raise - Small Blind - Button", hero: "SB", villain: "BTN" },

  "BB vs UTG/UTG+1": { label: "Facing raise - Big Blind - UTG/UTG+1", hero: "BB", villain: "UTG/UTG+1" },
  "BB vs UTG+2": { label: "Facing raise - Big Blind - UTG+2", hero: "BB", villain: "UTG+2" },
  "BB vs LJ": { label: "Facing raise - Big Blind - Lojack", hero: "BB", villain: "LJ" },
  "BB vs HJ": { label: "Facing raise - Big Blind - Hijack", hero: "BB", villain: "HJ" },
  "BB vs CO": { label: "Facing raise - Big Blind - Cutoff", hero: "BB", villain: "CO" },
  "BB vs BTN": { label: "Facing raise - Big Blind - Button", hero: "BB", villain: "BTN" },
  "BB vs SB": { label: "Facing raise - Big Blind - Small Blind", hero: "BB", villain: "SB" },

  "UTG vs UTG+1": { label: "Facing 3-Bet - UTG - UTG+1", hero: "UTG", villain: "UTG+1" },
  "UTG vs UTG+2": { label: "Facing 3-Bet - UTG - UTG+2", hero: "UTG", villain: "UTG+2" },
  "UTG vs LJ": { label: "Facing 3-Bet - UTG - Lojack", hero: "UTG", villain: "LJ" },
  "UTG vs HJ": { label: "Facing 3-Bet - UTG - Hijack", hero: "UTG", villain: "HJ" },
  "UTG vs CO/BTN": { label: "Facing 3-Bet - UTG - Cutoff/Button", hero: "UTG", villain: "CO/BTN" },
  "UTG vs SB/BB": { label: "Facing 3-Bet - UTG - Blinds", hero: "UTG", villain: "SB/BB" },

  "UTG+1 vs UTG+2": { label: "Facing 3-Bet - UTG+1 - UTG+2", hero: "UTG+1", villain: "UTG+2" },
  "UTG+1 vs LJ": { label: "Facing 3-Bet - UTG+1 - Lojack", hero: "UTG+1", villain: "LJ" },
  "UTG+1 vs HJ/CO": { label: "Facing 3-Bet - UTG+1 - Hijack/Cutoff", hero: "UTG+1", villain: "HJ/CO" },
  "UTG+1 vs BTN": { label: "Facing 3-Bet - UTG+1 - Button", hero: "UTG+1", villain: "BTN" },
  "UTG+1 vs SB/BB": { label: "Facing 3-Bet - UTG+1 - Blinds", hero: "UTG+1", villain: "SB/BB" },

  "UTG+2 vs LJ": { label: "Facing 3-Bet - UTG+2 - Lojack", hero: "UTG+2", villain: "LJ" },
  "UTG+2 vs HJ": { label: "Facing 3-Bet - UTG+2 - Hijack", hero: "UTG+2", villain: "HJ" },
  "UTG+2 vs CO/BTN": { label: "Facing 3-Bet - UTG+2 - Cutoff/Button", hero: "UTG+2", villain: "CO/BTN" },
  "UTG+2 vs SB/BB": { label: "Facing 3-Bet - UTG+2 - Blinds", hero: "UTG+2", villain: "SB/BB" },

  "LJ vs HJ": { label: "Facing 3-Bet - Lojack - Hijack", hero: "LJ", villain: "HJ" },
  "LJ vs CO": { label: "Facing 3-Bet - Lojack - Cutoff", hero: "LJ", villain: "CO" },
  "LJ vs BTN": { label: "Facing 3-Bet - Lojack - Button", hero: "LJ", villain: "BTN" },
  "LJ vs SB": { label: "Facing 3-Bet - Lojack - Small Blind", hero: "LJ", villain: "SB" },
  "LJ vs BB": { label: "Facing 3-Bet - Lojack - Big Blind", hero: "LJ", villain: "BB" },

  "HJ vs CO": { label: "Facing 3-Bet - Hijack - Cutoff", hero: "HJ", villain: "CO" },
  "HJ vs BTN": { label: "Facing 3-Bet - Hijack - Button", hero: "HJ", villain: "BTN" },
  "HJ vs SB": { label: "Facing 3-Bet - Hijack - Small Blind", hero: "HJ", villain: "SB" },
  "HJ vs BB": { label: "Facing 3-Bet - Hijack - Big Blind", hero: "HJ", villain: "BB" },
  "HJ vs BTN/SB": { label: "Facing 3-Bet - Hijack - Button/Small Blind", hero: "HJ", villain: "BTN/SB" },
  "CO vs BB": { label: "Facing 3-Bet - Cutoff - Big Blind", hero: "CO", villain: "BB" },

  "BTN vs SB/BB": { label: "Facing 3-Bet - Button - Blinds", hero: "BTN", villain: "SB/BB" },
  "SB RFI vs BB": { label: "Facing 3-Bet - Small Blind(Raised) - Big Blind", hero: "SB RFI", villain: "BB" },
  "SB Limp vs BB": { label: "Facing 3-Bet - Small Blind(Limped) - Big BLind", hero: "SB Limp", villain: "BB" },
};

export const getLabel = (dict, key) => {
  const entry = dict[key];
  if (typeof entry === 'object' && entry !== null && 'label' in entry) {
    return entry.label;
  }
  return entry || key;
};
