export const initialPokerStrategy = {
  "RaiseFirstIn(RFI)": {
    UTG: {
      Raise: [
        "AA", "KK", "QQ", "JJ", "TT", "99", "88", "77", "66", 
        "AKs", "AQs", "AJs", "ATs", "A9s", "A5s", "AKo", "AQo", "KQs",
        "KJs", "KTs",
        "QJs", "QTs",
        "JTs",
        "T9s",
        "98s",
      ],
      Limp: [],
    },
    "UTG + 1": {
      Raise: [
        "AA", "KK", "QQ", "JJ", "TT", "99", "88", "77", "66",
        "AKs", "AQs", "AJs", "ATs", "A9s", "A8s", "A7s", "A6s", "A5s",
        "AKo", "AQo", "AJo",
        "KQs", "KJs", "KTs", "K9s", "KQo",
        "QJs", "QTs", "Q9s",
        "JTs", "J9s",
        "T9s",
        "98s",
        "78s",
      ],
    },
  },
  "Facing RFI EP/MP": {
    "UTG + 1 vs UTG": {
      "3-bet for value": ["AA", "AKs", "AKo", "KK", "QQ"],
      "3-bet as a bluff": ["AQo", "ATs", "KJs"],
      Call: ["AQs", "AJs", "KQs", "QJs", "JJ", "JTs", "TT", "99", "88"],
    },
  },
};
