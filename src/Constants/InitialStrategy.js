export const initialPokerStrategy = {
    "RaiseFirstIn(RFI)": {
      UTG: {
        "Raise for Value": [
          "AA", "KK", "QQ", "JJ", "TT", "99", "88", "77",
          "AKs", "AQs", "AJs", "ATs", "A5s", "A4s",
          "KQs", "KJs", "QJs", "JTs",
        ],
        "Raise as a Bluff": [],
        Limp: [],
      },
    },
  };