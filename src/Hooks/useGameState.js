import { useState, useCallback, useEffect } from "react";
import { DIFFICULTY_LEVELS } from "../Constants/GameConstants";

const SOUND_SETTINGS_LS_KEY = 'soundSettings';

const useGameState = () => {
  const [hand, setHand] = useState([]);
  const [situationKey, setSituationKey] = useState("");
  const [positionKey, setPositionKey] = useState("");
  const [situationDisplay, setSituationDisplay] = useState("");
  const [positionDisplay, setPositionDisplay] = useState("");
  const [difficulty, setDifficultyState] = useState(() => {
    try {
      const savedSettings = localStorage.getItem(SOUND_SETTINGS_LS_KEY);
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        if (settings.difficulty && Object.keys(DIFFICULTY_LEVELS).includes(settings.difficulty)) {
          return settings.difficulty;
        }
      }
    } catch (error) {
      console.error("Failed to load difficulty from localStorage:", error);
    }
    return "Medium";
  });
  const [lives, setLives] = useState(DIFFICULTY_LEVELS[difficulty].lives);
  const [hints, setHints] = useState(DIFFICULTY_LEVELS[difficulty].hints);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      const savedHighScore = localStorage.getItem("highScore");
      const parsedHighScore = parseInt(savedHighScore, 10);
      return savedHighScore && !isNaN(parsedHighScore) ? parsedHighScore : 0;
    } catch (error) {
      console.error("Error reading highScore from localStorage:", error);
      return 0;
    }
  });
  const [streak, setStreak] = useState(0);
  const [wrongChoices, setWrongChoices] = useState([]);
  useEffect(() => {
    setLives(DIFFICULTY_LEVELS[difficulty].lives);
    setHints(DIFFICULTY_LEVELS[difficulty].hints);
  }, [difficulty]);

  const [gameOver, setGameOver] = useState(false);
  const [availableActions, setAvailableActions] = useState([]);
  const [isPaused, setIsPaused] = useState(false);

  const updateHighScore = useCallback((newScore) => {
    setHighScore((prevHighScore) => {
      const updatedHighScore = Math.max(prevHighScore, newScore);
      try {
        localStorage.setItem("highScore", updatedHighScore.toString());
      } catch (error) {
        console.error("Error writing highScore to localStorage:", error);
      }
      return updatedHighScore;
    });
  }, []);

  const resetGameScoreAndStats = useCallback(() => {
    setScore(0);
    setStreak(0);
    setWrongChoices([]);
    setHints(DIFFICULTY_LEVELS[difficulty].hints);
  }, [difficulty]);

  const setDifficulty = useCallback((newDifficulty) => {
    if (DIFFICULTY_LEVELS[newDifficulty]) {
      setDifficultyState(newDifficulty);
      setLives(DIFFICULTY_LEVELS[newDifficulty].lives);
      setHints(DIFFICULTY_LEVELS[newDifficulty].hints);
    } else {
      console.warn(`Attempted to set unknown difficulty: ${newDifficulty}`);
    }
  }, []);

  const decrementHints = useCallback(() => {
    setHints(prevHints => Math.max(0, prevHints - 1));
  }, []);
  
  const decrementLives = useCallback(() => {
    setLives((prevLives) => prevLives - 1);
  }, []);

  const resetLives = useCallback(() => {
    setLives(DIFFICULTY_LEVELS[difficulty].lives);
  }, [difficulty]);

  const stateValues = {
    hand,
    situationKey,
    positionKey,
    situationDisplay,
    positionDisplay,
    difficulty,
    lives,
    hints,
    score,
    highScore,
    streak,
    wrongChoices,
    gameOver,
    availableActions,
    isPaused,
  };

  const stateSetters = {
    setHand,
    setSituationKey,
    setPositionKey,
    setSituationDisplay,
    setPositionDisplay,
    setLives,
    setHints,
    setScore,
    setHighScore,
    setIsPaused,
    setStreak,
    setWrongChoices,
    setGameOver,
    setAvailableActions,
  };

  const gameActions = {
    setDifficulty,
    updateHighScore,
    resetGameScoreAndStats,
    decrementHints,
    decrementLives,
    resetLives,
  };

  return {
    ...stateValues,
    ...stateSetters,
    ...gameActions,
  };
};

export default useGameState;
