export const SITUATION_LABELS = {
  "RaiseFirstIn(RFI)": "Raise First In",
  "Facing RFI EP/MP": "Facing Raise First In (Early/Middle Position)",
};

export const POSITION_LABELS = {
  UTG: "Under the Gun",
  "UTG + 1": "Under the Gun + 1",
  "UTG + 1 vs UTG": "Under the Gun + 1 vs Under the Gun",
};

export const getLabel = (dict, key) => dict[key] || key;
