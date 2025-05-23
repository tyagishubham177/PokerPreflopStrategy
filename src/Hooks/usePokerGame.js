import { useState, useEffect, useCallback, useRef } from "react";
import useGameState from "./useGameState";
import useGameLogic from "./useGameLogic";
import { DIFFICULTY_SETTINGS } from "../../Constants/GameConstants";

const usePokerGame = ({ showSettings, showRules }) => {
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
    difficulty, 
    hints,
    timer,
    highlightedAction,
    answerFeedback, // Included
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
    setDifficulty, 
    setHints,
    setTimer,
    decrementHints,
    resetTimer,
    setHighlightedAction,
    setAnswerFeedback, // Included
  } = useGameState();

  const {
    generateNewHand,
    selectSituationAndPosition,
    getLogicAvailableActions,
    getLogicCorrectDecision,
    getLogicHandNotation,
  } = useGameLogic();

  const dealCount = useRef(0);
  const timerIdRef = useRef(null); 

  const logGameState = useCallback(() => {
    dealCount.current += 1;
    // console.log(`Game State Update #${dealCount.current}: Hand: ${hand}, Situation: ${situationKey}, Position: ${positionKey}`);
  }, [dealCount, hand, situationKey, positionKey]);

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
    setGameOver(false); 

    const currentDifficultySettings = DIFFICULTY_SETTINGS[difficulty] || DIFFICULTY_SETTINGS.medium;
    resetTimer(currentDifficultySettings.timerDuration);
    setHighlightedAction(null); 
    // setAnswerFeedback(null); // Do not clear feedback on new hand, let it timeout
  }, [
    difficulty, 
    resetTimer, 
    setHighlightedAction, 
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
    setGameOver 
  ]);

  const restartGame = useCallback(() => {
    logGameState();
    const settings = DIFFICULTY_SETTINGS[difficulty] || DIFFICULTY_SETTINGS.medium;

    resetLives(settings.lives);
    setHints(settings.hints);
    resetTimer(settings.timerDuration);
    resetGameScoreAndStats();
    setGameOver(false);
    setHighlightedAction(null);
    setAnswerFeedback(null); // Clear feedback on restart
    dealCount.current = 0; 
    dealNewHand();
  }, [
    difficulty, 
    logGameState, 
    resetLives, 
    setHints, 
    resetTimer, 
    resetGameScoreAndStats, 
    setGameOver, 
    setHighlightedAction, 
    setAnswerFeedback, 
    dealNewHand 
  ]);

  useEffect(() => {
    const savedDifficulty = localStorage.getItem('gameDifficulty') || "medium";
    setDifficulty(savedDifficulty);
  }, [setDifficulty]); 

  useEffect(() => {
    if (difficulty) {
        // console.log("Difficulty changed to:", difficulty, "Restarting game.");
        restartGame();
    }
  }, [difficulty, restartGame]); 

  useEffect(() => {
    if (lives <= 0 && !gameOver) { 
      setGameOver(true);
    }
  }, [lives, gameOver, setGameOver]);


  useEffect(() => {
    if (timer > 0 && !gameOver && !showSettings && !showRules) {
      timerIdRef.current = setInterval(() => {
        setTimer(t => t - 1);
      }, 1000);
    } else if (timer === 0 && !gameOver && hand.length === 2 && !showSettings && !showRules) { 
      const handNotation = getLogicHandNotation(hand);
      handleIncorrectDecision("Timer Expired", "Timeout", handNotation, positionDisplay, situationDisplay);
      
      if (lives > 1) { 
        dealNewHand();
      }
    } else {
      clearInterval(timerIdRef.current); 
    }
    
    return () => {
      clearInterval(timerIdRef.current);
    };
  }, [timer, gameOver, showSettings, showRules, setTimer, handleIncorrectDecision, hand, getLogicHandNotation, positionDisplay, situationDisplay, difficulty, lives, dealNewHand, setGameOver]);


  const handleCorrectDecision = useCallback(() => {
    const newScore = score + 10; 
    const newStreak = streak + 1;
    setScore(newScore);
    setStreak(newStreak);
    updateHighScore(newScore);
    logGameState();
    setAnswerFeedback("correct"); // Sets feedback
    setTimeout(() => setAnswerFeedback(null), 2500); // Increased duration
    // dealNewHand(); // Usually call dealNewHand after correct decision
  }, [score, streak, setScore, setStreak, updateHighScore, logGameState, setAnswerFeedback]);

  const handleIncorrectDecision = useCallback((actionTaken, correctDecision, handNotation, currentPositionDisplay, currentSituationDisplay) => {
    logGameState();
    setStreak(0);
    decrementLives();
    setWrongChoices(prev => [...prev, { actionTaken, correctDecision, hand: handNotation, position: currentPositionDisplay, situation: currentSituationDisplay }]);
    setAnswerFeedback("incorrect"); // Sets feedback
    setTimeout(() => setAnswerFeedback(null), 2500); // Increased duration
  }, [logGameState, setStreak, decrementLives, setWrongChoices, setAnswerFeedback]); 


  const makeDecision = useCallback((action) => {
    if (gameOver) return;
    logGameState();

    const handNotation = getLogicHandNotation(hand);
    const correctDecision = getLogicCorrectDecision(handNotation, situationKey, positionKey);

    if (action === correctDecision) {
      handleCorrectDecision();
      // IMPORTANT: Deal new hand only on correct decision for this game's flow
      dealNewHand(); 
    } else {
      handleIncorrectDecision(action, correctDecision, handNotation, positionDisplay, situationDisplay);
    }

    setHighlightedAction(null); 

    // Game over check is now primarily handled by the useEffect watching `lives`.
    // However, an explicit check might be needed if a wrong action itself ends the game before lives are 0 (not typical).
    // For instance, if lives was 1, and wrong action taken, lives becomes 0.
    // The useEffect for lives will set gameOver.
    // if (lives -1 === 0 && action !== correctDecision) { 
    //     setGameOver(true);
    // }
  }, [
    gameOver, 
    logGameState, 
    lives, 
    getLogicHandNotation, 
    hand, 
    situationKey, 
    positionKey, 
    getLogicCorrectDecision, 
    handleCorrectDecision, 
    handleIncorrectDecision, 
    dealNewHand, 
    setGameOver,
    setHighlightedAction, 
    positionDisplay, 
    situationDisplay 
  ]);

  const useHint = useCallback(() => {
    if (hints > 0 && !highlightedAction && !gameOver && hand.length === 2) {
      decrementHints();
      const handNotation = getLogicHandNotation(hand);
      if (handNotation && situationKey && positionKey) {
        const correctDecision = getLogicCorrectDecision(handNotation, situationKey, positionKey);
        setHighlightedAction(correctDecision);
      } else {
        // console.warn("Could not provide hint: missing hand notation, situation, or position key.");
      }
    }
  }, [
    hints, 
    highlightedAction, 
    gameOver, 
    hand, 
    decrementHints, 
    getLogicHandNotation, 
    situationKey, 
    positionKey, 
    getLogicCorrectDecision, 
    setHighlightedAction,
    availableActions 
  ]);


  return {
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
    restartGame, 
    difficulty,
    hints,
    timer,
    useHint,
    highlightedAction,
    answerFeedback,
  };
};

export default usePokerGame;
