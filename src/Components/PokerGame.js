import React, { useState, useEffect, useRef } from "react";
import { Box, Fab } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsPanel from "./SettingsPanel";
import GameDisplay from "./GameDisplay";
import ErrorBoundary from "./ErrorBoundary";
import usePokerGame from "../Hooks/UsePokerGame";
import { playSound } from '../Utils/soundUtils';
import wallpaperImage from "../Assets/wallpaper.png";

const PokerGame = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [hintedAction, setHintedAction] = useState(null);

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
  } = usePokerGame();

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
    if (hints > 0 && !hintedAction && !gameOver) {
      decrementHints();
      setHintedAction(currentCorrectAction);
      playSound('hint_used');
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
      />
    </Box>
  );
};

export default PokerGame;
