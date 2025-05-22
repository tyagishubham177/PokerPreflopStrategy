import { useState, useEffect, useCallback, useRef } from "react";
import useGameState from "./useGameState";
import useGameLogic from "./useGameLogic";

const usePokerGame = () => {
  const {
    hand,
    situationKey,
    positionKey,
    situationDisplay,
    positionDisplay,
    lives,
    score,
    highScore,
    streak,
    wrongChoices,
    gameOver,
    availableActions,
    setHand,
    setSituationKey,
    setPositionKey,
    setSituationDisplay,
    setPositionDisplay,
    // setLives, // Using decrementLives or resetLives
    setScore,
    // setHighScore, // Using updateHighScore
    updateHighScore,
    setStreak,
    setWrongChoices,
    setGameOver,
    setAvailableActions,
    decrementLives,
    resetLives,
    resetGameScoreAndStats,
  } = useGameState();

  const {
    generateNewHand,
    selectSituationAndPosition,
    getAvailableActions: getLogicAvailableActions, // Renamed to avoid conflict
    getCorrectDecision: getLogicCorrectDecision, // Renamed to avoid conflict
    getHandNotation: getLogicHandNotation, // Renamed to avoid conflict
  } = useGameLogic();

  const [showRules, setShowRules] = useState(false); // UI state, can remain here or move to UI component
  const isInitialMount = useRef(true);
  const dealCount = useRef(0); // For logging/debugging

  const logGameState = useCallback((action, details = {}) => {
    console.log(`[PokerGame - ${action}]`, { ...details, dealCount: dealCount.current });
  }, []);

  const dealNewHand = useCallback(() => {
    dealCount.current += 1;
    logGameState("Dealing New Hand");

    const newHand = generateNewHand();
    setHand(newHand); // newHand could be a fallback hand from generateNewHand

    const { newSituationKey, newPositionKey, newSituationDisplay, newPositionDisplay } = selectSituationAndPosition();

    // Check if situation/position data indicates an error from useGameLogic
    if (newSituationKey.startsWith("ERROR_") || newPositionKey.startsWith("ERROR_")) {
      logGameState("Critical Error: Failed to select situation/position", { newSituationKey, newPositionKey });
      setSituationDisplay(newSituationDisplay || "Error"); // Show error in UI
      setPositionDisplay(newPositionDisplay || "Error");
      setAvailableActions(["Fold"]); // Only allow Fold
      setGameOver(true); // Stop the game
      // Optionally, set a more specific error message for the UI here
      return; // Do not proceed further with setting keys that are error codes
    }

    setSituationKey(newSituationKey);
    setPositionKey(newPositionKey);
    setSituationDisplay(newSituationDisplay);
    setPositionDisplay(newPositionDisplay);

    const newActions = getLogicAvailableActions(newSituationKey, newPositionKey);
    setAvailableActions(newActions);
  }, [
    generateNewHand, 
    selectSituationAndPosition, 
    getLogicAvailableActions, 
    setHand, 
    setSituationKey, 
    setPositionKey, 
    setSituationDisplay, 
    setPositionDisplay, 
    setAvailableActions, 
    logGameState,
    setGameOver // Added setGameOver as a dependency
  ]);

  useEffect(() => {
    if (isInitialMount.current) {
      logGameState("Initial Mount - First Deal");
      isInitialMount.current = false;
      dealNewHand();
    }
  }, [dealNewHand, logGameState]);


  const handleCorrectDecision = useCallback(() => {
    const points = 10 * (1 + streak * 0.1); // Base points + streak bonus
    const newScore = score + points;
    setScore(newScore);
    setStreak((prevStreak) => prevStreak + 1);
    updateHighScore(newScore);
    logGameState("Correct Decision", { points, newStreak: streak + 1, currentScore: newScore });
  }, [streak, score, setScore, setStreak, updateHighScore, logGameState]);

  const handleIncorrectDecision = useCallback((correctDecision, yourChoice, handNotation) => {
    logGameState("Incorrect Decision", { correctDecision, yourChoice, handNotation, position: positionDisplay, situation: situationDisplay });
    setStreak(0);
    decrementLives();
    setWrongChoices((prevWrongChoices) => [
      ...prevWrongChoices,
      { handNotation, position: positionDisplay, situation: situationDisplay, correctDecision, yourChoice },
    ]);
  }, [decrementLives, setStreak, setWrongChoices, positionDisplay, situationDisplay, logGameState]);
  
  const makeDecision = useCallback((decision) => {
    if (gameOver) {
      logGameState("Decision Attempted - Game Over");
      return; // Don't process decisions if game is over
    }
    logGameState("Decision Made", { decision, currentLives: lives, numWrongChoices: wrongChoices.length });

    const handNotation = getLogicHandNotation(hand);

    if (handNotation === "") {
      logGameState("Error: Invalid hand notation for decision making.", { hand });
      // Treat as incorrect decision or prevent further action
      handleIncorrectDecision("Unknown", decision, "Invalid Hand"); 
      // Potentially deal new hand or end game if this happens often
      if (lives -1 <= 0) {
        setGameOver(true);
        logGameState("Game Over due to invalid hand leading to incorrect decision");
      } else {
         setTimeout(() => dealNewHand(), 0);
      }
      return;
    }

    const correctDecision = getLogicCorrectDecision(handNotation, situationKey, positionKey);
    const isCorrect = decision === correctDecision;

    if (isCorrect) {
      handleCorrectDecision();
    } else {
      handleIncorrectDecision(correctDecision, decision, handNotation);
    }

    // Check for game over condition after processing decision and updating lives
    // Note: lives state updates asynchronously, so we check against the current value
    // If lives becomes 0 or less due to this incorrect decision, set gameOver.
    if (!isCorrect && lives -1 <= 0) {
        setGameOver(true);
        logGameState("Game Over");
    } else if (!isCorrect && lives -1 > 0) {
        // If incorrect but game is not over, deal new hand
        // Delay slightly to allow state updates to be perceived if necessary, though often not needed for logic
        setTimeout(() => dealNewHand(), 0); 
    } else if (isCorrect) {
        // If correct, deal new hand
        setTimeout(() => dealNewHand(), 0);
    }
  }, 
  [
    hand, situationKey, positionKey, gameOver, lives, wrongChoices.length, // Include all dependencies
    getLogicHandNotation, getLogicCorrectDecision, 
    handleCorrectDecision, handleIncorrectDecision, 
    dealNewHand, setGameOver, logGameState,
    // Added situationKey, positionKey as they are used in getLogicCorrectDecision
    situationKey, positionKey 
  ]);

  const restartGame = useCallback(() => {
    logGameState("Restarting Game");
    resetLives();
    resetGameScoreAndStats();
    setGameOver(false);
    dealCount.current = 0; // Reset deal count for new game session
    dealNewHand(); // Deal the first hand of the new game
  }, [resetLives, resetGameScoreAndStats, setGameOver, dealNewHand, logGameState]);

  // This effect handles the game over condition more directly after `lives` updates.
  useEffect(() => {
    if (lives <= 0 && !gameOver) {
      setGameOver(true);
      logGameState("Game Over - Lives Depleted");
    }
  }, [lives, gameOver, setGameOver, logGameState]);

  return {
    hand,
    position: positionDisplay, // Use display-friendly position
    lives,
    score,
    highScore,
    streak,
    gameOver,
    showRules, // Still managed here
    setShowRules, // Still managed here
    situation: situationDisplay, // Use display-friendly situation
    availableActions,
    makeDecision,
    restartGame,
    wrongChoices,
  };
};

export default usePokerGame;
