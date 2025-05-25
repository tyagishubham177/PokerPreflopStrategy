import { initialPokerStrategy } from "../Constants/InitialStrategy";
import { CARD_WEIGHTS } from "../Constants/CardWeights";
import { suits } from "../Constants/GameConstants";
import { SITUATION_LABELS, POSITION_LABELS, getLabel } from "../Constants/GameLabels";

const useGameLogic = () => {
  const generateNewHand = () => {
    if (Object.keys(CARD_WEIGHTS).length === 0) {
      console.error("CARD_WEIGHTS is empty. Cannot generate a new hand.");
      return ["AD", "KH"];
    }
    if (suits.length === 0) {
      console.error("Suits array is empty. Cannot generate a new hand.");
      return ["AS", "KC"];
    }

    const newHand = [];
    let attempts = 0;
    while (newHand.length < 2 && attempts < 100) {
      const rank = weightedRandomSelect(Object.keys(CARD_WEIGHTS), Object.values(CARD_WEIGHTS));
      const suit = suits[Math.floor(Math.random() * suits.length)];
      
      if (!rank || !suit) {
        console.error("Failed to generate rank or suit.", {rank, suit});
        attempts++;
        continue;
      }
      const card = `${rank}${suit}`;
      if (!newHand.find(existingCard => existingCard === card)) {
         newHand.push(card);
      }
      attempts++;
    }
    if (newHand.length < 2) {
        console.error("Failed to generate a complete two-card hand after multiple attempts.");
        return ["AH", "KD"];
    }
    return newHand;
  };

  const weightedRandomSelect = (items, weights) => {
    if (!items || items.length === 0) {
      console.error("weightedRandomSelect: items array is empty.");
      return null;
    }
    if (!weights || weights.length === 0) {
      console.error("weightedRandomSelect: weights array is empty.");
      return null;
    }
    if (items.length !== weights.length) {
      console.error("weightedRandomSelect: items and weights arrays must have the same length.");
      return null;
    }

    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    if (totalWeight <= 0) {
      console.error("weightedRandomSelect: totalWeight must be positive.");
      return items[Math.floor(Math.random() * items.length)];
    }

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
    if (situations.length === 0) {
      console.error("initialPokerStrategy is empty. Cannot select situation and position.");
      return {
        newSituationKey: "ERROR_NO_SITUATIONS",
        newPositionKey: "ERROR_NO_POSITIONS",
        newSituationDisplay: "Error: No Situations",
        newPositionDisplay: "Error: No Positions"
      };
    }
    const newSituationKey = situations[Math.floor(Math.random() * situations.length)];
    
    if (!initialPokerStrategy[newSituationKey]) {
        console.error(`Selected situation key "${newSituationKey}" is invalid or not found in initialPokerStrategy.`);
        return {
            newSituationKey: "ERROR_INVALID_SITUATION_KEY",
            newPositionKey: "ERROR_INVALID_SITUATION_KEY",
            newSituationDisplay: "Error: Invalid Situation",
            newPositionDisplay: "Error: Invalid Situation"
        };
    }

    const positions = Object.keys(initialPokerStrategy[newSituationKey]);
    if (positions.length === 0) {
      console.error(`No positions found for situation key "${newSituationKey}".`);
      return {
        newSituationKey,
        newPositionKey: "ERROR_NO_POSITIONS_FOR_SITUATION",
        newSituationDisplay: getLabel(SITUATION_LABELS, newSituationKey),
        newPositionDisplay: "Error: No Positions"
      };
    }
    const newPositionKey = positions[Math.floor(Math.random() * positions.length)];
    
    return {
        newSituationKey,
        newPositionKey,
        newSituationDisplay: getLabel(SITUATION_LABELS, newSituationKey),
        newPositionDisplay: getLabel(POSITION_LABELS, newPositionKey)
    };
  };

  const getAvailableActions = (situationKey, positionKey) => {
    if (initialPokerStrategy[situationKey] && initialPokerStrategy[situationKey][positionKey]) {
      const actions = Object.keys(initialPokerStrategy[situationKey][positionKey]);
      return [...actions, "Fold"];
    }
    console.error("Invalid situation or position key for getting available actions:", situationKey, positionKey);
    return ["Fold"];
  };

  const getCorrectDecision = (handNotation, situationKey, positionKey) => {
    if (!situationKey || !positionKey) {
      console.error("Situation or Position key not provided for decision making");
      return "Fold";
    }

    const situationData = initialPokerStrategy[situationKey]?.[positionKey];

    if (!situationData) {
      console.error("Strategy data not found for the current situation and position keys:", situationKey, positionKey);
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
    if (!hand || hand.length !== 2) {
        console.error("Invalid hand for notation:", hand);
        return "";
    }
    const ranks = "23456789TJQKA";
    const card1Rank = hand[0]?.[0];
    const card1Suit = hand[0]?.[1];
    const card2Rank = hand[1]?.[0];
    const card2Suit = hand[1]?.[1];

    if (!card1Rank || !card1Suit || !card2Rank || !card2Suit) {
        console.error("Invalid card format in hand:", hand);
        return "";
    }
    
    if (card1Rank === card2Rank) return card1Rank + card2Rank;

    const suited = card1Suit === card2Suit ? "s" : "o";
    
    const rank1Index = ranks.indexOf(card1Rank);
    const rank2Index = ranks.indexOf(card2Rank);

    if (rank1Index === -1 || rank2Index === -1) {
        console.error("Invalid rank in hand:", hand);
        return "";
    }

    return rank1Index > rank2Index
      ? card1Rank + card2Rank + suited
      : card2Rank + card1Rank + suited;
  };

  return {
    generateNewHand,
    selectSituationAndPosition,
    getAvailableActions,
    getCorrectDecision,
    getHandNotation,
  };
};

export default useGameLogic;
