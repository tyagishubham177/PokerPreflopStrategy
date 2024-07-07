import { useState, useEffect, useCallback, useRef } from "react";
import { suits } from "../Constants/GameConstants";
import { initialPokerStrategy } from "../Constants/InitialStrategy";
import { CARD_WEIGHTS } from "../Constants/CardWeights";
import { SITUATION_LABELS, POSITION_LABELS, getLabel } from "../Constants/GameLabels";

const usePokerGame = () => {
  const [hand, setHand] = useState([]);
  const [position, setPosition] = useState("");
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [wrongChoices, setWrongChoices] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [situation, setSituation] = useState("");
  const [availableActions, setAvailableActions] = useState([]);

  const isInitialMount = useRef(true);
  const dealCount = useRef(0);

  const logGameState = useCallback((action, details = {}) => {
    console.log(`[${action}]`, { ...details, dealCount: dealCount.current });
  }, []);

  useEffect(() => {
    dealNewHand();
    logGameState("Game Initialized", { lives, wrongChoices: wrongChoices.length, gameOver });
  }, [logGameState]);

  const dealNewHand = useCallback(() => {
    dealCount.current += 1;
    logGameState("Dealing New Hand", { dealCount: dealCount.current });

    if (dealCount.current > 10) {
      console.error("Excessive dealing detected. Stopping to prevent infinite loop.");
      return;
    }

    const newHand = generateNewHand();
    setHand(newHand);
    const { newSituation, newPosition } = selectSituationAndPosition();
    setSituation(getLabel(SITUATION_LABELS, newSituation));
    setPosition(getLabel(POSITION_LABELS, newPosition));
    const newActions = getAvailableActions(newSituation, newPosition);
    setAvailableActions(newActions);
  }, [logGameState]);

  useEffect(() => {
    if (isInitialMount.current) {
      logGameState("Initial Mount");
      isInitialMount.current = false;
      dealNewHand();
    }
  }, [dealNewHand, logGameState]);

  const generateNewHand = () => {
    const newHand = [];
    while (newHand.length < 2) {
      const rank = weightedRandomSelect(Object.keys(CARD_WEIGHTS), Object.values(CARD_WEIGHTS));
      const suit = suits[Math.floor(Math.random() * suits.length)];
      const card = `${rank}${suit}`;
      if (!newHand.includes(card)) {
        newHand.push(card);
      }
    }
    return newHand;
  };

  const weightedRandomSelect = (items, weights) => {
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    let random = Math.random() * totalWeight;
    for (let i = 0; i < items.length; i++) {
      random -= weights[i];
      if (random <= 0) {
        return items[i];
      }
    }
    return items[items.length - 1];
  };

  const selectSituationAndPosition = () => {
    const situations = Object.keys(initialPokerStrategy);
    const newSituation = situations[Math.floor(Math.random() * situations.length)];
    const positions = Object.keys(initialPokerStrategy[newSituation]);
    const newPosition = positions[Math.floor(Math.random() * positions.length)];
    return { newSituation, newPosition };
  };

  const getAvailableActions = (situation, position) => {
    const actions = Object.keys(initialPokerStrategy[situation][position]);
    return [...actions, "Fold"];
  };

  const getCorrectDecision = (handNotation) => {
    console.log("Situation:", situation);
    console.log("Position:", position);

    const situationKey = Object.keys(SITUATION_LABELS).find((key) => SITUATION_LABELS[key] === situation);
    const positionKey = Object.keys(POSITION_LABELS).find((key) => POSITION_LABELS[key] === position);

    console.log("Situation Key:", situationKey);
    console.log("Position Key:", positionKey);

    if (!situationKey || !positionKey) {
      console.error("Situation or Position key not found");
      return "Fold"; // Default to Fold if we can't determine the correct decision
    }

    const situationData = initialPokerStrategy[situationKey]?.[positionKey];

    if (!situationData) {
      console.error("Strategy data not found for the current situation and position");
      return "Fold";
    }

    for (const [action, hands] of Object.entries(situationData)) {
      if (hands.includes(handNotation)) {
        return action;
      }
    }

    return "Fold";
  };

  const getHandNotation = (hand) => {
    const ranks = "23456789TJQKA";
    const [card1, card2] = hand.map((card) => card[0]);

    if (card1 === card2) return card1 + card2;

    const suited = hand[0][1] === hand[1][1] ? "s" : "o";
    const rank1 = ranks.indexOf(card1);
    const rank2 = ranks.indexOf(card2);

    return rank1 > rank2 ? card1 + card2 + suited : card2 + card1 + suited;
  };

  const handleCorrectDecision = useCallback(() => {
    const points = 10 * (1 + streak * 0.1);
    setScore((prevScore) => prevScore + points);
    setStreak((prevStreak) => prevStreak + 1);
    setHighScore((prevHighScore) => Math.max(prevHighScore, score + points));
    logGameState("Correct Decision", { points, newStreak: streak + 1 });
  }, [streak, score, logGameState]);

  const handleIncorrectDecision = useCallback(
    (correctDecision, yourChoice) => {
      logGameState("Incorrect Decision", { correctDecision, yourChoice });

      setLives((prevLives) => {
        const newLives = prevLives - 1;
        console.log(`Lives reduced from ${prevLives} to ${newLives}`);
        return newLives;
      });

      setStreak(0);
      setWrongChoices((prevWrongChoices) => {
        const newWrongChoices = [
          ...prevWrongChoices,
          { hand, position, situation, correctDecision, yourChoice },
        ];
        console.log("Updated wrong choices:", newWrongChoices);
        return newWrongChoices;
      });
    },
    [hand, position, situation, logGameState]
  );

  const makeDecision = useCallback(
    (decision) => {
      logGameState("Decision Made", { decision, lives, wrongChoices: wrongChoices.length });

      const handNotation = getHandNotation(hand);
      const correctDecision = getCorrectDecision(handNotation);

      if (decision === correctDecision) {
        handleCorrectDecision();
      } else {
        handleIncorrectDecision(correctDecision, decision);
      }

      setLives((currentLives) => {
        const newLives = currentLives - (decision !== correctDecision ? 1 : 0);
        logGameState("Updated Lives", { previousLives: currentLives, newLives });
        if (newLives <= 0) {
          setGameOver(true);
          logGameState("Game Over");
        }
        return newLives;
      });

      if (!gameOver) {
        logGameState("Calling dealNewHand from makeDecision");
        dealNewHand();
      }
    },
    [
      hand,
      gameOver,
      handleCorrectDecision,
      handleIncorrectDecision,
      logGameState,
      lives,
      wrongChoices.length,
      dealNewHand,
    ]
  );

  const restartGame = useCallback(() => {
    logGameState("Restarting Game");
    setLives(3);
    setScore(0);
    setStreak(0);
    setWrongChoices([]);
    setGameOver(false);
    dealCount.current = 0;
    dealNewHand();
  }, [dealNewHand, logGameState]);

  return {
    hand,
    position,
    lives,
    score,
    highScore,
    streak,
    gameOver,
    showRules,
    setShowRules,
    situation,
    availableActions,
    makeDecision,
    restartGame,
    wrongChoices,
  };
};

export default usePokerGame;
