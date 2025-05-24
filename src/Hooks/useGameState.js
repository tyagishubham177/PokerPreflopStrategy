import { useState, useCallback } from "react";
import { DIFFICULTY_LEVELS } from "../Constants/GameConstants";

// This hook manages the primary game state.
const useGameState = () => {
  const [hand, setHand] = useState([]); // Player's current cards
  const [situationKey, setSituationKey] = useState(""); // Key for the current game situation (e.g., "RFI")
  const [positionKey, setPositionKey] = useState(""); // Key for the player's current position (e.g., "UTG")
  const [situationDisplay, setSituationDisplay] = useState(""); // User-friendly situation label
  const [positionDisplay, setPositionDisplay] = useState(""); // User-friendly position label
  const [difficulty, setDifficultyState] = useState("Medium"); // Default difficulty
  const [lives, setLives] = useState(DIFFICULTY_LEVELS.Medium.lives); // Initialize lives based on default difficulty
  const [hints, setHints] = useState(DIFFICULTY_LEVELS[difficulty].hints); // Initialize hints
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
  const [isPaused, setIsPaused] = useState(false); // Added for pause/play functionality

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
    setHints(DIFFICULTY_LEVELS[difficulty].hints); // Reset hints
  }, [difficulty]); // Add difficulty as a dependency

  const setDifficulty = useCallback((newDifficulty) => {
    if (DIFFICULTY_LEVELS[newDifficulty]) {
      setDifficultyState(newDifficulty);
      setLives(DIFFICULTY_LEVELS[newDifficulty].lives);
      setHints(DIFFICULTY_LEVELS[newDifficulty].hints); // Reset hints on difficulty change
    } else {
      console.warn(`Attempted to set unknown difficulty: ${newDifficulty}`);
    }
  }, []); // No need for DIFFICULTY_LEVELS in dependency array as it's a constant import

  const decrementHints = useCallback(() => {
    setHints(prevHints => Math.max(0, prevHints - 1));
  }, []);
  
  const decrementLives = useCallback(() => {
    setLives((prevLives) => prevLives - 1);
  }, []);

  const resetLives = useCallback(() => {
    setLives(DIFFICULTY_LEVELS[difficulty].lives); // Reset lives based on current difficulty
  }, [difficulty]); // Add difficulty as a dependency

  return {
    // State values
    hand,
    situationKey,
    positionKey,
    situationDisplay,
    positionDisplay,
    difficulty, // Export new difficulty state
    lives,
    hints, // Export hints
    score,
    highScore,
    streak,
    wrongChoices,
    gameOver,
    availableActions,

    // State setters
    setHand,
    setSituationKey,
    setPositionKey,
    setSituationDisplay,
    setPositionDisplay,
    setDifficulty, // Export new difficulty setter
    setLives, // Direct setter for lives, though decrementLives/resetLives are preferred
    setHints, // Export setHints
    setScore,
    setHighScore, // Direct setter, though updateHighScore is preferred for typical updates
    updateHighScore, // Specific updater for high score logic
    setStreak,
    setWrongChoices,
    setGameOver,
    setAvailableActions,
    
    // Specific game action state updaters
    decrementLives,
    decrementHints, // Export decrementHints
    resetLives,
    resetGameScoreAndStats,

    // Pause/Play state
    isPaused,
    setIsPaused,
  };
};

export default useGameState;
