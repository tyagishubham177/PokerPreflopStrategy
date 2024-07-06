import { useState, useEffect } from "react";
import { positions, suits, ranks } from "../Constants/GameConstants";
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
  const [showSettings, setShowSettings] = useState(false);
  const [pokerStrategy, setPokerStrategy] = useState(initialPokerStrategy);
  const [editedStrategy, setEditedStrategy] = useState(JSON.stringify(initialPokerStrategy, null, 2));
  const [situation, setSituation] = useState("");
  const [availableActions, setAvailableActions] = useState([]);

  useEffect(() => {
    dealNewHand();
  }, []);

  // Function to deal a new hand and set up the game state
  const dealNewHand = () => {
    const newHand = generateNewHand();
    setHand(newHand);
    const { newSituation, newPosition } = selectSituationAndPosition();
    setSituation(getLabel(SITUATION_LABELS, newSituation));
    setPosition(getLabel(POSITION_LABELS, newPosition));
    const newActions = getAvailableActions(newSituation, newPosition);
    setAvailableActions(newActions);
  };

  // Function to generate a new hand
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

  // Function to randomly select situation and position
  const selectSituationAndPosition = () => {
    const situations = Object.keys(initialPokerStrategy);
    const newSituation = situations[Math.floor(Math.random() * situations.length)];
    const positions = Object.keys(initialPokerStrategy[newSituation]);
    const newPosition = positions[Math.floor(Math.random() * positions.length)];
    return { newSituation, newPosition };
  };

  // Function to get available actions based on situation and position
  const getAvailableActions = (situation, position) => {
    const actions = Object.keys(initialPokerStrategy[situation][position]);
    return [...actions, "Fold"]; // Always add 'Fold' as an option
  };

  // Function to determine the correct decision for a given hand
  const getCorrectDecision = (handNotation) => {
    const situationKey = Object.keys(SITUATION_LABELS).find((key) => SITUATION_LABELS[key] === situation);
    const positionKey = Object.keys(POSITION_LABELS).find((key) => POSITION_LABELS[key] === position);
    const situationData = initialPokerStrategy[situationKey][positionKey];
    for (const [action, hands] of Object.entries(situationData)) {
      if (hands.includes(handNotation)) {
        return action;
      }
    }
    return "Fold"; // Default to 'Fold' if not found in any other category
  };

  // Function to handle player's decision
  const makeDecision = (decision) => {
    const handNotation = getHandNotation(hand);
    const correctDecision = getCorrectDecision(handNotation);

    if (decision === correctDecision) {
      handleCorrectDecision();
    } else {
      handleIncorrectDecision(correctDecision);
    }

    if (lives > 1) {
      dealNewHand();
    } else {
      setGameOver(true);
    }
  };

  // Function to get hand notation (e.g., "AKs", "TT")
  const getHandNotation = (hand) => {
    const [card1, card2] = hand.map((card) => card[0]); // Get first character (rank) of each card
    if (card1 === card2) return card1 + card2; // Pocket pair
    const suited = hand[0][1] === hand[1][1] ? "s" : "o";
    return card1 > card2 ? card1 + card2 + suited : card2 + card1 + suited;
  };

  // Function to handle correct decision
  const handleCorrectDecision = () => {
    const points = 10 * (1 + streak * 0.1);
    setScore((prevScore) => prevScore + points);
    setStreak((prevStreak) => prevStreak + 1);
    setHighScore((prevHighScore) => Math.max(prevHighScore, score + points));
  };

  // Function to handle incorrect decision
  const handleIncorrectDecision = (correctDecision) => {
    setLives((prevLives) => prevLives - 1);
    setStreak(0);
    setWrongChoices((prevWrongChoices) => [...prevWrongChoices, { hand, position, correctDecision }]);
  };

  const restartGame = () => {
    setLives(3);
    setScore(0);
    setStreak(0);
    setWrongChoices([]);
    setGameOver(false);
    dealNewHand();
  };

  const handleStrategyChange = (e) => {
    setEditedStrategy(e.target.value);
  };

  const saveStrategy = () => {
    try {
      const newStrategy = JSON.parse(editedStrategy);
      setPokerStrategy(newStrategy);
      setShowSettings(false);
    } catch (error) {
      alert("Invalid JSON. Please check your input.");
    }
  };

  return {
    hand,
    availableActions,
    position,
    lives,
    score,
    highScore,
    streak,
    gameOver,
    showRules,
    setShowRules,
    showSettings,
    setShowSettings,
    editedStrategy,
    situation,
    makeDecision,
    restartGame,
    handleStrategyChange,
    saveStrategy,
  };
};

export default usePokerGame;
