import { useState, useEffect, useCallback, useRef } from "react";
import useGameState from "./useGameState";
import useGameLogic from "./useGameLogic";
import { DIFFICULTY_LEVELS } from "../Constants/GameConstants"; // Import DIFFICULTY_LEVELS

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
    difficulty, // Destructure difficulty
    setDifficulty, // Destructure setDifficulty
    hints, // Destructure hints
    decrementHints, // Destructure decrementHints
  } = useGameState();

  const {
    generateNewHand,
    selectSituationAndPosition,
    getAvailableActions: getLogicAvailableActions, // Renamed to avoid conflict
    getCorrectDecision: getLogicCorrectDecision, // Renamed to avoid conflict
    getHandNotation: getLogicHandNotation, // Renamed to avoid conflict
  } = useGameLogic();

  const [showRules, setShowRules] = useState(false); // UI state, can remain here or move to UI component
  const [timerDuration, setTimerDuration] = useState(DIFFICULTY_LEVELS[difficulty].timerDuration); // Initialize timerDuration
  const [currentCorrectAction, setCurrentCorrectAction] = useState(null); // Added state for current correct action
  const [lastAnswerCorrectness, setLastAnswerCorrectness] = useState(null); // For correct/incorrect answer feedback
  const [timeLeft, setTimeLeft] = useState(0); // Added state for timer
  const [isTimerActive, setIsTimerActive] = useState(false); // Added state for timer activity
  const gameOverRef = useRef(gameOver); // Add ref for gameOver
  const isInitialMount = useRef(true);
  const dealCount = useRef(0); // For logging/debugging

  useEffect(() => { // useEffect to keep gameOverRef updated
    gameOverRef.current = gameOver;
  }, [gameOver]);

  const logGameState = useCallback((action, details = {}) => {
    console.log(`[PokerGame - ${action}]`, { ...details, dealCount: dealCount.current });
  }, []);

  const dealNewHand = useCallback(() => {
    setLastAnswerCorrectness(null); // Reset before new hand details are set
    setTimeLeft(timerDuration); // Set time for the new hand
    setIsTimerActive(true); // Start the timer
    dealCount.current += 1;
    logGameState("Dealing New Hand", { timerDuration });

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

    // Calculate and set currentCorrectAction
    const handNotation = getLogicHandNotation(newHand);
    if (handNotation && handNotation !== "") {
      const correctAction = getLogicCorrectDecision(handNotation, newSituationKey, newPositionKey);
      setCurrentCorrectAction(correctAction);
      logGameState("Correct Action Set", { correctAction });
    } else {
      setCurrentCorrectAction(null); // Or handle as an error, though getLogicHandNotation should be robust
      logGameState("Correct Action Not Set - Invalid Hand Notation", { hand: newHand });
    }
  }, [
    generateNewHand, 
    selectSituationAndPosition, 
    getLogicAvailableActions, 
    getLogicHandNotation, // Added dependency
    getLogicCorrectDecision, // Added dependency
    setHand, 
    setSituationKey, 
    setPositionKey, 
    setSituationDisplay, 
    setPositionDisplay, 
    setAvailableActions, 
    logGameState,
    setGameOver, // Added setGameOver as a dependency
    // setCurrentCorrectAction is not needed in deps as it's a setter from useState
    timerDuration, // Added timerDuration as a dependency for setting timeLeft
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
    setLastAnswerCorrectness('CORRECT'); // Set for correct decision
    logGameState("Correct Decision", { points, newStreak: streak + 1, currentScore: newScore });

    // Add this timeout
    setTimeout(() => {
      setLastAnswerCorrectness(null);
    }, 1400);
  }, [streak, score, setScore, setStreak, updateHighScore, logGameState]); // setLastAnswerCorrectness is stable

  const handleIncorrectDecision = useCallback((correctDecision, yourChoice, handNotation) => {
    logGameState("Incorrect Decision", { correctDecision, yourChoice, handNotation, position: positionDisplay, situation: situationDisplay });
    setStreak(0);
    setLastAnswerCorrectness('INCORRECT'); // Set for incorrect decision
    decrementLives();
    setWrongChoices((prevWrongChoices) => [
      ...prevWrongChoices,
      { handNotation, position: positionDisplay, situation: situationDisplay, correctDecision, yourChoice, situationKey: situationKey, positionKey: positionKey },
    ]);

    // Add this timeout
    setTimeout(() => {
      setLastAnswerCorrectness(null);
    }, 1400);
  }, [decrementLives, setStreak, setWrongChoices, positionDisplay, situationDisplay, logGameState, situationKey, positionKey]);
  
  const makeDecision = useCallback((decision) => {
    if (gameOver) {
      logGameState("Decision Attempted - Game Over");
      return; // Don't process decisions if game is over
    }
    setIsTimerActive(false); // Stop the timer as soon as a decision is made
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
    // Note: setGameOver updates the state, but gameOverRef.current might be more immediate for the timeout logic below.
    if (!isCorrect && lives - 1 <= 0) {
        setGameOver(true); // This will trigger the useEffect to update gameOverRef
        logGameState("Game Over");
        setCurrentCorrectAction(null); // Reset on game over
    } else {
        setCurrentCorrectAction(null); // Reset before new hand if not game over
    }

    // Common logic for post-decision: wait 1.5s then deal new hand if not game over
    setTimeout(() => {
      if (!gameOverRef.current) { // Check the ref here
        dealNewHand();
      }
    }, 1500);
  }, 
  [
    hand, situationKey, positionKey, gameOver, lives, wrongChoices.length, // Include all dependencies
    getLogicHandNotation, getLogicCorrectDecision, 
    handleCorrectDecision, handleIncorrectDecision, 
    dealNewHand, setGameOver, logGameState,
    // Added situationKey, positionKey as they are used in getLogicCorrectDecision
    situationKey, positionKey
    // setCurrentCorrectAction is not needed in deps
    // gameOver is a dependency because its direct value is used for the immediate logic within makeDecision (though ref is for timeout)
  ]);

  const restartGame = useCallback(() => {
    logGameState("Restarting Game");
    setIsTimerActive(false); // Stop any existing timer
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
      setIsTimerActive(false); // Stop timer on game over
      logGameState("Game Over - Lives Depleted");
    }
  }, [lives, gameOver, setGameOver, logGameState]);

  // useEffect to reset lastAnswerCorrectness when gameOver becomes true
  useEffect(() => {
    if (gameOver) {
      setLastAnswerCorrectness(null);
    }
  }, [gameOver]);

  // useEffect to update timerDuration when difficulty changes
  useEffect(() => {
    setTimerDuration(DIFFICULTY_LEVELS[difficulty].timerDuration);
    // When difficulty changes, the timer for the current hand should ideally reset or adapt.
    // For now, it will affect the *next* hand's timerDuration.
    // If immediate reset is needed, setTimeLeft(DIFFICULTY_LEVELS[difficulty].timerDuration) here.
  }, [difficulty]);

  // Timer logic useEffect
  useEffect(() => {
    let interval = null;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    } else if (isTimerActive && timeLeft === 0) {
      setIsTimerActive(false);
      logGameState("Timer Expired");
      handleIncorrectDecision('TIMEOUT', 'No decision', getLogicHandNotation(hand) || 'N/A');
      
      // Check for game over after timeout
      if (lives - 1 <= 0) {
        setGameOver(true);
        logGameState("Game Over - Timer expired on last life");
      } else {
        // Delay slightly before dealing new hand to allow state updates (like score/lives) to be seen
        setTimeout(() => dealNewHand(), 500); 
      }
    }
    return () => clearInterval(interval); // Cleanup interval on unmount or re-render
  }, [isTimerActive, timeLeft, lives, hand, handleIncorrectDecision, dealNewHand, getLogicHandNotation, setGameOver, logGameState]);


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
    difficulty, // Export difficulty
    setDifficulty, // Export setDifficulty
    hints, // Export hints
    decrementHints, // Export decrementHints
    timerDuration, // Export timerDuration
    currentCorrectAction, // Export currentCorrectAction
    lastAnswerCorrectness, // Export lastAnswerCorrectness
    timeLeft, // Export timeLeft
  };
};

export default usePokerGame;
