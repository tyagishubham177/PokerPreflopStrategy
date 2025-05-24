import React, { useState, useEffect, useRef } from "react";
import { Box, Fab } from "@mui/material"; 
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsPanel from "./SettingsPanel"; 
import GameDisplay from "./GameDisplay"; 
import ErrorBoundary from "./ErrorBoundary"; 
import usePokerGame from "../Hooks/UsePokerGame";
import { playSound } from '../Utils/soundUtils'; // Import playSound
// Removed BottomGameBar import
import wallpaperImage from "../Assets/wallpaper.png";

const PokerGame = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [longPress, setLongPress] = useState(false);
  const [hintedAction, setHintedAction] = useState(null); // Add hintedAction state

  const longPressTimeout = useRef(null);
  const lowTimeSoundPlayedRef = useRef(false); // Ref for timer tick sound

  // Ensure all necessary props are destructured
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
    difficulty, // Destructure difficulty
    setDifficulty, // Destructure setDifficulty
    currentCorrectAction, // Destructure currentCorrectAction
    hints, // Destructure hints
    decrementHints, // Destructure decrementHints
    lastAnswerCorrectness, 
    timeLeft, 
    isPaused, // Added for pause/play
    togglePausePlay, // Added for pause/play
    // hand, lives, hints, decrementHints, currentCorrectAction, gameOver are already destructured
  } = usePokerGame();

  useEffect(() => {
    if (lastAnswerCorrectness === true) {
      playSound('correct_decision');
    } else if (lastAnswerCorrectness === false) {
      playSound('wrong_decision');
    }
  }, [lastAnswerCorrectness]);

  // useEffect for timer sound:
  useEffect(() => {
    if (timeLeft < 10 && timeLeft > 0 && !gameOver && !isPaused) {
      if (!lowTimeSoundPlayedRef.current) {
        playSound('timer_tick');
        lowTimeSoundPlayedRef.current = true; // Set flag to true after playing
      }
    } else {
      // Reset the flag if time goes above 10 (e.g. new round) or game ends/pauses
      lowTimeSoundPlayedRef.current = false;
    }
  }, [timeLeft, gameOver, isPaused, playSound]);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  // useEffect to reset hintedAction when hand changes
  useEffect(() => {
    setHintedAction(null);
  }, [hand]);

  const handleHintClick = () => {
    if (hints > 0 && !hintedAction && !gameOver) {
      decrementHints();
      setHintedAction(currentCorrectAction);
      playSound('hint_used'); // Play sound when hint is successfully used
    }
  };

  const isHintButtonDisabled = hints <= 0 || !!hintedAction || gameOver;

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
    longPressTimeout.current = setTimeout(() => {
      setCollapsed(true);
      setLongPress(false);
    }, 2000); 
  };

  const handleLongPressEnd = () => {
    clearTimeout(longPressTimeout.current);
  };

  const handleClick = () => {
    if (!longPress) {
      setShowRules(true);
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${wallpaperImage})`,
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
          currentCorrectAction={currentCorrectAction} // Pass currentCorrectAction
          hints={hints} // Pass hints
          decrementHints={decrementHints} // Pass decrementHints
          lastAnswerCorrectness={lastAnswerCorrectness} // Pass lastAnswerCorrectness
          timeLeft={timeLeft} // Pass timeLeft
          hintedAction={hintedAction} // Pass hintedAction to GameDisplay
          // Pass additional props for PokerGameTab via GameDisplay
          handleHintClick={handleHintClick}
          isHintButtonDisabled={isHintButtonDisabled}
          streak={streak} // streak was already passed, ensuring it remains
          isPaused={isPaused} // Pass isPaused
          togglePausePlay={togglePausePlay} // Pass togglePausePlay
        />
      </ErrorBoundary>

      {/* BottomGameBar rendering removed */}

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
        difficulty={difficulty} // Pass difficulty state
        handleDifficultyChange={setDifficulty} // Pass setDifficulty function
      />
    </Box>
  );
};

export default PokerGame;
