import React, { useState, useEffect, useRef } from "react";
import { Box, Fab } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsPanel from "./SettingsPanel";
import GameDisplay from "./GameDisplay";
import ErrorBoundary from "./ErrorBoundary";
import usePokerGame from "../Hooks/UsePokerGame";
import { playSound } from '../Utils/soundUtils';
// Import LQIP and WebP images
import wallpaperBlur from "../Assets/wallpaper_blur.webp";
import wallpaper640 from "../Assets/wallpaper_640_q80.webp";
import wallpaper1280 from "../Assets/wallpaper_1280_q80.webp";
import wallpaper2048 from "../Assets/wallpaper_2048_q80.webp";
import wallpaperDefault from "../Assets/wallpaper_q80.webp";

const SHORTCUT_CONFIG_LS_KEY = 'pokerGameShortcutConfig';
const defaultShortcutConfig = {
  hint: 'h',
  pause: 'p',
  settings: 's',
  rules: 'i',
};

const PokerGame = ({ initialAction }) => { // 1. Define initialAction as a prop
  // Temporarily use wallpaper640 as the initial wallpaper for testing the switching logic
  // This helps determine if wallpaper_blur.webp is the sole problem.
  const [currentWallpaper, setCurrentWallpaper] = useState(wallpaper640);
  const [showSettings, setShowSettings] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [hintedAction, setHintedAction] = useState(null);
  const [shortcutConfig, setShortcutConfig] = useState(() => {
    try {
      const savedConfig = localStorage.getItem(SHORTCUT_CONFIG_LS_KEY);
      if (savedConfig) {
        // Add validation here if necessary to ensure savedConfig matches expected structure
        const parsedConfig = JSON.parse(savedConfig);
        // Ensure all keys are present, merge with defaults if some are missing
        return { ...defaultShortcutConfig, ...parsedConfig };
      }
    } catch (error) {
      console.error("Failed to load shortcut config from localStorage:", error);
    }
    return defaultShortcutConfig;
  });

  const longPressTimeout = useRef(null);
  const longPressActionTakenRef = useRef(false);

  const {
    hand,
    position,
    lives,
    score,
    highScore,
    streak,
    gameOver,
    showRules,
    setShowRules,
    situation,
    availableActions,
    makeDecision,
    restartGame,
    wrongChoices,
    difficulty,
    setDifficulty,
    currentCorrectAction,
    hints,
    decrementHints,
    lastAnswerCorrectness,
    timeLeft,
    isPaused,
    togglePausePlay,
    isTimerVisible,
    toggleTimerVisibility,
    readyToShowGameOver, // Added this line
  } = usePokerGame();

  // 2. Add useEffect for initialAction
  useEffect(() => {
    if (initialAction === 'settings') {
      setShowSettings(true);
    } else if (initialAction === 'rules') {
      setShowRules(true);
    }
    // If 'play' or null, do nothing
  }, [initialAction, setShowSettings, setShowRules]); // 3. Set dependencies

  // useEffect for keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isInputFocused) return; // Do not process shortcuts if an input is focused
      const key = event.key.toLowerCase();

      // Handle Enter for restarting game when gameOver is true
      if (gameOver && key === 'enter') {
        restartGame();
        return;
      }

      // Handle numeric keys for decisions (1-4)
      // These should only work if no modals are open and game is not over
      if (['1', '2', '3', '4'].includes(key) && !gameOver && !showSettings && !showRules) {
        const actionIndex = parseInt(key) - 1;
        if (availableActions && availableActions[actionIndex]) {
          makeDecision(availableActions[actionIndex]);
          return; // Action taken
        }
      }

      // Handle other shortcuts
      // Special handling for settings (s) and rules (i) keys to allow closing modals
      if (key === shortcutConfig.settings.toLowerCase()) {
        setShowSettings(prev => !prev);
      } else if (key === shortcutConfig.rules.toLowerCase()) {
        setShowRules(prev => !prev);
      }
      // General shortcuts that should not work if a modal is open
      else if (!showSettings && !showRules) {
        if (key === shortcutConfig.hint.toLowerCase()) {
          if (hints > 0 && !hintedAction && !gameOver && !isPaused) {
            decrementHints();
            setHintedAction(currentCorrectAction);
            playSound('hint_used');
          }
        } else if (key === shortcutConfig.pause.toLowerCase()) {
          togglePausePlay();
        }
        // Add other general shortcuts here if any
      }
      // If none of the above, event is not handled by these shortcuts
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    // Dependencies from usePokerGame hook
    gameOver,
    restartGame,
    showRules,
    setShowRules,
    hints,
    decrementHints,
    currentCorrectAction,
    togglePausePlay,
    availableActions,
    makeDecision,
    // Dependencies from local state
    showSettings,
    setShowSettings,
    hintedAction,
    setHintedAction,
    isPaused, // Added isPaused as a dependency
    shortcutConfig, // Added shortcutConfig as a dependency
    isInputFocused, // Added isInputFocused as a dependency
    // playSound is a stable import, not needed in deps
  ]);

  // useEffect to save shortcutConfig to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(SHORTCUT_CONFIG_LS_KEY, JSON.stringify(shortcutConfig));
    } catch (error) {
      console.error("Failed to save shortcut config to localStorage:", error);
    }
  }, [shortcutConfig]);

  useEffect(() => {
    // Logic for selecting and loading the appropriate wallpaper
    const image = new Image();
    let selectedWallpaper = wallpaperDefault; // Fallback

    const screenWidth = window.innerWidth;
    const dpr = window.devicePixelRatio || 1;

    // Determine the best image based on screen width and DPR
    // Consider DPR to load higher resolution images on high-density displays
    if (screenWidth * dpr <= 640) {
      selectedWallpaper = wallpaper640;
    } else if (screenWidth * dpr <= 1280) {
      selectedWallpaper = wallpaper1280;
    } else if (screenWidth * dpr <= 2048) {
      selectedWallpaper = wallpaper2048;
    }
    // For very large screens or if other conditions aren't met, wallpaperDefault is used.

    image.onload = () => {
      setCurrentWallpaper(selectedWallpaper);
      // Add a class to the body or a specific element to trigger transition
      // For now, just updating state which will re-render the Box with new image
    };
    image.src = selectedWallpaper;

    // Cleanup function for the image loader if the component unmounts
    return () => {
      image.onload = null; // Prevent setting state on unmounted component
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  useEffect(() => {
    let intervalId = null;

    if (timeLeft < 10 && timeLeft > 0 && !gameOver && !isPaused) {
      playSound('timer_tick');
      intervalId = setInterval(() => {
        playSound('timer_tick');
      }, 1500);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [timeLeft, gameOver, isPaused, playSound]);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  useEffect(() => {
    setHintedAction(null);
  }, [hand]);

  const handleHintClick = () => {
    if (hints > 0 && !hintedAction && !gameOver && !isPaused) {
      decrementHints();
      setHintedAction(currentCorrectAction);
      playSound('hint_used');
    }
  };

  const isHintButtonDisabled = hints <= 0 || !!hintedAction || gameOver || isPaused;
  // The isHintButtonDisabled is also updated in GameDisplay directly, but for consistency,
  // if it were used elsewhere in PokerGame.js, it would need !isPaused.
  // For now, the direct modification of isHintButtonDisabled in GameDisplay props is sufficient for the UI.
  // However, the handleHintClick and shortcut 'h' are the primary logic points in this component.

  useEffect(() => {
    let timer;
    if (collapsed) {
      timer = setTimeout(() => {
        setCollapsed(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [collapsed]);

  const handleLongPressStart = () => {
    longPressActionTakenRef.current = false; // Reset on new press
    longPressTimeout.current = setTimeout(() => {
      setCollapsed(true);
      longPressActionTakenRef.current = true; // Mark that long press action was taken
    }, 2000);
  };

  const handleLongPressEnd = () => {
    clearTimeout(longPressTimeout.current);
  };

  const handleClick = () => {
    // Only show rules if the long press action (collapse) hasn't been taken
    if (!longPressActionTakenRef.current) {
      setShowRules(true);
    }
    // Reset the ref after click evaluation, for the next interaction cycle
    longPressActionTakenRef.current = false;
  };

  return (
    <>
      <style>
        {`
          .hero {
            /* The background-image is now solely controlled by the sx prop on the Box,
               driven by the currentWallpaper state.
               The .hero class is now only responsible for the transition. */
            background-size: cover;
            background-position: center;
            transition: background-image 0.5s ease-in-out;
          }
          /* .hero-loaded class is not strictly necessary with current setup */
        `}
      </style>
      <Box
        className="hero" // Apply the hero class
        sx={{
          backgroundImage: `url(${currentWallpaper})`, // Use state for dynamic wallpaper
          backgroundSize: "cover",
          backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        p: 0,
        m: 0,
      }}
    >
      <ErrorBoundary fallbackMessage="There was an error displaying the game. Please refresh.">
        <GameDisplay
          collapsed={collapsed}
          onInfoClick={handleClick}
          onLongPressStart={handleLongPressStart}
        onLongPressEnd={handleLongPressEnd}
        gameOver={gameOver}
        score={score}
        highScore={highScore}
        hand={hand}
        situation={situation}
        position={position}
        availableActions={availableActions}
        makeDecision={makeDecision}
        lives={lives}
        streak={streak}
        restartGame={restartGame}
        wrongChoices={wrongChoices}
          showRules={showRules}
          setShowRules={setShowRules}
          currentCorrectAction={currentCorrectAction}
          hints={hints}
          decrementHints={decrementHints}
          lastAnswerCorrectness={lastAnswerCorrectness}
          playSound={playSound}
          timeLeft={timeLeft}
          hintedAction={hintedAction}
          handleHintClick={handleHintClick}
          isHintButtonDisabled={isHintButtonDisabled}
          streak={streak}
          isPaused={isPaused}
          togglePausePlay={togglePausePlay}
          isTimerVisible={isTimerVisible}
          toggleTimerVisibility={toggleTimerVisibility}
      readyToShowGameOver={readyToShowGameOver} // Added this line
        />
      </ErrorBoundary>

      <Fab
        color="primary"
        aria-label="settings"
        onClick={toggleSettings}
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          backgroundColor: "custom.main",
          "&:hover": { backgroundColor: "custom.dark" },
        }}
      >
        <SettingsIcon />
      </Fab>

      <SettingsPanel
        open={showSettings}
        onClose={toggleSettings}
        onOpen={toggleSettings}
        difficulty={difficulty}
        handleDifficultyChange={setDifficulty}
        shortcutConfig={shortcutConfig}
        setShortcutConfig={setShortcutConfig}
        isInputFocused={isInputFocused}
        setIsInputFocused={setIsInputFocused}
      />
    </Box>
    </>
  );
};

export default PokerGame;
