export const initialPokerStrategy = {
  "RaiseFirstIn": {
    UTG: {
      Raise: [
        "AA", "KK", "QQ", "JJ", "TT", "99", "88", "77", "66", 
        "AKs", "AQs", "AJs", "ATs", "A9s", "A5s", "AKo", "AQo", 
        "KQs", "KJs", "KTs",
        "QJs", "QTs",
        "JTs",
        "T9s",
        "98s",
      ],
    },
    "UTG+1": {
      Raise: [
        "AA", "KK", "QQ", "JJ", "TT", "99", "88", "77", "66",
        "AKs", "AQs", "AJs", "ATs", "A9s", "A8s", "A7s", "A6s", "A5s", "A4s",
        "AKo", "AQo", "AJo",
        "KQs", "KJs", "KTs", "K9s", "KQo",
        "QJs", "QTs", "Q9s",
        "JTs", "J9s",
        "T9s",
        "98s",
        "87s",
      ],
    },
    "UTG+2": {
      Raise: [
        "AA", "KK", "QQ", "JJ", "TT", "99", "88", "77", "66", "55",
        "AKs", "AQs", "AJs", "ATs", "A9s", "A8s", "A7s", "A6s", "A5s", "A4s", "A3s", "A2s",
        "AKo", "AQo", "AJo",
        "KQs", "KJs", "KTs", "K9s", "KQo",
        "QJs", "QTs", "Q9s",
        "JTs", "J9s",
        "T9s",
        "98s",
        "87s",
        "76s"
      ],
    },
    "Lojack": {
      Raise: [
        "AA", "KK", "QQ", "JJ", "TT", "99", "88", "77", "66", "55", "44",
        "AKs", "AQs", "AJs", "ATs", "A9s", "A8s", "A7s", "A6s", "A5s", "A4s", "A3s", "A2s",
        "AKo", "AQo", "AJo", "ATo",
        "KQs", "KJs", "KTs", "K9s", "KQo", "KJo",
        "QJs", "QTs", "Q9s",
        "JTs", "J9s",
        "T9s",
        "98s",
        "87s",
        "76s",
        "65s"
      ],
    },
    "Hijack": {
      Raise: [
        "AA", "KK", "QQ", "JJ", "TT", "99", "88", "77", "66", "55", "44", "33", "22",
        "AKs", "AQs", "AJs", "ATs", "A9s", "A8s", "A7s", "A6s", "A5s", "A4s", "A3s", "A2s",
        "AKo", "AQo", "AJo", "ATo",
        "KQs", "KJs", "KTs", "K9s", "K8s", "KQo", "KJo",
        "QJs", "QTs", "Q9s", "QJo",
        "JTs", "J9s",
        "T9s",
        "98s",
        "87s",
        "76s",
        "65s",
        "54s"
      ],
    },
    "Cutoff": {
      Raise: [
        "AA", "KK", "QQ", "JJ", "TT", "99", "88", "77", "66", "55", "44", "33", "22",
        "AKs", "AQs", "AJs", "ATs", "A9s", "A8s", "A7s", "A6s", "A5s", "A4s", "A3s", "A2s",
        "AKo", "AQo", "AJo", "ATo", "A9o",
        "KQs", "KJs", "KTs", "K9s", "K8s", "K7s", "KQo", "KJo", "KTo",
        "QJs", "QTs", "Q9s", "Q8s", "QJo", "QTo",
        "JTs", "J9s", "J8s", "JTo",
        "T9s", "T8s",
        "98s", "97s",
        "87s", "86s",
        "76s", "76s", "75s",
        "65s", "64s",
        "54s",
        "43s"
      ],
    },
    "Button": {
      Raise: [
        "AA", "KK", "QQ", "JJ", "TT", "99", "88", "77", "66", "55", "44", "33", "22",
        "AKs", "AQs", "AJs", "ATs", "A9s", "A8s", "A7s", "A6s", "A5s", "A4s", "A3s", "A2s",
        "AKo", "AQo", "AJo", "ATo", "A9o", "A8o", "A7o", "A6o", "A5o", "A4o", "A3o", "A2o",
        "KQs", "KJs", "KTs", "K9s", "K8s", "K7s", "K6s", "K5s", "K4s", "K3s", "K2s",
        "KQo", "KJo", "KTo", "K9o", "K8o", "K7o",
        "QJs", "QTs", "Q9s", "Q8s", "Q7s", "Q6s", "Q5s", "Q4s", "Q3s", "Q2s",
        "QJo", "QTo", "Q9o", "Q8o",
        "JTs", "J9s", "J8s", "J7s", "J6s", "JTo", "J9o", "J8o",
        "T9s", "T8s", "T7s", "T6s", "T9o", "T8o",
        "98s", "97s", "96s", "98o", "97o",
        "87s", "86s", "85s", "87o",
        "76s", "76s", "75s", "74s", "76o",
        "65s", "64s",
        "54s", "53s",
        "43s",
        "32s"
      ],
    },
  },
  "Facing RFI EP/MP": {
    "UTG+1 vs UTG": {
      "3-bet for value": ["AA", "AKs", "AKo", "KK", "QQ"],
      "3-bet as a bluff": ["AQo", "ATs", "KJs"],
      Call: ["AQs", "AJs", "KQs", "QJs", "JJ", "JTs", "TT", "99", "88"],
    },
    "UTG+2 vs UTG/UTG+1": {
      "3-bet for value": ["AA", "AKs", "AKo", "KK", "QQ"],
      "3-bet as a bluff": ["AQo", "ATs", "KJs"],
      Call: ["AQs", "AJs", "KQs", "QJs", "JJ", "JTs", "TT", "99", "88"],
    },
    "LJ vs UTG/UTG+1": {
      "3-bet for value": ["AA", "AKs", "AKo", "KK", "QQ"],
      "3-bet as a bluff": ["AQo", "ATs", "KJs", "A5s"],
      Call: ["AQs", "AJs", "KQs", "QJs", "JJ", "JTs", "TT", "T9s", "99", "88", "77"],
    },
  },
};
