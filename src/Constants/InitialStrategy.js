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
    "Small Blind": {
      "Raise for Value": [
        "AKs", "AQs", "AJs", "ATs", "AQo", "AJo", "ATo",
        "KQs", "KJs", "KQo", "KJo",
        "QQ", "JJ", "TT", "99", "88"
      ],
      "Raise as bluff": [
        "K3o", "K2o", "Q5o", "Q4o", "Q3o", "Q2o",
        "J4s", "J3s", "J2s", "T5s", "T4s", "95s", "94s", "85s", "84s", "74s", "63s", "53s", "43s",
        "J6o", "T6o", "96o", "86o"
      ],
      "Limp or LimpRaise": [
        "AA", "KK", "77", "66", "55", "44", "33", "22",
        "A9s", "A8s", "A7s", "A6s", "A5s", "A4s", "A3s", "A2s",
        "A9o", "A8o", "A7o", "A6o", "A5o", "A4o", "A3o", "A2o",
        "KTs", "K9s", "K8s", "K7s", "K6s", "K5s", "K4s", "K3s", "K2s",
        "KTo", "K9o", "K8o", "K7o", "K6o", "K5o", "K4o",
        "QTs", "Q9s", "Q8s", "Q7s", "Q6s", "Q5s", "Q4s", "Q3s", "Q2s",
        "QJo", "QTo", "Q9o", "Q8o", "Q7o", "Q6o",
        "JTs", "J9s", "J8s", "J7s", "J6s", "J5s",
        "JTo", "J9o", "J8o", "J7o",
        "T9s", "T8s", "T8s", "T6s", "98s", "97s", "96s", "87s", "86s", "76s", "75s", "65s", "64s", "54s", "32s",
        "T9o", "T8o", "T7o", "98o", "97o", "87o", "76o", "65o"
      ]
    }
  },
  "RFI EP/MP": {
    "UTG+1 vs UTG": {
      "3-bet for value": ["AA", "AKs", "AKo", "KK", "QQ"],
      "3-bet as bluff": ["AQo", "ATs", "KJs"],
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
    "LJ vs UTG+2": {
      "3-bet for value": ["AA", "AKs", "AKo", "KK", "QQ"],
      "3-bet as bluff": ["AQo", "ATs", "KJs", "A5s"],
      Call: ["AQs", "AJs", "KQs", "QJs", "JJ", "JTs", "TT", "T9s", "99", "88", "77"],
    },
    "HJ vs UTG": {
      "3-bet for value": ["AA", "AKs", "AKo", "KK", "QQ"],
      "3-bet as bluff": ["AQo", "ATs", "KJs", "A5s"],
      Call: ["AQs", "AJs", "KQs", "QJs", "JJ", "JTs", "TT", "T9s", "99", "88", "77"],
    },
    "HJ vs UTG+1": {
      "3-bet for value": ["AA", "AKs", "AKo", "KK", "QQ"],
      "3-bet as bluff": ["AQo", "ATs", "KJs", "A5s"],
      Call: ["AQs", "AJs", "KQs", "QJs", "JJ", "JTs", "TT", "T9s", "99", "88", "77", "66"],
    },
    "HJ vs UTG+2": {
      "3-bet for value": ["AA", "AKs", "AKo", "KK", "QQ"],
      "3-bet as bluff": ["AQo", "ATs", "KJs", "A5s", "A4s", "A3s", "87s", "76s"],
      Call: ["AQs", "AJs", "KQs", "QJs", "JJ", "JTs", "TT", "T9s", "99", "98s", "88", "77", "66", "55"],
    },
    "HJ vs LJ": {
      "3-bet for value": ["AA", "AKs", "AQs", "AJs", "AKo", "AQo", "KK", "QQ", "KQs"],
      "3-bet as bluff": ["AQo", "ATs", "KJs", "A5s", "A4s", "A3s", "A2s", "AJo", "ATo", "KQo", "76s", "65s"],
      Call: ["AQs", "AJs", "KQs", "QJs", "JJ", "JTs", "TT", "T9s", "99", "98s", "88", "77", "66", "55", "87s"],
    }
  },
  "RFI CO":{
    "CO vs UTG/UTG+1":{
      "3-bet Value": [
        "AA", "AKs", "AQs", "AKo", "KK", "QQ"
      ],
      "3-bet Bluff":[
        "AQo", "AJo", "A5s", "A4s"
      ],
      "Call":[
        "AJs", "ATs",
        "KQs", "KJs", "KTs",
        "QJs", "QTs",
        "JTs" , "T9s", "98s", 
        "JJ", "TT", "99", "88", "77", "66"
      ]
    },
    "CO vs UTG+2":{
      "3-bet Value": [
        "AA", "AKs", "AQs", "AKo", "KK", "QQ"
      ],
      "3-bet Bluff":[
        "AQo", "AJo", "A5s", "A4s", "A3s", "A2s", "87s", "76s"
      ],
      "Call":[
        "AJs", "ATs",
        "KQs", "KJs", "KTs",
        "QJs", "QTs",
        "JTs" , "T9s", "98s", 
        "JJ", "TT", "99", "88", "77", "66", "55"
      ]
    },
    "CO vs LJ":{
      "3-bet Value": [
        "AA", "AKs", "AQs", "AJs", "AKo", "AQo", "KQs", "KK", "QQ"
      ],
      "3-bet Bluff":[
        "AJo", "KQo", "A5s", "A4s", "A3s", "A2s", "87s", "76s", "65s", "54s"
      ],
      "Call":[
        "ATs",
        "KJs", "KTs",
        "QJs", "QTs",
        "JTs" , "T9s", "98s", 
        "JJ", "TT", "99", "88", "77", "66", "55", "44"
      ]
    },
    "CO vs HJ":{
      "3-bet Value": [
        "AA", "AKs", "AQs", "AJs", "AKo", "AQo", "KQs", "KK", "QQ"
      ],
      "3-bet Bluff":[
        "AJo", "KQo", "A9s", "A8s", "A7s", "A6s", "A5s", "A4s", "A3s", "A2s", "76s", "65s", "54s"
      ],
      "Call":[
        "ATs",
        "KJs", "KTs",
        "QJs", "QTs",
        "JTs" , "T9s", "98s", "87s", 
        "JJ", "TT", "99", "88", "77", "66", "55", "44"
      ]
    }
  },
  "RFI BTN":{
    "BTN vs UTG":{
      "3-bet Value": [
        "AA", "AKs", "AKo", "KK", "QQ"
      ],
      "3-bet Bluff":[
        "AQo", "AJo", "KQo", "A5s", "A4s", "76s"
      ],
      "Call":[
        "AQs", "AJs", "ATs",
        "KQs", "KJs", "KTs",
        "QJs", "QTs",
        "JTs" , "T9s", "98s", "87s", 
        "JJ", "TT", "99", "88", "77", "66", "55", "44", "33", "22"
      ]
    },
    "BTN vs UTG+1":{
      "3-bet Value": [
        "AA", "AKs", "AKo", "KK", "QQ"
      ],
      "3-bet Bluff":[
        "AQo", "AJo", "KQo", "A5s", "A4s", "A3s", "A2s"
      ],
      "Call":[
        "AQs", "AJs", "ATs",
        "KQs", "KJs", "KTs",
        "QJs", "QTs",
        "JTs", "J9s","T9s", "98s", "87s", "76s",
        "JJ", "TT", "99", "88", "77", "66", "55", "44", "33", "22"
      ]
    },
    "BTN vs UTG+2":{
      "3-bet Value": [
        "AA", "AKs", "AQs", "AKo", "AQo", "KK", "QQ"
      ],
      "3-bet Bluff":[
        "A9s", "A5s", "A4s", "A3s", "A2s",
        "ATo", "KJo", 
        "65s", "54s"
      ],
      "Call":[
        "AJs", "ATs", "AJo",
        "KQs", "KJs", "KTs", "KQo",
        "QJs", "QTs",
        "JTs", "J9s","T9s", "98s", "87s", "76s",
        "JJ", "TT", "99", "88", "77", "66", "55", "44", "33", "22"
      ]
    },
    "BTN vs LJ":{
      "3-bet Value": [
        "AA", "AKs", "AQs", "AKo", "AQo", "KK", "QQ"
      ],
      "3-bet Bluff":[
        "A8s", "A7s", "A6s", "A5s", "A4s", "A3s", "A2s",
        "ATo", "KJo", 
        "65s", "54s"
      ],
      "Call":[
        "AJs", "ATs", "A9s", "AJo",
        "KQs", "KJs", "KTs", "KQo",
        "QJs", "QTs",
        "JTs", "J9s","T9s", "98s", "87s", "76s",
        "JJ", "TT", "99", "88", "77", "66", "55", "44", "33", "22"
      ]
    },
    "BTN vs HJ":{
      "3-bet Value": [
        "AA", "AKs", "AQs", "AJs", "AKo", "AQo", "KK", "QQ"
      ],
      "3-bet Bluff":[
        "A8s", "A7s", "A6s", "A5s", "A4s", "A3s", "A2s",
        "ATo", "KJo",
        "86s", "75s", "65s", "54s"
      ],
      "Call":[
        "ATs", "A9s", "AJo",
        "KQs", "KJs", "KTs", "K9s", "KQo",
        "QJs", "QTs", "Q9s",
        "JTs", "J9s", "T9s", "T8s", "98s", "97s", "87s", "76s",
        "JJ", "TT", "99", "88", "77", "66", "55", "44", "33", "22"
      ]
    },
    "BTN vs CO":{
      "3-bet Value": [
        "AA", "AKs", "AQs", "AJs", "AKo", "AQo", "KK", "QQ"
      ],
      "3-bet Bluff":[
        "A8s", "A7s", "A6s", "A3s", "A2s", "A9o",
        "KTo", "K8s",
        "QJo", "Q8s",
        "J8s",
        "86s", "75s", "65s", "54s", "43s"
      ],
      "Call":[
        "ATs", "A9s", "A5s", "A4s", "AJo", "ATo",
        "KQs", "KJs", "KTs", "K9s", "KQo", "KJo",
        "QJs", "QTs", "Q9s",
        "JTs", "J9s", "T9s", "T8s", "98s", "97s", "87s", "76s",
        "JJ", "TT", "99", "88", "77", "66", "55", "44", "33", "22"
      ]
    },
  },
  "RFI SB":{
    "SB vs UTG/UTG+1":{
      "3-Bet Value": [
        "AA", "AKs", "KK", "QQ"
      ],
      "3-Bet Bluff": [
        "A5s", "98s", "87s"
      ],
      "Call": [
        "AQs", "AJs", "ATs", "AKo", "AQo",
        "KQs", "KJs",
        "QJs", "JTs", "T9s",
        "JJ", "TT", "99", "88", "77"
      ]
    },
    "SB vs UTG+2":{
      "3-Bet Value": [
        "AA", "AKs", "KK", "QQ"
      ],
      "3-Bet Bluff": [
        "A5s", "87s", "76s"
      ],
      "Call": [
        "AQs", "AJs", "ATs", "AKo", "AQo",
        "KQs", "KJs", "KTs",
        "QJs", "QTs", "JTs", "T9s", "98s",
        "JJ", "TT", "99", "88", "77"
      ]
    },
    "SB vs LJ":{
      "3-Bet Value": [
        "AA", "AKs", "AQs", "AKo", "KK", "QQ"
      ],
      "3-Bet Bluff": [
        "A5s", "A4s", "AJo",
        "87s", "76s"
      ],
      "Call": [
        "AJs", "ATs", "AJo",
        "KQs", "KJs", "KTs",
        "QJs", "QTs", "JTs", "T9s", "98s",
        "JJ", "TT", "99", "88", "77", "66", "55"
      ]
    },
    "SB vs HJ":{
      "3-Bet Value": [
        "AA", "AKs", "AQs", "AKo", "KK", "QQ"
      ],
      "3-Bet Bluff": [
        "A9s", "A5s", "A4s", "A3s", "AJo",
        "87s", "76s", "65s", "54s",
      ],
      "Call": [
        "AJs", "ATs", "AQo",
        "KQs", "KJs", "KTs",
        "QJs", "QTs", "JTs", "T9s", "98s", "87s",
        "JJ", "TT", "99", "88", "77", "66", "55", "44"
      ]
    },
    "SB vs CO":{
      "3-Bet Value": [
        "AA", "AKs", "AQs", "AJs", "ATs", 
        "AKo", "AQo", "KQs",
        "KK", "QQ", "JJ", "TT"
      ],
      "3-Bet Bluff": [
        "A9s", "A8s", "A7s", "A6s", "A5s", "A4s", "A3s", "A2s", 
        "AJo", "KQo",
        "KJs", "KTs", "K9s", 
        "QJs", "QTs", "Q9s",
        "JTs", "J9s", "T9s", "98s", "87s", "76s", "65s", "54s",
        "99", "88", "77", "66", "55", "44"
      ],
      "Call": []
    },
    "SB vs BTN":{
      "3-Bet Value": [
        "AKs", "AQs", "AJs", "ATs", 
        "AKo", "AQo", "AJo", 
        "KQs", "KJs", "KQo",
        "AA", "KK", "QQ", "JJ", "TT"
      ],
      "3-Bet Bluff": [
        "A9s", "A8s", "A7s", "A6s", "A5s", "A4s", "A3s", "A2s", "ATo",
        "KTs", "K9s", "KJo",
        "QJs", "QTs", "Q9s", "QJo",
        "JTs", "J9s", "T9s", "T8s", "98s", "97s", "87s", "86s", "76s", "65s", "54s",
        "99", "88", "77", "66", "55", "44", "33", "22"
      ],
      "Call": []
    },
  },
  "RFI BB":{
    "BB vs UTG/UTG+1":{
      "3-Bet Value": [
        "AKs", "AQs",
        "AA", "KK", "QQ"
      ],
      "3-Bet Bluff": [
        "86s", "76s", "75s", "65s", "64s", "54s", "43s"
      ],
      "Call": [
        "AJs", "ATs", "A9s", "A8s", "A7s", "A6s", "A5s", "A4s", "A3s", "A2s",
        "AKo", "AQo", "AJo", "ATo",
        "KQs", "KJs", "KTs", "K9s", "K8s", "K7s", "K6s", "K5s",
        "KQo", "KJo", "KTo",
        "QJs", "QTs", "Q9s", "Q8s", "Q7s",
        "QJo", "QTo",
        "JTs", "J9s", "J8s", "J7s", 
        "JTo",
        "T9s", "T8s", "T7s",
        "98s", "97s", "96s",
        "87s",
        "JJ", "TT", "99", "88", "77", "66", "55", "44", "33", "22",
      ]
    },
    "BB vs UTG+2":{
      "3-Bet Value": [
        "AKs", "AQs", "AKo",
        "AA", "KK", "QQ", "JJ"
      ],
      "3-Bet Bluff": [
        "86s", "85s", "76s", "75s", "74s", "65s", "64s", "54s", "53s", "43s"
      ],
      "Call": [
        "AJs", "ATs", "A9s", "A8s", "A7s", "A6s", "A5s", "A4s", "A3s", "A2s",
        "AQo", "AJo", "ATo",
        "KQs", "KJs", "KTs", "K9s", "K8s", "K7s", "K6s", "K5s", "K4s",
        "KQo", "KJo", "KTo",
        "QJs", "QTs", "Q9s", "Q8s", "Q7s", "Q6s",
        "QJo", "QTo",
        "JTs", "J9s", "J8s", "J7s", "J6s",
        "JTo",
        "T9s", "T8s", "T7s", "T6s",
        "98s", "97s", "96s",
        "87s",
        "TT", "99", "88", "77", "66", "55", "44", "33", "22",
      ]
    },
    "BB vs LJ":{
      "3-Bet Value": [
        "AKs", "AQs", "AJs", "AKo", "AQo", "KQs",
        "AA", "KK", "QQ", "JJ", "TT"
      ],
      "3-Bet Bluff": [
        "A9o", "85s", "75s", "74s", "65s", "64s", "54s", "53s", "43s"
      ],
      "Call": [
        "ATs", "A9s", "A8s", "A7s", "A6s", "A5s", "A4s", "A3s", "A2s",
        "AJo", "ATo",
        "KJs", "KTs", "K9s", "K8s", "K7s", "K6s", "K5s", "K4s", "K3s", "K2s",
        "KQo", "KJo", "KTo",
        "QJs", "QTs", "Q9s", "Q8s", "Q7s", "Q6s", "Q5s", "Q4s",
        "QJo", "QTo",
        "JTs", "J9s", "J8s", "J7s", "J6s", "J5s",
        "JTo",
        "T9s", "T8s", "T7s", "T6s", "T5s",
        "98s", "97s", "96s", "95s",
        "87s", "86s",
        "76s",
        "99", "88", "77", "66", "55", "44", "33", "22",
      ]
    },
    "BB vs HJ":{
      "3-Bet Value": [
        "AKs", "AQs", "AJs", "AKo", "KQs",
        "AA", "KK", "QQ", "JJ", "TT"
      ],
      "3-Bet Bluff": [
        "A9o", "85s", "76s", "75s", "74s", "65s", "64s", "63s","54s", "53s", "43s", "32s"
      ],
      "Call": [
        "ATs", "A9s", "A8s", "A7s", "A6s", "A5s", "A4s", "A3s", "A2s",
        "AQo", "AJo", "ATo",
        "KJs", "KTs", "K9s", "K8s", "K7s", "K6s", "K5s", "K4s", "K3s", "K2s",
        "KQo", "KJo", "KTo",
        "QJs", "QTs", "Q9s", "Q8s", "Q7s", "Q6s", "Q5s", "Q4s",
        "QJo", "QTo",
        "JTs", "J9s", "J8s", "J7s", "J6s", "J5s",
        "JTo",
        "T9s", "T8s", "T7s", "T6s", "T5s",
        "98s", "97s", "96s", "95s",
        "87s", "86s",
        "99", "88", "77", "66", "55", "44", "33", "22",
      ]
    },
    "BB vs CO":{
      "3-Bet Value": [
        "AKs", "AQs", "AJs", "ATs", "AKo", "AQo", "AJo", 
        "KQs", "KJs", "KQo", "QJs",
        "AA", "KK", "QQ", "JJ", "TT"
      ],
      "3-Bet Bluff": [
        "A4o", "A3o", 
        "85s", "84s", 
        "76s", "75s", "74s", "73s",
        "65s", "64s", "63s",
        "54s", "53s", "52s",
        "43s", "42s","32s"
      ],
      "Call": [
        "A9s", "A8s", "A7s", "A6s", "A5s", "A4s", "A3s", "A2s",
        "ATo", "A9o", "A8o",
        "KTs", "K9s", "K8s", "K7s", "K6s", "K5s", "K4s", "K3s", "K2s",
        "KJo", "KTo", "K9o",
        "QJs", "QTs", "Q9s", "Q8s", "Q7s", "Q6s", "Q5s", "Q4s",
        "QJo", "QTo", "Q9o",
        "JTs", "J9s", "J8s", "J7s", "J6s", "J5s", "J4s",
        "JTo", "J9s",
        "T9s", "T8s", "T7s", "T6s", "T5s", "T4s",
        "T9o",
        "98s", "97s", "96s", "95s", "94s",
        "98o",
        "87s", "86s",
        "99", "88", "77", "66", "55", "44", "33", "22",
      ]
    },
    "BB vs BTN":{
      "3-Bet Value": [
        "AKs", "AQs", "AJs", "ATs", "AKo", "AQo", "AJo", 
        "KQs", "KJs", "KTs", "KQo", "QJs", "QTs", "JTs",
        "AA", "KK", "QQ", "JJ", "TT", "99"
      ],
      "3-Bet Bluff": [
        "A3o", "A2o", 
        "K5o", "K4o", "K3o", "K2o",
        "Q6o", "Q5o",
        "85s", "84s", 
        "76s", "75s", "74s", "73s",
        "65s", "64s", "63s",
        "54s", "53s", "52s",
        "43s", "42s","32s",
        "75o", "65o"
      ],
      "Call": [
        "A9s", "A8s", "A7s", "A6s", "A5s", "A4s", "A3s", "A2s",
        "ATo", "A9o", "A8o", "A7o", "A6o", "A5o", "A4o",
        "K9s", "K8s", "K7s", "K6s", "K5s", "K4s", "K3s", "K2s",
        "KJo", "KTo", "K9o", "K8s", "K7s", "K6s",
        "Q9s", "Q8s", "Q7s", "Q6s", "Q5s", "Q4s", "Q3s", "Q2s",
        "QJo", "QTo", "Q9o", "Q8o", "Q7o",
        "J9s", "J8s", "J7s", "J6s", "J5s", "J4s", "J3s", "J2s",
        "JTo", "J9o", "J8o", "J7o", "J6o", 
        "T9s", "T8s", "T7s", "T6s", "T5s", "T4s", "T3s", "T2s",
        "T9o", "T8o", "T7o", "T6o",
        "98s", "97s", "96s", "95s", "94s", "93s", "92s",
        "98o", "97o", "96o",
        "87s", "86s", "85s", "84s", "83s", "82s",
        "87o", "86o",
        "72s", "62s", "76o", 
        "99", "88", "77", "66", "55", "44", "33", "22",
      ]
    },
    "BB vs SB":{
      "3-Bet Value": [
        "AKs", "AQs", "AJs", "ATs", "AKo", "AQo", "AJo", 
        "KQs", "KJs", "KTs", "KQo", "QJs", "QTs", "JTs",
        "AA", "KK", "QQ", "JJ", "TT", "99"
      ],
      "3-Bet Bluff": [
        "A2o", "K3o", "K2o", "Q4o", "Q3o", "Q2o", "J5o", "T5o",
        "J9s", "T9s", "T8s", "98s", "87s", "76s", "65s", "54s",
        "76o", "75o", "65o", "64o", "54o"
      ],
      "Call": [
        "A9s", "A8s", "A7s", "A6s", "A5s", "A4s", "A3s", "A2s",
        "ATo", "A9o", "A8o", "A7o", "A6o", "A5o", "A4o", "A3o",
        "K9s", "K8s", "K7s", "K6s", "K5s", "K4s", "K3s", "K2s",
        "KJo", "KTo", "K9o", "K8o", "K7o", "K6o", "K5o", "K4o",
        "Q9s", "Q8s", "Q7s", "Q6s", "Q5s", "Q4s", "Q3s", "Q2s",
        "QJo", "QTo", "Q9o", "Q8o", "Q7o", "Q6o", "Q5o",
        "J8s", "J7s", "J6s", "J5s", "J4s", "J3s", "J2s",
        "JTo", "J9o", "J8o", "J7o", "J6o", 
        "T7s", "T6s", "T5s", "T4s", "T3s", "T2s",
        "T9o", "T8o", "T7o", "T6o",
        "97s", "96s", "95s", "94s", "93s", "92s",
        "98o", "97o", "96o",
        "86s", "85s", "84s", "83s", "82s",
        "87o", "86o",
        "75s", "74s", "73s", "72s", 
        "64s", "63s", "62s", "53s", "52s", "43s", "42s", "32s",
        "88", "77", "66", "55", "44", "33", "22",
      ]
    },
    
  },
  "UTG vs 3Bet": {
    "UTG vs UTG+1": {
      "4-Bet Value": [
        "AA", "AKs", "AKo", "KK"
      ],
      "4-Bet Bluff": [
        "ATs", "AQo"
      ],
      "Call": [
        "AQs", "AJs", "KQs", "QJs", "JTs",
        "QQ", "JJ", "TT", "99"
      ]
    },
    "UTG vs UTG+2": {
      "4-Bet Value": [
        "AA", "AKs", "AKo", "KK"
      ],
      "4-Bet Bluff": [
        "ATs", "A9s", "AQo"
      ],
      "Call": [
        "AQs", "AJs", "KQs", "QJs", "JTs",
        "QQ", "JJ", "TT", "99", "88"
      ]
    },
    "UTG vs LJ": {
      "4-Bet Value": [
        "AA", "AKs", "AKo", "KK"
      ],
      "4-Bet Bluff": [
        "ATs", "A9s", "AQo"
      ],
      "Call": [
        "AQs", "AJs", "KQs", "QJs", "JTs", "T9s",
        "QQ", "JJ", "TT", "99", "88"
      ]
    },
    "UTG vs HJ": {
      "4-Bet Value": [
        "AA", "AKs", "AKo", "KK", "QQ"
      ],
      "4-Bet Bluff": [
        "ATs", "A9s", "A5s", "AQo"
      ],
      "Call": [
        "AQs", "AJs", "KQs", "QJs", "JTs", "T9s",
        "JJ", "TT", "99", "88", "77"
      ]
    },
    "UTG vs CO/BTN": {
      "4-Bet Value": [
        "AA", "AKs", "AKo", "KK", "QQ"
      ],
      "4-Bet Bluff": [
        "A9s", "A5s",
        "KTs", "QTs", "98s"
      ],
      "Call": [
        "AQs", "AJs", "ATs", "AQo", 
        "KQs", "KJs", "QJs", "JTs", "T9s",
        "JJ", "TT", "99", "88", "77"
      ]
    },
    "UTG vs SB/BB": {
      "4-Bet Value": [
        "AA", "AKs", "AKo", "KK", "QQ"
      ],
      "4-Bet Bluff": [
        "A9s", "A5s",
        "KTs", "QTs", "98s"
      ],
      "Call": [
        "AQs", "AJs", "ATs", "AQo", 
        "KQs", "KJs", "QJs", "JTs", "T9s",
        "JJ", "TT", "99", "88", "77", "66"
      ]
    },
  },
  "UTG+1 vs 3Bet": {
    "UTG+1 vs UTG+2": {
      "4-Bet Value": [
        "AA", "AKs", "AKo", "KK"
      ],
      "4-Bet Bluff": [
        "ATs", "A9s", "A5s",
        "AQo", "AJo"
      ],
      "Call": [
        "AQs", "AJs", "KQs", "KJs", "QJs", "JTs", "T9s", 
        "QQ", "JJ", "TT", "99", "88", "77"
      ]
    },
    "UTG+1 vs LJ": {
      "4-Bet Value": [
        "AA", "AKs", "AKo", "KK"
      ],
      "4-Bet Bluff": [
        "A9s", "A5s", "A4s", "AJo",
        "KTs", "QTs"
      ],
      "Call": [
        "AQs", "AJs", "ATs", "AQo", 
        "KQs", "KJs", "QJs", "JTs", "T9s", 
        "QQ", "JJ", "TT", "99", "88", "77"
      ]
    },
    "UTG+1 vs HJ/CO": {
      "4-Bet Value": [
        "AA", "AKs", "AKo", "KK"
      ],
      "4-Bet Bluff": [
        "A9s", "A5s", "A4s", "AJo",
        "KTs", "KQo", "QTs"
      ],
      "Call": [
        "AQs", "AJs", "ATs", "AQo", 
        "KQs", "KJs", "QJs", "JTs", "T9s", "98s", "87s",
        "QQ", "JJ", "TT", "99", "88", "77", "66"
      ]
    },
    "UTG+1 vs BTN": {
      "4-Bet Value": [
        "AA", "AKs", "AKo", "KK"
      ],
      "4-Bet Bluff": [
        "A9s", "A5s", "A4s", "ATo",
        "KTs", "KQo", "QTs", "J9s"
      ],
      "Call": [
        "AQs", "AJs", "ATs", "AQo", "AJo", 
        "KQs", "KJs", "QJs", "JTs", "T9s", "98s", "87s",
        "QQ", "JJ", "TT", "99", "88", "77", "66"
      ]
    },
    "UTG+1 vs SB/BB": {
      "4-Bet Value": [
        "AA", "AKs", "AKo", "KK", "QQ"
      ],
      "4-Bet Bluff": [
        "A9s", "A8s", "A5s", "A4s", "ATo",
        "K9s", "KQo", "J9s"
      ],
      "Call": [
        "AQs", "AJs", "ATs", "AQo", "AJo", 
        "KQs", "KJs", "KTs", "QJs", "QTs", "JTs", "T9s", "98s", "87s",
        "JJ", "TT", "99", "88", "77", "66"
      ]
    },
  },
  "UTG+2 vs 3Bet": {
    "UTG+2 vs LJ": {
      "4-Bet Value": [
        "AA", "AKs", "AKo", "KK"
      ],
      "4-Bet Bluff": [
        "A9s", "A5s", "A4s", "A3s", "A2s",
        "AJo", "KQo"
      ],
      "Call": [
        "AQs", "AJs", "ATs", "AQo", 
        "KQs", "KJs", "QJs", "JTs", "T9s", "98s",
        "QQ", "JJ", "TT", "99", "88", "77"
      ]
    },
    "UTG+2 vs HJ": {
      "4-Bet Value": [
        "AA", "AKs", "AKo", "KK"
      ],
      "4-Bet Bluff": [
        "A9s", "A5s", "A4s", "A3s", "A2s",
        "AJo", "KQo", "87s"
      ],
      "Call": [
        "AQs", "AJs", "ATs", "AQo", 
        "KQs", "KJs", "QJs", "JTs", "T9s", "98s",
        "QQ", "JJ", "TT", "99", "88", "77", "66"
      ]
    },
    "UTG+2 vs CO/BTN": {
      "4-Bet Value": [
        "AA", "AKs", "AKo", "KK"
      ],
      "4-Bet Bluff": [
        "A9s", "A8s", "A5s", "A4s", "A3s", "A2s",
        "AJo", "KQo",
      ],
      "Call": [
        "AQs", "AJs", "ATs", "AQo", 
        "KQs", "KJs", "KTs", "QJs", "QTs", "JTs", "T9s", "98s", "87s",
        "QQ", "JJ", "TT", "99", "88", "77", "66", "55"
      ]
    },
    "UTG+2 vs SB/BB": {
      "4-Bet Value": [
        "AA", "AKs", "AKo", "KK", "QQ"
      ],
      "4-Bet Bluff": [
        "A9s", "A8s", "A5s", "A4s", "A3s", "A2s",
        "AJo", "KQo",
      ],
      "Call": [
        "AQs", "AJs", "ATs", "AQo", 
        "KQs", "KJs", "KTs", "QJs", "QTs", "JTs", "T9s", "98s", "87s",
        "QQ", "JJ", "TT", "99", "88", "77", "66", "55"
      ]
    },
  }
};
