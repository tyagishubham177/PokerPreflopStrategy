import { useState, useCallback } from "react";

// This hook manages the primary game state.
const useGameState = () => {
  const [hand, setHand] = useState([]); // Player's current cards
  const [situationKey, setSituationKey] = useState(""); // Key for the current game situation (e.g., "RFI")
  const [positionKey, setPositionKey] = useState(""); // Key for the player's current position (e.g., "UTG")
  const [situationDisplay, setSituationDisplay] = useState(""); // User-friendly situation label
  const [positionDisplay, setPositionDisplay] = useState(""); // User-friendly position label
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      const savedHighScore = localStorage.getItem("highScore");
      // Ensure savedHighScore is not null and parseInt result is a number
      const parsedHighScore = parseInt(savedHighScore, 10);
      return savedHighScore && !isNaN(parsedHighScore) ? parsedHighScore : 0;
    } catch (error) {
      console.error("Error reading highScore from localStorage:", error);
      return 0; // Fallback to 0 if localStorage is inaccessible or value is corrupted
    }
  });
  const [streak, setStreak] = useState(0);
  const [wrongChoices, setWrongChoices] = useState([]); // Array of incorrect decisions made by the player
  const [gameOver, setGameOver] = useState(false);
  const [availableActions, setAvailableActions] = useState([]); // Possible actions for the current hand
  const [difficulty, setDifficulty] = useState("medium"); 
  const [hints, setHints] = useState(0);
  const [timer, setTimer] = useState(0);
  const [highlightedAction, setHighlightedAction] = useState(null);
  const [answerFeedback, setAnswerFeedback] = useState(null);

  const updateHighScore = useCallback((newScore) => {
    setHighScore((prevHighScore) => {
      const updatedHighScore = Math.max(prevHighScore, newScore);
      try {
        localStorage.setItem("highScore", updatedHighScore.toString());
      } catch (error) {
        console.error("Error writing highScore to localStorage:", error);
        // The highScore state will still update in React, but localStorage might not.
      }
      return updatedHighScore;
    });
  }, []);

  const resetGameScoreAndStats = useCallback(() => {
    setScore(0);
    setStreak(0);
    setWrongChoices([]);
  }, []);
  
  const decrementLives = useCallback(() => {
    setLives((prevLives) => prevLives - 1);
  }, []);

  const resetLives = useCallback((numLives) => {
    setLives(numLives);
  }, []);

  const decrementHints = useCallback(() => setHints((prevHints) => Math.max(0, prevHints - 1)), []);
  const resetTimer = useCallback((duration) => setTimer(duration), []);

  return {
    // State values
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
    answerFeedback,

    // State setters
    setHand,
    setSituationKey,
    setPositionKey,
    setSituationDisplay,
    setPositionDisplay,
    setLives, // Direct setter for lives, though decrementLives/resetLives are preferred
    setScore,
    setHighScore, // Direct setter, though updateHighScore is preferred for typical updates
    updateHighScore, // Specific updater for high score logic
    setStreak,
    setWrongChoices,
    setGameOver,
    setAvailableActions,
    setDifficulty,
    setHints,
    setTimer,
    setHighlightedAction,
    setAnswerFeedback,
    
    // Specific game action state updaters
    decrementLives,
    resetLives,
    resetGameScoreAndStats,
    decrementHints,
    resetTimer,
  };
};

export default useGameState;
