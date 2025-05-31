import { useState, useEffect, useCallback, useRef } from "react";
import useGameState from "./useGameState";
import useGameLogic from "./useGameLogic";
import { DIFFICULTY_LEVELS } from "../Constants/GameConstants";

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
    setScore,
    updateHighScore,
    setStreak,
    setWrongChoices,
    setGameOver,
    setAvailableActions,
    decrementLives,
    resetLives,
    resetGameScoreAndStats,
    difficulty,
    setDifficulty,
    hints,
    decrementHints,
    isPaused,
    setIsPaused,
  } = useGameState();

  const {
    generateNewHand,
    selectSituationAndPosition,
    getAvailableActions: getLogicAvailableActions,
    getCorrectDecision: getLogicCorrectDecision,
    getHandNotation: getLogicHandNotation,
  } = useGameLogic();

  const [showRules, setShowRules] = useState(false);
  const [timerDuration, setTimerDuration] = useState(DIFFICULTY_LEVELS[difficulty].timerDuration);
  const [currentCorrectAction, setCurrentCorrectAction] = useState(null);
  const [lastAnswerCorrectness, setLastAnswerCorrectness] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const gameOverRef = useRef(gameOver);
  const isInitialMount = useRef(true);
  const dealCount = useRef(0);
  const [isTimerVisible, setIsTimerVisible] = useState(true);

  useEffect(() => {
    gameOverRef.current = gameOver;
  }, [gameOver]);

  const logGameState = useCallback((action, details = {}) => {
    console.log(`[PokerGame - ${action}]`, { ...details, dealCount: dealCount.current });
  }, []);

  const togglePausePlay = useCallback(() => {
    setIsPaused(prevIsPaused => !prevIsPaused);
    logGameState(!isPaused ? "Game Paused" : "Game Resumed");
  }, [setIsPaused, logGameState, isPaused]);

  const toggleTimerVisibility = useCallback(() => {
    setIsTimerVisible(prev => !prev);
  }, []);

  const dealNewHand = useCallback(() => {
    setLastAnswerCorrectness(null);
    setTimeLeft(timerDuration);
    setIsTimerActive(true);
    dealCount.current += 1;
    logGameState("Dealing New Hand", { timerDuration });

    const newHand = generateNewHand();
    setHand(newHand);

    const { newSituationKey, newPositionKey, newSituationDisplay, newPositionDisplay } = selectSituationAndPosition();

    if (newSituationKey.startsWith("ERROR_") || newPositionKey.startsWith("ERROR_")) {
      logGameState("Critical Error: Failed to select situation/position", { newSituationKey, newPositionKey });
      setSituationDisplay(newSituationDisplay || "Error");
      setPositionDisplay(newPositionDisplay || "Error");
      setAvailableActions(["Fold"]);
      setGameOver(true);
      return;
    }

    setSituationKey(newSituationKey);
    setPositionKey(newPositionKey);
    setSituationDisplay(newSituationDisplay);
    setPositionDisplay(newPositionDisplay);

    const newActions = getLogicAvailableActions(newSituationKey, newPositionKey);
    setAvailableActions(newActions);

    const handNotation = getLogicHandNotation(newHand);
    if (handNotation && handNotation !== "") {
      const correctAction = getLogicCorrectDecision(handNotation, newSituationKey, newPositionKey);
      setCurrentCorrectAction(correctAction);
      logGameState("Correct Action Set", { correctAction });
    } else {
      setCurrentCorrectAction(null);
      logGameState("Correct Action Not Set - Invalid Hand Notation", { hand: newHand });
    }
  }, [
    generateNewHand,
    selectSituationAndPosition,
    getLogicAvailableActions,
    getLogicHandNotation,
    getLogicCorrectDecision,
    setHand,
    setSituationKey,
    setPositionKey,
    setSituationDisplay,
    setPositionDisplay,
    setAvailableActions,
    logGameState,
    setGameOver,
    timerDuration,
  ]);

  useEffect(() => {
    if (isInitialMount.current) {
      logGameState("Initial Mount - First Deal");
      isInitialMount.current = false;
      dealNewHand();
    }
  }, [dealNewHand, logGameState]);


  const handleCorrectDecision = useCallback(() => {
    const points = 10 * (1 + streak * 0.1);
    const newScore = score + points;
    setScore(newScore);
    setStreak((prevStreak) => prevStreak + 1);
    updateHighScore(newScore);
    setLastAnswerCorrectness('CORRECT');
    logGameState("Correct Decision", { points, newStreak: streak + 1, currentScore: newScore });

    setTimeout(() => {
      setLastAnswerCorrectness(null);
    }, 1400);
  }, [streak, score, setScore, setStreak, updateHighScore, logGameState]);

  const handleIncorrectDecision = useCallback((correctDecision, yourChoice, handNotation) => {
    logGameState("Incorrect Decision", { correctDecision, yourChoice, handNotation, position: positionDisplay, situation: situationDisplay });
    setStreak(0);
    setLastAnswerCorrectness('INCORRECT');
    decrementLives();
    setWrongChoices((prevWrongChoices) => [
      ...prevWrongChoices,
      { handNotation, position: positionDisplay, situation: situationDisplay, correctDecision, yourChoice, situationKey: situationKey, positionKey: positionKey },
    ]);

    setTimeout(() => {
      setLastAnswerCorrectness(null);
    }, 1400);
  }, [decrementLives, setStreak, setWrongChoices, positionDisplay, situationDisplay, logGameState, situationKey, positionKey]);

  const makeDecision = useCallback((decision) => {
    if (gameOver) {
      logGameState("Decision Attempted - Game Over");
      return;
    }
    setIsTimerActive(false);
    logGameState("Decision Made", { decision, currentLives: lives, numWrongChoices: wrongChoices.length });

    const handNotation = getLogicHandNotation(hand);

    if (handNotation === "") {
      logGameState("Error: Invalid hand notation for decision making.", { hand });
      handleIncorrectDecision("Unknown", decision, "Invalid Hand");
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

    if (!isCorrect && lives - 1 <= 0) {
        setGameOver(true);
        logGameState("Game Over");
        setCurrentCorrectAction(null);
    } else {
        setCurrentCorrectAction(null);
    }

    setTimeout(() => {
      if (!gameOverRef.current) {
        dealNewHand();
      }
    }, 2000);
  },
  [
    hand, situationKey, positionKey, gameOver, lives, wrongChoices.length,
    getLogicHandNotation, getLogicCorrectDecision,
    handleCorrectDecision, handleIncorrectDecision,
    dealNewHand, setGameOver, logGameState,
    situationKey, positionKey
  ]);

  const restartGame = useCallback(() => {
    logGameState("Restarting Game");
    setIsTimerActive(false);
    resetLives();
    resetGameScoreAndStats();
    setGameOver(false);
    dealCount.current = 0;
    dealNewHand();
  }, [resetLives, resetGameScoreAndStats, setGameOver, dealNewHand, logGameState]);

  useEffect(() => {
    if (lives <= 0 && !gameOver) {
      setGameOver(true);
      setIsTimerActive(false);
      logGameState("Game Over - Lives Depleted");
    }
  }, [lives, gameOver, setGameOver, logGameState]);

  useEffect(() => {
    if (gameOver) {
      setLastAnswerCorrectness(null);
    }
  }, [gameOver]);

  useEffect(() => {
    setTimerDuration(DIFFICULTY_LEVELS[difficulty].timerDuration);
  }, [difficulty]);

  useEffect(() => {
    let interval = null;
    if (isTimerActive && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    } else if (isTimerActive && !isPaused && timeLeft === 0) {
      setIsTimerActive(false);
      logGameState("Timer Expired");
      handleIncorrectDecision(currentCorrectAction, 'No decision', getLogicHandNotation(hand) || 'N/A');
      
      if (lives - 1 <= 0) {
        setGameOver(true);
        logGameState("Game Over - Timer expired on last life");
      } else {
        setTimeout(() => dealNewHand(), 500);
      }
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isTimerActive, timeLeft, isPaused, lives, hand, handleIncorrectDecision, dealNewHand, getLogicHandNotation, setGameOver, logGameState, currentCorrectAction, setIsTimerActive]);


  return {
    hand,
    position: positionDisplay,
    lives,
    score,
    highScore,
    streak,
    gameOver,
    showRules,
    setShowRules,
    situation: situationDisplay,
    availableActions,
    makeDecision,
    restartGame,
    wrongChoices,
    difficulty,
    setDifficulty,
    hints,
    decrementHints,
    timerDuration,
    currentCorrectAction,
    lastAnswerCorrectness,
    timeLeft,
    isPaused,
    togglePausePlay,
    isTimerVisible,
    toggleTimerVisibility,
  };
};

export default usePokerGame;
