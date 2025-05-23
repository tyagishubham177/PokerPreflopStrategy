import { useState, useEffect, useCallback, useRef } from "react";
import useGameState from "./useGameState";
import useGameLogic from "./useGameLogic";
import { DIFFICULTY_SETTINGS } from "../../Constants/GameConstants"; // 1. Import

const usePokerGame = ({ showSettings, showRules }) => { // 1. Argument Update
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
    difficulty, // 1. Destructure new states
    hints,
    timer,
    highlightedAction,
    answerFeedback,
    setHand,
    setSituationKey,
    setPositionKey,
    setSituationDisplay,
    setPositionDisplay,
    setLives,
    setScore,
    updateHighScore,
    setStreak,
    setWrongChoices,
    setGameOver,
    setAvailableActions,
    resetGameScoreAndStats,
    decrementLives,
    resetLives,
    setDifficulty, // 1. Destructure new setters
    setHints,
    setTimer,
    decrementHints,
    resetTimer,
    setHighlightedAction,
    setAnswerFeedback,
  } = useGameState();

  const {
    generateNewHand,
    selectSituationAndPosition,
    getLogicAvailableActions,
    getLogicCorrectDecision,
    getLogicHandNotation,
  } = useGameLogic();

  const dealCount = useRef(0);
  const timerIdRef = useRef(null); // 5. Timer Logic

  // 10. logGameState function
  const logGameState = useCallback(() => {
    dealCount.current += 1;
    console.log(`Game State Update #${dealCount.current}: Hand: ${hand}, Situation: ${situationKey}, Position: ${positionKey}`);
  }, [dealCount, hand, situationKey, positionKey]);

  // 4. dealNewHand Function
  const dealNewHand = useCallback(() => {
    logGameState();
    const newHand = generateNewHand();
    const {
      selectedSituationKey,
      selectedPositionKey,
      selectedSituationDisplay,
      selectedPositionDisplay,
    } = selectSituationAndPosition();
    const currentAvailableActions = getLogicAvailableActions(selectedSituationKey);

    setHand(newHand);
    setSituationKey(selectedSituationKey);
    setPositionKey(selectedPositionKey);
    setSituationDisplay(selectedSituationDisplay);
    setPositionDisplay(selectedPositionDisplay);
    setAvailableActions(currentAvailableActions);
    setGameOver(false); // Ensure game is not over when new hand is dealt

    // Difficulty-specific timer reset
    const currentDifficultySettings = DIFFICULTY_SETTINGS[difficulty] || DIFFICULTY_SETTINGS.medium;
    resetTimer(currentDifficultySettings.timerDuration);
    setHighlightedAction(null); // Clear any previous highlights

  }, [
    difficulty, // Added
    resetTimer, // Added
    setHighlightedAction, // Added
    generateNewHand, 
    selectSituationAndPosition, 
    getLogicAvailableActions, 
    setHand, 
    setSituationKey, 
    setPositionKey, 
    setSituationDisplay, 
    setPositionDisplay, 
    setAvailableActions, 
    logGameState, // logGameState is stable
    setGameOver // Added
  ]);

  // 3. restartGame Function
  const restartGame = useCallback(() => {
    logGameState();
    const settings = DIFFICULTY_SETTINGS[difficulty] || DIFFICULTY_SETTINGS.medium;

    resetLives(settings.lives);
    setHints(settings.hints);
    resetTimer(settings.timerDuration);
    resetGameScoreAndStats();
    setGameOver(false);
    setHighlightedAction(null);
    setAnswerFeedback(null);
    dealCount.current = 0; // Reset deal count
    dealNewHand();
  }, [
    difficulty, 
    logGameState, // Stable
    resetLives, 
    setHints, 
    resetTimer, 
    resetGameScoreAndStats, 
    setGameOver, 
    setHighlightedAction, 
    setAnswerFeedback, 
    dealNewHand // dealNewHand is stable
  ]);

  // 2. State Initialization and Game Setup Effects
  // Effect 1: Load Difficulty from localStorage on mount
  useEffect(() => {
    const savedDifficulty = localStorage.getItem('gameDifficulty') || "medium";
    setDifficulty(savedDifficulty);
  }, [setDifficulty]); // Dependency: setDifficulty (stable)

  // Effect 2: Restart game when difficulty changes
  useEffect(() => {
    // Only restart if difficulty is actually set (not during initial undefined state perhaps)
    if (difficulty) {
        console.log("Difficulty changed to:", difficulty, "Restarting game.");
        restartGame();
    }
  }, [difficulty, restartGame]); // Dependencies: difficulty, restartGame (restartGame is stable)


  // 5. Timer Logic useEffect
  useEffect(() => {
    if (timer > 0 && !gameOver && !showSettings && !showRules) {
      timerIdRef.current = setInterval(() => {
        setTimer(t => t - 1);
      }, 1000);
    } else if (timer === 0 && !gameOver && hand.length === 2 && !showSettings && !showRules) { // Ensure hand is present
      const handNotation = getLogicHandNotation(hand);
      // Pass additional info for context, ensuring these are available and correctly passed
      handleIncorrectDecision("Timer Expired", "Timeout", handNotation, positionDisplay, situationDisplay);
    }
    return () => clearInterval(timerIdRef.current);
  }, [timer, gameOver, showSettings, showRules, setTimer, handleIncorrectDecision, hand, getLogicHandNotation, positionDisplay, situationDisplay]);


  // 7. handleCorrectDecision Modifications
  const handleCorrectDecision = useCallback(() => {
    const newScore = score + 10; // Example scoring
    const newStreak = streak + 1;
    setScore(newScore);
    setStreak(newStreak);
    updateHighScore(newScore);
    logGameState();
    setAnswerFeedback("correct");
    setTimeout(() => setAnswerFeedback(null), 1500);
    // Optionally, deal a new hand automatically or wait for user input
    // dealNewHand(); 
  }, [score, streak, setScore, setStreak, updateHighScore, logGameState, setAnswerFeedback]);

  // 7. handleIncorrectDecision Modifications
  const handleIncorrectDecision = useCallback((actionTaken, correctDecision, handNotation, currentPositionDisplay, currentSituationDisplay) => {
    logGameState();
    setStreak(0);
    decrementLives();
    setWrongChoices(prev => [...prev, { actionTaken, correctDecision, hand: handNotation, position: currentPositionDisplay, situation: currentSituationDisplay }]);
    setAnswerFeedback("incorrect");
    setTimeout(() => setAnswerFeedback(null), 1500);
  }, [logGameState, setStreak, decrementLives, setWrongChoices, setAnswerFeedback]); // Removed positionDisplay, situationDisplay from deps as they are passed as args now


  // 6. makeDecision Function Modifications
  const makeDecision = useCallback((action) => {
    if (gameOver) return;
    logGameState();

    const handNotation = getLogicHandNotation(hand);
    const correctDecision = getLogicCorrectDecision(handNotation, situationKey, positionKey);

    if (action === correctDecision) {
      handleCorrectDecision();
    } else {
      handleIncorrectDecision(action, correctDecision, handNotation, positionDisplay, situationDisplay);
    }

    setHighlightedAction(null); // Clear highlight after decision

    if (lives -1 === 0 && action !== correctDecision) { // Check if game over due to this incorrect decision
        setGameOver(true);
    } else if (action === correctDecision) { // Only deal new hand on correct decision
        dealNewHand();
    }
    // If incorrect, player stays on the same hand until timer runs out or they get it right (if that's the desired mechanic)
    // For this setup, an incorrect answer doesn't auto-deal; it waits for timer or next action.

  }, [
    gameOver, 
    logGameState, // Stable
    lives, 
    getLogicHandNotation, // Stable
    hand, 
    situationKey, 
    positionKey, 
    getLogicCorrectDecision, // Stable
    handleCorrectDecision, // Stable
    handleIncorrectDecision, // Stable
    dealNewHand, // Stable
    setGameOver,
    setHighlightedAction, // Added
    positionDisplay, // Added for passing to handleIncorrectDecision
    situationDisplay // Added for passing to handleIncorrectDecision
  ]);

  // 8. useHint Function
  const useHint = useCallback(() => {
    if (hints > 0 && !highlightedAction && !gameOver && hand.length === 2) {
      decrementHints();
      const handNotation = getLogicHandNotation(hand);
      if (handNotation && situationKey && positionKey) {
        const correctDecision = getLogicCorrectDecision(handNotation, situationKey, positionKey);
        setHighlightedAction(correctDecision);
      } else {
        console.warn("Could not provide hint: missing hand notation, situation, or position key.");
      }
    }
  }, [
    hints, 
    highlightedAction, 
    gameOver, 
    hand, 
    decrementHints, 
    getLogicHandNotation, // Stable
    situationKey, 
    positionKey, 
    getLogicCorrectDecision, // Stable
    setHighlightedAction
  ]);

  // 9. isInitialMount ref is removed.

  return {
    // Existing states and functions
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
    makeDecision,
    restartGame, // Ensure restartGame is exported
    // 11. Export New Values
    difficulty,
    hints,
    timer,
    useHint,
    highlightedAction,
    answerFeedback,
    // Also exporting setters and other functions if they need to be accessed from UI directly
    // For example, if settings tab directly modifies difficulty or other states.
    // setDifficulty, setHints, setTimer (usually managed by game logic, but can be exposed)
  };
};

export default usePokerGame;
