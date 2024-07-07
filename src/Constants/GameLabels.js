export const SITUATION_LABELS = {
  RaiseFirstIn: "Raise First In",
  "Facing RFI EP/MP": "Facing Raise First In (Early/Middle Position)",
};

export const POSITION_LABELS = {
  UTG: "Under the Gun",
  "UTG+1": "Under the Gun + 1",
  "UTG+2": "Under the Gun + 2",
  Lojack: "Lojack",
  Hijack: "Hijack",
  Cutoff: "Cutoff",
  Button: "Button",
  "UTG+1 vs UTG": "Under the Gun + 1 vs Under the Gun",
  "UTG+2 vs UTG/UTG+1": "UTG+2 vs UTG/UTG+1",
  "LJ vs UTG/UTG+1": "Lojack vs UTG/UTG+1",
};

export const getLabel = (dict, key) => dict[key] || key;
